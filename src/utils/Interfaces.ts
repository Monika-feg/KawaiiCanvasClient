

export interface Canvas {
  id: string;
  title: string;
  price: string;
  imageUrl?: string;
}

export interface KawwaiResponce<T>{
    status: string;
    message: string;
    data: T;
}