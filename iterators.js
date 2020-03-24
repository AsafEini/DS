function basicIterator(arr) {
    let index = 0;
    const next = () => {
        let elem = arr[index];
        let result = {index, value: elem};
        index++;
        return result;
    };
    return {next};

}
const array2 = [1,2,3,4,5];
const itertush = basicIterator(array2);
console.log(itertush.next());
console.log(itertush.next());
console.log(itertush.next());
console.log(itertush.next());
//------------------------------------------------

const iterationFunc = (array2) => {
    const myIterator = basicIterator(array2);
    let sum = 0;
    let val = myIterator.next().value;
    while(val) {
        sum += val;
        val = myIterator.next().value;
    }
    return sum;
};

console.log(iterationFunc(array2));
//------------------------------------------------

const workIterator = (sentence) => {
    const string = sentence.split(' ');
    let index = 0;
    const getWord = () => {
        const word = string[index];
        index++;
        return word;
    };
    return {next: getWord}
};

const iterator = workIterator('hello my friend how are you');

class Word {
    constructor() {
    }
}
const wordIterable = new Word();
wordIterable[Symbol.iterator] = function*() {
    const iterable = iterator;
    yield iterable.next();
    yield iterable.next();
    yield iterable.next();
    yield iterable.next();
    yield iterable.next();
    yield iterable.next();
};
console.log([...wordIterable]);
