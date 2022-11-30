import {filter} from 'lodash';

export const calculateMagic = () => {
    const testDeps = [1,2,3];

    const validate = filter(testDeps, (aDep: number) => aDep === 2);

    return validate;
};