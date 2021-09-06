import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class UserMeta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  foo: number;

  @Column()
  bar: number;

  @Column({ nullable: false, })
  userId: number;

  @OneToOne(() => User)
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  meta: User;
}
