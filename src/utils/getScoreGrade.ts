export const getScoreGrade = (value: number) => {
  if (value >= 995000) {
    return "SSS+";
  }
  if (value >= 990000) {
    return "SSS";
  }
  if (value >= 985000) {
    return "SS+";
  }
  if (value >= 980000) {
    return "SS";
  }
  if (value >= 975000) {
    return "S+";
  }
  if (value >= 970000) {
    return "S";
  }
  if (value >= 960000) {
    return "AAA+";
  }
  if (value >= 950000) {
    return "AAA";
  }
  if (value >= 925000) {
    return "AA+";
  }
  if (value >= 900000) {
    return "AA";
  }
  if (value >= 825000) {
    return "A+";
  }
  if (value >= 750000) {
    return "A";
  }
  if (value >= 650000) {
    return "B";
  }
  if (value >= 550000) {
    return "C";
  }
  if (value >= 450000) {
    return "D";
  }
  if (value >= 0) {
    return "F";
  }

  // Handle cases where value is not within the expected range
  return "Invalid score";
};