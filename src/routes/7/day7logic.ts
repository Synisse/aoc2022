import {day7realData, day7data} from '$lib/parser/data/day7';
import {filter, find, forEach, isNil, map, minBy, startsWith, sum, take, toInteger, uniq} from 'lodash';
import {readData} from '../../lib/parser/parser';

class Directory {
    name: string;
    parent: Directory | null;
    fileSize: number;
    children: Directory[];
    directorySize: number;
    files: number[]

    constructor(aDirectoryName: string) {
        this.name = aDirectoryName;
        this.parent = null;
        this.fileSize = 0;
        this.children = [];
        this.directorySize = 0;
        this.files = [];
    }

    setParentDirectory(aParent: Directory) {
        this.parent = aParent;
    }

    addChildDirectory(aChilDirectory: Directory) {
        this.children.push(aChilDirectory);
    }

    getChildDirectoryByName(aChildDirectoryName: string) {
        return find(this.children, aChild => aChild.name === aChildDirectoryName)
    }

    addSize(aFileSize: number) {
        this.fileSize += aFileSize;
    }

    addFile(aFileSize: number) {
        this.files.push(aFileSize);
    }

    getDirectorySize() {
        let innerSize = 0;

        forEach(this.children, aChild => innerSize += aChild.getDirectorySize());

        this.directorySize = innerSize + this.fileSize;

        return innerSize + this.fileSize;
    }
}

export const calculateMagic = () => {
    const data: string[] = readData(day7realData);

    console.log('data: ', data);

    const rootDirectory = new Directory('/');
    const directoryList = [rootDirectory];
    let currentDirectory = rootDirectory;

    data.forEach(aData => {
        console.log('aData. ', aData);
        const command = aData.split(' ')

        if(command[0] === '$') {
            // got command
            if(command[1] === 'cd') {
                // change directory

                if(command[2] === '/') {
                    // do nothing root is already set
                }
                else if(command[2] === '..'){
                    if(!isNil(currentDirectory.parent)) {
                        currentDirectory = currentDirectory.parent;
                    }
                }
                else {
                    const child = currentDirectory.getChildDirectoryByName(command[2]);

                    if(!isNil(child)) {
                        currentDirectory = child;
                    }
                }
            }
            else {
                // list directory
            }
        }
        else {
            // got file or dir info
            if(command[0] === 'dir') {
                // got a child directory
                const newDir = new Directory(command[1]);
                newDir.setParentDirectory(currentDirectory);
                currentDirectory.addChildDirectory(newDir);

                // hacky because i dont wanna do recursion
                directoryList.push(newDir);
            }
            else {
                currentDirectory.addSize(toInteger(command[0]));
                currentDirectory.addFile(toInteger(command[0]));
            }
        }
    })

    console.log('filesystem: ', rootDirectory);

    const folderSizes = map(directoryList, aDir => aDir.getDirectorySize() < 100000 ? aDir.getDirectorySize() : 0);
    console.log('foldersizes: ', sum(folderSizes));

    const available = 70000000;
    const unused = 30000000;
    const allFolders = rootDirectory.getDirectorySize();
    const currentFree = available - allFolders;
    const amountToFree = unused - currentFree;

    const dirToDelete = minBy(filter(directoryList, aDir => aDir.getDirectorySize() > amountToFree), aDir => aDir.directorySize);
    console.log('dirToDelete: ', dirToDelete?.directorySize);

    return {
        one: data,
        two: data
    };
}