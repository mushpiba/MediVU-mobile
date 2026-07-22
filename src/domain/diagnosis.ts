import type { DiagnosisCandidate, Keyword, ScoredDiagnosis } from './types'

export function scoreDiagnoses(keywords: Keyword[], candidates: DiagnosisCandidate[]): ScoredDiagnosis[] {
  const activeLabels = [...new Set(keywords.map(({ label }) => label.trim()).filter(Boolean))]

  return candidates
    .map((candidate) => {
      const matchedKeywords = activeLabels.filter((label) => candidate.keywordWeights[label] !== undefined)
      const weightedScore = matchedKeywords.reduce((score, label) => score + candidate.keywordWeights[label], candidate.baseScore)
      return { ...candidate, score: Math.min(99, Math.max(1, Math.round(weightedScore))), matchedKeywords }
    })
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name, 'ko'))
    .slice(0, 5)
}
