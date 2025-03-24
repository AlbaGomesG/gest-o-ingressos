const pool = require("../config/database");

const getTickets = async () => {
    const result =  await pool.query("SELECT * FROM tickets");
    return result.rows;
};

const getTicketById = async (id) => {
    const result = await pool.query("SELECT * FROM tickets WHERE id = $1", [id]);
    return result.rows[0];
};

const createTicket = async (id) => {
    const result = await pool.query("INSERT INTO tickets (evento, local, data_evento, categoria, preco, quantidade_disponivel) VALUES ($1, $2) RETURNING *", [evento, local, data_evento, categoria, preco, quantidade_disponivel]);
    return result.rows[0]; 
};


module.exports = { getTickets, getTicketById, createTicket };