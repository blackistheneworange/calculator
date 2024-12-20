import { ENTER_KEY, EQUAL_TO_KEY } from '../constants.js';
import evaluateExpression from '../helpers/evaluate-expression.js';
import getExpressionMatch from '../helpers/get-expression-match.js';


function computeEqualToOperation(value){
    const expression_matches = getExpressionMatch(value);
    if(!expression_matches) return;
    return evaluateExpression(expression_matches);

}

function computeResultOperation(value, operation){
    switch(operation){
        case EQUAL_TO_KEY:
            return computeEqualToOperation(value);
        case ENTER_KEY:
            return computeEqualToOperation(value);
        default:
            throw new Error("Invalid result operation");
    }
}

export default computeResultOperation;