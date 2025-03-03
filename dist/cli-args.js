export default (function (args, options) {
  var knownCliParams = Object.keys(options).reduce(function (arr, k) {
    return arr.concat(options[k].cliParams);
  }, []);
  var params = {};
  Object.keys(options).forEach(function (paramName) {
    var _options$paramName = options[paramName],
      type = _options$paramName.type,
      cliParams = _options$paramName.cliParams,
      defaultValue = _options$paramName["default"];
    var value = defaultValue;
    switch (type) {
      case 'array':
        {
          var paramIndex = args.findIndex(function (arg) {
            return cliParams.indexOf(arg) !== -1;
          });
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
          var _paramIndex = args.findIndex(function (arg) {
            return cliParams.indexOf(arg) !== -1;
          });
          if (_paramIndex !== -1) {
            value = args[_paramIndex + 1];
          }
          break;
        }
      case 'bool':
        {
          value = args.find(function (arg) {
            return cliParams.indexOf(arg) !== -1;
          }) !== undefined;
          break;
        }
      default:
    }
    if (value !== undefined) {
      params[paramName] = value;
    }
  });
  return params;
});