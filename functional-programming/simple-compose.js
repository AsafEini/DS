const compose = (...fns) => (x) => fns.reduceRight((acc, func)=> func(acc), x);
const trace = label =>(value) => {
    console.log(label +' '+value);
    return value;
};
let num = 0;
const func1 = (x) => x + 1;
const func2 = (x) => x + 1;
const func3 = (x) => x + 1;

const reducer = compose(func3, func2, func1);
const result = reducer(num);
console.log(result);

//simple curry function

const add = (x) => (y) => x + y;
const inc = add(5);
console.log(inc(5));

//abstraction

const increment = add(1);
const a = increment(1);
const b = increment(a);
const c = increment(b);
console.log(c);
