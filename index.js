const timeoutInput = document.querySelector("#timeoutInput");
const usdInp = document.querySelector("#usdInp");
const eurInp = document.querySelector("#eurInp");
const rubInp = document.querySelector("#rubInp");

// addNewAd
const start = () => {
  const loginUrl = `https://passport.i.ua/login/?acc=1&timeout=${timeoutInput.value}&usd=${usdInp.checked}&eur=${eurInp.checked}&rub=${rubInp.checked}`;
  window.open(loginUrl);
};

const startBtn = document.querySelector("#start");
startBtn.addEventListener("click", start);
