

// håller localstorage giltig i fem dagar
const FIVE_DAYS_MS = 5 * 24 * 60 * 60 * 1000;

// genererar ett unikt id med prefix
function generateId(prefix: string = "id"): string {
	return prefix + "-" + Math.random().toString(36).slice(2, 9) + Date.now();
}

// sätter cartId i localstorage med utgångstid
export function setCartIdToLocalstorage(cartId: string): void {
	const data = {
		value: cartId,
		expires: Date.now() + FIVE_DAYS_MS
	};
	localStorage.setItem("cartId", JSON.stringify(data));
}

// hämtar cartId från localstorage, skapar ny om ingen giltig finns
export function getCartIdFromLocalstorage(): string {
	const item = localStorage.getItem("cartId");
	if (item) {
		try {
			const data = JSON.parse(item);
			if (data.expires && data.expires > Date.now()) {
				return data.value;
			}
		} catch {}
	}
	// Om ingen giltig cartId, skapa ny
	const newId = generateId("cart");
	setCartIdToLocalstorage(newId);
	return newId;
}

// sätter orderId i localstorage med utgångstid
export function setOrderIdToLocalstorage(orderId: string): void {
	const data = {
		value: orderId,
		expires: Date.now() + FIVE_DAYS_MS
	};
	localStorage.setItem("orderId", JSON.stringify(data));
}

// hämtar orderId från localstorage, skapar ny om ingen giltig finns
export function getOrderIdFromLocalstorage(): string {
	const item = localStorage.getItem("orderId");
	if (item) {
		try {
			const data = JSON.parse(item);
			if (data.expires && data.expires > Date.now()) {
				return data.value;
			}
		} catch {}
	}
	// Om ingen giltig orderId, skapa ny
	const newId = generateId("order");
	setOrderIdToLocalstorage(newId);
	return newId;
}