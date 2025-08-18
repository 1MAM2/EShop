export interface ProductCreateDTO {
  ProductName: string;
  Price: number;
  ImgUrl: string;
  CategoryId: number;
  FinalPrice: number;
  Discount: number;
  Description: string;
  GalleryImages: string[];
}
