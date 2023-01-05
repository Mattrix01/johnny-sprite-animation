// set to take input from html selection to choose animation:
let playerState = "idle";
const dropdown = document.getElementById("animations");
// listening for change event, everytime value changes, take player state and target event value.
// playerState variable will be set to its value attribute
dropdown.addEventListener("change", function (e) {
  playerState = e.target.value;
});
//
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const playerImage = new Image();
playerImage.src = "assets/johnny-sprite-dog.png";
const spriteWidth = 575;
const spriteHeight = 523;
// used in animate function to naivgate through sheets correctly per frames.
// let playerState = "jump";

let gameFrame = 0;
// slow down animation by that amount
const staggerFrames = 5;
// this will be container for main data for all animations
const spriteAnimations = [];
// a place to create a map to match the sprite sheet, will go through sprite sheet and for every animation row.
// created object for each animation on number of frames on sheet, our data for sheet
const animationStates = [
  {
    name: "idle",
    frames: 7,
  },
  {
    name: "jump",
    frames: 7,
  },
  {
    name: "fall",
    frames: 7,
  },
  {
    name: "run",
    frames: 7,
  },
  {
    name: "dizzy",
    frames: 7,
  },
  {
    name: "sit",
    frames: 7,
  },
  {
    name: "roll",
    frames: 7,
  },
  {
    name: "bite",
    frames: 7,
  },
  {
    name: "ko",
    frames: 7,
  },
  {
    name: "getHit",
    frames: 7,
  },
];
// arrow function, state is name in the array, index is frame number passed in to argument.
// this will run for loop for each element
animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  // this for loop will run through all the frames in 1 row, 7 times
  // once we ush 7 objects in loc array,take spriteAnimations array create new key/value paris in there.
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations[state.name] = frames;
});

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // can now use this method below with spriteAniations loc object to calculate where each position is for the different aniamtipon lengths.
  // navigating through animation idle, and length of loc
  let position =
    // [playerState] can change to any of the object names in that array to get its frames and change animation we are on.
    Math.floor(gameFrame / staggerFrames) %
    spriteAnimations[playerState].loc.length;
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;

  ctx.drawImage(
    playerImage,
    //navigate horizontally
    frameX,
    // navigate vertically
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );
  // remainder operator, if the remainder after gameFrame is divided by stagger frame is 0 (no numuber left over), only then increment.
  if (gameFrame % staggerFrames == 0) {
    // later need 6 to be variable for different animation rolls how many slides.
    if (frameX < 6)
      // cycle through sheet frames, need to make < number to cover frames for the compelte animation needed
      frameX++;
    else frameX = 0;
    // sprite frame rate increasing.
  }
  gameFrame++;

  // if pass in animate, name of its parent function, will run over and over creating animation loop
  requestAnimationFrame(animate);
}
animate();
