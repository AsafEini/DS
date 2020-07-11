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

class BehavioralSubject extends Observable {
    constructor(initialValue) {
        super();
        this.previousValue = initialValue;
        this.observers = [];
    }
    subscribe(observer) {
        this.observers.push(observer);
        observer.next(this.previousValue);
    }
    next(val) {
        this.previousValue = val;
        this.observers.forEach(observer => observer.next(this.previousValue));
    }
}

const map = (mappingFn) => {
    return source => new Observable(observer => {
        source.subscribe({
            next: val => observer.next(mappingFn(val))
        })
    })
}

const $behavioralSubject = new BehavioralSubject(6);
$behavioralSubject.subscribe({next:val=>console.log(`first subscribe ${val}`)});
$behavioralSubject.next(90);
$behavioralSubject.pipe(map(res =>`**${res}**`)).subscribe({next:val=>console.log(`second subscribe ${val}`)});
