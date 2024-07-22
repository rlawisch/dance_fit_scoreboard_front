export const getScorePlate = (
  great: number,
  good: number,
  bad: number,
  miss: number,
  stage_pass: boolean
) => {
  if (stage_pass) {
    if (miss >= 21) {
      return "RG";
    }
    if (miss >= 11) {
      return "FG";
    }
    if (miss >= 6) {
      return "TG";
    }
    if (miss >= 1) {
      return "MG";
    }
    if (great + good + bad + miss === 0) {
      return "PG";
    }
    if (good + bad + miss === 0) {
      return "UG";
    }
    if (bad + miss === 0) {
      return "EG";
    }
    if (miss === 0) {
      return "SG";
    }
  }

  return undefined;
};