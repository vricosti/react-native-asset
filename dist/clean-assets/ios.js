function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
import fs from 'fs-extra';
import path from 'path';
import xcode from 'xcode';
import createGroupWithMessage from '../react-native-lib/ios/createGroupWithMessage.js';
import getPlist from '../react-native-lib/ios/getPlist.js';
import writePlist from '../react-native-lib/ios/writePlist.js';
export default function cleanAssetsIOS(files, projectConfig, _ref) {
  var addFont = _ref.addFont,
    _ref$embedFolderNoFla = _ref.embedFolderNoFlattening,
    embedFolderNoFlattening = _ref$embedFolderNoFla === void 0 ? false : _ref$embedFolderNoFla,
    _ref$myLog = _ref.myLog,
    myLog = _ref$myLog === void 0 ? {
      info: function info() {},
      warn: function warn() {},
      verbose: function verbose() {}
    } : _ref$myLog;
  var project = xcode.project(projectConfig.pbxprojPath).parseSync();
  var plist = getPlist(project, projectConfig.sourceDir);
  myLog.info('cleanAssetsIOS: Starting cleanup process');
  createGroupWithMessage(project, 'Resources');
  function removeResourceFile(f) {
    return (f || []).map(function (asset) {
      myLog.info("cleanAssetsIOS: Processing asset: ".concat(asset));
      var relativePath = path.relative(projectConfig.sourceDir, asset);
      var assetName = path.basename(asset);
      myLog.info("cleanAssetsIOS: Relative path: ".concat(relativePath, ", Asset name: ").concat(assetName));
      if (embedFolderNoFlattening && fs.lstatSync(asset).isDirectory()) {
        var normalizedAssetPath = path.normalize(relativePath).replace(/\\/g, '/');
        myLog.info("cleanAssetsIOS: Normalized asset path: ".concat(normalizedAssetPath));
        var fileRefs = project.hash.project.objects.PBXFileReference || {};
        myLog.info("cleanAssetsIOS: Total PBXFileReference entries: ".concat(Object.keys(fileRefs).length));
        var fileRef = Object.values(fileRefs).find(function (ref) {
          if (!ref || _typeof(ref) !== 'object' || !ref.path || ref.isa !== 'PBXFileReference') {
            myLog.verbose("cleanAssetsIOS: Skipping invalid ref: ".concat(JSON.stringify(ref)));
            return false;
          }
          var refPath = ref.path.replace(/^"/, '').replace(/"$/, '');
          var normalizedRefPath = path.normalize(refPath).replace(/\\/g, '/');
          var match = normalizedRefPath === normalizedAssetPath || normalizedRefPath === assetName || ref.name === assetName;
          myLog.verbose("cleanAssetsIOS: Checking ref - Path: ".concat(normalizedRefPath, ", Name: ").concat(ref.name, ", Match: ").concat(match));
          return match;
        });
        if (fileRef) {
          var fileRefUuid = fileRef.uuid || Object.keys(fileRefs).find(function (key) {
            return fileRefs[key] === fileRef;
          });
          myLog.info("cleanAssetsIOS: Found PBXFileReference UUID: ".concat(fileRefUuid));

          // Find Resources group by name or UUID
          var _groups = project.hash.project.objects.PBXGroup || {};
          var _resourcesGroup = Object.values(_groups).find(function (group) {
            return group.name === 'Resources';
          });
          if (!_resourcesGroup) {
            myLog.warn('cleanAssetsIOS: Resources group not found by name, trying UUID or key');
            _resourcesGroup = Object.values(_groups).find(function (group) {
              return group.uuid === '29683221F8874820BD0971E8';
            }) || project.getPBXGroupByKey('Resources');
          }
          if (_resourcesGroup) {
            myLog.info("cleanAssetsIOS: Found Resources group: ".concat(_resourcesGroup.uuid));
            myLog.info("cleanAssetsIOS: Current Resources children: ".concat(JSON.stringify(_resourcesGroup.children)));
            myLog.info("cleanAssetsIOS: Removing ".concat(fileRefUuid, " from Resources group: ").concat(_resourcesGroup.uuid));
            project.removeFromPbxGroup(fileRefUuid, _resourcesGroup.uuid);
            _resourcesGroup.children = _resourcesGroup.children.filter(function (child) {
              return child.value !== fileRefUuid;
            });
            myLog.info("cleanAssetsIOS: Updated Resources children: ".concat(JSON.stringify(_resourcesGroup.children)));
          } else {
            myLog.warn('cleanAssetsIOS: Resources group not found');
          }

          // Remove from PBXResourcesBuildPhase and PBXBuildFile
          var buildPhases = project.hash.project.objects.PBXResourcesBuildPhase || {};
          var buildPhaseUuid = Object.keys(buildPhases).find(function (uuid) {
            return buildPhases[uuid].isa === 'PBXResourcesBuildPhase';
          });
          var buildPhase = buildPhases[buildPhaseUuid];
          if (buildPhase) {
            myLog.info("cleanAssetsIOS: Found PBXResourcesBuildPhase: ".concat(buildPhaseUuid));
            var buildFiles = project.hash.project.objects.PBXBuildFile || {};
            var buildFile = Object.values(buildFiles).find(function (bf) {
              return bf && bf.fileRef === fileRefUuid;
            });
            if (buildFile) {
              var buildFileUuid = buildFile.uuid || Object.keys(buildFiles).find(function (key) {
                return buildFiles[key] === buildFile;
              });
              myLog.info("cleanAssetsIOS: Found PBXBuildFile UUID: ".concat(buildFileUuid));
              myLog.info("cleanAssetsIOS: Current PBXResourcesBuildPhase files: ".concat(JSON.stringify(buildPhase.files)));
              myLog.info("cleanAssetsIOS: Removing ".concat(buildFileUuid, " from PBXResourcesBuildPhase"));
              buildPhase.files = buildPhase.files.filter(function (file) {
                return file.value !== buildFileUuid;
              });
              project.hash.project.objects.PBXResourcesBuildPhase[buildPhaseUuid] = buildPhase;
              myLog.info("cleanAssetsIOS: Updated PBXResourcesBuildPhase files: ".concat(JSON.stringify(buildPhase.files)));
              myLog.info("cleanAssetsIOS: Deleting PBXBuildFile entry: ".concat(buildFileUuid));
              delete project.hash.project.objects.PBXBuildFile[buildFileUuid];
            } else {
              myLog.warn("cleanAssetsIOS: No PBXBuildFile found for fileRef: ".concat(fileRefUuid));
            }
          } else {
            myLog.warn('cleanAssetsIOS: No PBXResourcesBuildPhase found');
          }

          // Remove PBXFileReference
          myLog.info("cleanAssetsIOS: Deleting PBXFileReference entry: ".concat(fileRefUuid));
          delete project.hash.project.objects.PBXFileReference[fileRefUuid];
        } else {
          myLog.warn("cleanAssetsIOS: Could not find PBXFileReference for ".concat(normalizedAssetPath, " or ").concat(assetName));
        }
      } else {
        myLog.info("cleanAssetsIOS: Removing individual file: ".concat(relativePath));
        project.removeResourceFile(relativePath, {
          target: project.getFirstTarget().uuid
        });
      }
    }).filter(function (file) {
      return file;
    }).map(function (file) {
      return file.basename;
    });
  }
  var removedFiles = removeResourceFile(files);
  myLog.info("cleanAssetsIOS: Removed files: ".concat(JSON.stringify(removedFiles)));
  if (addFont) {
    var existingFonts = plist.UIAppFonts || [];
    var allFonts = existingFonts.filter(function (file) {
      return removedFiles.indexOf(file) === -1;
    });
    plist.UIAppFonts = Array.from(new Set(allFonts));
    myLog.info("cleanAssetsIOS: Updated UIAppFonts: ".concat(JSON.stringify(plist.UIAppFonts)));
  }

  // Remove Resources group if empty
  var groups = project.hash.project.objects.PBXGroup || {};
  var resourcesGroup = Object.values(groups).find(function (group) {
    return group.name === 'Resources';
  }) || project.getPBXGroupByKey('Resources');
  if (resourcesGroup && resourcesGroup.children.length === 0) {
    var mainGroup = project.getPBXGroupByKey(project.getFirstProject().firstProject.mainGroup);
    if (mainGroup) {
      myLog.info("cleanAssetsIOS: Removing empty Resources group: ".concat(resourcesGroup.uuid));
      project.removeFromPbxGroup(resourcesGroup.uuid, mainGroup.uuid);
      delete project.hash.project.objects.PBXGroup[resourcesGroup.uuid];
    } else {
      myLog.warn('cleanAssetsIOS: Main group not found for Resources removal');
    }
  } else {
    myLog.info("cleanAssetsIOS: Resources group still has children: ".concat(JSON.stringify(resourcesGroup ? resourcesGroup.children : [])));
  }
  myLog.info('cleanAssetsIOS: Writing updated project file');
  fs.writeFileSync(projectConfig.pbxprojPath, project.writeSync());
  writePlist(project, projectConfig.sourceDir, plist);
}