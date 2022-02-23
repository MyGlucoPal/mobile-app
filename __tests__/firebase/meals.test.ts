import * as firebase from '@firebase/testing';
import { Timestamp } from 'firebase/firestore';

import { Meal as CreateMealType, MealType} from '../../src/@types/meals';

interface Meal extends CreateMealType {
    userId: string;
}



const PROJECT_ID = "diabietes-app";
const myId = "user_abc";
const theirId = "user_xyz";
const myAuth = {uid: myId, email: "abc@gmail.com"};
const theirAuth = {uid: theirId, email: "xyz@gmail.com"};
const DOC_NAME = "test_doc";

/**
 * Runs firebase test app against our `PROJECT_ID` with an optional user
 * @param user the identity we want to mock as a signed user 
 * @returns a firestore with optional signed user
 */
function getFirestore(auth: any){
    return firebase.initializeTestApp({projectId: PROJECT_ID, auth: auth}).firestore();
}

/**
 * Similar to `getFirestore()` but returns a FStore that disregards all the security rules
 * 
 */
function getAdminFirestore(){
    return firebase.initializeAdminApp({projectId: PROJECT_ID}).firestore();
}

describe("Meal security rules", () => {
    test("We can fetch our personal meals", async() => {
        const db = getFirestore(myAuth);
        const testQuery = db.collection("meals").where("userId", '==', myId);
        await firebase.assertSucceeds(testQuery.get());
        await firebase.clearFirestoreData({projectId: PROJECT_ID});
    });

    test("We can fetch one meal", async() => {
        const admin = getAdminFirestore();
        const postId = "arbitrary_id";
        const setUpMealDoc = admin.collection("meals").doc(postId);
        await setUpMealDoc.set({
            totalCarbs: 100,
            totalTimesEaten: 1,
            dateCreated: new Date(),
            dateLastModified: new Date(),
            mealType: MealType.LUNCH,
            userId: theirId,
            foodItems: [{name: "banana", totalCarbs: 30, brand: "", servingSize: 1}]
        });

        
        const db = getFirestore(theirAuth);
        const testRead = db.collection("meals").doc(postId);
        await firebase.assertSucceeds(testRead.get());

    })
});