const db = require ('./db');

const okResult = (results) => ({ status: "OK", results })
const errorResult = (details) => ({ status: "ERROR", details })

const { Router } = require('express');

const router = new Router();

router.get("/", async (req, res) => {
    try {
    const teams = await db.getTeams();
    res.json(okResult(teams));
    } catch(e) {
        res.status(500).json(errorResult(e.toString()));
    }
});

router.post("/", async (req, res) => {
    const {name} = req.body;
    if(!name) {
        return res
            .status(400)
            .json(errorResult("Missing 'name' field"));
    }
    try{
        const newTeams = await db.newTeams(name);
        res.json(okResult(newTeams));
    } catch(e) {
        res.status(500).json(errorResult(e.toString()));
    }
});

router.put("/:team_id" , async(req, res) => {
    const {team_id} = req.params;
    const {name} = req.body;
    if(!name) {
        return res
            .status(400)
            .json(errorResult("Missing 'name' field"));
    }
    const { ok, found, data} = await db.updateTeams(team_id, name);
    if(!ok) {
        return res.status(500).json(errorResult(data));
    }else if (!found) {
        return res.status(400).json(errorResult(`Team with ID ${team_id} not found`));
    }else {
        return res.json(okResult(data));
    }
})

router.delete("/:team_id" , async(req, res) => {
    const {team_id} = req.params;
    const { ok, found, data} = await db.deleteTeams(team_id);
    if(!ok) {
        return res.status(500).json(errorResult(data));
    }else if (!found) {
        return res.status(400).json(errorResult(`Team with ID ${team_id} not found`));
    }else {
        return res.json(okResult(data));
    }
})

module.exports = router;

