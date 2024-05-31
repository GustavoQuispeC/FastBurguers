import { IsString, Length } from "class-validator";

export class CreateCategoryDto{
    /**
     * Must be a name a string beetwen 3 to 20 characteres
     * @example papitas
     */
    @IsString()
    @Length(3,20)
    name:string
}

export class UpdateCategoryDto{
    /**
     * Must be a name a string beetwen 3 to 20 characteres
     * @example papitas
     */
    @IsString()
    @Length(3,20)
    name:string
}