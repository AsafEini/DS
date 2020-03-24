// could be called NOT REALLY a pub sub

class Observer {
    constructor() {
        this.topics = {};
    }

    subscribe(topic, callback) {
        if(!this.topics[topic]) {
            this.topics[topic] = [];
        }
        this.topics[topic].push(callback);
        const index = this.topics[topic].length - 1;

        return {
            unsubscribe: () => {
                this.topics[topic].splice(index, 1);
                if(!this.topics[topic].length) {
                    delete this.topics[topic];
                }
            },
            next: (data = null) => {
                if(this.topics[topic] && this.topics[topic][index]) {
                    this.topics[topic][index](data);
                    return;
                }
                console.log('subscription is dead')
            }
        }
    }
}

const observer = new Observer();

const event1 = observer.subscribe('event1',(args) => {
    console.log(args)
});
const event2 = observer.subscribe('event2',(args) => {
    console.log('YAYYYY')
});
const event11 = observer.subscribe('event1',(args) => {
    console.log(args);
});
event11.unsubscribe();
event1.next('AAAA');
event11.next('123');

