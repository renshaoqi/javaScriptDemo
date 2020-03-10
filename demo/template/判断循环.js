const template = require('art-template');
const path = require('path');

const view = path.join(__dirname, 'views', '1.html');

const htmlStr = template(view, {
    age: 16,
    students: [
        {
            name: "R先生1",
            age: 22,
            sex: '男'
        },
        {
            name: "lili",
            age: 18,
            sex: '女'
        }
    ]
})

console.log(htmlStr);