# Diabetes-Management-Mobile-App

Welcome to the new diabets management mobile app! We are currently refactoring and cleaning the 1st version of the app that relied heavily on us building
our entire backend application.

This new repository utilizes [Firebase](https://firebase.google.com/) in order to handle all of our backend services.
This includes authentication, database, and offers scaling as we move forward and the application is moved from development to production.

## Technology stack
This application is based on [React Native](https://reactnative.dev/), which is a subset of [React](https://reactjs.org/) (used to build web apps). We decided to
since we could create one code base that compiles for both android and iOS, instead of building two different apps (code bases) for each OS. 

Mention in the in the [Overview](#Diabetes-Management-Mobile-App), we utilize [Firebase](https://firebase.google.com/) to handle our backend services, 
since it allows for easy scaling, and most importantly allows us to save us time from writting our entire backend application and deployment. 
We tried creating our entire [backend](https://github.com/UToledo-SeniorDesign/DiabetesApp-Backend), using NodeJS 
with ExpressJs, but it was taking too long to build a backend application and a mobile application. 
** The goal with firebase is to code less, and produce more.**

## Development-Setup
This section addresses the entire setup for development, from the basic tools, such as VS code, as well as any packages & dependencies to run the application 
locally.
### Tools
This is pretty straight forward since all you will need is to download visual studio code and some additional extensions that will make your life easier.
1. Download and install [VS code](https://code.visualstudio.com/)
2. Install the following extensions after completing the VS code installation
    - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Code formatter
        - This is to maintain the same formating through the entire code base. You can check this 
         [stack overflow thread](https://stackoverflow.com/questions/29973357/how-do-you-format-code-in-visual-studio-code-vscode)
         to see how to format a file in VS code.
    - [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
        - This changes the way directories look in VS code, can be handy when navigating the code base
    - [Live Share](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare)
        - Tool to allow for pair programming, create sessions and collaborate together in real-time
        
### What is needed to run the Mobile App
1. We need npm and nodejs, therefore lets start by downloading [NodeJS](https://nodejs.org/en/)
    - Verify that it was installed by running the following command in your terminal:
    `node --version && npm --version`
        - For mac users just open the app `Terminal`, for windows users I suggest using `Powershell` since it has similar cmds to linux/mac.
2. Install [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
    - This is a package manager, exactly like `npm` but offers better performance (as of early 2022)
3. Install [Expo CLI](https://docs.expo.dev/get-started/installation/)
    - You can quickly insall it in your terminal by running: `npm install --global expo-cli`
        - **Note:** You might get an error when installing but it might just need you to run the cmd as the *admin*, so do the 
        following if needed: `sudo npm install --global expo-cli`
    - This is the framework that we utilize to run our react native application, allows for easier setup and installation than its counter part React Native CLI
         - More information about Expo CLI vs React Native CLI can be found 
         [here](https://levelup.gitconnected.com/react-native-cli-vs-expo-cli-which-one-do-i-choose-bdf02ea457bf)
             - TLDR: Expo offeres easier setup but in the long term we can't make specific componenets to target a specific OS. This means that in React Native
             CLI we could create a specific component for Android and specific components for iOS. After discussing with the original team, we didn't see much
             benefit from React Native CLI, since we had issues running past application that were based on it.
4. Install [Git](https://git-scm.com/downloads)
    - There is a high possibility that you already have `git` in your system, you can quickly check if you do by running the following in your terminal/powershell:
    `git --version`

Now that you have downloaded and installed everything needed to run the application, lets go ahead and download the code for it from this repository!

**Note:** If the documentation below is not straight forward, you can follow these instructions from 
[Github on how to clone a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)


1. [Optional] Open terminal/powershell and create a directory for all your coding projects, you can easily do this by just pasting the next command:
`mkdir Projects`
    A. That will create the folder `Projects` for you and you can move into it by doing the following: `cd Projects`
2. Go into the folder you want to add this code base from your terminal.
    - If you followed the **optional step 1** then you are already in your Projects directory so you can skip step 2
3. Paste the following command: `git clone https://github.com/UToledo-SeniorDesign/Diabetes-Management-Mobile-App.git`

**Congratulations!** You have finished setting up the tools and the environment for this project. Now just go to Visual studio code, open the folder for
this application, *Diabetes-Management-Mobile-App*. 

## Running the application

**Note:** This section requires that you have completed the [Development Setup](#Development-Setup) steps.

Expo allows to easily run the application on the browser or on your phone. Just look in your app store for the `Expo` app.
- iOS Expo Go app [link](https://apps.apple.com/us/app/expo-go/id982107779)
- Android (Google playstore) Expo app [link](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US&gl=US)

Now lets **start** the application
1. Open Visual Studio Code
2. Open the folder for the Diabetes app code base, *Diabetes-Management-Mobile-App* directory
3. Open the terminal inside the code base directory
    - [How to open terminal in Visual Studio Code](https://code.visualstudio.com/docs/editor/integrated-terminal)
4. Run the following command to install the latest dependecies of the project: `expo install`
    - This installs all the dependencies in the folder called `node_modules`
5. Run the following command: `expo start`
    - This will run start the application so give it a couple seconds, if you see an error please make sure to contact Carlos Galo
        - Some issues might rise if depending on newer NodeJS versions, you are always welcome to look them up in stackoverflow before reaching out
6. Your computer might open your default browser with a menu where you can select **how** you want to run the expo app
    - The easiest way is to use the option **run in browser** or just use your phone by pointing the camera to the barcode in your broswer/terminal
        - Using your phone requires that you have installed the Expo app from your app store
    - **Note:** Mac (M1) users are not able to run the Android simulator in their computers **nor** can Windows users run the iOS simulator in their computers

** Congratulations!!** You are running the latest version of the project :) 

This will open the entire code base. and now to **run** the application you can open the terminal inside Visual
Studio and run the following command: `expo start`


## Resources
- [React Native](https://reactnative.dev/)
- [Expo Framework](https://docs.expo.dev/)
- [React Native Navigation](https://reactnavigation.org/)
