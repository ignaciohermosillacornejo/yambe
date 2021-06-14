import { firestore } from 'firebase-admin';

/**
 * Fetches the requested deck from the Cards collections
 * and copies it to the deck subcollection in the game
 */
const loadDeck = async (data: { gameId: string, deckChoice: string}) => {
  const { gameId, deckChoice = 'default' } = data;

  const cards = await firestore()
    .collection('decks')
    .doc(deckChoice)
    .collection('cards')
    .get();

  cards.forEach(async (doc) => {
    await firestore().collection('games').doc(gameId).collection('deck')
      .add(doc.data());
  });
};

export { loadDeck };
