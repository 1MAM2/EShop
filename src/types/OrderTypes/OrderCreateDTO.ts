import type { OrderItemCreateDTO } from "./OrderItemCreateDTO";

export interface OrderCreateDTO {
  orderItems: OrderItemCreateDTO[];
}
