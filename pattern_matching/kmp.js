function kmp(txt, pat) {
    let i = 0;
    let j = 0;
    let finalArr = [];
    const lps = generateLPS(pat, pat.length);

    while (i < txt.length) {
        const txtString = txt[i];
        const patString = pat[j];
        if (txtString === patString) {
            i++;
            j++;
            if (j === pat.length) {
                let startPrefix = i - j;
                finalArr.push(startPrefix);
                j = lps[j - 1];
            }
        } else {
            if (!j) {
                i++;
            } else {
                j = lps[j];
            }
        }
    }
    return finalArr;
}


function generateLPS(pattern, patternLen) {
    let LPS = [];
    if (!patternLen) {
        return [];
    }

    let i = 1;
    let j = 0;
    LPS.push(0);
    while (i < patternLen) {
        const isMatch = pattern[i] === pattern[j];
        if (isMatch) {
            j++;
            i++;
            LPS.push(j);
        }
        if (!isMatch) {
            if (!j) {
                i++;
                LPS.push(0);
            } else {
                j--;
            }
        }
    }
    return LPS;
}

const txt = "yareyare";
const pat = "yare";
kmp(txt, pat);
