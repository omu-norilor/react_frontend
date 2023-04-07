import React, { useState, useEffect } from 'react';
import axios from 'axios';

function useFetch(url,command,body,again) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        console.log(body);
        if(command==="GET" && url!==null)
        {
            setLoading(true);
            axios
            .request({
                url: url,
                method: command,
            })
            .then((response) => {
                    setData(response.data);
            })
            .catch((error) => {
                    setError(error);
            })
            .finally(() => {
                    setLoading(false);
            });
        }
        else if(command==="POST" && url!==null){
            if(body==="meh")body={};
            setLoading(true);
            axios
            .request({
                url: url,
                method: command,
                data: body,
            })
            .then((response) => {
                    setData(response.data);
            })
            .catch((error) => {
                    setError(error);
            })
            .finally(() => {
                    setLoading(false);
            });
        }
        
    }, [again]);

    return { data, loading, error };
}

export default useFetch;