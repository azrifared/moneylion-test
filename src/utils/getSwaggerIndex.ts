import * as fs from 'fs';

export function getSwaggerIndex(path: string) {
  return fs
    .readFileSync(`${path}/index.html`)
    .toString()
    .replace(
      'url: "https://petstore.swagger.io/v2/swagger.json"',
      'url: "/swagger.yaml", persistAuthorization: true'
    );
}
