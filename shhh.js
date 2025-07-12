/**
 * SHHH - The Silent Language
 * An esoteric programming language that uses only whitespace characters
 * 
 * Syntax:
 * - Space ( ): Basic command separator
 * - Tab (\t): Function/block start
 * - Dot (.): Variable/value marker
 * - Underscore (_): Operator/action marker
 * 
 * Commands:
 * .     = Variable/value
 * _     = Operator/action
 * \t    = Function definition/call
 * \n    = End of statement
 * 
 * Detailed syntax:
 * .<name>_<value>       = Set variable <name> to <value>
 * .<name>               = Get variable <name>
 * _+                    = Add operator
 * _-                    = Subtract operator  
 * _*                    = Multiply operator
 * _/                    = Divide operator
 * _==                   = Equals operator
 * _>                    = Greater than operator
 * _<                    = Less than operator
 * _p                    = Print operator
 * \t<name>_<body>       = Define function <name> with <body>
 * \t<name>              = Call function <name>
 * __                    = Try block start
 * ___                   = Catch block start
 * ____                  = End try/catch
 */

class ShhInterpreter {
    constructor() {
        this.variables = {};
        this.functions = {};
        this.stack = [];
        this.output = [];
        this.errors = [];
        this.inTryBlock = false;
        this.inCatchBlock = false;
        this.tryBlocks = [];
    }

    parse(code) {
        code = code.replace(/\\t/g, '\t').replace(/\\n/g, '\n');
        
        const lines = code.split('\n');
        const codeLines = lines.filter(line => !line.trim().startsWith('#'));
        code = codeLines.join('\n');
        
        const tokens = [];
        let current = '';
        let i = 0;
        
        while (i < code.length) {
            const char = code[i];
            
            if (char === ' ' || char === '\t' || char === '\n') {
                if (current.trim()) {
                    tokens.push(current.trim());
                    current = '';
                }
                if (char === '\t') {
                    tokens.push('\t');
                } else if (char === '\n') {
                    tokens.push('\n');
                }
            } else if (char === '_' && current === '') {
                let operator = '_';
                let j = i + 1;
                while (j < code.length && code[j] === '_') {
                    operator += '_';
                    j++;
                }
                if (j < code.length && '+-*/==><p'.includes(code[j])) {
                    operator += code[j];
                    j++;
                    if (j < code.length && code[j] === '=' && operator.endsWith('=')) {
                        operator += '=';
                        j++;
                    }
                }
                tokens.push(operator);
                i = j - 1;
            } else {
                current += char;
            }
            i++;
        }
        
        if (current.trim()) {
            tokens.push(current.trim());
        }
        
        return tokens;
    }

    execute(tokens) {
        try {
            this.output = [];
            this.errors = [];
            let i = 0;
            
            while (i < tokens.length) {
                const token = tokens[i];
                
                if (token === '\n') {
                    i++;
                    continue;
                }
                
                if (token === '__') {
                    this.inTryBlock = true;
                    this.tryBlocks.push({ type: 'try', startIndex: i, errors: [] });
                    i++;
                    continue;
                }
                
                if (token === '___') {
                    this.inTryBlock = false;
                    this.inCatchBlock = true;
                    if (this.tryBlocks.length > 0) {
                        this.tryBlocks[this.tryBlocks.length - 1].type = 'catch';
                    }
                    i++;
                    continue;
                }
                
                if (token === '____') {
                    this.inTryBlock = false;
                    this.inCatchBlock = false;
                    this.tryBlocks.pop();
                    i++;
                    continue;
                }
                
                if (token.startsWith('.')) {
                    i = this.handleVariable(tokens, i);
                } else if (token.startsWith('_')) {
                    i = this.handleOperator(tokens, i);
                } else if (token === '\t') {
                    i = this.handleFunction(tokens, i);
                } else {
                    if (!isNaN(token)) {
                        this.stack.push(parseFloat(token));
                    } else {
                        this.stack.push(token);
                    }
                    i++;
                }
            }
            
            return {
                output: this.output.join('\n'),
                errors: this.errors,
                variables: this.variables,
                functions: Object.keys(this.functions)
            };
        } catch (error) {
            this.handleError(error.message);
            return {
                output: this.output.join('\n'),
                errors: this.errors,
                variables: this.variables,
                functions: Object.keys(this.functions)
            };
        }
    }

    handleVariable(tokens, index) {
        const token = tokens[index];
        
        if (token === '.') {
            if (index + 1 < tokens.length) {
                const varName = tokens[index + 1];
                if (this.variables.hasOwnProperty(varName)) {
                    this.stack.push(this.variables[varName]);
                } else {
                    this.handleError(`Variable '${varName}' not found`);
                }
                return index + 2;
            }
        } else if (token.startsWith('.')) {
            const parts = token.split('_');
            const varName = parts[0].substring(1);
            
            if (parts.length > 1) {
                const value = parts.slice(1).join('_');
                this.variables[varName] = isNaN(value) ? value : parseFloat(value);
                return index + 1;
            } else {
                if (this.variables.hasOwnProperty(varName)) {
                    this.stack.push(this.variables[varName]);
                } else {
                    this.handleError(`Variable '${varName}' not found`);
                }
                return index + 1;
            }
        }
        
        return index + 1;
    }

