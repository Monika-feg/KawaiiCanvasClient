

export interface Canvas {
  id: string;
  title: string;
  price: string;
  imageUrl?: string;
}

export interface KawaiiResponse<T>{
    status: string;
    message: string;
    data: T;
}

export interface Cart{
    id: string;
    canvases?: Canvas[];
}