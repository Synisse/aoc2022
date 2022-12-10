import {day8realData, day8data} from '$lib/parser/data/day8';
import {clone, filter, find, flatten, forEach, isNil, map, max, minBy, range, reverse, startsWith, sum, take, takeRightWhile, toInteger, transform, uniq} from 'lodash';
import {readData} from '../../lib/parser/parser';


export const calculateMagic = () => {
    const data = map(readData(day8realData), aData => map(aData.split(''), aNumber => toInteger(aNumber)));

    console.log('data: ', data);
    const gridRows = data.length;
    const gridColumns = data[0].length;
    let foundTrees = 0;
    const neighbourhoodMap = Array(gridRows).fill(0).map(() => Array(gridColumns).fill(0));

    forEach(data, (aRowValue, aIndex) => {
        const topRange = range(0, aIndex);
        const bottomRange = range(aIndex + 1, gridColumns);


        forEach(aRowValue, (aColumnValue, iIndex) => {
            if(iIndex === gridColumns - 1 || iIndex === 0 || aIndex === gridRows - 1 || aIndex === 0) {
                foundTrees++;
            } else {
                const leftRange = range(0, iIndex);
                const rightRange = range(iIndex + 1, gridRows);

                const topVisible = isNil(find(map(topRange, aTopIndex => data[aTopIndex][iIndex]), aTopValue => aTopValue >= aColumnValue));
                const bottomVisible = isNil(find(map(bottomRange, aBottomIndex => data[aBottomIndex][iIndex]), aBottomValue => aBottomValue >= aColumnValue));
                const leftVisible = isNil(find(map(leftRange, aLeftIndex => data[aIndex][aLeftIndex]), aLeftValue => aLeftValue >= aColumnValue));
                const rightVisible = isNil(find(map(rightRange, aRightIndex => data[aIndex][aRightIndex]), aRightValue => aRightValue >= aColumnValue));

                const topValue = transform(reverse(clone(topRange)), (aResult: number[], aTopValue) => {
                    aResult.push(data[aTopValue][iIndex]);
                    return data[aTopValue][iIndex] < aColumnValue;
                });

                const bottomValue = transform(bottomRange, (aResult: number[], aBottomValue) => {
                    aResult.push(data[aBottomValue][iIndex]);
                    return data[aBottomValue][iIndex] < aColumnValue;
                });

                const leftValue = transform(reverse(clone(leftRange)), (aResult: number[], aLeftValue) => {
                    aResult.push(data[aIndex][aLeftValue]);
                    return data[aIndex][aLeftValue] < aColumnValue;
                });

                const rightValue = transform(rightRange, (aResult: number[], aRightValue) => {
                    aResult.push(data[aIndex][aRightValue]);
                    return data[aIndex][aRightValue] < aColumnValue;
                });

                neighbourhoodMap[aIndex][iIndex] = topValue.length * leftValue.length * rightValue.length * bottomValue.length;

                if(topVisible || bottomVisible || leftVisible || rightVisible) {
                    foundTrees++;
                }
            }
        });
    })

    console.log('found trees: ', foundTrees);
    console.log('neighbourhoodMap: ', max(flatten(neighbourhoodMap)));
    return {
        one: data,
        two: data
    };
}