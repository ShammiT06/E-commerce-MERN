const express = require("express")
const cors = require("cors")
const mongoose=require("mongoose")
require("dotenv").config()
const app = express()
const PORT=process.env.PORT||5000

app.use(express.json())
app.use(cors())


var img = []
var female=[]
var kids=[]
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to Database")
}).catch((error)=>{
    console.log("Not connected to databse",error)
})

const productschema= new mongoose.Schema({
    image:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    discount:{type:Number,required:true},
    size:{type:String,required:true}

})


const Product = mongoose.model("Product",productschema)

const Female=mongoose.model("Female",productschema)

const Kids=mongoose.model("Kids",productschema)



app.get("/showlad",async (req,res)=>{
    try {
        const female = await Female.find();  // Fetch all products
        res.json(female);  // Send response in JSON format
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Error retrieving products" });
    }

})





app.post("/foundkids", async (req,res) => {
    try{
        const redmi= await Kids.find()
        res.json(redmi)
    }
    catch(error){
        console.log("Error in fetching data from databse")
    }
    
})


app.post("/showarr", async function (req, res) {
    try {
        const products = await Product.find();  // Fetch all products
        res.json(products);  // Send response in JSON format
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Error retrieving products" });
    }
});

app.post("/female",function(req,res){
    var fe=req.body.newdet
    female.push(fe)
    console.log(fe)
    res.send(female)

    const newprod = new Female({
        image:fe.img,
        description:fe.description,
        price:fe.price,
        discount:fe.discount,
        size:fe.size

    })
    newprod.save()
    console.log("Data Saved in Databse")

})

app.post("/addedkit",function(req,res){
    var newdata=req.body.child
    kids.push(newdata)
    console.log(newdata)

    const newkids = new Kids({
        image:newdata.img,
        description:newdata.description,
        price:newdata.price,
        discount:newdata.discount,
        size:newdata.size

    })
    newkids.save()
    console.log("Data Saved to Database")





})



app.post("/addnew",function(req,res){
    var newone=req.body.newItem;
    var link=newone.img
    img.push(newone)

    const newproduct = new Product({
        image:link,
        description:newone.description,
        price:newone.price,
        discount:newone.discount,
        size:newone.size

    })
    newproduct.save()

    console.log("Data Saved to Database")

})
app.listen(PORT, function () {
    console.log(`Server Started on ${PORT}`);
})