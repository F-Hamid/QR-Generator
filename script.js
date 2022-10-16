let qrcode = new QRCode("qrcode");

const form = document.getElementById("form");
const input = document.getElementById("input");
const empty = document.getElementById("delete");
const generate = document.getElementById("generate");
const loading = document.getElementById("loading");
const qrdiv = document.getElementById("qrdiv");

const addSpinner = () => {
  generate.classList.remove("show");
  loading.classList.add("show");
  generate.classList.add("hide");
  loading.classList.remove("hide");
};

const removeSpinner = () => {
  generate.classList.remove("hide");
  loading.classList.add("hide");
  generate.classList.add("show");
  loading.classList.remove("show");
};

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

// GenerateQR
const generateQR = (url) => {
  setTimeout(() => {
    let qrcode = new QRCode("qrcode", {
      text: url,
      width: 128,
      height: 128,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });
    qrdiv.classList.remove("hide");
    qrdiv.classList.add("show");
    removeSpinner();
  }, 1000);
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
  addSpinner();
  //   Add delete button
  empty.classList.remove("hide");
  const message = checkUrl(url);
  generateQR(url);
  document.getElementById("tag-id").innerHTML = message;
  console.log(message);
  return url;
};

const onDelete = (e) => {
  e.preventDefault();
  input.value = "";
  removeSpinner();
  empty.classList.add("hide");
  qrdiv.classList.remove("show");
  qrdiv.classList.add("hide");
  qrcode.clear();
};

form.addEventListener("submit", onGenerate);
empty.addEventListener("click", onDelete);
