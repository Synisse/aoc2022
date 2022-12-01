import {day1realData} from '$lib/parser/data/day1';
import {forEach, maxBy, sortBy, sum, sumBy} from 'lodash';
import {readData} from '../../lib/parser/parser'

class Elf {
    calories: number[];

    constructor() {
        this.calories = [];
    }

    addCalories(aCaloryEntry: number) {
        this.calories.push(aCaloryEntry)
    }

    getCalories() {
        return sum(this.calories);
    }
}

export const calculateMagic = () => {
    const data = readData(day1realData);

    const elves: Elf[] = [];

    let currentElf = new Elf();

    forEach(data, aCaloryEntry => {
        const parsedCalories = parseInt(aCaloryEntry, 10);

        if(!isNaN(parsedCalories)) {
            currentElf.addCalories(parsedCalories);
        }
        else {
            elves.push(currentElf);
            currentElf = new Elf();
        }
    });

    elves.push(currentElf);

    const elfCarryingTheMost = maxBy(elves, aElf => aElf.getCalories());

    const sortedElves = sortBy(elves, aElf => aElf.getCalories());

    const topThreeElves = sortedElves.slice(-3);

    return {
        maxCalories: elfCarryingTheMost?.getCalories(),
        topThree: sumBy(topThreeElves, aTopElf => aTopElf.getCalories())
    };
};