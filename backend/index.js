import express from "express"
// import Dotenv from "dotenv"

import "dotenv/config";



const PORT = process.env.PORT


const app = express()
app.listen(PORT, () => {
    console.log(`server listen at ${PORT}`)
})
