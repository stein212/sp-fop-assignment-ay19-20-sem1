const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const prompt = '>>> '

module.exports = {
    rl,
    prompt,
}
