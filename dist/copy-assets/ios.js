function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
import fs from 'fs-extra';
import path from 'path';
import xcode from 'xcode';
import createGroupWithMessage from '../react-native-lib/ios/createGroupWithMessage.js';
import getPlist from '../react-native-lib/ios/getPlist.js';
import writePlist from '../react-native-lib/ios/writePlist.js';

/**
 * This function works in a similar manner to its Android version,
 * except it does not copy assets but creates Xcode Group references
 */
export default function copyAssetsIOS(files, projectConfig, _ref) {
  var addFont = _ref.addFont;
  var project = xcode.project(projectConfig.pbxprojPath).parseSync();
  var plist = getPlist(project, projectConfig.sourceDir);
  createGroupWithMessage(project, 'Resources');
  function addResourceFile(f) {
    return (f || []).map(function (asset) {
      return project.addResourceFile(path.relative(projectConfig.sourceDir, asset), {
        target: project.getFirstTarget().uuid
      });
    }).filter(function (file) {
      return file;
    }) // xcode returns false if file is already there
    .map(function (file) {
      return file.basename;
    });
  }
  var addedFiles = addResourceFile(files);
  if (addFont) {
    var existingFonts = plist.UIAppFonts || [];
    var allFonts = [].concat(_toConsumableArray(existingFonts), _toConsumableArray(addedFiles));
    plist.UIAppFonts = Array.from(new Set(allFonts)); // use Set to dedupe w/existing
  }
  fs.writeFileSync(projectConfig.pbxprojPath, project.writeSync());
  writePlist(project, projectConfig.sourceDir, plist);
}
;