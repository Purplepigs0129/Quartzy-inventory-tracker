# EagleTracks
EagleTracks is an unofficial companion app for use with Quartzy lab management to track items as they change location, are consumed or broken, and make real time adjustments to Quartzy's inventory.  

The app project files are all stored in the EagleTracks folder.

All data related to the app is stored across the branches: main, Arthur-Branch, Barcode-scanner, and CSV-Branch, and in the forks CKappes-Git/Quartzy-inventory-tracker, and A-Tanner/Quartzy-inventory-tracker.  

To run this code, you will need React Native Expo and, by extension, Node.js.  

Node.js can be installed through their website: https://nodejs.org/en

Once Node.js in installed, all other requirements can be installed by cloning the repo, navigating to the EagleTracks folder, and running:

"npm install"

Note: if you are using Visual Studio Code, you can open the folder, create a new terminal and run the command from there.

After installing expo, you will need to copy the source code (either through cloning the main repository, or by downloading it as a zip).

After the source code has been downloaded, simply navigate to the EagleTracks folder and run "npm install" to install all required packages.

Once the installation is complete, run the command "npm start" to start the app.  

Once the app is running, you pull it up on your phone in two ways.
1. You can use an emulator on your computer (such as through Android Studio's built-in emulators).
2. You can download the Expo Go app on your phone and directly run the app on your phone.

Once you have the app running, please know that you will need a Quartzy account and follow these steps.  
1. Once you have a Quartzy account, navigate to https://app.quartzy.com/profile/access-tokens and generate an access token (save it for later).  
2. Then, from the Quartzy home page for your lab, click the down arrow in the top left and click the gear next to your lab.
3. Click the "developers" tab to access lab information.
4. Copy your Lab ID and save it for later.
5. Back in your Quartzy inventory page, click an item that is in the location you want to modify and copy its location (you can also just note the location, however it must be entered exactly in the app).
6. In EagleTracks, from the home page, click on the "App Management" button in the top left.
7. In App Management, click on the "Change Credentials" button on the left.
8. Enter your Quartzy access token, Lab ID, and the room you intend to manage into the appropriate fields.
9. Submit and return home. 
10. Navigate back into "App Management" and click on the "Update Item List" button.
11. In the Update Item List page, click the "Update List" button and wait for the internal item list to fully update.  
12. Return to the home screen and the app is now ready to use.

