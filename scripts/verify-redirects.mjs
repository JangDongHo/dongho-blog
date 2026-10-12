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

// 끝 슬래시 경로는 (슬래시 제거 308 → 규칙 301)처럼 여러 번 이동한다. 최종 목적지만 확인한다.
async function expectChain(pathname, expectedFinal) {
  let url = base + pathname;
  for (let hop = 0; hop < 4; hop++) {
    const res = await fetch(url, { redirect: 'manual' });
    const location = res.headers.get('location');
    if (res.status < 300 || res.status >= 400) {
      if (url !== expectedFinal) failures.push(`${pathname}: 최종 ${url} (기대 ${expectedFinal})`);
      else if (res.status !== 200) failures.push(`${pathname}: 목적지 상태 ${res.status}`);
      return;
    }
    if (!location) { failures.push(`${pathname}: ${res.status}인데 Location 없음`); return; }
    url = new URL(location, url).toString();
  }
  failures.push(`${pathname}: 이동이 4번을 넘음 (마지막 ${url})`);
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

// 끝 슬래시 변형
await expectChain('/about/', 'https://dongho.me/about');
await expectChain('/feed.xml/', 'https://dongho.me/feed.xml');
await expectChain('/posts/', 'https://dongho.me/posts');
await expectChain(`/posts/${map[0].notionId.toLowerCase()}/`, `https://dongho.me/posts/${map[0].encodedSlug}`);

if (failures.length) {
  console.error(`검증 실패 ${failures.length}건:`);
  for (const f of failures.slice(0, 40)) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`검증 통과: ${map.length * 2 + 6 + 4}개 URL 확인`);
