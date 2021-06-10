DROP TABLE IF EXISTS players;
DROP TABLE IF EXISTS teams;


CREATE TABLE teams (
    team_id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE,
    create_time TIMESTAMP DEFAULT NOW()
);

CREATE TABLE players (
    player_id SERIAL PRIMARY KEY,
    team_player VARCHAR(225) REFERENCES teams(name),
    name_player VARCHAR (255),
    num_player INTEGER,
    roll_player VARCHAR (255),
    create_time TIMESTAMP DEFAULT NOW()
);
