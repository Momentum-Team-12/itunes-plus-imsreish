console.log("iTunes JS is connected");

// Declaring container div for all results
let resultView = document.querySelector("#resultView");
//

// Random assortment of 'starter searches' to be implemented here:
//

// INITIAL SETUP- contructing a search and defining its default parameters:
// domain:
const appleServerLink = "https://itunes.apple.com/";
const proxyServerLink = "https://proxy-itunes-api.glitch.me/";
let serverSetup = appleServerLink;
// query string:
const serverQuery = "search?term=";
// This will refer to the 'starter searches' variable,
// and may be changed by the user:
let searchTerm = encodeURIComponent(`${"lcd soundsystem"}`);
// This may not be changed:
const searchType = "&media=music";
// These may also be changed by the user:
let searchEntity = "&entity=musicArtist";
let searchExplicitness = "&explicit=y";
// make the array:
let linkArray = [];
// the full link to GET:
// the "" is to tell JavaScript to make the separators empty strings as opposed to commas
function linkToGET() {
  linkArray = [
    serverSetup,
    serverQuery,
    searchTerm,
    searchType,
    searchEntity,
    searchExplicitness,
  ];
  return linkArray.join("");
}
//

// button logic is built here, in order of appearance:
// first, the variables:
// search refiners:
//
//implement later
// let everythingOption = document.querySelector("#everythingOption")
//implement later^^
//
let searchBar = document.querySelector("#searchBar");
//
let artistOption = document.querySelector("#artistOption");
let songOption = document.querySelector("#songOption");
let albumOption = document.querySelector("#albumOption");
let genreOption = document.querySelector("#genreOption");
// explicit permission option:
let explicitPermission = document.querySelector("#explicitPermission");
// server selector:
let defaultServer = document.querySelector("#defaultServer");
let proxyServer = document.querySelector("#proxyServer");
// then, the functions, in order of appearance:
// search refiners:

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("change", function (event) {
  console.log(event.target);
  if (searchForm.artistOption.checked) {
    searchEntity = "&entity=musicArtist";
    // userSearch(linkToGET());
    console.log(searchEntity);
  }
  if (searchForm.songOption.checked) {
    searchEntity = "&entity=song";
    // userSearch(linkToGET());
    console.log(searchEntity);
  }
  if (searchForm.albumOption.checked) {
    searchEntity = "&entity=album";
    // userSearch(linkToGET());
    console.log(searchEntity);
  }
  //   if (searchForm.genreOption.checked) {
  //     console.log(searchEntity);
  //     userSearch(linkToGET);
  //   }
  if (searchForm.explicitPermission.checked) {
    searchExplicitness = "&explict=n";
    refreshResults(resultView);
    // userSearch(linkToGET());
    console.log(searchExplicitness);
  }
  if (searchForm.explicitPermission.unchecked) {
    searchExplicitness = "&explicit=y";
    refreshResults(resultView);
    // userSearch(linkToGET());
    console.log(searchExplicitness);
  }
  if (searchForm.defaultServer.checked) {
    serverSetup = appleServerLink;
    // userSearch(linkToGET());
    console.log(serverSetup);
  }
  if (searchForm.proxyServer.checked) {
    serverSetup = proxyServerLink;
    // userSearch(linkToGET());
    console.log(serverSetup);
  }
  if (searchBar.value !== null) {
    searchTerm = encodeURIComponent(`${searchBar.value}`);
    // userSearch(linkToGET());
    console.log(searchTerm);
  }
  userSearch(linkToGET());
});

//refresh is SUPPOSED to happen here, followed by GET function:
function refreshResults(eachResult) {
  while (eachResult.firstChild) {
    eachResult.removeChild(eachResult.firstChild);
  }
}

// call the GET function:
// userSearch(linkToGET);

// define the GET function:
function userSearch(searchLink) {
  console.log("constructed URL", searchLink);
  fetch(searchLink, {
    method: "GET",
    //   headers: {},
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //   console.log(data);
      //   console.log(data.results);
      //   console.log(data.resultCount);
      refreshResults(resultView);
      for (let singleResult of data.results) {
        // console.log(singleResult);

        // Album art is contained here
        let albumArtContainer = document.createElement("div");
        // COMMENT IN WITH IF STATEMENT - IF IT EXISTS
        // var albumArtDirectLink = singleResult.artworkUrl100.toString();
        // COMMENT IN
        // console.log(albumArtDirectLink);
        // let albumArtConvertedLink =
        //   albumArtDirectLink.slice(0, -13) + "1000x1000bb.jpg";
        // console.log(albumArtConvertedLink);
        let albumArt = document.createElement("img");
        //   albumArt.src = singleResult.artworkUrl100;
        // albumArt.src = albumArtConvertedLink;
        albumArt.classList.add("albumArt");
        albumArtContainer.appendChild(albumArt);

        // Other song metadata contained here
        let songDetails = document.createElement("div");

        let songTitle = document.createElement("p");
        songTitle.innerText = singleResult.trackName;
        songTitle.classList.add("songTitle");
        if (singleResult.trackExplicitness === "explicit") {
          songTitle.innerText = `${singleResult.trackName} E`;
        }
        songDetails.appendChild(songTitle);

        let songArtist = document.createElement("p");
        songArtist.innerText = singleResult.artistName;
        // console.log(singleResult.artistName);
        songDetails.appendChild(songArtist);

        let albumName = document.createElement("p");
        albumName.innerText = singleResult.collectionName;
        // console.log(singleResult.collectionName);
        songDetails.appendChild(albumName);

        let resultContainer = document.createElement("div");
        resultContainer.appendChild(albumArtContainer);
        resultContainer.appendChild(songDetails);
        resultContainer.classList.add("resultContainer");
        resultView.appendChild(resultContainer);
        // Each result is wrapped in this container
      }
    });
}
