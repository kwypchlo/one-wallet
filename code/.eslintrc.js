module.exports = {
  root: true,
  'env': {
    'node': true,
    'es2020': true,
    'jest': true,
    'truffle/globals': true,
  },
  'extends': [
    'standard',
  ],
  'globals': {
    'artifacts': 'readonly',
    'contract': 'readonly',
    'assert': 'readonly',
    'web3': 'readonly'
  },
  // 'parser': '@babel/eslint-parser',
  'rules': {
    'no-await-in-loop': 0,
    'no-underscore-dangle': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 1,
    'comma-dangle': 0,
    'no-console': 0,
    'no-mixed-operators': 0,
    'max-len': 0,
  },
  'parserOptions': {
    'requireConfigFile': false,
    'ecmaVersion': 2020
  },
  'plugins': [
    '@babel',
    'truffle',
  ],
}
