export const generateUniqueId = () => {
  const timestamp = new Date().getTime();
  const random = Math.random().toString(36).substring(2, 8); // Generate a random string
  return `${timestamp}_${random}`; // Concatenate timestamp and random string
};
export const setinLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
export const convertTimeString = (timeString) => {
  // Split the string into hours and minutes
  const [hours, minutes] = timeString.split(":").map(Number);

  let result = "";

  if (hours > 0) {
    result += `${hours} hour${hours > 1 ? "s" : ""}`; // Add plural 's' if hours > 1
  }

  if (minutes > 0) {
    result +=
      (hours > 0 ? " " : "") + `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }

  return result || "0 minutes"; // Default to '0 minutes' if no time is given
};
