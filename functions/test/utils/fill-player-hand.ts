import * as admin from 'firebase-admin';
import { createCards } from './create-cards';

/**
 * Helper function to add cards to users hand
 *  - cards are created using mocks
 */
const fillPlayerHand = async (
  gameRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,
  userId: string,
  numberOfAnswerCards: number,
  numberOfQuestionCards: number,
) => {
  const { newAnswerCards, newQuestionCards } = createCards(
    numberOfAnswerCards,
    numberOfQuestionCards,
  );
  await gameRef
    .collection('playerHands')
    .doc(userId)
    .set(
      { cards: [] },
    );

  const currentCardsRef = gameRef
    .collection('playerHands')
    .doc(userId);

  await currentCardsRef.update({
    cards: admin.firestore.FieldValue.arrayUnion(...newAnswerCards.concat(newQuestionCards)),
  });
};

export { fillPlayerHand };
