console.log("iTunes JS is connected");

let albumArtContainer = document.querySelector("#albumArtContainer");
let searchBar = document.querySelector("#searchBar");
// searchBar.addEventListener("keydown", finalSearch);

var defaultSearch = "https://proxy-itunes-api.glitch.me/search?term=tate+mcrae";
// var userSearch = defaultSearch.slice(0, 10) + searchBar.value;

fetch("https://proxy-itunes-api.glitch.me/search?term=tate+mcrae", {
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

      let songTitle = document.createElement("p");
      interface.appendChild(songTitle);
      songTitle.innerText = singleResult.trackName;
      songTitle.classList.add("songTitle");

      let songRating = document.createElement("h1");
      interface.appendChild(songRating);
      if ((singleResult.trackExplicitness = "explicit")) {
        songRating.innerText = "E";
      }
      songRating.classList.add("songRating");

      let songArtist = document.createElement("p");
      interface.appendChild(songArtist);
      songArtist.innerText = singleResult.artistName;
      console.log(singleResult.artistName);

      let albumName = document.createElement("p");
      interface.appendChild(albumName);
      albumName.innerText = singleResult.collectionName;
      console.log(singleResult.albumName);
    }
  });
