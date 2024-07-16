export const getScoreGrade = (value: number) => {
  if (value >= 995000 && value <= 1000000) {
    return "SSS+";
  } else if (value >= 990000 && value <= 994999) {
    return "SSS";
  } else if (value >= 985000 && value <= 989999) {
    return "SS+";
  } else if (value >= 980000 && value <= 984999) {
    return "SS";
  } else if (value >= 975000 && value <= 979999) {
    return "S+";
  } else if (value >= 970000 && value <= 974999) {
    return "S";
  } else if (value >= 960000 && value <= 969999) {
    return "AAA+";
  } else if (value >= 950000 && value <= 959999) {
    return "AAA";
  } else if (value >= 925000 && value <= 949999) {
    return "AA+";
  } else if (value >= 900000 && value <= 924999) {
    return "AA";
  } else if (value >= 825000 && value <= 899999) {
    return "A+";
  } else if (value >= 750000 && value <= 824999) {
    return "A";
  } else if (value >= 650000 && value <= 749999) {
    return "B";
  } else if (value >= 550000 && value <= 649999) {
    return "C";
  } else if (value >= 450000 && value <= 549999) {
    return "D";
  } else if (value >= 0 && value <= 449999) {
    return "F";
  }

  // Handle cases where value is not within the expected range
  return "Invalid score";
};
