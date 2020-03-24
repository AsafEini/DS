function* addNumber(arr) {
    const xx = arr;
    const currentNumber = arr;
    while(true) {
        const addNumber = yield currentNumber;
        if(!addNumber) {
            return xx;
        }
        xx.push(addNumber);
    }

}

const sumUp = addNumber([1,2,3,4]);
sumUp.next();
sumUp.next(10);
sumUp.next(12);
sumUp.next(13);
sumUp.next(14);
sumUp.next(15);
const last = sumUp.next();
console.log(last);


