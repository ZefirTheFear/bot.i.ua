// auth
// ----- for https://passport.i.ua/login/* -----
const auth = () => {
  const deleteCookie = (cookieName) => {
    document.cookie = `${cookieName}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=i.ua`;
  };

  deleteCookie("adType1");
  deleteCookie("adType2");
  deleteCookie("adType3");
  deleteCookie("adType4");
  deleteCookie("adType5");
  deleteCookie("adType6");

  const loginInput = document.querySelector('input[name="login"]');
  const passwordInput = document.querySelector('input[name="pass"]');
  const enterBtn = document.querySelector('input[value="Войти"]');

  const timeout = new URLSearchParams(window.location.search).get("timeout");
  const usd = new URLSearchParams(window.location.search).get("usd");
  const eur = new URLSearchParams(window.location.search).get("eur");
  const rub = new URLSearchParams(window.location.search).get("rub");

  let temp = 1;
  if (usd === "true") {
    document.cookie = `adType${temp}=1;path=/;domain=i.ua`;
    temp += 1;
    document.cookie = `adType${temp}=2;path=/;domain=i.ua`;
    temp += 1;
  }
  if (eur === "true") {
    document.cookie = `adType${temp}=3;path=/;domain=i.ua`;
    temp += 1;
    document.cookie = `adType${temp}=4;path=/;domain=i.ua`;
    temp += 1;
  }
  if (rub === "true") {
    document.cookie = `adType${temp}=5;path=/;domain=i.ua`;
    temp += 1;
    document.cookie = `adType${temp}=6;path=/;domain=i.ua`;
    temp += 1;
  }

  document.cookie = `cleaningTimeout=${timeout};path=/;domain=i.ua`;
  document.cookie = `isUsdNeeded=${usd};path=/;domain=i.ua`;
  document.cookie = `isEurNeeded=${eur};path=/;domain=i.ua`;
  document.cookie = `isRubNeeded=${rub};path=/;domain=i.ua`;

  const acc = new URLSearchParams(window.location.search).get("acc");
  switch (acc) {
    case "1":
      loginInput.value = "k.l.i.m";
      passwordInput.value = "worldofwarcraft";
      break;
    case "2":
      loginInput.value = "operta";
      passwordInput.value = "zkk3344";
      break;

    default:
      break;
  }

  enterBtn.click();
};

window.addEventListener("load", auth);
// ---------------------------------------------

// main
// ----- for https://www.i.ua/* -----
const deleteOldAds = () => {
  window.location.replace("https://finance.i.ua/market/kiev/?mode=deleteAds");
};

window.addEventListener("load", deleteOldAds);
// ----------------------------------

// add new ad or delete ads
// ----- for https://finance.i.ua/market/kiev/* -----
const addOrDelete = () => {
  const mode = new URLSearchParams(window.location.search).get("mode");

  const tempArr = document.querySelector(".user").getAttribute("href").split("/");
  const userId = tempArr[tempArr.length - 2];
  let acc;
  switch (userId) {
    case "345609":
      acc = 1;
      break;
    case "11521148":
      acc = 2;
      break;

    default:
      break;
  }

  const getCookie = (cookieName) => {
    const results = document.cookie.match("(^|;) ?" + cookieName + "=([^;]*)(;|$)");
    if (results) return unescape(results[2]);
    else return null;
  };

  const cleaningTimeout = getCookie("cleaningTimeout");

  let maxAdsAmount = 0;
  const isUsdNeeded = getCookie("isUsdNeeded");
  const isEurNeeded = getCookie("isEurNeeded");
  const isRubNeeded = getCookie("isRubNeeded");
  if (isUsdNeeded === "true") {
    maxAdsAmount += 2;
  }
  if (isEurNeeded === "true") {
    maxAdsAmount += 2;
  }
  if (isRubNeeded === "true") {
    maxAdsAmount += 2;
  }

  window.confirm = () => true;

  const delBtns = document.querySelectorAll(".icon.i_delitem");

  const deleteAds = () => {
    for (const btn of delBtns) {
      btn.click();
    }
  };

  const firstAdType = getCookie("adType1");
  const nextAdType = getCookie(`adType${delBtns.length + 1}`);

  if (mode === "deleteAds") {
    if (delBtns.length > 0) {
      deleteAds();
      return;
    } else {
      window.location.replace(`https://finance.i.ua/market/add/?acc=${acc}&adType=${firstAdType}`);
      return;
    }
  }

  if (delBtns.length === 0) {
    window.location.replace(`https://finance.i.ua/market/add/?acc=${acc}&adType=${firstAdType}`);
    return;
  }

  if (delBtns.length > 0 && delBtns.length < maxAdsAmount) {
    const prevPage = document.referrer;
    if (
      prevPage === "https://finance.i.ua/market/kiev/?" ||
      prevPage === "https://finance.i.ua/market/kiev/?mode=deleteAds"
    ) {
      deleteAds();
      return;
    } else {
      window.location.replace(`https://finance.i.ua/market/add/?acc=${acc}&adType=${nextAdType}`);
      return;
    }
  }

  if (acc < 2) {
    window.location.replace(
      `https://passport.i.ua/login/?acc=${
        acc + 1
      }&timeout=${cleaningTimeout}&usd=${isUsdNeeded}&eur=${isEurNeeded}&rub=${isRubNeeded}`
    );
    return;
  } else {
    const newСycle = () =>
      window.location.replace(
        `https://passport.i.ua/login/?acc=1&timeout=${cleaningTimeout}&usd=${isUsdNeeded}&eur=${isEurNeeded}&rub=${isRubNeeded}`
      );
    setTimeout(newСycle, 1000 * cleaningTimeout);
  }
};

