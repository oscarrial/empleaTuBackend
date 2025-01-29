import { Router } from "express"
import { UserController } from "../controlers/user.controller"
import {isAuthenticate} from "@/middlewares/auth.middleware"
const router = Router()

router.get('/profile',isAuthenticate ,UserController.profile)

//Crea el endpoint que liste todos los usuarios de la web
// A este ednpoint solo puede acceder el usuario admin

export default router   