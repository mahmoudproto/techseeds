/**
 * All landing page text, in Arabic and English.
 * The Arabic page stays in Arabic; English appears only in tool names (shown as tags).
 * Track details live in tracks.ts, photos in media.ts.
 */

import type { IconName } from '@/components/LandingIcon';
import type { ProjectShot } from '@/lib/tracks';

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
  why: Head & { text: string; items: (Tinted & { title: string; text: string })[]; founder: { title: string; quote: string; name?: string } };
  team: Head & { text: string; roles: { title: string; text: string }[] };
  tracks: Head & { text: string; tabs: string; more: string; tools: string };
  how: Head & { sub: string; cta: string; steps: { n: string; title: string; text: string }[] };
  workshop: Head & { text: string; points: { title: string; text: string }[]; place: string; address: string; mapTitle: string; mapOpen: string };
  projects: Head & { text: string; note: string; items: { track: string; title: string; text: string; tint: Tinted['tint']; img?: ProjectShot }[] };
  reviews: Head & { sub: string; hint: string; parent: string; items: { name: string; text: string }[] };
  faq: Head & { items: { q: string; a: string }[] };
  final: { title: string; text: string; cta: string; whatsapp: string };
  next: { starts: string; seats: (n: number) => string; locale: string };
  trackPage: {
    others: string; open: string; prev: string; next: string; close: string; hint: string;
    back: string; ages: string; tools: string; builds: string; projects: string; projectsNote: string; shots: string;
    how: string; howItems: string[]; cta: string; ctaText: string; test: string; whatsapp: string; notTaught: string;
    instructor: string; instructorF: string; instructors: string; instructorSoon: string; cards: string; trainersTitle: string; trainersPick: string;
    gains: string; skills: string; skillItems: { title: string; text: string }[];
    journey: string; level: (n: number) => string; finalProject: string; prereq: string;
    guarantee: { title: string; text: string };
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
    { href: '/#why', label: 'لماذا نحن؟' },
    { href: '/#tracks', label: 'المسارات' },
    { href: '/#workshop', label: 'ورشة الأهل' },
    { href: '/#reviews', label: 'آراء الأهل' },
    { href: '/#faq', label: 'الأسئلة الشائعة' },
    { href: '/#contact', label: 'تواصل معنا' },
  ],
  header: { test: 'اختبار مجاني', whatsapp: 'تواصل معنا', menu: 'القائمة' },
  hero: {
    title: 'مش بس بنعلّم\nال AI والبرمجة...',
    highlight: 'بنعلّم طفلك\nينتج ويبدع بيهم',
    lead: 'في تك سيدز، طفلك بيتعلم البرمجة والتكنولوجيا خطوة بخطوة، وسط مجموعة صغيرة، ومعاه مدرّب ومساعد يتابعوه. والأهم إنه في نهاية كل شهر بيطلع بمشروع عمله بنفسه ويقدر يشرحه ويعرضه.',
    cta: 'ابدأ اختبار تحديد المستوى المجاني',
    whatsapp: 'كلّمنا على واتساب',
    note: 'يستغرق حوالي 10 دقائق',
  },
  stats: [
    { icon: 'cap', tint: 'green', color: GREEN, value: 'من 6 إلى 18 سنة', label: 'بمجموعات مقسّمة حسب السن' },
    { icon: 'layers', tint: 'blue', color: BLUE, value: '4 مسارات', label: 'الذكاء الاصطناعي، البرمجة، الأمن السيبراني، وتطوير الألعاب' },
    { icon: 'users', tint: 'yellow', color: AMBER, value: 'من 6 إلى 12 طالبًا', label: 'في المجموعة' },
    { icon: 'pair', tint: 'green', color: GREEN, value: 'مدرّب ومساعد', label: 'مع كل مجموعة' },
  ],
  why: {
    kicker: 'لماذا تك سيدز؟',
    title: 'كل طفل يستحق فرصة يفهم ويتعلّم',
    text: 'مش بنقيس نجاحنا بسرعة الطفل في الحل؛ بنقيسه بقد إيه فهم، وجرّب، واتعلم من أخطائه. في الكلاس، المدرّب بيقدر يتابع كل طفل: إمتى فهم الفكرة، وإمتى محتاج شرح تاني، وإمتى متردد يسأل. عشان كده بنشتغل في مجموعات صغيرة، علشان كل طفل ياخد فرصته في التعلّم والمشاركة.',
    items: [
      { icon: 'report', tint: 'blue', color: BLUE, title: 'متابعة حقيقية للأهل', text: 'خلال كل شهر، بتوصلكم 3 تقارير متابعة بعد تاني ورابع وسادس سيشن. التقارير بتوضح طفلك اتعلم إيه، وإيه اللي محتاج يشتغل عليه أو ياخد فيه دعم.' },
      { icon: 'parents', tint: 'yellow', color: AMBER, title: 'ورشة مجانية للأهل', text: 'كل يوم أحد بنستضيف ورشة مجانية في ⁨Hive Co‑working Space⁩. بنشرح فيها طريقة التعليم عندنا، وإزاي بنساعد طفلك، وإيه دوركم في البيت. إحنا شركاء في رحلة تعلّمه.' },
      { icon: 'guarantee', tint: 'green', color: GREEN, title: 'ضمان استرداد قيمة الشهر', text: 'لو طفلك حضر 5 سيشنز على الأقل من أصل 6، وما قدرش يكمّل مشروع الشهر، تقدروا تطلبوا استرداد قيمة الشهر. لازم يتقدّم الطلب خلال 7 أيام من آخر سيشن.' },
    ],
    founder: {
      title: 'رحلتنا وهدفنا',
      quote: 'بدأنا تك سيدز في 2025 بعد ما لاحظنا إن بعض الأطفال في كورسات البرمجة الأونلاين ممكن يتأخروا من غير ما حد ياخد باله، بسبب زحمة المجموعات أو ضعف التواصل أو صعوبة متابعة كل طفل. المدرّب محتاج يشوف الطفل وهو بيتعلم، ويعرف إمتى فهم وإمتى محتاج مساعدة. عشان كده اخترنا التعليم وجهًا لوجه، في مجموعات صغيرة، بحيث كل طفل ياخد فرصته ويبني أول مشروع بإيده.',
    },
  },
  team: {
    kicker: 'فريق التدريس',
    title: 'مدرّب ومساعد مع كل مجموعة',
    text: 'نفس فريق التدريس بيتابع المجموعة طوال الشهر، وده بيساعده يعرف الأطفال وطريقة تعلّم كل واحد فيهم.',
    roles: [
      { title: 'المدرّب', text: 'بيشرح الفكرة، ويسأل أسئلة تساعد الطفل يفكر ويوصل للحل بنفسه. الطفل هو اللي بيكتب ويجرّب.' },
      { title: 'المساعد', text: 'بيتابع الأطفال واحد واحد، وبيتدخل وقت ما حد يحتاج مساعدة، علشان محدش يفضل واقف أو محتار.' },
    ],
  },
  tracks: {
    kicker: 'المسارات حسب السن',
    title: 'كل سن له مساراته ومحتوى مناسب ليه',
    text: 'اختاروا الفئة العمرية لطفلكم علشان تتعرفوا على المسارات المناسبة ليه. كل مجموعة بتتعلم بمحتوى وأدوات تناسب مرحلتها.',
    tabs: 'اختر سن طفلك',
    more: 'اعرف أكثر عن المسار',
    tools: 'الأدوات',
  },
  how: {
    kicker: 'بسيطة وواضحة',
    title: 'كيف نبدأ معًا؟',
    sub: 'من أول اختبار تحديد المستوى لحد ما طفلك يعرض مشروعه.',
    cta: 'ابدأ بالخطوة الأولى',
    steps: [
      { n: '1', title: 'اختبار تحديد المستوى', text: 'اختبار مجاني قصير، مدته حوالي 10 دقائق. وللأطفال الأصغر سنًا، ممكن نعمل مقابلة قصيرة.' },
      { n: '2', title: 'اختيار المسار', text: 'بنرشّح المسار والمستوى المناسبين لسن الطفل واهتماماته ونتيجة الاختبار.' },
      { n: '3', title: 'التعلّم بالتجربة', text: '6 سيشنز حضورية في الشهر، مدة كل سيشن 3 ساعات، يومي الجمعة والسبت.' },
      { n: '4', title: 'المشروع والمتابعة', text: 'الطفل بيعرض المشروع اللي بناه بنفسه، وبتوصلكم 3 تقارير متابعة خلال الشهر.' },
    ],
  },
  workshop: {
    kicker: 'لأولياء الأمور فقط',
    title: 'تعالوا نتعرّف يوم الأحد',
    text: 'كل يوم أحد بنستضيف ورشة مجانية لأولياء الأمور في ⁨Hive Co‑working Space⁩.',
    points: [
      { title: 'مجانية ومن غير التزام', text: 'اتعرفوا على طريقة التعليم عندنا قبل ما تقرروا تبدأوا.' },
      { title: 'اتعرفوا على المكان والمدرّبين', text: 'شوفوا مكان الدراسة وقابلوا فريق التدريس.' },
      { title: 'اسألوا عن كل اللي يهمكم', text: 'نتكلم عن المسارات، وطريقة المتابعة، ودور الأهل في البيت.' },
    ],
    place: 'Hive Co-working Space',
    address: 'شارع أحمد شوقي، الفيوم، أمام فيلا المحافظ، أعلى My Office للأثاث (تالت عمارة من محل Black Hawk للملابس)',
    mapTitle: 'موقع Hive Co-working Space على خريطة جوجل',
    mapOpen: 'افتح في خرائط جوجل',
  },
  projects: {
    kicker: 'مشاريع الطلاب',
    title: 'كل شهر بينتهي بمشروع الطالب بيعمله بأيده',
    text: 'دي أمثلة للمشروعات اللي ممكن الطالب يبنيها ويعرضها بنفسه خلال رحلته التعليمية.',
    note: 'لقطات حقيقية من مشاريع طلابنا',
    items: [
      { track: 'الذكاء الاصطناعي', title: 'الكمبيوتر يميّز الصور', text: 'الطالب بيدرّب نموذج ذكاء اصطناعي يفرّق بين التفاح والموز بصور بيجمعها بنفسه، وبعدين يجرّبه على صور جديدة.', tint: 'green', img: 'aiTeachable' },
      { track: 'البرمجة', title: 'لعبة متاهة الكنز', text: 'الطالب بيكتب بلغة Python الكود اللي بيحرّك المستكشف خطوة بخطوة لحد ما يوصل للكنز.', tint: 'blue', img: 'progMaze' },
      { track: 'الأمن السيبراني', title: 'محاكاة شبكة وجهاز دخيل', text: 'الطالب بيبني شبكة لأقسام شركة في Cisco Packet Tracer، ويتتبع جهاز دخيل بيحاول يوصل لباقي الأجهزة.', tint: 'mint', img: 'cyberNetwork' },
      { track: 'تطوير الألعاب', title: 'لعبة سفينة الفضاء', text: 'سفينة بتتحرك في كل الاتجاهات، وبتطلق الليزر على الكويكبات، وتجمع درع حماية، ومعاها 3 أرواح.', tint: 'yellow', img: 'gameShield' },
    ],
  },
  reviews: {
    kicker: 'آراء أولياء الأمور',
    title: 'بكلمات الأهل أنفسهم',
    sub: 'ثقتكم ودعمكم بتساعدنا نطوّر ونكمّل.',
    hint: 'اسحب لقراءة المزيد',
    parent: 'ولي أمر',
    items: [
      { name: 'منة الله كمال', text: 'تجربة أكثر من رائعة! ابني كان مبسوط جدًا بالكورس وعمل لعبة حلوة أوي، وعلى طول حسيت بالاختلاف في شخصيته وتقديره للوقت والإنتاج. لقيته من نفسه عمل ليمت للفيس بوك والتيك توك، وبقى يقضي وقت أكتر ينجز التاسكات، وبقى بيساعدنا في البيت أكتر وقلّت عصبيته كتير.' },
      { name: 'ابتهال مصطفى', text: 'الكورس غيّر تمامًا نظرة ابني للبرمجة! مكنش عنده أي شغف بيها قبل كده، لكن دلوقتي بقى مهتم جدًا ومستني يروح كل سيشن. كمان بقى بيقضي وقت أقل بكتير على الموبايل. وفريق الأكاديمية محترم جدًا ومتعاون ومهتم بكل التفاصيل.' },
      { name: 'ندى عماد', text: 'الصراحة التعامل مع الأطفال ممتاز والمحتوى مناسب جدًا لسن الأطفال.' },
      { name: 'وائل', text: 'تجربة فوق الممتازة، ومبسوط جدًا إن ابني بقى يعرف المعلومات دي، وأثّرت في تركيزه ومذاكرته وتفاعله معانا في البيت.' },
      { name: 'حسام', text: 'هو مبسوط جدًا وعنده إقبال على الكورس وبيكون سعيد وهو رايح. شكر خاص للمهندسة على بساطتها في التعامل وتحبيب ابني في الكورس، وإزاي اتعاملت مع سن صغير وبسّطتله ووصّلتله المعلومة.' },
      { name: 'منى', text: 'مبسوط جدًا جدًا وبيفهم طبعًا، وجاي متحمس عايز يعمل التاسك. هو ما شاء الله بيحب الكمبيوتر والتكنولوجيا الحديثة جدًا.' },
    ],
  },
  faq: {
    kicker: 'أسئلة شائعة',
    title: 'كل اللي محتاجين تعرفوه قبل ما تبدأوا',
    items: [
      { q: 'إزاي أسجّل طفلي؟', a: 'ابدأوا باختبار تحديد المستوى المجاني على الموقع. الاختبار حوالي 10 دقائق، وللأطفال الأصغر ممكن نعمل مقابلة قصيرة. بعد كده نتواصل معاكم على واتساب ونرشّح المسار والمجموعة المناسبة.' },
      { q: 'هل طفل عنده 6 سنين بيدرس مع طالب عنده 18 سنة؟', a: 'لأ. المجموعات متقسمة حسب السن: من 6 إلى 9 سنين، ومن 10 إلى 13 سنة، ومن 14 إلى 18 سنة، وكل فئة ليها محتوى وأدوات مناسبة.' },
      { q: 'كام سيشن في الشهر؟', a: '6 سيشنز في الشهر، مدة كل سيشن 3 ساعات، بإجمالي 18 ساعة في الشهر.' },
      { q: 'الدراسة فين وإمتى؟', a: 'يومي الجمعة والسبت في ⁨Hive Co‑working Space⁩، شارع أحمد شوقي، الفيوم.' },
      { q: 'كام طالب في المجموعة؟', a: 'من 6 إلى 12 طالبًا، ومع كل مجموعة مدرّب ومساعد.' },
      { q: 'إيه هي ورشة الأهل؟', a: 'لقاء مجاني كل يوم أحد بنشرح فيه طريقة التعليم ودوركم في البيت، وبتتعرفوا على المكان والمدرّبين. تقدروا تحجزوها من نفس الصفحة.' },
      { q: 'هل لازم الطفل يكون عنده خبرة سابقة؟', a: 'لأ. اختبار تحديد المستوى المجاني بيساعدنا نعرف نقطة البداية المناسبة للطفل ونرشّح له المستوى الأقرب.' },
      { q: 'هل الطالب بياخد شهادة؟', a: 'أيوه، الطالب بيحصل على شهادة إتمام بعد كل شهر يكمّل فيه المشروع.' },
      { q: 'إيه اللي بيحصل لو طفلي ما كمّلش المشروع؟', a: 'لو حضر 5 سيشنز على الأقل من أصل 6 وما قدرش يكمّل مشروع الشهر، تقدروا تطلبوا استرداد قيمة الشهر. لازم الطلب يتقدّم خلال 7 أيام من آخر سيشن.' },
    ],
  },
  final: {
    title: 'جاهز يبدأ طفلك\nأول مشروع ليه؟',
    text: 'ابدأوا باختبار تحديد المستوى المجاني، وإحنا هنساعدكم تختاروا المسار المناسب لطفلكم.',
    cta: 'احجزوا الآن',
    whatsapp: 'اسألونا على واتساب',
  },
  next: { starts: 'المجموعة القادمة تبدأ', seats: (n) => (n === 1 ? 'باقي مكان واحد' : n === 2 ? 'باقي مكانان' : n <= 10 ? `باقي ${n} أماكن` : `باقي ${n} مكانًا`), locale: 'ar-EG-u-nu-latn' },
  trackPage: {
    others: 'أو اختار مسار تاني',
    open: 'اضغط على البطاقة لتكبيرها',
    prev: 'السابق',
    next: 'التالي',
    close: 'إغلاق',
    hint: 'البطاقة',
    back: 'كل المسارات',
    ages: 'حسب السن',
    tools: 'الأدوات',
    builds: 'الطالب يبني',
    projects: 'مشاريع حقيقية',
    projectsNote: '',
    shots: 'من مشاريع طلابنا',
    how: 'إزاي بنعلّم؟',
    howItems: [
      'كل مستوى مدته شهر: 6 سيشنز، مدة السيشن 3 ساعات',
      'السيشنز من 1 لـ 3 مهارات جديدة، والرابعة مراجعة وتدريب، والخامسة والسادسة للمشروع النهائي وعرضه',
      'مجموعات صغيرة من 6 لـ 12 طالب، ومعاهم مدرّب ومساعد في كل سيشن',
      '⁨Zero‑Keyboard⁩: المدرّب بيسأل، وطفلك هو اللي بيكتب ويوصل للحل',
      'نفس فريق المدرّبين طول المستوى',
      '3 تقارير متابعة لولي الأمر في كل مستوى، بعد تاني ورابع وسادس سيشن',
      'شهادة إتمام في نهاية كل مستوى',
      'أيام الجمعة والسبت في ⁨Hive Co‑working Space⁩ بالفيوم',
    ],
    cta: 'مش متأكد إذا كان المسار ده مناسب لطفلك؟',
    ctaText: 'اختبار تحديد المستوى المجاني يرشّح لك المسار الأقرب لطفلك.',
    test: 'ابدأ الاختبار المجاني',
    whatsapp: 'اسألنا على واتساب',
    notTaught: 'هذا المسار يبدأ من سن 10 سنوات.',
    instructor: 'مدرّب المسار',
    instructorF: 'مدرّبة المسار',
    instructors: 'مدرّبين المسار',
    instructorSoon: 'الصورة والاسم قريبًا',
    trainersTitle: 'تعرّف على مدرّبي المسار',
    trainersPick: 'اختر مدرّبًا لتعرف خبرته',
    cards: 'صور من المسار، اضغط على أي صورة لتظهر في المقدمة',
    gains: 'طفلك هيطلع بإيه',
    skills: 'مهارات التفكير اللي بنبنيها',
    skillItems: [
      { title: 'حل المشكلات', text: 'يقسّم المشكلة الكبيرة لخطوات صغيرة' },
      { title: 'التركيز والمثابرة', text: 'يفضل مع التحدي لحد ما يشتغل' },
      { title: 'التعلّم من الغلط', text: 'تصحيح الأخطاء عادة، مش فشل' },
      { title: 'التعاطف', text: 'يفكر في المستخدم، ويساعد زميله من غير ما يعمل الحاجة بداله' },
      { title: 'التواصل', text: 'يشرح شغله ويعرضه بنفسه' },
    ],
    journey: 'الرحلة مستوى بمستوى',
    level: (n) => `المستوى ${n}`,
    finalProject: 'المشروع النهائي:',
    prereq: 'قبل ما يبدأ:',
    guarantee: {
      title: 'ضمان استرداد قيمة المستوى',
      text: 'لو طفلك حضر 5 سيشنز على الأقل من 6 في المستوى وما خلّصش المشروع النهائي، بنرجّعلكم قيمة المستوى ده. الطلب بيكون خلال 7 أيام من آخر سيشن.',
    },
  },
  whatsappLabel: 'تواصل معنا على واتساب',
  whatsappText: 'عايز أعرف تفاصيل أكتر عن الكورسات.',
  footer: {
    test: 'اختبار تحديد المستوى',
    whatsapp: 'واتساب',
    address: 'Hive Co-working Space، شارع أحمد شوقي، الفيوم',
    facebook: 'فيسبوك',
    instagram: 'إنستجرام',
    rights: 'جميع الحقوق محفوظة',
    slogan: 'ننمي عقول المستقبل',
    photos: 'بعض الصور مؤقتة من Pexels',
  },
};

