var mongoose = require('mongoose');
var User = require('./app/models/User');
var Faker = require('faker');

mongoose.connect(
    'mongodb://localhost:27017/mind',
    { useNewUrlParser: true, useUnifiedTopology: true });

async function generateUsers() {
    for(let i = 0; i < 100; i++){
        let user = new User({
            name: Faker.name.findName(),
            cpf: "000.000.0000-00",
            email: Faker.internet.email(),
            password: Faker.internet.password(),
            image: Faker.random.image(),
            role_access: (i%2 == 0)? 1: 999
        });
        try {
            await user.save();
        } catch (error) {
            throw new Error("Error");
        }
    }
}

generateUsers().then(()=> {
    mongoose.disconnect();
    console.log("OK");
})