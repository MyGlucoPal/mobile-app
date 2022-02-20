import { useContext } from 'react';
import { ErrorContext } from '../context/ErrorContext';

const useError = () => {
    const context = useContext(ErrorContext);

    if (!context) throw new Error('Error context must be use inside ErrorProvider');

    return context;
};

export default useError;