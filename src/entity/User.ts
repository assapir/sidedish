import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import UserLocations from "./UserLocations";
import jwt from "jsonwebtoken";

@Entity("users")
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => UserLocations, (userLocation) => userLocation.user)
  userLocations?: UserLocations;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  async generateJWT(): Promise<string> {
    const secret = process.env.JWT_SECRET || "secret";
    const expiresIn = "1h";
    return jwt.sign({ id: this.id, email: this.email }, secret, { expiresIn });
  }
}
