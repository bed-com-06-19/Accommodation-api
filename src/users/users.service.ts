import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserSignUpDto} from './dto/user-singup.dto';
import {hash, compare} from 'bcrypt'
import { UserSignInDto } from './dto/user-singin.dto';
import { sign } from 'jsonwebtoken';

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
    delete user.password
    return user;
  }

  async signin(userSignInDto: UserSignInDto):Promise<UserEntity> {
    const userExist = await this.usersRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email = :email', { email: userSignInDto.email })
      .getOne();
      if(!userExist) throw new BadRequestException('Bad credentials')
      const matchPassword= await compare(userSignInDto.password,userExist.password);
       if(!matchPassword) throw new BadRequestException('Bad credentials');
       delete userExist.password;   
       return userExist;
  }
  // async signin(userSignInDto: UserSignInDto) {
  //   const userExist = await this.usersRepository
  //     .createQueryBuilder('users')
  //     .addSelect('users.password')
  //     .where('users.email = :email', { email: userSignInDto.email })
  //     .getOne();
  
  //   if (userExist) {
  //     return userExist;
  //   } else {
  //     return { error: 'User not found' };
  //   }
  // }


  
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
  async accessToken(user:UserEntity):Promise<string>{
    return sign({id:user.id,email:user.email},process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn:process.env.ACCESS_TOKEN_EXPIRE_TIME})
  }
}


