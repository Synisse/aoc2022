import {day11realData, day11data} from '$lib/parser/data/day11';
import {chunk, clone, filter, find, flatten, forEach, isEqual, isNil, last, map, max, minBy, multiply, range, reverse, sortBy, startsWith, sum, take, takeRight, takeRightWhile, times, toInteger, transform, uniq, uniqWith, zip} from 'lodash';
import {readData} from '../../lib/parser/parser';

class Monkey {
    items: number[];
    worryOperation: (aValue: number) => number;
    testOperation: (aValue: number) => boolean;
    trueMonkey: number;
    falseMonkey: number;
    inspections: number;
    divisor: number;

    constructor(aItems: number[], aWorryOperation: (aValue: number) => number, aTestOperation: (aValue: number) => boolean, aTrueMonkey: number, aFalseMonkey: number, aDivisor: number) {
        this.items = aItems;
        this.worryOperation = aWorryOperation;
        this.testOperation = aTestOperation;
        this.trueMonkey = aTrueMonkey;
        this.falseMonkey = aFalseMonkey;
        this.inspections = 0;
        this.divisor = aDivisor;
    }

    runOperation(aModulo = 3) {
        this.inspections++;
        this.items[0] = toInteger((this.worryOperation(this.items[0])) % aModulo);
    }

    getMonkeyTarget() {
        return this.testOperation(this.items[0]) ? this.trueMonkey : this.falseMonkey
    }

    updateItem(isFirst = true, aValue: number) {
        if(isFirst) {
            this.items[0] = aValue;
        }
    }

    getInspections() {
        return this.inspections;
    }

    throwItem(): number {
        const itemToThrow = this.items.shift();
        return itemToThrow ?? 999999999999;
    }

    receiveItem(aItem: number) {
        this.items.push(aItem);
    }
}

export const calculateMagic = () => {
    const data = map(readData(day11data), aEntry => aEntry.split(' '));

    console.log(data);
    const monkey0 = new Monkey(
        [61],
        (aValue: number) => aValue * 11,
        (aValue: number) => aValue % 5 === 0,
        7,
        4,
        5
    );
    const monkey1 = new Monkey(
        [76, 92, 53, 93, 79, 86, 81],
        (aValue: number) => aValue + 4,
        (aValue: number) => aValue % 2 === 0,
        2,
        6,
        2
    );
    const monkey2 = new Monkey(
        [91, 99],
        (aValue: number) => aValue * 19,
        (aValue: number) => aValue % 13 === 0,
        5,
        0,
        13
    );
    const monkey3 = new Monkey(
        [58, 67, 66],
        (aValue: number) => aValue * aValue,
        (aValue: number) => aValue % 7 === 0,
        6,
        1,
        7
    );
    const monkey4 = new Monkey(
        [94, 54, 62, 73],
        (aValue: number) => aValue + 1,
        (aValue: number) => aValue % 19 === 0,
        3,
        7,
        19
    );
    const monkey5 = new Monkey(
        [59, 95, 51, 58, 58],
        (aValue: number) => aValue + 3,
        (aValue: number) => aValue % 11 === 0,
        0,
        4,
        11
    );
    const monkey6 = new Monkey(
        [87, 69, 92, 56, 91, 93, 88, 73],
        (aValue: number) => aValue + 8,
        (aValue: number) => aValue % 3 === 0,
        5,
        2,
        3
    );
    const monkey7 = new Monkey(
        [71, 57, 86, 67, 96, 95],
        (aValue: number) => aValue + 7,
        (aValue: number) => aValue % 17 === 0,
        3,
        1,
        17
    );

    const monkeys = [monkey0, monkey1, monkey2, monkey3, monkey4, monkey5, monkey6, monkey7];

    let commonModulo = 1;

    forEach(monkeys, aMonkey => commonModulo *= aMonkey.divisor);

    times(10000, () => {
        forEach(monkeys, aMonkey => {
            forEach(aMonkey.items, aItem => {
                aMonkey.runOperation(commonModulo);
                monkeys[aMonkey.getMonkeyTarget()].receiveItem(aMonkey.throwItem())
            })
        })
    })

    const amounts = map(monkeys, aMonkey => aMonkey.getInspections())
    const topTwo = takeRight(sortBy(amounts), 2);
    console.log('amount: ', multiply(topTwo[0], topTwo[1])); // 278 + 2

    return {
        one: data,
        two: data
    };
}