/*
Purpose: Defines a set of functions to be used by other components

*/
import * as MailComposer from 'expo-mail-composer'; //requires: npm install expo-mail-composer
//import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
//import RNFS from 'react-native-fs'; //requires npm install react-native-fs
//import { useState, useEffect } from 'react';
//import * as FileSystem from 'expo-file-system'; //must use npx expo install expo-file-system

//const filePath = RNFS.DocumentDirectoryPath + "/temp.csv";

// createCSV does as the name implies
//must be used in a useEffect in a component before the file is to be called.
/* const createCSV = async(values) => {
    try{
        await RNFS.writeFile(filePath, values, "utf8");
        console.log("Created csv file");
    }
    catch (error){
        console.log(error);
    }
}

const getCSVpath = async() => {
    return filePath;
} */

// sendEmail() is adapted from tutorial code from this page https://levelup.gitconnected.com/expo-react-native-email-with-attachment-d6a677b6d864
const sendEmail = async (subject, recipients, body, attachments=[]) =>{
    var contents = {}
    const [status,setStatus] = useState(null);
    if(attachments.length < 1){
        contents =
        {
            subject: subject,
            recipients: recipients,
            body: body
        }
    }
    else{
        contents = 
        {
            subject: subject,
            recipients: recipients,
            body: body,
            attachments: attachments
        }
    }
    //MailComposer.composeAsync(contents);
    
    
    let promise = new Promise((resolve, reject) => {
        MailComposer.composeAsync(contents)
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
    promise.then(
        result => setStatus("Status: email " + result.status),
        error => setStatus("Status: email " + error.status)
    )
    
}

export {sendEmail}
//export {createCSV}
//export {getCSVpath}