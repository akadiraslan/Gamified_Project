
export class GeneralReport {
    total_correct: number;
    total_game: number;
    total_incorrect: number;
    total_learner: number;
    total_reply: number;
}

export class Users {
    id: number;
    name: string;
}

export class Games {
    id: number;
    name: string;
}

export class Learners {
    id: number;
    name: string;
}
export class Game {
    created_at: string;
    id: number;
    name: string;
    scorm_package_name: string;
    scorm_package_version: number;
    updated_at: string;
}

export interface Types {
    id: any;
    name: string;
    new: boolean;
}






