import {IsNotEmpty, IsUUID, IsArray, ArrayMinSize, ArrayNotEmpty, IsInt, Min, ValidateNested, IsObject, IsOptional, IsString} from "class-validator"
import { Type } from "class-transformer";



export class ProductInfo{
  @IsUUID()
  id: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsOptional()
  @IsString()
  sizeProduct?:string
}

export class AddOrderDto {

    /**
    *Must be a String idUser
    *@example '"userId": "7871f2c9-6b43-4df6-9f93-9a93c388f26b"'
    */
    @IsNotEmpty()
    @IsUUID()
    userId: string

    /**
    *Must be a array objects idProducts
    *@example '  "InfoProducts": [
      {
        "id": "cb32ed0d-fd05-4297-9815-67f07bdfcf07",
        "quantity": 2
      },
      {
        "id": "3d7fb611-855a-4e0e-b9ec-83119ef11067",
        "quantity": 3
      }
    ]'
    */
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => ProductInfo)
    products: ProductInfo[]
}

export class dateOrdersDto{ 

    @IsNotEmpty()
    date: Date

}