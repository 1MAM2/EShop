import type { OrderItemReadDTO } from "./OrderItemReadDTO";

export interface OrderReadDTO {
  OrderId:number;
  userId: number;
  CreatedAt: string;
  TotalPrice: number;
  Status: OrderStatus; // enum tipi
  OrderItems: OrderItemReadDTO[];
}

export type OrderStatus = 
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";
