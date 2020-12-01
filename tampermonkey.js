// auth
// ----- for https://passport.i.ua/login/* -----
// TODO localStorage
const auth = () => {
  const loginInput = document.querySelector('input[name="login"]');
  const passwordInput = document.querySelector('input[name="pass"]');
  const enterBtn = document.querySelector('input[value="Войти"]');

  const acc = new URLSearchParams(window.location.search).get("acc");
  switch (acc) {
    case "1":
      loginInput.value = "k.l.i.m";
      passwordInput.value = "worldofwarcraft";
      return;
    case "2":
      loginInput.value = "operta";
      passwordInput.value = "zkk3344";
      return;

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
      return;
    case "11521148":
      acc = 2;
      return;

    default:
      break;
  }

  window.confirm = () => true;

  const delBtns = document.querySelectorAll(".icon.i_delitem");

  const deleteAds = () => {
    for (const btn of delBtns) {
      btn.click();
    }
  };

  if (mode === "deleteAds") {
    if (delBtns.length > 0) {
      deleteAds();
      return;
    } else {
      window.location.replace(`https://finance.i.ua/market/add/?acc=${acc}&adType=1`);
      return;
    }
  }

  if (delBtns.length === 0) {
    window.location.replace(`https://finance.i.ua/market/add/?acc=${acc}&adType=1`);
    return;
  }

  if (delBtns.length > 0 && delBtns.length < 6) {
    const prevPage = document.referrer;
    if (
      prevPage === "https://finance.i.ua/market/kiev/?" ||
      prevPage === "https://finance.i.ua/market/kiev/?mode=deleteAds"
    ) {
      deleteAds();
      return;
    } else {
      window.location.replace(
        `https://finance.i.ua/market/add/?acc=${acc}&adType=${delBtns.length + 1}`
      );
      return;
    }
  }

  if (acc < 2) {
    window.location.replace(`https://passport.i.ua/login/?acc=${acc + 1}`);
    return;
  } else {
    const timeout = localStorage.getItem("timeout");
    setTimeout(deleteAds, timeout ? timeout : 1000 * 60 * 5);
  }
};

window.addEventListener("load", addOrDelete);
// ---------------------------------------------

// create new ads
// ----- for https://finance.i.ua/market/add/* -----
const addNewAd = (acc, adType) => {
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
      return;
    case "1-2":
      sum = 100;
      return;
    case "1-3":
      sum = 100;
      return;
    case "1-4":
      sum = 100;
      return;
    case "1-5":
      sum = 100;
      return;
    case "1-6":
      sum = 100;
      return;
    case "2-1":
      sum = 100;
      return;
    case "2-2":
      sum = 100;
      return;
    case "2-3":
      sum = 100;
      return;
    case "2-4":
      sum = 100;
      return;
    case "2-5":
      sum = 100;
      return;
    case "2-6":
      sum = 100;
      return;

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
      ratio = 28.6;
      return;
    case "2":
      ratio = 28.4;
      return;
    case "3":
      ratio = 34.1;
      return;
    case "4":
      ratio = 33.8;
      return;
    case "5":
      ratio = 0.375;
      return;
    case "6":
      ratio = 0.362;
      return;

    default:
      break;
  }
  document.body.querySelector("#market_record_ratio").value = ratio;

  //район
  let district;
  switch (acc) {
    case "1":
      district = "Минская. Петровка. Оболонь. Дрим таун.";
      return;
    case "2":
      district = "Вокзал, ул.Петлюры";
      return;

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
      return;
    case "2":
      comment = "Меняем Канаду, Франк, Фунт, Злотый. частями. ";
      return;

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
