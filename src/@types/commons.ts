import { FirebaseError } from "firebase/app";
import { Timestamp } from "firebase/firestore";

interface Error extends FirebaseError {}

export {
    Timestamp,
    Error
};