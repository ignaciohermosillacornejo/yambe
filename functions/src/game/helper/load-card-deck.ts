import { firestore } from 'firebase-admin';

const shuffle = (array: any[]) => {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
};

/**
 * Fetches the requested deck from the Cards collections
 * and copies it to the deck subcollection in the game
 * limited to 500 cards per deck per firestore limits
 */
const loadDeck = async (data: {
  gameRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,
  deckChoice: string,
}) => {
  const { gameRef, deckChoice = 'default' } = data;

  const cardsSnap = await firestore()
    .collection('decks')
    .doc(deckChoice)
    .collection('cards')
    .get();

  const cards = cardsSnap.docs;
  shuffle(cards);

  cards.forEach(async (doc) => {
    await gameRef.collection('deck')
      .add(doc.data());
  });
};

export { loadDeck };
