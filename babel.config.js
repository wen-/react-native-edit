module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy" : true }],
    ["babel-plugin-module-resolver", {
      "root": "./app",
      "alias": {
        "components": "./app/components",
        "config": "./app/config",
        "modules": "./app/modules",
        "test": "./app/modules/test",
        "resource": "./app/resource",
        "tools": "./app/tools"
      }
    }]
  ]
}
