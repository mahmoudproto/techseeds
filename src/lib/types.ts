export type VersionId = 'A' | 'B' | 'C';
export type Track = 'programming' | 'gamedev' | 'ai' | 'cyber';
export type Tag = 'pattern' | 'math' | 'logic';
export type Strength = Tag | 'start';
export type TechLevel = 'beginner' | 'basic' | 'advanced';

export type ShapeName = 'circle' | 'square' | 'triangle';
export type ColorName = 'green' | 'blue' | 'yellow';
export type IconName = 'mouse' | 'keyboard' | 'screen' | 'speaker';

/** A picture shown above the options. `null` entries are the "?" slot. */
export type QuestionVisual =
  | { kind: 'shapeSeq'; items: ({ shape: ShapeName; color: ColorName } | null)[] }
  | { kind: 'dotSeq'; counts: (number | null)[] }
  | { kind: 'shapeGrid'; cells: ({ shape: ShapeName; color: ColorName } | null)[] }
  | { kind: 'dotGrid'; counts: (number | null)[] }
  | {
      kind: 'robotGrid';
      size: number;
      /** [column, row] with 0,0 at the top-left. The robot faces up. */
      start: [number, number];
      marks: { label: string; at: [number, number] }[];
    };

/** A picture shown inside an option. */
export type OptionVisual =
  | { kind: 'shape'; shape: ShapeName; color: ColorName }
  | { kind: 'dots'; n: number }
  | { kind: 'icon'; name: IconName };

export type TestLang = 'ar' | 'en';

interface BaseOption {
  id: string;
  label: string;
  /** English label; options without one (numbers, brand names) use `label`. */
  en?: string;
  visual?: OptionVisual;
}

interface BaseQuestion {
  id: string;
  prompt: string;
  /** A maths expression or number sequence, always shown left to right. */
  expr?: string;
  /** A short program, one line per item; two leading spaces indent a line. */
  program?: string[];
  /** English wording for the question. */
  en?: { prompt: string; program?: string[] };
  visual?: QuestionVisual;
}

export interface ChoiceQuestion extends BaseQuestion {
  kind: 'thinking' | 'tech';
  /** Only for thinking questions. */
  tag?: Tag;
  options: BaseOption[];
  correct: string;
}

export interface ExperienceQuestion extends BaseQuestion {
  kind: 'experience';
  options: (BaseOption & { points: number; none?: boolean })[];
}

export interface InterestQuestion extends BaseQuestion {
  kind: 'interest';
  options: (BaseOption & { track: Track })[];
}

export type Question = ChoiceQuestion | ExperienceQuestion | InterestQuestion;

export interface TestDefinition {
  version: VersionId;
  tracks: Track[];
  techMax: number;
  /** Lowest tech points for [basic, advanced]. */
  techThresholds: [number, number];
  questions: Question[];
}

/** What the browser receives: no answers, points or track mapping. */
export interface PublicOption {
  id: string;
  label: string;
  visual?: OptionVisual;
  /** True for the exclusive "none of these" option in a multi-select. */
  exclusive?: boolean;
}

export interface PublicQuestion {
  id: string;
  section: 'thinking' | 'tech' | 'interest';
  multi: boolean;
  prompt: string;
  expr?: string;
  program?: string[];
  visual?: QuestionVisual;
  options: PublicOption[];
}

export interface PublicTest {
  version: VersionId;
  lang: TestLang;
  questions: PublicQuestion[];
}

export type Answers = Record<string, string | string[]>;

export interface ScoreResult {
  thinking: { correct: number; total: number };
  strength: Strength;
  tech: { points: number; max: number; level: TechLevel };
  tracks: Partial<Record<Track, number>>;
  top: Track;
  second: Track | null;
  tie: boolean;
}

/** What the parent's browser receives after submitting. */
export interface PublicResult {
  childName: string;
  version: VersionId;
  top: Track;
  second: Track | null;
  tie: boolean;
  strength: Strength;
  saved: boolean;
}
