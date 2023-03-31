import LinkConst from "./LinkConst";
import { connect } from 'react-redux';
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const SearchAPIRequest = ({searchContent, callSearchApi}) => {      
    const dispatch = useDispatch()
    useEffect(() => {
        if(callSearchApi) {
            dispatch(ClearOldRequests())
            fetch(LinkConst.SearchContent, { 
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({search_content: searchContent})
            }).
            then(reponse => reponse.json()).
            then(reponse => reponse.map((info) => {
                dispatch(setSearchData(info.img, info.link, info.title))
            }))
        }
    },[callSearchApi])
};
 
function setSearchData(image, link, title) {
    return { 
        type : 'SET_CONTENT_SEARCH',
        image,
        link,
        title
    }
}

function ClearOldRequests() {
    return {
        type : 'CLEAR_OLD_REQUESTS'
    }
}


export default connect()(SearchAPIRequest)

