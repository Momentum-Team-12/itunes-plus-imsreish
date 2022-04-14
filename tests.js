console.log("iTunes JS is connected");
const appleServerLink = "https://itunes.apple.com/";
const proxyServerLink = "https://proxy-itunes-api.glitch.me/";
let serverSetup = appleServerLink;
const serverQuery = "search?term=";
let searchTerm = encodeURIComponent(`${"tate mcrae"}`);
const searchType = "&media=music";
let searchEntity = "";
let searchExplicitness = "&explicit=y";
let linkArray = [];
// let linkToGET = `${serverSetup}${serverQuery}${searchTerm}${searchType}${searchEntity}${searchExplicitness}`;
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
userSearch(linkToGET());
//
let attributeControls = document.querySelector("#attributeControls");
attributeControls.addEventListener("change", function (event) {
  // console.log(event.target);
  if (allOption.checked) {
    searchEntity = "";
    explicitPermission.indeterminate = false;
    console.log(searchEntity);
  }
  if (songOption.checked) {
    searchEntity = "&entity=song";
    explicitPermission.indeterminate = false;
    console.log(searchEntity);
  }
  if (albumOption.checked) {
    searchEntity = "&entity=album";
    explicitPermission.indeterminate = false;
    console.log(searchEntity);
  }
  if (artistOption.checked) {
    searchEntity = "&entity=musicArtist";
    explicitPermission.indeterminate = true;
    console.log(searchEntity);
  }
  userSearch(linkToGET());
});
let explicitPermission = document.querySelector("#explicitPermission");
//
explicitPermission.addEventListener("change", function (event) {
  if (explicitPermission.checked === true) {
    searchExplicitness = "&explicit=y";
    console.log(searchExplicitness);
    userSearch(linkToGET());
  }
  if (explicitPermission.checked === false) {
    searchExplicitness = "&explicit=n";
    console.log(searchExplicitness);
    userSearch(linkToGET());
  }
  userSearch(linkToGET());
});
let serverControls = document.querySelector("#serverControls");
//
serverControls.addEventListener("change", function (event) {
  if (defaultServer.checked) {
    serverSetup = appleServerLink;
    console.log(serverSetup);
  }
  if (proxyServer.checked) {
    serverSetup = proxyServerLink;
    console.log(serverSetup);
  }
  userSearch(linkToGET());
});
//
let searchBar = document.querySelector("#searchBar");
searchBar.addEventListener("input", function (event) {
  if (searchBar.value !== "") {
    searchTerm = encodeURIComponent(searchBar.value);
  }
  userSearch(linkToGET());
});
//

// Declaring container div for all results
let resultView = document.querySelector("#resultView");

// Old results get removed, followed by GET function:
function removeOldResults(eachResult) {
  while (eachResult.firstChild) {
    eachResult.removeChild(eachResult.firstChild);
  }
}

// define & call the GET function:
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
      console.log(data.results);
      //   console.log(data.resultCount);
      removeOldResults(resultView);
      for (let singleResult of data.results) {
        let resultInfo = document.querySelector("#resultInfo");
        resultInfo.innerText = `${data.results.length} results found for ${searchBar.value}`;
        // console.log(singleResult);
        // checking to see if result is of type "track"
        if (searchEntity === "" || searchEntity === "&entity=song") {
          console.log(singleResult.WrapperType);
          let albumArtContainer = document.createElement("div");
          if (singleResult.artworkUrl100 === undefined) {
            let albumArt = document.createElement("img");
            albumArt.classList.add("albumArt");
            albumArtContainer.appendChild(albumArt);
          }
          if (singleResult.artworkUrl100 !== undefined) {
            var albumArtDirectLink = singleResult.artworkUrl100.toString();
            // console.log(albumArtDirectLink);
            let albumArtConvertedLink =
              albumArtDirectLink.slice(0, -13) + "1000x1000bb.jpg";
            // console.log(albumArtConvertedLink);
            let albumArt = document.createElement("img");
            albumArt.src = singleResult.artworkUrl100;
            albumArt.src = albumArtConvertedLink;
            albumArt.classList.add("albumArt");
            albumArtContainer.appendChild(albumArt);
          }
          // Other song metadata contained here
          let songDetails = document.createElement("div");
          let songTitle = document.createElement("p");
          songTitle.innerText = singleResult.trackName;
          songTitle.classList.add("songTitle");
          if (singleResult.trackExplicitness === "explicit") {
            songTitle.innerText = `${singleResult.trackName} 🅴`;
          }
          songDetails.appendChild(songTitle);
          //
          let artistName = document.createElement("p");
          artistName.innerText = singleResult.artistName;
          // console.log(singleResult.artistName);
          songDetails.appendChild(artistName);
          //
          let albumName = document.createElement("p");
          albumName.innerText = singleResult.collectionName;
          // console.log(singleResult.collectionName);
          songDetails.appendChild(albumName);
          //
          let releaseInfo = document.createElement("p");
          releaseInfo.innerText = `${singleResult.releaseDate.slice(0, 4)}∙${
            singleResult.primaryGenreName
          }`;
          songDetails.appendChild(releaseInfo);
          //
          let resultContainer = document.createElement("div");
          resultContainer.appendChild(albumArtContainer);
          resultContainer.appendChild(songDetails);
          resultContainer.classList.add("resultContainer");
          resultView.appendChild(resultContainer);
          // Each result is wrapped in this container
        }
        if (searchEntity === "&entity=album") {
          console.log(singleResult.WrapperType);
          let albumArtContainer = document.createElement("div");
          if (singleResult.artworkUrl100 === undefined) {
            let largeAlbumArt = document.createElement("img");
            largeAlbumArt.classList.add("largeAlbumArt");
            albumArtContainer.appendChild(largeAlbumArt);
          }
          if (singleResult.artworkUrl100 !== undefined) {
            var albumArtDirectLink = singleResult.artworkUrl100.toString();
            // console.log(albumArtDirectLink);
            let albumArtConvertedLink =
              albumArtDirectLink.slice(0, -13) + "1000x1000bb.jpg";
            // console.log(albumArtConvertedLink);
            let largeAlbumArt = document.createElement("img");
            largeAlbumArt.src = singleResult.artworkUrl100;
            largeAlbumArt.src = albumArtConvertedLink;
            largeAlbumArt.classList.add("largeAlbumArt");
            albumArtContainer.appendChild(largeAlbumArt);
          }
          // Other song metadata contained here
          let songDetails = document.createElement("div");
          let largeAlbumName = document.createElement("p");
          largeAlbumName.innerText = singleResult.collectionName;
          // console.log(singleResult.collectionName);
          songDetails.appendChild(largeAlbumName);
          //
          let artistName = document.createElement("p");
          artistName.innerText = singleResult.artistName;
          // console.log(singleResult.artistName);
          songDetails.appendChild(artistName);
          //
          let releaseInfo = document.createElement("p");
          releaseInfo.innerText = `${singleResult.releaseDate.slice(0, 4)}∙${
            singleResult.primaryGenreName
          }`;
          songDetails.appendChild(releaseInfo);
          //
          let resultContainer = document.createElement("div");
          resultContainer.appendChild(albumArtContainer);
          resultContainer.appendChild(songDetails);
          resultContainer.classList.add("resultContainer");
          resultView.appendChild(resultContainer);
          // Each result is wrapped in this container
        }
      }
    });
  console.log("end of GET reached");
}
