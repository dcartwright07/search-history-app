export interface Movie {
  Title: string
  Year: string
  Poster: string
  imdbID: string
  Type: string
}

export interface SearchHistory {
  searchTerm: string
  successful: boolean
  dateTime: Date
  totalResults?: number
  errorMessage?: string
}

export interface SearchHistoryOptions {
  totalResults?: number
  errorMessage?: string
}
