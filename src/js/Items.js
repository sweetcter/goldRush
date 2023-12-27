function getItem() {
  const Items = [
    {
      id: "r-stone",
      img: "gapda_2",
      size: "small",
      time: 3000,
      bonus: 11,
    },
    {
      id: "t-stone",
      img: "gapda_1",
      size: "small-medium",
      time: 3000,
      bonus: 20,
    },
    {
      id: "l-gold",
      img: "gapvang_1",
      size: "large",
      time: 5000,
      bonus: 500,
    },
    {
      id: "m-gold",
      img: "gapvang_2",
      size: "medium",
      time: 4000,
      bonus: 250,
    },
    {
      id: "sm-gold",
      img: "gapvang_3",
      size: "small-medium",
      time: 2000,
      bonus: 100,
    },
    {
      id: "s-gold",
      img: "gapvang_3",
      size: "small",
      time: 2000,
      bonus: 50,
    },
    {
      id: "mystery-bag",
      img: "gapMysteryBag",
      size: "small",
      time: 1000,
      bonus: Math.floor(Math.random() * (800 - 11) + 1) - 11,
    },
  ];
  return Items;
}
export { getItem };
