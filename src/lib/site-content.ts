/**
 * All landing page text, in Arabic and English.
 * The Arabic page stays in Arabic; English appears only in tool names (shown as tags).
 * Track details live in tracks.ts, photos in media.ts.
 */

import type { IconName } from '@/components/LandingIcon';

export type Lang = 'ar' | 'en';

interface Tinted {
  icon: IconName;
  tint: 'green' | 'blue' | 'yellow' | 'mint';
  color: string;
}

interface Head {
  kicker: string;
  title: string;
}

export interface SiteContent {
  arrow: string;
  home: string;
  other: { label: string; href: string };
  nav: { href: string; label: string }[];
  header: { test: string; whatsapp: string; menu: string };
  hero: { title: string; highlight: string; lead: string; cta: string; whatsapp: string; note: string };
  stats: (Tinted & { value: string; label: string })[];
  why: Head & { text: string; items: (Tinted & { title: string; text: string })[]; founder: { title: string; quote: string; name: string } };
  team: Head & { text: string; roles: { title: string; text: string }[]; soon: string };
  tracks: Head & { text: string; tabs: string; more: string; tableTitle: string; tableTrack: string; tableBuilds: string; none: string };
  how: Head & { sub: string; cta: string; steps: { n: string; title: string; text: string }[] };
  workshop: Head & { text: string; points: string[] };
  projects: Head & { text: string; note: string; items: { track: string; title: string; text: string; tint: Tinted['tint'] }[] };
  reviews: Head & { sub: string; hint: string; parent: string; items: { name: string; text: string }[] };
  faq: Head & { items: { q: string; a: string }[] };
  final: { title: string; text: string; cta: string; whatsapp: string };
  next: { starts: string; seats: (n: number) => string; locale: string };
  trackPage: {
    back: string; ages: string; tools: string; builds: string; projects: string; projectsNote: string;
    how: string; howItems: string[]; cta: string; ctaText: string; test: string; whatsapp: string; notTaught: string;
  };
  whatsappLabel: string;
  /** Pre-filled message when a parent opens WhatsApp from the site. */
  whatsappText: string;
  footer: { test: string; whatsapp: string; address: string; facebook: string; instagram: string; rights: string; slogan: string; photos: string };
}

const GREEN = '#2fa84f';
const BLUE = '#3eaae5';
const AMBER = '#d99a00';

