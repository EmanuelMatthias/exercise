export const Helper = {
  shuffleArray:(arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  },
  generateWeightedSequenze: (length, maxValue, factor = 2) =>{
    const weights = Array.from({ length: maxValue + 1 }, (_, i) => Math.pow(factor, maxValue - i))
    const totalWeight = weights.reduce((a, b) => a + b, 0)
    function weightedRandom() {
      let r = Math.random() * totalWeight;
      for (let i = 0; i < weights.length; i++) {
        r -= weights[i]
        if (r <= 0) return i;
      }
      return weights.length - 1;
    }
    return Array.from({ length }, () => weightedRandom())
  }
}