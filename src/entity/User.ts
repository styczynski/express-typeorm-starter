import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { UserMeta } from "./UserMeta";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column({ nullable: false, })
  userMetaId: number;

  @OneToOne(() => UserMeta)
  @JoinColumn({ name: "userMetaId", referencedColumnName: "id" })
  meta: UserMeta;
}
