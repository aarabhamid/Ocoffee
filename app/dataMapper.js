import client from "./database.js";

const dataMapper = {
    // Méthode de récupération de tout les cafés et par origine (pour la page catalogue)
    getAllCoffees: async (originName) => {
        let sql = "";
        if (originName && originName !== "favicon.ico") {
            sql = `SELECT * FROM coffee WHERE origin = '${originName}';`;
        } else {
            sql = "SELECT * FROM coffee;";
        }
        const result = await client.query(sql);
        return result.rows;
    },

    getLastThreeCoffee: async () => {
        const sql = `SELECT * FROM coffee ORDER BY id DESC LIMIT 3;`;
        const result = await client.query(sql);
        return result.rows;
    },

    getOneCoffee: async (coffeeId) => {
        const sql = `SELECT * FROM coffee WHERE id = ${coffeeId}`;
        const result = await client.query(sql);
        return result.rows[0];
    },

    // Nouvelle méthode pour récupérer toutes les origines distinctes
    getAllOrigins: async () => {
        const sql = "SELECT DISTINCT origin FROM coffee;";
        const result = await client.query(sql);
        return result.rows.map(row => row.origin);
    }
};

export default dataMapper;
