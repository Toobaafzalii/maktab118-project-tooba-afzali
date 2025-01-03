export interface CategoryDto {
  _id: string;
  name: string;
  icon?: string | null;
  slugname: string;
}

export interface CategoriesDto {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: {
    categories: CategoryDto[];
  };
}
