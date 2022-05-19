export class Theme {
    id: number;
    name: string;
    slug: string;
    bg_color: string;
    category_colors: CategoryColor[];
    updated_at?: string;
    created_at?: string;
}

export class CategoryColor {
    categoryColor: string;
}


