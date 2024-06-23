const MTRG_TOKEN_ADDRESS = "0x8a419ef4941355476cf04933e90bf3bbf2f73814";

const formatTime = (seconds) => {
  if (seconds == 0) {
    return "0 seconds";
  }

  const days = Math.floor(seconds / (24 * 3600));
  seconds %= 24 * 3600;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  let result = "";
  if (days > 0) {
    result += `${days}d `;
  }
  if (hours > 0) {
    result += `${hours}hr `;
  }
  if (minutes > 0) {
    result += `${minutes}min `;
  }
  if (secs > 0) {
    result += `${secs}s`;
  }

  return result.trim();
};

const CURRENT_FEE = 10;

module.exports = { MTRG_TOKEN_ADDRESS, formatTime, CURRENT_FEE };
