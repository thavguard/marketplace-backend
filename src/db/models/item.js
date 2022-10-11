const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const { FavoriteItem } = require("./favorite");
const { PurchasedItem } = require("./purchased");
const Rating = require("./rating");
const { SoldItem } = require("./sold");

const Item = sequelize.define(
    'item',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.INTEGER
        },
        image: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        }
    }
)

const ItemType = sequelize.define('item_type', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, {
    timestamps: false
})

const ItemInfo = sequelize.define('item__info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false }
})

ItemType.hasMany(Item)
Item.belongsTo(ItemType)

Item.hasMany(ItemInfo, { as: 'info' })
ItemInfo.belongsTo(Item)

Item.hasOne(FavoriteItem)
FavoriteItem.belongsTo(Item)

Item.hasOne(PurchasedItem)
PurchasedItem.belongsTo(Item)

Item.hasOne(SoldItem)
SoldItem.belongsTo(Item)

module.exports = { Item, ItemType, ItemInfo }
