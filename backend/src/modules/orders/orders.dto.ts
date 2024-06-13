import { Products } from "src/entities/products.entity";
import {IsNotEmpty, IsUUID, IsArray, ArrayMinSize, ArrayNotEmpty} from "class-validator"

export class OrdersDto {

    /**
    *Must be a String idUser
    *@example '"userId": "7871f2c9-6b43-4df6-9f93-9a93c388f26b"'
    */
    @IsNotEmpty()
    @IsUUID()
    userId: string

    /**
    *Must be a array objects idProducts
    *@example '  "products": [
      {
        "id": "cb32ed0d-fd05-4297-9815-67f07bdfcf07"
      },
      {
        "id": "3d7fb611-855a-4e0e-b9ec-83119ef11067"
      }
    ]'
    */
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    products: Partial<Products[]>

}

export class dateOrdersDto{ 

    @IsNotEmpty()
    date: Date

}