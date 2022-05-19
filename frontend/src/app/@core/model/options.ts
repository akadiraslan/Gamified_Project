import { Media } from './media';

export class Option {
  id: number;
  name: string;
  media_image_id: number;
  media: Media;
  updated_at?: Date;
  created_at?: Date;
}

export class Pairing {
  id: number;
  first_option: string;
  second_option: string;
  first_image_id: number;
  second_image_id: number;
  first_media: Media;
  second_media: Media;
  updated_at?: Date;
  created_at?: Date;
}



