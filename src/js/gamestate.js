export const GameState = {
  score: 0,
  highScore: parseInt(localStorage.getItem("wizardHighScore")) || 0,

  checkHighScore: function () {
    if (this.score > this.highScore) {
      this.highScore = this.score;
      // Save the new high score to the local storage
      localStorage.setItem("wizardHighScore", this.highScore);
    }
  },
};
