

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

}

export interface Order{
    id:string;
    cart:Cart;
    customer: Customer;
    payment?: Payment;

}
export type NewOrder = {
  cart: Cart;
  customer: Customer;
}