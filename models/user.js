'use strict';

const { DataTypes } = require("sequelize");

module.exports = (connection) => {
    return connection.define('users', {
        _id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        user_role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "user",
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        dob: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        age: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        personal_access_token: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        phone_no: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        remember_token: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: btoa(String.fromCharCode(...new Uint8Array(Array(30).fill().map(() => Math.round(Math.random() * 30)))))
        },
        device_type: {
            type: DataTypes.ENUM,
            values: ["i", "a"],
            defaultValue: null,
            allowNull: true,
        },
        device_token: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        is_email_verified: {
            type: DataTypes.ENUM,
            values: ["1", "0"],
            defaultValue: "0",
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
        },
    }, {
        tableName: "users",
        timestamps: false,
        // defaultScope: {
        //     attributes: { exclude: ['password'] },
        //   }
    });


}

