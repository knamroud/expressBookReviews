const express = require('express');
let books = {
      1: {"author": "Chinua Achebe","title": "Things Fall Apart", "reviews": {} },
      2: {"author": "Hans Christian Andersen","title": "Fairy tales", "reviews": {} },
      3: {"author": "Dante Alighieri","title": "The Divine Comedy", "reviews": {} },
      4: {"author": "Unknown","title": "The Epic Of Gilgamesh", "reviews": {} },
      5: {"author": "Unknown","title": "The Book Of Job", "reviews": {} },
      6: {"author": "Unknown","title": "One Thousand and One Nights", "reviews": {} },
      7: {"author": "Unknown","title": "Nj\u00e1l's Saga", "reviews": {} },
      8: {"author": "Jane Austen","title": "Pride and Prejudice", "reviews": {} },
      9: {"author": "Honor\u00e9 de Balzac","title": "Le P\u00e8re Goriot", "reviews": {} },
      10: {"author": "Samuel Beckett","title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
}

const PORT = 5001;

app = express();


// Get the book list available in the shop
app.get('/',function (req, res) {
      return res.status(200).json(books);
});
    
// Get book details based on ISBN
app.get('/isbn/:isbn',function (req, res) {
      return res.status(200).json(books[req.params.isbn]);
});

// Get book details based on author
app.get('/author/:author',function (req, res) {
      let filtered = Object.keys(books)
      .filter(key => books[key].author === req.params.author)
      .reduce((obj, key) => {
        obj[key] = books[key];
        return obj;
      }, {});
      return res.status(200).json(filtered);
    });
    
// Get all books based on title
app.get('/title/:title',function (req, res) {
      let filtered = Object.keys(books)
      .filter(key => books[key].title === req.params.title)
      .reduce((obj, key) => {
            obj[key] = books[key];
            return obj;
      }, {});
      return res.status(200).json(filtered);
});