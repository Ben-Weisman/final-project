const express = require('express');
const router = express.Router();
const usersController = require('./../controllers/userController');


// validate user credentials
//
router.post('/login',usersController.validate); // done

router.post('/add',usersController.createUser); // done

router.delete('/remove',usersController.removeUser);




module.exports = router;