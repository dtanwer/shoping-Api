export const uploadImage =  (req, res) => {
    const pic = req.file.filename;
    res.send(pic);
}