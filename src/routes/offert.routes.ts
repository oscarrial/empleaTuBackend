import { Router } from "express";
import { loginValidation, registerValidation } from "../middlewares/validators.middleware";
import { ValidationMiddleware } from "../middlewares/validation.middleware";
import { OfferController } from "../controllers/offer.controller";
import { isAuthenticate } from "@/middlewares/auth.middleware";
const router = Router()

//API REST FULL


//GET Listar todas las ofertas localhost:3000/api/offers/?title=react&category=dam
router.get('/', OfferController.getAll)
//localhost:3000/api/offers/xxxx
router.get('/:id', OfferController.getById)
//POST añadir una oferta nueva localhost:3000/api/offers/  {body}
router.post('/', isAuthenticate, OfferController.create)
//DELETE Borrar una oferta localhost:3000/api/offers/XXXX  
router.delete('/:id',isAuthenticate, OfferController.delete)
//PUT modificar una oferta localhost:3000/api/offers/XXXX  {body}
router.put('/:id',isAuthenticate, OfferController.update)   

// Calificamos una oferta x   {body}
router.post('/:id/rate/',isAuthenticate,OfferController.rate)  
// Vemos que calificación (total) se le ha data a una oferta X
router.get('/:id/rate/', isAuthenticate, OfferController.getRate)



export default router