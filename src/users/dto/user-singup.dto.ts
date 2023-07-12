import {  IsNotEmpty, IsString} from "class-validator";
import { UserSignInDto } from "./user-singin.dto";

export class UserSignUpDto extends UserSignInDto{
    @IsNotEmpty({message:'name can not be null'})
    @IsString({message:'Name should be string'})
    name: string;

  

}