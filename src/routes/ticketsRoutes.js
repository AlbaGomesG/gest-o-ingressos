const express = require("express");
const router = express.Router();
const ticketsController = require("../controllers/ticketsController");

router.get("/tickets", ticketsController.getAllTickets);

module.exports = router;