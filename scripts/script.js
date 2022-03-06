// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

///////////////////// Variables
const APIkey = "64c4b9726e7443469cfe5d9d900da10d";
const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

/////////////////// Passing Joke to VoiceRSS API
function tellme(joke) {
  console.log(joke);
  VoiceRSS.speech({
    key: APIkey,
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

/////////////////// Get Jokes from JokeAPI
async function getJokes() {
  let joke = "";
  const apiURL =
    "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";

  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery} ... hahahahahahahaha`;
    } else {
      joke = `${data.joke} ... hahahahahahahahahahaha`;
    }
    // Text-to-Speech
    tellme(joke);
    // Disabe Button
    toggleButton();
  } catch (error) {
    // Catch errors  Here
    console.log("whoops, ", error);
  }
}

///////////////// Event Listeners
button.addEventListener("click", getJokes);

audioElement.addEventListener("ended", toggleButton);
