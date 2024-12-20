import appConfig from "../config.js";

const isMathOperator = (value) => {
    return appConfig.mathOperations.includes(value);
}

export default isMathOperator;