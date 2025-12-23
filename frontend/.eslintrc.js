module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  extends: ["eslint:recommended", "react-app", "react-app/jest"],
  rules: {
    // Disable specific rules
    'no-console': 'off', // Disable console.log warnings
    'no-unused-vars': 'off', // Disable unused variable warnings
    'no-undef': 'off', // Disable undefined variable warnings
    'no-empty': 'off', // Disable empty block warnings
    'no-extra-semi': 'off', // Disable extra semicolon warnings
    'no-irregular-whitespace': 'off', // Disable irregular whitespace warnings
    'no-trailing-spaces': 'off', // Disable trailing space warnings
    'comma-dangle': 'off', // Disable comma dangle warnings
    'no-multi-spaces': 'off', // Disable multiple spaces warnings
    'no-multiple-empty-lines': 'off', // Disable multiple empty lines warnings
    'no-fallthrough': 'off', // Disable fallthrough in switch statements warnings
    'no-unreachable': 'off', // Disable unreachable code warnings
    'no-empty-function': 'off', // Disable empty function warnings
    'array-callback-return': 'off', // Disable missing return in array callback warnings
    'prefer-const': 'off', // Disable prefer const warnings
    'prefer-destructuring': 'off', // Disable prefer destructuring warnings
    'quote-props': 'off', // Disable unnecessary quote around object property warnings
    'no-new-object': 'off', // Disable unnecessary new object creation warnings
    'no-new-wrappers': 'off', // Disable unnecessary new wrapper object creation warnings
    'no-useless-escape': 'off', // Disable unnecessary escape character warnings
  },
};
