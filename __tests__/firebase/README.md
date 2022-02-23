# Testing Firebase

## Overview

This sections provides context and requirements for running these tests locally.

## Installation

Here is a quick breakdown of what you **need** in order to run these specific tests

1. Java installed (preferrably version 17)
2. `npm`
   - You can check if you do by running: `npm -v`
3. [Firebase CLI](https://firebase.google.com/docs/cli)
   - You can check by running `firebase --version`

## Run the tests

You are going to need 2 different terminal windows, since we need to run a local emulator for Firebase **while** we run the tests in the seperate terminal.

> Note: Make sure that both your terminal/powershell windows are in the application directory, aka anywhere in the diabetes-app directory.

1. Starting the **Firebase emulator** in one of your terminal windows

   - Run the following command to run all emulators we have setup for these tests:

   ```
   firebase emulators:start
   ```

   > This emulator is required to running for the tests to run. If you are done testing you can kill the emulator by pressing: `ctrl + c`

2. Now on your other terminal windows we'll be running the tests
   - You can run `yarn test` and it will run all tests inside the `__tests__` directory. This includes UI tests (components/pages), as well
     as the tests inside the `__tests__/firebase/` tests.
   - If you want to run **only** the firebase tests then run the following command:
   ```
   yarn test ./__tests__/firebase
   ```
