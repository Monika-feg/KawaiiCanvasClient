
// hämtar cartId från cookie
//https://javascript.info/cookie
export function getCartIdFromCookie(): string | null {
  const match = document.cookie.match(/cartId=([^;]+)/);
  return match ? match[1] : null;
}