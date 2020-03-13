import Player from './routes/dto/player';

let players: Player [] = [];

export function setPlayers(player: Array<Player>) {
    return players = player;
}

export function addPlayer(id: string, name: string, points: number = 0): any {
    console.log('new player 🔥 ', name);
    return players.push({
        id,
        name,
        points
    });
}

export function getPlayer() {
    return players;
}

export function addPoint(name: string) {
    console.log(name);
    players.map(player => {
        if (player.name == name) {
            console.log('ok');
            player.points += 1;
        }
    });
    console.log(players);
    return players;
}
