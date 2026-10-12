import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const NEW_ORIGIN = 'https://dongho.me';
export const MAX_REDIRECTS = 2048;

export function buildRedirects(map, origin = NEW_ORIGIN) {
  const rules = [];
  for (const entry of map) {
    const dashed = entry.notionId.toLowerCase();
    const bare = dashed.replace(/-/g, '');
    for (const id of new Set([dashed, bare])) {
      rules.push({
        source: `/posts/${id}`,
        destination: `${origin}/posts/${entry.encodedSlug}`,
        statusCode: 301,
      });
    }
  }
  // Vercel에서 `/:path*`는 루트(/)를 매칭하지 않으므로 명시적으로 둔다.
  rules.push({ source: '/', destination: `${origin}/`, statusCode: 301 });
  rules.push({ source: '/posts', destination: `${origin}/posts`, statusCode: 301 });
  rules.push({ source: '/posts/:path*', destination: `${origin}/`, statusCode: 301 });
  rules.push({ source: '/:path*', destination: `${origin}/:path*`, statusCode: 301 });

  if (rules.length > MAX_REDIRECTS) {
    throw new Error(`리디렉션 규칙 ${rules.length}개가 Vercel 한도 ${MAX_REDIRECTS}를 넘습니다.`);
  }
  return rules;
}

export function buildConfig(map) {
  return {
    framework: null,
    buildCommand: null,
    installCommand: null,
    outputDirectory: 'public',
    // 끝 슬래시가 붙은 경로(/about/, /posts/<uuid>/)는 규칙에 매칭되지 않아 404가 된다.
    // false로 두면 슬래시를 뗀 경로로 먼저 이동시킨 뒤 아래 규칙이 적용된다.
    trailingSlash: false,
    redirects: buildRedirects(map),
  };
}

async function main() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const map = JSON.parse(await fs.readFile(path.join(root, 'scripts/migration-map.json'), 'utf8'));
  const config = buildConfig(map);
  await fs.writeFile(path.join(root, 'vercel.json'), `${JSON.stringify(config, null, 2)}\n`);
  console.log(`vercel.json 생성: 리디렉션 규칙 ${config.redirects.length}개`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
