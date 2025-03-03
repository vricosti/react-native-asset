import fs from 'fs-extra';
import path from 'path';
import xcode from 'xcode';
import createGroupWithMessage from '../react-native-lib/ios/createGroupWithMessage.js';
import getPlist from '../react-native-lib/ios/getPlist.js';
import writePlist from '../react-native-lib/ios/writePlist.js';

export default function cleanAssetsIOS(files, projectConfig, { addFont, embedFolderNoFlattening = false, myLog = { info: () => {}, warn: () => {}, verbose: () => {} } }) {
  const project = xcode.project(projectConfig.pbxprojPath).parseSync();
  const plist = getPlist(project, projectConfig.sourceDir);

  myLog.info('cleanAssetsIOS: Starting cleanup process');
  createGroupWithMessage(project, 'Resources');

  function removeResourceFile(f) {
    return (f || [])
      .map(asset => {
        myLog.info(`cleanAssetsIOS: Processing asset: ${asset}`);
        const relativePath = path.relative(projectConfig.sourceDir, asset);
        const assetName = path.basename(asset);
        myLog.info(`cleanAssetsIOS: Relative path: ${relativePath}, Asset name: ${assetName}`);

        if (embedFolderNoFlattening && fs.lstatSync(asset).isDirectory()) {
          const normalizedAssetPath = path.normalize(relativePath).replace(/\\/g, '/');
          myLog.info(`cleanAssetsIOS: Normalized asset path: ${normalizedAssetPath}`);

          const fileRefs = project.hash.project.objects.PBXFileReference || {};
          myLog.info(`cleanAssetsIOS: Total PBXFileReference entries: ${Object.keys(fileRefs).length}`);
          const fileRef = Object.values(fileRefs)
            .find(ref => {
              if (!ref || typeof ref !== 'object' || !ref.path || ref.isa !== 'PBXFileReference') {
                myLog.verbose(`cleanAssetsIOS: Skipping invalid ref: ${JSON.stringify(ref)}`);
                return false;
              }
              const refPath = ref.path.replace(/^"/, '').replace(/"$/, '');
              const normalizedRefPath = path.normalize(refPath).replace(/\\/g, '/');
              const match = normalizedRefPath === normalizedAssetPath || 
                            normalizedRefPath === assetName || 
                            ref.name === assetName;
              myLog.verbose(`cleanAssetsIOS: Checking ref - Path: ${normalizedRefPath}, Name: ${ref.name}, Match: ${match}`);
              return match;
            });

          if (fileRef) {
            const fileRefUuid = fileRef.uuid || Object.keys(fileRefs).find(key => fileRefs[key] === fileRef);
            myLog.info(`cleanAssetsIOS: Found PBXFileReference UUID: ${fileRefUuid}`);

            // Find Resources group by name or UUID
            const groups = project.hash.project.objects.PBXGroup || {};
            let resourcesGroup = Object.values(groups).find(group => group.name === 'Resources');
            if (!resourcesGroup) {
              myLog.warn('cleanAssetsIOS: Resources group not found by name, trying UUID or key');
              resourcesGroup = Object.values(groups).find(group => group.uuid === '29683221F8874820BD0971E8') || project.getPBXGroupByKey('Resources');
            }
            if (resourcesGroup) {
              myLog.info(`cleanAssetsIOS: Found Resources group: ${resourcesGroup.uuid}`);
              myLog.info(`cleanAssetsIOS: Current Resources children: ${JSON.stringify(resourcesGroup.children)}`);
              myLog.info(`cleanAssetsIOS: Removing ${fileRefUuid} from Resources group: ${resourcesGroup.uuid}`);
              project.removeFromPbxGroup(fileRefUuid, resourcesGroup.uuid);
              resourcesGroup.children = resourcesGroup.children.filter(child => child.value !== fileRefUuid);
              myLog.info(`cleanAssetsIOS: Updated Resources children: ${JSON.stringify(resourcesGroup.children)}`);
            } else {
              myLog.warn('cleanAssetsIOS: Resources group not found');
            }

            // Remove from PBXResourcesBuildPhase and PBXBuildFile
            const buildPhases = project.hash.project.objects.PBXResourcesBuildPhase || {};
            let buildPhaseUuid = Object.keys(buildPhases).find(uuid => buildPhases[uuid].isa === 'PBXResourcesBuildPhase');
            let buildPhase = buildPhases[buildPhaseUuid];
            if (buildPhase) {
              myLog.info(`cleanAssetsIOS: Found PBXResourcesBuildPhase: ${buildPhaseUuid}`);
              const buildFiles = project.hash.project.objects.PBXBuildFile || {};
              const buildFile = Object.values(buildFiles)
                .find(bf => bf && bf.fileRef === fileRefUuid);
              if (buildFile) {
                const buildFileUuid = buildFile.uuid || Object.keys(buildFiles).find(key => buildFiles[key] === buildFile);
                myLog.info(`cleanAssetsIOS: Found PBXBuildFile UUID: ${buildFileUuid}`);
                myLog.info(`cleanAssetsIOS: Current PBXResourcesBuildPhase files: ${JSON.stringify(buildPhase.files)}`);
                myLog.info(`cleanAssetsIOS: Removing ${buildFileUuid} from PBXResourcesBuildPhase`);
                buildPhase.files = buildPhase.files.filter(file => file.value !== buildFileUuid);
                project.hash.project.objects.PBXResourcesBuildPhase[buildPhaseUuid] = buildPhase;
                myLog.info(`cleanAssetsIOS: Updated PBXResourcesBuildPhase files: ${JSON.stringify(buildPhase.files)}`);
                myLog.info(`cleanAssetsIOS: Deleting PBXBuildFile entry: ${buildFileUuid}`);
                delete project.hash.project.objects.PBXBuildFile[buildFileUuid];
              } else {
                myLog.warn(`cleanAssetsIOS: No PBXBuildFile found for fileRef: ${fileRefUuid}`);
              }
            } else {
              myLog.warn('cleanAssetsIOS: No PBXResourcesBuildPhase found');
            }

            // Remove PBXFileReference
            myLog.info(`cleanAssetsIOS: Deleting PBXFileReference entry: ${fileRefUuid}`);
            delete project.hash.project.objects.PBXFileReference[fileRefUuid];
          } else {
            myLog.warn(`cleanAssetsIOS: Could not find PBXFileReference for ${normalizedAssetPath} or ${assetName}`);
          }
        } else {
          myLog.info(`cleanAssetsIOS: Removing individual file: ${relativePath}`);
          project.removeResourceFile(
            relativePath,
            { target: project.getFirstTarget().uuid },
          );
        }
      })
      .filter(file => file)
      .map(file => file.basename);
  }

  const removedFiles = removeResourceFile(files);
  myLog.info(`cleanAssetsIOS: Removed files: ${JSON.stringify(removedFiles)}`);

  if (addFont) {
    const existingFonts = (plist.UIAppFonts || []);
    const allFonts = existingFonts.filter(file => removedFiles.indexOf(file) === -1);
    plist.UIAppFonts = Array.from(new Set(allFonts));
    myLog.info(`cleanAssetsIOS: Updated UIAppFonts: ${JSON.stringify(plist.UIAppFonts)}`);
  }

  // Remove Resources group if empty
  const groups = project.hash.project.objects.PBXGroup || {};
  let resourcesGroup = Object.values(groups).find(group => group.name === 'Resources') || project.getPBXGroupByKey('Resources');
  if (resourcesGroup && resourcesGroup.children.length === 0) {
    const mainGroup = project.getPBXGroupByKey(project.getFirstProject().firstProject.mainGroup);
    if (mainGroup) {
      myLog.info(`cleanAssetsIOS: Removing empty Resources group: ${resourcesGroup.uuid}`);
      project.removeFromPbxGroup(resourcesGroup.uuid, mainGroup.uuid);
      delete project.hash.project.objects.PBXGroup[resourcesGroup.uuid];
    } else {
      myLog.warn('cleanAssetsIOS: Main group not found for Resources removal');
    }
  } else {
    myLog.info(`cleanAssetsIOS: Resources group still has children: ${JSON.stringify(resourcesGroup ? resourcesGroup.children : [])}`);
  }

  myLog.info('cleanAssetsIOS: Writing updated project file');
  fs.writeFileSync(projectConfig.pbxprojPath, project.writeSync());
  writePlist(project, projectConfig.sourceDir, plist);
}