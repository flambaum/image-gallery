const router = require(`express`).Router();
const passport = require('passport');
const checkAuth = require('../middlewares/checkAuth');
const User = require('../models/user')

router.get('/', (req, res) => {
    res.render('auth');
});

router.post('/',
    passport.authenticate('local', { 
        successRedirect: '/',
        failureRedirect: '/auth',
    })
);

router.get('/logout', checkAuth, (req, res) => {
    req.logOut();
    res.redirect('/');
  });

router.get('/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/auth' }),
    function(req, res) {
        res.redirect('/');
    }
);

router.get('/registration', (req, res) => {
    res.render('registration');
});

router.post('/registration', async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) 
        res.render('registration', {err: 'Неверные данные'});
    await User.create(username, password);
    res.redirect('/auth');
});

module.exports = router;