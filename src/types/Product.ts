export interface IRating {
  value: number;
  createdAt: Date;
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  stock: number;
  category: string;
  ratings: IRating[];
  createdAt: Date;
  images: string[];
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  brand: string;
  stock: number;
  category: string;
  images: FileList | null;
}