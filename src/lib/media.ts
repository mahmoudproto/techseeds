/**
 * Every photo on the site, in one place.
 *
 * These are free stock photos from Pexels (https://www.pexels.com/license/), used
 * as placeholders until the marketing team sends real class photos and videos.
 * To swap one: put the new image in /public/media/ and change its `src` here to
 * '/media/your-file.webp'. Nothing else needs to change.
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

export const MEDIA = {
  hero: {
    src: pexels(5212687, 1400),
    alt: { ar: 'طلاب يعملون معًا على أجهزة اللابتوب ومعهم المدرّب', en: 'Students working together on laptops with their instructor' },
    credit: 'Max Fischer / Pexels',
  },
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
  tracks: {
    programming: {
      src: pexels(5474295, 900),
      alt: { ar: 'يدان تكتبان كودًا على لابتوب', en: 'Hands writing code on a laptop' },
      credit: 'Pexels',
    },
    gamedev: {
      src: pexels(8762884, 900),
      alt: { ar: 'يدان تمسكان ذراع تحكم في لعبة', en: 'Hands holding a game controller' },
      credit: 'Kevin Malik / Pexels',
    },
    ai: {
      src: pexels(8566458, 900),
      alt: { ar: 'روبوت صغير على لوحة مفاتيح لابتوب', en: 'A small robot sitting on a laptop keyboard' },
      credit: 'Kindel Media / Pexels',
    },
    cyber: {
      src: pexels(211151, 900),
      alt: { ar: 'علامة تحذير صغيرة على لوحة مفاتيح، رمز لأمن البيانات', en: 'A small warning cone on a keyboard, a symbol of data security' },
      credit: 'Fernando Arcos / Pexels',
    },
  },
} satisfies Record<string, Photo | Record<string, Photo>>;
