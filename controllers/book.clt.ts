
import { Request, Response } from "express"
import { PrismaClient } from "../generated/prisma"
import { Book } from "../generated/prisma"
//import bcrypt from 'bcrypt';

const client = new PrismaClient()

const booksCtl = {
   getBooks: async (req: Request, res: Response) => {
      const {bookId } = req.params
      if (!bookId) {
         console.log("book not found")
         res.status(403).json({ msg: "NobookId provided" })
      }
      else {
         const book = await client.book.findUnique({
            where: {
              bookId
            }
         })
         if (book) {
            res.status(200).json({ msg: book })
         } else {
            res.status(404).json({ msg: "book not found" })
         }
      }
   },
   createBook: async (req: Request, res: Response) => {
      const { titre,auteur,description,anneePub,ISBN,disponible} :Book= req.body;

      if (!titre || !auteur  || !description || !anneePub|| !ISBN ||!disponible ) {
         res.status(400).json({ msg: "veuillez remplir tout les champs" })
      } else {
        //const saltRounds = 10;
    //const auteurHash = await bcrypt.hash(auteur, saltRounds);

         const book = await client.book.create({
            data: {
               titre,  auteur,  description,anneePub,ISBN,disponible
            }
         })

         console.log(book)
         res.status(201).json({
            msg : "book created successfully"
         })
      }
   },

       updatebook: async(req:Request,res:Response)=>{
        
         const { titre, auteur, description , anneePub, ISBN,disponible }: Book = req.body;
         const {bookId } = req.params;
         if(!bookId){
            res.status(403).json({msg: "id introuvable"})
         }else{
   
            if (!titre || !auteur  || !description || !anneePub|| !ISBN || !disponible) {
               
               res.status(400).json({ msg: "veuillez remplir tout les champs" })
         }
         else{
            
            const updatebooks= await client.book.update({
              
               where :{
                bookId
   
               },
               data:{
                  titre,
                  auteur,
                  description ,
                  anneePub,
                     ISBN 
               
               }
   
            })
            console.log("book Profile updated");
            res.status(200).send({
                msg: "Updated successfully",
                newbookProfile: updatebooks
   })
      }
   
         
      }
   },
 deleteBook :async(req:Request,res:Response)=>{
      const {bookId}=req.params;
      if(!bookId){
         res.status(403).json({msg: "id introuvable"})
      }
   const deleteBook = await client.book.delete({
      where :{
         bookId
       }
   })
   res.status(200).send({
      msg: "deleted successfully",
      newUserProfile: deleteBook
   })
    },   
getAllBooks : async(req:Request,res:Response)=>{

    const books = await client.user.findMany()
    console.log(req.url);

    res.status(200).json({ books })
}




}


export default booksCtl;