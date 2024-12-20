import { BACKSPACE_KEY, AC_KEY, EMPTY_INPUT, EC_KEY } from '../constants.js';

function computeClearOperation(value, operation){
    switch(operation){
        case BACKSPACE_KEY:
            return value.slice(0, value.length-1);
        case EC_KEY:
            return value.slice(0, value.length-1);
        case AC_KEY:
            return EMPTY_INPUT;
        default:
            throw new Error("Invalid result operation");
    }
}

export default computeClearOperation;