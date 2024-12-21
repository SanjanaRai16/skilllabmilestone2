class BookSorter {
    static sortByAvailability(books) {
      return books.sort((a, b) => b.availableCount - a.availableCount);
    }
  
    static sortByPopularity(books) {
      return books.sort((a, b) => b.reservationCount - a.reservationCount);
    }
  }
  
  module.exports = BookSorter;
  