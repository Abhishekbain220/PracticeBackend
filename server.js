require("dotenv").config()
let db=require("./model/connect")
let express=require("express")
let cookieParser=require("cookie-parser")
let morgan=require("morgan")
let cors=require("cors")
const { errorHandler } = require("./middleware/errorHandler")
let PORT=process.env.PORT || 3000
let app=express()
let UserRouter=require("./Routes/UserRouter")
let ProductRouter=require("./Routes/ProductRouter")

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(morgan("tiny"))

let allowedOrigins=[
    "http://localhost:5173",
    "https://practice-frontend-gules.vercel.app/"
]

app.use(cors({
    origin:allowedOrigins,
    credentials:true
}))

// Routes
app.use("/user",UserRouter)
app.use("/product",ProductRouter)

app.use("/",(req,res)=>{
    res.send("Backend is Running bro")
})
app.use((req,res,next)=>{
    res.status(404).json({
        success:false,
        message:"Route not found"
    })
})

app.use(errorHandler)


app.listen(PORT,()=>{
    console.log("Server running on PORT",PORT)
})