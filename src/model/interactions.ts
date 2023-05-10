export interface ResponseWithDistance {
    response: string
    distance: number
    requestInCsv: string
}

export interface Interaction {
    id: number
    requestTimestamp: Date
    requestText: string
    source: string
    responseTimestamp: Date
    searchResult: ResponseWithDistance[] // responses sorted by distance from nearest request in CSV (first is most probable response)
    searchThreshold: number,
    responseText: string
}

export interface Page {
    from: number,
    to: number,
    overallPages: number,
    overallInteractions: number,
    pageSize: number,
    currentPage: number
}
