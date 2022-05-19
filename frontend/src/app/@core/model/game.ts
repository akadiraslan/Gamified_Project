import { Gift } from './gifts';
import { Question } from './question';
import { Theme } from './theme';
import { Setting } from './setting';

export class Game {
    gameName: GameName;
    gifts: Gift;
    questions: Question[];
}

export class GameName {
    name: string;
    excel: string;
}

export class GameResponse {
    id: number;
    name: string;
    questions: Question[];
    theme: Theme;
    gift: Gift;
    setting: Setting;

}



