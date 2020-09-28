export interface Order {
  id: number;
  user: string;
  product: string;
  deliveryDateTime: Date;
  f_urgent: boolean;
}
