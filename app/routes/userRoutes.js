const express = require('express');
const router = express.Router();
const usersController = require('./../controllers/userController');


// validate user credentials
router.post('/login',usersController.validate);

router.post('/add',usersController.createUser);

router.delete('/remove',usersController.removeUser);




module.exports = router;