const ShhInterpreter = require('./shhh.js');

console.log('🤫 SHHH Language - Comprehensive Demo');
console.log('=====================================\n');

const interpreter = new ShhInterpreter();

// Example 1: Basic Variables and Output
console.log('1. Variables and Basic Output:');
const example1 = `
.greeting_Hello
.name_World
.greeting
_p
.name
_p
`;
let result = interpreter.run(example1);
console.log('Code:', example1.replace(/\n/g, '\\n'));
console.log('Output:', result.output);
console.log('Variables:', result.variables);
console.log();

// Example 2: Arithmetic Operations
console.log('2. Arithmetic Operations:');
interpreter.variables = {}; // Reset
const example2 = `
.a_15
.b_7
.a
.b
_+
_p
.a
.b
_-
_p
.a
.b
_*
_p
`;
result = interpreter.run(example2);
console.log('Code:', example2.replace(/\n/g, '\\n'));
console.log('Output:', result.output);
console.log();

// Example 3: Comparison Operations
console.log('3. Comparison Operations:');
interpreter.variables = {}; // Reset
const example3 = `
5
3
_>
_p
2
2
_==
_p
10
15
_<
_p
`;
result = interpreter.run(example3);
console.log('Code:', example3.replace(/\n/g, '\\n'));
console.log('Output:', result.output);
console.log();

// Example 4: Stack Operations
console.log('4. Stack-based Operations:');
interpreter.variables = {}; // Reset
const example4 = `
1
2
3
4
5
_p
_p
_p
_p
_p
`;
result = interpreter.run(example4);
console.log('Code:', example4.replace(/\n/g, '\\n'));
console.log('Output:', result.output);
console.log();

// Example 5: String Variables
console.log('5. String Variables:');
interpreter.variables = {}; // Reset
const example5 = `
.lang_SHHH
.desc_Silent_Language
.lang
_p
.desc
_p
`;
result = interpreter.run(example5);
console.log('Code:', example5.replace(/\n/g, '\\n'));
console.log('Output:', result.output);
console.log('Variables:', result.variables);
console.log();

// Example 6: Error Handling
console.log('6. Error Handling:');
interpreter.variables = {}; // Reset
const example6 = `
__
10
0
_/
_p
___
.error_Division_by_zero_handled
.error
_p
____
`;
result = interpreter.run(example6);
console.log('Code:', example6.replace(/\n/g, '\\n'));
console.log('Output:', result.output);
console.log('Variables:', result.variables);
console.log();

// Example 7: Complex Calculation
console.log('7. Complex Calculation (2 * 3 + 4 * 5):');
interpreter.variables = {}; // Reset
const example7 = `
2
3
_*
4
5
_*
_+
_p
`;
result = interpreter.run(example7);
console.log('Code:', example7.replace(/\n/g, '\\n'));
console.log('Output:', result.output);
console.log();

// Example 8: Variable Manipulation
console.log('8. Variable Manipulation:');
interpreter.variables = {}; // Reset
const example8 = `
.counter_0
.counter
1
_+
.counter_1
.counter
_p
.counter
2
_+
.counter_3
.counter
_p
`;
result = interpreter.run(example8);
console.log('Code:', example8.replace(/\n/g, '\\n'));
console.log('Output:', result.output);
console.log('Final Variables:', result.variables);
console.log();