export function formatTimestamp(timestamp) {
    return new Date(timestamp * 1000).toDateString()
}

export function formatPercentage(percentageStr) {
    return Number.parseFloat(percentageStr).toFixed(2) + '%'
}

export function formatPrice(percentageStr) {
    return Number.parseFloat(percentageStr).toFixed(2)
}

export function deepCopy(srcObj, ...excludes) {
    const targetObj = Object.assign({}, srcObj)
    for(let ex of excludes)
        delete targetObj[ex]
    return targetObj
}