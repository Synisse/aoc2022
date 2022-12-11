import {day10realData, day10data} from '$lib/parser/data/day10';
import {chunk, clone, filter, find, flatten, forEach, isEqual, isNil, last, map, max, minBy, range, reverse, startsWith, sum, take, takeRightWhile, times, toInteger, transform, uniq, uniqWith, zip} from 'lodash';
import {readData} from '../../lib/parser/parser';

export const calculateMagic = () => {
    const data = map(map(readData(day10realData), aEntry => aEntry.split(' ')), aMove => [aMove[0], toInteger(aMove[1])]);

    console.log(data);
    let cycles = 0;
    let signalStrength = 1;
    const relevantSignals = [20, 60, 100, 140, 180, 220];
    const signalAtCycle: number[] = [];
    const display: (number | string)[] = range(0, 240, 0);

    const checkCycleInRange = (aCycle: number) => !isNil(find(relevantSignals, aRelevantSignal => aRelevantSignal === aCycle));
    const drawPixel = () => {
        const spriteValues = [signalStrength - 1, signalStrength, signalStrength + 1];
        forEach(spriteValues, aSpriteValue => {
            if (aSpriteValue === cycles % 40) {
                display[cycles] = 1;
            }
        })
    }

    forEach(data, aDataEntry => {
        if(aDataEntry[0] === 'noop') {
            drawPixel();
            cycles++;
            if(checkCycleInRange(cycles)) {
                signalAtCycle.push(signalStrength);
            }
        }
        else {
            times(2, () => {
                drawPixel();
                cycles++;
                if(checkCycleInRange(cycles)) {
                    signalAtCycle.push(signalStrength);
                }
            });

            signalStrength += aDataEntry[1] as number;
        }
    })

    console.log('signalAtCycle', signalAtCycle);
    console.log(display);

    console.log(chunk(display, 40)); // REHPRLUB
    console.log('signalAtCycle', sum(map(zip(relevantSignals, signalAtCycle), aMultiplication => aMultiplication[0]! * aMultiplication[1]!)));

    return {
        one: data,
        two: data
    };
}