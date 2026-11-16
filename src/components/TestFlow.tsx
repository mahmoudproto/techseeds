'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Answers, PublicResult, PublicTest, VersionId } from '@/lib/types';
import { track } from '@/lib/track';
import { versionForAge } from '@/lib/validate';
import LeadForm from './LeadForm';
import QuestionCard from './QuestionCard';
import Result from './Result';
import Welcome from './Welcome';

type Step = 'welcome' | 'questions' | 'lead' | 'result';

interface Saved {
  step: 'questions' | 'lead';
  childName: string;
  age: number;
  index: number;
  answers: Answers;
  order: Record<string, string[]>;
  startedAt: number;
}

const STORAGE_KEY = 'techseeds-test-v1';
const RETRY_DELAYS_MS = [5000, 15000];

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Shuffles each question's options, keeping "don't know" and "none" last. */
function makeOrder(test: PublicTest): Record<string, string[]> {
  const order: Record<string, string[]> = {};
  for (const q of test.questions) {
    const last = q.options.filter((o) => o.exclusive || o.label === 'مش عارف').map((o) => o.id);
    const rest = q.options.filter((o) => !last.includes(o.id)).map((o) => o.id);
    order[q.id] = [...shuffle(rest), ...last];
  }
  return order;
}

function readSaved(): Saved | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Saved) : null;
  } catch {
    return null;
  }
}

function writeSaved(saved: Saved | null) {
  try {
    if (saved) window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    else window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage can be unavailable (private mode); the test still works without it.
  }
}

export default function TestFlow({ tests }: { tests: Record<VersionId, PublicTest> }) {
  const [step, setStep] = useState<Step>('welcome');
  const [childName, setChildName] = useState('');
  const [parentName, setParentName] = useState('');
  const [age, setAge] = useState(0);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [order, setOrder] = useState<Record<string, string[]>>({});
  const [startedAt, setStartedAt] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [result, setResult] = useState<PublicResult | null>(null);
  const retryTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const version = versionForAge(age);
  const test = version ? tests[version] : null;

  // Pick up where the child left off after a refresh.
  useEffect(() => {
    const saved = readSaved();
    const savedVersion = saved ? versionForAge(saved.age) : null;
    if (!saved || !savedVersion) return;
    const total = tests[savedVersion].questions.length;
    setChildName(saved.childName);
    setAge(saved.age);
    setAnswers(saved.answers ?? {});
    setOrder(saved.order ?? {});
    setStartedAt(saved.startedAt || Date.now());
    setIndex(Math.min(Math.max(0, saved.index ?? 0), total - 1));
    setStep(saved.step === 'lead' ? 'lead' : 'questions');
  }, [tests]);

  useEffect(() => {
    if (step === 'questions' || step === 'lead') {
      writeSaved({ step, childName, age, index, answers, order, startedAt });
    }
  }, [step, childName, age, index, answers, order, startedAt]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step, index]);

  useEffect(() => () => retryTimers.current.forEach(clearTimeout), []);

  const start = useCallback(
    (name: string, childAge: number) => {
      const v = versionForAge(childAge);
      if (!v) return;
      setChildName(name);
      setAge(childAge);
      setAnswers({});
      setOrder(makeOrder(tests[v]));
      setIndex(0);
      setStartedAt(Date.now());
      setStep('questions');
      track('test_started', { version: v });
    },
    [tests],
  );

  const restart = useCallback(() => {
    retryTimers.current.forEach(clearTimeout);
    retryTimers.current = [];
    writeSaved(null);
    setResult(null);
    setAnswers({});
    setChildName('');
    setAge(0);
    setIndex(0);
    setServerError('');
    setStep('welcome');
  }, []);

  async function post(payload: object): Promise<PublicResult | null> {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) return null;
    return (await response.json()) as PublicResult;
  }

  async function submit(parent: string, phone: string, website: string) {
    if (submitting) return;
    setSubmitting(true);
    setServerError('');
    const payload = {
      childName,
      age,
      parentName: parent,
      phone,
      website,
      answers,
      durationSec: Math.round((Date.now() - startedAt) / 1000),
    };
    try {
      const data = await post(payload);
      if (!data) {
        setServerError('حدث خطأ أثناء تجهيز النتيجة. حاول مرة أخرى.');
        return;
      }
      setParentName(parent);
      setResult(data);
      track('test_completed', { version: data.version, track: data.top });
      writeSaved(null);
      setStep('result');

      // If the sheet could not be reached, try again quietly in the background.
      if (!data.saved) {
        RETRY_DELAYS_MS.reduce((wait, delay) => {
          const total = wait + delay;
          retryTimers.current.push(
            setTimeout(async () => {
              try {
                const again = await post(payload);
                if (again?.saved) {
                  retryTimers.current.forEach(clearTimeout);
                  retryTimers.current = [];
                }
              } catch {
                // Still offline; the next timer will try again.
              }
            }, total),
          );
          return total;
        }, 0);
      }
    } catch {
      setServerError('تعذر الاتصال. تأكد من الإنترنت وحاول مرة أخرى.');
    } finally {
      setSubmitting(false);
    }
  }

  if (step === 'result' && result) {
    return (
      <div className="shell shell--narrow">
        <Result result={result} parentName={parentName} age={age} onRestart={restart} />
      </div>
    );
  }

  if (step === 'lead' && test) {
    return (
      <div className="shell shell--narrow">
        <LeadForm
          childName={childName}
          submitting={submitting}
          serverError={serverError}
          onBack={() => setStep('questions')}
          onSubmit={submit}
        />
      </div>
    );
  }

  if (step === 'questions' && test) {
    const question = test.questions[index];
    const total = test.questions.length;
    return (
      <div className="shell shell--narrow">
        <QuestionCard
          question={question}
          order={order[question.id] ?? question.options.map((o) => o.id)}
          value={answers[question.id]}
          index={index}
          total={total}
          onChange={(value) => setAnswers((prev) => ({ ...prev, [question.id]: value }))}
          onBack={() => (index === 0 ? restart() : setIndex(index - 1))}
          onNext={() => (index === total - 1 ? setStep('lead') : setIndex(index + 1))}
        />
      </div>
    );
  }

  return (
    <div className="shell">
      <Welcome onStart={start} />
    </div>
  );
}
