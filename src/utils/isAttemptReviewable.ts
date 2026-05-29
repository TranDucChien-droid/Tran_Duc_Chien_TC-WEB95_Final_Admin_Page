export function isAttemptReviewable(attempt: { reviewable?: boolean }): boolean {
  return attempt.reviewable === true;
}
