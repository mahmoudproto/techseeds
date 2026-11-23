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
    src: local('team-standing-v2'),
    alt: { ar: 'فريق تدريس تك سيدز', en: 'The TechSeeds teaching team' },
  },
  // Still stock: no TechSeeds photo for this yet.
  finalCta: {
    src: pexels(5212700, 1400),
    alt: { ar: 'طلاب ومعلمتهم يصفقون احتفالًا في الفصل', en: 'Students and their teacher clapping to celebrate in class' },
    credit: 'Max Fischer / Pexels',
  },
  // One 3D style for all four tracks (Shirien's redesign): objects and characters,
  // not a particular child. The older flat pictures are still in /public/media.
  tracks: {
    programming: {
      src: local('track-programming-v3'),
      alt: { ar: 'لابتوب عليه كود وشاشتين حواليه في رسم ثلاثي الأبعاد', en: 'A 3D laptop showing code, connected to two screens' },
    },
    gamedev: {
      src: local('track-gamedev-v2'),
      alt: { ar: 'شاشة لعبة فضاء يخرج منها صاروخ نحو كويكب', en: 'A rocket flying out of a space-game screen towards an asteroid' },
    },
    ai: {
      src: local('track-ai-v4'),
      alt: { ar: 'روبوت يمسك عقل مضيء وحواليه روبوتات وشاشات ذكاء اصطناعي', en: 'A robot holding a glowing brain, surrounded by smaller robots and AI screens' },
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
  // Real student work (screenshots), and two drawings kept for older cards.
  projects: {
    spaceship: {
      src: local('project-spaceship'),
      alt: { ar: 'لعبة سفينة فضاء تطلق الليزر على الكويكبات', en: 'A spaceship game firing lasers at asteroids' },
    },
    ctf: {
      src: local('project-ctf'),
      alt: { ar: 'درع أمان وعلم تحدي CTF', en: 'A security shield and a CTF flag' },
    },
    aiTeachable: {
      src: local('project-ai-teachable'),
      alt: { ar: 'نموذج في Teachable Machine بيفرّق بين صور التفاح والموز', en: 'A Teachable Machine model telling apples from bananas' },
    },
    aiChatbot: {
      src: local('project-ai-chatbot'),
      alt: { ar: 'روبوت محادثة بيطلب من الطالب يقول أهلًا', en: 'A chatbot robot asking the student to say hello' },
    },
    aiTaskify: {
      src: local('project-ai-taskify'),
      alt: { ar: 'تطبيق Taskify لتنظيم المهام بالعربي', en: 'Taskify, an Arabic task-planning app' },
    },
    progScratch: {
      src: local('project-prog-scratch'),
      alt: { ar: 'لعبة التقاط التفاح في Scratch بالبلوكات', en: 'An apple-catching game in Scratch blocks' },
    },
    progMaze: {
      src: local('project-prog-maze'),
      alt: { ar: 'لعبة متاهة الكنز مكتوبة بلغة Python', en: 'A treasure maze game written in Python' },
    },
    progThor: {
      src: local('project-prog-thor'),
      alt: { ar: 'تحدي Power of Thor على CodinGame', en: 'The Power of Thor challenge on CodinGame' },
    },
    progCodingame: {
      src: local('project-prog-codingame'),
      alt: { ar: 'تحدي سفينة الفضاء على CodinGame', en: 'The spaceship onboarding challenge on CodinGame' },
    },
    gameShield: {
      src: local('project-game-shield'),
      alt: { ar: 'لعبة سفينة فضاء في GameMaker مع درع حماية', en: 'A GameMaker spaceship game with a shield' },
    },
    gamePink: {
      src: local('project-game-pink'),
      alt: { ar: 'لعبة سفينة فضاء وردية في GameMaker', en: 'A pink spaceship game in GameMaker' },
    },
    unityTruck: {
      src: local('project-unity-truck'),
      alt: { ar: 'شاحنة حمراء بتخبط في صناديق خشب في Unity', en: 'A red truck crashing into wooden crates in Unity' },
    },
    unityAnimals: {
      src: local('project-unity-animals'),
      alt: { ar: 'لعبة إطعام الحيوانات من فوق في Unity', en: 'A top-down animal feeding game in Unity' },
    },
    unitySumo: {
      src: local('project-unity-sumo'),
      alt: { ar: 'كورة سودا بتزق كور بيضا على منصة في Unity', en: 'A black ball pushing white balls on a platform in Unity' },
    },
    cyberNetwork: {
      src: local('project-cyber-network'),
      alt: { ar: 'محاكاة شبكة شركة في Cisco Packet Tracer مع جهاز دخيل', en: 'A company network in Cisco Packet Tracer with a rogue device' },
    },
  },
} satisfies Record<string, Photo | Record<string, Photo>>;
