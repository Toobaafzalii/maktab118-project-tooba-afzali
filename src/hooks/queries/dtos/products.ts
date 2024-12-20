export interface ProductDto {
  _id: string;
  category: string;
  subcategory: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  description: string;
  thumbnail: string;
  images: string[];
  slugname: string;
}

export interface ProductsDto {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: {
    products: Array<ProductDto>;
  };
}

interface Rating {
  rate: number;
  count: number;
}

export interface AddProductDataDto extends ProductDto {
  rating: Rating;
  createdAt: string;
  updatedAt: string;
  slugname: string;
  __v: number;
}

export interface AddProductDto {
  status: string;
  data: {
    product: AddProductDataDto;
  };
}

export interface SingleProductDto {
  status: string;
  data: {
    product: {
      images: Array<string>;
      _id: string;
      category: {
        _id: string;
        name: string;
        icon: null;
      };
      subcategory: {
        _id: string;
        category: string;
        name: string;
      };
      name: string;
      price: number;
      quantity: number;
      brand: string;
      description: string;
      thumbnail: string;
    };
  };
}
