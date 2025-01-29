import express, { Response, Request, Router } from 'express'
import authRouter from './routes/auth.routes'
import userRouter from './routes/user.routes'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(helmet())
app.use(compression())
app.use(cookieParser())
const limiter = rateLimit({
    max: 3,
    windowMs: 1000 * 15 * 60 //15 minutos
})
app.use(limiter)

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Bienvenido al backend (api rest)')
})

export default app