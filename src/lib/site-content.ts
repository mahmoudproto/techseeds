import type { IconName } from '@/components/LandingIcon';

export type Lang = 'ar' | 'en';

interface Tinted {
  icon: IconName;
  tint: 'green' | 'blue' | 'yellow' | 'mint';
  color: string;
}

export interface SiteContent {
  arrow: string;
  home: string;
  other: { label: string; href: string };
  nav: { href: string; label: string }[];
  header: { test: string; whatsapp: string; menu: string };
  hero: { title: string; lead: string; cta: string; whatsapp: string; };
  stats: (Tinted & { value: string; label: string })[];
  about: { eyebrow: string; title: string; text: string;  pillars: { icon: IconName; lines: [string, string] }[] };
  programs: { eyebrow: string; title: string; text: string; items: (Tinted & { name: string; ages: string; note: string })[] };
  how: { eyebrow: string; title: string; sub: string; cta: string; steps: { n: string; title: string; text: string }[] };
  why: { eyebrow: string; title: string; items: (Tinted & { title: string; text: string })[] };
  reviews: { eyebrow: string; title: string; sub: string; hint: string; items: { name: string; text: string }[] };
  banner: { title: string; text: string; cta: string };
  footer: { test: string; whatsapp: string; address: string; facebook: string; instagram: string; rights: string };
}

const GREEN = '#2fa84f';
const BLUE = '#3eaae5';
const AMBER = '#d99a00';

