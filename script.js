const form = document.getElementById("form");
const input = document.getElementById("input");
const empty = document.getElementById("delete");

const isValidUrl = (urlString) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};

const checkUrl = (url) => {
  if (url === "") {
    return "Please enter your URL";
  }
  if (!isValidUrl(url)) {
    return "Please enter a valid URL";
  } else {
    return "Success";
  }
};

const onGenerate = (e) => {
  e.preventDefault();
  const url = input.value;
  checkUrl(url);
  console.log(checkUrl(url));
};

const onDelete = (e) => {
  e.preventDefault();
  input.value = "";
};

form.addEventListener("submit", onGenerate);
empty.addEventListener("click", onDelete);