const ar: SiteContent = {
  arrow: '←',
  home: '/',
  other: { label: 'English', href: '/en' },
  nav: [
    { href: '/#why', label: 'لماذا نحن' },
    { href: '/#tracks', label: 'المسارات' },
    { href: '/#workshop', label: 'ورشة الأهل' },
    { href: '/#reviews', label: 'آراء الأهل' },
    { href: '/#faq', label: 'أسئلة شائعة' },
    { href: '/#contact', label: 'تواصل معنا' },
  ],
  header: { test: 'اختبار مجاني', whatsapp: 'تواصل معنا', menu: 'القائمة' },
  hero: {
    title: 'برمجة وتكنولوجيا لأطفالك،',
    highlight: 'وجهًا لوجه في الفيوم',
    lead: 'مجموعات صغيرة من 6 إلى 12 طالبًا، مع مدرب ومساعد، ومشروع يبنيه طفلك بنفسه كل شهر.',
    cta: 'احجز اختبار تحديد المستوى المجاني',
    whatsapp: 'كلّمنا على واتساب',
    note: 'الاختبار مجاني ويستغرق حوالي 10 دقائق',
  },
  stats: [
    { icon: 'cap', tint: 'green', color: GREEN, value: 'من 6 إلى 18', label: 'سنة، مقسّمين حسب السن' },
    { icon: 'layers', tint: 'blue', color: BLUE, value: '4 مسارات', label: 'برمجة، ألعاب، ذكاء اصطناعي، أمن سيبراني' },
    { icon: 'users', tint: 'yellow', color: AMBER, value: '6 إلى 12 طالبًا', label: 'في المجموعة الواحدة' },
    { icon: 'pair', tint: 'green', color: GREEN, value: 'مدرب ومساعد', label: 'مع كل مجموعة' },
  ],
  why: {
    kicker: 'لماذا تك سيدز؟',
    title: 'لأن كل طفل يستحق أن يتعلّم، مش الأسرع بس',
    text: 'نعلّم وجهًا لوجه في مجموعات صغيرة، فالمدرب يرى كل طفل: متى فهم، ومتى تاه، ومتى يتردد أن يسأل. التكنولوجيا عندنا وسيلة، وعقل الطفل هو الهدف.',
    items: [
      { icon: 'report', tint: 'blue', color: BLUE, title: 'تقارير متابعة للأهل', text: 'ثلاثة تقارير كل شهر توضح ما تعلّمه طفلك وما يحتاج فيه إلى دعم.' },
      { icon: 'parents', tint: 'yellow', color: AMBER, title: 'ورشة مجانية للأهل', text: 'كل يوم أحد نشرح طريقتنا ودوركم في البيت. نحن شركاء، لا مجرد مقدمي خدمة.' },
      { icon: 'guarantee', tint: 'green', color: GREEN, title: 'ضمان استرداد قيمة الشهر', text: 'إذا حضر طفلك 5 حصص على الأقل من 6 ولم يُكمل مشروع الشهر، نرد لكم قيمة هذا الشهر.' },
    ],
    founder: {
      title: 'كلمة من المؤسس',
      quote: 'بدأت تك سيدز في 2025 لأني لاحظت أن أغلب الأطفال في الكورسات الأونلاين لا يتعلمون بجد. الشاطر يكمل، والباقي يتأخر من غير ما حد ياخد باله. هنا نعلّم كل طفل، ونفرح معه بأول مشروع يبنيه بنفسه.',
      name: 'محمود، مؤسس تك سيدز',
    },
  },
  team: {
    kicker: 'فريق التدريس',
    title: 'اثنان مع كل مجموعة، فلا يبقى طفل تائهًا',
    text: 'نفس فريق المدربين يبقى مع المجموعة طوال الشهر، ويعرف كل طفل باسمه وطريقة تفكيره.',
    roles: [
      { title: 'المدرب', text: 'يشرح الفكرة ويسأل الأسئلة، والطفل هو الذي يكتب ويصل إلى الحل بنفسه.' },
      { title: 'المساعد', text: 'يمر على الأطفال واحدًا واحدًا، فمن يحتاج مساعدة يجدها في وقتها.' },
    ],
    soon: 'صور وأسماء فريقنا قريبًا',
  },
  tracks: {
    kicker: 'المسارات حسب السن',
    title: 'كل سن له مساره ومستواه',
    text: 'طفل عنده 6 سنين لا يدرس مع طالب عنده 18 سنة. اختر سن طفلك لترى المسارات المناسبة له.',
    tabs: 'اختر سن طفلك',
    more: 'اعرف أكثر عن المسار',
    tableTitle: 'أي مسار يناسب أي سن؟',
    tableTrack: 'المسار',
    tableBuilds: 'الطالب يبني',
    none: 'غير متاح',
  },
  how: {
    kicker: 'كيف نعمل؟',
    title: 'رحلة واضحة من أول يوم',
    sub: 'كل شهر 6 حصص، كل حصة 3 ساعات، وينتهي بمشروع يبنيه الطالب ويعرضه بنفسه.',
    cta: 'ابدأ بالخطوة الأولى',
    steps: [
      { n: '1', title: 'اختبار تحديد المستوى', text: 'اختبار مجاني قصير، وللأطفال الأصغر مقابلة بسيطة.' },
      { n: '2', title: 'اختيار المسار', text: 'نرشّح المسار المناسب لسن طفلك واهتماماته.' },
      { n: '3', title: 'التعلّم بالمشاريع', text: 'الطفل يكتب ويجرب بنفسه، ويبني مشروعًا كل شهر.' },
      { n: '4', title: 'المتابعة مع الأهل', text: 'تقارير منتظمة لتعرف ما تعلّمه طفلك وما يحتاجه.' },
    ],
  },
  workshop: {
    kicker: 'ورشة الأهل المجانية',
    title: 'تعال تعرّف علينا يوم الأحد',
    text: 'كل يوم أحد في Hive Co-working Space بالفيوم. نشرح طريقتنا، وكيف سنساعد طفلك، ودوركم في البيت.',
    points: ['مجانية تمامًا ومن غير أي التزام', 'تتعرف على المدربين والمكان', 'نجيب عن كل أسئلتك وجهًا لوجه'],
  },
  projects: {
    kicker: 'مشاريع الطلاب',
    title: 'كل شهر ينتهي بمشروع حقيقي',
    text: 'أمثلة لمشاريع يبنيها طلابنا بأيديهم ويعرضونها بأنفسهم.',
    note: 'صور مشاريع طلابنا الحقيقية قريبًا',
    items: [
      { track: 'تطوير الألعاب', title: 'لعبة سفينة الفضاء', text: 'سفينة تتحرك في كل الاتجاهات وتطلق الليزر على الكويكبات، ولها ثلاث أرواح.', tint: 'yellow' },
      { track: 'البرمجة', title: 'قصة تفاعلية', text: 'شخصيات تتحرك وتتكلم وتستجيب لاختيارات اللاعب.', tint: 'blue' },
      { track: 'الأمن السيبراني', title: 'فاحص قوة كلمة السر', text: 'برنامج يقول لك إذا كانت كلمة السر قوية أم سهلة التخمين، ولماذا.', tint: 'mint' },
      { track: 'الذكاء الاصطناعي', title: 'مشروع بأدوات الذكاء الاصطناعي', text: 'كتيّب أو عرض أو موقع بسيط يخطط له الطالب وينفذه بنفسه.', tint: 'green' },
    ],
  },
  reviews: {
    kicker: 'آراء أولياء الأمور',
    title: 'بكلمات الأهل أنفسهم',
    sub: 'ثقتكم هي دافعنا للاستمرار',
    hint: 'اسحب لقراءة المزيد',
    parent: 'ولي أمر',
    items: [
      { name: 'منة الله كمال', text: 'تجربة أكثر من رائعة! ابني كان مبسوط جدًا بالكورس وعمل لعبة حلوة أوي، وعلى طول حسيت بالاختلاف في شخصيته وتقديره للوقت والإنتاج. لقيته من نفسه عمل ليمت للفيس بوك والتيك توك، وبقى يقضي وقت أكتر ينجز التاسكات، وبقى بيساعدنا في البيت أكتر وقلّت عصبيته كتير.' },
      { name: 'ابتهال مصطفى', text: 'الكورس غيّر تمامًا نظرة ابني للبرمجة! مكنش عنده أي شغف بيها قبل كده، لكن دلوقتي بقى مهتم جدًا ومستني يروح كل سيشن. كمان بقى بيقضي وقت أقل بكتير على الموبايل. وفريق الأكاديمية محترم جدًا ومتعاون ومهتم بكل التفاصيل.' },
      { name: 'ندى عماد', text: 'الصراحة التعامل مع الأطفال ممتاز والمحتوى مناسب جدًا لسن الأطفال.' },
      { name: 'وائل', text: 'تجربة فوق الممتازة، ومبسوط جدًا إن ابني بقى يعرف المعلومات دي، وأثّرت في تركيزه ومذاكرته وتفاعله معانا في البيت.' },
      { name: 'حسام', text: 'هو مبسوط جدًا وعنده إقبال على الكورس وبيكون سعيد وهو رايح. شكر خاص للمهندسة على بساطتها في التعامل وتحبيب ابني في الكورس، وإزاي اتعاملت مع سن صغير وبسّطتله ووصّلتله المعلومة.' },
      { name: 'ولية أمر', text: 'مبسوط جدًا جدًا وبيفهم طبعًا، وجاي متحمس عايز يعمل التاسك. هو ما شاء الله بيحب الكمبيوتر والتكنولوجيا الحديثة جدًا.' },
    ],
  },
  faq: {
    kicker: 'أسئلة شائعة',
    title: 'كل اللي محتاج تعرفه قبل ما تبدأ',
    items: [
      { q: 'كيف أسجّل طفلي؟', a: 'ابدأ باختبار تحديد المستوى المجاني على الموقع (وللأطفال الأصغر مقابلة قصيرة)، وبعدها نتواصل معك على واتساب لنرشّح المسار والمجموعة المناسبة.' },
      { q: 'هل يدرس طفل عنده 6 سنين مع طالب عنده 18 سنة؟', a: 'لا. كل مسار مقسّم حسب السن إلى ثلاث فئات: من 6 إلى 9، ومن 10 إلى 13، ومن 14 إلى 18، وكل فئة لها محتواها وأدواتها.' },
      { q: 'كم حصة في الشهر، وأين ومتى؟', a: 'كل شهر 6 حصص، مدة الحصة 3 ساعات، أيام الجمعة والسبت في Hive Co-working Space بالفيوم.' },
      { q: 'كم عدد الطلاب في المجموعة؟', a: 'من 6 إلى 12 طالبًا فقط، ومع كل مجموعة مدرب ومساعد.' },
      { q: 'ما هي ورشة الأهل؟', a: 'لقاء مجاني كل يوم أحد نشرح فيه طريقتنا ودوركم في البيت، وتتعرفون على المدربين والمكان. يمكنك حجزها من هذه الصفحة.' },
      { q: 'هل يحصل الطالب على شهادة؟', a: 'نعم، يحصل الطالب على شهادة إتمام بعد كل شهر يُكمل فيه مشروعه.' },
      { q: 'ماذا لو لم يستفد طفلي؟', a: 'إذا حضر طفلك 5 حصص على الأقل من 6 ولم يُكمل مشروع الشهر، نرد لكم قيمة هذا الشهر. يُقدَّم الطلب خلال 7 أيام من آخر حصة.' },
    ],
  },
  final: {
    title: 'جاهز يبدأ طفلك أول مشروع له؟',
    text: 'ابدأ باختبار تحديد المستوى المجاني، ونحن نساعدك تختار المسار المناسب.',
    cta: 'احجز الآن',
    whatsapp: 'اسألنا على واتساب',
  },
  next: { starts: 'المجموعة القادمة تبدأ', seats: (n) => (n === 1 ? 'باقي مكان واحد' : n === 2 ? 'باقي مكانان' : n <= 10 ? `باقي ${n} أماكن` : `باقي ${n} مكانًا`), locale: 'ar-EG-u-nu-latn' },
  trackPage: {
    back: 'كل المسارات',
    ages: 'حسب السن',
    tools: 'الأدوات',
    builds: 'الطالب يبني',
    projects: 'أمثلة لمشاريع في هذا المسار',
    projectsNote: 'صور مشاريع طلابنا قريبًا',
    how: 'كيف يمشي الشهر؟',
    howItems: [
      '6 حصص في الشهر، مدة الحصة 3 ساعات',
      'أيام الجمعة والسبت في Hive Co-working Space بالفيوم',
      'مجموعة من 6 إلى 12 طالبًا، مع مدرب ومساعد',
      'الشهر ينتهي بمشروع يبنيه الطالب ويعرضه بنفسه، وشهادة إتمام',
      'ثلاثة تقارير متابعة لولي الأمر كل شهر',
    ],
    cta: 'مش متأكد إذا كان المسار ده مناسب لطفلك؟',
    ctaText: 'اختبار تحديد المستوى المجاني يرشّح لك المسار الأقرب لطفلك.',
    test: 'ابدأ الاختبار المجاني',
    whatsapp: 'اسألنا على واتساب',
    notTaught: 'هذا المسار يبدأ من سن 10 سنوات.',
  },
  whatsappLabel: 'تواصل معنا على واتساب',
  whatsappText: 'أهلًا تك سيدز، عايز أعرف تفاصيل أكتر عن الكورسات.',
  footer: {
    test: 'اختبار تحديد المستوى',
    whatsapp: 'واتساب',
    address: 'Hive Co-working Space، شارع أحمد شوقي، الفيوم',
    facebook: 'فيسبوك',
    instagram: 'إنستجرام',
    rights: 'جميع الحقوق محفوظة',
    slogan: 'تنمية العقول الشابة',
    photos: 'بعض الصور مؤقتة من Pexels',
  },
};

