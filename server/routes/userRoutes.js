const router = require("express").Router();

const {
  
  getUser
} = require('../controllers/userController');



router.get('/:userId', getUser);


module.exports = router;