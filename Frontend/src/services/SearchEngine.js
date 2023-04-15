import LinkConst from "./LinkConst";
import { connect } from 'react-redux';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import * as SearchActions from '../store/actions/search';

const SearchAPIRequest = ({searchContent, callSearchApi}) => {      
    const dispatch = useDispatch()
    useEffect(() => {
        if(callSearchApi) {
            dispatch(SearchActions.ClearOldRequests())
            fetch(LinkConst.SearchContent, { 
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({search_content : searchContent})
            }).
            then(reponse => reponse.json()).
            then(reponse => reponse.map((data) => {
                dispatch(SearchActions.setSearchData(data.title,data.artist,data.cover,data.index,data.duration,data.album))
            }))
        }
    },[callSearchApi])
 

};
 

export default connect()(SearchAPIRequest)

