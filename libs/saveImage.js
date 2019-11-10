const Images = require('../models/images');
const sharp = require('sharp');
const path = require(`path`);
const uuid = require('uuid/v4');


module.exports = async function saveFile(fileData, message, userID) {
    const { buffer } = fileData;
    const name = uuid();

    sharp(buffer)
        .toFile(path.join(__approot, 'uploads', name))
        
    await sharp(buffer)
        .resize(300)
        .toFile(path.join(__approot, 'uploads', 'mini', name))

    Images.insertImage(name, message, userID);
}