const isAdmin = require('../../middlewares/is-admin');
const express = require('express');
const departmentsController = require('../../controllers/admin/departments');

const router = express.Router();

router.post('/', isAdmin, departmentsController.addDepartment);
router.put('/:departmentId', isAdmin, departmentsController.editDepartment);
router.delete('/:departmentId', isAdmin, departmentsController.deleteDepartment);


module.exports = router;