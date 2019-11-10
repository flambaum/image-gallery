const router = require(`express`).Router();
const checkAuth = require('../middlewares/checkAuth');
const Images = require('../models/images');


const getUserID = (req) => {
	return req.isAuthenticated() ? req.session.passport.user : null;
}

router.get('/', (req, res) => {	
	res.render('index', {user: getUserID(req)});
})

router.get('/gallery', checkAuth, async (req, res, next) => {
	const userID = getUserID(req);
	const images = await Images.getByUserID(userID);
	res.render('gallery', { images });
});

module.exports = router;