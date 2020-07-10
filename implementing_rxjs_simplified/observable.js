class Observable {
    constructor(subscriptionFn) {
        this.subscriptionFn = subscriptionFn;
    }

    subscribe(observer) {
        this.subscriptionFn(observer)
    }

    pipe(...methods) {
        return methods.reduce((source, next) => next(source), this)
    }
}

function simpleFunc(val) {
    const subscribeFn = (observer) => observer.next(val);
    return new Observable(subscribeFn)
}

const map = (mappingFn) => {
    return source => new Observable(observer => {
        source.subscribe({
            next: val => observer.next(mappingFn(val))
        })
    })
}

const $obs = simpleFunc("Hello!");
$obs.pipe(
    map(res => `**${res}**`),
    map(res => `--${res}--`)
).subscribe({next:(val)=>console.log(val)})

