let qrcode = new QRCode("qrcode");

const form = document.getElementById("form");
const input = document.getElementById("input");
const empty = document.getElementById("delete");
const generate = document.getElementById("generate");
const loading = document.getElementById("loading");
const qrdiv = document.getElementById("qrcode");

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
const generateQR = async (url) => {
  let qrcode = await new QRCode("qrcode", {
    text: url,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
};

const checkUrl = (url) => {
  setTimeout(() => {
    qrdiv.classList.remove("hide");
    qrdiv.classList.add("show");

    removeSpinner();
    if (url === "") {
      return (qrdiv.innerHTML = "Please enter your URL");
    }
    if (!isValidUrl(url)) {
      return (qrdiv.innerHTML = "Please enter valid your URL");
    } else {
      clearQR();

      generateQR(url);
      setTimeout(() => {
        const saveUrl = qrdiv.querySelector("img").src;
        saveButton(saveUrl);
      }, 100);
    }
  }, 1000);
};

const clearQR = () => {
  qrdiv.innerHTML = "";
  const saveBtn = document.getElementById("save-btn");
  if (saveBtn) saveBtn.remove();
};

const saveButton = (saveUrl) => {
  const button = document.createElement("a");
  button.id = "save-btn";
  button.classList =
    "h-16 my-12 center w-72 text-[#eee] bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-3xl px-5 py-2.5 text-center mr-2 mb-2 shadow-sm hover:shadow-lg";
  button.href = saveUrl;
  button.download = "QR-code";
  button.innerHTML = "save";
  document.getElementById("qr-container").appendChild(button);
};

const onGenerate = (e) => {
  e.preventDefault();
  //   Clear QR
  qrcode.clear();

  const url = input.value;
  addSpinner();
  //   Add delete button
  empty.classList.remove("hide");
  checkUrl(url);
};

const onDelete = (e) => {
  e.preventDefault();
  input.value = "";
  removeSpinner();
  empty.classList.add("hide");
  qrdiv.classList.remove("show");
  qrdiv.classList.add("hide");
  clearQR();
};

form.addEventListener("submit", onGenerate);
empty.addEventListener("click", onDelete);
