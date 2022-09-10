import * as React from 'react';
import Swal from "sweetalert2";
import NewWindow from 'rc-new-window';


    

const scraperUrl = "http://localhost:5000/";   

export default function SaveRecipe(props) {

    function check(){
        Swal.fire("Added!", "Your recipe was Added.", "success") 
    }



    return (
        <NewWindow>
            {check}
        </NewWindow>
  
        
    )

}