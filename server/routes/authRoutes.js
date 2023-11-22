const router = require("express").Router();

const {
  signup,
  login,
  google,
  signOut
} = require('../controllers/authController');


router.post('/signup', signup);
router.post('/login', login);
router.post('/google', google);
router.get('/signOut', signOut);


module.exports = router;