const is_same = (array1, array2) => {
    return JSON.stringify(array1) === JSON.stringify(array2);
};

const getRandomChoice = () => {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * 3)];
};

const algorithm1 = ({ winner, player1 }) => {
    if (!winner) return getRandomChoice();
    if (winner === 'player1') {
        if (player1 === 'rock') return 'paper';
        if (player1 === 'paper') return 'scissors';
        if (player1 === 'scissors') return 'rock';
    }
    if (player1 === 'rock') return 'scissors';
    if (player1 === 'paper') return 'rock';
    if (player1 === 'scissors') return 'paper';
};

const algorithm2 = (games, depth = 2) => {
    const choices = ['rock', 'paper', 'scissors'];
    const p1 = games.map((x) => {
        return x['player1'];
    });
    const pattern = [];
    for (let j = p1.length - depth; j < p1.length; j++) {
        pattern.push(p1[j]);
    }
    const probs = [0, 0, 0];
    for (let i = depth; i < p1.length + depth - 2; i++) {
        const x = [];
        let k = i - 1;
        while (x.length < depth) {
            x.push(p1[k]);
            k--;
        }
        x.reverse();
        if (is_same(x, pattern))
            probs[choices.indexOf(p1[i])] =
                probs[choices.indexOf(p1[i])] + Math.sqrt(i);
    }
    const possible_choices = [];
    probs.forEach((element, i) => {
        if (element === Math.max(...probs)) {
            possible_choices.push(choices[i]);
        }
    });
    const users_choice =
        possible_choices[Math.floor(Math.random() * possible_choices.length)];
    const counters = {
        rock: 'paper',
        paper: 'scissors',
        scissors: 'rock',
    };
    return counters[users_choice];
};

export function getWinner(player1, player2) {
    if (player1 === player2) return false;
    if (player1 === 'rock') {
        if (player2 === 'paper') return 'player2';
        return 'player1';
    }
    if (player1 === 'paper') {
        if (player2 === 'scissors') return 'player2';
        return 'player1';
    }
    if (player1 === 'scissors') {
        if (player2 === 'rock') return 'player2';
        return 'player1';
    }
}

export function getComputerChoice(games) {
    if (games.length < 10) return getRandomChoice();
    return algorithm2(games, 2);
}
