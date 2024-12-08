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
