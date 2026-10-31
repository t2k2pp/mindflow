/**
 * MindFlow Studio - Service Worker
 * Supports: Offline capability, Fast caching, and Seamless background updates
 */

const CACHE_NAME = 'mindflow-cache-v1.0.2';

// プリキャッシュ対象アセット
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.5.0/lz-string.min.js'
];

// 1. インストール時: アセットのプリキャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('Pre-cache partial failure:', err);
      });
    })
  );
  // 新しいSWが待機中にならず即座にアクティブ化を促す準備
});

// 2. アクティベーション時: 古いキャッシュの削除
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('Clearing old cache:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. フェッチ時: HTMLはNetwork-First（最新優先）、その他はStale-While-Revalidate
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // POSTや拡張機能のリクエストはスキップ
  if (req.method !== 'GET' || !url.protocol.startsWith('http')) return;

  // HTMLナビゲーションリクエスト: Network-First（オンライン時は最新版を即座に取得、オフライン時のみキャッシュ）
  if (req.mode === 'navigate' || req.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(req).then((networkRes) => {
        if (networkRes && networkRes.status === 200) {
          const resClone = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
        }
        return networkRes;
      }).catch(() => {
        return caches.match(req).then((cached) => cached || caches.match('./index.html'));
      })
    );
    return;
  }

  // 静的アセット: Stale-While-Revalidate（キャッシュを即返ししつつバックグラウンドで更新）
  event.respondWith(
    caches.match(req).then((cachedRes) => {
      const fetchPromise = fetch(req).then((networkRes) => {
        if (networkRes && networkRes.status === 200) {
          const resClone = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
        }
        return networkRes;
      }).catch(() => null);

      return cachedRes || fetchPromise;
    })
  );
});

// 4. クライアントからの更新メッセージ受付
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
