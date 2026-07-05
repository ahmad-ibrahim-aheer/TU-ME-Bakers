export type ProductType = 'bakery' | 'mart';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  type: ProductType;
  image: string;
  isPopular?: boolean;
  unit?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customNotes?: string;
}

export interface Review {
  id: string;
  author: string;
  text: string;
  rating: number;
  date: string;
  tag?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}
