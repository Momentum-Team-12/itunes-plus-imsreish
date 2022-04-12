console.log("iTunes JS is connected");

let searchBar = document.querySelector("#searchBar");

let resultView = document.querySelector("#resultView");
// let albumArtContainer = document.querySelector("#albumArtContainer");
// let songDetails = document.querySelector("#songDetails");

// searchBar.addEventListener("keydown", finalSearch);

var defaultSearch = "https://proxy-itunes-api.glitch.me/search?term=tate+mcrae";
// var userSearch = defaultSearch.slice(0, 10) + searchBar.value;

fetch("https://proxy-itunes-api.glitch.me/search?term=tate+mcrae&media=music", {
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
      console.log(singleResult.albumName);
      songDetails.appendChild(albumName);

      let resultContainer = document.createElement("div");
      resultContainer.appendChild(albumArtContainer);
      resultContainer.appendChild(songDetails);
      resultContainer.classList.add("resultContainer");
      resultView.appendChild(resultContainer);
      // Each result is wrapped in this container
    }
  });
