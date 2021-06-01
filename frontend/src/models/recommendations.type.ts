export type Recommendation = {
    id: string,
    data: RecommendationData
}

export type RecommendationData = {
    submitterName: string
    submittedLink: string
}