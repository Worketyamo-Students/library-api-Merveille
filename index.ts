import express from "express";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import users from "./routes/user.route.ts";

configDotenv()
const port = process.env.PORT
const app = express()

app.use(bodyParser.json())


app.use("/users", users)

app.listen(port, (err) => {
    if (err) throw err
    console.log('the server is OK')
})