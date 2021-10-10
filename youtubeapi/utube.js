const types = {
    video : "youtube#video",
    channel : "youtube#channel"
}
Object.freeze(types)

window.addEventListener("load",function(){
    const btn = document.getElementById("btn");
    btn.addEventListener("click",handleSearch);
})
function getYoutubeSearchResults(q){
return fetch(` https://youtube.googleapis.com/youtube/v3/search?q=${q}&key=AIzaSyCM5mzWnLKgcH-fpjkEgTmZFK5ybDAI9QM`)
.then(res=>res.json())
// .then(function(response){

// })

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

async function  handleSearch(){
    const search = document.querySelector("#input").value;
   try{
  const {
      items : results,
      pageInfo: {
          resultsPerPage,
          totalResults
      }
  } = await getYoutubeSearchResults(search);
    console.log(results,resultsPerPage, totalResults)
    const allCards =  [];
    for(let video of results){
        const card = createYoutubeVideoCards(video);
        if(card){

        allCards.push(card);
        }
    }
    console.log("se",allCards)
     const resContainer = document.getElementById("results");
     resContainer.innerHTML = null
    
     resContainer.append(...allCards)
            
}
catch(err){
    //handle erroe
}
} 