const ar: SiteContent = {
  arrow: '←',
  home: '/',
  other: { label: 'English', href: '/en' },
  nav: [
    { href: '/#home', label: 'الرئيسية' },
    { href: '/#about', label: 'عن الأكاديمية' },
    { href: '/#programs', label: 'البرامج' },
    { href: '/#why', label: 'لماذا نحن' },
    { href: '/#reviews', label: 'آراء أولياء الأمور' },
    { href: '/#contact', label: 'تواصل معنا' },
  ],
  header: { test: 'اختبار مجاني', whatsapp: 'تواصل معنا', menu: 'القائمة' },
  hero: {
    title: 'أكاديمية متخصصة في تعليم البرمجة والتكنولوجيا للأطفال والناشئين',
    lead: 'نساعد أطفالك على اكتشاف عالم التكنولوجيا من خلال تجربة تعليمية حضورية، عملية وتفاعلية، تنمّي مهاراتهم وطريقة تفكيرهم وتعدّهم لمستقبلهم الرقمي.',
    cta: 'ابدأ اختبار تحديد المستوى',
    whatsapp: 'تواصل معنا عبر واتساب',
  },
  stats: [
    { icon: 'cap', tint: 'green', color: GREEN, value: '6 - 18', label: 'سنة' },
    { icon: 'layers', tint: 'blue', color: BLUE, value: '4 مسارات', label: 'برمجة · ألعاب · ذكاء اصطناعي · أمن سيبراني' },
    { icon: 'users', tint: 'yellow', color: AMBER, value: '6 - 12 طالب', label: 'في المجموعة الواحدة' },
    { icon: 'pair', tint: 'green', color: GREEN, value: 'مدرب ومساعد', label: 'في كل مجموعة' },
  ],
  about: {
    eyebrow: 'About TechSeeds',
    title: 'من نحن؟',
    text: 'TechSeeds أكاديمية تكنولوجيا حضورية في الفيوم للأطفال والشباب من 6 إلى 18 سنة. بدأنا في 2025 من ملاحظة واحدة: أغلب الأطفال لا يتعلمون جيدًا في الكورسات الأونلاين، فاخترنا أن نعلّم وجهًا لوجه في مجموعات صغيرة. التكنولوجيا عندنا وسيلة، وعقل الطفل هو الهدف.',
    pillars: [
      { icon: 'hands', lines: ['تعليم حضوري', 'عملي وتطبيقي'] },
      { icon: 'board', lines: ['مدرب ومساعد', 'في كل مجموعة'] },
      { icon: 'project', lines: ['مشروع يبنيه', 'الطالب كل شهر'] },
      { icon: 'group', lines: ['مجموعات صغيرة', 'من 6 إلى 12 طالب'] },
    ],
  },
  programs: {
    eyebrow: 'Our Programs',
    title: 'برامجنا التعليمية',
    text: 'أربعة مسارات، وكل مسار مقسّم حسب السن إلى مستويات. المستوى شهر واحد: 6 حصص، كل حصة 3 ساعات، وينتهي بمشروع يبنيه الطالب ويعرضه بنفسه.',
    items: [
      { icon: 'code', tint: 'blue', color: BLUE, name: 'البرمجة', ages: 'من 6 إلى 18 سنة', note: 'mBlock · Python · JavaScript' },
      { icon: 'game', tint: 'yellow', color: AMBER, name: 'تطوير الألعاب', ages: 'من 10 إلى 18 سنة', note: 'GameMaker · Unity' },
      { icon: 'ai', tint: 'green', color: GREEN, name: 'الذكاء الاصطناعي', ages: 'من 6 إلى 18 سنة', note: 'أدوات AI لمهام ومشاريع حقيقية' },
      { icon: 'shield', tint: 'mint', color: GREEN, name: 'الأمن السيبراني', ages: 'من 10 إلى 18 سنة', note: 'حماية الأنظمة وتحديات CTF' },
    ],
  },
  how: {
    eyebrow: 'How It Works',
    title: 'كيف نعمل؟',
    sub: 'رحلة تعليمية منظمة وممتعة تبدأ من أول يوم',
    cta: 'ابدأ بالخطوة الأولى',
    steps: [
      { n: '01', title: 'تحديد المستوى', text: 'اختبار مجاني قصير لمعرفة مستوى الطفل' },
      { n: '02', title: 'اختيار المسار', text: 'بما يناسب سن الطفل واهتماماته' },
      { n: '03', title: 'التعلم العملي', text: 'مشروع حقيقي يبنيه الطالب كل شهر' },
      { n: '04', title: 'المتابعة والتقييم', text: 'ثلاثة تقارير لولي الأمر في كل مستوى' },
    ],
  },
  why: {
    eyebrow: 'Why TechSeeds',
    title: 'لماذا نحن؟',
    items: [
      { icon: 'report', tint: 'blue', color: BLUE, title: 'تقارير متابعة للأهل', text: 'ثلاثة تقارير في كل مستوى توضح ما تعلمه طفلك وما يحتاج فيه إلى دعم.' },
      { icon: 'parents', tint: 'yellow', color: AMBER, title: 'ورشة مجانية لأولياء الأمور', text: 'كل يوم أحد نشرح طريقتنا ودوركم في البيت. نحن شركاء، لا مجرد مقدمي خدمة.' },
      { icon: 'guarantee', tint: 'green', color: GREEN, title: 'ضمان استرداد قيمة المستوى', text: 'إذا حضر طفلك 5 حصص على الأقل من 6 ولم يُكمل مشروع المستوى، نرد لكم قيمة هذا المستوى.' },
    ],
  },
  reviews: {
    eyebrow: 'What Parents Say',
    title: 'آراء أولياء الأمور',
    sub: 'ثقتكم هي دافعنا للاستمرار',
    hint: 'اسحب لقراءة المزيد',
    items: [
      { name: 'منة الله كمال', text: 'تجربة أكثر من رائعة! ابني كان مبسوط جدًا بالكورس وعمل لعبة حلوة أوي، وعلى طول حسيت بالاختلاف في شخصيته وتقديره للوقت والإنتاج. لقيته من نفسه عمل ليمت للفيس بوك والتيك توك، وبقى يقضي وقت أكتر ينجز التاسكات، وبقى بيساعدنا في البيت أكتر وقلّت عصبيته كتير.' },
      { name: 'ابتهال مصطفى', text: 'الكورس غيّر تمامًا نظرة ابني للبرمجة! مكنش عنده أي شغف بيها قبل كده، لكن دلوقتي بقى مهتم جدًا ومستني يروح كل سيشن. كمان بقى بيقضي وقت أقل بكتير على الموبايل. وفريق الأكاديمية محترم جدًا ومتعاون ومهتم بكل التفاصيل.' },
      { name: 'ندى عماد', text: 'الصراحة التعامل مع الأطفال ممتاز والمحتوى مناسب جدًا لسن الأطفال.' },
      { name: 'وائل، ولي أمر', text: 'تجربة فوق الممتازة، ومبسوط جدًا إن ابني بقى يعرف المعلومات دي، وأثّرت في تركيزه ومذاكرته وتفاعله معانا في البيت.' },
      { name: 'حسام، ولي أمر', text: 'هو مبسوط جدًا وعنده إقبال على الكورس وبيكون سعيد وهو رايح. شكر خاص للمهندسة على بساطتها في التعامل وتحبيب ابني في الكورس، وإزاي اتعاملت مع سن صغير وبسّطتله ووصّلتله المعلومة.' },
      { name: 'ولية أمر', text: 'مبسوط جدًا جدًا وبيفهم طبعًا، وجاي متحمس عايز يعمل التاسك. هو ما شاء الله بيحب الكمبيوتر والتكنولوجيا الحديثة جدًا.' },
    ],
  },
  banner: {
    title: 'هل أنت مستعد لبدء رحلة طفلك في عالم التكنولوجيا؟',
    text: 'ابدأ باختبار تحديد المستوى المجاني، ويستغرق حوالي 10 دقائق.',
    cta: 'ابدأ الاختبار الآن',
  },
  footer: {
    test: 'اختبار تحديد المستوى',
    whatsapp: 'واتساب',
    address: 'Hive Co-working Space، شارع أحمد شوقي، الفيوم',
    facebook: 'فيسبوك',
    instagram: 'إنستجرام',
    rights: 'جميع الحقوق محفوظة',
  },
};

