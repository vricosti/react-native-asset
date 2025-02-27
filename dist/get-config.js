"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.find.js");
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = _ref => {
  var {
    rootPath
  } = _ref;
  var iosPath = _path.default.resolve(rootPath, 'ios');
  var androidPath = _path.default.resolve(rootPath, 'android');
  var iosExists = _fs.default.existsSync(iosPath);
  var xcodeprojName = iosExists ? _fs.default.readdirSync(iosPath).find(file => _path.default.extname(file) === '.xcodeproj') : null;
  var pbxprojPath = xcodeprojName !== null ? _path.default.resolve(iosPath, xcodeprojName, 'project.pbxproj') : null;
  return {
    ios: {
      exists: iosExists,
      path: iosPath,
      pbxprojPath,
      sourceDir: iosPath
    },
    android: {
      exists: _fs.default.existsSync(androidPath),
      path: androidPath
    }
  };
};
exports.default = _default;