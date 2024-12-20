import appConfig from "../config.js";

const isResultOperator = (value) => {
    return appConfig.resultOperations.includes(value);
}

export default isResultOperator;