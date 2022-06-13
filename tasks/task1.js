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
getSum(10, 20, 10);
getSum(10, 20, 10);
getSum(10, 20, -10);
getSum(10, 20, 10, 1);
getSum(10, 20, 10, 3);
getSum(10, 20, 10, 1);
getSum(10, 20, -10);

