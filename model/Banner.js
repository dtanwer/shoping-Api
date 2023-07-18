import mongoose from 'mongoose'
const BannerSchma = new mongoose.Schema({
    images:[]
},
    { timestamps: true }
)

export const bannerModel = mongoose.model('banner', BannerSchma)