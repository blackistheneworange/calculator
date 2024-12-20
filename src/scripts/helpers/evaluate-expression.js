import { INVALID_INPUT, MULTIPLY_OPERATOR } from "../constants.js";
import computeMathOperation from "../utils/math_operations.js";

const evaluateFinalExpression = (expressions) => {
    console.log(expressions);
    
    const stack = [], closest_openbracket=[];

    for(const {num, operator, openbracket, closebracket} of expressions){
        if(openbracket && closebracket){
            if(isNaN(num)) return INVALID_INPUT;
            stack.push({ num, operator });
        }
        else if(openbracket){
            stack.push({ num, openbracket, operator });
            closest_openbracket.push(stack.length-1);
        }
        else if(closebracket){
            if(closest_openbracket.length === 0) return INVALID_INPUT;
            if(!isNaN(num)) stack.push({ num });

            let start_index = closest_openbracket.at(-1), end_index = stack.length;
            
            for(let i=start_index+1;i<end_index;i++){
                const second_expression = stack[i], first_expression = stack[start_index];
                let result = second_expression.num;;
                if(first_expression.num) {
                    result = computeMathOperation(first_expression.num, second_expression.num, first_expression.operator);
                }
                stack[start_index] = {
                    operator: second_expression.operator,
                    num: result
                }
            }
            for(let i=start_index+1;i<end_index;i++) stack.pop();
            closest_openbracket.pop();
        }
        else {
            if(isNaN(num) && operator && stack.length > 0){
                stack[stack.length-1].operator = operator;
            }
            else if(!isNaN(num)){
                stack.push({
                    num: num,
                    operator
                });
            }
        }
    }
    
    for(let i=1;i<stack.length;i++){
        const second_expression = stack[i], first_expression = stack[i-1];
        if(first_expression.openbracket || second_expression.openbracket) return INVALID_INPUT;
        const result = computeMathOperation(first_expression.num, second_expression.num, first_expression.operator);
        
        stack[i] = {
            ...stack[i],
            num: result
        }
    }
    
    return stack[stack.length-1].num.toString();
}

const evaluateExpression = (matches) => {
    const final_expression = [];
    for(let {groups: {num, operator, openbracket, closebracket}} of matches){
        num = +num;
        if(isNaN(num)) num = undefined;
        if(openbracket && final_expression.length > 0 && final_expression.at(-1).num && !final_expression.at(-1).operator){
            final_expression.at(-1).operator = MULTIPLY_OPERATOR;
        }
        final_expression.push({
            num,
            operator,
            openbracket,
            closebracket
        });
    }

    return evaluateFinalExpression(final_expression);
}

export default evaluateExpression;