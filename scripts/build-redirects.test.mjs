import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildRedirects, buildConfig, MAX_REDIRECTS } from './build-redirects.mjs';

const map = [
  { notionId: '1595ca9b-265e-80ab-8497-d0b44d347777', encodedSlug: encodeURIComponent('레디스-센티넬') },
];

test('글마다 하이픈 있는/없는 UUID 두 규칙을 301로 생성', () => {
  const rules = buildRedirects(map);
  const dest = `https://dongho.me/posts/${encodeURIComponent('레디스-센티넬')}`;
  assert.deepEqual(rules.slice(0, 2), [
    { source: '/posts/1595ca9b-265e-80ab-8497-d0b44d347777', destination: dest, statusCode: 301 },
    { source: '/posts/1595ca9b265e80ab8497d0b44d347777', destination: dest, statusCode: 301 },
  ]);
});

test('UUID는 소문자로 정규화', () => {
  const rules = buildRedirects([{ notionId: 'ABCDEF12-0000-0000-0000-000000000000', encodedSlug: 'x' }]);
  assert.equal(rules[0].source, '/posts/abcdef12-0000-0000-0000-000000000000');
});

test('개별 글 규칙 뒤에 /, /posts, /posts/:path*, 전체 catch-all 순서', () => {
  const rules = buildRedirects(map);
  assert.deepEqual(rules.slice(2), [
    // Vercel에서 `/:path*`는 루트(/)를 매칭하지 않으므로 명시적으로 둔다.
    { source: '/', destination: 'https://dongho.me/', statusCode: 301 },
    { source: '/posts', destination: 'https://dongho.me/posts', statusCode: 301 },
    { source: '/posts/:path*', destination: 'https://dongho.me/', statusCode: 301 },
    { source: '/:path*', destination: 'https://dongho.me/:path*', statusCode: 301 },
  ]);
});

test('모든 규칙은 statusCode 301이고 permanent를 쓰지 않는다', () => {
  for (const r of buildRedirects(map)) {
    assert.equal(r.statusCode, 301);
    assert.equal('permanent' in r, false);
  }
});

test('규칙 수가 한도를 넘으면 오류', () => {
  const big = Array.from({ length: MAX_REDIRECTS }, (_, i) => ({
    notionId: `00000000-0000-0000-0000-${String(i).padStart(12, '0')}`,
    encodedSlug: `s${i}`,
  }));
  assert.throws(() => buildRedirects(big), /2048/);
});

test('buildConfig: 끝 슬래시 경로는 슬래시를 뗀 뒤 규칙을 타도록 trailingSlash=false', () => {
  const config = buildConfig(map);
  assert.equal(config.trailingSlash, false);
  assert.equal(config.framework, null);
  assert.equal(config.outputDirectory, 'public');
  assert.deepEqual(config.redirects, buildRedirects(map));
});
