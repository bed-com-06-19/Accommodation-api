import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserSignup{
    @IsNotEmpty({message:'name can not be null'})
    @IsString({message:'Name should be string'})
    name: string;

    @IsNotEmpty({message:'email can not be empty.'})
    @IsEmail({},{message:'please provide a valid email.'})
    email:string;

    @IsNotEmpty({message:'password can not be empty.'})
    @MinLength(5,{message: 'password minimun character should be 5.'})
    password:string;

}