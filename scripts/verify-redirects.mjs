import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = (process.argv[2] ?? 'https://dongho-blog.kro.kr').replace(/\/$/, '');
const map = JSON.parse(await fs.readFile(path.join(ROOT, 'scripts/migration-map.json'), 'utf8'));
const failures = [];

async function expectRedirect(pathname, expectedLocation, checkDestination = true) {
  const res = await fetch(base + pathname, { redirect: 'manual' });
  const location = res.headers.get('location');
  if (res.status !== 301) failures.push(`${pathname}: 상태 ${res.status} (301 기대)`);
  else if (location !== expectedLocation) failures.push(`${pathname}: Location ${location} (기대 ${expectedLocation})`);
  if (location && checkDestination) {
    const dest = await fetch(location);
    if (dest.status !== 200) failures.push(`${pathname} → ${location}: 목적지 상태 ${dest.status}`);
  }
}

for (const e of map) {
  const dashed = e.notionId.toLowerCase();
  const expected = `https://dongho.me/posts/${e.encodedSlug}`;
  await expectRedirect(`/posts/${dashed}`, expected);
  await expectRedirect(`/posts/${dashed.replace(/-/g, '')}`, expected);
}

await expectRedirect('/', 'https://dongho.me/');
await expectRedirect('/about', 'https://dongho.me/about');
await expectRedirect('/feed.xml', 'https://dongho.me/feed.xml');
await expectRedirect('/sitemap.xml', 'https://dongho.me/sitemap.xml');
await expectRedirect('/posts/00000000000000000000000000000000', 'https://dongho.me/');
// 임의 경로의 목적지는 새 블로그의 404 페이지이므로 목적지 200 검사에서 제외한다.
await expectRedirect('/no/such/path', 'https://dongho.me/no/such/path', false);

if (failures.length) {
  console.error(`검증 실패 ${failures.length}건:`);
  for (const f of failures.slice(0, 40)) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`검증 통과: ${map.length * 2 + 6}개 URL 모두 301`);
