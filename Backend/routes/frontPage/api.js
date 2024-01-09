const express = require("express");
const fs = require("fs");
const router = express.Router();


const { getSlider } = require("../../app/controllers/frontPageController");


router.get("/slider", getSlider);
router.get("/login", getSlider);




module.exports = router;