export interface Order {
  id: string;
  user: string;
  product: string;
  deliveryDateTime: Date;
  f_urgent: boolean;
  status: string;
}
