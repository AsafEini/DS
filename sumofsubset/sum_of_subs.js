let endRes = 0;
const grr = [5,7,2,3,5];
const target = 10;

function sumOfSubSets(arr, sumValue) {
    const totalSum = arr.reduce((acc, val)=> acc + val, 0);
    let toSubtract = 0;
    for(let i = 0; i < arr.length - 1; i++) {
            const node = {val: 0, total: totalSum - toSubtract};
            calculation(node,i, sumValue, arr);
            toSubtract += arr[i];
    }
}


function calculation(node, index, targetValue, arr) {
    const newValue = node.val + arr[index];
    const newTotal = node.total - arr[index];
    let j = index;
    if(newValue === targetValue) {
        endRes++;
        return;
    }

    if(newTotal === 0) {
        return;
    }

    if(newValue > targetValue) {
        const subtractValFromTotal = node.total - arr[index];
        j++;
        calculation({...node, total: subtractValFromTotal}, j, targetValue, arr);
        return;
    }
    j++;
    calculation({val: newValue, total: newTotal}, j, targetValue, arr);
    const subtractValFromTotal = node.total - arr[index];
    node.val && calculation({...node, total: subtractValFromTotal}, j, targetValue, arr);
}

sumOfSubSets(grr, target);
console.log(endRes)
