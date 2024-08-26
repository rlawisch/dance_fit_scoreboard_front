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

  const valuePart = (0.995 * weights * 1000000 / total_notes)

  const comboPart = (0.005 * max_combo * 1000000 / total_notes)

  const calculatedScore = Math.floor(valuePart + comboPart)

  return calculatedScore
};
