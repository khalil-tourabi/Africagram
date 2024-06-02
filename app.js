import express from "express"
import dotenv from "dotenv"
import routes from "./routes/index.js";
import authRoute from "./routes/AuthRoutes.js";

dotenv.config()

const app=express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(authRoute);


app.use(routes)

//Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.all('*', (req, res, next) => {
    res.status(400).json({success: false, msg: 'wrong url path'})
    console.log(`${req.originalUrl} doesnt exist`)
    next()
})

app.use(express.static('./uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const port=process.env.APP_PORT || 8000
app.listen(port,()=>{
 console.log(`Server is running on PORT ${port}....`)
})