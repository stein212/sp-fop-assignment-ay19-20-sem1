const sqlite = require('sqlite')

;(async function() {
    let db = await sqlite.open('./app.db')

    const createCategoryTable = `
        CREATE TABLE IF NOT EXISTS Categories (
            id TEXT PRIMARY KEY
        );`

    const createMcqTable = `
        CREATE TABLE IF NOT EXISTS Mcqs (
            id INTEGER PRIMARY KEY,
            question TEXT
        );`

    const createChoices = `
        CREATE TABLE IF NOT EXISTS Choices (
            mcqId INTEGER,
            id TEXT,
            text TEXT,
            isCorrect INTEGER,
            PRIMARY KEY (id, mcqId),
            FOREIGN KEY (mcqId) REFERENCES Mcqs (id)
        );`

    const createCategoryMcqs = `
        CREATE TABLE IF NOT EXISTS CategoryMcqs (
            categoryId TEXT,
            mcqId INTERGER,
            PRIMARY KEY (categoryId, mcqId),
            FOREIGN KEY (categoryId) REFERENCES Categories (id),
            FOREIGN KEY (mcqId) REFERENCES Mcqs (id)
        );`

    function seedCategories() {
        return new Promise(async (resolve, reject) => {
            const countCategories = `SELECT COUNT(*) as count FROM Categories;`
            let { count } = await db.get(countCategories)
            if (count < 1) {
                const insertCategories = `INSERT INTO "main"."Categories"("id") VALUES ('IT');
                    INSERT INTO "main"."Categories"("id") VALUES ('History');
                    INSERT INTO "main"."Categories"("id") VALUES ('TechLead');
                    INSERT INTO "main"."Categories"("id") VALUES ('Tech Hardware');`
                let lines = insertCategories.split('\n')

                let insertCategoryPromises = []
                for (let line of lines) {
                    insertCategoryPromises.push(await db.run(line))
                }

                await Promise.all(insertCategoryPromises)
            }

            resolve()
        })
    }

    function seedMcqs() {
        return new Promise(async (resolve, reject) => {
            const countMcqs = `SELECT COUNT(*) as count FROM Mcqs;`
            let { count } = await db.get(countMcqs)
            if (count < 1) {
                const insertMcqs = `INSERT INTO "main"."Mcqs"("id", "question") VALUES (1, 'What is the best OS?');
                    INSERT INTO "main"."Mcqs"("id", "question") VALUES (2, 'Who is the most famous tech person among the choices?');
                    INSERT INTO "main"."Mcqs"("id", "question") VALUES (3, 'Choose the best language?');
                    INSERT INTO "main"."Mcqs"("id", "question") VALUES (4, 'How do you reverse a linked list?');
                    INSERT INTO "main"."Mcqs"("id", "question") VALUES (6, 'Who conquered the world?');
                    INSERT INTO "main"."Mcqs"("id", "question") VALUES (7, 'What is your future?');
                    INSERT INTO "main"."Mcqs"("id", "question") VALUES (8, 'When did hitler die?');
                    INSERT INTO "main"."Mcqs"("id", "question") VALUES (9, 'Who founded Earth?');
                    INSERT INTO "main"."Mcqs"("id", "question") VALUES (10, 'How old is the universe?');
                    INSERT INTO "main"."Mcqs"("id", "question") VALUES (11, 'Who is TechLead?');
                    INSERT INTO "main"."Mcqs"("id", "question") VALUES (12, 'Where did the TechLead work at?');
                    INSERT INTO "main"."Mcqs"("id", "question") VALUES (13, 'What race is the TechLead');
                    INSERT INTO "main"."Mcqs"("id", "question") VALUES (14, 'How cheap is the TechLead?');
                    INSERT INTO "main"."Mcqs"("id", "question") VALUES (15, 'Choose the best Laptop Brand');
                    INSERT INTO "main"."Mcqs"("id", "question") VALUES (16, 'Choose the best keyboard brand');
                    INSERT INTO "main"."Mcqs"("id", "question") VALUES (17, 'Choose the best noise cancelling headphone brand');
                    INSERT INTO "main"."Mcqs"("id", "question") VALUES (18, 'Choose the best mouse brand');
                    INSERT INTO "main"."Mcqs"("id", "question") VALUES (19, 'Choose the best monitor brand');`

                let insertMcqPromises = []
                for (let line of insertMcqs.split('\n')) {
                    insertMcqPromises.push(db.run(line))
                }

                await Promise.all(insertMcqPromises)

                const insertCategoryMcqs = `INSERT INTO "main"."CategoryMcqs"("categoryId", "mcqId") VALUES ('IT', 1);
                    INSERT INTO "main"."CategoryMcqs"("categoryId", "mcqId") VALUES ('IT', 2);
                    INSERT INTO "main"."CategoryMcqs"("categoryId", "mcqId") VALUES ('IT', 3);
                    INSERT INTO "main"."CategoryMcqs"("categoryId", "mcqId") VALUES ('IT', 4);
                    INSERT INTO "main"."CategoryMcqs"("categoryId", "mcqId") VALUES ('IT', 15);
                    INSERT INTO "main"."CategoryMcqs"("categoryId", "mcqId") VALUES ('History', 6);
                    INSERT INTO "main"."CategoryMcqs"("categoryId", "mcqId") VALUES ('History', 7);
                    INSERT INTO "main"."CategoryMcqs"("categoryId", "mcqId") VALUES ('History', 8);
                    INSERT INTO "main"."CategoryMcqs"("categoryId", "mcqId") VALUES ('History', 9);
                    INSERT INTO "main"."CategoryMcqs"("categoryId", "mcqId") VALUES ('History', 10);
                    INSERT INTO "main"."CategoryMcqs"("categoryId", "mcqId") VALUES ('TechLead', 2);
                    INSERT INTO "main"."CategoryMcqs"("categoryId", "mcqId") VALUES ('TechLead', 11);
                    INSERT INTO "main"."CategoryMcqs"("categoryId", "mcqId") VALUES ('TechLead', 12);
                    INSERT INTO "main"."CategoryMcqs"("categoryId", "mcqId") VALUES ('TechLead', 13);
                    INSERT INTO "main"."CategoryMcqs"("categoryId", "mcqId") VALUES ('TechLead', 14);
                    INSERT INTO "main"."CategoryMcqs"("categoryId", "mcqId") VALUES ('Tech Hardware', 15);
                    INSERT INTO "main"."CategoryMcqs"("categoryId", "mcqId") VALUES ('Tech Hardware', 16);
                    INSERT INTO "main"."CategoryMcqs"("categoryId", "mcqId") VALUES ('Tech Hardware', 17);
                    INSERT INTO "main"."CategoryMcqs"("categoryId", "mcqId") VALUES ('Tech Hardware', 18);
                    INSERT INTO "main"."CategoryMcqs"("categoryId", "mcqId") VALUES ('Tech Hardware', 19);`

                let insertCategoryMcqPromises = []
                for (let line of insertCategoryMcqs.split('\n')) {
                    insertCategoryMcqPromises.push(db.run(line))
                }

                await Promise.all(insertCategoryMcqPromises)

                const insertChoices = `INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (1, '1', 'MacOS', 1);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (1, '2', 'Windows', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (1, '3', 'Linux', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (1, '4', 'FreeBSD', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (2, '1', 'Bill Gates', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (2, '2', 'Steve Jobs', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (2, '3', 'Jeff Bezos', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (2, '4', 'TechLead', 1);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (3, '1', 'C#', 1);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (3, '2', 'Javascript', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (3, '3', 'Assembly', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (3, '4', 'Swift', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (4, '1', 'Swap the pointers', 1);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (4, '2', 'Add a pair of pointers to connect the head and tail', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (4, '3', 'Reduce the list to its main elements', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (4, '4', 'Scan the memory for its reverse structure', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (6, '1', 'Jack Ma', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (6, '2', 'Elon Musk', 1);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (6, '3', 'Qing Shi Huang', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (6, '4', 'Illuminati', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (7, '1', 'Beggar', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (7, '2', 'Dead', 1);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (7, '3', 'Rich', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (7, '4', 'Sufficient', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (8, '1', 'Now', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (8, '2', 'Just Now', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (8, '3', 'Still alive', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (8, '4', '30 April 1945', 1);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (9, '1', 'Me', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (9, '2', 'You', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (9, '3', 'Him', 1);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (9, '4', 'Her', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (10, '1', '2000+ years old', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (10, '2', '13.4+ billion years old', 1);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (10, '3', '30', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (10, '4', 'Just enough to bang', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (11, '1', 'TechLead', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (11, '2', 'Ex Google TechLead', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (11, '3', 'The Ex Google TechLead', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (11, '4', 'The TechLead', 1);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (12, '1', 'Google', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (12, '2', 'Groupon', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (12, '3', 'Microsoft', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (12, '4', 'Startups', 1);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (13, '1', 'Chinese', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (13, '2', 'Programmer', 1);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (13, '3', 'Chinese born American', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (13, '4', 'TechLead', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (14, '1', 'Nitpicks a few cents', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (14, '2', 'Lives with his parents', 1);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (14, '3', 'Drinks cheap coffee', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (14, '4', 'Doesn''t even spend', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (15, '1', 'Apple', 1);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (15, '2', 'Microsoft', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (15, '3', 'Dell', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (15, '4', 'HP', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (16, '1', 'Cooler Masters', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (16, '2', 'Logitech', 1);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (16, '3', 'Razer', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (16, '4', 'Cosair', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (17, '1', 'Bose', 1);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (17, '2', 'Sony', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (17, '3', 'AudioTechnica', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (17, '4', 'Sennheiser', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (18, '1', 'Logitech', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (18, '2', 'Razer', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (18, '3', 'Unknown brands', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (18, '4', 'Glorious', 1);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (19, '1', 'AOC', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (19, '2', 'Dell', 1);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (19, '3', 'Acer', 0);
                    INSERT INTO "main"."Choices"("mcqId", "id", "text", "isCorrect") VALUES (19, '4', 'Apple', 0);`

                let insertChoicePromises = []
                for (let line of insertChoices.split('\n')) {
                    insertChoicePromises.push(db.run(line))
                }

                await Promise.all(insertChoicePromises)
            }

            resolve()
        })
    }

    await db.run(createCategoryTable)
    await db.run(createMcqTable)
    await db.run(createCategoryMcqs)
    await db.run(createChoices)

    await seedCategories()
    await seedMcqs()

    db.close()
})()
