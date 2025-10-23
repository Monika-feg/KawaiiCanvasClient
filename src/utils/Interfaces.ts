

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

// Cart-objektet du får från backend
export interface Cart {
  id: string;
  canvases?: Canvas[];
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
}

// Order du skickar till backend (utan id, totalPrice, payment)
export type NewOrder = {
  cart: CartRef;
  customer: Customer;
};