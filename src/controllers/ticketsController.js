const ticketsModel = require("../models/ticketsModel");

const getAllTickets = async (req, res) => {
    try {
        const tickets = await ticketsModel.getTickets();
        res.json(tickets);
    } catch (error) {
        res.status(404).json({ message: "Erro ao buscar ingressos"});
    }
};

module.exports = { getAllTickets };