import { Category } from './category';
import { Tags } from './tags';

export interface SelectionModel {
    id: string;
    name: string;
    new: boolean;
}

export class Question {

    id: number;
    questionType: string;
    question_type: string;
    category: Category;
    questionImage: number;
    questionAudio: number;
    questionName: string;
    name: string;
    tags: Tags[];
    answerSelectionOption: AnswerSelection[];
    answerChoiceOption: AnswerChoiceOption[];
    answerOptionPairing: AnswerOptionPairing[];
    option: any[];
    media: Media;
    audio: any;
}

export class AnswerSelection {
    name: string;
    option: string;
    answer: boolean;
    image: any;
    media_image_id: number;
    correct: number;
}

export class AnswerChoiceOption {
    name: string;
    option: string;
    answer: boolean;
    image: any;
    media_image_id: number;
    correct: number;
}

export class AnswerOptionPairing {
    option_one: string;
    first_option: string;
    image_one: any;
    first_image_id: number;
    option_second: string;
    second_option: string;
    image_second: any;
    second_image_id: number;

}

export class Media {
    id: number;
    directory: string;
    filename: string;
    size: number;
}

