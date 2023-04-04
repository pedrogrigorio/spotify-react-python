import LinkConst from "./LinkConst";
import { connect } from 'react-redux';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import * as SearchActions from '../store/actions/search';
import axios from 'axios';

const SearchAPIRequest = ({searchContent, callSearchApi, dispatch}) => {      

    let config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
      
    let data = {
        search_content: searchContent
    }

    useEffect(() => {
        if(callSearchApi) {
            dispatch(SearchActions.ClearOldRequests())
            axios.post(LinkConst.SearchContent, data, config)
            .then(response => response.data.map((info) => {
                dispatch(SearchActions.setSearchData(info.img, info.link, info.title))
            }))
        }
    },[callSearchApi])

    // useEffect(() => {
    //     if(callSearchApi) {
    //         dispatch(SearchActions.ClearOldRequests())
    //         fetch(LinkConst.SearchContent, { 
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             }, 
    //             body: JSON.stringify({search_content: searchContent})
    //         }).
    //         then(reponse => reponse.json()).
    //         then(reponse => reponse.map((info) => {
    //             dispatch(SearchActions.setSearchData(info.img, info.link, info.title))
    //         }))
    //     }
    // },[callSearchApi])
};

export default connect()(SearchAPIRequest)

