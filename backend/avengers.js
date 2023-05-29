const baseUrl = "https://gateway.marvel.com:443/v1/public";
const publicApiKey = "641e28540e251c5581cbd8266f145367";
const privateApiKey = "f85d4ddc7075942498db5c53ae23b00d4b04d18c";

function generateHash(publicKey, privateKey) {
  const input = "1" + privateKey + publicKey;
  const hash = CryptoJS.MD5(input).toString();
  return hash;
}

const hash = generateHash(publicApiKey, privateApiKey);

getAllCharacters();

function getAllCharacters() {
  axios
    .get(
      `${baseUrl}/events/29/characters?ts=1&apikey=${publicApiKey}&hash=${hash}&limit=58`
    )
    .then((response) => {
      document.querySelector("#loading").classList.add("loading");
      var res = response.data.data.results;
      console.log(response.data.data.results);
      var index = 0;
      res.forEach((element) => {
        var name = res[index].name;
        if (name != "Thanos") {
          document.getElementById(
            "Avengers"
          ).innerHTML += `<div style="width: 18rem; height:20rem;">
                <img src="${res[index].thumbnail.path}.${res[index].thumbnail.extension}" alt="Card image cap" height="250px" width="200px">
                <div class="card-body">
                  <h5 class="card-title text-light ">${name}</h5>
                </div>
            </div>`;
        }
        index++;
      });
    })
    .catch((error) => {
      console.error(error);
    });
}
