import { AuthErrorCodes } from "firebase/auth";

/**
 * Helper function that given an auth error code returns an appropiate message to display to the user
 * Firebase Auth Error Codes: https://firebase.google.com/docs/auth/admin/errors
 * 
 * @param errorCode code receiveed from the auth(login/register) request
 * @returns message to display to the user
 */
export const getAuthErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
        case AuthErrorCodes.INVALID_PASSWORD:
            return "E-mail or password is incorrect";
        case AuthErrorCodes.USER_DELETED:
            return "E-mail or password is incorrect";
        case AuthErrorCodes.EMAIL_EXISTS:
            return "This e-mail address is already in use, please use a different e-mail address.";
        case AuthErrorCodes.INVALID_EMAIL:
            return "The email address is badly formatted.";
        default:
            return "An error has occurred, please try again later";
    }
}