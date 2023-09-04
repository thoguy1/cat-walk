const catImage = document.querySelector('img');
catImage.src = 'images/cat-walk.gif';
const discoLights = document.createElement('div');
document.body.appendChild(discoLights);

catImage.style.left = '0px';
catImage.style.top = (window.innerHeight / 3) + 'px';
//catImage.style.zIndex = '2'; // Ensure the cat image is displayed above the disco lights

// Set the initial direction to right
let direction = 'right';
const middleWindow = (window.innerWidth - catImage.clientWidth) / 2;

// Create an array of disco light colors
const discoLightColors = ['red', 'blue', 'green', 'yellow', 'purple'];

const catWalk = function () {
  const leftNum = parseInt(catImage.style.left);
  const topNum = parseInt(catImage.style.top);
  
  if (direction === 'right') {
    catImage.style.left = (leftNum + 10) + 'px';

    // Check if the cat has reached the middle of the screen change image to dancing cat for 10 seconds
    if (leftNum >= middleWindow && leftNum < middleWindow + 10) {
      clearInterval(catWalkInterval);

      // Show the disco lights and the dancing cat image for 10 seconds
      showDiscoLights();
      showDancingCat();
      
      
      setTimeout(resumeCatWalk, 10000);
    }

    // Turn left when the cat image touches the right edge of the window
    if (leftNum >= window.innerWidth - catImage.clientWidth) {
      direction = 'left';
      // Flip the image horizontally
      catImage.style.transform = 'scaleX(-1)';
    }
  } else {
    catImage.style.left = (leftNum - 10) + 'px';

    // Check if the cat has reached the middle of the screen change image to dancing cat for 10 seconds
    if (leftNum <= middleWindow && leftNum > middleWindow - 10) {
      clearInterval(catWalkInterval);

      // Show the disco lights and the dancing cat image for 10 seconds
      showDiscoLights();
      showDancingCat();
      
      setTimeout(resumeCatWalk, 10000);
    }

    if (leftNum <= 0) {
      catImage.style.left = (leftNum + 10) + 'px';
      direction = 'right';
      // Reset the image scale
      catImage.style.transform = 'scaleX(1)';
    }
  }
  // adds a random vertical motion to the cat image by increasing or decreasing by up to 10px
  catImage.style.top = (topNum + Math.random() * 20 - 10) + 'px';
};

// Show dancing cat image and animating the size
const showDancingCat = function() {
  const dancingCatImage = document.createElement('img');
  dancingCatImage.src = 'images/giphy.gif';
  dancingCatImage.style.zIndex = '2';
  dancingCatImage.style.position = 'absolute';
  dancingCatImage.style.left = catImage.style.left;
  const dacingCatTop = parseInt(catImage.style.top) - (catImage.clientHeight / 2);
  dancingCatImage.style.top = dacingCatTop + 'px';

  catImage.parentNode.replaceChild(dancingCatImage, catImage);

  const scaleStep = 0.1; // Amount to scale in each step
  const scaleInterval = 100; // Interval between each scaling step
  let scale = 0.2; // Initial scale factor
  let resize = 'bigger'

  const timerID = setInterval(function () {
    if (resize === 'bigger') {
      if (scale >= 0.2 && scale <= 1.0) {
        scale += scaleStep;
        dancingCatImage.style.transform = `scale(${scale})`;
      } 
      if (scale > 1.0) {
        scale -= scaleStep;
        dancingCatImage.style.transform = `scale(${scale})`;
        resize = 'smaller';
      }
    } else {
      if (scale >= 0.2 && scale <= 1.0) {
        scale -= scaleStep;
        dancingCatImage.style.transform = `scale(${scale})`;
      } 
      if (scale < 0.2) {
        scale -= scaleStep;
        dancingCatImage.style.transform = `scale(${scale})`;
        resize = 'bigger';
        scale = 0.2;
      }
    }
  }, scaleInterval);

  setTimeout(function () {
    clearInterval(timerID);
    dancingCatImage.parentNode.replaceChild(catImage, dancingCatImage);
  }, 10000);
};

const showDiscoLights = function () {
  const intervalTime = 200; // Interval time between color changes
  const duration = 10000; // Duration of disco lights display (in milliseconds)

  // Start the disco lights interval
  const discoInterval = setInterval(function () {
    const randomColor = discoLightColors[Math.floor(Math.random() * discoLightColors.length)];
    discoLights.style.backgroundColor = randomColor;
  }, intervalTime);

  // Stop the disco lights after the specified duration
  setTimeout(() => {
    clearInterval(discoInterval);
    discoLights.style.display = 'none';
  }, duration);

  // Show the disco lights container
  discoLights.style.position = 'fixed';
  discoLights.style.top = '0';
  discoLights.style.left = '0';
  discoLights.style.width = '100%';
  discoLights.style.height = '100%';
  discoLights.style.pointerEvents = 'none';
  discoLights.style.zIndex = '1';
  discoLights.style.display = 'block';
};

const resumeCatWalk = function () {
  // Replace the image with the original cat walk image
  catImage.src = 'images/cat-walk.gif';
  catImage.style.top = (window.innerHeight / 3) + 'px';

  // Hide the disco lights
  discoLights.style.display = 'none';

  // Resume the cat walk
  catWalkInterval = setInterval(catWalk, 50);
};

let catWalkInterval = setInterval(catWalk, 50);

