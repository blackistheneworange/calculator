
import { EMPTY_INPUT, OPEN_ROUND_BRACKET } from "../constants.js";
import isClearOperator from "./is-clear-operator.js";
import isDecimalPoint from "./is-decimal-point.js";
import isMathOperator from "./is-math-operator.js";
import isMiscOperator from "./is-misc-operator.js";
import isPrefixOperator from "./is-prefix-operator.js";
import isResultOperator from "./is-result-operator.js";

const isValidValue = (value, input, has_decimal_point) => {
    if(!value) return;

    const last_input_char = input[input.length-1];

    if(!isPrefixOperator(value) && isMathOperator(value) && (input===EMPTY_INPUT || last_input_char===OPEN_ROUND_BRACKET)){
        return false;
    }
    if(
        isMathOperator(value) && isMathOperator(last_input_char)
    ){
        return false;
    }
    if(
        isDecimalPoint(value) && (isDecimalPoint(last_input_char) || has_decimal_point)
    ){
        return false;
    }
    if(
        isNaN(+value) && !isMathOperator(value) && !isDecimalPoint(value) && !isMiscOperator(value) && !isResultOperator(value) && !isClearOperator(value)
    ){
        return false;
    }
    return true;
}

export default isValidValue;