import {useState} from 'react';

import axios from 'axios';

import {API} from '../config';

export const useRequest = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const sendRequest = async (
        fn: (data: any) => void,
    ) => {
        setIsLoading(true);
        setIsError(false);
        try {
            const data = await axios.get(`${API}`);

            if (!data) {
                setIsLoading(false);
                throw data;
            }

            fn(data.data);
        } catch (err) {
            setIsError(true);
            if (axios.isAxiosError(err)) {
                setErrorMsg(err.message);
            }

            setErrorMsg('Oops, something went wrong. Please try again!');
        }

        setIsLoading(false);
    };

    const resetError = () => {
        setIsError(false);
    };

    return {
        isLoading,
        isError,
        errorMsg,
        resetError,
        sendRequest,
    };
};