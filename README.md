# 🎄 Christmas Tree Generator

An ASCII **Christmas tree generator** written in Node.js. The program creates a text-based tree in a file based on the number of layers, with input validation, CLI support, and automated tests.

## 📦 Installation and Usage

1. Make sure [Node.js](https://nodejs.org/) (v18+) is installed
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the generator

   ```bash
   npm start -- --layers <number> --output <path_to_file.txt>

   //example
   npm start -- --layers 8 --output tree.txt
   ```

---

## ✨ Generation Rules

Valid Input

- Integer values from 4 to 20 (inclusive)
- Decimal numbers are supported and floored (8.9 → 8)

Invalid Input

- > Non-numeric strings ("abc", "🎄") → message: 'Invalid size format.'
- > Numbers ≤ 0 → message: 'This size is not available in the assortment. 🤷'

Values outside the valid range:

- > '< 4' → message: 'The tree is too small... come back next winter 😊'
- > '> 20' → message: 'You are too late! The tree is too big to fit in your house! 🏠'

Tree Types:

🌲 Small Tree (4–5 layers)

- Structure:
- Top: ^
- Body: alternating patterns _~_ and _'o'_
- Trunk: T

Example:

```bash
   ^
  *~*
 *'o'*
*~*~*~*
   T
```

🌲Large Tree (6–20 layers)
Structure:

- Top: W
- Second line: \*
- Body: stars with @ symbol alternating on the sides
- Trunk: two lines of TTTTT

Example:

```bash
         W

         *

    @* * * * *

 * * * * * * * * *@

       TTTTT

       TTTTT
```

---

## 🧪 Testing

The project includes two levels of tests:

- Unit tests: validate tree generation logic (npm test)
- Acceptance tests: verify the full cycle — from CLI input to file output
- Tests run automatically on every Pull Request via GitHub Actions.

---

## 🛠️ Tech Stack

- Language: **JavaScript (Node.js)**
- Testing: **Jest**
- CI/CD: **GitHub Actions**
- OS: **Cross-platform** (Windows, macOS, Linux)

---

## 🏗️ Architecture

The project follows clean architecture principles:

Separation of concerns:

- cli.js — command-line argument parsing
- treeGenerator.js — pure business logic (no side effects)
- fileWriter.js — encapsulated file system operations
- helpers.js — utility functions (width calculation, centering)
- constants.js — centralized message storage
- Testability: all modules can be tested in isolation
- Extensibility: easy to add new tree types or output formats
- Validation: centralized handling of invalid input

---

## 🚀 CI/CD

On every Pull Request, the pipeline automatically:

- Installs dependencies
- Runs unit tests
- Executes an acceptance test (tree generation and output verification)
- Build status is displayed directly in the GitHub UI
