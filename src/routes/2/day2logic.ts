import {day2realData} from '$lib/parser/data/day2';
import {sum} from 'lodash';
import {readData} from '../../lib/parser/parser';

enum SignScores {
    'ROCK' = 1, // A & X
    'PAPER' = 2, // B & Y
    'SCISSORS' = 3 // C & Z
}

enum RoundScores {
    'LOSE' = 0,
    'DRAW' = 3,
    'WIN' = 6
}

const getGameScore = (aOpponentValue: SignScores, aOwnValue: SignScores) => {
    if(aOpponentValue === aOwnValue) {
        return RoundScores.DRAW + aOwnValue;
    }

    if((aOpponentValue === SignScores.ROCK && aOwnValue === SignScores.PAPER) || ((aOpponentValue === SignScores.PAPER && aOwnValue === SignScores.SCISSORS)|| ((aOpponentValue === SignScores.SCISSORS && aOwnValue === SignScores.ROCK)))) {
        return RoundScores.WIN + aOwnValue;
    }

    return aOwnValue;
}

const mapWinCondition = (aGameResultValue: string): number => {
    switch(aGameResultValue) {
        case 'X':
            return RoundScores.LOSE;
        case 'Y':
            return RoundScores.DRAW;
        case 'Z':
            return RoundScores.WIN;
        default:
            return 99;
    }
}

const getExtendedStrategyScore = (aGameEntry: string[]) => {
    const gameResult = mapWinCondition(aGameEntry[1]);

    const opponentHand = mapToGameValue(aGameEntry[0]);
    let ownHand: SignScores;

    if(gameResult === RoundScores.WIN) {
        if(opponentHand === SignScores.ROCK) {
            ownHand = SignScores.PAPER;
        }
        else if (opponentHand === SignScores.PAPER) {
            ownHand = SignScores.SCISSORS;
        }
        else {
            ownHand = SignScores.ROCK;
        }

        return gameResult + ownHand;
    }
    else if (gameResult === RoundScores.LOSE) {
        if(opponentHand === SignScores.ROCK) {
            ownHand = SignScores.SCISSORS;
        }
        else if (opponentHand === SignScores.PAPER) {
            ownHand = SignScores.ROCK;
        }
        else {
            ownHand = SignScores.PAPER;
        }

        return gameResult + ownHand;
    }

    return gameResult + mapToGameValue(aGameEntry[0]);
}

const mapToGameValue = (aHand: string): number => {
    switch(aHand) {
        case 'A':
        case 'X':
            return SignScores.ROCK;
        case 'B':
        case 'Y':
            return SignScores.PAPER;
        case 'C':
        case 'Z':
            return SignScores.SCISSORS;
        default:
            return 99;
    }
}

export const calculateMagic = () => {
    const data = readData(day2realData);

    const mappedData = data.map(aData => aData.split(' '));

    const valuedData: SignScores[][] = mappedData.map(aData => aData.map(aStringValue => mapToGameValue(aStringValue)));

    const scoreData = valuedData.map(aData => getGameScore(aData[0], aData[1]));

    const newStrategy = mappedData.map(aData => getExtendedStrategyScore(aData));

    return {
        sumOfScores: sum(scoreData),
        sumOfExtendedScores: sum(newStrategy)
    };
}