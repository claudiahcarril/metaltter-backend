const readline = require('readline')
const connection = require('./lib/connectMongoose')
const Met = require('./models/Met')
const User = require('./models/User')

const metsJson = require('./mets.json')
const usersJson = require('./users.json')

// Main asynchronous function
async function main() {
    // Ask the user if they are sure
    const continueDelete = await answerYesOrNo('¿Estás seguro que quieres borrar la base de datos? [y/n]')
    if (!continueDelete) {
        process.exit()
    }

    await initMetaltter()
    connection.close()
}


// Function to initialize the ad model
async function initMetaltter() {
    // delete all documents from the ad collection 
    const metResult = await Met.deleteMany()
    console.log(`Eliminados ${metResult.deletedCount} mets`)
    const userResult = await User.deleteMany()
    console.log(`Eliminados ${userResult.deletedCount} users`)

    // create starter mets and users
    const metInserted = await Met.insertMany(metsJson.mets)
    const userInserted = await User.insertMany(usersJson.users)
    console.log(`Creados ${metInserted.length} mets`)
    console.log(`Creados ${userInserted.length} usuarios`)
}

main().catch(err => console.log('Hubo un error', err))



function answerYesOrNo(text) {
    return new Promise((resolve, reject) => {
        const interface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        interface.question(text, reply => {
            interface.close()
            if (reply.toLocaleLowerCase() === 'y') {
                resolve(true)
                return
            }
            resolve(false)
        })
    })

}