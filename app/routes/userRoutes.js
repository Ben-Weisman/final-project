const express = require('express');
const router = express.Router();
const usersController = require('./../controllers/userController');


// validate user credentials
//
router.post('/login',usersController.validate); // migrated to mongo - done --> Gets {email:,password:}

router.post('/add',usersController.createUser); // migrated to mongo - done --> Gets: {email:,password:,name:}

router.delete('/remove',usersController.removeUser); // migrated to mongo - done --> Gets: {email}

router.post('/update', usersController.update) // Gets: {email:, fieldToUpdate:, newValue:} // NOT ON ELASTIC YET



module.exports = router;