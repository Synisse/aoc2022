import {day6realData} from '$lib/parser/data/day6';
import {forEach, take, uniq} from 'lodash';
import {readData} from '../../lib/parser/parser';

export const calculateMagic = () => {
    const data: string[] = readData(day6realData)[0].split('');

    const perf = performance.now();

    let foundIndex = 0;

    forEach(data, (_, aIndex) => {
        if(!(uniq(take(data, 14)).length !== 14)) {
            foundIndex = aIndex + 14;
            return false;
        }
        data.shift();
    })

    console.log('index: ', foundIndex);
    console.log('runtime: ', performance.now() - perf);

    return {
        one: foundIndex,
        two: foundIndex
    };
}