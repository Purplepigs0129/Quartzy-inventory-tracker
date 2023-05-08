/*
Purpose: Defines a set of functions to be used by other components

*/
import * as MailComposer from 'expo-mail-composer'; //requires: npm install expo-mail-composer

// sendEmail() is adapted from tutorial code from this page https://levelup.gitconnected.com/expo-react-native-email-with-attachment-d6a677b6d864
const sendEmail = async (subject, recipients, body, attachments=[]) =>{
    var contents = {}
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
        result => setStatusBarBackgroundColor("Status: email " + result.status),
        error => setStatusBarBackgroundColor("Status: email " + error.status)
    )
    
}
export {sendEmail}