const db = require ('./db');

const okResult = (results) => ({ status: "OK", results })
const errorResult = (details) => ({ status: "ERROR", details })

const { Router } = require('express');

const router = new Router();

router.get("/", async (req, res) => {
    try {
    const players = await db.getPlayers();
    res.json(okResult(players));
    } catch(e) {
        res.status(500).json(errorResult(e.toString()));
    }
});

router.post("/", async (req, res) => {
    const {team_player, name_player, num_player, roll_player} = req.body;
    if(!team_player) {
        return res
            .status(400)
            .json(errorResult("Missing 'team_player' field"));
    }
    if(!name_player) {
        return res
            .status(400)
            .json(errorResult("Missing 'name' field"));
    }
    if(!num_player) {
        return res
            .status(400)
            .json(errorResult("Missing 'num_player' field"));
    }
    if(!roll_player) {
        return res
            .status(400)
            .json(errorResult("Missing 'roll_player' field"));
    }
    try{
        const newPlayers = await db.newPlayers(team_player,name_player, num_player, roll_player);
        res.json(okResult(newPlayers));
    } catch(e) {
        res.status(500).json(errorResult(e.toString()));
    }
});

router.put("/:player_id" , async(req, res) => {
    const {player_id, name_player} = req.params;
    const {team_player, num_player, roll_player} = req.body;
    if(!team_player) {
        return res
            .status(400)
            .json(errorResult("Missing 'team_player' field"));
    }
    if(!num_player) {
        return res
            .status(400)
            .json(errorResult("Missing 'num_player' field"));
    }
    if(!roll_player) {
        return res
            .status(400)
            .json(errorResult("Missing 'roll_player' field"));
    }
    const { ok, found, data} = await db.updatePlayers(player_id,team_player,name_player,num_player, roll_player);
    if(!ok) {
        return res.status(500).json(errorResult(data));
    }else if (!found) {
        return res.status(400).json(errorResult(`Player with ID ${player_id} not found`));
    }else {
        return res.json(okResult(data));
    }
});

router.delete("/:player_id" , async(req, res) => {
    const {player_id} = req.params;
    const { ok, found, data} = await db.deletePlayers(player_id);
    if(!ok) {
        return res.status(500).json(errorResult(data));
    }else if (!found) {
        return res.status(400).json(errorResult(`Player with ID ${player_id} not found`));
    }else {
        return res.json(okResult(data));
    }
})

module.exports = router;

