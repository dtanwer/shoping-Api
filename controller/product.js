import { productModel } from "../model/Product.js";
export const addProduct = async (req, res) => {
    try {
        const newProduct = new productModel(req.body)
        await newProduct.save();
        return res.status(200).send("Product Saved!!");
    } catch (error) {
        console.log(error)
        return res.status(400).json(error);
    }
}

export const updateProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const resp = await productModel.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(resp)
    } catch (error) {
        console.log(error)
    }
}
export const getProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const resp = await productModel.findById(id)
        res.status(200).json(resp)
    } catch (error) {
        console.log(error)
    }
}
export const getProductsByCategory = async (req, res) => {
    const category = req.params.name;
    try {
        const resp = await productModel.find({ category })
        res.status(200).json(resp)
    } catch (error) {
        console.log(error)
    }
}
export const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const resp = await productModel.findByIdAndDelete(id)
        res.status(200).json(resp)
    } catch (error) {
        console.log(error)
    }
}
export const getProducts = async (req, res) => {
    try {
        const resp = await productModel.find({ isDraft: false, isDelete: false })
        res.status(200).json(resp)
    } catch (error) {
        console.log(error)
    }
}
export const getSearchProducts = async (req, res) => {
    const q = req.params.q;
    try {
        // const data = await productModel.createIndex({ title: "text", category: "text" });
        const resp = await productModel.find(
            {
                "$or":[
                    {"title":{$regex:q}},
                    {"category":{$regex:q}},
                ]
            }
        )
        res.status(200).json(resp)
    } catch (error) {
        res.status(200).json(error)
        // console.log()
    }
}
export const getTopProducts = async (req, res) => {
    try {
        const resp = await productModel.aggregate([{ "$match": { isDraft: false } }, { "$sort": { oderNum: -1 } }, { "$limit": 4 }])
        res.status(200).json(resp)
    } catch (error) {
        console.log(error)
    }
}
export const getProductsByOwner = async (req, res) => {
    const vendorId = req.params.vendorId;
    try {
        const resp = await productModel.find({ vendorId, isDraft: false, isDelete: false })
        res.status(200).json(resp)
    } catch (error) {
        return res.status(400).json(error);
    }
}
export const getDraftProductsWithOwner = async (req, res) => {
    const vendorId = req.params.vendorId;
    try {
        const resp = await productModel.find({ vendorId, isDraft: true, isDelete: false })
        res.status(200).json(resp)
    } catch (error) {
        console.log(error)
    }
}