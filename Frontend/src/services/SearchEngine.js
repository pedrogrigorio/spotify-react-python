import axios from 'axios';
import { useState } from 'react';

export async function SearchEngine(searchContent){      

    let data
    let config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
      
    let payload = {
        search_content: searchContent
    }

    

    await axios.post('http://127.0.0.1:8000/search', payload, config)
    .then(response => {
        data = response.data
        console.log(data)
    })

    return { data }
}