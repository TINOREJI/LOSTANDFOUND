export const calculateSimilarity = (finderAnswers, claimantAnswers, weights) => {
    let score = 0;
    let totalWeight = weights.reduce((a, b) => a + b, 0);

    Object.keys(finderAnswers).forEach((key, i) => {
        const finderVal = finderAnswers[key]?.toLowerCase() || "";
        const claimantVal = claimantAnswers[key]?.toLowerCase() || "";

        if (finderVal === claimantVal) score += weights[i];
        else if (finderVal && claimantVal && finderVal.includes(claimantVal)) score += weights[i] * 0.5;
    });

    return Math.round((score / totalWeight) * 100);
};
