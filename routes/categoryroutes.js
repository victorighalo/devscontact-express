const express = require('express');
const router = express.Router()
const categorycontroller = require('../controllers/categoryController')
const apiMiddleware = require('../app/middleware/api')

router.get('/', categorycontroller.category_get_all)

router.get('/:categoryId', categorycontroller.category_get);

router.post('/',apiMiddleware, categorycontroller.category_create)

router.put('/',apiMiddleware, categorycontroller.category_update)

router.delete('/',apiMiddleware, categorycontroller.category_delete);

module.exports = router;