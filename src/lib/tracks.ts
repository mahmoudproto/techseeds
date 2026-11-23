/**
 * The four tracks, split by age. This one file feeds the "tracks by age" tabs,
 * the age-to-track table, and each track's own page (/tracks/<slug>).
 *
 * Tool names stay in English (they are product names) and show as small tags.
 * Everything else is written in both languages.
 */

export type TrackSlug = 'programming' | 'gamedev' | 'ai' | 'cyber';
export type AgeBand = 'young' | 'middle' | 'teen';
type L = { ar: string; en: string };

export const AGE_BANDS: { id: AgeBand; label: L; range: string }[] = [
  { id: 'young', label: { ar: 'من 6 إلى 9 سنين', en: 'Ages 6 to 9' }, range: '6–9' },
  { id: 'middle', label: { ar: 'من 10 إلى 13 سنة', en: 'Ages 10 to 13' }, range: '10–13' },
  { id: 'teen', label: { ar: 'من 14 إلى 18 سنة', en: 'Ages 14 to 18' }, range: '14–18' },
];

export interface TrackLevel {
  /** Tools used at this age, shown as tags. */
  tools: string[];
  /** What the child learns and builds at this age. */
  text: L;
}

/** One of the three overlapping cards at the top of a track page. */
export type TrackCard =
  | { kind: 'art'; label: L } // the track illustration
  | { kind: 'photo'; label: L } // a real photo (media.ts trackPhotos)
  | { kind: 'project'; label: L; project?: ProjectShot; tint: 'blue' | 'green' | 'yellow' | 'mint' };

/** Screenshots of student work, by key in media.ts `projects`. */
export type ProjectShot =
  | 'spaceship' | 'ctf'
  | 'aiTeachable' | 'aiChatbot' | 'aiTaskify'
  | 'progScratch' | 'progMaze' | 'progThor' | 'progCodingame'
  | 'gameShield' | 'gamePink' | 'unityTruck' | 'unityAnimals' | 'unitySumo'
  | 'cyberNetwork';

/** One screenshot in a track page's "from our students' projects" gallery. */
export interface Shot {
  img: ProjectShot;
  caption: L;
}

export interface Instructor {
  name: L;
  /** e.g. '/media/instructor-george.webp' */
  photo: string;
  /** Only when a track has more than one instructor: the age bands this one teaches. */
  bands?: AgeBand[];
  /** For the Arabic label: مدرّبة instead of مدرّب. */
  female?: boolean;
}

const INSTRUCTORS = {
  george: { name: { ar: 'جورج عدلي', en: 'George Adly' }, photo: '/media/instructor-george.webp' },
  sarah: { name: { ar: 'سارة أشرف', en: 'Sarah Ashraf' }, photo: '/media/instructor-sarah.webp', female: true },
  mahmoud: { name: { ar: 'محمود كمال', en: 'Mahmoud Kamal' }, photo: '/media/instructor-mahmoud.webp' },
  shirien: { name: { ar: 'شيرين أشرف', en: 'Shirien Ashraf' }, photo: '/media/instructor-shirien.webp', female: true },
  nourhan: { name: { ar: 'نورهان عادل', en: 'Nourhan Adel' }, photo: '/media/instructor-nourhan.webp', female: true },
} satisfies Record<string, Instructor>;

export interface Track {
  slug: TrackSlug;
  name: L;
  /** One line for the card. */
  short: L;
  /** A short paragraph for the track page. */
  about: L;
  /** What the student walks away with. */
  builds: L;
  color: 'blue' | 'yellow' | 'green' | 'mint';
  /** Only the age bands this track is taught for. */
  levels: Partial<Record<AgeBand, TrackLevel>>;
  /** Example projects, shown on the track page. */
  projects: L[];
  /** The three overlapping cards on the track page, front card first. */
  cards: [TrackCard, TrackCard, TrackCard];
  /** Real screenshots of student projects in this track. */
  shots: Shot[];
  /** Who teaches the track; leave empty and a placeholder shows instead. */
  instructors?: Instructor[];
}

