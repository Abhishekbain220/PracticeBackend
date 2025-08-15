let express=require("express")
const { createProduct, viewProduct, updateProduct, deleteProduct, singalProduct } = require("../controller/productController")
let router=express.Router()

router.post("/createProduct",createProduct)
router.get("/viewProduct",viewProduct)
router.get("/singalProduct/:id",singalProduct)
router.put("/updateProduct/:id",updateProduct)
router.delete("/deleteProduct/:id",deleteProduct)


module.exports=router