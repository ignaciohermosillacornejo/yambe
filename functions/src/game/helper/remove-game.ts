import { firestore } from 'firebase-admin';

/** Some decks could have thousands of cards, so we need to batch delete them */
const deleteQueryBatch = async (query: firestore.Query<firestore.DocumentData>) => {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    return;
  }

  // Delete documents in a batch
  const batch = firestore().batch();
  snapshot.docs.forEach((doc: any) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(query);
  });
};
/**
 * Deletes the game with gameId from firestore along with all of its
 * subcollections
 * ref: https://github.com/firebase/snippets-node/blob/e5f6214059bdbc63f94ba6600f7f84e96325548d/firestore/main/index.js#L889-L921
 */
const removeGame = async (data: { gameId: string }) => {
  const { gameId } = data;

  const deckCollection = firestore().collection('games').doc(gameId).collection('deck');
  const query = deckCollection.orderBy('__name__').limit(100);

  await deleteQueryBatch(query);
  await firestore().collection('games').doc(gameId).delete();
};

export { removeGame };
