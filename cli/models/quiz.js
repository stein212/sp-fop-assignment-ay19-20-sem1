const { rl, prompt } = require('../utils/input')
const shuffle = require('../utils/shuffle')

module.exports = class Quiz {
    constructor(category, mcqs) {
        this.category = category
        this.mcqs = mcqs
    }

    startQuiz() {
        return new Promise(resolve => {
            this.questionIndex = 0
            this.askCurrentQuestion()

            this.onEndQuiz = resolve
        })
    }

    askCurrentQuestion() {
        console.log()
        let currentMcq = this.mcqs[this.questionIndex]

        console.log(`Question ${this.questionIndex + 1}:`)
        console.log(currentMcq.question)

        shuffle(currentMcq.choices)

        for (let i = 0; i < currentMcq.choices.length; i++) {
            let choice = currentMcq.choices[i]
            console.log(`(${i + 1}) ${choice.text}`)
        }

        if (this.questionIndex <= 0) {
            console.log(
                `<enter 1 to ${
                    currentMcq.choices.length
                } for answer, N for next question>`
            )
        } else if (this.questionIndex >= this.mcqs.length) {
            console.log(
                `<enter 1 to ${
                    currentMcq.choices.length
                } for answer, P for previous question>`
            )
        } else {
            console.log(
                `<enter 1 to ${
                    currentMcq.choices.length
                } for answer, P for previous question, N for next question>`
            )
        }

        rl.question(prompt, this.onQuestionInput.bind(this))
    }

    onQuestionInput(input) {
        input = input.toLowerCase()
        if (input === 'p') {
            if (this.questionIndex <= 0) {
                console.log('Error. You are attempting the first question.')
                rl.question(prompt, this.onQuestionInput.bind(this))
                return
            }

            this.questionIndex -= 1
            this.askCurrentQuestion()
            return
        } else if (input === 'n') {
            if (this.questionIndex >= this.mcqs.length - 1) {
                console.log('Error. You are attempting the last question.')
                rl.question(prompt, this.onQuestionInput.bind(this))
                return
            }

            this.questionIndex += 1
            this.askCurrentQuestion()
            return
        }

        let option = parseInt(input)
        let currentMcq = this.mcqs[this.questionIndex]

        if (
            isNaN(option) ||
            (option < 1 || option > currentMcq.choices.length)
        ) {
            console.log('Error. Invalid option.')
            rl.question(prompt, this.onQuestionInput.bind(this))
            return
        }

        // by now should all be valid options
        let selectedId = currentMcq.choices[option - 1].id
        currentMcq.setSelectedChoices([selectedId])

        this.questionIndex++

        if (this.questionIndex >= this.mcqs.length) {
            this.beforeSubmitQuiz()
            return
        }

        this.askCurrentQuestion()
    }

    beforeSubmitQuiz() {
        console.log()
        console.log('Here are you answers:')

        for (let i = 0; i < this.mcqs.length; i++) {
            let mcq = this.mcqs[i]

            console.log()
            console.log(`Question ${i + 1}: ${mcq.question}`)

            let selectedChoices = ''
            for (let j = 0; j < mcq.choices.length; j++) {
                let choice = mcq.choices[j]
                if (choice.isSelected) {
                    selectedChoices += `(${j + 1}) ${choice.text} `
                }
            }

            if (selectedChoices === '') {
                console.log('Not attempted')
            } else {
                console.log(`Answer: ${selectedChoices}`)
            }
        }

        console.log()
        console.log(
            `Enter 0 to submit your quiz or [1 to ${
                this.mcqs.length
            }] to change you answer`
        )

        rl.question(prompt, this.onSubmitQuizInput.bind(this))
    }

    onSubmitQuizInput(input) {
        let option = parseInt(input)
        if (isNaN(option) || option < 0 || option > this.mcqs.length) {
            console.log('Error. Invalid option.')
            rl.question(prompt, this.onSubmitQuizInput.bind(this))
            return
        }

        if (option > 0 && option <= this.mcqs.length) {
            this.questionIndex = option - 1
            this.askCurrentQuestion()
            return
        }

        // submit quiz
        this.submitQuiz()
    }

    submitQuiz() {
        let totalCorrect = 0

        for (let mcq of this.mcqs) {
            let isCorrect = true
            for (let choice of mcq.choices) {
                if (!choice.isCorrect && choice.isSelected) {
                    isCorrect = false
                    break
                }
            }

            if (isCorrect) {
                totalCorrect++
            }
        }

        console.log()
        console.log(
            `Your score for ${this.category} quiz is: ${totalCorrect}/${
                this.mcqs.length
            }`
        )

        this.onEndQuiz()
    }
}
