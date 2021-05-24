import { ANSWER, QUESTION } from 'src/constants/cards.constant';
export interface Card {
    id: string;
    content: string;
    type: CardType;
    selected?: boolean;
}

export type CardType = typeof ANSWER | typeof QUESTION;
