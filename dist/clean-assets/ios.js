"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cleanAssetsIOS;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.map.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _path = _interopRequireDefault(require("path"));
var _xcode = _interopRequireDefault(require("xcode"));
var _createGroupWithMessage = _interopRequireDefault(require("../react-native-lib/ios/createGroupWithMessage.js"));
var _getPlist = _interopRequireDefault(require("../react-native-lib/ios/getPlist.js"));
var _writePlist = _interopRequireDefault(require("../react-native-lib/ios/writePlist.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * This function works in a similar manner to its Android version,
 * except it does not delete assets but removes Xcode Group references
 */
function cleanAssetsIOS(files, projectConfig, _ref) {
  var {
    addFont
  } = _ref;
  var project = _xcode.default.project(projectConfig.pbxprojPath).parseSync();
  var plist = (0, _getPlist.default)(project, projectConfig.sourceDir);
  (0, _createGroupWithMessage.default)(project, 'Resources');
  function removeResourceFile(f) {
    return (f || []).map(asset => project.removeResourceFile(_path.default.relative(projectConfig.sourceDir, asset), {
      target: project.getFirstTarget().uuid
    })).filter(file => file) // xcode returns false if file is already there
    .map(file => file.basename);
  }
  var removedFiles = removeResourceFile(files);
  if (addFont) {
    var existingFonts = plist.UIAppFonts || [];
    var allFonts = existingFonts.filter(file => removedFiles.indexOf(file) === -1);
    plist.UIAppFonts = Array.from(new Set(allFonts)); // use Set to dedupe w/existing
  }
  _fsExtra.default.writeFileSync(projectConfig.pbxprojPath, project.writeSync());
  (0, _writePlist.default)(project, projectConfig.sourceDir, plist);
}
;