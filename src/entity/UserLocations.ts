import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import Location from "./Location";
import User from "./User";

export enum Frequency {
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
}

@Entity("users_locations")
export default class UserLocations extends BaseEntity {
  @PrimaryColumn({ name: "user_id", type: "text" })
  @OneToOne(() => User, (user) => user.userLocations)
  @JoinColumn({ name: "user_id" })
  user: User;

  @PrimaryColumn({ name: "location_id", type: "text" })
  @ManyToOne(() => Location, (location) => location.userLocations)
  @JoinColumn({ name: "location_id" })
  location: Location;

  @Column({
    type: "enum",
    enum: Frequency,
    default: Frequency.DAILY,
  })
  frequency: Frequency;

  @Column({ type: "date", nullable: true })
  lastSent?: Date;
}