const en: SiteContent = {
  arrow: '→',
  home: '/en',
  other: { label: 'العربية', href: '/' },
  nav: [
    { href: '/en#why', label: 'Why us?' },
    { href: '/en#tracks', label: 'Tracks' },
    { href: '/en#workshop', label: 'Parents workshop' },
    { href: '/en#reviews', label: 'Reviews' },
    { href: '/en#faq', label: 'FAQ' },
    { href: '/en#contact', label: 'Contact' },
  ],
  header: { test: 'Free test', whatsapp: 'Contact us', menu: 'Menu' },
  hero: {
    title: 'We don\'t just teach\nAI and coding...',
    highlight: 'we teach your child\nto create with them',
    lead: 'At TechSeeds your child learns coding and technology step by step, in a small group, with an instructor and an assistant following their progress. Best of all, every month ends with a project they built themselves and can explain and present.',
    cta: 'Start the free placement test',
    whatsapp: 'Message us on WhatsApp',
    note: 'Takes about 10 minutes (in Arabic)',
  },
  stats: [
    { icon: 'cap', tint: 'green', color: GREEN, value: 'Ages 6 to 18', label: 'grouped by age' },
    { icon: 'layers', tint: 'blue', color: BLUE, value: '4 tracks', label: 'AI, programming, cybersecurity, games' },
    { icon: 'users', tint: 'yellow', color: AMBER, value: '6 to 12 students', label: 'in each group' },
    { icon: 'pair', tint: 'green', color: GREEN, value: 'Instructor + assistant', label: 'with every group' },
  ],
  why: {
    kicker: 'Why TechSeeds?',
    title: 'Every child deserves a chance to understand and learn',
    text: 'We don\'t measure success by how fast a child solves a problem, but by how much they understood, tried and learned from their mistakes. In class the instructor follows every child: when they get the idea, when they need it explained again, and when they are too shy to ask. That is why we work in small groups, so every child gets their turn to learn and take part.',
    items: [
      { icon: 'report', tint: 'blue', color: BLUE, title: 'Real follow-up for parents', text: 'Each month you get 3 progress reports, after the second, fourth and sixth sessions, showing what your child learned and what they need to work on or get support with.' },
      { icon: 'parents', tint: 'yellow', color: AMBER, title: 'A free parents\' workshop', text: 'Every Sunday we explain our method and your role at home. We are partners, not just a service.' },
      { icon: 'guarantee', tint: 'green', color: GREEN, title: 'Money back for the month', text: 'If your child attends at least 5 of 6 sessions and cannot finish the month\'s project, you can ask for that month\'s fee back, within 7 days of the last session.' },
    ],
    founder: {
      title: 'Our story and our aim',
      quote: 'We started TechSeeds in 2025 after noticing that some children in online coding courses fall behind without anyone noticing, because of crowded groups, weak communication or how hard it is to follow each child. An instructor needs to see a child learning, to know when they understood and when they need help. So we chose face-to-face teaching in small groups, where every child gets their turn and builds their first project with their own hands.',
    },
  },
  team: {
    kicker: 'Our teaching team',
    title: 'An instructor and an assistant with every group',
    text: 'The same team stays with the group all month and knows every child by name and by how they think.',
    roles: [
      { title: 'The instructor', text: 'Explains the idea and asks questions; the child does the typing and reaches the answer.' },
      { title: 'The assistant', text: 'Goes round the children one by one, so help arrives when it is needed.' },
    ],
  },
  tracks: {
    kicker: 'Tracks by age',
    title: 'Every age has its own tracks and content',
    text: 'Choose your child\'s age group to see the tracks that suit them. Each group learns with content and tools made for its stage.',
    tabs: 'Choose your child\'s age',
    more: 'Learn more about this track',
    tools: 'Tools',
  },
  how: {
    kicker: 'Simple and clear',
    title: 'How do we start together?',
    sub: 'Four steps from the first call to your child presenting their project.',
    cta: 'Take the first step',
    steps: [
      { n: '1', title: 'Placement test', text: 'A short free test, about 10 minutes.' },
      { n: '2', title: 'Choose a track', text: 'We suggest the track that fits their age and interests.' },
      { n: '3', title: 'Learn by doing', text: '6 in-person sessions, 3 hours each.' },
      { n: '4', title: 'Project and follow-up', text: 'They present their own project, and you get three reports.' },
    ],
  },
  workshop: {
    kicker: 'For parents only',
    title: 'Come and meet us on Sunday',
    text: 'Every Sunday we host a free workshop for parents: our method, how we will help your child, and your role at home.',
    points: [
      { title: 'Free, no commitment', text: 'See how we teach before you decide to start.' },
      { title: 'Meet the team and the place', text: 'See where classes happen and meet the teaching team.' },
      { title: 'Ask about anything', text: 'We talk about the tracks, how we follow up, and the parents\' role at home.' },
    ],
    place: 'Hive Co-working Space',
    address: 'Ahmed Shawky St., Fayoum, opposite the Governor\'s villa, above My Office furniture (third building from Black Hawk clothing)',
    mapTitle: 'Hive Co-working Space on Google Maps',
    mapOpen: 'Open in Google Maps',
  },
  projects: {
    kicker: 'Student projects',
    title: 'Every month ends with a project the student builds by hand',
    text: 'Examples of projects our students build with their own hands and present themselves.',
    note: 'Real screenshots of our students\' work',
    items: [
      { track: 'AI', title: 'Teaching a computer to tell pictures apart', text: 'The student trains an AI model to tell apples from bananas using pictures they collect, then tests it on new ones.', tint: 'green', img: 'aiTeachable' },
      { track: 'Programming', title: 'Treasure maze game', text: 'The student writes the Python code that moves the explorer, step by step, to the treasure.', tint: 'blue', img: 'progMaze' },
      { track: 'Cybersecurity', title: 'A network and a rogue device', text: 'The student builds a company network in Cisco Packet Tracer and traces a rogue device trying to reach the other computers.', tint: 'mint', img: 'cyberNetwork' },
      { track: 'Game Development', title: 'Spaceship game', text: 'A ship that flies in every direction, fires lasers at asteroids, picks up a shield and has three lives.', tint: 'yellow', img: 'gameShield' },
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
      { q: 'How many sessions a month?', a: '6 sessions a month, 3 hours each: 18 hours a month.' },
      { q: 'Where and when are classes?', a: 'Fridays and Saturdays at Hive Co-working Space, Ahmed Shawky St., Fayoum.' },
      { q: 'How big are the groups?', a: '6 to 12 students only, with an instructor and an assistant in every group.' },
      { q: 'What is the parents\' workshop?', a: 'A free meeting every Sunday where we explain our method and your role at home, and you meet the team. You can book it on this page.' },
      { q: 'Does my child need any experience?', a: 'No. The free placement test shows us the right starting point and the closest level for your child.' },
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
    others: 'Or choose another track',
    open: 'Tap a card to enlarge it',
    prev: 'Previous',
    next: 'Next',
    close: 'Close',
    hint: 'Card',
    back: 'All tracks',
    ages: 'By age',
    tools: 'Tools',
    builds: 'Students build',
    projects: 'Real projects',
    projectsNote: '',
    shots: 'From our students\' projects',
    how: 'How we teach',
    howItems: [
      'Every level is one month: 6 sessions, 3 hours each',
      'Sessions 1–3 bring new skills, session 4 is review and practice, and sessions 5–6 are the final project and presentation',
      'Small groups of 6 to 12, with an instructor and an assistant in every class',
      'Zero-Keyboard: the instructor asks, your child types and finds the answer',
      'The same instructor team for the whole level',
      '3 progress reports per level, after sessions 2, 4 and 6',
      'A certificate at the end of every level',
      'Fridays and Saturdays at Hive Co-working Space, Fayoum',
    ],
    cta: 'Not sure this track fits your child?',
    ctaText: 'The free placement test suggests the closest track for your child.',
    test: 'Start the free test',
    whatsapp: 'Ask us on WhatsApp',
    notTaught: 'This track starts from age 10.',
    instructor: 'Track instructor',
    instructorF: 'Track instructor',
    instructors: 'Track instructors',
    instructorSoon: 'Photo and name coming soon',
    trainersTitle: 'Meet the track’s instructors',
    trainersPick: 'Choose an instructor to see their experience',
    cards: 'Pictures from this track; click one to bring it to the front',
    gains: 'What your child gains',
    skills: 'Thinking skills we build',
    skillItems: [
      { title: 'Problem solving', text: 'Breaking a big problem into small steps' },
      { title: 'Focus and persistence', text: 'Staying with a challenge until it works' },
      { title: 'Learning from mistakes', text: 'Debugging as a habit, not a failure' },
      { title: 'Empathy', text: 'Thinking about the user, and helping a teammate without taking over' },
      { title: 'Communication', text: 'Explaining and presenting their own work' },
    ],
    journey: 'The journey, level by level',
    level: (n) => `Level ${n}`,
    finalProject: 'Final project:',
    prereq: 'Before starting:',
    guarantee: {
      title: 'Money-back guarantee',
      text: "If your child attends at least 5 of the level's 6 sessions and doesn't complete the final project, we refund that level. Claim within 7 days of the last session.",
    },
  },
  whatsappLabel: 'Message us on WhatsApp',
  whatsappText: 'I would like to know more about your courses.',
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
