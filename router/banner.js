import express from 'express';
import { bannerModel } from '../model/Banner.js';
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const resp = await bannerModel.find()
        res.status(200).json(resp)
    } catch (error) {
        console.log(error);
    }
})
router.post('/', async (req, res) => {
    try {
        const banner=new bannerModel(req.body);
        await banner.save();
        return res.status(200).json(banner);
    } catch (error) {
        console.log(error)
    }
})
router.put('/:id', async (req, res) => {
    const id=req.params.id;
    try {
        const data=await bannerModel.findByIdAndUpdate(id,req.body,{new:true});
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
})

export default router