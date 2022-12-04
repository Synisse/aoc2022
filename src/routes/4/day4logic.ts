import {day4realData} from '$lib/parser/data/day4';
import {intersection, map, minBy, range, sum, toInteger} from 'lodash';
import {readData} from '../../lib/parser/parser';

export const calculateMagic = () => {
    const data = map(readData(day4realData), aData => map(aData.split(','), aInnerData => range(toInteger(aInnerData.split('-')[0]), (toInteger(aInnerData.split('-')[1])+1))));

    const numberOfFullJobIntersections = map(data, aData => {
        const minEntries = minBy(aData, aData => aData.length);
        const intersections = intersection(aData[0], aData[1]);

        return intersections.length === minEntries?.length;
    });

    const numberOfGeneralJobIntersections = map(data, aData => {
        const intersections = intersection(aData[0], aData[1]);

        return intersections.length > 0;
    });

    return {
        fullIntersections: sum(numberOfFullJobIntersections),
        generalIntersections: sum(numberOfGeneralJobIntersections)
    };
}