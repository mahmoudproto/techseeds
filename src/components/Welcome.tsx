'use client';

import { useState } from 'react';

const AGES = Array.from({ length: 13 }, (_, i) => i + 6);

export default function Welcome({ onStart }: { onStart: (childName: string, age: number) => void }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | null>(null);
  const [error, setError] = useState('');

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const clean = name.replace(/\s+/g, ' ').trim();
    if (clean.length < 2) return setError('اكتب اسم الطفل.');
    if (age === null) return setError('اختر سن الطفل.');
    setError('');
    onStart(clean, age);
  }

  return (
    <section className="welcome">
      <div className="welcome__copy">
        <p className="eyebrow">Free Placement Test</p>
        <h1 className="title">اختبار تحديد المستوى المجاني</h1>
        <span className="title__bar" />
        <p className="lead">
          اختبار قصير يساعدنا على معرفة مستوى طفلك في التكنولوجيا والمسار الأنسب له، وتظهر النتيجة
          فور الانتهاء.
        </p>

        <ul className="chips">
          <li className="chip chip--green">10 دقائق تقريبًا</li>
          <li className="chip chip--blue">من 6 إلى 18 سنة</li>
          <li className="chip chip--yellow">مجاني تمامًا</li>
        </ul>

        <form className="card form" onSubmit={submit} noValidate>
          <label className="field">
            <span className="field__label">اسم الطفل</span>
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={60}
              autoComplete="off"
              placeholder="مثال: عمر"
            />
          </label>

          <fieldset className="field">
            <legend className="field__label">سن الطفل</legend>
            <div className="ages">
              {AGES.map((a) => (
                <button
                  key={a}
                  type="button"
                  className={`age${age === a ? ' age--on' : ''}`}
                  aria-pressed={age === a}
                  onClick={() => setAge(a)}
                >
                  {a}
                </button>
              ))}
            </div>
          </fieldset>

          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}

          <button className="btn btn--block" type="submit">
            <span>ابدأ الاختبار</span>
            <span className="btn__arrow" aria-hidden="true">←</span>
          </button>
        </form>

        <p className="note">
          <strong>لولي الأمر:</strong> برجاء عدم مساعدة الطفل في حل الأسئلة حتى تظهر نتيجة دقيقة. للأطفال من
          6 إلى 9 سنوات يمكن قراءة السؤال بصوت مسموع فقط.
        </p>
      </div>

      <div className="welcome__art" aria-hidden="true">
        <span className="blob blob--blue" />
        <span className="blob blob--green" />
        <span className="dot dot--yellow" />
        <span className="dot dot--blue" />
        <span className="dot dot--green" />
        <div className="art-card">
          <div className="art-step">
            <span className="art-step__num">01</span>
            <span>
              <strong>التفكير</strong>
              <small>أنماط وحساب ومنطق</small>
            </span>
          </div>
          <div className="art-step">
            <span className="art-step__num">02</span>
            <span>
              <strong>التكنولوجيا</strong>
              <small>معلومات وخبرة سابقة</small>
            </span>
          </div>
          <div className="art-step">
            <span className="art-step__num">03</span>
            <span>
              <strong>الاهتمامات</strong>
              <small>المسار الأقرب للطفل</small>
            </span>
          </div>
        </div>
        <span className="code-chip">
          <span>Python</span>
          <span>Scratch</span>
          <span>AI</span>
        </span>
        <span className="badge">&lt;/&gt;</span>
      </div>
    </section>
  );
}
