// const goldMinerContainer = $("#goldMinerContainer");
// const ctx = goldMinerContainer.getContext("2d");
// ctx.imageSmoothingEnabled = false;

// const createImg = (src, x = 0, y = 0, w, h) => {
//   const img = new Image();
//   img.src = src;
//   img.addEventListener("load", function () {
//     ctx.drawImage(img, x, y, w, h);
//     // // Starting line
//     // ctx.beginPath();
//     // ctx.moveTo(0, backgroundPlayerHeight - backgroundPaddingTop); // Điểm bắt đầu
//     // ctx.lineTo(
//     //   goldMinerContainer.width,
//     //   backgroundPlayerHeight - backgroundPaddingTop
//     // ); // Điểm kết thúc
//     // ctx.strokeStyle = "#000";
//     // ctx.lineWidth = 1;
//     // ctx.stroke(); // Vẽ đường thẳng
//     // end
//   });
// };

// Draw image
// const backgroundPlayerWidth = 200;
// const backgroundPlayerHeight = 80;
// const backgroundPlayerLocation =
//   goldMinerContainer.width / 2 - (backgroundPlayerWidth / 100) * 50;

// const backgroundPaddingTop = 6;

// const playerWith = 80;
// const playerHeight = 50;
// createImg(
//   "./src/public/images/background_1_out.jpeg",
//   0,
//   backgroundPlayerHeight - backgroundPaddingTop,
//   goldMinerContainer.width,
//   goldMinerContainer.height - backgroundPlayerHeight
// );
// createImg(
//   "./src/public/images/background_out.png",
//   backgroundPlayerLocation,
//   0,
//   200,
//   backgroundPlayerHeight
// );
// createImg(
//   "./src/public/images/player_out.png",
//   goldMinerContainer.width / 2 - (playerWith / 100) * 50,
//   34,
//   playerWith,
//   playerHeight
// );
// end

// Top background
// ctx.fillStyle = "#FECE33";
// ctx.fillRect(0, 0, goldMinerContainer.width, backgroundPlayerHeight);
// // end

// class Items {
//   constructor(itemName, x, y, isPull) {
//     (this.x = x), (this.y = y), (this.isPull = isPull);
//     this.itemName = itemName;
//   }
// }
// const goldMiner = {
//   items: [
//     new Items("stone", 20, 32, false),
//     new Items("small gold", 20, 32, false),
//   ],
//   start() {
//     console.log(this.items);
//   },
// };

// goldMiner.start();

// setItem(items) {
//   this.items = items;
// }
// getItem() {
//   return this.items;
// }
// genItem() {
//   this.setItem([
//     new Items("stone", 20, 32, false),
//     new Items("small gold", 20, 32, false),
//   ]);
// }