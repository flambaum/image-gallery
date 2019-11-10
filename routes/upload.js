const router = require(`express`).Router();
const checkAuth = require('../middlewares/checkAuth');
const uploadImage = require('../middlewares/uploadImage');
const saveImage = require('../libs/saveImage');
const { sendEmail } = require('../libs/email');


router.get('/', checkAuth, function (req, res, next) {
    res.render('upload');
});

router.post('/', checkAuth, uploadImage, async function (req, res, next) {
   
    const userID = req.session.passport.user;
    let filedata = req.file;
    const errMessage = 'Ошибка при загрузке изображения';

    if (!filedata) {
        sendEmail(email, errMessage);
        return res.render('upload', {err: errMessage});
    }
    
    const {message, email} = req.body;
    
    try{
        await saveImage(filedata, message, userID)
    } catch (err) {
        sendEmail(email, errMessage);
        return next({message: errMessage});
    }

    sendEmail(email, 'Изображение успешно загружено');

    res.redirect('/gallery');

});

module.exports = router;