let startIndex = 0;

function* indexGenerator() {
  while (true) {
    yield startIndex;
    startIndex += 1;
  }
}

const createCards = (numberOfAnswerCards: number, numberOfQuestionCards: number) => {
  const id = indexGenerator();
  const newAnswerCards = new Array(numberOfAnswerCards)
    .fill(null)
    .map(() => {
      const cardId = id.next().value;
      return {
        id: `${cardId}`,
        type: 'answer',
        content: `example answer ${cardId}`,
      };
    });

  const newQuestionCards = new Array(numberOfQuestionCards)
    .fill(null)
    .map(() => {
      const cardId = id.next().value;
      return {
        id: `${cardId}`,
        type: 'question',
        content: `_ is example question ${cardId}`,
      };
    });
  return { newAnswerCards, newQuestionCards };
};

export { createCards };
