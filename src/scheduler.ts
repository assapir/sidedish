import { scheduleJob } from "node-schedule";
import UserLocations from "./entity/UserLocations";
import { IsNull } from "typeorm";

export default function startScheduler() {
  scheduleJob("0 0 * * *", async (fireDate) => {
    console.log(`Starting at ${fireDate}`);
    const neverSent = await UserLocations.find({
      where: {
        lastSent: IsNull(),
      },
    });
  });
}
