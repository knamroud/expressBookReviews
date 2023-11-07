const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
  return users.some(user => user.username === username);
}

const authenticatedUser = (username,password)=>{ //returns boolean
  if (isValid(username)) {
    let user = users.find(user => user.username === username);
    if (user.password === password) {
      return true;
    }
  }
  return false;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  if (req.body.username === undefined || req.body.password === undefined) {
    return res.status(400).json({message: "Username or password is missing"});
  }
  let userExists = users.some(user => user.username === req.body.username);
  if (!userExists) {
    return res.status(400).json({message: "Username does not exist"});
  }
  let authenticated = authenticatedUser(req.body.username, req.body.password);
  if (!authenticated) {
    return res.status(400).json({message: "Username and password does not match"});
  }
  let token = jwt.sign({username: req.body.username}, "fingerprint_customer");
  req.session.user = token;
  return res.status(200).json({message: "User successfully logged in"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  book = books[req.params.isbn];
  if (book === undefined) {
    return res.status(400).json({message: "Book does not exist"});
  }
  book.reviews[req.session.user] = req.body.review;
  return res.status(200).json({message: "Review successfully added"});
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  book = books[req.params.isbn];
  if (book === undefined) {
    return res.status(400).json({message: "Book does not exist"});
  }
  if (book.reviews[req.session.user] === undefined) {
    return res.status(400).json({message: "Review does not exist"});
  }
  delete book.reviews[req.session.user];
  return res.status(200).json({message: "Review successfully deleted"});
});
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
