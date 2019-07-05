const sqlite = require('sqlite')
const path = require('path')
const Quiz = require('../models/quiz')
const MCQ = require('../models/mcq')

// Get the file path to sqlite db file
const sqliteFilePath = path.join(
    path.dirname(require.main.filename),
    'data/app.db'
)

let quizRepository = {
    async getAllCategoriesIds() {
        // Open connection to db
        const db = await sqlite.open(sqliteFilePath)

        // Run the query
        let quizzes = await db.all('SELECT * FROM Categories')

        return quizzes
    },

    async getQuizOfCategory(categoryId) {
        const db = await sqlite.open(sqliteFilePath)

        // Prepare the query
        let getAllMcqsOfCategory = `
            SELECT id, question FROM Mcqs m
            INNER JOIN CategoryMcqs cm
            WHERE m.id = cm.mcqId
            AND cm.categoryId = '${categoryId}'
            ORDER BY m.id
        `
        // Run the query
        let mcqResults = await db.all(getAllMcqsOfCategory)

        // Prepare the query
        let getAllChoicesOfMcqsOfCategory = `
            SELECT c.mcqId, c.id, text, isCorrect FROM Choices c
            INNER JOIN Mcqs m
            INNER JOIN CategoryMcqs cm
            WHERE c.mcqId = m.id
            AND m.id = cm.mcqId
            AND cm.categoryId = 'IT'
            ORDER BY m.id, c.id
        `
        // Run the query
        let choiceResults = await db.all(getAllChoicesOfMcqsOfCategory)

        // Convert the results from the query into actual MCQ and Quiz objects
        let mcqs = []
        for (let i = mcqResults.length - 1; i >= 0; i--) {
            let mcqResult = mcqResults[i]
            let choices = []
            // Looping backwards to delete easier
            for (let i = choiceResults.length - 1; i >= 0; i--) {
                let choiceResult = choiceResults[i]
                if (choiceResult.mcqId === mcqResult.id) {
                    let choice = {
                        id: choiceResult.id,
                        text: choiceResult.text,
                        isCorrect: choiceResult.isCorrect,
                    }

                    choices.unshift(choice)
                    // Delete so that the next mcq does not need to loop it again
                    choiceResults.splice(i, 1)
                }
            }

            let mcq = new MCQ(mcqResult.id, mcqResult.question, choices)

            mcqs.unshift(mcq)
        }

        let quiz = new Quiz(categoryId, mcqs)

        return quiz
    },
}

module.exports = quizRepository
