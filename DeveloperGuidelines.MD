#Guidelines For Future Developers

One important note: our app is designed to interact with Quartzy’s API. Their dev page is: 
https://docs.quartzy.com/api/#operation/inventoryItemList

Quartzy's API uses globally unique IDs that are only accessible through their API.  You cannot use serial numbers to make API adjustments, you must use unique IDs.
In EagleTracks, we interact with their API by using fetch to make requests.  If this is your first time interacting with an API, please use a service like ReqBin (https://reqbin.com/) in combination with their user docs to understand how you are meant to interact with the API.  A good first place to start would be making the call to "list and filter inventory items", then use the ID from one of those items to pull it specifically through the "Get an inventory item" call.

The app project files are all stored in the EagleTracks folder.
In EagleTracks, you will find the App.js file responsible for holding the StyleSheet, Navigation Stack, and any functions that need to be ran once upon app startup (in currently, creating our local database tables).
The EagleTracks folder also stores our .js files for accessing our databases and Quartzy's API.
The Components folder stores different potentially reusable components for the app.
The assets folder stores default information used by Expo.
In the Pages folder you'll find all of the different pages accessed by the stack navigator.

All data related to the app is stored across the branches: main, Arthur-Branch, Barcode-scanner, and CSV-Branch, and in the forks CKappes-Git/Quartzy-inventory-tracker, and A-Tanner/Quartzy-inventory-tracker.  
Quartzy API interactions are stored in the apiFunctions.js file.  
Our functions for building and interacting with the database responsible for tracking transactions are in the dbFunctions.js file.
The itemDB.js file is responsible for the database that keeps a local translator for item name to item serial to item globally unique ID.  

For instructions on how to build the software for local use, see README.MD.  
