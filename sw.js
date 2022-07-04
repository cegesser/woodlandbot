const staticDevCoffee = 'woodland-static-v1'
const assets = [
    './',
    './index.html',
    './main.js',
    './manifest.json',
    './messages.json',
    './messages.js',
    './faction.js',
    './cats.js',
    './eyrie.js',
    './alliance.js',
    './vagabot.js',
    './lizards.js',
    './riverfolk.js',
    './duchy.js',
    './null-faction.js',
    './styles.css',
    './sw.js',
    './images/vp.png',
    './images/bird.png',
    './images/bunny.png',
    './images/fox.png',
    './images/mouse.png',
    './images/cats.png',
    './images/eyrie.png',
    './images/alliance.png',
    './images/vagabot.png',
    './images/lizards.png',
    './images/riverfolk.png',
    './images/duchy.png',
    './images/conspiracy.png',
    './images/icon-72x72.png',
    './images/riverfolk-shield.png',
    './images/riverfolk-sword.png',
    './images/corvid-bomb.png',
    './images/corvid-raid.png',
    './images/corvid-extorsion.png',
    './images/corvid-snare.png',
    './images/crown.png',
    './font/Baskerville.ttf',
    './font/Luminari-Regular.ttf',

]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})
