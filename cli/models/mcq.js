module.exports = class MCQ {
    constructor(question, choices) {
        this.question = question

        for (let choice of choices) {
            choice.isSelected = false
        }
        this.choices = choices
    }

    getCorrectAnswers() {
        let correctAnswers = []
        for (let choice of this.choices) {
            if (choice.isCorrect) {
                correctAnswers.push(correctAnswers)
            }
        }

        return correctAnswers
    }

    setSelectedChoices(selectedChoiceIds) {
        this.resetSelectedChoices()

        for (let choice of this.choices) {
            if (selectedChoiceIds.indexOf(choice.id) > -1) {
                choice.isSelected = true
            }
        }
    }

    resetSelectedChoices() {
        for (let choice of this.choices) {
            choice.isSelected = false
        }
    }
}
