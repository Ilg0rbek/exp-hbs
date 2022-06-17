const fs = require('fs')
const path = require('path')

const addNewPosterToDB = async (poster) => {
    const data = () => fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8')
    const posters = JSON.parse(data())
    posters.push(poster)
    fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(posters), 'utf8', (err) => {
        if (err) throw err
    })
    console.log('data added');
}

const getAllPosters = async () => {
    const data = () => fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8')
    return posters = JSON.parse(data())
}

module.exports = {
    addNewPosterToDB,
    getAllPosters
}