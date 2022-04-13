console.log("iTunes JS is connected");

let searchBar = document.querySelector("#searchBar");
let resultView = document.querySelector("#resultView");

// search interface logic goes here:

// Default search parameters:
const appleServerLink = "https://itunes.apple.com/search";
const proxyServerLink = "https://proxy-itunes-api.glitch.me/search";
let serverSetup = appleServerLink;
let searchTerm = "?term=tate+mcrae";
let searchType = "&media=music";
let searchEntity = "&entity=musicArtist";
let searchExplicitness = "&explicit=y";

// button setup logic goes here
let artistOption = document.querySelector("#artistOption");
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
let songOption = document.querySelector("#songOption");
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
let albumOption = document.querySelector("#albumOption");
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
let genreOption = document.querySelector("#genreOption");
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

let explicitPermission = document.querySelector("#explicitPermission");
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
let defaultServer = document.querySelector("#defaultServer");
defaultServer.addEventListener("change", function () {
  if (defaultServer.checked) {
    proxyServer.checked = false;
    let serverSetup = appleServerLink;
    console.log(serverSetup);
  } else {
  }
});
let proxyServer = document.querySelector("#proxyServer");
proxyServer.addEventListener("change", function () {
  if (proxyServer.checked) {
    defaultServer.checked = false;
    let serverSetup = proxyServerLink;
    console.log(serverSetup);
  } else {
  }
});

function refreshResults(eachResult) {
  while (eachResult.firstChild) {
    eachResult.removeChild(eachResult.firstChild);
  }
}
fetch(`${serverSetup}${searchTerm}${searchType}${searchExplicitness}`, {
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
