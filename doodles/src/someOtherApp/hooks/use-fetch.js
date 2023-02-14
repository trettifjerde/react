import { useCallback, useState } from "react";

const useFetch = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const sendRequest = useCallback(async (fetchData) => {
        setIsLoading(true);
        setError(null);
        try {
            const options = { method: fetchData.method };
            if (fetchData.body) {
                options['body'] = JSON.stringify(fetchData.body);
                options['headers'] = {'Content-Type': 'application/json'};
            }
            const response = await fetch(fetchData.url, options);

            if (!response.ok) throw new Error('Failed to post new task', {cause: response.status});
            
            const data = await response.json();
            
            fetchData.callback(data);
        }
        catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, []);

    return [isLoading, error, sendRequest];
}

export default useFetch;