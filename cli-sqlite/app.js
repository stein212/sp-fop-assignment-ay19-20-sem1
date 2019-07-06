const { rl, prompt } = require('./utils/input')
const quizRepository = require('./data/databaseService')

// https://en.wikipedia.org/wiki/Immediately_invoked_function_expression
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
;(async function() {
    let name = ''

    function promptName() {
        console.log()
        rl.question('Please enter your name: ', onNameInput)
    }

    function onNameInput(input) {
        name = input

        promptSelectCategory()
    }

    async function promptSelectCategory() {
        console.log()
        console.log(
            `Hi ${name}, please choose the quiz category you would like to attempt:`
        )

        // wait for the `getAllCategoriesIds` promise to finish then move on to use the ids
        let categoryIds = await quizRepository.getAllCategoriesIds()
        for (let i = 0; i < categoryIds.length; i++) {
            let categoryId = categoryIds[i].id
            console.log(`(${i + 1}) ${categoryId}`)
        }

        console.log(`(0) Quit`)

        rl.question(prompt, async function onSelectedCategoryInput(input) {
            let option = parseInt(input)
            if (isNaN(option) || option < 0 || option > categoryIds.length) {
                console.log('Error. Invalid option.')
                promptSelectCategory()
                return
            }

            if (option === 0) process.exit()

            let selectedCategoryId = categoryIds[option - 1].id

            let quiz = await quizRepository.getQuizOfCategory(
                selectedCategoryId
            )

            quiz.startQuiz().then(promptSelectCategory)
        })
    }

    // start
    console.log('-= Welcome to Quiz Application =-')
    promptName()
})()
