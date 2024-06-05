import { ApiHideProperty, PickType } from "@nestjs/swagger"
import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Length, Matches, Validate, isString } from "class-validator"
import { MatchPassword } from "src/decorators/matchPassword.decorator"

export class CreateUserDto{
    /**
    *Must be a String of between 3 and 50 characters, mandatory data
    *@example 'Test User01'
    */
    @IsString()
    @Length(3,50)
    @IsNotEmpty()
    name:string

    /**
    Must be an email valid. Mandatory data
    @example 'testUser@gmail.com'
    */
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email:string

    /**
    Must be a valid password of 6 to 50 characters with at least one lower case letter, one upper case letter, one number and one symbol.
    Mandatory data
    @example '1234aA#abc'
    */
    @IsNotEmpty()
    @IsString()
    @Length(6,50)
    @Matches(/^[a-zA-Z0-9!@#$%^&*]+$/)
    password:string

    /**
    Must match the password. This field is mandatory
    @example '1234aA#abc'
    */
    @IsNotEmpty()
    @IsString()
    @Validate(MatchPassword,['password'])
    confirmPassword:string

    /**
    Must be a string from 3 to 80 characters.
    @example 'Av. Dos de Mayo
    */
    @Length(3,80)
    address:string

    /**
    Must be a number.
    @example '987258443'
    */
    @IsNumber()
    phone: number;

    /**
    Must be a string of 4 to 50 characters.
    @example Peru
    */
    @Length(4,50)
    country:string

    /**
    Must be a string of 5 to 50 characters
    @example 'Lima'
    */
    @Length(4,50)
    city:string

    @ApiHideProperty()
    @IsOptional()
    @IsBoolean()
    isAdmin?:boolean

    @ApiHideProperty()
    @IsOptional()
    @IsBoolean()
    isSuperAdmin?:boolean
}


export class UpdateUserDto{

    /**
    *Must be a String of between 3 and 50 characters
    *@example 'Test_Update'
    */
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(3,50)
    name?:string

    /**
    Must be an email valid
    @example 'testUpdate@gmail.com'
    */
    @IsOptional()
    @IsEmail()
    email?:string

    /**
    Must be a valid password of 6 to 50 characters with at least one lower case letter, one upper case letter, one number and one symbol.
    @example '1234aA#abc'
    */
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Length(6,50)
    @Matches(/^[a-zA-Z0-9!@#$%^&*]+$/)
    password:string

    /**
    Must be a string of 3 and a maximum of 80 characters.
    @example 'AvUpdate'
    */
    @IsOptional()
    @Length(3,80)
    address?:string

    /**
    Must be a number .
    @example '999999999'
    */
    @IsOptional()
    @IsNumber()
    phone?: number;

    /**
    Must be a string of 4 to 50 characters.
    @example 'Uruguay'
    */
    @IsOptional()
    @IsString()
    @Length(4,50)
    country?:string

    /**
    Must be a string of 5 to 50 characters
    @example 'Arequipa'
    */
    @IsOptional()
    @IsString()
    @Length(4,50)
    city?:string

    @IsOptional()
    @IsBoolean()
    isAdmin?:boolean

    @IsOptional()
    @IsBoolean()
    isSuperAdmin?:boolean
}

export class LoginUserDto extends PickType(CreateUserDto,[
    'email', 'password'
]){}

export class LoginThirdUserDto extends PickType(LoginUserDto,['email']) {}

export class CreateThirdUserDto extends PickType(CreateUserDto,['email','name']) {}