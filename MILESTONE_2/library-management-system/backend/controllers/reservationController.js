const Reservation = require('../models/Reservation');
const Book = require('../models/Book');
const PriorityQueue = require('../middleware/priorityQueue');

class ReservationController {
  constructor() {
    this.reservationQueue = new PriorityQueue();
  }

  async createReservation(req, res) {
    try {
      const { bookId, userId, priority } = req.body;
      
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      if (book.availableCount > 0) {
        // Immediate allocation
        book.availableCount--;
        book.reservationCount++;
        await book.save();

        const reservation = new Reservation({
          user: userId,
          book: bookId,
          status: 'APPROVED',
          priority
        });

        await reservation.save();
        return res.status(200).json(reservation);
      }

      // Add to priority queue
      this.reservationQueue.enqueue(
        { bookId, userId }, 
        priority
      );

      const reservation = new Reservation({
        user: userId,
        book: bookId,
        status: 'PENDING',
        priority
      });

      await reservation.save();
      return res.status(201).json(reservation);

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async processReservationQueue() {
    while (!this.reservationQueue.isEmpty()) {
      const { element } = this.reservationQueue.dequeue();
      const { bookId, userId } = element;

      const book = await Book.findById(bookId);
      if (book.availableCount > 0) {
        book.availableCount--;
        book.reservationCount++;
        await book.save();

        await Reservation.findOneAndUpdate(
          { book: bookId, user: userId, status: 'PENDING' },
          { status: 'APPROVED' }
        );
      }
    }
  }
}

module.exports = new ReservationController();
