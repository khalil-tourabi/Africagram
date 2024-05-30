import express from "express"
import dotenv from "dotenv"
import routes from "./routes/index.js";
dotenv.config()

const app=express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import routerAuth from "./routes/AuthRoutes.js";

app.use("/api", routerAuth);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.all('*', (req, res, next) => {
    res.status(400).json({success: false, msg: 'wrong url path'})
    console.log(`${req.originalUrl} doesnt exist`)
    next()
})

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes)

const port=process.env.APP_PORT || 8000
app.listen(port,()=>{
 console.log(`Server is running on PORT ${port}....`)
})