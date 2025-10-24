
// hämtar cartId från cookie
//https://javascript.info/cookie
export function getCartIdFromCookie(): string | null {
  const match = document.cookie.match(/cartId=([^;]+)/);
  return match ? match[1] : null;
}

export function getOrderIdFromCookie(): string | null {
  const match = document.cookie.match(/orderId=([^;]+)/);
  return match ? match[1] : null;
}