export const TRACKS: Track[] = [
  {
    slug: 'ai',
    instructors: [INSTRUCTORS.sarah],
    name: { ar: 'الذكاء الاصطناعي', en: 'Artificial Intelligence' },
    short: { ar: 'يستخدم أدوات الذكاء الاصطناعي صح، في مهام ومشاريع حقيقية.', en: 'Uses AI tools well, on real tasks and projects.' },
    about: {
      ar: 'الذكاء الاصطناعي أداة، والمهم إن الطفل يعرف يستخدمها صح وبأمان. نعلّمه يكتب طلبات واضحة، ويراجع النتيجة بعقله، ويستخدم الأدوات في مشاريع مفيدة.',
      en: 'AI is a tool, and what matters is using it well and safely. We teach children to ask clearly, check the answer with their own judgement, and use the tools on useful projects.',
    },
    builds: { ar: 'مستندات وصور وخطط ومواقع بالـ AI', en: 'Documents, images, plans and websites with AI' },
    color: 'green',
    levels: {
      young: { tools: ['AI'], text: { ar: 'أول تعارف مع الذكاء الاصطناعي بطريقة بسيطة وآمنة ومناسبة للسن.', en: 'A first, simple and safe introduction to AI, suited to their age.' } },
      middle: { tools: ['AI'], text: { ar: 'استخدام أدوات AI في مهام حقيقية زي الكتابة وإنشاء الصور والعروض وتنظيم الأفكار.', en: 'AI tools for real tasks: writing, images, presentations and organising ideas.' } },
      teen: { tools: ['AI'], text: { ar: 'مشاريع AI متقدمة: تخطيط مواقع ومشاريع كاملة ينفذها الطالب بنفسه بمساعدة أدوات الذكاء الاصطناعي.', en: 'Advanced AI projects: plans, websites and full projects the student leads.' } },
    },
    cards: [
      { kind: 'art', label: { ar: 'الذكاء الاصطناعي أداة', en: 'AI is a tool' } },
      { kind: 'photo', label: { ar: 'يستخدمه صح وبأمان', en: 'Used well and safely' } },
      { kind: 'project', label: { ar: 'مشروع: الكمبيوتر يميّز الصور', en: 'Project: teaching a computer to tell pictures apart' }, project: 'aiTeachable', tint: 'green' },
    ],
    shots: [
      { img: 'aiTeachable', caption: { ar: 'نموذج بيفرّق بين التفاح والموز في Teachable Machine', en: 'A model that tells apples from bananas, in Teachable Machine' } },
      { img: 'aiChatbot', caption: { ar: 'روبوت محادثة بيرد على الطالب', en: 'A chatbot robot that talks back' } },
      { img: 'aiTaskify', caption: { ar: 'تطبيق Taskify لتنظيم المهام، مبني بمساعدة الذكاء الاصطناعي', en: 'Taskify, a task app built with AI help' } },
    ],
    projects: [
      { ar: 'كتيّب أو عرض تقديمي معمول بأدوات AI', en: 'A booklet or presentation made with AI tools' },
      { ar: 'خطة مشروع كاملة', en: 'A complete project plan' },
      { ar: 'موقع بسيط مبني بمساعدة الذكاء الاصطناعي', en: 'A simple website built with AI help' },
    ],
  },
  {
    slug: 'programming',
    instructors: [{ ...INSTRUCTORS.george, bands: ['young', 'middle'] }, { ...INSTRUCTORS.shirien, bands: ['teen'] }],
    name: { ar: 'البرمجة', en: 'Programming' },
    short: { ar: 'يتعلم يفكر بخطوات مرتبة ويبني برامج شغالة بنفسه.', en: 'Learns to think in clear steps and builds working programs.' },
    about: {
      ar: 'نبدأ من البرمجة بالبلوكات للصغار، ونوصل للغات البرمجة الحقيقية مع الكبار. في كل شهر يبني الطالب برنامجًا يعمل فعلًا ويعرضه بنفسه.',
      en: 'Younger children start with block coding; older students move on to real programming languages. Every month ends with a working program the student presents.',
    },
    builds: { ar: 'برامج شغالة', en: 'Working programs' },
    color: 'blue',
    levels: {
      young: { tools: ['mBlock'], text: { ar: 'البرمجة بالبلوكات: الأوامر والتكرار والشروط من خلال قصص وألعاب بسيطة.', en: 'Block coding: commands, loops and conditions through simple stories and games.' } },
      middle: { tools: ['Python'], text: { ar: 'أول لغة برمجة حقيقية: المتغيرات والشروط والتكرار والدوال من خلال برامج صغيرة مفيدة.', en: 'A first real language: variables, conditions, loops and functions in small, useful programs.' } },
      teen: { tools: ['C#'], text: { ar: 'برمجة حقيقية بلغة ⁨C#⁩: حل تحديات وألعاب برمجية، والتفكير في بناء مشروع كامل من البداية للنهاية.', en: 'Real coding in C#: programming challenges and games, and planning a full project from start to finish.' } },
    },
    cards: [
      { kind: 'art', label: { ar: 'من البلوكات إلى الكود', en: 'From blocks to code' } },
      { kind: 'photo', label: { ar: 'برمجة حقيقية بأيديهم', en: 'Real coding, hands on' } },
      { kind: 'project', label: { ar: 'مشروع: متاهة الكنز بلغة Python', en: 'Project: a treasure maze in Python' }, project: 'progMaze', tint: 'blue' },
    ],
    shots: [
      { img: 'progScratch', caption: { ar: 'لعبة التقاط التفاح بالبلوكات في Scratch', en: 'An apple-catching game in Scratch blocks' } },
      { img: 'progMaze', caption: { ar: 'متاهة الكنز: الكود بيحرّك المستكشف لحد الكنز (Python)', en: 'Treasure maze: code moves the explorer to the treasure (Python)' } },
      { img: 'progThor', caption: { ar: 'تحدي Power of Thor على CodinGame بلغة ⁨C#⁩', en: 'The Power of Thor challenge on CodinGame, in C#' } },
      { img: 'progCodingame', caption: { ar: 'سفينة بتختار أقرب عدو تضربه، بلغة ⁨C#⁩', en: 'A ship that picks the nearest enemy to shoot, in C#' } },
    ],
    projects: [
      { ar: 'قصة أو لعبة تفاعلية بالبلوكات', en: 'An interactive story or game in blocks' },
      { ar: 'آلة حاسبة أو اختبار قصير بلغة Python', en: 'A calculator or short quiz in Python' },
      { ar: 'تحديات برمجة وألعاب بلغة ⁨C#⁩ على CodinGame', en: 'Coding challenges and games in C# on CodinGame' },
    ],
  },
  {
    slug: 'cyber',
    instructors: [INSTRUCTORS.nourhan],
    name: { ar: 'الأمن السيبراني', en: 'Cybersecurity' },
    short: { ar: 'يتعلم يحمي نفسه وأجهزته، ويحل تحديات الأمان.', en: 'Learns to protect themselves and their devices, and solves security challenges.' },
    about: {
      ar: 'نبدأ بالأمان على الإنترنت وحماية الحسابات، ونوصل لأدوات الأمان الحقيقية وتحديات CTF في معامل تدريب آمنة.',
      en: 'We start with staying safe online and protecting accounts, then move to real security tools and CTF challenges in safe practice labs.',
    },
    builds: { ar: 'أدوات أمان وتحديات CTF', en: 'Security tools and CTF challenges' },
    color: 'mint',
    levels: {
      middle: { tools: ['Google Interland', 'CyberChef', 'Scratch'], text: { ar: 'التعرّف على الأمان على الإنترنت، وحماية الحسابات، وكلمات السر القوية، وأساسيات التشفير بطريقة عملية.', en: 'Online safety, strong passwords and the basics of encryption, hands-on and fun.' } },
      teen: { tools: ['Python', 'Linux', 'Wireshark', 'TryHackMe', 'picoCTF'], text: { ar: 'أدوات أمان باستخدام Python، وأساسيات الشبكات وLinux، وتحديات CTF في معامل تدريب آمنة.', en: 'Security tools in Python, networking and Linux basics, and CTF challenges in safe labs.' } },
    },
    cards: [
      { kind: 'project', label: { ar: 'مشروع: محاكاة شبكة وجهاز دخيل', en: 'Project: a network and a rogue device' }, project: 'cyberNetwork', tint: 'mint' },
      { kind: 'art', label: { ar: 'يحمي نفسه وأجهزته', en: 'Protecting themselves and their devices' } },
      { kind: 'photo', label: { ar: 'أدوات أمان حقيقية', en: 'Real security tools' } },
    ],
    shots: [
      { img: 'cyberNetwork', caption: { ar: 'شبكة لأقسام شركة في Cisco Packet Tracer، والطالب بيتتبع جهاز دخيل', en: 'A company network in Cisco Packet Tracer, tracing a rogue device' } },
    ],
    projects: [
      { ar: 'تطبيق تشفير للرسائل', en: 'A message encryption app' },
      { ar: 'فاحص قوة كلمة السر', en: 'A password strength checker' },
      { ar: 'حل تحديات CTF', en: 'Solving CTF challenges' },
    ],
  },
  {
    slug: 'gamedev',
    instructors: [INSTRUCTORS.mahmoud],
    name: { ar: 'تطوير الألعاب', en: 'Game Development' },
    short: { ar: 'يصمم ألعابه الخاصة، ويفهم إزاي اللعبة بتتبني من جوه.', en: 'Designs their own games and learns how games work inside.' },
    about: {
      ar: 'الطالب يتحول من لاعب إلى صانع ألعاب. يتعلم أساسيات البرمجة من خلال بناء لعبة حقيقية خطوة بخطوة، ويتعلم كمان أفكار تصميم الألعاب: إزاي نخلي اللعبة ممتعة وعادلة.',
      en: 'Students go from playing games to making them. They learn programming basics by building a real game step by step, and the ideas behind good game design: how to make a game fun and fair.',
    },
    builds: { ar: 'ألعابه الخاصة', en: 'Their own games' },
    color: 'yellow',
    levels: {
      middle: { tools: ['GameMaker'], text: { ar: 'بناء لعبة باستخدام البلوكات المرئية، مع الحركة والتصادم والنقاط والأرواح، ثم إضافة العشوائية وزيادة الصعوبة.', en: 'A full game with visual code blocks: movement, collisions, score and lives, then randomness and rising difficulty.' } },
      teen: { tools: ['Unity'], text: { ar: 'تطوير ألعاب باستخدام محرك احترافي، وبناء مشاهد وشخصيات وتجربة لعب متكاملة.', en: 'Games in a professional engine, with scenes, characters and a complete play experience.' } },
    },
    cards: [
      { kind: 'project', label: { ar: 'مشروع: لعبة سفينة الفضاء', en: 'Project: the spaceship game' }, project: 'gameShield', tint: 'yellow' },
      { kind: 'art', label: { ar: 'من لاعب إلى صانع ألعاب', en: 'From player to game maker' } },
      { kind: 'photo', label: { ar: 'يجرب لعبته بنفسه', en: 'Playtesting their own game' } },
    ],
    shots: [
      { img: 'gameShield', caption: { ar: 'سفينة بدرع حماية، وكويكبات، و3 أرواح في GameMaker', en: 'A ship with a shield, asteroids and 3 lives, in GameMaker' } },
      { img: 'gamePink', caption: { ar: 'نفس اللعبة بتصميم طالبة تانية: سفينة وردية و4 أرواح', en: 'The same game, designed by another student: a pink ship and 4 lives' } },
      { img: 'unityTruck', caption: { ar: 'شاحنة بتخبط في صناديق بفيزياء حقيقية (Unity)', en: 'A truck crashing into crates with real physics (Unity)' } },
      { img: 'unityAnimals', caption: { ar: 'لعبة إطعام الحيوانات: كل حيوان ياكل يزوّد النقط (Unity)', en: 'Feed the animals: every fed animal adds to the score (Unity)' } },
      { img: 'unitySumo', caption: { ar: 'كورة بتزق الكور التانية برّه المنصة بقوة خاصة (Unity)', en: 'A ball that knocks the others off the platform with a power-up (Unity)' } },
    ],
    projects: [
      { ar: 'لعبة سفينة فضاء تطلق الليزر على الكويكبات', en: 'A spaceship game that shoots lasers at asteroids' },
      { ar: 'قوة خاصة (Power-up) يصممها كل طالب للعبته', en: 'A power-up each student designs for their game' },
      { ar: 'لعبة كاملة بمحرك Unity', en: 'A complete game in Unity' },
    ],
  },
];

export function getTrack(slug: string) {
  return TRACKS.find((t) => t.slug === slug);
}
