import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString, IsUUID, Max, Min, ValidateNested } from "class-validator";

export class CreateProductRatingDto{
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    @IsOptional()
    @IsString()
    comment?: string;

    // @IsUUID()
    productId: string;

    // @IsUUID()
    userId: string;
}

export class CreateMultipleProductRatingsDto {
    // @IsUUID()
    userId: string;

    @IsArray()
    @ValidateNested({ each: true})
    @Type(() => CreateProductRatingDto)
    ratings: CreateProductRatingDto[];
}