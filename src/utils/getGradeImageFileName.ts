import { IScore } from "../types/entity-types";

export function getGradeImageFileName(score: IScore | undefined): string {
  let fileNamePrefix = "";

  // Check if stage_pass is false, if yes, prefix with "x_"
  if (!score?.stage_pass) {
    fileNamePrefix = "x_";
  }

  // Check if grade ends with "+", if yes, suffix with "_p"
  if (score?.grade.endsWith("+")) {
    return `/static/musics/grading/${fileNamePrefix}${score.grade.toLowerCase().slice(0, -1)}_p.png`;
  } else {
    return `/static/musics/grading/${fileNamePrefix}${score?.grade.toLowerCase()}.png`;
  }
}
