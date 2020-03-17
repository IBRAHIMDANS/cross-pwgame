import Player from './routes/dto/player';
import player from './routes/dto/player';
import chalk from 'chalk';

let players: Player[] = [];

export function setPlayers(player: Array<Player>) {
    return (players = player);
}

export function addPlayer(id: string, name: string, points: number = 0): any {
    console.log(chalk.red('new player 🔥 ', name));
    return players.push({
        id,
        name,
        points,
    });
}

export function getPlayer(): Player[] {
    return players;
}

export function addPoint(name: string) {
    console.log(name);
    players.map(player => {
        if (player.name == name) {
            player.points += 1;
        }
    });
    return players;
}
