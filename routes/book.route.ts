import { Router } from "express";
import booksCtl from "../controllers/book.clt.ts";
const books = Router()

books.get('/profile/:id', booksCtl.getAllBooks)
books.get('/profile/:id', booksCtl.getBooks)
books.post('/signup',booksCtl.createBook)

 books.put('/profile/:id' ,booksCtl.updatebook)
 //books.delete('/:id' ,booksCtl.deleteBook)

export default books