import type { Strength, TechLevel, Track } from './types';

export const TRACK_LABEL: Record<Track, string> = {
  programming: 'البرمجة',
  gamedev: 'تطوير الألعاب',
  ai: 'الذكاء الاصطناعي',
  cyber: 'الأمن السيبراني',
};

export const TRACK_LINE: Record<Track, string> = {
  programming: 'هيبني برامج شغالة بنفسه',
  gamedev: 'هيصمم ألعابه الخاصة',
  ai: 'هيعمل صور ومستندات ومشاريع بأدوات الذكاء الاصطناعي',
  cyber: 'هيتعلم يحمي الأنظمة ويحل تحديات الأمان',
};

export const STRENGTH_LINE: Record<Strength, string> = {
  pattern: 'بيلاحظ الأنماط بسرعة',
  math: 'قوي في الحساب والأرقام',
  logic: 'بيفكر بخطوات مرتبة',
  start: 'جاهز يبدأ من أول خطوة',
};

export const STRENGTH_LABEL: Record<Strength, string> = {
  pattern: 'الأنماط',
  math: 'الحساب',
  logic: 'المنطق',
  start: 'لسه بيبدأ',
};

export const LEVEL_LABEL: Record<TechLevel, string> = {
  beginner: 'مبتدئ',
  basic: 'عنده أساس',
  advanced: 'متقدم',
};

export const WHATSAPP_NUMBER = '201129877798';
export const WHATSAPP_DISPLAY = '01129877798';
