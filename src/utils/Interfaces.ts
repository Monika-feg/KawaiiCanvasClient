// Definierar TypeScript-gränssnitt för olika objekt som används i applikationen, dessa matchar API modellerna
export interface Canvas {
  id: string;
  title: string;
  price: string;
  imageUrl?: string;
  stockQuantity:number;
}

export interface KawaiiResponse<T>{
    status: string;
    message: string;
    data: T;
}

// Cart-objektet du får från backend
export interface Cart {
  id: string;
  items: CartItem[];
}

export interface CartItem{
   id: string;
   numberOfCanvases: number;
   canvas: Canvas;
}

// Cart-objektet du skickar till backend (bara id)
export type CartRef = {
  id: string;
};

export interface Customer{
    firstName: string;
    lastName: string;
    email: string;
    shippingAddress: string;
    shippingCity:  string;
    postalCode: string;
    phoneNumber: string;
}

export interface Payment{
   id:string;
   orderId:string;
   stripePaymentId:string;
   paymentStatus:string;
   amount:number;
   url: string;
   

}

// Order du får från backend
export interface Order {
  id: string;
  totalPrice: number;
  cart: Cart;
  customer: Customer;
  payment?: Payment;
  items: CartItem[];

}

// Order du skickar till backend (utan id, totalPrice, payment)
export type NewOrder = {
  cart: CartRef;
  customer: Customer;
}


export interface Message {
  role: string;
  content: string;

}

export interface ChatRequest{
  messages: Message[];
}

export interface ChatResponse{
  choices: {
    message: Message;
  }
}


export interface Inventory{
  itemId: string;
  itemName : string;
  quantity:number;
}

