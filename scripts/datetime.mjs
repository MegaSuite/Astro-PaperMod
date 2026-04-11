function pad(value) {
  return String(value).padStart(2, "0");
}

function getTimezoneOffsetString(date) {
  const offsetMinutes = -date.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const absolute = Math.abs(offsetMinutes);
  const hours = pad(Math.floor(absolute / 60));
  const minutes = pad(absolute % 60);

  return `${sign}${hours}:${minutes}`;
}

export function getCurrentIsoDatetimeWithOffset() {
  const now = new Date();
  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1);
  const date = pad(now.getDate());
  const hour = pad(now.getHours());
  const minute = pad(now.getMinutes());
  const second = pad(now.getSeconds());
  const timezone = getTimezoneOffsetString(now);

  return `${year}-${month}-${date}T${hour}:${minute}:${second}.000${timezone}`;
}
