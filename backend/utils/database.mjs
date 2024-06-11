import { Sequelize } from "sequelize";

const sequelize = new Sequelize("booking-appointment", "root", "Root1234@", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
