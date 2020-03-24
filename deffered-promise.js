const generateDeferredPromise = () => {
    return (() => {
        let resolve;
        let reject;
        let promise = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
        });
        return {promise, resolve, reject}
    })();
};

const iLoveShir = generateDeferredPromise();

const test = async () => {
    console.log('guess who i realllllyyyy love?!?!?');
    await iLoveShir.promise;
    console.log('SHIIIIRRRR!!!!!!');
};

test();
const activation = () => {
    return iLoveShir.resolve();
};

setTimeout(()=> activation(),2000);


