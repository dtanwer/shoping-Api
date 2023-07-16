import { clientModel } from "../model/Client.js";
export const clientSignUp = async (req, res) => {
    const { email } = req.body;
    let client = await clientModel.findOne({ email });
    if (client) {

        return res.status(209).send("Email  Already Exist!!");
    }

    try {
        const newClient = new clientModel(req.body)
        await newClient.save();
        return res.status(200).send("Register Successfuly!!");
    } catch (error) {
        console.log(error)
        return res.status(400).json(error);
    }
}
export const getAllVendor = async (req, res) => {
    try {
        let clients = await clientModel.find({type:"vendor"});
        return res.status(200).json(clients);
    } catch (error) {
        console.log(error)
    }

}
export const getAllUser = async (req, res) => {
    try {
        let clients = await clientModel.find({type:"user"});
        return res.status(200).json(clients);
    } catch (error) {
        console.log(error)
    }

}

export const clientLogin = async (req, res) => {

    const { email, password } = req.body
    let user = await clientModel.findOne({ email });
    if (!user) {
        user = await clientModel.findOne({ phone: email });
        if (!user) {
            return res.status(204).send("User Not Found");
        }

    }

    if (user.password === password && user.isActive) {
        return res.status(200).json(user);
    }
    else if(!user.isActive)
    {
        return res.status(205).send("User Block");
    }
    else {
        return res.status(401).send("Password is wrong!!");
    }

}
export const checkUser = async (req, res) => {
    const { email } = req.body
    const user = await clientModel.findOne({ email });
    return res.status(200).json(user);
}
export const addToCart = async (req, res) => {
    const id = req.params.id;
    const user = await clientModel.updateOne({ _id: id }, { $push: { cart: req.body } });
    return res.status(200).json(user);
}
export const removeToCart = async (req, res) => {
    const id = req.params.id;
    const user = await clientModel.updateOne({ _id: id }, { $pull: { cart: req.body } });
    return res.status(200).json(user);
}
export const disableClient = async (req, res) => {
    const id = req.params.id;
    const user = await clientModel.updateOne({ _id: id }, { isActive: false });
    return res.status(200).json(user);
}
export const updateClient = async (req, res) => {
    const id = req.params.id;
    const user = await clientModel.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(user);
}
export const addAddress = async (req, res) => {
    const id = req.params.id;
    const user = await clientModel.updateOne({ _id: id }, { $push: { address: req.body } });
    return res.status(200).json(user);
}
export const removeAddress = async (req, res) => {
    const id = req.params.id;
    const user = await clientModel.updateOne({ _id: id }, { $pull: { address: req.body } });
    return res.status(200).json(user);
}