"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.find.js");
require("core-js/modules/esnext.iterator.for-each.js");
require("core-js/modules/esnext.iterator.reduce.js");
var _default = (args, options) => {
  var knownCliParams = Object.keys(options).reduce((arr, k) => arr.concat(options[k].cliParams), []);
  var params = {};
  Object.keys(options).forEach(paramName => {
    var {
      type,
      cliParams,
      default: defaultValue
    } = options[paramName];
    var value = defaultValue;
    switch (type) {
      case 'array':
        {
          var paramIndex = args.findIndex(arg => cliParams.indexOf(arg) !== -1);
          if (paramIndex !== -1) {
            value = [];
            var index = 0;
            var nextArg = args[paramIndex + 1 + index];
            while (nextArg !== undefined && knownCliParams.indexOf(nextArg) === -1) {
              value = value.concat(nextArg);
              index += 1;
              nextArg = args[paramIndex + 1 + index];
            }
          }
          break;
        }
      case 'value':
        {
          var _paramIndex = args.findIndex(arg => cliParams.indexOf(arg) !== -1);
          if (_paramIndex !== -1) {
            value = args[_paramIndex + 1];
          }
          break;
        }
      case 'bool':
        {
          value = args.find(arg => cliParams.indexOf(arg) !== -1) !== undefined;
          break;
        }
      default:
    }
    if (value !== undefined) {
      params[paramName] = value;
    }
  });
  return params;
};
exports.default = _default;