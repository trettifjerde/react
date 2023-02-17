import { useCallback } from "react";

const useFetch = () => {

    const sendFetch = useCallback(async config => {
        try {
            const options = {method: config.method};
            if (config.body) {
                options['body'] = JSON.stringify(config.body);
                options['headers'] = {
                    'Content-Type': 'application/json'
                }
            }
            const response = await fetch(config.url, options);
            if (!response.ok) throw new Error('Failed to fetch')
            const data = await response.json();
            return [true, data];
        }
        catch (error) {
            return [false, error.message];
        }
    }, []);

    return [sendFetch];
}
export default useFetch;