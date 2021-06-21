import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

/**
 * Takes N answer cards from the game deck and passes them to the player hand
 */
const dealAnswerCards = async (
  data: {
    gameRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,
    userId: any,
    numberOfCards: any,
  },
) => {
  const {
    gameRef,
    userId,
  } = data;
  let { numberOfCards } = data;

  // we get the refference to the current cards of the player
  const currentCardsRef = await gameRef.collection('playerHands').doc(userId);

  // we check that the user won't exced more than 8 cards (in case of dealing answers)
  const currentCards = await currentCardsRef.get();
  const currentCardsLength = currentCards.exists ? currentCards.data()!.cards.length : 0;

  if (currentCardsLength + numberOfCards > 8) {
    functions.logger.warn('Dealing cards - invalid param, player would have more than 8 cards');
    numberOfCards = 8 - currentCardsLength;
  }

  // we get the new cards to add
  const newCards = await gameRef.collection('deck')
    .where('type', '==', 'answer')
    .limit(numberOfCards)
    .get();

  /**
   * we also have to remove the new cards to add from the game deck
   * we do this transaction as a batch in case we fail setting the cards
   * to the playersHand
   */
  const batch = admin.firestore().batch();
  newCards.forEach(card => batch.delete(gameRef.collection('deck').doc(card.id)));

  // if the player has no corresponding playerHand document, we create one
  const playerHandRef = await gameRef
    .collection('playerHands')
    .doc(userId)
    .get();

  if (!playerHandRef.exists) {
    await gameRef
      .collection('playerHands')
      .doc(userId)
      .set({ cards: [] });
  }

  // TODO: end game or do something when we run out of cards, for now we just do nothing
  if (newCards.empty) {
    functions.logger.info('Dealing cards - empty deck');
    return;
  }

  const newCardsDocs = newCards.docs.map(e => ({ ...e.data(), id: e.id }));

  batch.update(currentCardsRef, {
    cards: admin.firestore.FieldValue.arrayUnion(...newCardsDocs),
  });

  await batch.commit();
};

export { dealAnswerCards };
