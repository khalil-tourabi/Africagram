import express from "express"
import dotenv from "dotenv"
import routes from "./routes/index.js";
dotenv.config()
const app=express()


app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes)

const port=process.env.APP_PORT || 8000
app.listen(port,()=>{
 console.log(`Server is running on PORT ${port}....`)
})