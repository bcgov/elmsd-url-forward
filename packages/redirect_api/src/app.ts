import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import "dotenv/config"

import urlRouter from "./routes/url.route"

const corsOptions = {
  origin: process.env.ORIGIN_URL || process.env.OPENSHIFT_NODEJS_ORIGIN_URL || "http://localhost:3001",
  credentials: true,
  optionsSuccessStatus: 200
}

const app = express()

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan("[:date] :method :url :status :res[content-length] - :remote-addr - :response-time ms"))
app.set("trust proxy", "loopback, linklocal, uniquelocal")
app.use(cors(corsOptions))
app.use(helmet())

// health check
app.get("/", (req: Express.Request, res: any) => {
  res.send("Healthy!")
})

app.use("/redirect", urlRouter)

const port = process.env.PORT || "8002"
app.listen(port, () => {
  console.info(`server started at :${port}`)
})
