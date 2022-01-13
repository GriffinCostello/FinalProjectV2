

//load the service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

window.onload = function() {
	var input = document.getElementById("search");
    input.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
       event.preventDefault();
       document.getElementById("searchButton").click();
    }
    });
  
};

// get data from TV Maze
function fetchAnime() {
  document.getElementById("main").innerHTML = "";
  
  var search = document.getElementById("search").value;   
  fetch('https://api.jikan.moe/v3/search/anime?q=' + search)
    .then(response => response.json())
    .then(data => updatePage(data)  
    );
  
  var input = document.getElementById("search");
    input.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
       event.preventDefault();
       document.getElementById("searchButton").click();
    }
    });                 
	
} // window.onload 
 

// change the activity displayed 
function updatePage(data) {
  console.log(data); // prints json in console
  var results; 
	
	  for (index in data.results) {
		if (index < 20) {
			createAnime(data.results[index]);
		}
	  } // for
  
} // updatePage


function createAnime(results) {
    var elemMain = document.getElementById("main");
	
	var elemDiv = document.createElement("div");
	elemDiv.classList.add("listItem");
	
	var elemName = document.createElement("name");
	elemName.classList.add("showName");
	 
    var elemImage = document.createElement("img");
	elemImage.classList.add("showImg");
	
	var elemSummary = document.createElement("summary");
	elemSummary.classList.add("showSummary");
	
	var elemButton = document.createElement("button");
  elemButton.id = "characterButton";
	elemButton.classList.add("showButton");
	
	var elemEpisodes = document.createElement("episodes");
	elemEpisodes.classList.add("showEpisodes");
	
	var elemScore = document.createElement("score");
	elemScore.classList.add("showScore");
	
	var elemDetails = document.createElement("div");
	elemDetails.classList.add("showDetails");
	
	var elemButtonContainer = document.createElement("div");
	elemButtonContainer.classList.add("showButtonContainer")
	
	var showId = results.mal_id;
	
	
    // add JSON data to elements
	elemName.innerHTML = results.title + "<br>";
    elemImage.src = results.image_url;
    elemButton.innerHTML = "Characters";
	elemScore.innerHTML = results.score;
	elemSummary.innerHTML = results.synopsis;
	elemEpisodes.innerHTML = results.episodes + "<br>";
	elemButton.onclick = function() {fetchCharacters(showId , elemDiv, this);};
       
	// add 2 elements to details
    elemDetails.appendChild(elemEpisodes);
	elemDetails.appendChild(elemScore);
	elemButtonContainer.appendChild(elemButton);
	
    // add 5 elements to the div tag
	elemDiv.appendChild(elemName); 
    elemDiv.appendChild(elemImage); 
	elemDiv.appendChild(elemButtonContainer);
	elemDiv.appendChild(elemSummary);
	elemDiv.appendChild(elemDetails);
    
	
   // add this entry to main
    elemMain.appendChild(elemDiv);
  
  
  
} // createTVShow



function fetchCharacters(showId, elemDiv, buttonElement) {
  console.log()
 
  fetch('https://api.jikan.moe/v3/anime/' + showId + '/characters_staff')
    .then(response => response.json())
    .then(data => showCharacters(data, elemDiv, buttonElement));
    
} // fetch episodes

function showCharacters (data, elemDiv,buttonElement) {
    console.log(data);
  
	let characterCounter = 0;
	var elemCharacters = document.createElement("div");
	elemCharacters.classList.add("showCharacters");
    var output = "";
	for (let characters in data) {
	output += "<div class='characterListItem'> <p>" + data.characters[characterCounter].name + "</p>" + "<img class='imgMed' src=" + data.characters[characterCounter].image_url + "'alt='character image'></div>";
		characterCounter ++;
    }
	
    elemCharacters.innerHTML = output;
    elemDiv.appendChild(elemCharacters);
	
  
  
  // cHANGE bg color of button
 //  document.getElementByClass("showButton").style.backgroundColor = "#DDDDDD";
  buttonElement.style.backgroundColor = "#DDDDDD";
  // change the onclick function to do nothing
	// document.getElementByClass("showButton").onclick = function () {};
  buttonElement.onclick = function () {};

} // characters




//https://api.jikan.moe/v3/anime/1735/characters_staff