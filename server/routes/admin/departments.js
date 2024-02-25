const isAdmin = require('../../middlewares/is-admin');
const express = require('express');
const adminController = require('../../controllers/admin');

const router = express.Router();

router.post('/', isAdmin, adminController.addDepartment);
router.put('/:departmentId', isAdmin, adminController.editDepartment);
router.delete('/:departmentId', isAdmin, adminController.deleteDepartment);


module.exports = router;