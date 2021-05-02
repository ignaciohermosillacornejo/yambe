import { Card } from './card.interface';
import { Player } from './player.interface';

export interface Game {
    deck: Card[];
    currentPlayer: string;
    currentQuestionCard: Card;
    playersOrder: string[];
    players: Player[];
}
