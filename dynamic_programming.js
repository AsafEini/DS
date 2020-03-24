const memo = [];
const fib = (n, memo) => {
    if (memo[n]) {
        return memo[n];
    }
    if (n <= 2) {
        return 1;
    }
    const res = fib(n - 1,memo) + fib(n - 2,memo);
    memo[n] = res;
    return res;
};

const fibTabular = (n) => {
    if(n <= 2) {
        return 1
    };
    let tabular = [0,1,1];
    for(let i = 3; i <= n; i++) {
        tabular[i] = tabular[i-1] + tabular[i-2];
    }
    return tabular[n];
};

// console.log(fib(100,memo));
// console.log(fibTabular(100));
