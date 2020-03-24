const getUserById = id => id === 3 ?
    Promise.resolve({ name: 'Kurt', role: 'Author' }) :
    undefined
;
const hasPermission = ({ role }) => (
    Promise.resolve(role === 'Author')
);

const coloring = () => (
    Promise.resolve('REDDDD123')
);

const logger = v => {
    console.log(v);
    return Promise.resolve(v)
};

const compose = (chainMethod) => (...methods) => methods.reduce((acc, method) => x => method(x)[chainMethod](acc));

const composePromises = compose('then');
const auth = composePromises(coloring, logger, hasPermission, logger, getUserById);

auth(3).then(x => console.log(x));
