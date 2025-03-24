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

const createTicket = async (req, res) => {
    try {
        const { evento, local, data_evento, categoria, preco, quantidade_disponivel } = req.body;
        const newTicket = await ticketsModel.createTicket(evento, local, data_evento, categoria, preco, quantidade_disponivel);
        res.status(201).json(newTicket);
    } catch (error) {
            if (error.code === "23505") {
                return res.status(400).json({ message: "Ingresso já cadastrado, tente outra vez!"})
            }
            res.status(500).json({ message: "Erro ao criar ingresso"});
    }
};

module.exports = { getAllTickets, getTicketById, createTicket };