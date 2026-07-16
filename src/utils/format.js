export function festivalDate() {
  // Return the next occurrence of the festival date (example: Sep 1)
  const now = new Date()
  const year = now.getFullYear()
  // Set festival to September 1st at 00:00 local time
  let fd = new Date(year, 8, 1)
  if (fd.getTime() <= now.getTime()) {
    fd = new Date(year + 1, 8, 1)
  }
  return fd
}
