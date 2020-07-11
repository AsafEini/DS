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

class Subject extends Observable {
    constructor(subscriptionFn) {
        super();
        this.subscriptionFn = subscriptionFn;
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    next(val) {
        this.observers.forEach(observer => this.subscriptionFn(observer.next(val)))
    }
}

const $subject = new Subject(observer => observer);

$subject.subscribe({next:(val)=> console.log(val)});
$subject.next("hello");