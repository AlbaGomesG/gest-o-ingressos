const pool = require("../config/database");

const getTickets = async () => {
    const result =  await pool.query("SELECT * FROM tickets");
    return result.rows;
};

const getTicketById = async (id) => {
    const result = await pool.query("SELECT * FROM tickets WHERE id = $1", [id]);
    return result.rows[0];
};

const createTicket = async (evento, local, data_evento, categoria, preco, quantidade_disponivel) => {
    const result = await pool.query("INSERT INTO tickets (evento, local, data_evento, categoria, preco, quantidade_disponivel) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [evento, local, data_evento, categoria, preco, quantidade_disponivel]);
    return result.rows[0]; 
};

const updateTicket = async (id, categoria, preco) => {
    const result = await pool.query("UPDATE tickets SET categoria = $1, preco = $2 WHERE id = $3 RETURNING *", [categoria, preco, id]);
    return result.rows[0];
};

const deleteTicket = async (id) => {
    const result = await pool.query("DELETE FROM tickets WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) {
        return { error: "Ingresso não encontrado!"};
    }
    return { message: "Ingresso deletado com sucesso"};
};

const vendaTicket = async (id, quantidade) => {
    const ticket = await getTicketById(id);
    if (!ticket) {
        return { error: "Ingresso não encontrado para venda" };
    }

    if (ticket.quantidade_disponivel <= 0) {
        return { error: "Ingressos para esse evento foram esgotados" };
    }

    const result = await pool.query(
        "UPDATE ingressos SET quantidade_disponivel = $1 WHERE id = $2 RETURNING *",
        [ticket.quantidade_disponivel - quantidade, id]
    );
    return result.rows[0];
}

module.exports = { getTickets, getTicketById, createTicket, updateTicket, deleteTicket, vendaTicket};