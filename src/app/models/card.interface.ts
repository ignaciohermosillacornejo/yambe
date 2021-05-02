export interface Card {
    content: string;
    type: CardType;
}

export type CardType = 'answer' | 'question';
