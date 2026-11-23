import type { Strength, TestLang, Track } from './types';

/** Keeps a name in its own direction inside a sentence (an Arabic name in English text, or the reverse). */
const iso = (name: string) => `\u2068${name}\u2069`;

/** Every piece of on-screen text in the test, in Arabic and English. */
export interface TestText {
  arrow: string;
  welcome: {
    title: string;
    lead: string;
    chips: [string, string, string];
    name: string;
    namePlaceholder: string;
    age: string;
    confirm: string;
    start: string;
    errName: string;
    errAge: string;
    errConfirm: string;
    noteStrong: string;
    note: string;
    art: { title: string; text: string }[];
  };
  question: {
    sections: Record<'thinking' | 'tech' | 'interest', { en: string; label: string }>;
    count: (n: number, total: number) => [string, string, string];
    multi: string;
    back: string;
    next: string;
    finish: string;
    missing: string;
  };
  lead: {
    title: string;
    text: (child: string) => string;
    parent: string;
    phone: string;
    laptop: string;
    yes: string;
    no: string;
    privacy: string;
    submit: string;
    sending: string;
    back: string;
    errParent: string;
    errPhone: string;
    errLaptop: string;
    errServer: string;
    errNetwork: string;
  };
  result: {
    title: (child: string) => string;
    closest: string;
    closestTrack: string;
    between: (a: string, b: string) => string;
    after: string;
    strength: string;
    ctaTitle: string;
    ctaText: string;
    book: string;
    again: string;
    message: (parent: string, child: string, age: number, track: string) => string;
  };
  tracks: Record<Track, string>;
  trackLines: Record<Track, string>;
  strengths: Record<Strength, string>;
}

const ar: TestText = {
  arrow: '←',
  welcome: {
    title: 'اختبار تحديد المستوى المجاني',
    lead: 'اختبار قصير يساعدنا على معرفة مستوى طفلك في التكنولوجيا والمسار الأنسب له، وتظهر النتيجة فور الانتهاء.',
    chips: ['10 دقائق تقريبًا', 'من 6 إلى 18 سنة', 'مجاني تمامًا'],
    name: 'اسم الطفل',
    namePlaceholder: 'مثال: عمر',
    age: 'سن الطفل',
    confirm: 'طفلي هيجاوب بنفسه، من غير مساعدة ومن غير آلة حاسبة',
    start: 'ابدأ الاختبار',
    errName: 'اكتب اسم الطفل.',
    errAge: 'اختر سن الطفل.',
    errConfirm: 'أكّد إن طفلك هيجاوب بنفسه.',
    noteStrong: 'لولي الأمر:',
    note: 'برجاء عدم مساعدة الطفل في حل الأسئلة حتى تظهر نتيجة دقيقة. للأطفال من 6 إلى 9 سنوات يمكن قراءة السؤال بصوت مسموع فقط.',
    art: [
      { title: 'التفكير', text: 'أنماط وحساب ومنطق' },
      { title: 'التكنولوجيا', text: 'معلومات وخبرة سابقة' },
      { title: 'الاهتمامات', text: 'المسار الأقرب للطفل' },
    ],
  },
  question: {
    sections: {
      thinking: { en: 'Thinking', label: 'التفكير' },
      tech: { en: 'Technology', label: 'التكنولوجيا' },
      interest: { en: 'Interests', label: 'اهتماماتك' },
    },
    count: (n, total) => ['سؤال', `${n}`, `من ${total}`],
    multi: 'اختر كل ما ينطبق',
    back: 'السابق',
    next: 'التالي',
    finish: 'إنهاء الاختبار',
    missing: '؟',
  },
  lead: {
    title: 'النتيجة جاهزة!',
    text: (child) => `اكتب بياناتك لعرض نتيجة ${iso(child)}.`,
    parent: 'اسم ولي الأمر',
    phone: 'رقم واتساب',
    laptop: 'عند الطفل لابتوب يقدر ييجي بيه السيشنز؟',
    yes: 'أيوه',
    no: 'لأ',
    privacy: 'بياناتكم هتُستخدم للتواصل معاكم من أكاديمية تك سيدز بس.',
    submit: 'اعرض النتيجة',
    sending: 'جارٍ تجهيز النتيجة…',
    back: 'الرجوع للأسئلة',
    errParent: 'اكتب اسم ولي الأمر.',
    errPhone: 'اكتب رقم واتساب مصري صحيح، مثل 01012345678.',
    errLaptop: 'اختار إذا كان عند الطفل لابتوب.',
    errServer: 'حدث خطأ أثناء تجهيز النتيجة. حاول مرة أخرى.',
    errNetwork: 'تعذر الاتصال. تأكد من الإنترنت وحاول مرة أخرى.',
  },
  result: {
    title: (child) => `النتيجة المبدئية لـ ${iso(child)}`,
    closest: 'الأقرب ليه',
    closestTrack: 'الأقرب ليه: مسار',
    between: (a, b) => `بين مسار ${a} ومسار ${b}`,
    after: 'وبعده: مسار',
    strength: 'نقطة قوة',
    ctaTitle: 'التقرير الكامل بمستواه في التكنولوجيا هنشرحهولكم في المقابلة المجانية.',
    ctaText: 'احجز الآن وسنتواصل معك لتحديد الموعد.',
    book: 'احجز المقابلة المجانية',
    again: 'اختبار طفل آخر',
    message: (parent, child, age, track) =>
      `مرحبًا، أنا ${parent} ولي أمر ${child} (${age} سنة). ` +
      `خلّص اختبار تحديد المستوى والأقرب ليه مسار ${track}. عايز أحجز المقابلة المجانية.`,
  },
  tracks: {
    programming: 'البرمجة',
    gamedev: 'تطوير الألعاب',
    ai: 'الذكاء الاصطناعي',
    cyber: 'الأمن السيبراني',
  },
  trackLines: {
    programming: 'هيبني برامج شغالة بنفسه',
    gamedev: 'هيصمم ألعابه الخاصة',
    ai: 'هيعمل صور ومستندات ومشاريع بأدوات الذكاء الاصطناعي',
    cyber: 'هيتعلم يحمي الأنظمة ويحل تحديات الأمان',
  },
  strengths: {
    pattern: 'بيلاحظ الأنماط بسرعة',
    math: 'قوي في الحساب والأرقام',
    logic: 'بيفكر بخطوات مرتبة',
    start: 'جاهز يبدأ من أول خطوة',
  },
};

