import type { TestDefinition } from '../types';

/** Ages 6–9. 4 thinking, 3 technology, 3 interests. Tracks: programming, AI. */
export const versionA: TestDefinition = {
  version: 'A',
  tracks: ['programming', 'ai'],
  techMax: 4,
  techThresholds: [2, 4],
  questions: [
    {
      id: 'a1',
      kind: 'thinking',
      tag: 'pattern',
      prompt: 'إيه اللي ييجي بعد كده؟',
      visual: {
        kind: 'shapeSeq',
        items: [
          { shape: 'circle', color: 'green' },
          { shape: 'circle', color: 'blue' },
          { shape: 'circle', color: 'green' },
          { shape: 'circle', color: 'blue' },
          { shape: 'circle', color: 'green' },
          null,
        ],
      },
      options: [
        { id: 'o1', label: 'دايرة خضرا', visual: { kind: 'shape', shape: 'circle', color: 'green' } },
        { id: 'o2', label: 'دايرة زرقا', visual: { kind: 'shape', shape: 'circle', color: 'blue' } },
        { id: 'o3', label: 'مربع أصفر', visual: { kind: 'shape', shape: 'square', color: 'yellow' } },
        { id: 'o4', label: 'مثلث أزرق', visual: { kind: 'shape', shape: 'triangle', color: 'blue' } },
      ],
      correct: 'o2',
    },
    {
      id: 'a2',
      kind: 'thinking',
      tag: 'pattern',
      prompt: 'إيه اللي ييجي بعد كده؟',
      visual: { kind: 'dotSeq', counts: [1, 2, 3, null] },
      options: [
        { id: 'o1', label: '3 نقط', visual: { kind: 'dots', n: 3 } },
        { id: 'o2', label: '5 نقط', visual: { kind: 'dots', n: 5 } },
        { id: 'o3', label: '4 نقط', visual: { kind: 'dots', n: 4 } },
        { id: 'o4', label: 'نقطتين', visual: { kind: 'dots', n: 2 } },
      ],
      correct: 'o3',
    },
    {
      id: 'a3',
      kind: 'thinking',
      tag: 'math',
      prompt: 'احسب:',
      expr: '7 + 5 = ?',
      options: [
        { id: 'o1', label: '11' },
        { id: 'o2', label: '12' },
        { id: 'o3', label: '13' },
        { id: 'o4', label: '10' },
      ],
      correct: 'o2',
    },
    {
      id: 'a4',
      kind: 'thinking',
      tag: 'math',
      prompt: 'مع عمر 10 بلالين، ادّى صاحبه 4. فاضل معاه كام؟',
      options: [
        { id: 'o1', label: '5' },
        { id: 'o2', label: '14' },
        { id: 'o3', label: '7' },
        { id: 'o4', label: '6' },
      ],
      correct: 'o4',
    },
    {
      id: 'a5',
      kind: 'tech',
      prompt: 'بنكتب على الكمبيوتر بإيه؟',
      options: [
        { id: 'o1', label: 'الماوس', visual: { kind: 'icon', name: 'mouse' } },
        { id: 'o2', label: 'الكيبورد', visual: { kind: 'icon', name: 'keyboard' } },
        { id: 'o3', label: 'الشاشة', visual: { kind: 'icon', name: 'screen' } },
        { id: 'o4', label: 'السماعة', visual: { kind: 'icon', name: 'speaker' } },
        { id: 'o5', label: 'مش عارف' },
      ],
      correct: 'o2',
    },
    {
      id: 'a6',
      kind: 'tech',
      prompt: 'الكمبيوتر بيعرف يعمل اللي إحنا عايزينه إزاي؟',
      options: [
        { id: 'o1', label: 'بيفهم لوحده' },
        { id: 'o2', label: 'من النت' },
        { id: 'o3', label: 'حد كتبله تعليمات اسمها «برنامج»' },
        { id: 'o4', label: 'مش عارف' },
      ],
      correct: 'o3',
    },
    {
      id: 'a7',
      kind: 'experience',
      prompt: 'عملت قبل كده إيه من دول؟',
      options: [
        { id: 'o1', label: 'استخدمت كمبيوتر بالماوس والكيبورد', points: 1 },
        { id: 'o2', label: 'رسمت أو كتبت على الكمبيوتر', points: 1 },
        { id: 'o3', label: 'جربت Scratch أو أي برنامج برمجة', points: 1 },
        { id: 'o4', label: 'سألت مساعد ذكي زي ChatGPT', points: 1 },
        { id: 'o5', label: 'ولا حاجة', points: 0, none: true },
      ],
    },
    {
      id: 'a8',
      kind: 'interest',
      prompt: 'عندك روبوت جديد! تحب تعمل إيه؟',
      options: [
        { id: 'o1', label: 'أقوله الخطوات واحدة واحدة عشان يوصل للكنز', track: 'programming' },
        { id: 'o2', label: 'أوريله صور كتير عشان يتعلم يعرف القطة من الكلب', track: 'ai' },
      ],
    },
    {
      id: 'a9',
      kind: 'interest',
      prompt: 'تحب أنهي حصة أكتر؟',
      options: [
        { id: 'o1', label: 'أحكي حكاية وكمبيوتر ذكي يرسمها', track: 'ai' },
        { id: 'o2', label: 'أخلي شخصية كرتون تتحرك وترقص بأوامر أنا اللي أرتّبها', track: 'programming' },
      ],
    },
    {
      id: 'a10',
      kind: 'interest',
      prompt: 'هتعمل هدية لصاحبك بالكمبيوتر. تختار إيه؟',
      options: [
        { id: 'o1', label: 'كارت بيتحرك وأنا اللي أرتّب حركاته خطوة خطوة', track: 'programming' },
        { id: 'o2', label: 'صورة أوصفها بالكلام ومساعد ذكي يرسمها', track: 'ai' },
      ],
    },
  ],
};
