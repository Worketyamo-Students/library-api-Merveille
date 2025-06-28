import { Request, Response } from "express"
import { PrismaClient } from "../generated/prisma"
import { Emprunt } from "../generated/prisma"
//import { User } from "../generated/prisma"

const client = new PrismaClient()

const empruntsCtl = {
  
  getEmprunt: async (req: Request, res: Response) => {
    const { empruntId } = req.params

    if (!empruntId) {
      return res.status(400).json({ msg: "Aucun ID d'emprunt fourni" })
    }

      const emprunt = await client.emprunt.findUnique({
        where: { 
             empruntId
             }
      })

      if (!emprunt) {
        return res.status(404).json({ msg: "Emprunt non trouvé" })
      }

      return res.status(200).json({ emprunt })
   
  },
   createEmprunt: async (req: Request, res: Response) => {
      const { bookId,userId,dateEmprunt,dateRetour }: Emprunt = req.body
      if (!userId || !bookId ) {
         res.status(400).json({ msg: "veuillez remplir tout les champs" })
      } else {
        const livre = await client.book.findUnique({ where: { bookId } })

      if (!livre) {
        return res.status(404).json({ message: "Livre introuvable" })
      }

      if (!livre.disponible) {
        return res.status(400).json({ message: "Livre déjà emprunté" })
      }
     

         const emprunt = await client.emprunt.create({
            data :{
            bookId,
            userId,
            dateEmprunt: new Date(dateEmprunt),
            dateRetour: dateRetour ? new Date(dateRetour) : null
          }
         })

         console.log(emprunt)
         res.status(201).json({
            msg : "emprunt created successfully"
         })
      }
   }
  













   
//   createEmprunt: async (req: Request, res: Response) => {
//     const { bookId, userId, dateEmprunt, dateRetour }:Emprunt = req.body

//     if (!bookId || !userId) {
//       return res.status(400).json({ message: "bookId et userId sont requis" })
//     }

//       const livre = await client.book.findUnique({ where: { bookId } })

//       if (!livre) {
//         return res.status(404).json({ message: "Livre introuvable" })
//       }

//       if (!livre.disponible) {
//         return res.status(400).json({ message: "Livre déjà emprunté" })
//       }

//       const emprunt = await client.emprunt.create({
//         data: {
//           bookId,
//           userId,
//           dateEmprunt: new Date(dateEmprunt),
//           dateRetour: dateRetour ? new Date(dateRetour) : null
//         }
//       })

//       console.log(emprunt)
// //       // Met à jour l'état du livre à indisponible
// //       await client.book.update({
// //         where: { bookId },
// //         data: { disponible: false }
// //       })

// //       return res.status(201).json({ message: "Emprunt enregistré avec succès", emprunt })
// //
     
//    }

//   //  Mise à jour d'un emprunt (ex: retour)
//   updateEmprunt: async (req: Request, res: Response) => {
//     // À compléter : par exemple, pour mettre une dateRetour
//     return res.status(501).json({ msg: "Non implémenté" })
//   },

//   //  Obtenir tous les emprunts
//   getAllEmprunts: async (req: Request, res: Response) => {
//     try {
//       const emprunts = await client.emprunt.findMany({
//         include: {
//           user: true,
//           book: true
//         }
//       })

//       return res.status(200).json({ emprunts })
//     } catch (error) {
//       console.error("Erreur getAllEmprunts:", error)
//       return res.status(500).json({ msg: "Erreur serveur" })
//     }
//   }
}

export default empruntsCtl


