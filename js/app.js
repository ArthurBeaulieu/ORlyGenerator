/*  -----  Text manipulation  -----  */

// Method to init field in output and set listener on input
const editTextListener = (value) => {
  const element = document.getElementById(`preview-${value}`);
  const input = document.getElementById(`input-${value}`);
  // Init element with its input default value
  element.innerHTML = input.value;
  // Add listener to update output when typing
  input.addEventListener('input', () => {
    element.innerHTML = input.value;
  });
};
// Make input fields interactive
editTextListener('header'); // Header, italic on top of output
editTextListener('title'); // Title, in colored jumbotron
editTextListener('subtitle'); // Subtitle, right aligned under the jumbotron
editTextListener('signature'); // Signature, right aligned under the subtitle

/*  -----  Color manipulation  -----  */

const colorPicker = document.getElementById('input-color');
// Set color picker to CSS --color var value. Remove first char as it is a space
colorPicker.value = window.getComputedStyle(document.documentElement).getPropertyValue('--color').substring(1);
// Add listener on color input to update output colors
colorPicker.addEventListener('input', () => {
  document.body.style.setProperty('--color', colorPicker.value);
});

/*  -----  Image manipulation  -----  */

//Image related elements
const image = document.getElementById('image-animal');
const imageSelect = document.getElementById('select-image');
const imageFlip = document.getElementById('flip-image');
const imageVerticalFlip = document.getElementById('v-flip-image');
// Change animal on output
imageSelect.addEventListener('input', () => {
  image.src = `img/animals/${imageSelect.value}.jpg`;
});
// Flip image horizontally
let flipped = false;
imageFlip.addEventListener('click', () => {
  flipped = !flipped
  image.style.transform = `scaleX(${flipped ? -1 : 1}) scaleY(${vFlipped ? -1 : 1})`;
});
// Flip image vertically
let vFlipped = false;
imageVerticalFlip.addEventListener('click', () => {
  vFlipped = !vFlipped;
  image.style.transform = `scaleX(${flipped ? -1 : 1}) scaleY(${vFlipped ? -1 : 1})`;
});

/*  -----  Image downloading  -----  */

// Convert output DOM element into an image that is downloaded from current browser
const download = document.getElementById('download');
download.addEventListener('click', () => {
  // Execute html2canvas with output div
  html2canvas(document.getElementById('output'), {
    logging: false, // Make html2canvas silent on execution
    scale: 4 // Ensure a good output resolution
  }).then(canvas => {
    // Create virtual downloading link
    const link = document.createElement('A');
    link.download = 'orly-generator.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
});
