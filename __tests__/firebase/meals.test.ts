import * as firebase from "@firebase/testing";

import { MealType } from "../../src/@types/meals";

const PROJECT_ID = "diabietes-app";
const myId = "user_abc";
const theirId = "user_xyz";
const myAuth = { uid: myId, email: "abc@gmail.com" };
const theirAuth = { uid: theirId, email: "xyz@gmail.com" };
const DOC_NAME = "test_doc";
const THEIR_DUMMY_MEAL = {
  totalCarbs: 100,
  totalTimesEaten: 1,
  dateCreated: new Date(),
  dateLastModified: new Date(),
  mealType: MealType.LUNCH,
  userId: theirId,
  foodItems: [
    { name: "banana", totalCarbs: 30, brand: "", servingSize: 1 },
  ]
}
const MY_DUMMY_MEAL = {
  totalCarbs: 100,
  totalTimesEaten: 1,
  dateCreated: new Date(),
  dateLastModified: new Date(),
  mealType: MealType.LUNCH,
  userId: myId,
  foodItems: [
    { name: "banana", totalCarbs: 30, brand: "", servingSize: 1 },
  ]
}

/**
 * Runs firebase test app against our `PROJECT_ID` with an optional user
 * @param user the identity we want to mock as a signed user
 * @returns a firestore with optional signed user
 */
function getFirestore(auth: any) {
  return firebase
    .initializeTestApp({ projectId: PROJECT_ID, auth: auth })
    .firestore();
}

/**
 * Similar to `getFirestore()` but returns a FStore that disregards all the 
 * security rules
 */
function getAdminFirestore() {
  return firebase.initializeAdminApp({ projectId: PROJECT_ID }).firestore();
}

describe("Meal security rules", () => {
  /**
   * Clear the data in the local firestore before every test
   */
  beforeEach(async () => {
    await firebase.clearFirestoreData({ projectId: PROJECT_ID });
  });

  /**
   * Ensure that we wait for all promises to finish after each test
   * https://stackoverflow.com/questions/65656279/jest-did-not-exit-one-second-after-the-test-run-has-completed-firebase-rt-db
   *
   */
  afterEach(async () => {
    await Promise.all(firebase.apps().map((app) => app.delete()));
  });

  /**
   * Test that verifies that we can fetch our own meals
   */
  test("We can fetch our personal meals", async () => {
    const db = getFirestore(myAuth);
    const testQuery = db.collection("meals").where("userId", "==", myId);
    await firebase.assertSucceeds(testQuery.get());
  });

  /**
   * Test verifies that we can fetch a user with `theirId`, can fetch
   * its meal. 
   */
  test("We can fetch one meal", async () => {
    const admin = getAdminFirestore();
    const postId = "arbitrary_id";
    const setUpMealDoc = admin.collection("meals").doc(postId);
    await setUpMealDoc.set(THEIR_DUMMY_MEAL);

    const db = getFirestore(theirAuth);
    const testRead = db.collection("meals").doc(postId);
    await firebase.assertSucceeds(testRead.get());
  });

  /**
   * Test verifies that user `B` cannot fetch meals from user `A`
   */
  test("We cannot fetch someone else's meal", async() => {
    // Create a meal with user `A`
    const admin = getAdminFirestore();
    const mealId = "public_post";
    const setupDoc = admin.collection("meals").doc(mealId);
    await setupDoc.set(MY_DUMMY_MEAL);

    // Check that no meals are found for user `B`
    const db = getFirestore(theirAuth);
    const testRead = db.collection("meals").doc(mealId);
    await firebase.assertFails(testRead.get());
  });
});
