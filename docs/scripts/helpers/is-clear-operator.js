import appConfig from "../config.js";

const isClearOperator = (value) => {
    return appConfig.clearOperations.includes(value);
}

export default isClearOperator;