const { Sequelize, DataTypes } = require('sequelize');

const sql = new Sequelize({
    dialect:"sqlite",
    storage:"./mydb.sqlite"
});

const Todos = sql.define("Todos", {
        title:DataTypes.STRING,
        start:DataTypes.DATE,
        end:DataTypes.DATE
});

sql.sync().then(() => {
    console.log("connection to SQL:success");
}).catch(() => {
    console.log("connection to SQL:fail");
});

module.exports = Todos;