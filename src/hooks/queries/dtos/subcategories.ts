export interface SubcategoryByIdDto {
  status: string;
  data: {
    subcategory: {
      _id: string;
      category: categoryInSubcategoryById;
      name: string;
    };
  };
}

export interface categoryInSubcategoryById {
  _id: string;
  name: string;
  slugname: string;
}

export interface SubcategoryDto {
  _id: string;
  category: string;
  name: string;
  slugname : string
}

export interface SubcategoriesDto {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: {
    subcategories: SubcategoryDto[];
  };
}
