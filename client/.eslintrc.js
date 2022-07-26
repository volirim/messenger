module.exports = {
  'env': {
    'browser': true,
    'node': true,
    'es2021': true,
  },
  'globals': {
    'API': false,
    'WS': false,
    'WSAPI': false,
    'DOWNLOAD_PATH': true,
    'clients': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    '@typescript-eslint'
  ],
  'rules': {
    'semi': [2, 'always'], // require or disallow use of semicolons instead of ASI
    'quotes': [2, 'single'],
    'strict': [2, 'never'],
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'react/react-in-jsx-scope': 2,
    'react/jsx-no-undef': 2,
    'no-console': 0, // disallow use of console (off by default in the node environment),
    'no-constant-condition': 2, // disallow use of constant expressions in conditions
    'no-debugger': 2, // disallow use of debugger
    'no-dupe-args': 2, // disallow duplicate arguments in functions
    'no-dupe-keys': 2, // disallow duplicate keys when creating object literals
    'no-duplicate-case': 2, // disallow a duplicate case label.
    'no-ex-assign': 2, // disallow assigning to the exception in a catch block
    'no-extra-boolean-cast': 2, // disallow double-negation boolean casts in a boolean context
    'no-extra-semi': 2, // disallow unnecessary semicolons
    'no-invalid-regexp': 2, // disallow invalid regular expression strings in the RegExp constructor
    'no-negated-in-lhs': 2, // disallow negation of the left operand of an in expression
    'no-regex-spaces': 2, // disallow multiple spaces in a regular expression literal
    'no-unreachable': 2, // disallow unreachable statements after a return, throw, continue, or break statement
    'use-isnan': 2, // disallow comparisons with the value NaN
    'valid-typeof': 2, // Ensure that the results of typeof are compared against a valid string
    'no-unexpected-multiline': 2, // Avoid code that looks like two expressions but is actually one (off by default)
    'default-case': 2, // require default case in switch statements (off by default)
    'dot-notation': 2, // encourages use of dot notation whenever possible
    'dot-location': [2, 'property'], // enforces consistent newlines before or after dots (off by default)
    'eqeqeq': 2, // require the use of === and !==
    'no-alert': 2, // disallow the use of alert, confirm, and prompt
    'no-caller': 2, // disallow use of arguments.caller or arguments.callee
    'no-else-return': 2, // disallow else after a return in an if (off by default)
    'no-eval': 2, // disallow use of eval()
    'no-extra-bind': 2, // disallow unnecessary function binding
    'no-implied-eval': 2, // disallow use of eval()-like methods
    'no-iterator': 2, // disallow usage of __iterator__ property
    'no-labels': 2, // disallow use of labeled statements
    'no-lone-blocks': 2, // disallow unnecessary nested blocks
    'no-new-wrappers': 2, // disallows creating new instances of String,Number, and Boolean
    'no-octal': 2, // disallow use of octal literals
    'no-param-reassign': 2, // disallow reassignment of function parameters (off by default)
    'no-proto': 2, // disallow usage of __proto__ property
    'no-redeclare': 2, // disallow declaring the same variable more then once
    'no-self-compare': 2, // disallow comparisons where both sides are exactly the same (off by default)
    'no-unused-expressions': 2, // disallow usage of expressions in statement position
    'no-warning-comments': [0, { 'terms': ['todo', 'fixme'], 'location': 'start' }], // disallow usage of configurable warning terms in comments": 2, // e.g. TODO or FIXME (off by default)
    'no-with': 2, // disallow use of the with statement
    'wrap-iife': 2, // require immediate function invocation to be wrapped in parentheses (off by default)
    'no-catch-shadow': 2, // disallow the catch clause parameter name being the same as a variable in the outer scope (off by default in the node environment)
    'no-delete-var': 2, // disallow deletion of variables
    'no-label-var': 2, // disallow labels that share a name with a variable
    'no-shadow-restricted-names': 2, // disallow shadowing of names such as arguments
    'no-undef': 2, // disallow use of undeclared variables unless mentioned in a /*global */ block
    'no-unused-vars': 2, // disallow declaration of variables that are not used in the code
    'array-bracket-spacing': [2, 'never'], // enforce spacing inside array brackets (off by default)
    'comma-spacing': [2, { 'before': false, 'after': true }], // enforce spacing before and after comma
    'comma-style': [2, 'last'], // enforce one true comma style (off by default)
    'eol-last': 2, // enforce newline at the end of file, with no multiple empty lines
    'indent': [2, 2], // this option sets a specific tab width for your code (off by default)
    'key-spacing': [2, { 'beforeColon': false, 'afterColon': true }], // enforces spacing between keys and values in object literal properties
    'new-cap': [2, { 'newIsCap': true, 'capIsNew': false }], // require a capital letter for constructors
    'no-lonely-if': 2, // disallow if as the only statement in an else block (off by default)
    'no-mixed-spaces-and-tabs': 2, // disallow mixed spaces and tabs for indentation
    'no-multiple-empty-lines': [2, { 'max': 1 }], // disallow multiple empty lines (off by default)
    'no-nested-ternary': 2, // disallow nested ternary expressions (off by default)
    'no-new-object': 2, // disallow use of the Object constructor
    'no-spaced-func': 2, // disallow space between function identifier and application
    'no-trailing-spaces': 2, // disallow trailing whitespace at the end of lines
    'no-underscore-dangle': 0, // disallow dangling underscores in identifiers
    'no-unneeded-ternary': 2, //disallow the use of Boolean literals in conditional expressions (off by default)
    'operator-assignment': [2, 'always'], // require assignment operator shorthand where possible or prohibit it entirely (off by default)
    'space-before-blocks': [2, 'always'], // require or disallow space before blocks (off by default)
    'space-before-function-paren': [2, { 'anonymous': 'always', 'named': 'always' }], // require or disallow space before function opening parenthesis (off by default)
    'space-in-parens': [2, 'never'], // require or disallow spaces inside parentheses (off by default)
    'space-infix-ops': 2, // require spaces around operators
    'constructor-super': 2, //verify super() callings in constructors (off by default)
    'generator-star-spacing': [2, 'both'], //enforce the spacing around the * in generator functions (off by default)
    'no-this-before-super': 2, //disallow to use this/super before super() calling in constructors. (off by default)
    'object-shorthand': 2, //require method and property shorthand syntax for object literals (off by default)
    'prefer-const': 2, //suggest using of const declaration for variables that are never modified after declared (off by default)
    'keyword-spacing': [2, { 'after': true, 'before': true }],
    'react/jsx-curly-spacing': ['error', 'never', { 'allowMultiline': true }],
    'react/no-multi-comp': [2],
    'react/no-access-state-in-setstate': [2],
    'react/no-direct-mutation-state': [2, 'always'],
    'react/destructuring-assignment': [2, 'always'],
    'react/style-prop-object': 2,
    'comma-dangle': [
      'error',
      {
        'arrays': 'ignore',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'ignore',
        'functions': 'ignore',
      }
    ],
  },
};
