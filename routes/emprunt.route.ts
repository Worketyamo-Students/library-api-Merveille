import { Router } from "express";
import empruntsCtl from "../controllers/emprunt.ctl.ts";
const emprunts = Router()

// emprunts.get('/user/:id', empruntsCtl.getAllEmprunts)
// emprunts.get('/profile/:id', empruntsCtl.getEmprunts)
emprunts.post('/',empruntsCtl.createEmprunt)

 //emprunts.put('/loans/:id/return' ,empruntsCtl.updateEmprunts)
 
export default emprunts