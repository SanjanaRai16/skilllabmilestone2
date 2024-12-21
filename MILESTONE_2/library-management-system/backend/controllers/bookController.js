// const Book = require('../models/Book');
// const BookSorter = require('../utils/bookSorting');
// const BookSearchTree = require('../utils/bookSearch');

// // Add Book
// exports.addBook = async (req, res) => {
//   try {
//     const newBook = new Book(req.body);
//     const savedBook = await newBook.save();
//     res.status(201).json(savedBook);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get All Books
// exports.getAllBooks = async (req, res) => {
//   try {
//     const books = await Book.find();
//     res.json(books);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get Book by ID
// exports.getBookById = async (req, res) => {
//   try {
//     const book = await Book.findById(req.params.id);
//     if (!book) return res.status(404).json({ message: 'Book not found' });
//     res.json(book);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update Book
// exports.updateBook = async (req, res) => {
//   try {
//     const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
//     res.json(updatedBook);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete Book
// exports.deleteBook = async (req, res) => {
//   try {
//     const deletedBook = await Book.findByIdAndDelete(req.params.id);
//     if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
//     res.json({ message: 'Book deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const Book = require('../models/Book');
const BinarySearchTree = require('../utils/bookSearch');

const bst = new BinarySearchTree(); // Create an instance of the BST

// Add Book
exports.addBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    
    const savedBook = await newBook.save();
    
    bst.insert(savedBook); // Insert into BST after saving to DB
    
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Books - Sorted by Popularity and Availability
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    
    // Sort books by popularity and availability
    books.sort((a, b) => b.popularity - a.popularity || b.availableCount - a.availableCount);

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) return res.status(404).json({ message: 'Book not found' });
    
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Book - Increment Popularity Example
exports.updateBookPopularity = async (req, res) => {
   try {
     const updatedBook = await Book.findByIdAndUpdate(
       req.params.id,
       { $inc: { popularity: 1 } }, // Increment popularity by one when requested
       { new: true }
     );

     if (!updatedBook) return res.status(404).json({ message: 'Book not found' });

     // Update BST as well after updating in DB
     bst.delete(updatedBook.title); // Remove old entry from BST before re-inserting it.
     bst.insert(updatedBook); // Re-insert updated book into BST.

     res.json(updatedBook);
   } catch (error) {
     res.status(400).json({ message: error.message });
   }
};

// Update Book
exports.updateBook = async (req, res) => {
   try {
     const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
     
     if (!updatedBook) return res.status(404).json({ message: 'Book not found' });

     // Update BST as well after updating in DB
     bst.delete(updatedBook.title); // Remove old entry from BST before re-inserting it.
     bst.insert(updatedBook); // Re-insert updated book into BST.

     res.json(updatedBook);
   } catch (error) {
     res.status(400).json({ message: error.message });
   }
};

// Delete Book
exports.deleteBook = async (req, res) => {
   try {
     const deletedBook = await Book.findByIdAndDelete(req.params.id);

     if (!deletedBook) return res.status(404).json({ message: 'Book not found' });

     bst.delete(deletedBook.title); // Remove from BST

     res.json({ message: 'Book deleted successfully' });
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
};
