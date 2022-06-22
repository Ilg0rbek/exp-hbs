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

const getPosterById = async (id) => {
    const data = () => fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8')
    const posters = JSON.parse(data())
    const poster = posters.find(v => v.id === id)
    return poster
}

const editPosterById = async (id, editPoster) => {
    const data = () => fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8')
    let posters = JSON.parse(data())
    const index = posters.findIndex(p => p.id === id)

    posters[index] = {
        id: posters[index].id,
        title: editPoster.title,
        amount: editPoster.amount,
        region: editPoster.region,
        image: editPoster.image,
        description: editPoster.description,
    }
    fs.writeFileSync(path.join(__dirname, "db.json"), JSON.stringify(posters), 'utf8')
}

const deletePosterById = (id) => {
    const data = () => fs.readFileSync(path.join(__dirname, "db.json"), 'utf8')
    let poster = JSON.parse(data())
    poster = poster.filter(p => p.id !== id)
    fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(poster), 'utf8')
}

module.exports = {
    addNewPosterToDB,
    getAllPosters,
    getPosterById,
    editPosterById,
    deletePosterById
}