const en: TestText = {
  arrow: '→',
  welcome: {
    title: 'Free placement test',
    lead: "A short test that shows us your child's technology level and the track that suits them best. The result appears as soon as they finish.",
    chips: ['About 10 minutes', 'Ages 6 to 18', 'Completely free'],
    name: "Child's name",
    namePlaceholder: 'e.g. Omar',
    age: "Child's age",
    confirm: 'My child will answer alone, without help and without a calculator',
    start: 'Start the test',
    errName: "Enter the child's name.",
    errAge: "Choose the child's age.",
    errConfirm: 'Please confirm your child will answer alone.',
    noteStrong: 'For parents:',
    note: 'Please do not help your child answer, so the result is accurate. For children aged 6 to 9 you may read the question aloud, nothing more.',
    art: [
      { title: 'Thinking', text: 'Patterns, maths and logic' },
      { title: 'Technology', text: 'Knowledge and past experience' },
      { title: 'Interests', text: 'The track that fits best' },
    ],
  },
  question: {
    sections: {
      thinking: { en: 'Part 1', label: 'Thinking' },
      tech: { en: 'Part 2', label: 'Technology' },
      interest: { en: 'Part 3', label: 'Your interests' },
    },
    count: (n, total) => ['Question', `${n}`, `of ${total}`],
    multi: 'Choose all that apply',
    back: 'Back',
    next: 'Next',
    finish: 'Finish the test',
    missing: '?',
  },
  lead: {
    title: 'The result is ready!',
    text: (child) => `Enter your details to see ${iso(child)}'s result.`,
    parent: 'Parent name',
    phone: 'WhatsApp number',
    laptop: 'Does your child have a laptop they can bring to class?',
    yes: 'Yes',
    no: 'No',
    privacy: 'We only use your details to contact you from TechSeeds Academy.',
    submit: 'Show the result',
    sending: 'Preparing the result…',
    back: 'Back to the questions',
    errParent: 'Enter the parent name.',
    errPhone: 'Enter a valid Egyptian WhatsApp number, like 01012345678.',
    errLaptop: 'Say whether your child has a laptop.',
    errServer: 'Something went wrong preparing the result. Please try again.',
    errNetwork: 'Could not connect. Check your internet and try again.',
  },
  result: {
    title: (child) => `${iso(child)}'s first result`,
    closest: 'Closest match',
    closestTrack: 'Closest match',
    between: (a, b) => `Between ${a} and ${b}`,
    after: 'Then:',
    strength: 'A strength',
    ctaTitle: "We'll explain the full report on their technology level in the free interview.",
    ctaText: "Book now and we'll contact you to set a time.",
    book: 'Book the free interview',
    again: 'Test another child',
    message: (parent, child, age, track) =>
      `Hello, I'm ${parent}, parent of ${child} (${age} years old). ` +
      `${child} finished the placement test and the closest track is ${track}. I'd like to book the free interview.`,
  },
  tracks: {
    programming: 'Programming',
    gamedev: 'Game Development',
    ai: 'Artificial Intelligence',
    cyber: 'Cybersecurity',
  },
  trackLines: {
    programming: 'Will build working programs on their own',
    gamedev: 'Will design their own games',
    ai: 'Will create images, documents and projects with AI tools',
    cyber: 'Will learn to protect systems and solve security challenges',
  },
  strengths: {
    pattern: 'Spots patterns quickly',
    math: 'Strong with numbers and calculation',
    logic: 'Thinks in clear, ordered steps',
    start: 'Ready to start from step one',
  },
};

export const TEST_TEXT: Record<TestLang, TestText> = { ar, en };