    handleOperator(tokens, index) {
        const token = tokens[index];
        
        switch (token) {
            case '_+':
                this.performBinaryOp((a, b) => a + b);
                break;
            case '_-':
                this.performBinaryOp((a, b) => a - b);
                break;
            case '_*':
                this.performBinaryOp((a, b) => a * b);
                break;
            case '_/':
                this.performBinaryOp((a, b) => {
                    if (b === 0) {
                        this.handleError('Division by zero');
                        return 0;
                    }
                    return a / b;
                });
                break;
            case '_==':
                this.performBinaryOp((a, b) => a === b ? 1 : 0);
                break;
            case '_>':
                this.performBinaryOp((a, b) => a > b ? 1 : 0);
                break;
            case '_<':
                this.performBinaryOp((a, b) => a < b ? 1 : 0);
                break;
            case '_p':
                if (this.stack.length > 0) {
                    this.output.push(this.stack.pop());
                } else {
                    this.handleError('Nothing to print');
                }
                break;
            default:
                this.handleError(`Unknown operator: ${token}`);
        }
        
        return index + 1;
    }

    performBinaryOp(operation) {
        if (this.stack.length < 2) {
            this.handleError('Not enough values for operation');
            return;
        }
        
        const b = this.stack.pop();
        const a = this.stack.pop();
        
        if (typeof a === 'number' && typeof b === 'number') {
            this.stack.push(operation(a, b));
        } else {
            this.handleError('Invalid operands for operation');
        }
    }

    handleFunction(tokens, index) {
        if (index + 1 < tokens.length) {
            const nameAndBody = tokens[index + 1];
            
            if (nameAndBody.includes('_')) {
                const parts = nameAndBody.split('_');
                const funcName = parts[0];
                const bodyStr = parts.slice(1).join('_');
                
                const body = this.parse(bodyStr);
                this.functions[funcName] = body;
                return index + 2;
            } else {
                const funcName = nameAndBody;
                if (this.functions.hasOwnProperty(funcName)) {
                    const savedStack = [...this.stack];
                    const result = this.execute(this.functions[funcName]);
                    
                    this.variables = { ...this.variables, ...result.variables };
                    this.output.push(...result.output.split('\n').filter(line => line.trim()));
                    
                    if (result.errors.length > 0 && !this.inTryBlock) {
                        this.errors.push(...result.errors);
                    }
                } else {
                    this.handleError(`Function '${funcName}' not found`);
                }
                return index + 2;
            }
        }
        
        return index + 1;
    }

    handleError(message) {
        if (this.inTryBlock) {
            if (this.tryBlocks.length > 0) {
                this.tryBlocks[this.tryBlocks.length - 1].errors = this.tryBlocks[this.tryBlocks.length - 1].errors || [];
                this.tryBlocks[this.tryBlocks.length - 1].errors.push(message);
            }
        } else if (this.inCatchBlock) {
            this.errors.push(message);
        } else {
            this.errors.push(message);
        }
    }

    run(code) {
        const tokens = this.parse(code);
        return this.execute(tokens);
    }
}

function runExample() {
    const interpreter = new ShhInterpreter();
    
    console.log("=== SHHH Language Examples ===\n");
    
    console.log("1. Variables:");
    const example1 = ".x_5\n.x\n_p";
    console.log(`Code: ${example1.replace(/\n/g, '\\n')}`);
    console.log("Result:", interpreter.run(example1));
    console.log();
    
    console.log("2. Arithmetic:");
    const example2 = ".a_10\n.b_5\n.a\n.b\n_+\n_p";
    console.log(`Code: ${example2.replace(/\n/g, '\\n')}`);
    console.log("Result:", interpreter.run(example2));
    console.log();
    
    console.log("3. Functions:");
    const example3 = "\\tadd_.x_.y_.x_.y_+_p\n.x_3\n.y_7\n\\tadd";
    console.log(`Code: ${example3.replace(/\n/g, '\\n')}`);
    console.log("Result:", interpreter.run(example3));
    console.log();
    
    console.log("4. Error Handling:");
    const example4 = "__\n10\n0\n_/\n_p\n___\n999\n_p\n____";
    console.log(`Code: ${example4.replace(/\n/g, '\\n')}`);
    console.log("Result:", interpreter.run(example4));
    console.log();
    
    console.log("5. Comparisons:");
    const example5 = "5\n3\n_>\n_p\n2\n2\n_==\n_p";
    console.log(`Code: ${example5.replace(/\n/g, '\\n')}`);
    console.log("Result:", interpreter.run(example5));
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ShhInterpreter;
}

if (typeof require !== 'undefined' && require.main === module) {
    runExample();
}
