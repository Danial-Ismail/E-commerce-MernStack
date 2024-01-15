import express from "express" 
import colors from "colors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoute.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cors from "cors"
import path from "path";

dotenv.config()
const app=express()
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname,"./client/build")))

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/category",categoryRoutes)
app.use("/api/v1/product",productRoutes);

app.use("*",function(req,res){
res.sendFile(path.join(__dirname,"./client/build/index.html"))
});


const PORT=process.env.PORT || 8000


app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT} `.bgCyan.white)
    connectDB()
})