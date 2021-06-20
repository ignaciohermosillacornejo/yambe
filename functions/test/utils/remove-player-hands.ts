import * as admin from 'firebase-admin';

/**
 * Helper function to delete small subcollection while testing
 */
const removePlayerHands = async (gameId: string) => {
  const cards = await admin.firestore()
    .collection('games')
    .doc(gameId)
    .collection('playerHands')
    .get();

  cards.forEach(async (doc) => {
    await admin.firestore()
      .collection('games')
      .doc(gameId)
      .collection('playerHands')
      .doc(doc.id)
      .delete();
  });
};

export { removePlayerHands };
