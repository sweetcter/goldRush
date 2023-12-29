// import Items from "./src/js/Items";
// import roundGame from "./src/js/RoundGame";
const roundGame = [
  [],
  [
    {
      id: "r-stone",
      top: "123px",
      bottom: "154px",
      class: "stone-2",
    },
    {
      id: "r-stone",
      top: "138px",
      bottom: "565px",
      class: "stone-2",
    },
    {
      id: "t-stone",
      top: "389px",
      bottom: "370px",
      class: "stone-1",
    },
    {
      id: "t-stone",
      top: "280px",
      bottom: "484px",
      class: "stone-1",
    },
    {
      id: "l-gold",
      top: "334px",
      bottom: "423px",
      class: "gold-4",
    },
    {
      id: "l-gold",
      top: "273px",
      bottom: "150px",
      class: "gold-4",
    },
    {
      id: "sm-gold",
      top: "370px",
      bottom: "670px",
      class: "gold-2",
    },
    {
      id: "sm-gold",
      top: "420px",
      bottom: "137px",
      class: "gold-2",
    },
    {
      id: "sm-gold",
      top: "190px",
      bottom: "432px",
      class: "gold-2",
    },
    {
      id: "mystery-bag",
      top: "130px",
      bottom: "105px",
      class: "mystery-bag",
    },
    {
      id: "mystery-bag",
      top: "200px",
      bottom: "560px",
      class: "mystery-bag",
    },
    {
      id: "s-gold",
      top: "190px",
      bottom: "525px",
      class: "gold-1",
    },
    {
      id: "s-gold",
      top: "175px",
      bottom: "586px",
      class: "gold-1",
    },
    {
      id: "s-gold",
      top: "200px",
      bottom: "200px",
      class: "gold-1",
    },
    {
      id: "s-gold",
      top: "260px",
      bottom: "260px",
      class: "gold-1",
    },
  ],
  [],
  [],
  [],
];
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const app = $("#app");
const hookWire = $(".hook-wire");
const handleHook = $(".hook");
const moneyContainer = $(".header__number");
const mapMiner = $(".background");
const audio = $("#audio");
const boomAudio = $("#boom");
const statusAudio = $("#status");
const timeSet = $(".header__time-number");
const itemContainer = $(".items");
const bonus = $(".header__bonus");
const startGame = $(".start");
const playGame = $(".play");
const showLevel = $(".show");
const exitBtn = $(".header__exit");
class GoldMiner {
  money = 0;
  target = 650;
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
  pigDiamond = this.diamond + this.pig;
  bone = 2;
  skull = 20;
  roundStone = 11;
  triagleStone = 20;
  TNT = 5;
  isClover = false;
  isEngryDrink = false;
  isStoneBook = false;
  isPolishWater = false;
  pullUp;
  shootEnd;
  shoot;
  dropHook;
  loadGunPowder() {
    let html = ``;
    for (let i = 1; i <= this.TNT; i++) {
      html += `<span class="gunpowder"></span>`;
    }
    itemContainer.innerHTML = html;
  }
  getMysteryBag(item) {
    if (item === "isEngryDrink") {
      this.isEngryDrink = true;
    } else {
      this.TNT = this.TNT <= 5 ? ++this.TNT : this.TNT;
    }
  }
  mysteryBagValue = [
    Math.floor(Math.random() * (800 - 11) + 1) + 11,
    () => this.getMysteryBag("isEngryDrink"),
    () => this.getMysteryBag("TNT"),
  ];
  Items = [
    {
      id: "r-stone",
      img: "gapda_2",
      size: "small",
      time: 3000,
      bonus: this.roundStone,
    },
    {
      id: "t-stone",
      img: "gapda_1",
      size: "small-medium",
      time: 3000,
      bonus: this.triagleStone,
    },
    {
      id: "l-gold",
      img: "gapvang_1",
      size: "large",
      time: 5000,
      bonus: this.largeGold,
    },
    {
      id: "m-gold",
      img: "gapvang_2",
      size: "medium",
      time: 4000,
      bonus: this.mediumGold,
    },
    {
      id: "sm-gold",
      img: "gapvang_3",
      size: "small-medium",
      time: 1500,
      bonus: this.smallMediumGold,
    },
    {
      id: "s-gold",
      img: "gapvang_3",
      size: "small",
      time: 1000,
      bonus: this.smallGold,
    },
    {
      id: "mystery-bag",
      img: "gapMysteryBag",
      size: "small",
      time: 1000,
      bonus:
        this.mysteryBagValue[
          Math.floor(
            Math.random() * (this.mysteryBagValue.length - 1 - 0) + 1
          ) + 0
        ],
    },
  ];
  items = [];
  itemsType = [
    {
      itemName: "round stone",
      imgName: "da_2",
      value: this.roundStone,
      size: "small-medium",
      type: "gapda_2",
      minimunQuantity: 3,
    },
    {
      itemName: "triagle stone",
      value: this.triagleStone,
      imgName: "da_1",
      size: "small-medium",
      type: "gapda_1",
      minimunQuantity: 3,
    },
    {
      itemName: "small gold",
      value: this.smallGold,
      imgName: "vang_4",
      size: "small",
      type: "gapvang_2",
      minimunQuantity: 4,
    },
    {
      itemName: "small medium gold",
      value: this.smallMediumGold,
      imgName: "vang_3",
      size: "small",
      type: "gapvang_3",
      minimunQuantity: 3,
    },
    {
      itemName: "large gold",
      value: this.largeGold,
      imgName: "vang_1",
      size: "large",
      type: "gapvang_1",

      minimunQuantity: 2,
    },
    {
      itemName: "mystery bag",
      value: this.mysteryBagValue,
      imgName: "mysteryBag",
      size: "small",
      type: "gapMysteryBag",
      minimunQuantity: Math.floor(Math.random() * (2 - 1) + 1) + 1,
    },
    // "triagle stone",
    // "small gold",
    // "small medium gold",
    // "large gold",
    // "mystery bag",
  ];
  constructor() {}
  setDrop(isDrop) {
    this.isDrop = isDrop;
  }
  setPullTime(time) {
    this.pullTime = time;
  }
  plusMoney(findItem) {
    this.money += findItem.bonus;
    moneyContainer.textContent = `$${this.money}`;
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
    // const maxItem = this.itemsType.reduce(
    //   (acc, cur) => acc + cur.minimunQuantity,
    //   0
    // );
    // for (let i = 1; i <= maxItem; i++) {
    //   let newItem = this.getRandomItem();
    //   while (this.isPositionOccupied(newItem.position)) {
    //     newItem = this.getRandomPosition();
    //   }
    //   this.items.push(newItem);
    // }
    // this.items.forEach((item) => {});
    let html = ``;
    const round = roundGame[this.level];
    round.forEach((item) => {
      html += `
      <div
      class="item ${item.class}"
      data-id="${item.id}"
      style="position: absolute; top: ${item.top}; left: ${
        item.bottom
      };padding:${item.class === "gold-1" ? 10 : 0}px">
      </div>
      `;
    });
    mapMiner.innerHTML = html;
  }
  handleCountDown() {
    // let time = 59;
    // setInterval(() => {
    //   if (time === 0) time = 59;
    //   timeSet.textContent = `${time}`;
    //   time--;
    // }, 1000);
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
  setSrc(name) {
    audio.pause();
    audio.src = "";
    setTimeout(() => {
      boomAudio.src = `./src/public/sounds/${name}.mp3`;
      boomAudio.play();
    }, 100);
  }
  handleEvent() {
    const wireLength = hookWire.offsetHeight;
    const map = $(".background");
    // Đường chéo từ góc trên cùng xuống góc dưới
    const diagonalLength = Math.sqrt(
      Math.pow(map.offsetWidth, 2) + Math.pow(map.offsetHeight, 2)
    );
    // console.log(handleHook.getBoundingClientRect(), "Hook");
    // console.log(item.getBoundingClientRect(), "Item");

    const shaking = [
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
    const hook = hookWire.animate(shaking, {
      duration: 3800,
      iterations: Infinity,
    });

    // console.log([hookWire]);
    document.addEventListener("keyup", (e) => {
      if (e.key === "ArrowUp" && this.TNT >= 1 && this.isPullUp === true) {
        handleHook.src = "./src/public/images/moc_out.png";
        this.setSrc("boom");
        this.TNT--;
        const firstChild = 0;
        const modifyIndex = 1;
        const modifyElement =
          hookWire.children[firstChild].classList[modifyIndex];

        hookWire.children[0].classList.remove(modifyElement);

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
        this.loadGunPowder();
        setTimeout(() => {
          hook.play();
        }, 100);
        clearInterval(this.dropHook);
        clearInterval(this.pullUp);
        return;
        // return để tránh code chạy xuống dưới do setDrop đã được set thành false
      }

      if (this.isDrop) return;

      if (e.key === "ArrowDown") {
        hook.pause();
        this.setDrop(true);
        this.shoot = hookWire.animate(shootOut, {
          duration: 2000,
          iterations: 1,
        });

        // console.log(map.getBoundingClientRect());
        this.dropHook = setInterval(() => {
          const hookLocation = handleHook.getBoundingClientRect();

          const background = map.getBoundingClientRect();
          const backgroundBottom = 560;
          if (
            hookLocation.left <= background.left ||
            hookLocation.bottom >= backgroundBottom ||
            hookLocation.right >= background.right
          ) {
            this.shoot.pause();
            hook.pause();
            const shootCancel = hookWire.animate(
              [{ height: `${wireLength}px` }],
              {
                duration: 1000,
                iterations: 1,
                fill: "forwards",
              }
            );

            shootCancel.addEventListener("finish", () => {
              this.setDrop(false);
              hook.play();
            });
            clearInterval(this.dropHook);
            return;
          }
          // Kiểm tra xem hook có chạm vao item nào không
          const [iscollide, id, item] = this.handlePullItem();
          if (iscollide) {
            const findItem = this.Items.find((item) => item.id === id);
            this.isPullUp = true;
            this.pullTime = 4000;

            console.log(this.mysteryBagValue);

            handleHook.src = `./src/public/images/${findItem.img}.png`;
            handleHook.classList.add(`${findItem.size}`);
            let promise;
            if (findItem.id === "l-gold") {
              promise = this.checkStatus("cool");
            } else if (
              findItem.id === "mystery-bag" ||
              findItem.id === "sm-gold" ||
              findItem.id === "s-gold" ||
              findItem.id === "m-gold"
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

            // Set pull time
            this.setPullTime(findItem.time);

            handleHook.addEventListener("load", () => {
              item.remove();
            });

            this.shoot.pause();
            this.shootEnd = hookWire.animate([{ height: `${wireLength}px` }], {
              duration: this.pullTime,
              iterations: 1,
              fill: "forwards",
            });

            // Xử lý event sau khi kéo dây móc lên
            this.shootEnd.addEventListener("finish", () => {
              handleHook.src = "./src/public/images/moc_out.png";
              this.shoot.pause();
              clearInterval(this.pullUp);

              setTimeout(() => {
                audio.pause();
                audio.src = "./src/public/sounds/upfinish.mp3";
                audio.play();
              }, 200);
              this.plusMoney(findItem);
              bonus.textContent = `$${findItem.bonus}`;
              bonus.classList.add("active");
              setTimeout(() => {
                hook.play();
                this.setDrop(false);
                this.isPull = false;
              }, 200);
              setTimeout(() => {
                bonus.classList.remove("active");
              }, 1000);
              handleHook.classList.remove(`${findItem.size}`);
              clearInterval(this.dropHook);
            });
          }
        }, 100);

        // this.shoot.addEventListener("finish", () => {
        //   this.setDrop(false);
        //   hook.play();
        //   clearInterval(this.dropHook);
        // });
      }
    });
    // End
    app.addEventListener("contextmenu", function (e) {
      e.preventDefault();
    });
    app.addEventListener("mouseup", (e) => {});
  }
  loadGame() {
    this.closeShowPassLevel();
    // Hàm sử lý sự kiện
    this.handleEvent();
    // Generate items
    this.generateItems();
    // Count down
    // this.handleCountDown();
    // Load item
    this.loadGunPowder();
  }
  showPassLevel() {
    audio.src = "./src/public/sounds/goal.mp3";
    audio.play();
    showLevel.style.display = "block";
  }
  closeShowPassLevel() {
    showLevel.style.display = "none";
  }
  menu() {
    playGame.addEventListener("click", () => {
      startGame.style.opacity = "0";
      audio.src = "./src/public/sounds/goal.mp3";
      audio.addEventListener("canplaythrough", () => {
        audio.play();
      });
      setTimeout(() => {
        startGame.style.display = "none";

        this.loadGame();
      }, 2000);

      exitBtn.addEventListener("click", () => {
        this.level++;
        if (this.money >= this.target) {
          console.log("Bạn đã qua màn");
        } else {
          console.log("Bạn chưa hoàn thành nhiệm vụ");
        }

        // this.loadGame();
        // this.showPassLevel();
        // audio.addEventListener("ended", () => {
        //   this.closeShowPassLevel();
        // });
      });
    });
  }
  start() {
    document.addEventListener("DOMContentLoaded", () => {
      // Start game
      this.menu();

      console.log(this.mysteryBagValue);
    });
  }
}

const game = new GoldMiner();
game.start();

const html = ` <header class="header">
<div class="header__left">
  <div class="header__money">
    <span class="header__money-title">Tiền:</span>
    <span class="header__number">$650</span>
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
</div>

<div class="header__right">
  <button class="header__exit">Thoát</button>
  <div class="header__right-wrapper">
    <div class="header__time">
      <span class="header__time-title">Thời Gian</span>
      <span class="header__time-number">60</span>
    </div>
    <div class="header__level">
      <span class="header__level-title">Cấp Độ</span>
      <span class="header__level-number">1</span>
    </div>
  </div>
</div>
<div class="hook-wire">
  <img src="./src/public/images/moc.png" alt="" class="hook">
</img>
</header>
<div class="start-line"></div>
<div class="background">
<img
  src="./src/public/images/background_1_out.jpeg"
  alt=""
  class="background__img"
/>
</div>`;
const render = (item) => {
  app.innerHTML = item;
};
