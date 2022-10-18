import {
  Tree,
  updateJson,
  formatFiles,
  ProjectConfiguration,
  getProjects,
} from '@nrwl/devkit';

function getScopes(projectMap: Map<string, ProjectConfiguration>) {
  const projects: any[] = Array.from(projectMap.values());
  const allScopes: string[] = projects
    .map((project) =>
      project.tags.filter((tag: string) => tag.startsWith('scope:'))
    )
    .reduce((acc, tags) => [...acc, ...tags], [])
    .map((scope: string) => scope.slice(6));
  return Array.from(new Set(allScopes));
}

export default async function (tree: Tree) {
  const scopes = getScopes(getProjects(tree));
  updateJson(
    tree,
    'libs/internal-plugin/src/generators/util-lib/schema.json',
    (schemaJson) => {
      schemaJson.properties.directory['x-prompt'].items = scopes.map(
        (scope) => ({
          value: scope,
          label: scope,
        })
      );
      return schemaJson;
    }
  );
  await formatFiles(tree);
}
