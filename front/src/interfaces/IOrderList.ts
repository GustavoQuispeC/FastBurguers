import { OrderDetails} from "./IOrders";

export interface IOrderList {
    id:           string;
    date:         string;
    orderDetails: OrderDetails;
}


