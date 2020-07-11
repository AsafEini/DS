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

class ReplaySubject extends Observable {
    constructor(initialValue, limit) {
        super();
        this.emittedValues = [initialValue];
        this.observers = [];
        this.limit = limit;
    }
    sliceEmittedValues(values) {
        this.emittedValues =  values.slice(1, this.limit+1);
    }
    subscribe(observer) {
        this.observers.push(observer);
        this.emittedValues.forEach(val => observer.next(val))
    }
    next(val) {
        this.emittedValues.push(val);
        if(this.emittedValues.length > this.limit) {
            this.sliceEmittedValues(this.emittedValues);
        }
        this.observers.forEach(observer => observer.next(val));
    }
}

const $replaySubject = new ReplaySubject(1,3);
$replaySubject.subscribe({next: val => console.log(`first subscriber ${val}`)})
$replaySubject.next(2)
$replaySubject.next(3)
$replaySubject.next(4)
$replaySubject.subscribe({next: val => console.log(`second subscriber ${val}`)})