/**
 * Quiz questions + scoring for the "Saver or Investor?" quiz.
 *
 * Ported from public/invest.html. 10 questions, 4 options each, each
 * option scores 1-4 points. Min score 10, max 40. Score maps to one of
 * 30 investor ranks via lib/ranks.ts.
 *
 * Answer order is shuffled (not monotonic 1-2-3-4) so kids can't just
 * pick "the last option" to top-score the quiz.
 */

export type QuizOption = {
  /** Text shown to the kid */
  label: string;
  /** Points awarded for picking this option (1 = safest, 4 = most aggressive) */
  value: 1 | 2 | 3 | 4;
};

export type QuizQuestion = {
  /** 1-based question number */
  number: number;
  /** Emoji shown next to the question text */
  emoji: string;
  /** The question itself */
  text: string;
  /** Answer options, pre-shuffled */
  options: QuizOption[];
};

export const QUIZ_QUESTIONS: readonly QuizQuestion[] = [
  {
    number: 1,
    emoji: "💵",
    text: "How much money do you have saved up?",
    options: [
      { label: "$500 - $1000", value: 3 },
      { label: "Less than $100", value: 1 },
      { label: "More than $1000!", value: 4 },
      { label: "$100 - $500", value: 2 },
    ],
  },
  {
    number: 2,
    emoji: "⏰",
    text: "When do you need this money back?",
    options: [
      { label: "Not for a long, long time", value: 4 },
      { label: "Next year maybe", value: 2 },
      { label: "Very soon - this year!", value: 1 },
      { label: "In a few years", value: 3 },
    ],
  },
  {
    number: 3,
    emoji: "📉",
    text: "Your $100 turned into $80. What do you do?",
    options: [
      { label: "Take some out, keep some", value: 2 },
      { label: "Add MORE money - it's cheap now!", value: 4 },
      { label: "Take it ALL out right now!", value: 1 },
      { label: "Wait and see what happens", value: 3 },
    ],
  },
  {
    number: 4,
    emoji: "🎯",
    text: "What do you want your money to do?",
    options: [
      { label: "Grow a good amount", value: 3 },
      { label: "Just stay safe, don't grow", value: 1 },
      { label: "Grow as MUCH as possible!", value: 4 },
      { label: "Grow a little bit, slowly", value: 2 },
    ],
  },
  {
    number: 5,
    emoji: "🎁",
    text: "Pick one prize you'd choose:",
    options: [
      { label: "Coin flip: $15 or nothing", value: 2 },
      { label: "Coin flip: $200 or nothing!", value: 4 },
      { label: "$5 right now for sure", value: 1 },
      { label: "Coin flip: $50 or nothing", value: 3 },
    ],
  },
  {
    number: 6,
    emoji: "😌",
    text: "How patient are you when saving for something?",
    options: [
      { label: "Not patient! I want it NOW", value: 1 },
      { label: "I can wait if it's worth it", value: 3 },
      { label: "Super patient - I love waiting!", value: 4 },
      { label: "A little patient", value: 2 },
    ],
  },
  {
    number: 7,
    emoji: "🏆",
    text: "Would you risk losing a little to maybe win a LOT?",
    options: [
      { label: "YES! Big risk, big win!", value: 4 },
      { label: "Maybe just a tiny bit", value: 2 },
      { label: "Yes, that sounds fair", value: 3 },
      { label: "No way, I want all my money", value: 1 },
    ],
  },
  {
    number: 8,
    emoji: "📈",
    text: "Your money goes down a little bit every day for a whole month. How do you feel?",
    options: [
      { label: "It's okay, this happens", value: 3 },
      { label: "Scared! Get me out of there!", value: 1 },
      { label: "Cool, time to buy more cheap!", value: 4 },
      { label: "Worried but I'll wait a bit", value: 2 },
    ],
  },
  {
    number: 9,
    emoji: "🍋",
    text: "Friend wants to start a lemonade stand together. You put in $10. You might lose it OR make $50. Do you join?",
    options: [
      { label: "Only if I put in less money", value: 2 },
      { label: "YES! And I'll put in more!", value: 4 },
      { label: "No way, I want my $10 safe", value: 1 },
      { label: "Sure, sounds fun!", value: 3 },
    ],
  },
  {
    number: 10,
    emoji: "😎",
    text: "Your friend brags they made $100 from a stock! What do you do?",
    options: [
      { label: "I'm buying it RIGHT NOW!", value: 4 },
      { label: "Nice. I'll stick to my piggy bank", value: 1 },
      { label: "I want to learn about that stock", value: 3 },
      { label: "Cool but I won't copy", value: 2 },
    ],
  },
];

/** Total possible score = questions × max-option-value (10 × 4) */
export const MAX_SCORE = QUIZ_QUESTIONS.length * 4;
/** Minimum possible score = questions × min-option-value (10 × 1) */
export const MIN_SCORE = QUIZ_QUESTIONS.length * 1;

/**
 * Sum the answer values for a completed quiz. `answers[i]` is the point
 * value (1-4) the user picked for question i.
 *
 * Returns null if any answer is missing, so the caller can show a "finish
 * the quiz first" state.
 */
export function scoreQuiz(answers: (number | null)[]): number | null {
  if (answers.length !== QUIZ_QUESTIONS.length) return null;
  if (answers.some((a) => a === null)) return null;
  return (answers as number[]).reduce((sum, v) => sum + v, 0);
}
