// // auth
// const auth = async () => {
//   const formData = new FormData();
//   formData.append("login", "k.l.i.m");
//   formData.append("pass", "worldofwarcraft");
//   const response = await fetch("https://passport.i.ua/login/", {
//     method: "POST",
//     body: formData
//   });
//   console.log(response);
// };

// const loginBtn = document.querySelector("#login-btn");
// loginBtn.addEventListener("click", auth);

// console.log(window.location.search);
// const urlParams = new URLSearchParams(window.location.search);
// const adsAmount = urlParams.get("adsAmount");
// console.log(adsAmount);

const logoutBtn = document.querySelector(".ho_popup_menu").lastElementChild.lastElementChild;
logoutBtn.click();

// -----
const userNameMarket = document.querySelector(".user_name").innerText;

const isLesha = userNameMarket === "дядя Леша";
console.log(isLesha);
// -----

const userNameMain = document.querySelector(".first").lastElementChild.lastElementChild.innerText;
console.log(userNameMain);
("ТОлян");
// -----

const tempArr = document.querySelector(".user").getAttribute("href").split("/");
const userId = tempArr[tempArr.length - 2];
console.log(userId);
// -----

// заходим на "https://passport.i.ua/login/?acc=1", входим в нужный акк
// перекидывает в "https://i.ua"
// переходим на "https://finance.i.ua/market/kiev/?mode=deleteAds", удаляем объяву
// перекидывает на "https://finance.i.ua/market/kiev/?",
// смотрим document.refferer, если этот же, то удаляем остальные объявы
// когда объяв === 0, то начинаем создавать, проверяя document.refferer
// когда создали все объявы, то проверяем юзера и
// 1) если не последний, то переходим в "https://passport.i.ua/login/?acc=${nextUser}"
// 2) если последний, то ждем нужное время и после этого переходим на "https://passport.i.ua/login/?acc=1"
