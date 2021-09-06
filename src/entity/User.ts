import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Unique } from "typeorm";
import { UserMeta } from "./UserMeta";

@Entity()
@Unique(["id", "userMetaId"])
@Unique(["userMetaId"])
export class User {
  @PrimaryGeneratedColumn({ type:"bigint" })
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
  userMeta: UserMeta;
  
}
