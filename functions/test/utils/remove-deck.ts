import * as admin from 'firebase-admin';

/**
 * Helper function to delete small subcollection while testing
 */
const removeDeck = async (gameId: string) => {
  const cards = await admin.firestore()
    .collection('games')
    .doc(gameId)
    .collection('deck')
    .get();

  cards.forEach(async (doc) => {
    await admin.firestore()
      .collection('games')
      .doc(gameId)
      .collection('deck')
      .doc(doc.id)
      .delete();
  });
};

export { removeDeck };
