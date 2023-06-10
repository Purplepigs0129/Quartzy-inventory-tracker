import * as SQLite from 'expo-sqlite'
import * as secureStore from "./SecureStore"

const db = SQLite.openDatabase('quartzy-test3.db')

function createTestDb(){
    console.log("Creating test Db...")
    createTransactions();
    createCheckouts();
    createReturns();
    //(studentName, instName, className, roomNum, studentEmail, formValues, navigation)
}


//CREATION SCRIPTS*****************************************************************************


async function createTransactions(){
    promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS transactions (OrderNum INTEGER PRIMARY KEY AUTOINCREMENT, LabID TEXT, ProfName TEXT, ClassName TEXT, RoomNum TEXT, StudentName TEXT, StudentEmail TEXT, DateOfTransaction TEXT, DateOfReturn TEXT)',
                [],
                resolve,
                (resp, error) => reject(error),
            );
        });
    });

    promise.then(() => {
        console.log('Transactions complete')
    })
}

async function createCheckouts(){
    promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS checkouts (OrderNum INTEGER,  ItemSerial TEXT, AmountTaken INTEGER, HasReturned INTEGER, FOREIGN KEY(OrderNum) REFERENCES transactions(OrderNum))',
                [],
                resolve,
                (resp, error) => reject(error),
            );
        });
    });

    promise.then(() => {
        console.log('Checkouts complete')
    })
}

//CREATE TABLE IF NOT EXISTS checkouts (Order# INTEGER,  ItemSerial TEXT, AmountTaken INTEGER, HasReturned INTEGER, FOREIGN KEY(Order#) REFERENCES transactions(Order#))
async function createReturns(){
    promise =  new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS returns (OrderNum INTEGER,  ItemSerial TEXT, AmountReturned INTEGER, ReasonLess TEXT, FOREIGN KEY(OrderNum) REFERENCES transactions(OrderNum))',
                [],
                resolve,
                (resp, error) => reject(error),
            );
        });
    });

    promise.then(() => {
        console.log('Returns complete')
    })
}

//END CREATION SCRIPTS***************************************************************************************************


//GET ALL****************************************************************************************************

async function getAll(){
    promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM transactions',
                [],
                (resp, result) => resolve(result.rows._array),
                (resp, error) => reject(error),
            );
        });
    });

    return await promise;
}

async function getAllCheckouts(){
    promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM checkouts',
                [],
                (resp, result) => resolve(result.rows._array),
                (resp, error) => reject(error),
            );
        });
    });

    promise.then((value) => {
        console.log(value)
        return value
    })
}

async function getAllReturns(){
    promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM returns',
                [],
                (resp, result) => resolve(result.rows._array),
                (resp, error) => reject(error),
            );
        });
    });

    promise.then((value) => {
        return value
    })
}

//END GET ALL*********************************************************************************************

//GET WHERE*********************************************************************************************

async function getTransactionsWhere(str){
    promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM transactions WHERE '.concat(str),
                (resp, result) => resolve(result.rows._array),
                (resp, error) => reject(error),
            );
        });
    });

    promise.then((value) => {
        console.log(value)
        return value
    }).catch((error) => console.log(error))
}

async function getCheckoutsWhere(str){
    promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM checkouts WHERE '.concat(str),
                (resp, result) => resolve(result.rows._array),
                (resp, error) => reject(error),
            );
        });
    });

    promise.then((value) => {
        return value
    }).catch((error) => console.log(error))
}

async function getReturnsWhere(str){
    promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM returns WHERE'.concat(str),
                (resp, result) => resolve(result.rows._array),
                (resp, error) => reject(error),
            );
        });
    });

    promise.then((value) => {
        return value
    }).catch((error) => console.log(error))
}

//END GET WHERE**********************************************************************************************

//DELETE**************************************************************************************************

async function deleteTest(){
    promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM transactions WHERE OrderNum = 1',
                [],
                (resp, result) => resolve(result.rows._array),
                (resp, error) => reject(error),
            );
        });
    });

    promise.then((value) => {
        console.log('deleted')
    })
}

//END DELETE********************************************************************************************

//ITEM CHECKOUT **************************************************************************************

