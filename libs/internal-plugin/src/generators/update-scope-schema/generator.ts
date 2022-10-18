import { formatFiles, installPackagesTask, Tree, updateJson } from '@nrwl/devkit';

export default async function (tree: Tree) {
  await updateJson(tree, 'nx.json', value => {
    value.defaultProject = 'api'
    return value
  })
  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
