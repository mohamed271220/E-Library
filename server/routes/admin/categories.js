const isAdmin = require('../../middlewares/is-admin');
const express = require('express');
const categoriesController = require('../../controllers/admin/categories');
const { body } = require("express-validator");
const router = express.Router();

router.post('/', body("name").notEmpty().withMessage('Name is required') ,isAdmin, categoriesController.addCategory);
router.put('/:categoryId', isAdmin, categoriesController.editCategory);
router.delete('/:categoryId', isAdmin, categoriesController.deleteCategory);


module.exports = router;