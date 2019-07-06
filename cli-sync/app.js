const fs = require('fs')
const Quiz = require('./models/quiz')
const MCQ = require('./models/mcq')
const rl = require('readline-sync')

const prompt = '>>> '

let quizzes = []

// Load in the json data file and parse it
let mcqsJson = JSON.parse(fs.readFileSync('data/mcqs.json'))

// Create the MCQ objects and add to Quiz objects
for (let categoryJson of mcqsJson) {
    let mcqs = []
    for (let mcqJson of categoryJson.mcqs) {
        let mcq = new MCQ(mcqJson.question, mcqJson.choices)
        mcqs.push(mcq)
    }

    let quiz = new Quiz(categoryJson.category, mcqs)

    quizzes.push(quiz)
}

// start
console.log('-= Welcome to Quiz Application =-')

// Prompt for name
console.log()
let name = rl.question('Please enter your name: ')

// Prompt for a category
promptSelectCategory()

// the function is recursive and will call itself if the user gives it an invalid input
function promptSelectCategory() {
    console.log()
    console.log(
        `Hi ${name}, please choose the quiz category you would like to attempt:`
    )
    // Show list of quiz options
    for (let i = 0; i < quizzes.length; i++) {
        let quiz = quizzes[i]
        console.log(`(${i + 1}) ${quiz.category}`)
    }

    console.log(`(0) Quit`)

    // Prompt user for selection
    let input = rl.question(prompt)

    // Parse the input into an integer
    let option = parseInt(input)

    // Check if the integer is actually an integer and within the allowed range
    if (isNaN(option) || option < 0 || option > quizzes.length) {
        console.log('Error. Invalid option.')
        promptSelectCategory()
        return
    }

    if (option === 0) process.exit()

    // Start the quiz
    quizzes[option - 1].startQuiz().then(promptSelectCategory)
}
