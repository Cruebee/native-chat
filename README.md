# ChatterBox
# ChatterBox is a React-Native Project

## To run Project:
-----
#### Install Expo-CLI, This can be done by running this command in the terminal:

```sh
$ npm i -g expo-cli
```
## required Libraries
-----
## Option 1 - use:
```sh
$ expo init <project-name>
$ cd <project-name>
```
- This builds a basic project template.
- You can then copy the contents of the package.json file provided in the repository.
- open your new project via your code editor of choice.
- open your package.json file
- Paste the contents of the package.json file in your own package.json file. 
- delete your node_modules folder and your package-lock.json file (if you are unfamiliar with using the terminal it may be best to use your computers UI (finder/start folders)
- enter the following command while in your project's root directory in the terminal.
```sh
$ npm i --save
```
- this will save all required dependencies to your newly created project

### Option 2:
##### To install all dependencies you can run:
##### `npm i --save @react-native-community/async-storage @react-native-community/masked-view @react-native-community/netinfo @react-navigation/native @react-navigation/stack babel-preset-env better-docs expo expo-font expo-image-picker expo-location expo-permissions expo-updates firebase fsevents prop-types react react-dom react-google-maps react-native react-native-gesture-handler react-native-gifted-chat react-native-keyboard-spacer react-native-maps react-native-parsed-text react-native-reanimated react-native-safe-area-context react-native-screens react-native-svg react-native-web react-native-web-maps react-navigaion react-navigation-stack`

## Starting the App
-----
### To get the app Running, use the command:
##### `npm run start`

  - launches DevTools on port 19002. You can run app on physical device or emulator, by scanning QR code or creating and signing into an expo account. To run on physical device please download Expo app from app store!
  - For more info on how to set up emulator testing you can visit the [Expo documentation page](https://docs.expo.io/versions/latest/workflow/android-studio-emulator/). You can then click "Run on Android device/emulator" in DevTools to launch the app on the emulator.


## Setting up Firebase account!
----
##### You should set up a firebase account for your own use (faster speeds/requests) Follow this guide for easy setup.
1) Go to [Firebase](https://firebase.google.com).
2) Sign into your google account (or create a new one).
3) Click on "Go to Console"
4) Click "Add Project"
5) Follow instructions presented by Firebase until you reach a screen that says "Creating your project".
6) Click on "database" in the Develop tab.
7) Click on "Create Database" and select "Start in test mode".
8) Click on "Start Collection" and name it "messages" then press "auto id" and confirm the selections on the following screen.
9) Click on "Authentication", then click "Set up sign-in method" and enable anonymous authentication.
10 Click on "storage" to set up cloud storage
11) Now you can click on the little gear/cog just above your Develop tab. Select "project settings". Click on a button that looks like this: `</>` to add Firebase to a web app, name the project.
12) Once your project is named copy everything in the "firebaseConfig" section and paste it into your Chat.js file.
## EX: 
#### To initialize Firebase in your app: add the following to your constructor()

```sh
constructor() {
    super();
    this.state = {
        messages: []
    };
    if (!firebase.apps.length) {
        firebase.initializeApp({
        apiKey: 'YOUR_API_KEY',
        authDomain: 'YOUR_AUTH_DOMAIN',
        databaseURL: 'YOUR_DATABASE_URL',
        projectID: 'YOUR_PROJ_ID',
        storageBucket: 'YOUR_BUCKET',
        messagingSenderId: 'YOUR_SENDER_ID',
        appId: 'YOUR_APP_ID',
        measurementID: 'YOUR_MEASUREMENT_ID'
        })
    }
    
    // refers to messages collection in firebase DB
    this.referenceMessages = firebase.firestore().collection('messages');
}
```
# Project Kanban:
### Check out the project [Kanban](https://trello.com/b/Wl0FRdys/chat-app-kanban)!
License
----

MIT


**Enjoy! I hope this project proves useful!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
