import { ADD_OPERATOR, ENTER_KEY, AC_KEY, CLOSE_ROUND_BRACKET, DIVIDE_OPERATOR, EQUAL_TO_KEY, MULTIPLY_OPERATOR, OPEN_ROUND_BRACKET, POWER_OPERATOR, SUBTRACT_OPERATOR, BACKSPACE_KEY, INVALID_INPUT, EC_KEY } from "./constants.js";

const appConfig = {
    mathOperations: [
        ADD_OPERATOR, SUBTRACT_OPERATOR, MULTIPLY_OPERATOR, DIVIDE_OPERATOR, POWER_OPERATOR
    ],
    resultOperations: [EQUAL_TO_KEY, ENTER_KEY],
    clearOperations: [AC_KEY, EC_KEY, BACKSPACE_KEY],
    prefixOperations: [ADD_OPERATOR, SUBTRACT_OPERATOR],
    miscOperations: [OPEN_ROUND_BRACKET, CLOSE_ROUND_BRACKET],
    noDisplay: [ENTER_KEY, BACKSPACE_KEY],
    alertMessages: [INVALID_INPUT]
}

export default appConfig;