export const getScoreValue = (
  perfect: number,
  great: number,
  good: number,
  bad: number,
  miss: number,
  max_combo: number
) => {

  const weights = 1 * perfect + 0.6 * great + 0.2 * good + 0.1 * bad + 0 * miss;

  const total_notes = perfect + great + good + bad + miss;

  const calculatedScore = Math.floor(
    ((0.995 * weights + 0.005 * max_combo) / total_notes) * 1000000
  );

  return calculatedScore
};
