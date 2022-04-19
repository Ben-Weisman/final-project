
function getUrl(){
    
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
       let url = tabs[0].url;
       const Http = new XMLHttpRequest();
       const url_='http://localhost:5000/getUrl?url='+url;
       Http.open("GET", url_);
       Http.send();
       
       Http.onreadystatechange = (e) => {

           status_code = Http.status
        //  console.log(Http.responseText)
        //  console.log(Http.status)

           if (status_code == 200){
               document.getElementById("addThisRecipe").innerHTML = "The recipe was successfully added!";
           }
           else {
               document.getElementById("addThisRecipe").innerHTML = "Error: recipe could not be added.";
           }
        
       }
       
    })
};

// function showCookbook(){
// };

document.getElementById("addThisRecipe").addEventListener("click", getUrl);
//document.getElementById("myCookbook").addEventListener("click", showCookbook);
