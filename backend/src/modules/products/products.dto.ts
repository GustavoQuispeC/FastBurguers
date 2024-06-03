import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUrl, Length, MaxLength, isArray } from "class-validator";
import { SizeProduct } from "src/enum/sizeProduct.enum";

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
    @IsPositive()
    price:number


    /**
     * Must be a integer
     * @example 10  
     */
    @IsNumber()
    @IsPositive()
    @IsInt()
    stock:number

    /**
     * Must be a number
     * Example 0.50
     */
    @IsNumber()
    @IsPositive()
    discount: number

    /**
     *  Must be a string
     * @example 'Hamburguesas'
     */
    @IsString()
    category:string

    /**
     *  Must be : personal, regular or extrema
     * @example 'personal'
     */
    @IsEnum(SizeProduct,
        {message: 'Size take only : personal | regular | extrema values'})
    size: SizeProduct
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
    @IsPositive()
    price?:number


    /**
     * Must be a integer
     * @example 5
     */
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @IsInt()
    stock?:number

    /**
     * Must be a number
     * @Example 0.1
     */
    @IsOptional()
    discount?: number


    @IsOptional()
    category?:string

    /**
     *  Must be : personal, regular or extrema
     * @example 'personal'
     */
    @IsOptional()
    @IsEnum(SizeProduct,
        {message: 'Size take only : personal | regular | extrema values'})
    size: SizeProduct
}

export class GetByCategoriesDto {

    /**
     * Must be an array of string with categories for filter
     * @example ["Hamburguesas","Postres"]
     */
    @IsArray()
    categories: string[]
}
    
