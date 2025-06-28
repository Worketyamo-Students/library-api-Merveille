import { Request, Response } from "express"
import { PrismaClient } from "../generated/prisma"
import { User } from "../generated/prisma"
import bcrypt from 'bcrypt';

const client = new PrismaClient()

const usersCtl = {
   getUsers: async (req: Request, res: Response) => {
      const { id } = req.params
      if (!id) {
         console.log("User not found")
         res.status(403).json({ msg: "No ID provided" })
      }
      else {
         // verifie si l'user existe
         const user = await client.user.findUnique({
            where: {
               id
            }
         })
         if (user) {
            res.status(200).json({ msg: user })
         } else {
            res.status(404).json({ msg: "user not found" })
         }
      }
   },
   createUser: async (req: Request, res: Response) => {
      const { name, password,  email }: User = req.body
      if (!name || !password  || !email) {
         res.status(400).json({ msg: "veuillez remplir tous les champs" })
      } else {
        const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

         const user = await client.user.create({
            data: {
               name,  password: passwordHash,  email
            }
         })

         console.log(user)
         res.status(201).json({
            msg : "user created successfully"
         })
      }
   },
   AuthentificationUser: async (req: Request, res: Response) => {
    const {password,  email }: User = req.body

    if (!password  || !email) {
       res.status(400).json({ msg: "veuillez remplir tous les champs" })
    } else {

              const user = await client.user.findFirst({
                where: {
                    email: email,
                }
             })
             if (user) {
               const pass = await bcrypt.compare(password,user.password)
               if (!pass) {
                 res.status(401).json({ msg: "Mot de passe incorrect" });
           }

                res.status(200).json({ msg:"authentifacation reussie"})
             } else {
                res.status(404).json({ msg: "user not found" })
             }
          }
       },
       updateUser: async(req:Request,res:Response)=>{
        
         const { name, password, email }: User = req.body;
         const { id } = req.params;
         if(!id){
            res.status(403).json({msg: "id introuvable"})
         }else{
   
            if (!name || !password  || !email) {
               
               res.status(400).json({ msg: "veuillez remplir tous les champs" })
         }
         else{
            
            const updateUsers= await client.user.update({
              
               where :{
                 id
   
               },
               data:{
                  name,
                  password,
                  email 
               
               }
   
            })
            console.log("User Profile updated");
            res.status(200).send({
                msg: "Updated successfully",
                newUserProfile: updateUsers
   })
      }
   
         
      }
   },
   deleteUser :async(req:Request,res:Response)=>{
      const {id}=req.params;
      if(!id){
         res.status(403).json({msg: "id introuvable"})
      }
   const deleteUser = await client.user.delete({
      where :{
         id
       }
   })
   res.status(200).send({
      msg: "deleted successfully",
      newUserProfile: deleteUser
   })
    }, 


}


export default usersCtl;