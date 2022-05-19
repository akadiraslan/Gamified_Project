export class Gift {
    id: number;
    name: string;
    isGift: boolean;
    gift: GiftItems[];
    updated_at?: Date;
    created_at?: Date;
    gift_items: GiftItems;
}

export class GiftItems {
    id: number;
    name: string;
    giftName: string;
    image: number;
    gift_id: number;
    description: string;
    order: number;
    media: string;
    media_image_id: string;
    created_at?: Date;
}


