export function checkText(checkStr, errorStr){//takes two arrays
    for(i = 0; i < checkStr.length; i++){//for array length
        if(!(checkStr[i].trim())){//if the string is empty
            alert(errorStr[i].concat(" is empty"))
            return false//check failed
        }
    }
    return true//check passed
};
