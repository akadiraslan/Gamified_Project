export class Package {
    id: number;
    name: string;
    description: string;
    game_total: number;
    admin_total: number;
    is_lms: boolean;
    price: any;
    licence: BoughtPackage;
}

export class BoughtPackage {
    created_at: Date;
    license_start_date: Date;
    license_end_date: Date;
}
