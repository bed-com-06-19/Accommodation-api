import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserSignUpDto} from './dto/user-singup.dto';
import {hash} from 'bcrypt'

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async singup(userSignUpDto:UserSignUpDto):Promise<UserEntity>{
    const userExist= await this.findUserByEmail(userSignUpDto.email)
    if(userExist) throw new BadRequestException('email is not available.')
     userSignUpDto.password= await hash(userSignUpDto.password,10)
    let user=this.usersRepository.create(userSignUpDto);
    user = await this.usersRepository.save(user);
    delete user.passoword
    return user;
  }

  
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async findUserByEmail(email:string){
    return await this.usersRepository.findOneBy({email});
  }
}
