import * as admin from 'firebase-admin';
import { createCards } from './create-cards';

/**
 * Helper function to add cards to users hand
 *  - cards are created using mocks
 */
const fillGameDeck = async (
  gameRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,
  numberOfAnswerCards: number,
  numberOfQuestionCards: number,
) => {
  const { newAnswerCards, newQuestionCards } = createCards(
    numberOfAnswerCards,
    numberOfQuestionCards,
  );
  const batch = admin.firestore().batch();
  newAnswerCards.concat(newQuestionCards).forEach(
    async (card) => {
      const cardRef = gameRef.collection('deck').doc(String(card.id));
      batch.set(cardRef, { type: card.type, content: card.content });
    },
  );
  await batch.commit();
};

export { fillGameDeck };
