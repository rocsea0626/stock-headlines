export function formatTimestamp(timestamp) {
    return new Date(timestamp * 1000).toDateString()
}

export function formatPercentage(percentageStr) {
    return Number.parseFloat(percentageStr).toFixed(2) + '%'
}

export function formatPrice(percentageStr) {
    return Number.parseFloat(percentageStr).toFixed(2)
}