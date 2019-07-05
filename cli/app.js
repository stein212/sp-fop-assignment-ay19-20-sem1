const fs = require('fs')
const Quiz = require('./models/quiz')
const MCQ = require('./models/mcq')
const { rl, prompt } = require('./utils/input')

let mcqsJson = JSON.parse(fs.readFileSync('data/mcqs.json'))

let quizzes = []

for (let categoryJson of mcqsJson) {
    let mcqs = []
    for (let mcqJson of categoryJson.mcqs) {
        let mcq = new MCQ(mcqJson.question, mcqJson.choices)
        mcqs.push(mcq)
    }

    let quiz = new Quiz(categoryJson.category, mcqs)

    quizzes.push(quiz)
}

let name = ''

function promptName() {
    console.log()
    rl.question('Please enter your name: ', onNameInput)
}

function onNameInput(input) {
    name = input

    promptSelectCategory()
}

function promptSelectCategory() {
    console.log()
    console.log(
        `Hi ${name}, please choose the quiz category you would like to attempt:`
    )
    for (let i = 0; i < quizzes.length; i++) {
        let quiz = quizzes[i]
        console.log(`(${i + 1}) ${quiz.category}`)
    }

    console.log(`(0) Quit`)

    rl.question(prompt, function onSelectedCategoryInput(input) {
        let option = parseInt(input)
        if (isNaN(option) || option < 0 || option > quizzes.length) {
            promptSelectCategory()
            return
        }

        if (option === 0) process.exit()

        quizzes[option - 1].startQuiz().then(promptSelectCategory)
    })
}

// start
console.log('-= Welcome to Quiz Application =-')
promptName()
