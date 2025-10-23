// import Items from "./src/js/Items";
// import roundGame from "./src/js/RoundGame";
"use strict";
const maps = [
  { id: "map-1", map: "map-1" },
  { id: "map-2", map: "map-2" },
  { id: "map-3", map: "map-3" },
  { id: "map-3", map: "map-3" },
];
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const app = $("#app");
const container = $(".container");
const html = ` <div class="container">
<audio id="audio" src=""></audio>
<audio id="boom" src="./src/public/sounds/boom.mp3"></audio>
<audio id="status" src=""></audio>
<header class="header">
  <div class="header__left">
    <div class="header__money">
      <span class="header__money-title">Tiền:</span>
      <span class="header__number">0</span>
    </div>
    <div class="header__target">
      <span class="header__target-title">Mục tiêu:</span>
      <span class="header__target-number">$650</span>
    </div>
  </div>
  <div class="player">
    <img
      src="./src/public/images/background_out.png"
      alt=""
      class="player__bg"
    />
    <img
      src="./src/public/images/player_out.png"
      alt=""
      class="player__img"
    />
    <div class="items"></div>
  </div>

  <div class="header__right">
    <button class="header__exit">Exit</button>
    <div class="header__right-wrapper">
      <div class="header__time">
        <span class="header__time-title">Thời Gian:</span>
        <span class="header__time-number">60</span>
      </div>
      <div class="header__level">
        <span class="header__level-title">Cấp Độ:</span>
        <span class="header__level-number">1</span>
      </div>
    </div>
  </div>
  <div class="hook-wire">
    <img src="./src/public/images/moc_out.png" alt="" class="hook" />
  </div>
  <span class="header__stength">STRENGTH</span>
  <span class="header__bonus">$</span>
</header>
<div class="start-line"></div>
<div class="map">
  <div class="background">
    <!-- <div class="myElement gold-1"></div>
  <div class="myElement gold-1"></div>
  <div class="myElement gold-1"></div>
  <div class="myElement gold-1"></div>
  
  <div class="myElement stone-1"></div>
  <div class="myElement stone-1"></div>
  <div class="myElement stone-1"></div>
  <div class="myElement stone-2"></div>
  <div class="myElement gold-2"></div>
  <div class="myElement gold-3"></div>
  <div class="myElement gold-3"></div>
  <div class="myElement mystery-bag"></div>
  <div class="myElement mystery-bag"></div>
  <div class="myElement mystery-bag"></div> -->
    <!-- <div class="myElement mystery-bag"></div> -->
    <div class="myElement pig"></div>
    <div class="myElement pig"></div>
    <div class="myElement pig"></div>
    <!-- <div class="myElement diamond"></div> -->
  </div>
</div>
<div class="start">
  <div class="miner">
    <div class="gold-blur"></div>
    <div class="gold"></div>
    <div class="play">Chơi</div>
  </div>
  <div class="guide"></div>
</div>
</div>
<div class="show">
<div class="show__target">
  <h3 class="show__target-title">Mục tiêu của bạn là</h3>
  <span class="show__target-number"> $650 </span>
</div>
</div>
<div class="store">
<div class="store__container">
  <div class="title">
    <div class="title__text"></div>
    <div>
      <a href="#" class="title__next-game">Chơi tiếp</a>
    </div>
  </div>
  <div class="main">
    <div class="store__list">
      <div class="store__list-wrapper"></div>
      <div class="trader">
        <div class="trader__chat">
          <p class="trader__chat-text">
            Click vào vật phẩm mà bạn muốn mua. Click vào chơi tiếp khi
            bạn đã sẵn sàng.
          </p>
        </div>
      </div>
    </div>
    <div class="store__table">
      <p class="store__table-info"></p>
    </div>
  </div>
</div>
</div>`;
const render = (item) => {
  app.innerHTML = item;
};
// render(html);

