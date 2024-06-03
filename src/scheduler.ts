import { scheduleJob } from "node-schedule";
import UserLocations from "./entity/UserLocations";
import { IsNull } from "typeorm";

export default function startScheduler() {
  scheduleJob("0 0 * * *", async (fireDate) => {
    console.log(`Starting at ${fireDate}`);
    // TODO: Send emails to users that haven't been sent at all.
    // Send emails for those who need by their desired frequency
  });
}
