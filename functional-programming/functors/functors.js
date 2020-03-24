const Identity = value => {
    return {
        map: (func) => Identity(func(value))
    }
};

const isExists = (x) => ({
    map: func => x ? x.map(func) : x
});

const trace = (x) => {
    console.log(x);
    return x;
};

isExists(Identity(2)).map(trace).map(x => x + 10).map(trace);
