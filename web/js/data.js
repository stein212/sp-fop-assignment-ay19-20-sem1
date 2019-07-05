const jsonData = [
    {
        category: 'History',
        mcqs: [
            {
                id: 6,
                question: 'Who conquered the world?',
                choices: [
                    { id: 1, text: 'Jack Ma', isCorrect: false },
                    { id: 2, text: 'Elon Musk', isCorrect: true },
                    { id: 3, text: 'Qing Shi Huang', isCorrect: false },
                    { id: 4, text: 'Illuminati', isCorrect: false },
                ],
            },
            {
                id: 7,
                question: 'What is your future?',
                choices: [
                    { id: 1, text: 'Beggar', isCorrect: false },
                    { id: 2, text: 'Dead', isCorrect: true },
                    { id: 3, text: 'Rich', isCorrect: false },
                    { id: 4, text: 'Sufficient', isCorrect: false },
                ],
            },
            {
                id: 8,
                question: 'When did hitler die?',
                choices: [
                    { id: 1, text: 'Now', isCorrect: false },
                    { id: 2, text: 'Just Now', isCorrect: false },
                    { id: 3, text: 'Still alive', isCorrect: false },
                    { id: 4, text: '30 April 1945', isCorrect: true },
                ],
            },
            {
                id: 9,
                question: 'Who founded Earth?',
                choices: [
                    { id: 1, text: 'Me', isCorrect: false },
                    { id: 2, text: 'You', isCorrect: false },
                    { id: 3, text: 'Him', isCorrect: true },
                    { id: 4, text: 'Her', isCorrect: false },
                ],
            },
            {
                id: 10,
                question: 'How old is the universe?',
                choices: [
                    { id: 1, text: '2000+ years old', isCorrect: false },
                    { id: 2, text: '13.4+ billion years old', isCorrect: true },
                    { id: 3, text: '30', isCorrect: false },
                    { id: 4, text: 'Just enough to bang', isCorrect: false },
                ],
            },
        ],
    },
    {
        category: 'IT',
        mcqs: [
            {
                id: 1,
                question: 'What is the best OS?',
                choices: [
                    { id: 1, text: 'MacOS', isCorrect: true },
                    { id: 2, text: 'Windows', isCorrect: false },
                    { id: 3, text: 'Linux', isCorrect: false },
                    { id: 4, text: 'FreeBSD', isCorrect: false },
                ],
            },
            {
                id: 2,
                question:
                    'Who is the most famous tech person among the choices?',
                choices: [
                    { id: 1, text: 'Bill Gates', isCorrect: false },
                    { id: 2, text: 'Steve Jobs', isCorrect: false },
                    { id: 3, text: 'Jeff Bezos', isCorrect: false },
                    { id: 4, text: 'TechLead', isCorrect: true },
                ],
            },
            {
                id: 3,
                question: 'Choose the best language?',
                choices: [
                    { id: 1, text: 'C#', isCorrect: true },
                    { id: 2, text: 'Javascript', isCorrect: false },
                    { id: 3, text: 'Assembly', isCorrect: false },
                    { id: 4, text: 'Swift', isCorrect: false },
                ],
            },
            {
                id: 4,
                question: 'How do you reverse a linked list?',
                choices: [
                    { id: 1, text: 'Swap the pointers', isCorrect: true },
                    {
                        id: 2,
                        text:
                            'Add a pair of pointers to connect the head and tail',
                        isCorrect: false,
                    },
                    {
                        id: 3,
                        text: 'Reduce the list to its main elements',
                        isCorrect: false,
                    },
                    {
                        id: 4,
                        text: 'Scan the memory for its reverse structure',
                        isCorrect: false,
                    },
                ],
            },
            {
                id: 15,
                question: 'Choose the best Laptop Brand',
                choices: [
                    { id: 1, text: 'Apple', isCorrect: true },
                    { id: 2, text: 'Microsoft', isCorrect: false },
                    { id: 3, text: 'Dell', isCorrect: false },
                    { id: 4, text: 'HP', isCorrect: false },
                ],
            },
        ],
    },
    {
        category: 'Tech Hardware',
        mcqs: [
            {
                id: 15,
                question: 'Choose the best Laptop Brand',
                choices: [
                    { id: 1, text: 'Apple', isCorrect: true },
                    { id: 2, text: 'Microsoft', isCorrect: false },
                    { id: 3, text: 'Dell', isCorrect: false },
                    { id: 4, text: 'HP', isCorrect: false },
                ],
            },
            {
                id: 16,
                question: 'Choose the best keyboard brand',
                choices: [
                    { id: 1, text: 'Cooler Masters', isCorrect: false },
                    { id: 2, text: 'Logitech', isCorrect: true },
                    { id: 3, text: 'Razer', isCorrect: false },
                    { id: 4, text: 'Cosair', isCorrect: false },
                ],
            },
            {
                id: 17,
                question: 'Choose the best noise cancelling headphone brand',
                choices: [
                    { id: 1, text: 'Bose', isCorrect: true },
                    { id: 2, text: 'Sony', isCorrect: false },
                    { id: 3, text: 'AudioTechnica', isCorrect: false },
                    { id: 4, text: 'Sennheiser', isCorrect: false },
                ],
            },
            {
                id: 18,
                question: 'Choose the best mouse brand',
                choices: [
                    { id: 1, text: 'Logitech', isCorrect: false },
                    { id: 2, text: 'Razer', isCorrect: false },
                    { id: 3, text: 'Unknown brands', isCorrect: false },
                    { id: 4, text: 'Glorious', isCorrect: true },
                ],
            },
            {
                id: 19,
                question: 'Choose the best monitor brand',
                choices: [
                    { id: 1, text: 'AOC', isCorrect: false },
                    { id: 2, text: 'Dell', isCorrect: true },
                    { id: 3, text: 'Acer', isCorrect: false },
                    { id: 4, text: 'Apple', isCorrect: false },
                ],
            },
        ],
    },
    {
        category: 'TechLead',
        mcqs: [
            {
                id: 2,
                question:
                    'Who is the most famous tech person among the choices?',
                choices: [
                    { id: 1, text: 'Bill Gates', isCorrect: false },
                    { id: 2, text: 'Steve Jobs', isCorrect: false },
                    { id: 3, text: 'Jeff Bezos', isCorrect: false },
                    { id: 4, text: 'TechLead', isCorrect: true },
                ],
            },
            {
                id: 11,
                question: 'Who is TechLead?',
                choices: [
                    { id: 1, text: 'TechLead', isCorrect: false },
                    { id: 2, text: 'Ex Google TechLead', isCorrect: false },
                    { id: 3, text: 'The Ex Google TechLead', isCorrect: false },
                    { id: 4, text: 'The TechLead', isCorrect: true },
                ],
            },
            {
                id: 12,
                question: 'Where did the TechLead work at?',
                choices: [
                    { id: 1, text: 'Google', isCorrect: false },
                    { id: 2, text: 'Groupon', isCorrect: false },
                    { id: 3, text: 'Microsoft', isCorrect: false },
                    { id: 4, text: 'Startups', isCorrect: true },
                ],
            },
            {
                id: 13,
                question: 'What race is the TechLead',
                choices: [
                    { id: 1, text: 'Chinese', isCorrect: false },
                    { id: 2, text: 'Programmer', isCorrect: true },
                    { id: 3, text: 'Chinese born American', isCorrect: false },
                    { id: 4, text: 'TechLead', isCorrect: false },
                ],
            },
            {
                id: 14,
                question: 'How cheap is the TechLead?',
                choices: [
                    { id: 1, text: 'Nitpicks a few cents', isCorrect: false },
                    { id: 2, text: 'Lives with his parents', isCorrect: true },
                    { id: 3, text: 'Drinks cheap coffee', isCorrect: false },
                    { id: 4, text: "Doesn't even spend", isCorrect: false },
                ],
            },
        ],
    },
]