const hookWire = $(".hook-wire");
const handleHook = $(".hook");
const moneyContainer = $(".header__number");
const mapMiner = $(".background");
const audio = $("#audio");
const boomAudio = $("#boom");
const statusAudio = $("#status");
const timeSet = $(".header__time-number");
const levelNumber = $(".header__level-number");
const itemContainer = $(".items");
const bonus = $(".header__bonus");
const startGame = $(".start");
const playGame = $(".play");
const showLevel = $(".show");
const notfiy = $(".show__target h3");
const showTarget = $(".show__target-number");
const exitBtn = $(".header__exit");
const store = $(".store");
const nextGamebtn = $(".title__next-game");
const trader = $(".trader");
const targetNumber = $(".header__target-number");
const strengthNotify = $(".header__stength");
const maxMysteryBag = 3;
const minMysteryBag = 1;
const storeList = $(".store__list-wrapper");
const inStock = 3;
const itemStoreInfo = $(".store__table-info");
let _This;
const player = $(".player__img");
let roundGame = [];
const maxMap = 800;
document.addEventListener("DOMContentLoaded", () => {
  roundGame = [
    [],
    [
      {
        id: "r-stone",
        top: 27,
        left: 74,
        class: "stone-2",
      },
      {
        id: "r-stone",
        top: 25,
        left: 20,
        class: "stone-2",
      },
      {
        id: "t-stone",
        top: 56,
        left: 61,
        class: "stone-1",
      },
      {
        id: "t-stone",
        top: 76,
        left: 47,
        class: "stone-1",
      },
      {
        id: "l-gold",
        top: 52,
        left: 19,
        class: "gold-4",
      },
      {
        id: "l-gold",
        top: 65,
        left: 53,
        class: "gold-4",
      },
      {
        id: "sm-gold",
        top: 30,
        left: 58,
        class: "gold-2",
      },
      {
        id: "sm-gold",
        top: 72,
        left: 86,
        class: "gold-2",
      },
      {
        id: "sm-gold",
        top: 82,
        left: 20,
        class: "gold-2",
      },
      {
        id: "mystery-bag",
        top: 25,
        left: 13,
        class: "mystery-bag",
      },
      {
        id: "mystery-bag",
        top: 39,
        left: 70,
        class: "mystery-bag",
      },
      {
        id: "s-gold",
        top: 34,
        left: 74,
        class: "gold-1",
      },
      {
        id: "s-gold",
        top: 36,
        left: 66,
        class: "gold-1",
      },
      {
        id: "s-gold",
        top: 38,
        left: 25,
        class: "gold-1",
      },
      {
        id: "s-gold",
        top: 51,
        left: 32,
        class: "gold-1",
      },
      {
        map: "map-1",
      },
    ],
    [
      {
        id: "sm-gold",
        top: 75,
        left: 79,
        class: "gold-2",
      },
      {
        id: "sm-gold",
        top: 57,
        left: 64,
        class: "gold-2",
      },
      {
        id: "sm-gold",
        top: 34,
        left: 7,
        class: "gold-2",
      },
      {
        id: "s-gold",
        top: 25,
        left: 73,
        class: "gold-1",
      },
      {
        id: "s-gold",
        top: 44,
        left: 78,
        class: "gold-1",
      },
      {
        id: "s-gold",
        top: 27,
        left: 59,
        class: "gold-1",
      },
      {
        id: "s-gold",
        top: 39,
        left: 61,
        class: "gold-1",
      },
      {
        id: "s-gold",
        top: 53,
        left: 33,
        class: "gold-1",
      },
      {
        id: "s-gold",
        top: 36,
        left: 13,
        class: "gold-1",
      },
      {
        id: "l-gold",
        top: 78,
        left: 27,
        class: "gold-4",
      },
      {
        id: "l-gold",
        top: 72,
        left: 9,
        class: "gold-4",
      },
      {
        id: "r-stone",
        top: 66,
        left: 20,
        class: "stone-2",
      },
      {
        id: "r-stone",
        top: 64,
        left: 37,
        class: "stone-2",
      },
      {
        id: "r-stone",
        top: 28,
        left: 64,
        class: "stone-2",
      },
      {
        id: "t-stone",
        top: 38,
        left: 15,
        class: "stone-1",
      },
      {
        id: "t-stone",
        top: 58,
        left: 7,
        class: "stone-1",
      },
      {
        id: "t-stone",
        top: 56,
        left: 26,
        class: "stone-1",
      },
      {
        id: "t-stone",
        top: 68,
        left: 52,
        class: "stone-1",
      },
      {
        map: "map-2",
      },
    ],
    [
      {
        id: "l-gold",
        top: 63,
        left: 1,
        class: "gold-4",
      },
      {
        id: "s-gold",
        top: 24,
        left: 24,
        class: "gold-1",
      },
      {
        id: "s-gold",
        top: 22,
        left: 18,
        class: "gold-1",
      },
      {
        id: "s-gold",
        top: 30,
        left: 18,
        class: "gold-1",
      },
      {
        id: "s-gold",
        top: 41,
        left: 61,
        class: "gold-1",
      },
      {
        id: "sm-gold",
        top: 49,
        left: 15,
        class: "gold-2",
      },
      {
        id: "sm-gold",
        top: 55,
        left: 68,
        class: "gold-2",
      },
      {
        id: "s-gold",
        top: 41,
        left: 81,
        class: "gold-2",
      },
      {
        id: "r-stone",
        top: 67,
        left: 66,
        class: "stone-2",
      },
      {
        id: "r-stone",
        top: 48,
        left: 46,
        class: "stone-2",
      },
      {
        id: "r-stone",
        top: 41,
        left: 39,
        class: "stone-2",
      },
      {
        id: "t-stone",
        top: 56,
        left: 75,
        class: "stone-1",
      },
      {
        id: "t-stone",
        top: 45,
        left: 74,
        class: "stone-1",
      },
      {
        id: "t-stone",
        top: 55,
        left: 59,
        class: "stone-1",
      },
      {
        id: "t-stone",
        top: 58,
        left: 21,
        class: "stone-1",
      },
      {
        id: "diamond",
        top: 66,
        left: 72,
        class: "diamond",
      },
      {
        id: "mystery-bag",
        top: 51,
        left: 53,
        class: "mystery-bag",
      },

      {
        map: "map-2",
      },
    ],
    [
      {
        id: "mystery-bag",
        top: 68,
        left: 44,
        class: "mystery-bag",
      },
      {
        id: "mystery-bag",
        top: 49,
        left: 26,
        class: "mystery-bag",
      },
      {
        id: "mystery-bag",
        top: 40,
        left: 73,
        class: "mystery-bag",
      },
      {
        id: "mystery-bag",
        top: 53,
        left: 65,
        class: "mystery-bag",
      },
      {
        id: "m-gold",
        top: 71,
        left: 54,
        class: "gold-3",
      },
      {
        id: "m-gold",
        top: 67,
        left: 30,
        class: "gold-3",
      },
      {
        id: "t-stone",
        top: 76,
        left: 21,
        class: "stone-1",
      },
      {
        id: "t-stone",
        top: 34,
        left: 78,
        class: "stone-1",
      },
      {
        id: "t-stone",
        top: 32,
        left: 24,
        class: "stone-1",
      },
      {
        id: "r-stone",
        top: 56,
        left: 58,
        class: "stone-2",
      },
      {
        id: "sm-gold",
        top: 49,
        left: 57,
        class: "gold-2",
      },
      {
        id: "s-gold",
        top: 27,
        left: 22,
        class: "gold-1",
      },
      {
        id: "s-gold",
        top: 39,
        left: 68,
        class: "gold-1",
      },
      {
        id: "s-gold",
        top: 33,
        left: 66,
        class: "gold-1",
      },
      {
        id: "pig",
        top: 55,
        left: 60,
        itemScaleX: true,
        class: "pig",
        start: maxMap * 0.1,
        end: maxMap * 0.8,
      },
      {
        id: "pig",
        top: 48,
        left: 68,
        itemScaleX: false,
        class: "pig",
        start: maxMap * 0.4,
        end: maxMap,
      },
      {
        id: "pig",
        top: 36,
        left: 27,
        itemScaleX: true,
        class: "pig",
        start: maxMap * 0.1,
        end: maxMap * 0.5,
      },
      {
        map: "map-1",
      },
    ],
    [
      {
        id: "l-gold",
        top: 71,
        left: 0,
        class: "gold-4",
      },
      {
        id: "l-gold",
        top: 63,
        left: 89,
        class: "gold-4",
      },
      {
        id: "m-gold",
        top: 76,
        left: 29,
        class: "gold-3",
      },
      {
        id: "m-gold",
        top: 71,
        left: 52,
        class: "gold-3",
      },
      {
        id: "sm-gold",
        top: 48,
        left: 37,
        class: "gold-2",
      },
      {
        id: "sm-gold",
        top: 36,
        left: 76,
        class: "gold-2",
      },
      {
        id: "s-gold",
        top: 25,
        left: 22,
        class: "gold-1",
      },
      {
        id: "s-gold",
        top: 28,
        left: 29,
        class: "gold-1",
      },
      {
        id: "s-gold",
        top: 69,
        left: 22,
        class: "gold-1",
      },
      {
        id: "s-gold",
        top: 57,
        left: 57,
        class: "gold-1",
      },
      {
        id: "diamond",
        top: 73,
        left: 13,
        class: "diamond",
      },
      {
        id: "diamond",
        top: 67,
        left: 81,
        class: "diamond",
      },
      {
        id: "diamond",
        top: 79,
        left: 70,
        class: "diamond",
      },
      {
        id: "mystery-bag",
        top: 74,
        left: 62,
        class: "mystery-bag",
      },
      {
        id: "r-stone",
        top: 56,
        left: 50,
        class: "stone-2",
      },
      {
        id: "t-stone",
        top: 31,
        left: 22,
        class: "stone-1",
      },
      {
        id: "t-stone",
        top: 55,
        left: 32,
        class: "stone-1",
      },
      {
        id: "t-stone",
        top: 42,
        left: 69,
        class: "stone-1",
      },
      {
        id: "pig",
        top: 62,
        left: 28,
        itemScaleX: true,
        class: "pig",
        start: maxMap * 0.1,
        end: maxMap * 0.5,
      },
      {
        id: "pig",
        top: 58,
        left: 40,
        itemScaleX: false,
        class: "pig",
        start: maxMap,
        end: maxMap * 0.5,
      },
      {
        id: "pig",
        top: 43,
        left: 60,
        itemScaleX: true,
        class: "pig",
        start: maxMap * 0.1,
        end: maxMap * 0.6,
      },
      {
        map: "map-3",
      },
    ],
    [
      {
        id: "l-gold",
        top: 79,
        left: 38,
        class: "gold-4",
      },
      {
        id: "sm-gold",
        top: 70,
        left: 8,
        class: "gold-2",
      },
      {
        id: "sm-gold",
        top: 80,
        left: 19,
        class: "gold-2",
      },
      {
        id: "sm-gold",
        top: 84,
        left: 63,
        class: "gold-2",
      },
      {
        id: "s-gold",
        top: 63,
        left: 25,
        class: "gold-1",
      },
      {
        id: "s-gold",
        top: 78,
        left: 34,
        class: "gold-1",
      },
      {
        id: "s-gold",
        top: 57,
        left: 55,
        class: "gold-1",
      },
      {
        id: "s-gold",
        top: 63,
        left: 71,
        class: "gold-1",
      },
      {
        id: "s-gold",
        top: 60,
        left: 74,
        class: "gold-1",
      },
      {
        id: "s-gold",
        top: 77,
        left: 74,
        class: "gold-1",
      },
      {
        id: "s-gold",
        top: 70,
        left: 82,
        class: "gold-1",
      },
      {
        id: "diamondPig",
        top: 68,
        left: 32,
        itemScaleX: false,
        class: "pig d-pig",
        start: maxMap * 0.6,
        end: 0,
      },
      {
        id: "diamondPig",
        top: 37,
        left: 50,
        itemScaleX: true,
        class: "pig d-pig",
        start: maxMap * 0,
        end: maxMap * 0.5,
      },
      {
        id: "diamondPig",
        top: 35,
        left: 56,
        itemScaleX: false,
        class: "pig d-pig",
        start: maxMap,
        end: maxMap * 0.5,
      },
      {
        id: "diamondPig",
        top: 45,
        left: 76,
        itemScaleX: true,
        class: "pig d-pig",
        start: maxMap * 0.4,
        end: maxMap * 0.9,
      },
      {
        id: "t-stone",
        top: 30,
        left: 12,
        class: "stone-1",
      },
      {
        id: "t-stone",
        top: 52,
        left: 48,
        class: "stone-1",
      },
      {
        id: "t-stone",
        top: 57,
        left: 86,
        class: "stone-1",
      },
      {
        id: "r-stone",
        top: 58,
        left: 20,
        class: "stone-2",
      },
      {
        id: "r-stone",
        top: 35,
        left: 36,
        class: "stone-2",
      },
      {
        id: "r-stone",
        top: 31,
        left: 69,
        class: "stone-2",
      },
      {
        id: "mystery-bag",
        top: 68,
        left: 76,
        class: "mystery-bag",
      },
      {
        map: "map-4",
      },
    ],
    [
      {
        id: "tnt_barrel",
        top: 61,
        left: 58,
        class: "tnt_barrel",
      },
      {
        id: "tnt_barrel",
        top: 61,
        left: 37,
        class: "tnt_barrel",
      },
      {
        id: "l-gold",
        top: 71,
        left: 25,
        class: "gold-4",
      },
      {
        id: "l-gold",
        top: 78,
        left: 45,
        class: "gold-4",
      },
      {
        id: "l-gold",
        top: 71,
        left: 64,
        class: "gold-4",
      },
      {
        id: "mystery-bag",
        top: 40,
        left: 71,
        class: "mystery-bag",
      },
      {
        id: "bone",
        top: 37,
        left: 67,
        class: "bone",
      },
      {
        id: "skull",
        top: 40,
        left: 65,
        class: "skull",
      },
      {
        id: "skull",
        top: 45,
        left: 24,
        class: "skull",
      },
      {
        id: "m-gold",
        top: 24,
        left: 10,
        class: "gold-3",
      },
      {
        id: "m-gold",
        top: 32,
        left: 83,
        class: "gold-3",
      },
      {
        id: "s-gold",
        top: 38,
        left: 17,
        class: "gold-1",
      },
      {
        id: "s-gold",
        top: 34,
        left: 49,
        class: "gold-1",
      },
      {
        id: "pig",
        top: 60,
        left: 63,
        itemScaleX: false,
        class: "pig",
        start: maxMap * 0.1,
        end: maxMap * 0.5,
      },
      {
        id: "pig",
        top: 29,
        left: 70,
        itemScaleX: true,
        class: "pig",
        start: maxMap * 0.5,
        end: maxMap,
      },
      {
        id: "pig",
        top: 44,
        left: 61,
        itemScaleX: true,
        class: "pig",
        start: maxMap * 0.4,
        end: maxMap * 0.8,
      },
      {
        id: "pig",
        top: 56,
        left: 45,
        itemScaleX: true,
        class: "pig",
        start: maxMap * 0.018,
        end: maxMap * 0.5,
      },
      {
        id: "pig",
        top: 60,
        left: 64,
        itemScaleX: false,
        class: "pig",
        start: maxMap * 0.9,
        end: maxMap * 0.6,
      },
      {
        id: "pig",
        top: 45,
        left: 36,
        itemScaleX: false,
        class: "pig",
        start: maxMap * 0.024,
        end: maxMap * 0.5,
      },
      {
        map: "map-3",
      },
    ],
    [
      {
        map: "map-4",
      },
    ],
  ];
});
const elements = $$(".myElement");
for (const element of elements) {
  element.addEventListener("mousedown", (e) => {
    const startX = e.clientX - element.getBoundingClientRect().left;
    const startY = e.clientY - element.getBoundingClientRect().top;

    const moveHandler = (e) => {
      const newLeft = e.clientX - startX;
      const newTop = e.clientY - startY;

      element.style.left = `${newLeft}px`;
      element.style.top = `${newTop}px`;
    };

    const upHandler = () => {
      // Gỡ bỏ các sự kiện khi di chuyển đã kết thúc
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", upHandler);

      // Trả về top và left của phần tử sau khi di chuyển
      const mapPositon = mapMiner.getBoundingClientRect();
      const rect = element.getBoundingClientRect();
      // const mapTopCorrect = rect.top - mapPositon.top;

      // Tính toán vị trị đúng của map
      const top = ((rect.top - mapPositon.top) / mapPositon.height) * 100;
      const left = ((rect.left - mapPositon.left) / mapPositon.width) * 100;

      element.style.top = `${top}%`;
      element.style.left = `${left}%`;
      console.log(`Top: ${top}%`);
      console.log(`Left: ${left}%`);
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", upHandler);
  });
}

class GoldMiner {
  money = 0;
  target = 650;
  isBuy = false;
  isDrop = false;
  pullTime = 2000;
  isPull = false;
  isPullUp = false;
  mapWidth = mapMiner.offsetWidth;
  mapHeight = mapMiner.offsetHeight;
  level = 1;
  smallGold = 50;
  smallMediumGold = 100;
  mediumGold = 250;
  largeGold = 500;
  diamond = 600;
  pig = 2;
  diamondPig = this.diamond + this.pig;
  bone = 2;
  skull = 20;
  roundStone = 11;
  triagleStone = 20;
  TNT = 5;
  TNTBarrel = 1;
  isClover = false;
  isEnegryDrink = false;
  isStoneBook = false;
  isPolishWater = false;
  isNextRound = false;
  pullUp;
  shootEnd;
  shoot;
  dropHook;
  currentMoney = 0;
  stopTime;
  shootCancel;
  handleFinishPull;
  hook;
  itemStore = [
    {
      name: "tnt",
      desc: `Khi bạn kéo 1 vật gì đó bằng móc lên, có thể nhấn phím mũi
       tên lên để ném thuốc nổ vào để phá hủy ngay lập tức`,
    },
    {
      name: "enegry",
      desc: `Nước tăng lực, khi có nó, người thợ mỏ sẽ làm việc nhanh hơn trong cấp độ kế tiếp.
      Đồ uống này chỉ tác dụng trong một cấp độ.`,
    },
    {
      name: "clover",
      desc: `Nó sẽ làm tăng giá cơ hội nhận được 
      những món đồ tốt trong cấp kế tiếp Nó chỉ có
      hiệu lực trong 1 cấp độ.`,
    },
    {
      name: "stone-book",
      desc: `Quyển sách sẽ nâng giá trị của đá lên 
      trong cấp độ kế tiếp. Nó chỉ có hiệu lực trong
     1 cấp độ.`,
    },
    {
      name: "polish",
      desc: `Kim cương sẽ mang lại nhiều giá trị 
      hơn. Nó chỉ có hiệu lực trong 1 cấp độ.`,
    },
  ];
  playerSrc = "./src/public/images/player_out.png";
  hookSrc = "./src/public/images/moc_out.png";
  Items = [
    {
      id: "r-stone",
      img: "gapda_2",
      size: "r-stone",
      time: 3000,
      bonus: this.roundStone,
    },
    {
      id: "t-stone",
      img: "gapda_1",
      size: "t-stone",
      time: 5000,
      bonus: this.triagleStone,
    },
    {
      id: "l-gold",
      img: "gapvang_1",
      size: "l-gold",
      time: 7000,
      bonus: this.largeGold,
    },
    {
      id: "m-gold",
      img: "gapvang_2",
      size: "m-gold",
      time: 4000,
      bonus: this.mediumGold,
    },
    {
      id: "sm-gold",
      img: "gapvang_3",
      size: "sm-gold",
      time: 1500,
      bonus: this.smallMediumGold,
    },
    {
      id: "s-gold",
      img: "gapvang_3",
      size: "s-gold",
      time: 1000,
      bonus: this.smallGold,
    },
    {
      id: "mystery-bag",
      img: "gapMysteryBag",
      size: "m-bag",
      time: 1000,
    },
    {
      id: "diamond",
      img: "pullDiamond",
      size: "dia",
      time: 1000,
      bonus: this.diamond,
    },
    {
      id: "pig",
      img: "pullPig",
      size: "p-pig",
      time: 1000,
      bonus: this.pig,
    },
    {
      id: "diamondPig",
      img: "pullDiamondPig",
      size: "p-dpig",
      time: 1000,
      bonus: this.diamondPig,
    },
    {
      id: "tnt_barrel",
      img: "gapTntVo",
      size: "tnt-barrel",
      time: 1000,
      bonus: this.TNTBarrel,
    },
    {
      id: "skull",
      img: "pullSkull",
      size: "p-skull",
      time: 1000,
      bonus: this.skull,
    },
    {
      id: "bone",
      img: "pullbone",
      size: "p-bone",
      time: 1000,
      bonus: this.bone,
    },
  ];
  mysteryBagValue = {
    maxMoney: 800,
    minMoney: 11,
    getMoney() {
      return (
        Math.floor(Math.random() * (this.maxMoney - this.minMoney) + 1) +
        this.minMoney
      );
    },
    getEnegryDrink() {
      _This.getMysteryBag("isEnegryDrink");
    },
    getTnt() {
      _This.getMysteryBag("TNT");
    },
  };
  pullItemFinish;
  plusMoneyTimeOut;
  playGame;
  constructor() {}
  getItemByName(element) {
    const typeItem = this.getSecondClassName(element);
    return this.itemStore.find((item) => {
      return item.name === typeItem;
    });
  }
  getCost() {
    const maxItemStoreCost = this.level <= 6 ? 150 : 300;
    const minItemStoreCost = 11;
    return (
      Math.floor(Math.random() * (maxItemStoreCost - minItemStoreCost) + 1) +
      minItemStoreCost
    );
  }
  getOutOfStock() {
    return Math.floor(Math.random() * inStock);
  }
  loadItemStore() {
    const isShow = 2;
    let isStoreEmpty = true;
    storeList.innerHTML = this.itemStore
      .map((item) => {
        const checkGoods = this.getOutOfStock();
        const cost = this.getCost();
        if (checkGoods === isShow) isStoreEmpty = false;

        return `<div class="store__list-item ${item.name} ${
          checkGoods < isShow ? "hidden-item" : ""
        }">
          <span class="store__list-item-price">
            $${cost}
          </span>
      </div>`;
      })
      .join("");

    if (isStoreEmpty) {
      const randomItemIndex = Math.floor(Math.random() * this.itemStore.length);
      const itemRandom = this.itemStore[randomItemIndex];
      const itemRandomCost = this.getCost();

      storeList.innerHTML = this.itemStore
        .map((item, index) => {
          return `<div class="store__list-item ${
            index === randomItemIndex ? `${itemRandom.name}` : ""
          }  ${index !== randomItemIndex ? `hidden-item` : ""}">
        <span class="store__list-item-price">
          ${index === randomItemIndex ? `$${itemRandomCost}` : ""}
        </span>
        </div>`;
        })
        .join("");
    }
  }
  setTnt() {
    this.TNT = this.TNT < 5 ? ++this.TNT : this.TNT;
  }
  setEnegry() {
    this.isEnegryDrink = true;
  }
  setClover() {
    this.isClover = true;
  }
  setStoneBook() {
    this.isStoneBook = true;
  }
  setPolish() {
    this.isPolishWater = true;
  }
  resetStore() {
    this.isEnegryDrink = false;
    this.isClover = false;
    this.isStoneBook = false;
    this.isPolishWater = false;
  }
  loadTnt() {
    let html = ``;
    for (let i = 1; i <= this.TNT; i++) {
      html += `<span class="gunpowder"></span>`;
    }
    itemContainer.innerHTML = html;
  }
  getMysteryBag(item) {
    if (item === "isEnegryDrink") {
      this.isEnegryDrink = true;
    } else {
      this.setTnt();
    }
  }
  setDrop(isDrop) {
    this.isDrop = isDrop;
  }
  setPullTime(time) {
    this.pullTime = this.isEnegryDrink ? time / 2 : time;
  }
  getRandomMysteryItem() {
    return (
      Math.floor(Math.random() * maxMysteryBag - minMysteryBag + 1) +
      minMysteryBag
    );
  }
  setMoney(itemMoney = 0) {
    this.money += itemMoney;
    moneyContainer.textContent = `$${this.money}`;
    if (this.money >= this.target) {
      exitBtn.classList.add("success");
    }
  }
  plusMoney(findItem) {
    const rStoneIndex = 0;
    const tStoneIndex = 1;
    const diamondIndex = 7;

    const moneyIndex = 1;
    const enegryIndex = 2;
    let itemMoney = 0;
    // Get mystery bag
    if (findItem.id === "mystery-bag") {
      let mysteryBagResult = this.getRandomMysteryItem();
      let maxCount = 3;
      let count = 1;

      // If have clover
      do {
        mysteryBagResult = this.getRandomMysteryItem();
        count++;
      } while (
        this.isClover &&
        mysteryBagResult === moneyIndex &&
        maxCount < 3
      );
      // End

      if (mysteryBagResult === moneyIndex) {
        this.currentMoney = this.mysteryBagValue.getMoney();
        this.money += this.currentMoney;
        moneyContainer.textContent = `$${this.money}`;
        return;
      } else if (mysteryBagResult === enegryIndex) {
        this.mysteryBagValue.getEnegryDrink();
        strengthNotify.classList.add("active");
        player.src = "./src/public/images/streng1.png";

        setTimeout(() => {
          player.src = this.playerSrc;
          strengthNotify.classList.remove("active");
        }, 500);
        return;
      } else {
        this.mysteryBagValue.getTnt();
        this.loadTnt();
        console.log("TNT");
        return;
      }
    }

    // Use stone book
    if (
      findItem.id === this.Items[rStoneIndex].id ||
      findItem.id === this.Items[tStoneIndex].id
    ) {
      itemMoney = this.isStoneBook ? findItem.bonus * 3 : findItem.bonus;
      this.setMoney(itemMoney);
      return;
    }
    // End
    // Use polish
    if (findItem.id === this.Items[diamondIndex].id) {
      const polishBonus = findItem.bonus * 0.5;
      itemMoney = this.isPolishWater
        ? findItem.bonus + polishBonus
        : findItem.bonus;
      this.setMoney(itemMoney);
      return;
    }
    // End
    return (itemMoney = itemMoney === 0 ? findItem.bonus : itemMoney);
  }
  getRandomPosition() {
    // const marginBottom = 100;
    // const limitfirstFloor = 172;
    // const min = limitfirstFloor + 59;
    // const maxY = this.mapHeight - marginBottom;
    // console.log(min);
    // const max = this.mapWidth - 20;
    // const minX = 20;
    // return {
    //   x: Math.floor(Math.random() * (max - minX) + 1) + minX,
    //   y: Math.floor(Math.random() * (maxY - min) + 1) + min,
    // };
  }
  isPositionOccupied(position) {
    // const margin = 50;
    // return this.items.some(
    //   (item) => item.position.x === position.x && item.position.y === position.y
    // );
  }
  getRandomItemType() {
    // const startIndex = 0;
    // let newItemIndex = Math.floor(
    //   Math.random() * (this.itemsType.length - 1 - startIndex + 1) + startIndex
    // );
    // while (this.itemsType[newItemIndex].minimunQuantity < 1) {
    //   newItemIndex = Math.floor(
    //     Math.random() * (this.itemsType.length - 1 - startIndex + 1) +
    //       startIndex
    //   );
    // }
    // this.itemsType[newItemIndex].minimunQuantity--;
    // return this.itemsType[newItemIndex];
  }
  getRandomItem() {
    // const position = this.getRandomPosition();
    // const type = this.getRandomItemType();
    // return { position, type };
  }
  generateItems() {
    let html = ``;
    const round = roundGame[this.level];
    round.forEach((item) => {
      if (item.id === undefined) return;
      html += `
      <div
      class="item absolute ${item.class} ${
        item.class === "gold-1" ? "g-p-4" : ""
      }${item.id === "pig" && item?.itemScaleX ? "overturned" : ""}"data-id="${
        item.id
      }" ${
        item.id === "pig" || item.id === "diamondPig"
          ? `data-start="${item.start}" data-end="${item.end}"`
          : ""
      }
      style="top: ${item.top}%; left: ${item.left}%;">
      </div>
      `;
    });

    mapMiner.innerHTML = html;

    let pigs = $$(".pig");
    if (pigs) {
      for (const pig of pigs) {
        let start = 0;
        let end = 0;
        start = pig.dataset.start;
        end = pig.dataset.end;
        // console.log(pig.dataset);
        pig.animate(
          [
            {
              left: `${start}px`,
            },
            {
              left: `${end}px`,
            },
            {
              left: `${start}px`,
            },
          ],
          {
            duration: 7000,
            iterations: Infinity,
          }
        );
      }
    }
  }
  removeSecondClass(element) {
    const secondIndex = 1;
    const modifyElement = element.classList[secondIndex];

    element.classList.remove(modifyElement);
  }
  getSecondClassName(element) {
    const secondIndex = 1;
    return element.classList[secondIndex];
  }
  openStore() {
    const tntIndex = 0;
    const enegryIndex = 1;
    const cloverIndex = 2;
    const stoneBookIndex = 3;

    this.resetStore();
    clearInterval(this.stopTime);
    this.loadItemStore();
    this.removeSecondClass(trader);
    // When hover item
    const storeItems = $$(".store__list-item");
    for (const item of storeItems) {
      item.addEventListener("mouseover", () => {
        // item contains class is name example: tnt,clover...
        const getInfo = this.getItemByName(item);
        itemStoreInfo.textContent = getInfo.desc;
      });
    }
    // End
    // Buy items
    for (const item of storeItems) {
      item.addEventListener("click", () => {
        if (!this.isBuy) {
          this.isBuy = true;
        }
        // item contains class is name example: tnt,clover...
        const getInfo = this.getItemByName(item);
        if (getInfo.name === this.itemStore[tntIndex].name) {
          this.setTnt();
          this.loadTnt();
        } else if (getInfo.name === this.itemStore[enegryIndex].name) {
          this.setEnegry();
        } else if (getInfo.name === this.itemStore[cloverIndex].name) {
          this.setClover();
        } else if (getInfo.name === this.itemStore[stoneBookIndex].name) {
          this.setStoneBook();
        } else {
          this.setPolish();
        }
        item.classList.add("hidden-item");
      });
    }
    // End
    store.style.display = "block";
    store.style.opacity = 1;
  }
  closeStore() {
    if (!this.isBuy) {
      statusAudio.src = "./src/public/sounds/hvBad.mp3";
      statusAudio.addEventListener("canplaythrough", () => {
        statusAudio.play();
      });
      this.removeSecondClass(trader);
      trader.classList.add("unhappy");
    } else {
      statusAudio.src = "./src/public/sounds/hvNice.mp3";
      statusAudio.addEventListener("canplaythrough", () => {
        statusAudio.play();
      });
      this.removeSecondClass(trader);
      trader.classList.add("happy");
    }
    this.isNextRound = true;
    setTimeout(() => {
      // store.style.opacity = 0;
      store.style.display = "none";
    }, 1000);
  }
  handlePullItem() {
    const allItem = $$(".item");
    const hookLocation = handleHook.getBoundingClientRect();
    for (const item of allItem) {
      const element = item.getBoundingClientRect();
      if (
        hookLocation.left <= element.right &&
        hookLocation.right >= element.left &&
        hookLocation.top <= element.bottom &&
        hookLocation.bottom >= element.top &&
        this.isPull === false
      ) {
        this.isPull = true;
        return [true, item.dataset.id, item];
      }
    }
    return [false, "", ""];
  }
  checkStatus(status) {
    let audioName;
    if (status === "cool") {
      audioName = "hvCool";
    } else if (status === "good") {
      audioName = "hvGood";
    } else {
      audioName = "hvBad";
    }
    statusAudio.src = `./src/public/sounds/${audioName}.mp3`;
    statusAudio.play();
    return new Promise((reslove) => {
      reslove();
    });
  }
  loadLevel() {
    levelNumber.textContent = this.level;
  }
  handleCountDown() {
    if (this.stopTime !== 0) {
      clearInterval(this.stopTime);
    }
    let time = 60;
    this.stopTime = setInterval(() => {
      time--;
      timeSet.textContent = `${time}`;
      if (time === 0) {
        if (this.money >= this.target) {
          this.winGame();
        } else {
          this.loseGame();
        }
        this.stopAnimation();
        clearInterval(this.stopTime);
        this.stopTime = 0;
      }
    }, 1000);
  }
  restartGame() {
    this.level = 1;
    this.target = 650;
    this.TNT = 0;
    this.isBuy = false;
    this.isClover = false;
    this.isEnegryDrink = false;
    this.isPolishWater = false;
    this.isStoneBook = false;
    // reset background Map
    this.removeSecondClass(mapMiner);
  }
  showMenu() {
    startGame.style.display = "block";
    startGame.style.opacity = 1;
  }
  activePassLevel(isShow) {
    isShow = isShow ? "block" : "none";
    showLevel.style.display = isShow;
  }
  setMessageTarget(message, target) {
    notfiy.textContent = message;
    showTarget.textContent = `${target}`;
  }
  showPassLevel(message, target = "", isWin, isNewRound) {
    let sound = "";
    if (isWin) sound = "win";

    if (isNewRound) sound = "goal";

    audio.src = `./src/public/sounds/${sound}.mp3`;
    if (isNewRound) {
      statusAudio.addEventListener("ended", () => {
        audio.play();
        this.isNextRound = true;
      });
    } else {
      if (isWin || isNewRound) {
        audio.play();
      }
      this.isNextRound = false;
    }
    this.setMessageTarget(message, target);
    this.activePassLevel(true);
  }

  closeShowPassLevel() {
    this.activePassLevel(false);
    if (this.isNextRound) {
      this.handleCountDown();
    }
  }
  winGame() {
    this.level++;
    this.isBuy = false;
    const nextTarget = 0.84;
    this.target += this.target * nextTarget;
    this.showPassLevel("Bạn đã tiến lên cấp độ kế tiếp", "", true, false);
    setTimeout(() => {
      this.closeShowPassLevel();
      this.openStore();
    }, 2000);
  }
  loseGame() {
    this.restartGame();
    this.showPassLevel("Bạn đã không hoàn thành nhiệm vụ", "", false, false);
    setTimeout(() => {
      this.closeShowPassLevel();
      this.setMessageTarget("Mục tiêu của bạn là", `$${this.target}`);
      this.showMenu();
      this.activePassLevel(true);
      // this.menu();
    }, 2000);
  }
  stopAnimation() {
    // this.shoot.pause();
    // this.shootEnd.pause();
    // if (this.shootCancel) {
    //   this.shootCancel.pause();
    // }
    clearTimeout(this.pullItemFinish);
    clearTimeout(this.plusMoneyTimeOut);
    audio.pause();
    boomAudio.pause();
    statusAudio.pause();
    clearInterval(this.pullUp);
    if (this.shootEnd) {
      this.shootEnd.removeEventListener("finish", this.handleFinishPull);
    }
  }
  pointInCircle(x, y, cx, cy, radius) {
    const distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
    return distancesquared <= radius * radius;
  }
  handleCheckItemHasInRound(item) {
    const allItems = $$(".item");
    const radius = 100;
    const curItem = item;
    const curItemLocation = item.getBoundingClientRect();

    for (const item of allItems) {
      const iLocation = item.getBoundingClientRect();
      if (
        item !== curItem &&
        this.pointInCircle(
          iLocation.x,
          iLocation.y,
          curItemLocation.x + curItemLocation.width / 2,
          curItemLocation.y + curItemLocation.height / 2,
          radius
        )
      ) {
        item.remove();
      }
    }
  }
  handleEvent() {
    const wireLength = hookWire.offsetHeight;
    const map = $(".background");
    // Đường chéo từ góc trên cùng xuống góc dưới
    const diagonalLength = Math.sqrt(
      Math.pow(map.offsetWidth, 2) + Math.pow(map.offsetHeight, 2)
    );
    const shake = [
      {
        transform: "rotate(60deg)",
      },
      {
        transform: "rotate(-60deg)",
      },
      {
        transform: "rotate(60deg)",
      },
    ];
    const shootOut = [
      {
        height: `${wireLength}px`,
      },
      {
        height: `${diagonalLength}px`,
      },
      {
        height: `${wireLength}px`,
      },
    ];
    this.hook = hookWire.animate(shake, {
      duration: 3800,
      iterations: Infinity,
    });

    this.playGame = (e) => {
      if (
        (e?.key === "ArrowUp" || e?.button === 2) &&
        this.TNT >= 1 &&
        this.isPullUp === true
      ) {
        let count = 1;
        const firstChild = 0;
        const modifyIndex = 1;
        const destroyAnimation = setInterval(() => {
          count = count === 4 ? (count = 1) : count;
          player.src = `./src/public/images/minerTnt${count}.png`;
          count++;
        }, 100);

        handleHook.src = "./src/public/images/moc_out.png";

        boomAudio.play();
        this.TNT--;

        const modifyElement =
          hookWire.children[firstChild].classList[modifyIndex];

        hookWire.children[firstChild].classList.remove(modifyElement);

        hookWire.animate([{ height: `${wireLength}px` }], {
          duration: 0,
          iterations: 1,
          fill: "forwards",
        });

        this.shootEnd.pause();
        this.shoot.pause();
        this.isPull = false;
        this.isPullUp = false;
        this.setDrop(false);
        this.loadTnt();
        setTimeout(() => {
          this.hook.play();
          clearInterval(destroyAnimation);
          player.src = this.playerSrc;
        }, 200);
        clearInterval(this.dropHook);
        clearInterval(this.pullUp);
        return;
        // return to avoid code from running below due to setDrop being set to false
      }
      if (!this.isDrop) {
        this.hook.play();
      }
      if (this.isDrop) return;

      if (e?.key === "ArrowDown" || e?.button === 0) {
        this.hook.pause();
        this.setDrop(true);

        this.shoot = hookWire.animate(shootOut, {
          duration: 2000,
          iterations: 1,
        });

        this.dropHook = setInterval(() => {
          const hookLocation = handleHook.getBoundingClientRect();

          const background = map.getBoundingClientRect();
          if (
            (hookLocation.left <= background.left ||
              hookLocation.top >= background.bottom ||
              hookLocation.right >= background.right) &&
            !this.isPullUp
          ) {
            this.shoot.pause();
            this.hook.pause();
            this.shootCancel = hookWire.animate(
              [{ height: `${wireLength}px` }],
              {
                duration: 1000,
                iterations: 1,
                fill: "forwards",
              }
            );

            this.shootCancel.addEventListener("finish", () => {
              this.setDrop(false);
              this.hook.play();
            });
            clearInterval(this.dropHook);
            return;
          }
          // Check to see if the hook touches any items
          const [iscollide, id, item] = this.handlePullItem();
          if (iscollide) {
            console.log(this.pullTime);
            console.log(this.isEnegryDrink);
            const findItem = this.Items.find((item) => item.id === id);
            // Set pull time
            this.setPullTime(findItem.time);
            console.log(this.pullTime);
            this.shootEnd = hookWire.animate([{ height: `${wireLength}px` }], {
              duration: this.pullTime,
              iterations: 1,
              fill: "forwards",
            });
            this.shootEnd.pause();

            if (item.dataset.id === "tnt_barrel") {
              handleHook.src = `./src/public/images/BoomEffect.png`;
              handleHook.classList.add(`tnt-barrel-boom`);
              boomAudio.play();
              this.handleCheckItemHasInRound(item);
              this.shoot.pause();
              setTimeout(() => {
                item.remove();
                handleHook.src = `./src/public/images/gapTntVo.png`;
                this.removeSecondClass(handleHook);
                handleHook.classList.add(`tnt-barrel`);
                this.shootEnd.play();
              }, 200);
            } else {
              handleHook.src = `./src/public/images/${findItem.img}.png`;
              handleHook.classList.add(`${findItem.size}`);

              let promise;
              if (findItem.id === "l-gold") {
                promise = this.checkStatus("cool");
              } else if (
                findItem.id === "mystery-bag" ||
                findItem.id === "sm-gold" ||
                findItem.id === "s-gold" ||
                findItem.id === "m-gold" ||
                findItem.id === "diamondPig"
              ) {
                promise = this.checkStatus("good");
              } else {
                promise = this.checkStatus("bad");
              }
              promise.then(() => {
                audio.src = "./src/public/sounds/up.mp3";
                this.pullUp = setInterval(() => {
                  audio.play();
                }, 1000);
              });

              this.shoot.pause();
              // this.shootEnd = hookWire.animate(
              //   [{ height: `${wireLength}px` }],
              //   {
              //     duration: this.pullTime,
              //     iterations: 1,
              //     fill: "forwards",
              //   }
              // );
              this.shootEnd.play();
            }

            this.isPullUp = true;
            handleHook.addEventListener("load", () => {
              item.remove();
            });

            this.handleFinishPull = () => {
              this.isPullUp = false;
              handleHook.src = "./src/public/images/moc_out.png";
              this.shoot.pause();
              clearInterval(this.pullUp);
              const moneyResult = this.plusMoney(findItem);

              if (findItem.id !== "mystery-bag") {
                bonus.textContent = `$${findItem.bonus}`;
              } else {
                bonus.textContent =
                  this.currentMoney > 0 ? `$${this.currentMoney}` : "";
                this.currentMoney = 0;
              }
              this.pullItemFinish = setTimeout(() => {
                audio.pause();
                audio.src = "./src/public/sounds/upfinish.mp3";
                audio.play();
              }, 200);

              bonus.classList.add("active");

              this.shootEnd.pause();
              setTimeout(() => {
                this.hook.play();
                this.setDrop(false);
                this.isPull = false;
              }, 200);
              this.plusMoneyTimeOut = setTimeout(() => {
                this.setMoney(moneyResult);
                bonus.classList.remove("active");
              }, 1000);
              handleHook.classList.remove(`${findItem.size}`);
              clearInterval(this.dropHook);
            };
            // Xử lý event sau khi kéo dây móc lên
            this.shootEnd.addEventListener("finish", this.handleFinishPull);
          }
        }, 100);

        // this.shoot.addEventListener("finish", () => {
        //   this.setDrop(false);
        //   hook.play();
        //   clearInterval(this.dropHook);
        // });
      }
    };
    document.addEventListener("keyup", (e) => {
      this.playGame(e);
    });
    // End
    // PrevenDefault contextmenu;
    container.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
    mapMiner.addEventListener("mouseup", (e) => {
      this.playGame(e);
    });
    // End

    // Next game
    nextGamebtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.showPassLevel(
        "Mục tiêu của bạn là",
        `$${this.target.toFixed()}`,
        false,
        true
      );
      this.loadGame();
      this.closeStore();
      setTimeout(() => {
        this.closeShowPassLevel();
      }, 2000);
    });
    // End
  }
  loadGame() {
    this.level = this.level >= 7 ? (this.level = 1) : this.level;
    // can drop hook
    this.setDrop(false);
    // Enđ

    // no item is pull
    this.isPull = false;
    // Enđ

    // Shake hook
    if (this.hook) {
      this.hook.play();
    }
    // Enđ

    // set hook image
    this.removeSecondClass(handleHook);
    handleHook.src = this.hookSrc;
    // Enđ

    moneyContainer.textContent = `$${this.money}`;
    // Generate items
    this.generateItems();
    // Load auxiliary items
    this.loadTnt();
    // Load level
    this.loadLevel();
    // Load target money
    targetNumber.textContent = `$${this.target.toFixed()}`;

    // set UI time
    timeSet.textContent = 60;

    // Load map
    this.removeSecondClass(mapMiner);
    for (const item of roundGame[this.level]) {
      if (item?.map) {
        mapMiner.classList.add(`${item.map}`);
      }
    }
    if (this.money >= this.target) {
      exitBtn.classList.add("success");
    } else {
      exitBtn.classList.remove("success");
    }
  }
  menu() {
    playGame.addEventListener("click", () => {
      startGame.style.opacity = "0";
      playGame.classList.add("hidden-item");
      audio.src = "./src/public/sounds/goal.mp3";
      audio.addEventListener("canplaythrough", () => {
        audio.play();
      });
      setTimeout(() => {
        startGame.style.display = "none";

        playGame.classList.remove("hidden-item");
        this.loadGame();
        this.closeShowPassLevel();
        this.handleCountDown();
      }, 2000);

      exitBtn.addEventListener("click", () => {
        this.stopAnimation();
        clearInterval(this.stopTime);
        clearInterval(this.dropHook);
        if (this.money >= this.target) {
          this.winGame();
        } else {
          this.loseGame();
        }
      });
    });
  }
  start() {
    // Hàm sử lý sự kiện
    this.handleEvent();
    // Start game
    this.menu();
    // Set this
    _This = this;
  }
}

const game = new GoldMiner();
document.addEventListener("DOMContentLoaded", () => {
  game.start();
});
