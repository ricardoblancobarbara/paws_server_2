module.exports = function (sequelize, DataTypes) {
    return sequelize.define('service', {
        owner: DataTypes.INTEGER,

        service: DataTypes.STRING,

        price: DataTypes.INTEGER,

        availability: DataTypes.STRING        
                
    })
}