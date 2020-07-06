const dict = {a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:10};
const text = "abaabaabababa";
const pattern = "aba";

function rabinKarp(text, pattern) {
    let patternHash = null;
    let rollingHash = null;
    let i = 0;
    let calcStorage = null;
    let finalResults = [];

    while(i <= pattern.length - 1) {
        patternHash += hashFunc(pattern, i, pattern.length - 1);
        i++;
    }
    let first = 0;
    let last = pattern.length - 1;

    while(text[last]) {
        calcStorage = hashFunc(text, first, last);
        if(rollingHash) {
            rollingHash += hashFunc(text, last, last);
        } else {
            rollingHash = rollingHashFunc(text, first, last);
        }
        if (rollingHash === patternHash) {
            patternComparison(text, pattern, first, last, finalResults) && finalResults.push(first);
        }
        rollingHash = (rollingHash - calcStorage) * 10;
        first++;
        last++;
    }

    return finalResults;
}

function hashFunc(txt, start, end) {
    return dict[txt[start]] * Math.pow(10, end - start);
}

function rollingHashFunc(txt, first, last) {
    let i = first;
    let hashResult = 0;
    while(i <= last) {
        hashResult += hashFunc(txt, i, last);
        i++;
    }
    return hashResult;
}

function patternComparison(txt, pattern, first) {
    let isMatch = true;

    for(let i = 0; i <= pattern.length - 1; i++) {
        if(pattern[i] !== txt[first + i]) {
            isMatch = false;
            break;
        };
    }
    return isMatch;
}

console.log(rabinKarp(text, pattern));