const en: SiteContent = {
  arrow: '→',
  home: '/en',
  other: { label: 'العربية', href: '/' },
  nav: [
    { href: '/en#home', label: 'Home' },
    { href: '/en#about', label: 'About' },
    { href: '/en#programs', label: 'Programs' },
    { href: '/en#why', label: 'Why us' },
    { href: '/en#reviews', label: 'Parent reviews' },
    { href: '/en#contact', label: 'Contact' },
  ],
  header: { test: 'Free test', whatsapp: 'Contact us', menu: 'Menu' },
  hero: {
    title: 'An academy that teaches coding and technology to kids and teens',
    lead: 'We help your children discover technology through in-person, hands-on classes that build their skills and the way they think, and prepare them for a digital future.',
    cta: 'Take the placement test',
    whatsapp: 'Message us on WhatsApp',
  },
  stats: [
    { icon: 'cap', tint: 'green', color: GREEN, value: '6 - 18', label: 'years old' },
    { icon: 'layers', tint: 'blue', color: BLUE, value: '4 tracks', label: 'Programming · Games · AI · Cybersecurity' },
    { icon: 'users', tint: 'yellow', color: AMBER, value: '6 - 12 students', label: 'in each group' },
    { icon: 'pair', tint: 'green', color: GREEN, value: 'Instructor + assistant', label: 'in every group' },
  ],
  about: {
    eyebrow: 'About TechSeeds',
    title: 'Who are we?',
    text: 'TechSeeds is an in-person technology academy in Fayoum for ages 6 to 18. We started in 2025 from one observation: most children do not learn well in online courses. So we teach face to face, in small groups. For us technology is the tool, and the child\'s mind is the goal.',
    pillars: [
      { icon: 'hands', lines: ['In-person,', 'hands-on learning'] },
      { icon: 'board', lines: ['Instructor + assistant', 'in every group'] },
      { icon: 'project', lines: ['A project built', 'every month'] },
      { icon: 'group', lines: ['Small groups', 'of 6 to 12'] },
    ],
  },
  programs: {
    eyebrow: 'Our Programs',
    title: 'Our programs',
    text: 'Four tracks, each split by age into levels. A level is one month: 6 sessions of 3 hours each, ending with a project the student builds and presents.',
    items: [
      { icon: 'code', tint: 'blue', color: BLUE, name: 'Programming', ages: 'Ages 6 to 18', note: 'mBlock · Python · JavaScript' },
      { icon: 'game', tint: 'yellow', color: AMBER, name: 'Game Development', ages: 'Ages 10 to 18', note: 'GameMaker · Unity' },
      { icon: 'ai', tint: 'green', color: GREEN, name: 'Artificial Intelligence', ages: 'Ages 6 to 18', note: 'AI tools for real tasks and projects' },
      { icon: 'shield', tint: 'mint', color: GREEN, name: 'Cybersecurity', ages: 'Ages 10 to 18', note: 'Protecting systems and CTF challenges' },
    ],
  },
  how: {
    eyebrow: 'How It Works',
    title: 'How it works',
    sub: 'An organised, enjoyable learning journey from day one',
    cta: 'Start with step one',
    steps: [
      { n: '01', title: 'Placement', text: 'A short free test to find the child\'s level' },
      { n: '02', title: 'Choose a track', text: 'To match the child\'s age and interests' },
      { n: '03', title: 'Hands-on learning', text: 'A real project built every month' },
      { n: '04', title: 'Follow-up', text: 'Three reports for parents in every level' },
    ],
  },
  why: {
    eyebrow: 'Why TechSeeds',
    title: 'Why us?',
    items: [
      { icon: 'report', tint: 'blue', color: BLUE, title: 'Progress reports for parents', text: 'Three reports in every level show what your child learned and where they need support.' },
      { icon: 'parents', tint: 'yellow', color: AMBER, title: 'A free workshop for parents', text: 'Every Sunday we explain our method and your role at home. We are partners, not just a service.' },
      { icon: 'guarantee', tint: 'green', color: GREEN, title: 'Money-back guarantee per level', text: 'If your child attends at least 5 of the 6 sessions and does not finish the level project, we refund that level.' },
    ],
  },
  reviews: {
    eyebrow: 'What Parents Say',
    title: 'Parent reviews',
    sub: 'In the parents\' own words. Your trust keeps us going.',
    hint: 'Swipe to read more',
    items: [],
  },
  banner: {
    title: 'Ready to start your child\'s journey in technology?',
    text: 'Begin with the free placement test. It takes about 10 minutes and is in Arabic.',
    cta: 'Start the test now',
  },
  footer: {
    test: 'Placement test',
    whatsapp: 'WhatsApp',
    address: 'Hive Co-working Space, Ahmed Shawky St., Fayoum',
    facebook: 'Facebook',
    instagram: 'Instagram',
    rights: 'All rights reserved',
  },
};

export const SITE: Record<Lang, SiteContent> = { ar, en };
