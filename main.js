// import Items from "./src/js/Items";
// import roundGame from "./src/js/RoundGame";
const roundGame = [
  [],
  [
    {
      id: "r-stone",
      top: 123,
      bottom: 154,
      class: "stone-2",
    },
    {
      id: "r-stone",
      top: 138,
      bottom: 565,
      class: "stone-2",
    },
    {
      id: "t-stone",
      top: 389,
      bottom: 370,
      class: "stone-1",
    },
    {
      id: "t-stone",
      top: 280,
      bottom: 484,
      class: "stone-1",
    },
    {
      id: "l-gold",
      top: 334,
      bottom: 423,
      class: "gold-4",
    },
    {
      id: "l-gold",
      top: 273,
      bottom: 150,
      class: "gold-4",
    },
    {
      id: "sm-gold",
      top: 370,
      bottom: 670,
      class: "gold-2",
    },
    {
      id: "sm-gold",
      top: 420,
      bottom: 137,
      class: "gold-2",
    },
    {
      id: "sm-gold",
      top: 190,
      bottom: 432,
      class: "gold-2",
    },
    {
      id: "mystery-bag",
      top: 130,
      bottom: 105,
      class: "mystery-bag",
    },
    {
      id: "mystery-bag",
      top: 200,
      bottom: 560,
      class: "mystery-bag",
    },
    {
      id: "s-gold",
      top: 190,
      bottom: 525,
      class: "gold-1",
    },
    {
      id: "s-gold",
      top: 175,
      bottom: 586,
      class: "gold-1",
    },
    {
      id: "s-gold",
      top: 200,
      bottom: 200,
      class: "gold-1",
    },
    {
      id: "s-gold",
      top: 260,
      bottom: 260,
      class: "gold-1",
    },
  ],
  [],
  [],
  [],
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
const storeItems = $$(".store__list-item");
const trader = $(".trader");
const targetNumber = $(".header__target-number");
class GoldMiner {
  money = 10000;
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
    // () => this.getMysteryBag("isEngryDrink"),
    // () => this.getMysteryBag("TNT"),
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
      bonus: this.mysteryBagValue[0],
      // Math.floor(
      //   Math.random() * (this.mysteryBagValue.length - 1 - 0) + 1
      // ) + 0
    },
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
    let html = ``;
    const round = roundGame[this.level];
    round.forEach((item) => {
      html += `
      <div
      class="item ${item.class}"
      data-id="${item.id}"
      style="position: absolute; top: ${item.top}px; left: ${
        item.bottom
      }px;padding:${item.class === "gold-1" ? 10 : 0}px">
      </div>
      `;
    });
    mapMiner.innerHTML = html;
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
    this.removeSecondClass(trader);
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
  restartGame() {
    this.level = 1;
    this.target = 650;
    this.TNT = 0;
    this.isBuy = false;
    this.isClover = false;
    this.isEngryDrink = false;
    this.isPolishWater = false;
    this.isStoneBook = false;
  }
  loadGame() {
    moneyContainer.textContent = `$${this.money}`;
    // Hàm sử lý sự kiện
    // this.handleEvent();
    // Generate items
    this.generateItems();
    // Load auxiliary items
    this.loadGunPowder();
    // Load level
    this.loadLevel();
    // Load target money
    targetNumber.textContent = `$${this.target.toFixed()}`;
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
      });
    } else {
      audio.play();
    }
    this.setMessageTarget(message, target);
    this.activePassLevel(true);
  }
  closeShowPassLevel() {
    this.activePassLevel(false);
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
    this.showPassLevel("Bạn đã không hoàn thành nhiệm vụ", "", false);
    setTimeout(() => {
      this.closeShowPassLevel();
      this.setMessageTarget("Mục tiêu của bạn là", `$${this.target}`);
      this.showMenu();
      this.activePassLevel(true);
      this.menu();
    }, 2000);
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
        boomAudio.play();
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
    // PrevenDefault contextmenu;
    app.addEventListener("contextmenu", function (e) {
      e.preventDefault();
    });
    app.addEventListener("mouseup", (e) => {});
    // End

    // Buy items
    for (const item of storeItems) {
      item.addEventListener("click", () => {
        if (!this.isBuy) {
          this.isBuy = true;
        }
        const typeItem = this.getSecondClassName(item);
        item.remove();
      });
    }
    // End
    // Next game
    nextGamebtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.loadGame();
      this.showPassLevel("Mục tiêu của bạn là", `$${this.target.toFixed()}`, false, true);
      this.closeStore();
      audio.addEventListener("ended", () => {
        this.closeShowPassLevel();
      });
    });
    // End

    const handleCountDown = () => {
      let time = 59;
      let stopTime = setInterval(() => {
        timeSet.textContent = `${time}`;
        time--;
      }, 1000);
      if (time === 0) {
        if (this.money >= this.target) {
          this.winGame();
        } else {
          this.loseGame();
        }
        clearInterval(stopTime);
      }
    };
    handleCountDown();
  }
  menu() {
    playGame.addEventListener("click", () => {
      startGame.style.opacity = "0";
      audio.src = "./src/public/sounds/goal.mp3";
      audio.play();
      setTimeout(() => {
        startGame.style.display = "none";

        this.handleEvent();
        this.loadGame();
        this.closeShowPassLevel();
      }, 2000);

      exitBtn.addEventListener("click", () => {
        if (this.money >= this.target) {
          this.winGame();
        } else {
          this.loseGame();
        }
      });
    });
  }
  start() {
    document.addEventListener("DOMContentLoaded", () => {
      // Start game
      this.menu();
    });
  }
}

const game = new GoldMiner();
game.start();

const html = ``;
const render = (item) => {
  app.innerHTML = item;
};
