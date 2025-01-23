import express, { Response, Request, Router } from 'express'
import authRouter from './routes/auth.routes'
import userRouter from './routes/user.routes'

const app = express()

app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Bienvenido al backend (api rest)')
})

export default app