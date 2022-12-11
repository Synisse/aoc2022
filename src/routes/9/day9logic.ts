import {day9realData, day9data} from '$lib/parser/data/day9';
import {clone, filter, find, flatten, forEach, isEqual, isNil, last, map, max, minBy, range, reverse, startsWith, sum, take, takeRightWhile, times, toInteger, transform, uniq, uniqWith} from 'lodash';
import {readData} from '../../lib/parser/parser';

export const calculateMagic = () => {
    const data = map(map(readData(day9realData), aEntry => aEntry.split(' ')), aMove => [aMove[0], toInteger(aMove[1])]);

    // X = UP DOWN
    // Y = RIGHT LEFT
    // DIAGONAL - MIGHT BE WRONG
    // UP / DOWN = SAME Y
    // LEFT / RIGHT = SAME X

    const tailsAmount = 9;

    let headX = 0;
    let headY = 0;

    const visited = new Set(['0/0']);
    const tails: number[][] = [];

    times(tailsAmount, () => tails.push([0, 0]));

    const moveHeadTo = (direction: string) => {
        switch (direction) {
            case 'U':
                headY = headY + 1;
                break;
            case 'D':
                headY = headY - 1;
                break;
            case 'L':
                headX = headX - 1;
                break;
            case 'R':
                headX = headX + 1;
                break;
        }

        forEach(tails, (_, aIndex) => {
            moveTail(aIndex);

            if (aIndex === tailsAmount - 1) {
                const [lasttX, lasttY] = tails[tailsAmount - 1];
                visited.add(`${lasttX}/${lasttY}`);
            }
        })
    };

    const moveTail = (aIndex: number) => {
        let [tX, tY] = tails[aIndex];

        let refX = 0;
        let refY = 0;

        if (aIndex > 0) {
            const [prevtX, prevtY] = tails[aIndex - 1];
            refX = prevtX;
            refY = prevtY;
        } else {
            refX = headX;
            refY = headY;
        }

        const diffX = Math.abs(refX - tX);
        const diffY = Math.abs(refY - tY);

        if (diffX < 2 && diffY < 2) {
            return;
        }

        if (diffX > 1 && !diffY) {
            tX += refX - tX > 0 ? 1 : -1;
        } else if (diffY > 1 && !diffX) {
            tY += refY - tY > 0 ? 1 : -1;
        } else {
            tX += refX - tX > 0 ? 1 : -1;
            tY += refY - tY > 0 ? 1 : -1;
        }

        tails[aIndex] = [tX, tY];
    };

    forEach(data, aData => {
        times(aData[1] as number, () => {
            moveHeadTo(aData[0] as string);
        })
    })

    console.log(visited.size);

    return {
        one: data,
        two: data
    };
}