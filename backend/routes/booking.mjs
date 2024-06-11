import express from "express";
import {
  getBooking,
  postBooking,
  putBooking,
  deleteBooking,
} from "../controllers/booking.mjs";

const router = express.Router();

router.get("/booking", getBooking);
router.post("/booking", postBooking);
router.put("/booking/:bookingId", putBooking);
router.delete("/booking/:bookingId", deleteBooking);

export default router;