window.addEventListener("load", addOrDelete);
// ---------------------------------------------

// create new ads
// ----- for https://finance.i.ua/market/add/* -----

const addNewAd = async (acc, adType) => {
  let rates;
  const getRates = async () => {
    try {
      const response = await fetch(
        `https://exchange-currencies-obolon.firebaseio.com/currencies.json`
      );
      if (response.status !== 200) {
        return console.log("не могу запросить курсы. ёбаный firebase");
      }
      const resData = await response.json();
      rates = resData.rates.opt;
    } catch (error) {
      return console.log("не могу запросить курсы. ёбаный firebase");
    }
  };

  await getRates();
  console.log(rates);

  // тип операции
  if (adType === "1" || adType === "3" || adType === "5") {
    document.body
      .querySelector("#market_record_record_type")
      .querySelector('option[value="2"]').selected = true;
  } else {
    document.body
      .querySelector("#market_record_record_type")
      .querySelector('option[value="1"]').selected = true;
  }

  // сумма
  let sum;
  switch (acc + "-" + adType) {
    case "1-1":
      sum = 100;
      break;
    case "1-2":
      sum = 100;
      break;
    case "1-3":
      sum = 100;
      break;
    case "1-4":
      sum = 100;
      break;
    case "1-5":
      sum = 100;
      break;
    case "1-6":
      sum = 100;
      break;
    case "2-1":
      sum = 100;
      break;
    case "2-2":
      sum = 100;
      break;
    case "2-3":
      sum = 100;
      break;
    case "2-4":
      sum = 100;
      break;
    case "2-5":
      sum = 100;
      break;
    case "2-6":
      sum = 100;
      break;

    default:
      break;
  }
  document.body.querySelector("#market_record_amount").value = sum;

  // валюта
  let currency;
  if (adType === "1" || adType === "2") {
    currency = 840;
  } else if (adType === "3" || adType === "4") {
    currency = 978;
  } else if (adType === "5" || adType === "6") {
    currency = 643;
  }
  document.body
    .querySelector("#market_record_currency_id")
    .querySelector(`option[value="${currency}"]`).selected = true;

  // курс
  let ratio;
  // тут будет запрос
  switch (adType) {
    case "1":
      // ratio = 28.6;
      ratio = rates.usd.sell;
      break;
    case "2":
      // ratio = 28.4;
      ratio = rates.usd.buy;
      break;
    case "3":
      // ratio = 34.1;
      ratio = rates.eur.sell;
      break;
    case "4":
      // ratio = 33.8;
      ratio = rates.eur.buy;
      break;
    case "5":
      // ratio = 0.375;
      ratio = rates.rub.sell;
      break;
    case "6":
      // ratio = 0.362;
      ratio = rates.rub.buy;
      break;

    default:
      break;
  }
  document.body.querySelector("#market_record_ratio").value = ratio;

  //район
  let district;
  switch (acc) {
    case "1":
      district = "Минская. Петровка. Оболонь. Дрим таун.";
      break;
    case "2":
      district = "Вокзал, ул.Петлюры";
      break;

    default:
      break;
  }
  document.body.querySelector("#market_record_district").value = district;

  //город
  document.body
    .querySelector("#market_record_location_id")
    .querySelector('option[value="12706"]').selected = true;
  // .querySelector('option[value="10101"]').selected = true;

  //комментарий
  let comment;
  switch (acc) {
    case "1":
      comment = "частями. Меняем Канаду, Франк, Фунт, Злотый";
      break;
    case "2":
      comment = "Меняем Канаду, Франк, Фунт, Злотый. частями. ";
      break;

    default:
      break;
  }
  document.body.querySelector("#market_record_comment").value = comment;

  // актуально до
  document.body.querySelector("#market_record_valid_until").lastElementChild.selected = true;

  // сохранить
  document.body.querySelector('input[type="submit"]').click();
};

const createNewAd = () => {
  const acc = new URLSearchParams(window.location.search).get("acc");
  const adType = new URLSearchParams(window.location.search).get("adType");
  addNewAd(acc, adType);
};

window.addEventListener("load", createNewAd);
// -------------------------------------------------
