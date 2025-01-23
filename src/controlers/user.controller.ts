import { UserService } from "../services/user.services"
import express, { Response, Request, } from 'express'

export class UserController {
    static async profile(req: Request, res: Response) {
        const email = req.body.user.email
        const user = await UserService.getByEmail(email)
        res.status(200).json(user)
    }
}