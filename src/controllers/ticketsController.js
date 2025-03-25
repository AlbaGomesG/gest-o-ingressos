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
        const precosMinimos = {
            "Pista Vip": 100,
            "Camarote": 300,
            "Arquibancada": 80
        };
        if (preco < precosMinimos[categoria]) {
            throw new Error (`Valor mínimo para ${categoria} é R${precosMinimos[categoria]},00`);
        }
        const newTicket = await ticketsModel.createTicket(evento, local, data_evento, categoria, preco, quantidade_disponivel);
        res.status(201).json(newTicket);
    } catch (error) {
            if (error.code === "23505") {
                return res.status(400).json({ message: "Ingresso já cadastrado, tente outra vez!"})
            }
            res.status(500).json({ message: "Erro ao criar ingresso"});
    }
};

const updateTicket = async (req, res) => {
    try {
        const { categoria, preco } = req.body;
        const updateTicket = await ticketsModel.updateTicket(req.params.id, categoria, preco);
        if (!updateTicket) {
            return res.status(404).json({ message: "Ingresso não encontrado!"});
        }
        res.json(updateTicket);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar ingresso"});
    }
};

const deleteTicket = async (req, res) => {
    try {
        const message = await ticketsModel.deleteTicket(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar Ingresso!"});
    }
};

const vendaTicket = async (req, res) => {
    try {
        const { id, quantidade } = req.body;
        const updatedTicket = await ticketsModel.vendaTicket(id, quantidade);
        res.json({message: "Ingresso vendido com sucesso", ticket: updatedTicket});
    } catch (error) {
        res.status(404).json({message: "Erro ao vender ingresso"});
}
};

module.exports = { getAllTickets, getTicketById, createTicket, updateTicket, deleteTicket, vendaTicket };