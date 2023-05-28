import React from "react";
import { connect } from 'react-redux'



function ShowAll(props) {

    return (
        <div>
        
            <h1>Ola</h1>
            {console.log(props.showAllContent)}

        </div>

 
    
    )

}

 
const mapStateToProps = state => ({
    showAllContent : state.home.showAllContent
})

export default connect(mapStateToProps)(ShowAll)
