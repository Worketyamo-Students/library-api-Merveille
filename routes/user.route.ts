import { Router } from "express";
import usersCtl from "../controllers/user.ctl.ts";
const users = Router()

//users.get('/', usersCtl.getAllUsers)
users.get('/:id', usersCtl.getUsers)
users.post('/signup',usersCtl.createUser)
users.post('/login',usersCtl.AuthentificationUser)
//users.put('/:id' ,usersCtl.updateUser)
//users.delete('/:id' ,usersCtl.deleteUser)

export default users