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

/** One level (one month) of a track's journey, from the track documents. */
export interface JourneyLevel {
  title: L;
  /** What the level covers. */
  text: L;
  /** The level's final project. */
  project: L;
}

/** The level-by-level plan for one chapter of an age band. */
export interface Journey {
  /** e.g. "Python" or "Chapter 1: Space Shooter"; shown after the age label. */
  heading: L;
  /** What a child needs before starting this chapter. */
  prereq?: L;
  levels: JourneyLevel[];
  /** A note under the levels (what comes next, privacy rules...). */
  note?: L;
}

export interface Instructor {
  name: L;
  /** e.g. '/media/instructor-george.webp' */
  photo: string;
  /** Where they work or what they do, shown under the name. */
  role: L;
  /** For the Arabic label: مدرّبة instead of مدرّب. */
  female?: boolean;
}

const INSTRUCTORS = {
  george: { name: { ar: 'جورج عدلي', en: 'George Adly' }, role: { ar: 'مطوّر Full Stack', en: 'Full stack developer' }, photo: '/media/instructor-george.webp' },
  sarah: { name: { ar: 'سارة أشرف', en: 'Sarah Ashraf' }, role: { ar: 'مساعدة تدريس في الأكاديمية العربية', en: 'Teaching assistant at the Arab Academy' }, photo: '/media/instructor-sarah.webp', female: true },
  mahmoud: { name: { ar: 'محمود كمال', en: 'Mahmoud Kamal' }, role: { ar: 'مطوّر ألعاب في Sega UK', en: 'Game developer at Sega UK' }, photo: '/media/instructor-mahmoud.webp' },
  shirien: { name: { ar: 'شيرين أشرف', en: 'Shirien Ashraf' }, role: { ar: 'مطوّرة برمجيات في ExpertX USA', en: 'Software developer at ExpertX USA' }, photo: '/media/instructor-shirien.webp', female: true },
  nourhan: { name: { ar: 'نورهان عادل', en: 'Nourhan Adel' }, role: { ar: 'متخصصة في الأمن السيبراني', en: 'Cyber security specialist' }, photo: '/media/instructor-nourhan.webp', female: true },
} satisfies Record<string, Instructor>;

