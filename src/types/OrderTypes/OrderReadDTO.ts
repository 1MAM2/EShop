import type { OrderItemReadDTO } from "./OrderItemReadDTO";

export interface OrderReadDTO {
  userId: number;
  createdAt: string; // JSON’dan geldiği için string, Date'e çevirilebilir
  totalPrice: number;
  status: OrderStatus; // enum tipi
  orderItems: OrderItemReadDTO[];
}

export type OrderStatus = 
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";
