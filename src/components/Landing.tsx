import Link from 'next/link';
import { WHATSAPP_NUMBER } from '@/lib/labels';

type IconName =
  | 'cap' | 'users' | 'layers' | 'pair' | 'hands' | 'board' | 'project' | 'group'
  | 'code' | 'game' | 'ai' | 'shield' | 'report' | 'parents' | 'guarantee';

function Icon({ name, size = 24, color = '#122e4f' }: { name: IconName; size?: number; color?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    cap: <><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11.5V16c2 2 10 2 12 0v-4.5" /></>,
    users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6" /><path d="M16 5.2a3.2 3.2 0 010 5.6M18 14.3c1.9.9 3 2.9 3 5.7" /></>,
    layers: <><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></>,
    pair: <><circle cx="8" cy="8" r="3" /><circle cx="17" cy="9" r="2.4" /><path d="M2.5 20c0-3.3 2.4-5.7 5.5-5.7s5.5 2.4 5.5 5.7M15 14.5c3.3-.6 6 1.7 6 5" /></>,
    hands: <><path d="M4 13V6.5a1.5 1.5 0 013 0V12M7 11V5a1.5 1.5 0 013 0v6M10 11V6a1.5 1.5 0 013 0v7l2.2-2.200a1.6 1.6 0 012.4 2.100L14 19c-1 1.3-2.3 2-4 2H9c-3 0-5-2-5-5z" /></>,
    board: <><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M12 16v4M8 20h8M7 9l2 2-2 2M12 13h4" /></>,
    project: <><path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.300l6.1-.700z" /></>,
    group: <><circle cx="12" cy="7" r="3" /><circle cx="5" cy="10" r="2.2" /><circle cx="19" cy="10" r="2.2" /><path d="M6.5 20c0-3 2.4-5.3 5.5-5.300s5.5 2.3 5.5 5.300M1.8 18.500c0-2.2 1.4-3.8 3.2-3.800M22.2 18.500c0-2.2-1.4-3.8-3.2-3.8" /></>,
    code: <><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 5l-3 14" /></>,
    game: <><rect x="2.5" y="7" width="19" height="10" rx="5" /><path d="M7 10.500v3M5.5 12h3M15.5 11h.01M18 13h.01" /></>,
    ai: <><rect x="6" y="6" width="12" height="12" rx="3" /><path d="M9.5 10.500v.01M14.5 10.500v.01M9.5 14.500h5M12 3v3M12 18v3M3 12h3M18 12h3" /></>,
    shield: <><path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z" /><path d="M9 12l2.2 2.200L15.5 10" /></>,
    report: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h3" /></>,
    parents: <><circle cx="8" cy="7" r="2.8" /><circle cx="16.5" cy="7.5" r="2.3" /><path d="M3 19c0-3 2.2-5 5-5s5 2 5 5M14.5 13.300c3-.3 6 1.5 6 5.2" /><circle cx="12.5" cy="16.5" r="1.6" /></>,
    guarantee: <><circle cx="12" cy="10" r="6" /><path d="M9.3 10l1.9 1.9 3.5-3.600M8.5 15l-1.5 6 5-2.5 5 2.5-1.5-6" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const STATS: { icon: IconName; tint: string; color: string; value: string; label: string }[] = [
  { icon: 'cap', tint: 'green', color: '#2fa84f', value: '6 - 18', label: 'سنة' },
  { icon: 'layers', tint: 'blue', color: '#3eaae5', value: '4 مسارات', label: 'برمجة · ألعاب · ذكاء اصطناعي · أمن سيبراني' },
  { icon: 'users', tint: 'yellow', color: '#d99a00', value: '6 - 12 طالب', label: 'في المجموعة الواحدة' },
  { icon: 'pair', tint: 'green', color: '#2fa84f', value: 'مدرب ومساعد', label: 'في كل مجموعة' },
];

const PILLARS: { icon: IconName; lines: [string, string] }[] = [
  { icon: 'hands', lines: ['تعليم حضوري', 'عملي وتطبيقي'] },
  { icon: 'board', lines: ['مدرب ومساعد', 'في كل مجموعة'] },
  { icon: 'project', lines: ['مشروع يبنيه', 'الطالب كل شهر'] },
  { icon: 'group', lines: ['مجموعات صغيرة', 'من 6 إلى 12 طالب'] },
];

const PROGRAMS: { icon: IconName; tint: string; color: string; en: string; ar: string; ages: string; note: string }[] = [
  { icon: 'code', tint: 'blue', color: '#3eaae5', en: 'Programming', ar: 'البرمجة', ages: 'من 6 إلى 18 سنة', note: 'mBlock · Python · JavaScript' },
  { icon: 'game', tint: 'yellow', color: '#d99a00', en: 'Game Development', ar: 'تطوير الألعاب', ages: 'من 10 إلى 18 سنة', note: 'GameMaker · Unity' },
  { icon: 'ai', tint: 'green', color: '#2fa84f', en: 'Artificial Intelligence', ar: 'الذكاء الاصطناعي', ages: 'من 6 إلى 18 سنة', note: 'أدوات AI لمهام ومشاريع حقيقية' },
  { icon: 'shield', tint: 'mint', color: '#2fa84f', en: 'Cybersecurity', ar: 'الأمن السيبراني', ages: 'من 10 إلى 18 سنة', note: 'حماية الأنظمة وتحديات CTF' },
];

const STEPS = [
  { n: '01', title: 'تحديد المستوى', text: 'اختبار مجاني قصير لمعرفة مستوى الطفل' },
  { n: '02', title: 'اختيار المسار', text: 'بما يناسب سن الطفل واهتماماته' },
  { n: '03', title: 'التعلم العملي', text: 'مشروع حقيقي يبنيه الطالب كل شهر' },
  { n: '04', title: 'المتابعة والتقييم', text: 'ثلاثة تقارير لولي الأمر في كل مستوى' },
];

const WHY: { icon: IconName; tint: string; color: string; title: string; text: string }[] = [
  { icon: 'report', tint: 'blue', color: '#3eaae5', title: 'تقارير متابعة للأهل', text: 'ثلاثة تقارير في كل مستوى توضح ما تعلمه طفلك وما يحتاج فيه إلى دعم.' },
  { icon: 'parents', tint: 'yellow', color: '#d99a00', title: 'ورشة مجانية لأولياء الأمور', text: 'كل يوم أحد نشرح طريقتنا ودوركم في البيت. نحن شركاء، لا مجرد مقدمي خدمة.' },
  { icon: 'guarantee', tint: 'green', color: '#2fa84f', title: 'ضمان استرداد قيمة المستوى', text: 'إذا حضر طفلك 5 حصص على الأقل من 6 ولم يُكمل مشروع المستوى، نرد لكم قيمة هذا المستوى.' },
];

const REVIEWS = [
  { name: 'منة الله، ولية أمر', text: 'ابني كان مبسوط جدًا بالكورس وعمل لعبة حلوة أوي... لقيته من نفسه عمل ليمت للفيسبوك والتيك توك، وبقى يقضي وقت أكتر ينجز التاسكات.' },
  { name: 'وائل، ولي أمر', text: 'تجربة فوق الممتازة، ومبسوط جدًا إن ابني بقى يعرف المعلومات دي، وأثّرت في تركيزه ومذاكرته وتفاعله معانا في البيت.' },
  { name: 'ابتهال، ولية أمر', text: 'الكورس غيّر تمامًا نظرة ابني للبرمجة! مكانش عنده أي شغف بيها قبل كده، لكن دلوقتي بقى مهتم جدًا ومستني يروح كل سيشن.' },
];

function Arrow() {
  return <span className="btn__arrow" aria-hidden="true">←</span>;
}

export default function Landing() {
  const whatsapp = `https://wa.me/${WHATSAPP_NUMBER}`;
  return (
    <div className="landing">
      {/* Hero */}
      <section className="l-section hero" id="home">
        <div className="hero__copy">
          <p className="eyebrow">Growing Young Minds</p>
          <h1 className="title">أكاديمية متخصصة في تعليم البرمجة والتكنولوجيا للأطفال والناشئين</h1>
          <p className="lead">
            نساعد أطفالك على اكتشاف عالم التكنولوجيا من خلال تجربة تعليمية حضورية، عملية وتفاعلية، تنمّي
            مهاراتهم وطريقة تفكيرهم وتعدّهم لمستقبلهم الرقمي.
          </p>
          <div className="hero__ctas">
            <Link className="btn" href="/test">
              <span>ابدأ اختبار تحديد المستوى</span>
              <Arrow />
            </Link>
            <a className="hero__link" href={whatsapp} target="_blank" rel="noopener noreferrer">
              تواصل معنا عبر واتساب
            </a>
          </div>
        </div>

        <div className="hero__art" aria-hidden="true">
          <span className="blob blob--blue" />
          <span className="blob blob--green" />
          <span className="dot dot--yellow" />
          <span className="dot dot--blue" />
          <span className="dot dot--green" />
          <div className="art-card art-card--code">
            <div className="code-window__bar"><i /><i /><i /></div>
            <pre className="code-window" dir="ltr">{`when  🚩 clicked
repeat 10
   move 10 steps
   say "Hello!"`}</pre>
            <div className="art-tracks">
              <span className="tint tint--blue"><Icon name="code" color="#3eaae5" /></span>
              <span className="tint tint--yellow"><Icon name="game" color="#d99a00" /></span>
              <span className="tint tint--green"><Icon name="ai" color="#2fa84f" /></span>
              <span className="tint tint--mint"><Icon name="shield" color="#2fa84f" /></span>
            </div>
          </div>
          <span className="code-chip"><span>Python</span><span>Scratch</span><span>Unity</span><span>AI</span></span>
          <span className="badge">&lt;/&gt;</span>
        </div>
      </section>

      {/* Stats */}
      <section className="l-section l-section--tight">
        <div className="card stats">
          {STATS.map((s) => (
            <div className="stat" key={s.value}>
              <span className={`tint tint--${s.tint}`}><Icon name={s.icon} color={s.color} /></span>
              <span className="stat__text">
                <strong>{s.value}</strong>
                <small>{s.label}</small>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="l-section about" id="about">
        <div className="about__copy">
          <p className="eyebrow">About TechSeeds</p>
          <h2 className="h2">من نحن؟</h2>
          <span className="title__bar" />
          <p className="lead lead--wide">
            TechSeeds أكاديمية تكنولوجيا حضورية في الفيوم للأطفال والشباب من 6 إلى 18 سنة. بدأنا في 2025 من
            ملاحظة واحدة: أغلب الأطفال لا يتعلمون جيدًا في الكورسات الأونلاين، فاخترنا أن نعلّم وجهًا لوجه في
            مجموعات صغيرة. التكنولوجيا عندنا وسيلة، وعقل الطفل هو الهدف.
          </p>
          <div className="pillars">
            {PILLARS.map((p) => (
              <div className="card pillar" key={p.lines[0]}>
                <Icon name={p.icon} size={30} color="#2fa84f" />
                <span>{p.lines[0]}<br />{p.lines[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="l-section" id="programs">
        <div className="section-head">
          <p className="eyebrow">Our Programs</p>
          <h2 className="h2">برامجنا التعليمية</h2>
          <span className="title__bar" />
          <p className="lead lead--wide">
            أربعة مسارات، وكل مسار مقسّم حسب السن إلى مستويات. المستوى شهر واحد: 6 حصص، كل حصة 3 ساعات، وينتهي
            بمشروع يبنيه الطالب ويعرضه بنفسه.
          </p>
        </div>
        <div className="programs">
          {PROGRAMS.map((p) => (
            <div className={`program tint--${p.tint}`} key={p.en}>
              <span className="program__icon"><Icon name={p.icon} size={26} color={p.color} /></span>
              <span className="program__en">{p.en}</span>
              <strong className="program__ar">{p.ar}</strong>
              <span className="program__ages">{p.ages}</span>
              <span className="program__note">{p.note}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="l-section">
        <div className="how">
          <p className="eyebrow">How It Works</p>
          <h2 className="h2">كيف نعمل؟</h2>
          <p className="how__sub">رحلة تعليمية منظمة وممتعة تبدأ من أول يوم</p>
          <ol className="steps">
            {STEPS.map((s) => (
              <li className="step" key={s.n}>
                <span className="step__num">{s.n}</span>
                <strong>{s.title}</strong>
                <span>{s.text}</span>
              </li>
            ))}
          </ol>
          <Link className="btn" href="/test">
            <span>ابدأ بالخطوة الأولى</span>
            <Arrow />
          </Link>
        </div>
      </section>

      {/* Why us */}
      <section className="l-section" id="why">
        <div className="section-head">
          <p className="eyebrow">Why TechSeeds</p>
          <h2 className="h2">لماذا نحن؟</h2>
          <span className="title__bar" />
        </div>
        <div className="why">
          {WHY.map((w) => (
            <div className="card why__card" key={w.title}>
              <span className={`tint tint--${w.tint}`}><Icon name={w.icon} color={w.color} /></span>
              <strong>{w.title}</strong>
              <p>{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="l-section" id="reviews">
        <div className="section-head">
          <p className="eyebrow">What Parents Say</p>
          <h2 className="h2">آراء أولياء الأمور</h2>
          <p className="how__sub">ثقتكم هي دافعنا للاستمرار</p>
        </div>
        <div className="reviews">
          {REVIEWS.map((r) => (
            <figure className="card review" key={r.name}>
              <blockquote>«{r.text}»</blockquote>
              <figcaption>
                <span className="review__avatar" aria-hidden="true">{r.name.charAt(0)}</span>
                {r.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="l-section l-section--tight">
        <div className="cta">
          <div className="cta__copy">
            <strong>هل أنت مستعد لبدء رحلة طفلك في عالم التكنولوجيا؟</strong>
            <span>ابدأ باختبار تحديد المستوى المجاني، ويستغرق حوالي 10 دقائق.</span>
          </div>
          <Link className="btn" href="/test">
            <span>ابدأ الاختبار الآن</span>
            <Arrow />
          </Link>
        </div>
      </section>
    </div>
  );
}
