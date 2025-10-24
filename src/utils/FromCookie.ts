// Loggar ut alla cookies i konsolen för felsökning
export function logAllCookies() {
  console.log('Alla cookies:', document.cookie);
}
// Sätter orderId i cookie med rätt inställningar
export function setOrderIdCookie(orderId: string) {
  let cookieString = `orderId=${orderId}; path=/`;
  // Om vi kör på https (produktion), lägg till Secure och SameSite=None
  if (window.location.protocol === "https:") {
    cookieString += "; SameSite=None; Secure";
  }
  document.cookie = cookieString;
}
// Sätter cartId i cookie med rätt inställningar
export function setCartIdCookie(cartId: string) {
  let cookieString = `cartId=${cartId}; path=/`;
  // Om vi kör på https (produktion), lägg till Secure och SameSite=None
  if (window.location.protocol === "https:") {
    cookieString += "; SameSite=None; Secure";
  }
  document.cookie = cookieString;
}

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