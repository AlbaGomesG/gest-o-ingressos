const pool = require("../config/database");

const getTickets = async () => {
    const result =  await pool.query("SELECT * FROM tickets");
    return result.rows;
};


module.exports = { getTickets }; 