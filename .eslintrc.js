module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react"
    ],
    "parser": "babel-eslint",
    "rules": {
        "indent": ["error", 4],
        "react/jsx-indent": [2, 4],
        "react/jsx-indent-props": [2, 4],
        "import/no-unresolved": 0,
        "import/no-extraneous-dependencies": 0,
        "no-undef": 0,
        "max-len": 0,
    },
    "settings": {
        "import/resolve": "webpack"
    }
}