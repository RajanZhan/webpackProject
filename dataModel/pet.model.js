const Sequelize = require("sequelize");
module.exports = {
    name:"pet",
    body:{
        id: {
            type: Sequelize.STRING(50),
            primaryKey: true
        },
        name: Sequelize.STRING(100),
        pwd:Sequelize.STRING(32),
    }
}