class MCQ {
    constructor(question, choices) {
        this.question = question

        for (let choice of choices) {
            choice.isSelected = false
        }
        this.choices = choices
        this.isCorrect = false
    }

    resetSelectedChoices() {
        for (let choice of this.choices) {
            choice.isSelected = false
        }
    }

    resetMcq() {
        this.isCorrect = false
        this.resetSelectedChoices()
    }
}
