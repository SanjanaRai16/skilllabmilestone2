const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController'); // Ensure this path is correct
const { authMiddleware, adminMiddleware, studentMiddleware } = require('../middleware/authMiddleware'); // Correctly import middlewares

// Add Book (Protected Route)
router.post('/add', adminMiddleware, bookController.addBook); // Use adminMiddleware to protect this route

// Get All Books
router.get('/', bookController.getAllBooks); // Ensure getAllBooks is defined in bookController

// Get Book by ID
router.get('/:id', bookController.getBookById); // Ensure getBookById is defined in bookController

// Update Book
router.put('/:id', adminMiddleware, bookController.updateBook); // Use adminMiddleware to protect this route

// Delete Book
router.delete('/:id', adminMiddleware, bookController.deleteBook); // Use adminMiddleware to protect this route

module.exports = router;