export interface Track {
  slug: TrackSlug;
  name: L;
  /** One line for the card. */
  short: L;
  /** The track's one-line promise, shown under its name on the track page. */
  about: L;
  /** What the student walks away with. */
  builds: L;
  color: 'blue' | 'yellow' | 'green' | 'mint';
  /** Only the age bands this track is taught for. */
  levels: Partial<Record<AgeBand, TrackLevel>>;
  /** "What your child gains", from the track document. */
  gains: L[];
  /** The level-by-level journey, for the age bands that have one written up. */
  journey: Partial<Record<AgeBand, Journey[]>>;
  /** Replaces the general "sessions 1–3 / 4 / 5–6" line in "How we teach" when a track's levels run differently. */
  rhythm?: L;
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
    instructors: [INSTRUCTORS.shirien, INSTRUCTORS.sarah],
    name: { ar: 'الذكاء الاصطناعي', en: 'Artificial Intelligence' },
    short: { ar: 'يستخدم أدوات الذكاء الاصطناعي صح، في مهام ومشاريع حقيقية.', en: 'Uses AI tools well, on real tasks and projects.' },
    about: {
      ar: 'أطفال فاهمين الذكاء الاصطناعي، بيستخدموه في شغل حقيقي، وعارفين إمتى إجابته تبقى غلط.',
      en: 'Children who understand AI, use it for real work, and know when its answer is wrong.',
    },
    builds: { ar: 'مستندات وصور وخطط ومواقع بالـ AI', en: 'Documents, images, plans and websites with AI' },
    color: 'green',
    levels: {
      young: { tools: ['AI'], text: { ar: 'أول تعارف مع الذكاء الاصطناعي بطريقة بسيطة وآمنة ومناسبة للسن.', en: 'A first, simple and safe introduction to AI, suited to their age.' } },
      middle: { tools: ['Teachable Machine', 'PictoBlox', 'Gemini', 'Nano Banana', 'Lovable'], text: { ar: 'أدوات AI لمهام حقيقية: يعلّم الكمبيوتر بنفسه، ويكتب Prompts واضحة ويراجع إجاباتها، ويعمل قصة مصوّرة وموقع بالـ AI.', en: 'AI tools for real tasks: teaching the computer themselves, writing clear prompts and checking the answers, and making an illustrated story and a website with AI.' } },
      teen: { tools: ['AI'], text: { ar: 'مشاريع AI متقدمة: مشاريع أعمق بأدوات ونماذج AI، حوالين مشاكل حقيقية.', en: 'Advanced AI projects: deeper projects with AI tools and models, built around real problems.' } },
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
    gains: [
      { ar: 'يستخدم الكمبيوتر بثقة وينظم شغله في Google Drive', en: 'Use the computer with confidence and keep their work organised in Google Drive' },
      { ar: 'يدرّب نماذج صور وأصوات بنفسه، ويعرف هي بتغلط مع مين وليه', en: 'Train their own image and sound models, and know who they fail for and why' },
      { ar: 'يكتب أوامر (Prompts) واضحة ويحسّنها خطوة بخطوة', en: 'Write clear prompts and improve them step by step' },
      { ar: 'يراجع إجابة الـ AI ويعرف إمتى تكون غلط', en: 'Check AI answers and spot when they are wrong' },
      { ar: 'يحافظ على خصوصيته، ويستخدم الـ AI علشان يفهم مش علشان يغش', en: 'Protect their privacy and use AI to understand, not to cheat' },
    ],
    rhythm: { ar: 'السيشنز من 1 لـ 3 مهارات جديدة بمثال وتمرين موجّه، والرابعة تخطيط المشروع، والخامسة بناؤه مع مراجعة من المدرّب، والسادسة يوم العرض', en: 'Sessions 1–3 bring new skills with a worked example and guided practice, session 4 plans the project, session 5 builds it with a check from the instructor, and session 6 is Demo Day' },
    journey: {
      middle: [
        {
          heading: { ar: 'أدوات AI لمهام حقيقية', en: 'AI tools for real tasks' },
          levels: [
            {
              title: { ar: 'علّم الآلة', en: 'Teach the machine' },
              text: { ar: 'الكمبيوتر بيشتغل إزاي وتنظيم الشغل في Google Drive، والـ AI بيتعلم من الأمثلة: تدريب نموذج صور في Teachable Machine واختباره على ناس مختلفة (وليه بيغلط مع بعضهم)، والبرمجة بالبلوكات في PictoBlox مع كشف الوش والإيد.', en: 'How computers work and keeping work organised in Google Drive; how AI learns from examples: training an image model in Teachable Machine and testing it on different people (and why it fails for some); block coding in PictoBlox with face and hand detection.' },
              project: { ar: 'لعبة بتتفاعل مع تعبيرات وش اللاعب (أو حركات إيده) في PictoBlox، والطفل بيختار فكرتها.', en: 'A game in PictoBlox that reacts to the player\'s facial expressions (or hand gestures), on a theme the child chooses.' },
            },
            {
              title: { ar: 'حكّائين بالـ AI', en: 'AI storytellers' },
              text: { ar: 'نموذج أصوات بيحرّك شخصية، والـ Chatbots بتكتب إزاي، ووصفة الـ Prompt الواضح (الدور والمهمة والتفاصيل والشكل)، وكشف أخطاء الـ AI والتأكد منها في كتاب أو موقع معروف، مع NotebookLM و Nano Banana.', en: 'A sound model that controls a character; how chatbots write; the clear-prompt recipe (role, task, details, format); catching AI mistakes and checking them in a book or a named website; NotebookLM and Nano Banana.' },
              project: { ar: 'قصة كوميكس أو مانجا من 6 مربعات على الأقل: القصة والحوار من تأليف الطفل، والصور بـ Nano Banana.', en: 'A comic or manga story of at least six panels: the story and dialogue are the child\'s own, the pictures are made with Nano Banana.' },
            },
            {
              title: { ar: 'ابنِ بالـ AI', en: 'Build with AI' },
              text: { ar: 'أجزاء المواقع، والتخطيط قبل الـ Prompt، وتغيير حاجة واحدة في كل مرة، وإصلاح المشاكل بالـ Prompts، واختبار الموقع مع مستخدمين حقيقيين، على Lovable (Vibe coding).', en: 'The parts of a website, planning before prompting, one change at a time, fixing problems by prompting and testing with real users, in Lovable (vibe coding).' },
              project: { ar: 'موقع منشور على Lovable لشخص حقيقي الطفل بيعمل معاه مقابلة، والأهل بيفتحوه على الموبايل يوم العرض.', en: 'A published Lovable website for a real person the child interviews, opened by parents on their phones at Demo Day.' },
            },
          ],
          note: { ar: 'في المستوى الأول مفيش Chatbots: الطفل بيعلّم الكمبيوتر بنفسه. وبعد كده الأفكار والكلام من تأليف الطفل، والـ AI بيساعد في الصور والكود. الحسابات ملك الأكاديمية وفيه شخص كبير مسجّل الدخول، ومن أول يوم: لا أسماء كاملة ولا عناوين ولا صور ولا تفاصيل عائلية في أي أداة AI، ونماذج الوش بس بموافقة الأهل.', en: 'No chatbots in Level 1: children teach the computer themselves. After that the ideas and words are the child\'s own, and AI helps with pictures and code. Accounts belong to the academy with an adult signed in, and from day one: no full names, addresses, photos or family details in any AI tool, and face models only with the parents\' consent.' },
        },
      ],
    },
  },
  {
    slug: 'programming',
    instructors: [INSTRUCTORS.shirien, INSTRUCTORS.george, INSTRUCTORS.sarah],
    name: { ar: 'البرمجة', en: 'Programming' },
    short: { ar: 'يتعلم يفكر بخطوات مرتبة ويبني برامج شغالة بنفسه.', en: 'Learns to think in clear steps and builds working programs.' },
    about: {
      ar: 'من استخدام التطبيقات لبنائها. البرمجة طريقة تفكير، مش كود منقول من فيديو.',
      en: 'From using apps to building them. Programming is a way of thinking, not code copied from a video.',
    },
    builds: { ar: 'برامج شغالة', en: 'Working programs' },
    color: 'blue',
    levels: {
      young: { tools: ['mBlock'], text: { ar: 'برمجة بالبلوكات: قصص وأنيميشن وألعاب صغيرة. الطفل بيتعلم الترتيب والمنطق قبل ما يكتب سطر كود.', en: 'Block coding: stories, animations and small games. Children learn order and logic before they type a line of code.' } },
      middle: { tools: ['Python'], text: { ar: 'كود حقيقي مكتوب: برامج بتسأل وتقرر وترد. وكل مستوى بيخلص ببرنامج شغال.', en: 'Real, typed code: programs that ask, decide and respond. Every level ends with a working program.' } },
      teen: { tools: ['JavaScript'], text: { ar: 'لغة الويب: برامج بتخزّن البيانات الحقيقية وتحللها وتنظمها.', en: 'The language of the web: programs that store, analyse and organise real data.' } },
    },
    cards: [
      { kind: 'art', label: { ar: 'من البلوكات إلى الكود', en: 'From blocks to code' } },
      { kind: 'photo', label: { ar: 'برمجة حقيقية بأيديهم', en: 'Real coding, hands on' } },
      { kind: 'project', label: { ar: 'مشروع: متاهة الكنز بلغة Python', en: 'Project: a treasure maze in Python' }, project: 'progMaze', tint: 'blue' },
    ],
    shots: [
      { img: 'progScratch', caption: { ar: 'لعبة التقاط التفاح بالبلوكات في Scratch', en: 'An apple-catching game in Scratch blocks' } },
      { img: 'progMaze', caption: { ar: 'متاهة الكنز: الكود بيحرّك المستكشف لحد الكنز (Python)', en: 'Treasure maze: code moves the explorer to the treasure (Python)' } },
      { img: 'progThor', caption: { ar: 'تحدي Power of Thor على CodinGame', en: 'The Power of Thor challenge on CodinGame' } },
      { img: 'progCodingame', caption: { ar: 'تحدي على CodinGame: سفينة بتختار أقرب عدو تضربه', en: 'A CodinGame challenge: a ship that picks the nearest enemy to shoot' } },
    ],
    gains: [
      { ar: 'يقسّم المشكلة الكبيرة لخطوات صغيرة وواضحة', en: 'Break a big problem into small, clear steps' },
      { ar: 'يخطط للحل بخطوات أو Flowchart قبل ما يكتب الكود', en: 'Plan a solution as steps or a flowchart before coding' },
      { ar: 'يقرا رسالة الخطأ، ويلاقي المشكلة ويصلّحها', en: 'Read an error message, find the bug and fix it' },
      { ar: 'يخلّص كل مستوى ببرنامج شغال من عمله', en: 'Finish every level with a working program of their own' },
      { ar: 'يشرح برنامجه شغال إزاي، وليه أخد كل قرار', en: 'Explain how their program works, decision by decision' },
    ],
    journey: {
      middle: [{
        heading: { ar: 'Python', en: 'Python' },
        levels: [
          {
            title: { ar: 'أساسيات البرمجة', en: 'Programming basics' },
            text: { ar: 'يعني إيه برمجة، الـ Flowchart، الطباعة على الشاشة، المتغيرات، إدخال البيانات، القرارات (if / else)، وتصحيح الأخطاء.', en: 'What programming is, flowcharts, output, variables, user input, decisions (if / else) and debugging.' },
            project: { ar: 'لعبة مغامرة «البحث عن الكنز»: كل اختيار بيودّي لنهاية مختلفة، ومعاها عدّاد نقاط.', en: 'A treasure-hunt adventure game where every choice leads to a different ending, with a score.' },
          },
          {
            title: { ar: 'برامج تفاعلية', en: 'Interactive programs' },
            text: { ar: 'التكرار (Loops) والقوائم والدوال: برامج بتتفاعل مع المستخدم.', en: 'Loops, lists and functions: programs that react to the user.' },
            project: { ar: 'مسابقة أو لعبة يلعبها صاحبه.', en: 'A quiz or game a friend can play.' },
          },
          {
            title: { ar: 'حلّال المشكلات', en: 'Problem solver' },
            text: { ar: 'البيانات والملفات وخوارزميات بسيطة لحل مشكلة حقيقية.', en: 'Data, files and simple algorithms, used to solve a real problem.' },
            project: { ar: 'تطبيق صغير لحد يعرفه.', en: 'A small app for someone they know.' },
          },
        ],
      }],
      teen: [{
        heading: { ar: 'JavaScript', en: 'JavaScript' },
        levels: [
          {
            title: { ar: 'أساسيات JavaScript', en: 'JavaScript fundamentals' },
            text: { ar: 'المتغيرات وأنواع البيانات والعمليات الحسابية والقرارات.', en: 'Variables, data types, operators and decisions.' },
            project: { ar: 'حاسبة نقاط: درجات مدرسة، أو نقاط لعبة، أو فاتورة محل.', en: 'A score calculator: school grades, game scores or a shop invoice.' },
          },
          {
            title: { ar: 'التكرار والدوال والـ Arrays', en: 'Loops, functions and arrays' },
            text: { ar: 'تكرار المهام، ودوال بتتعاد، وقوائم بيانات.', en: 'Repeating tasks, reusable functions and lists of data.' },
            project: { ar: 'برنامج بيحلّل بيانات كتير: المتوسط وأعلى وأقل قيمة والبحث.', en: 'An analyser that handles many records: averages, highest, lowest and search.' },
          },
          {
            title: { ar: 'الـ Objects والبيانات الحقيقية', en: 'Objects and real data' },
            text: { ar: 'الـ Objects، والبحث والفلترة والترتيب.', en: 'Objects, arrays of objects, searching, filtering and sorting.' },
            project: { ar: 'نظام لإدارة السجلات: طلاب أو لاعيبة أو منتجات.', en: 'A record-management system for students, players or products.' },
          },
        ],
      }],
    },
  },
  {
    slug: 'cyber',
    instructors: [INSTRUCTORS.nourhan, INSTRUCTORS.george],
    name: { ar: 'الأمن السيبراني', en: 'Cybersecurity' },
    short: { ar: 'يتعلم يحمي نفسه وأجهزته، ويحل تحديات الأمان.', en: 'Learns to protect themselves and their devices, and solves security challenges.' },
    about: {
      ar: 'يفهم الهجمات بتحصل إزاي علشان يعرف يحمي منها، وده في معامل تدريب آمنة بس.',
      en: 'Understand how attacks work so you can defend against them, in safe practice labs only.',
    },
    builds: { ar: 'أدوات أمان وتحديات CTF', en: 'Security tools and CTF challenges' },
    color: 'mint',
    levels: {
      middle: { tools: ['Google Interland', 'CyberChef', 'Scratch'], text: { ar: 'الأمان على الإنترنت والشفرات: تطبيقات تشفير وفاحص لقوة الباسورد.', en: 'Online safety, codes and ciphers: secret-code apps and password checkers.' } },
      teen: { tools: ['Cisco Packet Tracer', 'Linux', 'Wireshark', 'Python', 'CyberChef', 'TryHackMe', 'picoCTF'], text: { ar: 'الشبكات والتهديدات والحماية: أساسيات الأمن والشبكات في الفصل الأول، وبعدين أدوات أمان بالـ Python وتحديات CTF في معامل آمنة.', en: 'Networks, threats and defence: security and networking foundations in Chapter 1, then Python security tools and capture-the-flag challenges in safe labs.' } },
    },
    cards: [
      { kind: 'art', label: { ar: 'يحمي نفسه وأجهزته', en: 'Protecting themselves and their devices' } },
      { kind: 'project', label: { ar: 'مشروع: محاكاة شبكة وجهاز دخيل', en: 'Project: a network and a rogue device' }, project: 'cyberNetwork', tint: 'mint' },
      { kind: 'photo', label: { ar: 'أدوات أمان حقيقية', en: 'Real security tools' } },
    ],
    shots: [
      { img: 'cyberNetwork', caption: { ar: 'شبكة لأقسام شركة في Cisco Packet Tracer، والطالب بيتتبع جهاز دخيل', en: 'A company network in Cisco Packet Tracer, tracing a rogue device' } },
    ],
    gains: [
      { ar: 'يكشف رسائل الـ Phishing والنصب والتحميلات الخطر', en: 'Spot phishing, scams and unsafe downloads' },
      { ar: 'يعمل باسوردات قوية ويحمي حساباته', en: 'Create strong passwords and protect their accounts' },
      { ar: 'يفهم الشبكات والإنترنت شغالين إزاي', en: 'Understand how networks and the internet work' },
      { ar: 'يقيّم المخاطر ويخطط للحماية', en: 'Assess risks and plan a defence' },
      { ar: 'يلتزم بالأخلاقيات: يتدرب في معامل مسموح بيها بس، وعمره ما يجرّب على أنظمة حقيقية', en: 'Act ethically: practise only in authorised labs, never on real systems' },
    ],
    rhythm: { ar: 'السيشنز من 1 لـ 5 مفاهيم جديدة، وكل سيشن بتخلص بنشاط عملي قصير، والسادسة مشروع المستوى وعرضه', en: 'Sessions 1–5 bring new concepts, each ending with a short hands-on activity, and session 6 is the level project and presentation' },
    journey: {
      teen: [
        {
          heading: { ar: 'الفصل الأول: أساسيات الأمن السيبراني', en: 'Chapter 1: Cybersecurity foundations' },
          prereq: { ar: 'مش محتاج خبرة سابقة، بس أساسيات استخدام الكمبيوتر والفضول.', en: 'No previous experience needed, only basic computer skills and curiosity.' },
          levels: [
            {
              title: { ar: 'الشبكات وأساسيات الأمن السيبراني', en: 'Networking and cybersecurity foundations' },
              text: { ar: 'الأمن السيبراني بيحمي إيه، وأجهزة الشبكة وطبقاتها، وعناوين IP والـ DHCP، والإنترنت شغال إزاي (DNS و HTTPS)، والـ Ports وأوامر زي ping و ipconfig، على Cisco Packet Tracer.', en: 'What cybersecurity protects, network devices and layers, IP addresses and DHCP, how the internet works (DNS and HTTPS), ports and commands such as ping and ipconfig, in Cisco Packet Tracer.' },
              project: { ar: 'شبكة أكثر أمانًا لمدرسة على Cisco Packet Tracer: رسمة الشبكة وجدول العناوين وقائمة فحص أمان، وعرض للمجموعة.', en: 'A safer school network in Cisco Packet Tracer: network diagram, address table and security checklist, presented as a group.' },
            },
            {
              title: { ar: 'التهديدات والحماية الرقمية', en: 'Cyber threats and digital protection' },
              text: { ar: 'الـ CIA Triad وتقييم المخاطر، وأنواع البرامج الضارة والتحميل الآمن، والهندسة الاجتماعية والـ Phishing، والباسوردات والـ MFA، والأمان على الويب.', en: 'The CIA triad and risk assessment, types of malware and safe downloads, social engineering and phishing, passwords and MFA, and web safety.' },
              project: { ar: 'تحقيق في مشاكل أمان وهمية في مدرسة: جدول مخاطر وخطة حماية، وحملة توعية (بوستر أو عرض).', en: 'An investigation of fictional security problems at a school: a risk table, a protection plan and an awareness campaign (poster or presentation).' },
            },
            {
              title: { ar: 'الأمن الدفاعي والمهارات العملية', en: 'Defensive security and practical skills' },
              text: { ar: 'حماية أنظمة التشغيل والصلاحيات، والـ Firewalls وقواعدها، وأساسيات Linux، وتحليل حركة الشبكة بـ Wireshark، ومراقبة السجلات والتعامل مع الحوادث.', en: 'Operating-system security and permissions, firewalls and their rules, Linux basics, network analysis with Wireshark, and log monitoring and incident response.' },
              project: { ar: 'خطة أمان لشركة صغيرة وهمية: رسمة شبكة وتقييم مخاطر وقواعد Firewall وخطة مراقبة واستجابة.', en: 'A security plan for a fictional small organisation: network diagram, risk assessment, firewall rules and a monitoring and response plan.' },
            },
          ],
        },
        {
          heading: { ar: 'الفصل التاني: الأمن السيبراني التطبيقي', en: 'Chapter 2: Applied cybersecurity' },
          prereq: { ar: 'بعد الفصل الأول.', en: 'After Chapter 1.' },
          levels: [
            {
              title: { ar: 'Python والتشفير', en: 'Python and cryptography' },
              text: { ar: 'البرمجة بـ Python من الصفر في مشاريع أمان: القرارات والتكرار والدوال والملفات، والفرق بين الترميز والتشفير والـ Hashing، والـ Salting، مع CyberChef.', en: 'Python from scratch through security projects: decisions, loops, functions and files; the difference between encoding, encryption and hashing; salting; and CyberChef.' },
              project: { ar: 'مجموعة أدوات: تطبيق شفرة سرية وفاحص لقوة الباسورد وعرض للـ Hashing، مع دليل استخدام.', en: 'A toolkit: a secret-code app, a password-strength checker and a hashing demo, with a user guide.' },
            },
            {
              title: { ar: 'Linux وتحليل الشبكات وأدوات Python', en: 'Linux, network analysis and Python security tools' },
              text: { ar: 'أوامر Linux بعمق، وقراءة السجلات وأتمتتها بـ Python، والتأكد من سلامة الملفات بالـ Hash، وفلاتر Wireshark، في غرف تدريب آمنة على TryHackMe.', en: 'Linux in depth, reading and automating logs with Python, file-integrity checks with hashes, and Wireshark filters, in safe TryHackMe training rooms.' },
              project: { ar: 'أداة Python بتحلل سجلات سيرفر وبتنبّه لو ملف مهم اتغيّر، مع تقرير بالنتائج.', en: 'A Python tool that reviews server logs and warns when an important file changes, with a findings report.' },
            },
            {
              title: { ar: 'أمان الويب وتحديات CTF', en: 'Web security and capture the flag' },
              text: { ar: 'يعني إيه CTF والاختراق الأخلاقي، وتحديات التشفير والـ Forensics و Linux، وأمان الويب من ناحية المدافع، وكتابة التقارير والإفصاح المسؤول.', en: 'What CTF and ethical hacking are; cryptography, forensics and Linux challenges; web security from the defender\'s side; writing reports and responsible disclosure.' },
              project: { ar: 'يوم تحديات CTF بالفريق على منصات مسموح بيها، وتقرير احترافي لحل تحدي واحد.', en: 'A team CTF challenge day on authorised platforms, and a professional write-up of one solved challenge.' },
            },
          ],
          note: { ar: 'كل التدريب على بيانات وهمية ومنصات تدريب مسموح بيها زي TryHackMe و picoCTF، وعمره ما بيكون على مواقع أو أنظمة حقيقية.', en: 'All practice uses fictional data and authorised training platforms such as TryHackMe and picoCTF, never real websites or systems.' },
        },
      ],
    },
  },
  {
    slug: 'gamedev',
    instructors: [INSTRUCTORS.shirien, INSTRUCTORS.mahmoud],
    name: { ar: 'تطوير الألعاب', en: 'Game Development' },
    short: { ar: 'يصمم ألعابه الخاصة، ويفهم إزاي اللعبة بتتبني من جوه.', en: 'Designs their own games and learns how games work inside.' },
    about: {
      ar: 'من لعب الألعاب لتصميمها، وفهم الألعاب بتحاول تشدّ اللاعب إزاي.',
      en: 'From playing games to designing them, and understanding how games try to keep players hooked.',
    },
    builds: { ar: 'ألعابه الخاصة', en: 'Their own games' },
    color: 'yellow',
    levels: {
      middle: { tools: ['GameMaker'], text: { ar: 'محرك ألعاب حقيقي: المنطق بالبلوكات (GML Visual) الأول، وبعدين كود GML بسيط من الفصل التاني. كل سيشن فيها هدف للمبرمج ولحظة تفكير للمصمم.', en: 'A real game engine: visual blocks (GML Visual) first, then simple GML code from Chapter 2. Every session has a programmer goal and a designer moment.' } },
      teen: { tools: ['Unity'], text: { ar: 'محرك احترافي بتستخدمه شركات ألعاب حوالين العالم. الطالب بيبني ألعابه الخاصة.', en: 'A professional engine used by studios around the world. Students build their own playable games.' } },
    },
    cards: [
      { kind: 'art', label: { ar: 'من لاعب إلى صانع ألعاب', en: 'From player to game maker' } },
      { kind: 'project', label: { ar: 'مشروع: لعبة سفينة الفضاء', en: 'Project: the spaceship game' }, project: 'gameShield', tint: 'yellow' },
      { kind: 'photo', label: { ar: 'يجرب لعبته بنفسه', en: 'Playtesting their own game' } },
    ],
    shots: [
      { img: 'gameShield', caption: { ar: 'سفينة بدرع حماية وكويكبات، وعندها 3 أرواح (GameMaker)', en: 'A ship with a shield, asteroids and 3 lives, in GameMaker' } },
      { img: 'gamePink', caption: { ar: 'نفس اللعبة بتصميم طالبة تانية: سفينة وردية وعندها 4 أرواح', en: 'The same game, designed by another student: a pink ship and 4 lives' } },
      { img: 'unityTruck', caption: { ar: 'شاحنة بتخبط في صناديق بفيزياء حقيقية (Unity)', en: 'A truck crashing into crates with real physics (Unity)' } },
      { img: 'unityAnimals', caption: { ar: 'لعبة إطعام الحيوانات: كل حيوان ياكل يزوّد النقط (Unity)', en: 'Feed the animals: every fed animal adds to the score (Unity)' } },
      { img: 'unitySumo', caption: { ar: 'كورة بتزق الكور التانية برّه المنصة بقوة خاصة (Unity)', en: 'A ball that knocks the others off the platform with a power-up (Unity)' } },
    ],
    gains: [
      { ar: 'يبرمج الحركة والضرب والتصادم والنقاط والأرواح', en: 'Program movement, shooting, collisions, score and lives' },
      { ar: 'يصمم لعبة ممتعة وعادلة وفيها تحدي', en: 'Design a game that is fun, fair and challenging' },
      { ar: 'يجرّب لعبته مع لاعيبة حقيقيين ويحسّنها من آرائهم', en: 'Test their game with real players and improve it from feedback' },
      { ar: 'يفهم الجوايز العشوائية والـ Pay-to-win، ويحط لنفسه حدود لوقت الشاشة', en: 'Understand random rewards and pay-to-win, and set their own screen limits' },
      { ar: 'يعرض لعبته ويشرح قرارات التصميم', en: 'Present their game and explain their design decisions' },
    ],
    journey: {
      middle: [
        {
          heading: { ar: 'GameMaker · الفصل الأول: Space Shooter', en: 'GameMaker · Chapter 1: Space Shooter' },
          prereq: { ar: 'مش محتاج خبرة برمجة. محتاج أساسيات الكمبيوتر، ويقرا كلمات إنجليزي بسيطة زي Create و Speed، والجمع والطرح والأرقام السالبة.', en: 'No programming experience needed. Basic computer skills, simple English words such as Create and Speed, and adding, subtracting and negative numbers.' },
          levels: [
            {
              title: { ar: 'مقدمة والتصادم', en: 'Intro and collisions' },
              text: { ar: 'يعني إيه لعبة، والألعاب المستقلة (Indie)، وأدوار فريق تطوير الألعاب، ويعني إيه محرك ألعاب. وبعدين في GameMaker: الـ Objects والـ Sprites، والأحداث (Create و Step و Keyboard و Collision)، ومكان X و Y على الشاشة، والحركة وإطلاق الليزر.', en: 'What a game is, indie games, the roles in a game team and what a game engine is. Then in GameMaker: objects and sprites, events (Create, Step, Keyboard and Collision), X and Y on the screen, movement and shooting.' },
              project: { ar: 'سفينة بتتحرك وبتطلق ليزر بيكسر الصخور.', en: 'A ship that moves and shoots a laser that breaks rocks.' },
            },
            {
              title: { ar: 'العشوائية والأرواح والمؤقتات والصعوبة', en: 'Randomness, lives, timers and difficulty' },
              text: { ar: 'العشوائية والجوايز العشوائية (وإزاي السوشيال ميديا بتستخدم نفس الفكرة)، والأرواح والنقاط بالمتغيرات، والمؤقتات لظهور الصخور، والصعوبة اللي بتزيد، واختبار اللعبة.', en: 'Randomness and random rewards (and how social media uses the same idea), lives and score with variables, timers for spawning rocks, rising difficulty, and playtesting.' },
              project: { ar: 'لعبة Space Rocks كاملة شغالة، بنقاط وأرواح وإعادة اللعب.', en: 'A complete, working Space Rocks game with score, lives and restart.' },
            },
            {
              title: { ar: 'الـ Power-ups والصوت والأنيميشن والـ Boss', en: 'Power-ups, sound, animation and a boss' },
              text: { ar: 'الـ Power-ups المؤقتة والدائمة، والـ Pay-to-win وطرق الدفع في الألعاب، والصوت والأنيميشن، ومعركة الـ Boss، وضبط توازن اللعبة: ممتعة ولا مزعجة؟', en: 'Temporary and permanent power-ups, pay-to-win and the ways games charge money, sound and animation, a boss battle, and balancing: is the game fun or annoying?' },
              project: { ar: 'لعبة كاملة بـ Power-ups وصوت ومعركة Boss، بيلعبها زمايله في يوم الـ Arcade.', en: 'A finished game with power-ups, sound and a boss fight, played by classmates on Arcade Day.' },
            },
          ],
          note: { ar: 'بعدها: الفصل التاني (المستويات 4–6) لعبة Platformer بالانتقال من البلوكات لكود GML بسيط (جاذبية ونط ومراحل)، والفصل التالت (المستويات 7–9) لعبة فريق، كل طالب فيها بدور مبرمج أو مصمم، بيخططوا ويبنوا ويجرّبوا مع بعض.', en: 'Next: Chapter 2 (Levels 4–6) builds a platformer, moving from blocks to simple GML code (gravity, jumping, levels). Chapter 3 (Levels 7–9) is a team game where each student is a programmer or a designer, planning, building and testing together.' },
        },
      ],
    },
  },
];

export function getTrack(slug: string) {
  return TRACKS.find((t) => t.slug === slug);
}
