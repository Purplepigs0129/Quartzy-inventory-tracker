import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('quartzyItems.db')

//CREATION SCRIPTS*****************************************************************************

async function createQuartzyTable(){
    promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS quartzyItems (ItemSerial TEXT PRIMARY KEY, ItemName TEXT, ItemID TEXT)',
                [],
                resolve,
                (resp, error) => reject(error),
            );
        });
    });

    promise.then(() => {
        console.log('Quartzy Items complete')
    })
}


async function getAllItems(){
    promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM quartzyItems',
                [],
                (resp, result) => resolve(result.rows._array),
                (resp, error) => reject(error),
            );
        });
    });

    promise.then((value) => {
        console.log("Value in Get All Items")
        console.log(value)
        return value
    })
}

async function getAllPromise(){
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM quartzyItems",
                [],
                (resp, result) => resolve(result.rows._array),
                (resp, error) => reject(error),
            );
        });
    });
}



async function getQuartzyItemSerial(value){
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM quartzyItems WHERE ItemSerial = ?",
                [value],
                (resp, result) => resolve(result.rows._array),
                (resp, error) => reject(error),
            );
        });
    });
}

async function getQuartzyItemName(value){
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM quartzyItems WHERE ItemName = ?",
                [value],
                (resp, result) => resolve(result.rows._array),
                (resp, error) => reject(error),
            );
        });
    });
}


async function quartzyTableInsert(itemSerial, itemName, itemID){
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO quartzyItems (ItemSerial, ItemName, ItemID) VALUES (?, ?, ?)`,
                [itemSerial, itemName, itemID],
                (resp, result) => resolve(result.insertId),
                (resp, error) => reject(error),
            );
        });
    });
}


export {createQuartzyTable, getAllItems, getQuartzyItemSerial, quartzyTableInsert, getQuartzyItemName, getAllPromise}