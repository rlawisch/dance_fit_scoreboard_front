import {
  MAX_MUSIC_NAME_SIZE_SMALL_SCREENS,
  MAX_MUSIC_NAME_SIZE_MEDIUM_SCREENS,
  MAX_MUSIC_NAME_SIZE_LARGE_SCREENS,
  SMALL_SCREEN_BP,
  MEDIUM_SCREEN_BP,
  LARGE_SCREEN_BP,
} from "./constants";

export const stringShortener = (windowSize: number, string: string) => {
    if (windowSize <= SMALL_SCREEN_BP && string.length > MAX_MUSIC_NAME_SIZE_SMALL_SCREENS) {
      return string.substring(0, MAX_MUSIC_NAME_SIZE_SMALL_SCREENS) + "...";
    }
  
    if (windowSize > SMALL_SCREEN_BP && windowSize <= MEDIUM_SCREEN_BP && string.length > MAX_MUSIC_NAME_SIZE_MEDIUM_SCREENS) {
      return string.substring(0, MAX_MUSIC_NAME_SIZE_MEDIUM_SCREENS) + "...";
    }
  
    if (windowSize > MEDIUM_SCREEN_BP && windowSize <= LARGE_SCREEN_BP && string.length > MAX_MUSIC_NAME_SIZE_LARGE_SCREENS) {
      return string.substring(0, MAX_MUSIC_NAME_SIZE_MEDIUM_SCREENS) + "...";
    }
  
    if (windowSize > LARGE_SCREEN_BP && string.length > MAX_MUSIC_NAME_SIZE_LARGE_SCREENS) {
      return string.substring(0, MAX_MUSIC_NAME_SIZE_LARGE_SCREENS) + "...";
    }
  
    return string; // Return the original string if no truncation is needed
  };