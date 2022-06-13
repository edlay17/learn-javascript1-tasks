'use strict'

/*
Создать функцию, которая принимает произвольное количество целочисленных параметров, находит их сумму и мемоизирует результат.
 */

function memoizeGetSum(defaultData) {
    const results = {...defaultData};

    return function getSum(...args) {
        const argsStr = args.join("|");
        if (!results[argsStr]) {
            console.log("new calculation");
            console.log(argsStr);
            results[argsStr] = args.reduce((sum, newEl) => sum + newEl);
        }

        return results[argsStr];
    }
}

const getSum = memoizeGetSum();
/*
getSum(10, 20, 10);
getSum(10, 20, 10);
getSum(10, 20, -10);
getSum(10, 20, 10, 1);
getSum(10, 20, 10, 3);
getSum(10, 20, 10, 1);
getSum(10, 20, -10);
*/


// с возможностью в любой момент времени заглянуть в кэш
function memoizeGetSum2(defaultData) {
    const results = {...defaultData};

    function getSum(...args) {
        const argsStr = args.join("|");
        if (!getSum.results[argsStr]) {
            console.log("new calculation");
            console.log(argsStr);
            getSum.results[argsStr] = args.reduce((sum, newEl) => sum + newEl);
        }

        return getSum.results[argsStr];
    }

    getSum.results = results;

    return getSum;
}

const getSum2 = memoizeGetSum2();
getSum2(-10, -20, 30, 50);
getSum2(-10, -20, 30, 50);
console.log(getSum2.results);
getSum2(-10, -20, 30, 50, 3);
getSum2(-10, -20, 30, 50, 4);
console.log(getSum2.results);