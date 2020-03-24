const swap = (arr, left, right) => {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
};

const setPivot = (arr, start, end) => {
    const pivot = arr[start];
    let swapIndex = start;

    for(let i = start + 1; i <= end; i++) {
        if(pivot > arr[i]) {
            swapIndex++;
            swap(arr, swapIndex, i);
        }
    }
    swap(arr, start, swapIndex);
    return swapIndex;
};


const quickSort = (arr, left = 0, right = arr.length - 1) => {
    if (left < right) {
        let index = setPivot(arr, left, right);
        quickSort(arr, left, index - 1);
        quickSort(arr, index + 1, right);
    }
    return arr;
};

console.log(quickSort([7, 3, 9, 8, 4, 6, 3, 4, 5, 2, 1, 4,8,3,2,5,4,3,1,7,9,0,8,6,2,4]));


