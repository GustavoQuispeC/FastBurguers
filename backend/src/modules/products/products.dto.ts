import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID, IsUrl, Length, Max, MaxLength, Min, isArray } from "class-validator";
import { SizeProduct } from "src/enum/sizeProduct.enum";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

export class CreateProductdto{

    /**
     * Must be a name beetween 3 to 40 characters
     * @example 'Hamburguesa Premium'
     */
    @IsString()
    @Length(3, 40)
    name:string

    /**
     * Must be a name beetween 3 to 200 characters
     * @example 'La ultradestructiva aniquiladora hamgruesa '
     */
    @IsString()
    @Length(1, 200)
    description:string

    /**
     * Must be a positive number
     * @example 32.3
     */
    @IsNumber()
    @Type(()=> Number)
    @IsPositive()
    price:number


    /**
     * Must be a integer
     * @example 10  
     */
    @IsNumber()
    @Type(()=> Number)
    @IsPositive()
    @IsInt()
    stock:number

    /**
     * Must be a number
     * Example 0.50
     */
    @IsInt()
    @Type(()=> Number)
    @IsPositive()
    @Min(0)
    @Max(100)
    discount: number

    /**
     *  Must be a UUID id string of a category
     * @example '908a59d6-a87f-4ea1-a89b-23747a668cf8'
     */
    @IsUUID()
    @IsString()
    categoryID:string
    
    /**
     *  Must be : personal, regular or extrema, optional value
     * @example 'personal'
     */
    @IsOptional()
    @IsEnum(SizeProduct,
        {message: 'Size take only : personal | regular | extrema values'})
    size: SizeProduct

    /**
     * Must be a boolean valor, optional value
     * @example 'true'
     */
    @IsOptional()
    @IsBoolean()
    condition: boolean

}


export class UpdatedProductdto {
    
    /**
     * Must be a name beetween 3 to 40 characters
     * @example ' Update Hamburguer'
     */
    @IsOptional()
    @IsString()
    @Length(3, 40)
    name?:string

    /**
     * Must be a name beetween 3 to 100 characters
     * @example 'Update description'
     */
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(3, 100)
    description?:string

    /**
     * Must be a number
     * @example 12.4
     */
    @IsOptional()
    @IsNumber()
    @Type(()=> Number)
    @IsPositive()
    price?:number


    /**
     * Must be a integer
     * @example 5
     */
    @IsOptional()
    @IsNumber()
    @Type(()=> Number)
    @IsPositive()
    @IsInt()
    stock?:number

    /**
     * Must be a number between 0 and 100
     * @Example 20
     */
    @IsOptional()
    @Type(()=> Number)
    @IsInt()
    @Min(0)
    @Max(100)
    discount?: number


    /**
     *  Must be a UUID id string of a category
     * @example '908a59d6-a87f-4ea1-a89b-23747a668cf8'
     */
    @IsOptional()
    @IsUUID()
    @IsString()
    categoryID?:string

    /**
     *  Must be : personal, regular or extrema
     * @example 'personal'
     */
    @IsOptional()
    @IsEnum(SizeProduct,
        {message: 'Size take only : personal | regular | extrema values'})
    size?: SizeProduct

    /**
     * Must be a boolean valor, optional value
     * @example 'true'
     */
    @IsOptional()
    @IsBoolean()
    condition: boolean
}

export class GetByCategoriesDto {

    /**
     * Must be an array of string with categories for filter
     * @example ["Hamburguesas","Postres"]
     */
    @IsArray()
    categories: string[]
}
    
