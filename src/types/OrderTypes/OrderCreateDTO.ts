import type { OrderItemCreateDTO } from "./OrderItemCreateDTO";
import type { OrderStatus } from "./OrderReadDTO";

export interface OrderCreateDTO {
  orderItems: OrderItemCreateDTO[];
  TotalPrice:number
  OrderStatus:OrderStatus
}
