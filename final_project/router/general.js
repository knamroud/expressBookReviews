const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  username = req.body.username;
  password = req.body.password;
  if (username === undefined || password === undefined) {
    return res.status(400).json({message: "Username or password is missing"});
  }
  let userExists = users.some(user => user.username === username);
  if (userExists) {
    return res.status(400).json({message: "Username already exists"});
  }
  users.push({username:username, password:password});
  return res.status(200).json({message: "User successfully registered"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  return res.status(200).json(books[req.params.isbn]);
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let filtered = Object.keys(books)
  .filter(key => books[key].author === req.params.author)
  .reduce((obj, key) => {
    obj[key] = books[key];
    return obj;
  }, {});
  return res.status(200).json(filtered);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let filtered = Object.keys(books)
  .filter(key => books[key].title === req.params.title)
  .reduce((obj, key) => {
    obj[key] = books[key];
    return obj;
  }, {});
  return res.status(200).json(filtered);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  return res.status(200).json(books[req.params.isbn].reviews);
});

module.exports.general = public_users;
