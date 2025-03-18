const ticketsModel = require("../models/ticketsModel");

const getAllTickets = async (req, res) => {
    try {
        const tickets = await ticketsModel.getTickets();
        res.json(tickets);
    } catch (error) {
        res.status(404).json({ message: "Erro ao buscar ingressos"});
    }
};

const getTicketById = async (req, res) => {
    try {
        const tickets = await ticketsModel.getTicketById(req.params.id);
        if (!tickets) {
            return res.status(404).json({ message: "Ingresso não encontrado"});
        }
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar ingresso"});
    }
};

module.exports = { getAllTickets, getTicketById };