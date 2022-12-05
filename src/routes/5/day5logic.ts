import {day5realData} from '$lib/parser/data/day5';
import { map, toInteger, forEach, times, reverse, first, last} from 'lodash';
import {readData} from '../../lib/parser/parser';

export const calculateMagic = () => {
    const data = map(readData(day5realData), aEntry => aEntry.split(' '));

    const filteredData = map(data, aEntry => aEntry.filter((_, aIndex) => aIndex % 2));

    const b = map(filteredData, aEntry => map(aEntry, a => toInteger(a) - 1));

    const stacks = [
        ['F', 'C', 'P', 'G', 'Q', 'R'],
        ['W', 'T', 'C', 'P'],
        ['B', 'H', 'P', 'M', 'C'],
        ['L', 'T', 'Q', 'S', 'M', 'P', 'R'],
        ['P', 'H', 'J', 'Z', 'V', 'G', 'N'],
        ['D', 'P', 'J'],
        ['L', 'G', 'P', 'Z', 'F', 'J', 'T', 'R'],
        ['N', 'L', 'H', 'C', 'F', 'P', 'T', 'J'],
        ['G', 'V', 'Z', 'Q', 'H', 'T', 'C', 'W']
    ]

    forEach(b, aEntry => {
        const tempArray: string[] = [];

        times((aEntry[0]) + 1, () => {
            const c = stacks[aEntry[1]].pop();

            if (c) {
                // 1
                // stacks[aEntry[2]].push(c);
                // 2
                tempArray.push(c);
            }
        })

        // 2
        stacks[aEntry[2]].push(...reverse(tempArray));
    })

    console.log(map(stacks, aStack => last(aStack)).join(''));

    return {
        one: data,
        two: data
    };
}