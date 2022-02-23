import * as firebase from '@firebase/testing';


interface AuthUser {
    uid: string;
    email: string;
}

const PROJECT_ID = "diabietes-app";
const myId = "user_abc";
const theirId = "user_xyz";
const myAuth = {uid: myId, email: "abc@gmail.com"} ;

/**
 * Runs firebase test app against our `PROJECT_ID` with an optional user
 * @param user the identity we want to mock as a signed user 
 * @returns a firestore with optional signed user
 */
function getFirestore(user: AuthUser){
    return firebase.initializeTestApp({
        projectId: PROJECT_ID,
        auth: { uid: "alice", email: "alice@example.com" }
      });
}

describe("Meal security rules", () => {

        // it ("Testing 1"), () => {
        //     const db = firebase.initializeTestApp({projectId: PROJECT_ID}).firestore();
        //     const testDoc = db.collection("readonly").doc("testDoc");
        //     firebase.assertSucceeds(testDoc.get()); 
        // }

    test("We can fetch our own meals", async() => {
        const db = firebase.initializeTestApp({projectId: PROJECT_ID}).firestore();
        const testQuery = db.collection("meals");
        await firebase.assertSucceeds(testQuery.get());
    });
});