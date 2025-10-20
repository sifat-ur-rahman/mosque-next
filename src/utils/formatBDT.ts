// utils/formatBDT.ts
export function formatBDT(
    price: number,
    showDecimals = false,
    showSymbol = false,
): string {
    const formattedPrice = price.toLocaleString('en-BD', {
        minimumFractionDigits: showDecimals ? 2 : 0,
        maximumFractionDigits: showDecimals ? 2 : 0,
    });

    return showSymbol ? `৳ ${formattedPrice}` : formattedPrice;
}
