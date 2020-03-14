class Brackets {
    constructor(arr) {
        this.openBracket = arr[0];
        this.closeBracket = arr[1];
    }
}

module.exports = function check(str, bracketsConfig) {
    bracketsConfig = bracketsConfig.map(config => new Brackets(config));
    str = str.split("");
    let stack = [];
    try {
        while (str.length !== 0) {
            bracketsConfig.forEach(config => {
                if (config.openBracket === config.closeBracket) {
                    if (str[0] === config.openBracket) {
                        stack.push(str.shift());
                        if (stack[stack.length - 1] === str[0]) {
                            str.shift();
                            stack.pop();
                        } else if (
                            stack[stack.length - 1] === stack[stack.length - 2]
                        ) {
                            stack.pop();
                            stack.pop();
                        }
                    }
                } else {
                    if (
                        config.closeBracket === str[0] &&
                        config.openBracket === stack[stack.length - 1]
                    ) {
                        stack.pop();
                        str.shift();
                    }
                    if (config.openBracket === str[0]) {
                        stack.push(str.shift());
                    }
                    if (
                        config.closeBracket === str[0] &&
                        config.openBracket !== stack[stack.length - 1]
                    ) {
                        throw new Error();
                    }
                }
            });
        }
    } catch (error) {
        return false;
    }
    return !stack.length;
};
