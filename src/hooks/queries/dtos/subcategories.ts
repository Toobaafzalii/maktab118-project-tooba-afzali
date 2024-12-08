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
  icon: string;
}
