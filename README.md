# SHHH - The Silent Language

![SHHH Logo](https://img.shields.io/badge/SHHH-The%20Silent%20Language-blue)

**SHHH** is an esoteric programming language that speaks in whispers, using only the most subtle characters: spaces, tabs, dots, and underscores. It's designed to be as quiet as possible while still being fully functional.

## 📖 Language Features

SHHH meets all the requirements for a complete programming language:

### ✅ Variables
- Store and retrieve values using dots (`.`)
- Example: `.x_5` sets variable `x` to `5`

### ✅ Operators
- Arithmetic: `_+`, `_-`, `_*`, `_/`
- Comparison: `_==`, `_>`, `_<`
- Output: `_p` (print)

### ✅ Functions
- Define reusable code blocks using tabs (`\t`)
- Example: `\tadd_.x_.y_.x_.y_+_p` defines an add function

### ✅ Error Handling
- Try-catch blocks using underscores: `__` (try), `___` (catch), `____` (end)
- Graceful error management for division by zero, undefined variables, etc.

## 🔤 Syntax Reference

### Basic Syntax
| Symbol | Purpose | Example |
|--------|---------|---------|
| `.` | Variable operations | `.x_5` (set), `.x` (get) |
| `_` | Operators | `_+`, `_-`, `_p` |
| `\t` | Functions | `\tfunc_body` |
| `\n` | End statement | Line breaks |

### Variables
```
.x_5        # Set variable x to 5
.name_hello # Set variable name to "hello"
.x          # Get variable x (pushes to stack)
```

### Operators
```
_+    # Add top two stack values
_-    # Subtract top two stack values
_*    # Multiply top two stack values
_/    # Divide top two stack values
_==   # Check equality (1 if equal, 0 if not)
_>    # Greater than comparison
_<    # Less than comparison
_p    # Print top stack value
```

### Functions
```
\tfunc_body   # Define function named 'func' with body
\tfunc        # Call function named 'func'
```

### Error Handling
```
__        # Start try block
___       # Start catch block
____      # End try/catch block
```

## 🎯 Examples

### Hello World (Sort of)
```
.msg_Hello
.msg
_p
```

### Simple Arithmetic
```
.a_10
.b_5
.a
.b
_+
_p
```
Output: `15`

### Function Definition and Call
```
\tsquare_.n_.n_.n_*_p
.n_4
\tsquare
```
Output: `16`

### Error Handling
```
__
10
0
_/
_p
___
999
_p
____
```
Output: `999` (catches division by zero)

### Fibonacci-like Sequence
```
.a_1
.b_1
.a
_p
.b
_p
.a
.b
_+
_p
```
Output:
```
1
1
2
```

## 🚀 Usage

### Node.js
```bash
node shhh.js
```

### Web Browser
Open `shhh.html` in your browser for an interactive interpreter.

### Programmatic Usage
```javascript
const ShhInterpreter = require('./shhh.js');

const interpreter = new ShhInterpreter();
const result = interpreter.run('.x_5\n.x\n_p');
console.log(result.output); // "5"
```
## 📜 License

MIT License - Because even silent languages deserve freedom.

---


*SHHH...*
