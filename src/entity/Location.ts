import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import UserLocations from "./UserLocations";

@Entity("locations")
export default class Location extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ type: "decimal" })
  latitude: number;

  @Column({ type: "decimal" })
  longitude: number;

  @OneToMany(() => UserLocations, (userLocation) => userLocation.location)
  userLocations: Location[];

  static async findByLatLong(
    latitude: number,
    longitude: number
  ): Promise<Location | null> {
    return Location.createQueryBuilder("location")
      .where("latitude = :latitude", {
        latitude: normalizeCoordinates(latitude),
      })
      .andWhere("longitude = :longitude", {
        longitude: normalizeCoordinates(longitude),
      })
      .getOne();
  }

  static async getOrCreateLocation(
    name: string,
    latitude: number,
    longitude: number
  ): Promise<Location> {
    const maybeLocation = await Location.findByLatLong(latitude, longitude);
    if (maybeLocation) {
      return maybeLocation;
    }

    const newLocation = new Location();
    newLocation.name = name;
    newLocation.latitude = latitude;
    newLocation.longitude = longitude;
    return newLocation.save();
  }
}

export function normalizeCoordinates(latOrLong: number): number {
  return Number.parseFloat(latOrLong.toFixed(4));
}
