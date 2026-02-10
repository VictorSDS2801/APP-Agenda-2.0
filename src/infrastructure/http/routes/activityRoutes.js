const express = require('express');
const ActivityController = require('../controllers/ActivityController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();
const activityController = new ActivityController();


router.get('/', authMiddleware, (req, res) => activityController.list(req, res));

router.post('/', authMiddleware, adminMiddleware, (req, res) => activityController.create(req, res));
router.put('/:id', authMiddleware, adminMiddleware, (req, res) => activityController.update(req, res));
router.delete('/:id', authMiddleware, adminMiddleware, (req, res) => activityController.delete(req, res));

module.exports = router;