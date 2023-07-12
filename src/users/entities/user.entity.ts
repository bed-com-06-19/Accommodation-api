
import { Roles} from "src/utility/common/user-roles.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column({unique:true})
    email:string;
    @Column({ select: false })
    password:string;
    
    @Column({ default: 'USER' })
    roles: string;
  
    get rolesArray(): string[] {
      return this.roles.split(',');
    }
  
    set rolesArray(roles: string[]) {
      this.roles = roles.join(',');
    }
    // @Column({type:'enum',enum:Roles,arrays:true,default:[Roles.USER]})
     @CreateDateColumn()
    createdAt:Timestamp;
    @UpdateDateColumn()
    updatedAt:Timestamp;


}
