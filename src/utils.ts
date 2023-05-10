export function dateTimeFormatted(dateIso: Date) {
    // dateIso example: 2023-04-04T11:49:52.789068
    let date = new Date(dateIso.toString())
    return date.toLocaleString()
}