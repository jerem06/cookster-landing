/**
 * Converts a numeric index (0-6) to a human-readable time duration string
 * @param index - Number between 0 and 6
 * @returns Time duration string (e.g., "5min", "1h", "2h+")
 */
export const indexToTimeDuration = (index: number): string => {
  const timeMap: { [key: number]: string } = {
    0: "5m",
    1: "10m",
    2: "15m",
    3: "20m",
    4: "30m",
    5: "45m",
    6: "1h",
    7: "1h30",
    8: "2h",
    9: "3h+",
  };

  return timeMap[index] || "5min"; // Returns '5min' as default if index is invalid
};
