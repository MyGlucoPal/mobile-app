import React, { createContext, ReactNode, useState } from 'react';

type ErrorContextType = {
   errorMsg: null | string;
   clearError: () => void;
   setErrorMsg: (newErrorMsg: string) => void;
   hasError: () => boolean;
};

const ErrorContext = createContext<ErrorContextType>({
   errorMsg: null,
   clearError: () => {},
   setErrorMsg: () => {},
   hasError: () => false,
} as ErrorContextType);

const ErrorProvider = ({ children }: { children: ReactNode }) => {
   const [errorMsg, setErrorMsg] = useState<null | string>(null);

   /**
    * Remove error from state in order to stop displaying it
    */
   const clearError = (): void => {
      setErrorMsg(null);
   };

   /**
    * Function to add new error to hook in order to display to the user
    *
    * @param newErrorMsg message to show to the user
    */
   const setNewErrorMsg = (newErrorMsg: string): void => {
      setErrorMsg(newErrorMsg);
   };

   /**
    * Verify if we have an error message to display
    */
   const hasError = (): boolean => {
      return errorMsg !== null;
   };

   return (
      <ErrorContext.Provider
         value={{
            errorMsg: errorMsg,
            clearError: clearError,
            setErrorMsg: setNewErrorMsg,
            hasError: hasError,
         }}
      >
         {children}
      </ErrorContext.Provider>
   );
};

export { ErrorContext, ErrorProvider };
