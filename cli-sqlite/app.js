const { rl, prompt } = require('./utils/input')
const quizRepository = require('./data/databaseService')

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

        let categoryIds = await quizRepository.getAllCategoriesIds()
        for (let i = 0; i < categoryIds.length; i++) {
            let categoryId = categoryIds[i].id
            console.log(`(${i + 1}) ${categoryId}`)
        }

        console.log(`(0) Quit`)

        rl.question(prompt, async function onSelectedCategoryInput(input) {
            let option = parseInt(input)
            if (isNaN(option) || option < 0 || option > categoryIds.length) {
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
