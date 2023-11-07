const express = require('express');
const axios = require('axios');
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
  async function getBooks() {
    try {
      const response = await axios.get('http://localhost:5001/');
      return res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  return getBooks();
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  async function getBooks() {
    try {
      const response = await axios.get('http://localhost:5001/isbn/'+req.params.isbn);
      return res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  return getBooks();
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  async function getBooks() {
    try {
      const response = await axios.get('http://localhost:5001/author/'+req.params.author);
      return res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  return getBooks();
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  async function getBooks() {
    try {
      const response = await axios.get('http://localhost:5001/title/'+req.params.title);
      return res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  return getBooks();
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  return res.status(200).json(books[req.params.isbn].reviews);
});

module.exports.general = public_users;
