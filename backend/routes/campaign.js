const express = require("express");
const {
  getCampaigns,
  createCampaign,
  makeDonation,
} = require("../controllers/campaignController");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.get("/", authenticateToken, getCampaigns);
router.post("/", authenticateToken, createCampaign);
router.post("/donations", authenticateToken, makeDonation);

module.exports = router;
