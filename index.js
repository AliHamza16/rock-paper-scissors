import { getWinner, getComputerChoice } from './utils.js';

const games = [];

const choices = ['rock', 'paper', 'scissors'];

const computer = document.getElementById('computer');

const scoreTable = document.getElementById('score-table');

const scores = [0, 0];

choices.forEach((c) => {
    document.getElementById(c).addEventListener('click', () => {
        const x = getComputerChoice(games);
        const winner = getWinner(c, x);
        computer.innerText = `computer: ${x}`;
        setTimeout(() => {
            computer.innerText = 'computer: waiting...';
        }, 1000);
        games.push({
            player1: c,
            player2: x,
            winner,
        });
        if (winner) {
            if (winner === 'player1') {
                scores[0]++;
            } else {
                scores[1]++;
            }
        }
        scoreTable.innerText = `${scores[0]} - ${scores[1]}`;
    });
});
