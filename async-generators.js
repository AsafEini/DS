function* FetchGenerator() {
    const data = undefined;
    const promise = new Promise((resolve) => {
        setTimeout(()=>resolve('Data Returned'), 3000)
    });
    const fetchedData = yield promise;
    console.log(fetchedData)
}

const asyncGenerator = FetchGenerator();

const defferedPromise = asyncGenerator.next();

defferedPromise.value.then((result) => {
    asyncGenerator.next(result);
});

console.log('time goes by...');

