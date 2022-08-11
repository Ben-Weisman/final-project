const express = require('express');
const router = express.Router();
const usersController = require('./../controllers/userController');


// validate user credentials
//
router.post('/login',usersController.validate); // migrated to mongo - done --> Gets {email:,password:}

router.post('/add',usersController.createUser); // migrated to mongo - done --> Gets: {email:,password:,name:,isAdmin:}

router.delete('/remove',usersController.removeUser); // migrated to mongo - done --> Gets: {email}




module.exports = router;