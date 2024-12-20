const EXPRESSION_REGEX = /(?<openbracket>\()?(?<num>(\+|-)?[0-9.]+)?(?<closebracket>\)?)?(?<operator>(\+|-|\*|\/|\^))?/g;

const getExpressionMatch = (value) => {
    if(!isNaN(+value)) return;
    const matches = [...value.matchAll(EXPRESSION_REGEX)];
    const {groups: {num, operator}} = matches[matches.length-1];
    if(!num && !operator) matches.pop();

    return matches;
}

export default getExpressionMatch;