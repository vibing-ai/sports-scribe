export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function formatScore(homeScore: number | null, awayScore: number | null): string {
  if (homeScore === null || awayScore === null) {
    return 'TBD'
  }
  return `${homeScore} - ${awayScore}`
}

export function formatSportName(sport: string): string {
  const sportNames: Record<string, string> = {
    nfl: 'NFL',
    nba: 'NBA',
    mlb: 'MLB',
    nhl: 'NHL',
    soccer: 'Soccer',
    football: 'Football',
    basketball: 'Basketball',
    baseball: 'Baseball',
    hockey: 'Hockey',
    tennis: 'Tennis',
  }

  return sportNames[sport.toLowerCase()] || sport.charAt(0).toUpperCase() + sport.slice(1)
}

export function formatGameStatus(status: string): string {
  const statusMap: Record<string, string> = {
    scheduled: 'Scheduled',
    live: 'Live',
    final: 'Final',
    postponed: 'Postponed',
    cancelled: 'Cancelled',
  }

  return statusMap[status.toLowerCase()] || status
}

export function formatReadingTime(wordCount: number): string {
  const wordsPerMinute = 200
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}
