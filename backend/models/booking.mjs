import sequelize from "../utils/database.mjs";
import { DataTypes, Model } from "sequelize";

class Booking extends Model {}

Booking.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phonenumber: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    time: { type: DataTypes.TIME, allowNull: false },
  },
  { sequelize, timestamps: false, modelName: "Booking" }
);

export default Booking;
