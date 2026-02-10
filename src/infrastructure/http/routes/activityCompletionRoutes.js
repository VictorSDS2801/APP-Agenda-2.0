const express = require("express")
const ActivityCompletionController = require("../controllers/ActivityCompletionController")
const authMiddleware = require("../middlewares/authMiddleware")

const router = express.Router()
const activityCompletionController = new ActivityCompletionController()

router.use(authMiddleware)

router.get("/my-activities", (req, res) => activityCompletionController.getMyActivities(req, res))
router.post("/toggle/:activityId", (req, res) => activityCompletionController.toggle(req, res))

module.exports = router