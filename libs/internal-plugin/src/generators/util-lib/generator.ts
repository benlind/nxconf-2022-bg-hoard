import { formatFiles, installPackagesTask, Tree } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';
import { UtilLibGeneratorSchema } from './schema';

export default async function (tree: Tree, schema: UtilLibGeneratorSchema) {
  await libraryGenerator(tree, {
    name: `util-${schema.name}`,
    directory: schema.directory,
    tags: `type:util, scope:${schema.directory}`,
  });
  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}

// import {
//   addProjectConfiguration,
//   formatFiles,
//   generateFiles,
//   getWorkspaceLayout,
//   names,
//   offsetFromRoot,
//   Tree,
// } from '@nrwl/devkit';
// import * as path from 'path';
// import { UtilLibGeneratorSchema } from './schema';
// // import { libraryGenerator } from '@nrwl/workspace/generators';

// interface NormalizedSchema extends UtilLibGeneratorSchema {
//   projectName: string;
//   projectRoot: string;
//   projectDirectory: string;
//   parsedTags: string[];
// }

// function normalizeOptions(tree: Tree, options: UtilLibGeneratorSchema): NormalizedSchema {
//   const name = names(options.name).fileName;
//   const projectDirectory = options.directory
//     ? `${names(options.directory).fileName}/${name}`
//     : name;
//   const projectName = 'util-' + projectDirectory.replace(new RegExp('/', 'g'), '-');
//   const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}`;
//   const parsedTags = options.tags
//     ? options.tags.split(',').map((s) => s.trim())
//     : [];
//   if (!parsedTags.includes('type:util')) {
//     parsedTags.push('type:util')
//   }
//   const directoryScope = `scope:${options.directory}`
//   if (!parsedTags.includes(directoryScope)) {
//     parsedTags.push(directoryScope)
//   }

//   return {
//     ...options,
//     projectName,
//     projectRoot,
//     projectDirectory,
//     parsedTags,
//   };
// }

// function addFiles(tree: Tree, options: NormalizedSchema) {
//     const templateOptions = {
//       ...options,
//       ...names(options.name),
//       offsetFromRoot: offsetFromRoot(options.projectRoot),
//       template: ''
//     };
//     generateFiles(tree, path.join(__dirname, 'files'), options.projectRoot, templateOptions);
// }

// export default async function (tree: Tree, options: UtilLibGeneratorSchema) {
//   // await libraryGenerator(tree, options);

//   const normalizedOptions = normalizeOptions(tree, options);

//   addProjectConfiguration(
//     tree,
//     normalizedOptions.projectName,
//     {
//       root: normalizedOptions.projectRoot,
//       projectType: 'library',
//       sourceRoot: `${normalizedOptions.projectRoot}/src`,
//       targets: {
//         build: {
//           executor: "@bg-hoard/internal-plugin:build",
//         },
//       },
//       tags: normalizedOptions.parsedTags,
//     }
//   );
//   addFiles(tree, normalizedOptions);
//   await formatFiles(tree);
// }