const en: SiteContent = {
  arrow: '→',
  home: '/en',
  other: { label: 'العربية', href: '/' },
  nav: [
    { href: '/en#why', label: 'Why us' },
    { href: '/en#tracks', label: 'Tracks' },
    { href: '/en#workshop', label: 'Parents workshop' },
    { href: '/en#reviews', label: 'Reviews' },
    { href: '/en#faq', label: 'FAQ' },
    { href: '/en#contact', label: 'Contact' },
  ],
  header: { test: 'Free test', whatsapp: 'Contact us', menu: 'Menu' },
  hero: {
    title: 'Coding and technology for your kids,',
    highlight: 'face to face in Fayoum',
    lead: 'Small groups of 6 to 12, an instructor and an assistant, and a project your child builds every month.',
    cta: 'Book the free placement test',
    whatsapp: 'Message us on WhatsApp',
    note: 'The test is free and takes about 10 minutes (in Arabic)',
  },
  stats: [
    { icon: 'cap', tint: 'green', color: GREEN, value: 'Ages 6 to 18', label: 'grouped by age' },
    { icon: 'layers', tint: 'blue', color: BLUE, value: '4 tracks', label: 'Programming, games, AI, cybersecurity' },
    { icon: 'users', tint: 'yellow', color: AMBER, value: '6 to 12 students', label: 'in each group' },
    { icon: 'pair', tint: 'green', color: GREEN, value: 'Instructor + assistant', label: 'with every group' },
  ],
  why: {
    kicker: 'Why TechSeeds?',
    title: 'Because every child deserves to learn, not just the fastest',
    text: 'We teach face to face in small groups, so the instructor sees every child: when they get it, when they are lost, and when they are too shy to ask. Technology is the tool; the child\'s mind is the goal.',
    items: [
      { icon: 'report', tint: 'blue', color: BLUE, title: 'Progress reports for parents', text: 'Three reports every month show what your child learned and where they need support.' },
      { icon: 'parents', tint: 'yellow', color: AMBER, title: 'A free parents\' workshop', text: 'Every Sunday we explain our method and your role at home. We are partners, not just a service.' },
      { icon: 'guarantee', tint: 'green', color: GREEN, title: 'Money back for the month', text: 'If your child attends at least 5 of 6 sessions and does not finish the month\'s project, we refund that month.' },
    ],
    founder: {
      title: 'A word from the founder',
      quote: 'I started TechSeeds in 2025 because most children in online courses were not really learning. The quickest kept up and the rest fell behind without anyone noticing. Here we teach every child, and celebrate the first project they build on their own.',
      name: 'Mahmoud, founder of TechSeeds',
    },
  },
  team: {
    kicker: 'Our teaching team',
    title: 'Two adults in every class, so no child gets lost',
    text: 'The same team stays with the group all month and knows every child by name and by how they think.',
    roles: [
      { title: 'The instructor', text: 'Explains the idea and asks questions; the child does the typing and reaches the answer.' },
      { title: 'The assistant', text: 'Goes round the children one by one, so help arrives when it is needed.' },
    ],
    soon: 'Team photos and names coming soon',
  },
  tracks: {
    kicker: 'Tracks by age',
    title: 'Every age has its own track and level',
    text: 'A 6-year-old never sits in the same class as an 18-year-old. Choose your child\'s age to see their tracks.',
    tabs: 'Choose your child\'s age',
    more: 'Learn more about this track',
    tableTitle: 'Which track fits which age?',
    tableTrack: 'Track',
    tableBuilds: 'Students build',
    none: 'Not offered',
  },
  how: {
    kicker: 'How it works',
    title: 'A clear journey from day one',
    sub: 'Each month has 6 sessions of 3 hours and ends with a project the student builds and presents.',
    cta: 'Take the first step',
    steps: [
      { n: '1', title: 'Placement test', text: 'A short free test; younger children have a quick chat instead.' },
      { n: '2', title: 'Choose a track', text: 'We suggest the track that fits your child\'s age and interests.' },
      { n: '3', title: 'Learn by building', text: 'Children type and try things themselves, and build a project every month.' },
      { n: '4', title: 'Parents stay informed', text: 'Regular reports on what your child learned and needs.' },
    ],
  },
  workshop: {
    kicker: 'Free parents\' workshop',
    title: 'Come and meet us on Sunday',
    text: 'Every Sunday at Hive Co-working Space in Fayoum. We explain our method, how we will help your child, and your role at home.',
    points: ['Completely free, no commitment', 'Meet the instructors and see the place', 'Ask us anything, face to face'],
  },
  projects: {
    kicker: 'Student projects',
    title: 'Every month ends with a real project',
    text: 'Examples of projects our students build with their own hands and present themselves.',
    note: 'Photos of our students\' real projects coming soon',
    items: [
      { track: 'Game Development', title: 'Spaceship game', text: 'A ship that flies in every direction, fires lasers at asteroids and has three lives.', tint: 'yellow' },
      { track: 'Programming', title: 'Interactive story', text: 'Characters that move, talk and respond to the player\'s choices.', tint: 'blue' },
      { track: 'Cybersecurity', title: 'Password strength checker', text: 'A program that tells you whether a password is strong or easy to guess, and why.', tint: 'mint' },
      { track: 'AI', title: 'An AI-powered project', text: 'A booklet, presentation or simple website the student plans and builds.', tint: 'green' },
    ],
  },
  reviews: {
    kicker: 'What parents say',
    title: 'In the parents\' own words',
    sub: 'Reviews are in Arabic, as the parents wrote them.',
    hint: 'Swipe to read more',
    parent: 'Parent',
    items: [],
  },
  faq: {
    kicker: 'FAQ',
    title: 'What to know before you start',
    items: [
      { q: 'How do I sign my child up?', a: 'Start with the free placement test on this site (younger children have a short chat instead). We then message you on WhatsApp with the right track and group.' },
      { q: 'Does a 6-year-old study with an 18-year-old?', a: 'No. Every track is split into three age groups: 6 to 9, 10 to 13 and 14 to 18, each with its own content and tools.' },
      { q: 'How many sessions, and when and where?', a: '6 sessions a month, 3 hours each, on Fridays and Saturdays at Hive Co-working Space in Fayoum.' },
      { q: 'How big are the groups?', a: '6 to 12 students only, with an instructor and an assistant in every group.' },
      { q: 'What is the parents\' workshop?', a: 'A free meeting every Sunday where we explain our method and your role at home, and you meet the team. You can book it on this page.' },
      { q: 'Do students get a certificate?', a: 'Yes, a completion certificate after every month in which they finish their project.' },
      { q: 'What if my child does not benefit?', a: 'If your child attends at least 5 of 6 sessions and does not finish the month\'s project, we refund that month. Ask within 7 days of the last session.' },
    ],
  },
  final: {
    title: 'Ready for your child\'s first project?',
    text: 'Start with the free placement test and we will help you pick the right track.',
    cta: 'Book now',
    whatsapp: 'Ask us on WhatsApp',
  },
  next: { starts: 'Next group starts', seats: (n) => (n === 1 ? '1 seat left' : `${n} seats left`), locale: 'en-GB' },
  trackPage: {
    back: 'All tracks',
    ages: 'By age',
    tools: 'Tools',
    builds: 'Students build',
    projects: 'Example projects in this track',
    projectsNote: 'Photos of our students\' projects coming soon',
    how: 'How a month works',
    howItems: [
      '6 sessions a month, 3 hours each',
      'Fridays and Saturdays at Hive Co-working Space, Fayoum',
      'Groups of 6 to 12 with an instructor and an assistant',
      'Each month ends with a project the student presents, and a certificate',
      'Three progress reports for parents every month',
    ],
    cta: 'Not sure this track fits your child?',
    ctaText: 'The free placement test suggests the closest track for your child.',
    test: 'Start the free test',
    whatsapp: 'Ask us on WhatsApp',
    notTaught: 'This track starts from age 10.',
  },
  whatsappLabel: 'Message us on WhatsApp',
  whatsappText: 'Hello TechSeeds, I would like to know more about your courses.',
  footer: {
    test: 'Placement test',
    whatsapp: 'WhatsApp',
    address: 'Hive Co-working Space, Ahmed Shawky St., Fayoum',
    facebook: 'Facebook',
    instagram: 'Instagram',
    rights: 'All rights reserved',
    slogan: 'Growing Young Minds',
    photos: 'Some photos are temporary, from Pexels',
  },
};

export const SITE: Record<Lang, SiteContent> = { ar, en };

/** A wa.me link that opens with a ready-made message. */
export function whatsappLink(number: string, text: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
