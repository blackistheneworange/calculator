import appConfig from "../config.js";

const isPrefixOperator = (value) => {
    return appConfig.prefixOperations.includes(value);
}

export default isPrefixOperator;