const rl = require('readline-sync')
const shuffle = require('../utils/shuffle')
const prompt = '>>> '

module.exports = class Quiz {
    constructor(category, mcqs) {
        this.category = category
        this.mcqs = mcqs
    }

    startQuiz() {
        return new Promise(resolve => {
            // Set the current question index to be the first
            this.questionIndex = 0
            this.onEndQuiz = resolve
            this.askCurrentQuestion()
        })
    }

    askCurrentQuestion() {
        console.log()
        // Get the current mcq to be asked
        let currentMcq = this.mcqs[this.questionIndex]

        // Print out the question
        console.log(`Question ${this.questionIndex + 1}:`)
        console.log(currentMcq.question)

        // Shuffle the choices
        shuffle(currentMcq.choices)

        // Print out the choices
        for (let i = 0; i < currentMcq.choices.length; i++) {
            let choice = currentMcq.choices[i]
            console.log(`(${i + 1}) ${choice.text}`)
        }

        // Show allowed commands for the current question

        // If first question, only allow them to move forward
        if (this.questionIndex <= 0) {
            console.log(
                `<enter 1 to ${currentMcq.choices.length} for answer, N for next question>`
            )
            // If last question, only allow them to move backward
        } else if (this.questionIndex >= this.mcqs.length) {
            console.log(
                `<enter 1 to ${currentMcq.choices.length} for answer, P for previous question>`
            )
            // Else it is in the middle, allow them to move forward and back
        } else {
            console.log(
                `<enter 1 to ${currentMcq.choices.length} for answer, P for previous question, N for next question>`
            )
        }

        // Prompt user for a command
        let input = rl.question(prompt)

        this.handleQuestionInput(input)
    }

    handleQuestionInput(input) {
        input = input.toLowerCase()
        // If user wants to go backward
        if (input === 'p') {
            // Check if user is allowed to go back
            if (this.questionIndex <= 0) {
                console.log('Error. You are attempting the first question.')
                input = rl.question(prompt)
                this.handleQuestionInput(input)
                return
            }

            // Change current question index to previous question then ask that question
            this.questionIndex -= 1
            this.askCurrentQuestion()
            return
            // If user wants to go forward
        } else if (input === 'n') {
            // Check if user is allowed to go forward
            if (this.questionIndex >= this.mcqs.length - 1) {
                console.log('Error. You are attempting the last question.')
                input = rl.question(prompt)
                this.handleQuestionInput(input)
                return
            }

            // Change current question index to next question then ask that question
            this.questionIndex += 1
            this.askCurrentQuestion()
            return
        }

        // Parse input
        let option = parseInt(input)
        let currentMcq = this.mcqs[this.questionIndex]

        // check if input is valid
        if (isNaN(option) || option < 1 || option > currentMcq.choices.length) {
            console.log('Error. Invalid option.')
            input = rl.question(prompt)
            this.handleQuestionInput(input)
            return
        }

        // By now should all be valid options
        let selectedId = currentMcq.choices[option - 1].id
        currentMcq.setSelectedChoices([selectedId])

        this.questionIndex++

        // If user answered the last question, prompt user if he wants to submit
        if (this.questionIndex >= this.mcqs.length) {
            this.beforeSubmitQuiz()
            return
        }

        this.askCurrentQuestion()
    }

    // Show user's current answers
    beforeSubmitQuiz() {
        console.log()
        console.log('Here are you answers:')

        for (let i = 0; i < this.mcqs.length; i++) {
            let mcq = this.mcqs[i]

            console.log()
            console.log(`Question ${i + 1}: ${mcq.question}`)

            // Get the user's selected choice(s)
            let selectedChoices = ''
            for (let j = 0; j < mcq.choices.length; j++) {
                let choice = mcq.choices[j]
                if (choice.isSelected) {
                    selectedChoices += `(${j + 1}) ${choice.text} `
                }
            }

            // if no selected choice
            if (selectedChoices === '') {
                console.log('Not attempted')
                // If have selected choice(s)
            } else {
                console.log(`Answer: ${selectedChoices}`)
            }
        }

        console.log()
        console.log(
            `Enter 0 to submit your quiz or [1 to ${this.mcqs.length}] to change you answer`
        )

        let input = rl.question(prompt)
        this.handleSubmitQuiz(input)
    }

    // Check if user wants to submit quiz or return to a particular question
    handleSubmitQuiz(input) {
        let option = parseInt(input)
        if (isNaN(option) || option < 0 || option > this.mcqs.length) {
            console.log('Error. Invalid option.')
            input = rl.question(prompt)
            this.handleSubmitQuiz(input)
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

    // Calculate the results and show it to user
    submitQuiz() {
        let totalCorrect = 0
        let hasSelection = false
        for (let mcq of this.mcqs) {
            let isCorrect = true
            for (let choice of mcq.choices) {
                if (choice.isSelected) {
                    hasSelection = true
                    if (!choice.isCorrect) {
                        isCorrect = false
                        break
                    }
                }
            }

            if (isCorrect && hasSelection) {
                totalCorrect++
            }
        }

        console.log()
        console.log(
            `Your score for ${this.category} quiz is: ${totalCorrect}/${this.mcqs.length}`
        )

        // Call promise's resolve to end the quiz
        this.onEndQuiz()
    }
}
