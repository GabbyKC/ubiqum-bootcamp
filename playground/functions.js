var numbers = [100, 22, 12, 7, 55, 4, 200];

function findSmallest(numbers) {
    var smallestNumber = numbers[0];
    for (var i = 0; i < numbers.length; i++) {
        if (numbers[i] < smallestNumber) {
            smallestNumber = numbers[i];
        }
    }
    return smallestNumber;
}

function findBiggest(numbers) {
    var biggestNumber = numbers[0];
    for (var i = 0; i < numbers.length; i++) {
        if (numbers[i] >= biggestNumber) {
            biggestNumber = numbers[i];
        }
    }
    return biggestNumber;
}

var array = [24, 32, 4, 55, 78];
var index = 2

function position(array, index) {
    return array[index];
}

var array = [3, 6, 67, 6, 23, 11, 100, 8, 93, 0, 17, 24, 7, 1, 33, 45, 28, 33, 23, 12, 99, 100, 6];

function repeat(array) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
        for (var j = i + 1; j < array.length; j++) {
            if (array[i] === array[j] && !result.includes(array[i])) {
                result.push(array[i]);
                break;
            }
        }
    }
    return result;
}
