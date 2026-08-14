export function festivalDate() {
  // Return the next occurrence of the festival date (Sep 14)
  const now = new Date()
  const year = now.getFullYear()
  // Set festival to September 14th at 00:00 local time
  let fd = new Date(year, 8, 14)
  if (fd.getTime() <= now.getTime()) {
    fd = new Date(year + 1, 8, 14)
  }
  return fd
}
