const express= require('express')
const cors= require('cors')

const app = express()
app.use(cors())

const port = process.env.PORT || 8080

app.get("/",(req,res)=>{
    res.json({message:"server is running"})

})
app.listen(PORT,()=>console.log("server is running"))