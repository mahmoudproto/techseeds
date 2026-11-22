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
  // Drawn TechSeeds-style class scene from Shirien's redesign (cropped from her mock-up
  // until the full-size file arrives). Replace with a real class photo when there is one.
  why: {
    src: local('why-class'),
    alt: { ar: 'مدرّب يساعد أطفالًا في تيشيرتات تك سيدز أمام اللابتوب', en: 'An instructor helping children in TechSeeds T-shirts at their laptops' },
  },
  // Our teaching team (photos taken 21 Nov 2026; only the background was replaced).
  team: {
    src: local('team-standing'),
    alt: { ar: 'فريق تدريس تك سيدز', en: 'The TechSeeds teaching team' },
  },
  finalCta: {
    src: local('team-sitting'),
    alt: { ar: 'فريق تدريس تك سيدز حول طاولة عليها لابتوبات', en: 'The TechSeeds teaching team around a table with laptops' },
  },
  /** One portrait per instructor, in the order they appear on the page. */
  instructors: [
    { src: local('instructor-mahmoud'), name: { ar: 'محمود كمال', en: 'Mahmoud Kamal' } },
    { src: local('instructor-george'), name: { ar: 'جورج عدلي', en: 'George Adly' } },
    { src: local('instructor-nourhan'), name: { ar: 'نورهان عادل', en: 'Nourhan Adel' } },
    { src: local('instructor-sarah'), name: { ar: 'سارة أشرف', en: 'Sarah Ashraf' } },
    { src: local('instructor-shirien'), name: { ar: 'شيرين أشرف', en: 'Shirien Ashraf' } },
  ],
  // One 3D style for all four tracks (Shirien's redesign): objects and characters,
  // not a particular child. The older flat pictures are still in /public/media.
  tracks: {
    programming: {
      src: local('track-programming-v2'),
      alt: { ar: 'ثعبان بايثون مبتسم ملفوف حول بلوكات برمجة', en: 'A smiling Python snake wrapped around coding blocks' },
    },
    gamedev: {
      src: local('track-gamedev-v2'),
      alt: { ar: 'شاشة لعبة فضاء يخرج منها صاروخ نحو كويكب', en: 'A rocket flying out of a space-game screen towards an asteroid' },
    },
    ai: {
      src: local('track-ai-v2'),
      alt: { ar: 'روبوت بنفسجي صغير يمسك تابلت وفوقه لمبة', en: 'A small purple robot holding a tablet under a light bulb' },
    },
    cyber: {
      src: local('track-cyber-v2'),
      alt: { ar: 'درع أمان عليه قفل', en: 'A security shield with a padlock' },
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
} satisfies Record<string, Photo | Record<string, Photo> | { src: string; name: { ar: string; en: string } }[]>;
