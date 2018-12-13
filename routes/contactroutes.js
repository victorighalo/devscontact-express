const express = require('express');
const router = express.Router()
const contactController = require('../controllers/contactControllers')
const apiMiddleware = require('../app/middleware/api')

router.get('/', contactController.contact_get_all);

router.get('/:contactId', contactController.contact_get);

router.post('/',apiMiddleware, contactController.contact_create)

router.put('/',apiMiddleware, contactController.contact_update)

router.delete('/',apiMiddleware, contactController.contact_delete)

module.exports = router;