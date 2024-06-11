import Booking from "../models/booking.mjs";

export const getBooking = (req, res, next) => {
  Booking.findAll()
    .then((bookings) => res.status(200).json(bookings))
    .catch((err) => res.status(500).json({ error: "Internal Server Error" }));
};

export const postBooking = (req, res, next) => {
  const bookingData = req.body;
  Booking.create(bookingData)
    .then((newBooking) => res.status(201).json(newBooking))
    .catch((err) => res.status(400).json({ message: err.message }));
};

export const putBooking = (req, res, next) => {
  const bookingData = req.body;
  const bookingId = +req.params.bookingId;
  Booking.update(bookingData, { where: { id: bookingId } })
    .then(([updatedRows]) => {
      if (updatedRows > 0) {
        Booking.findByPk(bookingId).then((booking) => {
          res.status(200).json(booking);
        });
      } else {
        res.status(404).send();
      }
    })
    .catch((err) => res.status(500).json({ error: "Internal Server Error" }));
};

export const deleteBooking = (req, res, next) => {
  const bookingId = +req.params.bookingId;
  Booking.destroy({ where: { id: bookingId } })
    .then((deletedRows) => {
      if (deletedRows > 0) {
        res.status(200).json();
      } else {
        res.status(404).json();
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
};
