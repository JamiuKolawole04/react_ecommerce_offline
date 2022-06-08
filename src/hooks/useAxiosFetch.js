import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosFetch = (dataURL) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const fetchData = async (url) => {
            setIsLoading(true);
            try {
                // const { data } = await axios.get(url, {
                //     cancelToken: source.token
                // });
                const { data } = await axios.get(url);


                setData(data);
                setFetchError(null)
            } catch (err) {

                setFetchError(err.message);
                setData([])


            } finally {
                setIsLoading(false)
            }
        }
        setTimeout(() => {
            fetchData(dataURL)
        }, 3000);
    }, [dataURL])

    return { data, fetchError, isLoading }
}

export default useAxiosFetch;