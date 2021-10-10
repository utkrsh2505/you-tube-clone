const types = {
    video : "youtube#video",
    channel : "youtube#channel"
}
const pageType = {
    next: "next",
    prev: "prev"
}
Object.freeze(types)
let pageInfo = {
    prevToken : null,
    nextToken: null,
}

window.addEventListener("load",function(){
    const btn = document.getElementById("btn");
    btn.addEventListener("click",()=>handleSearch());

            const pagination = document.getElementById('pagination');
            pagination.addEventListener('click', handlePageChange)
})

function handlePageChange() {
    const type = event.target.name;
    if(![pageType.next, pageType.prev].includes(type)){
        return false
    }
    
    const token = type === pageType.next ? pageInfo.nextToken: pageInfo.prevToken;
  //  console.log(token)
    handleSearch(token)
}
function getYoutubeSearchResults({q,pageToken = null}){
    if(pageToken){
return fetch(` https://youtube.googleapis.com/youtube/v3/search?q=${q}&key=AIzaSyCM5mzWnLKgcH-fpjkEgTmZFK5ybDAI9QM&pageToken=${pageToken}&maxResults=20`)
.then(res=>res.json())
// .then(function(response){

// })
    }
    else{
        return fetch(` https://youtube.googleapis.com/youtube/v3/search?q=${q}&key=AIzaSyCM5mzWnLKgcH-fpjkEgTmZFK5ybDAI9QM`)
.then(res=>res.json())
    }

}

function createYoutubeVideoCards(data){
   
    const div = document.createElement("div");
    div.setAttribute("class", "frame");
    if(data.id.kind === types.channel){
       return false
    }
  console.log(data.id.videoId);
// div.textContent = data.id.videoId;
    div.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${data.id.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    return div;

}

async function  handleSearch(token){
    if(!token ){
        pageInfo.nextToken = null;
        pageInfo.prevToken = null
    }
    const search = document.querySelector("#input").value;
   try{
  const {
      items : results,
      pageInfo: {
          resultsPerPage,
          totalResults
      },
      nextPageToken,
      prevPageToken
  } = await getYoutubeSearchResults({
        q: search,
       // prevToken:pageInfo.prevToken, 
        pageToken:token
    });
    console.log(results,resultsPerPage, totalResults)
    //set page correctly
    pageInfo.nextToken = nextPageToken ? nextPageToken : null;
    pageInfo.prevToken = prevPageToken ? prevPageToken : null;
    const allCards =  [];
    for(let video of results){
        const card = createYoutubeVideoCards(video);
        if(card){

        allCards.push(card);
        }
    }
    //console.log("se",allCards)
     const resContainer = document.getElementById("results");
     resContainer.innerHTML = null
    
     resContainer.append(...allCards)
            
}
catch(err){
    //handle erroe
}
} 
