import { Router } from "express"
import { AuthController } from "../controlers/auth.controller"
import {isAuthenticate} from "@/middlewares/auth.middleware"
const router = Router()

router.get('/profile',isAuthenticate ,AuthController.profile)

//Crea el endpoint que liste todos los usuarios de la web
// A este ednpoint solo puede acceder el usuario admin

export default router   