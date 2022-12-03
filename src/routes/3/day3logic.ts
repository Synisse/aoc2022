import {day3realData} from '$lib/parser/data/day3';
import {chunk, flatten, intersection, map, sum} from 'lodash';
import {readData} from '../../lib/parser/parser';

const valueData = (aListOfLetters: string[]) => {
    return map(aListOfLetters, aValue => aValue === aValue.toUpperCase() ? aValue.toLowerCase().charCodeAt(0) - 70 : aValue.toLowerCase().charCodeAt(0) - 96);
}

export const calculateMagic = () => {
    const data = readData(day3realData);

    // 1
    const sameData = flatten(map(map(data, aData => chunk(aData.split(''), aData.length/2)), aChunkEntry => intersection(...aChunkEntry)));
    const valuedData = valueData(sameData);

    // 2
    const mappedInput = map(chunk(data, 3), aChunk => map(aChunk, aChunkEntry => aChunkEntry.split('')));
    const mappedIntersections = flatten(map(mappedInput, aMappedEntry => intersection(...aMappedEntry)));

    const flattenedList = valueData(mappedIntersections);

    return {
        chunkValues: sum(valuedData),
        commonItemValues: sum(flattenedList)
    };
}