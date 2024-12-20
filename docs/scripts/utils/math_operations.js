import { ADD_OPERATOR, DIVIDE_OPERATOR, MULTIPLY_OPERATOR, POWER_OPERATOR, SUBTRACT_OPERATOR } from "../constants.js";

function computeMathOperation(first_num, second_num, operator){
    if(!operator || isNaN(first_num) || isNaN(second_num)) return 0;
    switch(operator){
        case ADD_OPERATOR:
            return first_num+second_num;
        case SUBTRACT_OPERATOR:
            return first_num-second_num;
        case MULTIPLY_OPERATOR:
            return first_num*second_num;
        case DIVIDE_OPERATOR:
            return first_num/second_num;
        case POWER_OPERATOR:
            return Math.pow(first_num, second_num);
    }
}

export default computeMathOperation;