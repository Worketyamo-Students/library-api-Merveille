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
         res.status(400).json({ msg: "veuillez remplir tout les champs" })
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
   }
   

}


export default usersCtl;