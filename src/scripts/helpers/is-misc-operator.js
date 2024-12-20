import appConfig from "../config.js";

const isMiscOperator = (value) => {
    return appConfig.miscOperations.includes(value);
}

export default isMiscOperator;