module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "react-native/react-native": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-native/all"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
            "legacyDecorators": true
        },
    },
    "plugins": [
        "react",
        "react-native"
    ],
    "rules": {
        "no-console": 0,
        "react/prop-types": 0,
        "quotes": ["error", "double"],
        "react-native/no-inline-styles": 0
    }
};