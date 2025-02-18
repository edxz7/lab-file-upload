const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', { message: req.flash('error')});
});

router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup',
  failureFlash : true
}));
// router.post('/signup', async (req, res) => {
//     const { _id } = req.user;
//     const { description } = req.body;
//     // Gracias a multer, que parsea el archivo que recibimos del formulario, tenermos la propiedad file del request (req.file) con la información del archivo procesado.
//     const { secure_url, originalname } = req.file;  
//     await Post.create({
//       description,
//       creatorId: _id,
//       imgPath: secure_url,
//       imgName: originalname
//     });
//     res.redirect('/');
// })
router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
        user : req.user
    });
});

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
