const {Pool} = require("pg"); //Tiene permanentemente abiertas una cantidad de conexiones fija (minimiza la latencia de conexión)
const config = require("./config");

const pool = new Pool ({
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE,
})

const getTeamsSQL = `
SELECT * FROM teams;
`;

const getPlayersSQL = `
SELECT * FROM players;
`;

// $1 indica el primer dato que viene de fuera de la consulta
const newTeamsSQL = `
INSERT INTO teams (name) VALUES ($1) RETURNING *; 
`;

const newPlayersSQL = `
INSERT INTO players (team_player,name_player, num_player, roll_player) VALUES ($1,$2,$3,$4) RETURNING *; 
`;

const updateTeamsSQL = `
UPDATE teams SET name = $2 WHERE team_id = $1 RETURNING *; 
`;

const updatePlayersSQL = `
UPDATE players SET team_player = $2,
                   num_player  = $4,
                   roll_player = $5
WHERE player_id = $1 and name_player = $3 RETURNING *; 
`;

const deleteTeamsSQL = `
DELETE FROM teams WHERE team_id = $1 RETURNING *; 
`;

const deletePlayersSQL = `
DELETE FROM players WHERE player_id = $1 RETURNING *; 
`;

const getTeams = async () => {
    const result = await pool.query(getTeamsSQL);
    return result.rows;
}

const getPlayers = async () => {
    const result = await pool.query(getPlayersSQL);
    return result.rows;
}

const newTeams = async (name) => {
    const result = await pool.query(newTeamsSQL, [name]);
    return result.rows[0];
}

const newPlayers = async (team_player, name_player, num_player, roll_player) => {
    const result = await pool.query(newPlayersSQL, [team_player,name_player, num_player, roll_player]);
    return result.rows;
}

const updateTeams = async (team_id, name) => {
    try {
     const result = await pool.query(updateTeamsSQL, [team_id, name]);
     if(result.rowCount < 1) {
        return { ok: true, found: false };
     }
     return { ok:true, found: true, data: result.rows[0] };
    } catch(e) {
        return { ok: false, data: e.toString() };
    }
}

const updatePlayers = async (player_id, team_player, name_player, num_player, roll_player) => {
    try {
     const result = await pool.query(updatePlayersSQL, [player_id, team_player, name_player,num_player, roll_player]);
     if(result.rowCount < 1) {
        return { ok: true, found: false };
     }
     return { ok:true, found: true, data: result.rows[0] };
    } catch(e) {
        return { ok: false, data: e.toString() };
    }    
}

const deleteTeams = async (team_id) => {
    try {
     const result = await pool.query(deleteTeamsSQL, [team_id]);
     if(result.rowCount < 1) {
        return { ok: true, found: false };
     }
     return { ok:true, found: true, data: result.rows[0] };
    } catch(e) {
        return { ok: false, data: e.toString() };
    }
    
}

const deletePlayers = async (player_id) => {
    try {
     const result = await pool.query(deletePlayersSQL, [player_id]);
     if(result.rowCount < 1) {
        return { ok: true, found: false };
     }
     return { ok:true, found: true, data: result.rows[0] };
    } catch(e) {
        return { ok: false, data: e.toString() };
    }
    
}



module.exports = {
    getTeams,
    newTeams,
    updateTeams,
    deleteTeams,
    getPlayers,
    newPlayers,
    updatePlayers,
    deletePlayers,
};