async function handleCheckoutTable(orderNum, itemSerial, amountTaken){
    promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO checkouts (OrderNum,  ItemSerial, AmountTaken, HasReturned) VALUES (?, ?, ?, ?)`,
                [orderNum, itemSerial, amountTaken, 0],
                (resp, result) => resolve(result.insertId),
                (resp, error) => reject(error),
            );
        });
    });
}

async function finalNav(navigation){
    promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM transactions ORDER BY OrderNum DESC LIMIT 1',
                [],
                (resp, result) => resolve(result.rows._array),
                (resp, error) => reject(error),
            );
        });
    });
    promise.then((value) => {
        console.log('navigating')
        console.log(value[0]['OrderNum'])
        navigation.navigate('Checkout Success Page', { value })
    }).catch((error) => {
        console.log(error)
    })
}

async function getMaxID(formValues, navigation){
    promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM transactions ORDER BY OrderNum DESC LIMIT 1',
                [],
                (resp, result) => resolve(result.rows._array),
                (resp, error) => reject(error),
            );
        });
    });

    promise.then((value) => {
        max = value[0]['OrderNum']//specific
        console.log("maxValue")
        console.log(max)
        requests = []
        for (let i = 0; i < formValues.length; i++){
            requests.push(handleCheckoutTable(max, formValues[i].itemToCheck, parseInt(formValues[i].numNeeded)))
        }
        Promise.all(requests).then(() => {
            console.log('Finished Logging')
            finalNav(navigation)
          }).catch((error) => {
            console.log(error)
          })
    })
}
async function getMaxIDWithoutValues(formValues, navigation){
    promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM transactions ORDER BY OrderNum DESC LIMIT 1',
                [],
                (resp, result) => resolve(result.rows._array),
                (resp, error) => reject(error),
            );
        });
    }).then ((value)=> {return value[0]['OrderNum']} );
}

async function handleCheckout(studentName, instName, className, roomNum, studentEmail, formValues, navigation){
    var labID = await secureStore.getValueFor('LabID')
    promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO transactions (LabID, ProfName, ClassName, RoomNum, StudentName, StudentEmail, DateOfTransaction) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [labID, instName, className, roomNum, studentName, studentEmail, String(Date())],
                (resp, result) => resolve(result.insertId),
                (resp, error) => reject(error),
            );
        });
    });

    promise.then((value) => {
        getMaxID(formValues, navigation)
    })
}

async function insertTransaction(studentName, instName, className, roomNum, studentEmail){
    var labID = await secureStore.getValueFor('LabID')
    promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO transactions (LabID, ProfName, ClassName, RoomNum, StudentName, StudentEmail, DateOfTransaction) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [labID, instName, className, roomNum, studentName, studentEmail, String(Date())],
                (resp, result) => resolve(result.insertId),
                (resp, error) => reject(error),
            );
        });
    });
}


//END ITEM CHECKOUT***************************************************************************************************

//HANDLE RETURNS*************************************************************************************************

function endReturnNavigator(navigation){
    navigation.navigate('Success Page')//navigates to success page
}

async function updateReturnDate(orderNum, navigation){
    promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'UPDATE transactions SET DateOfReturn = ? WHERE orderNum = ?',
                [String(Date()), orderNum],
                resolve,
                (_, error) => reject(error),
            );
        });
    });
    promise.then((value) => {
        endReturnNavigator(navigation)
    }).catch((error) => {
        console.log(error)
    })
}

async function updateCheckouts(orderNum, navigation) {
    promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'UPDATE checkouts SET HasReturned = 1 WHERE orderNum = ?',
                [orderNum],
                resolve,
                (_, error) => reject(error),
            );
        });
    });
    promise.then((value) => {
        updateReturnDate(orderNum, navigation)
    }).catch((error) => {
        console.log(error)
    })
}

//OrderNum INTEGER,  ItemSerial TEXT, AmountReturned INTEGER, ReasonLess TEXT
async function insertReturn(orderNum, itemSerial, amountReturned, reasonLess){
    promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO returns (OrderNum,  ItemSerial, AmountReturned, ReasonLess) VALUES (?, ?, ?, ?)`,
                [orderNum, itemSerial, amountReturned, reasonLess],
                (resp, result) => resolve(result.insertId),
                (resp, error) => reject(error),
            );
        });
    });
}

function navigator(value, navigation){
    console.log('in navigator')
    console.log(value)
    navigation.navigate('Make Return Page', {value})
}

async function getReturns(orderNum, navigation){
    promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM checkouts WHERE OrderNum = ?',
                [orderNum],
                (resp, result) => resolve(result.rows._array),
                (resp, error) => reject(error),
            );
        });
    });

    promise.then((value) => {
        console.log("Got Return")
        console.log(value)
        navigator(value, navigation)//navigates to return page
    }).catch((error) => {
        console.log(error)
    })
}

//END RETURNS*****************************************************************************************************

export {createTestDb,createTransactions, createReturns, createCheckouts, getAll, deleteTest, handleCheckout, getReturns, getAllCheckouts, getAllReturns, updateCheckouts, insertReturn, getTransactionsWhere, getCheckoutsWhere, getReturnsWhere}