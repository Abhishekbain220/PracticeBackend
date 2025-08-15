let Product = require("../model/productSchema")
const CustomError = require("../utils/customError")


module.exports.createProduct = async (req, res, next) => {
    try {
        let { title, rate } = req.body
        let newProduct = await Product.create({
            title, rate
        })
        if (!newProduct) return next(new CustomError("Product not Created", 400))
        await newProduct.save()
        res.status(200).json({
            message: "Product created successfully",
            newProduct
        })

    } catch (error) {
        console.log(error)
        next(new CustomError(error.message, 500))
    }
}


module.exports.viewProduct = async (req, res, next) => {
    try {
        let products = await Product.find()
        if (!products) return next(new CustomError("Products not found", 400))
        res.status(200).json({
            message: "Products found successfully",
            products
        })

    } catch (error) {
        console.log(error.message)
        next(new CustomError(error.message, 500))
    }
}
module.exports.singalProduct = async (req, res, next) => {
    try {
        let { id } = req.params
        let product = await Product.findOne({_id:id})
        if (!product) return next(new CustomError("Product not found", 400))
        res.status(200).json({
            message: "Product found successfully",
            product
        })

    } catch (error) {
        console.log(error.message)
        next(new CustomError(error.message, 500))
    }
}

module.exports.updateProduct = async (req, res, next) => {
    try {
        let { id } = req.params
        let { title, rate } = req.body
        let updatedproduct = await Product.findByIdAndUpdate(id,req.body)
        await updatedproduct.save()
        res.status(200).json({
            message:"Product Updated Successfully",
            updatedproduct
        })
    } catch (error) {
        console.log(error.message)
        next(new CustomError(error.message))
    }
}

module.exports.deleteProduct=async(req,res,next)=>{
    try {
        let {id}=req.params
        let product=await Product.findByIdAndDelete(id)
        if(!product)return next(new CustomError("Product not found",400))
            res.status(200).json({
                message:"Product deleted successfully",
                product
            })
    } catch (error) {
        console.log(error)
        next(new CustomError(error.message,500))
    }
}