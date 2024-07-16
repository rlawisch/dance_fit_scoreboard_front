export const getScorePlate = (
  great: number,
  good: number,
  bad: number,
  miss: number,
  stage_pass: boolean
) => {

  if (!!stage_pass) {
    if (miss >= 21) {
      return "RG";
    } else if (miss >= 11 && miss <= 20) {
      return "FG";
    } else if (miss >= 6 && miss <= 10) {
      return "TG";
    } else if (miss >= 1 && miss <= 5) {
      return "MG";
    } else if (miss === 0) {
      return "SG";
    } else if (bad + miss === 0) {
      return "EG";
    } else if (good + bad + miss === 0) {
      return "UG";
    } else if (great + good + bad + miss === 0) {
      return "PG";
    }
  }

  return undefined;
};
