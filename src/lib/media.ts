/**
 * Every photo on the site, in one place.
 *
 * To swap one: put the new image in /public/media/ and change its `src` here to
 * '/media/your-file.webp'. Nothing else needs to change. The few Pexels stock
 * photos left (https://www.pexels.com/license/) are placeholders.
 *
 * Track images show hands, screens and objects on purpose: no single boy or girl
 * and no particular age, so no parent reads a track as "not for my child".
 */

export interface Photo {
  src: string;
  alt: { ar: string; en: string };
  /** Who took it, for the credit line. Remove once the photo is our own. */
  credit?: string;
}

/** Pexels serves resized, compressed copies (WebP where the browser supports it). */
function pexels(id: number, width = 1200) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

/** Images made for TechSeeds (from the Grok website mock-ups), served from /public/media. */
function local(name: string) {
  return `/media/${name}.webp`;
}

export const MEDIA = {
  hero: {
    src: local('hero-class'),
    alt: { ar: 'مدرّبة تك سيدز تشرح لثلاثة طلاب أمام لابتوب', en: 'A TechSeeds instructor helping three students at a laptop' },
  },
  // Still stock: no TechSeeds images for these yet.
  why: {
    src: pexels(10638115, 900),
    alt: { ar: 'فصل فيه طلاب يتعلمون على أجهزة الكمبيوتر', en: 'A class of students learning on computers' },
    credit: 'Ron Lach / Pexels',
  },
  team: {
    src: pexels(5212695, 1200),
    alt: { ar: 'مدرّب يتابع طلابه وهم يعملون على مشروعهم', en: 'An instructor guiding students through their project' },
    credit: 'Max Fischer / Pexels',
  },
  finalCta: {
    src: pexels(5212700, 1400),
    alt: { ar: 'طلاب ومعلمتهم يصفقون احتفالًا في الفصل', en: 'Students and their teacher clapping to celebrate in class' },
    credit: 'Max Fischer / Pexels',
  },
  // Track art shows objects, not a particular child. The illustrated versions with a
  // child (track-programming-3d, track-ai-3d) are in /public/media if you prefer them.
  tracks: {
    programming: {
      src: local('track-programming'),
      alt: { ar: 'بلوكات برمجة ملونة', en: 'Colourful coding blocks' },
    },
    gamedev: {
      src: local('track-gamedev'),
      alt: { ar: 'لابتوب عليه لعبة فضاء وبجانبه ذراع تحكم وصاروخ', en: 'A laptop showing a space game, with a controller and a rocket' },
    },
    ai: {
      src: local('track-ai'),
      alt: { ar: 'روبوت مبتسم', en: 'A smiling robot' },
    },
    cyber: {
      src: local('track-cyber'),
      alt: { ar: 'درع حماية وقفل ولابتوب', en: 'A security shield, padlocks and a laptop' },
    },
  },
  // Real photos of hands and objects for the track page cards (no particular child).
  trackPhotos: {
    programming: {
      src: pexels(5474295, 700),
      alt: { ar: 'يدان تكتبان كودًا على لابتوب', en: 'Hands writing code on a laptop' },
      credit: 'Pexels',
    },
    gamedev: {
      src: pexels(8762884, 700),
      alt: { ar: 'يدان تمسكان ذراع تحكم في لعبة', en: 'Hands holding a game controller' },
      credit: 'Kevin Malik / Pexels',
    },
    ai: {
      src: pexels(8566458, 700),
      alt: { ar: 'روبوت صغير على لوحة مفاتيح لابتوب', en: 'A small robot on a laptop keyboard' },
      credit: 'Kindel Media / Pexels',
    },
    cyber: {
      src: pexels(211151, 700),
      alt: { ar: 'علامة تحذير صغيرة على لوحة مفاتيح', en: 'A small warning cone on a keyboard' },
      credit: 'Fernando Arcos / Pexels',
    },
  },
  projects: {
    spaceship: {
      src: local('project-spaceship'),
      alt: { ar: 'لعبة سفينة فضاء تطلق الليزر على الكويكبات', en: 'A spaceship game firing lasers at asteroids' },
    },
    ctf: {
      src: local('project-ctf'),
      alt: { ar: 'درع أمان وعلم تحدي CTF', en: 'A security shield and a CTF flag' },
    },
  },
} satisfies Record<string, Photo | Record<string, Photo>>;
