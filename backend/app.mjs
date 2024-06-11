import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./utils/database.mjs";
import bookingRoutes from "./routes/booking.mjs";
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/", bookingRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("successfully connected to database");
    app.listen(4001, () => {
      console.log("Server running on port 4001");
    });
  })
  .catch((err) => {
    console.log("Error in connecting with database\n", err);
  });
