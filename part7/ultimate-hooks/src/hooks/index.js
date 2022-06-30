import axios from "axios";
import { useState } from 'react';


export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (e) => {
        setValue(e.target.value)
    }
    const clear = () => setValue('')

    return {
        type,
        value,
        onChange,
        clear
    }
}

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])


    const getAll = async() => {
        const response = await axios.get(baseUrl);
        setResources(response.data);
    };

    const create = async(resource) => {
        const response = await axios.post(baseUrl, resource);
        setResources([...resources, response.data]);
    };

    const service = {
        getAll,
        create,
    };

    return [resources, service]
}