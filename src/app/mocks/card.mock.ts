import { Card } from '../models/card.interface';

export const QUESTION_CARD_MOCK: Card = {
    content: 'Una pregunta __',
    type: 'question',
};

export const ANSWER_CARD_MOCK: Card = {
    content: 'tiene respuesta',
    type: 'answer',
};

export const CARDS_MOCK: Card[] = [
    QUESTION_CARD_MOCK,
    ANSWER_CARD_MOCK,
];
