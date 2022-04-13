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
let searchTerm = encodeURIComponent(`${"tate mcrae"}`);
// This may not be changed:
const searchType = "&media=music";
// These may also be changed by the user:
let searchEntity = "&entity=musicArtist";
let searchExplicitness = "&explicit=y";
// make the array:
let linkArray = [
  serverSetup,
  serverQuery,
  searchTerm,
  searchType,
  searchExplicitness,
];
// the full link to GET:
// the "" is to tell JavaScript to make the separators empty strings as opposed to commas
let linkToGET = linkArray.join("");
//

// search interface logic is built here:
let searchBar = document.querySelector("#searchBar");
searchBar.addEventListener("change", function () {
  if (searchBar.value !== null) {
    let searchTerm = encodeURIComponent(`${searchBar.value}`);
    console.log(searchTerm);
  } else {
  }
});

// button logic is built here, in order of appearance:
// first, the variables:
// search refiners:
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
artistOption.addEventListener("change", function () {
  if (artistOption.checked) {
    songOption.checked = false;
    albumOption.checked = false;
    genreOption.checked = false;
    let searchEntity = "&entity=musicArtist";
    console.log(searchEntity);
  } else {
  }
});
songOption.addEventListener("change", function () {
  if (songOption.checked) {
    artistOption.checked = false;
    albumOption.checked = false;
    genreOption.checked = false;
    let searchEntity = "&entity=song";
    console.log(searchEntity);
  } else {
  }
});
albumOption.addEventListener("change", function () {
  if (albumOption.checked) {
    artistOption.checked = false;
    songOption.checked = false;
    genreOption.checked = false;
    let searchEntity = "&entity=album";
    console.log(searchEntity);
  } else {
  }
});
genreOption.addEventListener("change", function () {
  if (genreOption.checked) {
    artistOption.checked = false;
    songOption.checked = false;
    albumOption.checked = false;
    // let searchEntity = "&entity=album";
    console.log(searchEntity);
  } else {
  }
});
// explicit permission option:
explicitPermission.addEventListener("change", function () {
  if (explicitPermission.checked) {
    let searchExplicitness = "&explicit=y";
    refreshResults(resultView);
    console.log(searchExplicitness);
  } else {
    let searchExplicitness = "&explict=n";
    refreshResults(resultView);
    console.log(searchExplicitness);
  }
});
// server selector:
defaultServer.addEventListener("change", function () {
  if (defaultServer.checked) {
    proxyServer.checked = false;
    let serverSetup = appleServerLink;
    console.log(serverSetup);
  } else {
  }
});
proxyServer.addEventListener("change", function () {
  if (proxyServer.checked) {
    defaultServer.checked = false;
    let serverSetup = proxyServerLink;
    console.log(serverSetup);
  } else {
  }
});

//refresh is SUPPOSED to happen here, followed by GET function:
function refreshResults(eachResult) {
  while (eachResult.firstChild) {
    eachResult.removeChild(eachResult.firstChild);
  }
}

// call the GET function:
userSearch(linkToGET);

// define the GET function:
function userSearch(searchLink) {
  fetch(searchLink, {
    method: "GET",
    //   headers: {},
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.results);
      console.log(data.resultCount);

      for (let singleResult of data.results) {
        console.log(singleResult);

        // Album art is contained here
        let albumArtContainer = document.createElement("div");

        var albumArtDirectLink = singleResult.artworkUrl100.toString();
        console.log(albumArtDirectLink);
        let albumArtConvertedLink =
          albumArtDirectLink.slice(0, -13) + "1000x1000bb.jpg";
        console.log(albumArtConvertedLink);
        let albumArt = document.createElement("img");
        //   albumArt.src = singleResult.artworkUrl100;
        albumArt.src = albumArtConvertedLink;
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
        console.log(singleResult.artistName);
        songDetails.appendChild(songArtist);

        let albumName = document.createElement("p");
        albumName.innerText = singleResult.collectionName;
        console.log(singleResult.collectionName);
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
