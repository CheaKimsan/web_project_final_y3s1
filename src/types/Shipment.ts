export interface Shipment {
  tracking_id: string;
  destination_country: string;
  customer_name: string;
  delivery_time: string;
  cost: number;
  status: string;
}