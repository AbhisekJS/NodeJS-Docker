const controller = require('../controllers/users')
const express = require('express')
const router = express.Router();

//CURD Routes /users

router.get('/', controller.getUsers)
router.get('/:userId', controller.getUser)
router.post('/', controller.addUser)
router.put('/:userId', controller.updateUser)
router.delete('/:userId', controller.deleteUser)

module.exports = router;