const sqlite = require('sqlite')
const path = require('path')
const Quiz = require('../models/quiz')
const MCQ = require('../models/mcq')

const sqliteFilePath = path.join(
    path.dirname(require.main.filename),
    'data/app.db'
)

let quizRepository = {
    async getAllCategoriesIds() {
        const db = await sqlite.open(sqliteFilePath)

        let quizzes = await db.all('SELECT * FROM Categories')

        return quizzes
    },

    async getQuizOfCategory(categoryId) {
        const db = await sqlite.open(sqliteFilePath)
        console.log(categoryId)

        let getAllMcqsOfCategory = `
            SELECT id, question FROM Mcqs m
            INNER JOIN CategoryMcqs cm
            WHERE m.id = cm.mcqId
            AND cm.categoryId = '${categoryId}'
            ORDER BY m.id
        `
        let mcqResults = await db.all(getAllMcqsOfCategory)

        let getAllChoicesOfMcqsOfCategory = `
            SELECT c.mcqId, c.id, text, isCorrect FROM Choices c
            INNER JOIN Mcqs m
            INNER JOIN CategoryMcqs cm
            WHERE c.mcqId = m.id
            AND m.id = cm.mcqId
            AND cm.categoryId = 'IT'
            ORDER BY m.id, c.id
        `

        let choiceResults = await db.all(getAllChoicesOfMcqsOfCategory)

        let mcqs = []
        for (let i = mcqResults.length - 1; i >= 0; i--) {
            let mcqResult = mcqResults[i]
            let choices = []
            for (let i = choiceResults.length - 1; i >= 0; i--) {
                let choiceResult = choiceResults[i]
                if (choiceResult.mcqId === mcqResult.id) {
                    let choice = {
                        id: choiceResult.id,
                        text: choiceResult.text,
                        isCorrect: choiceResult.isCorrect,
                    }

                    choices.unshift(choice)
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
