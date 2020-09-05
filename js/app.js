/*  -----  Text manipulation  -----  */

// Method to init field in output and set listener on input
const editTextListener = (input, element) => {
  // Init element with its input default value
  element.innerHTML = input.value;
  // Add listener to update output when typing
  input.addEventListener('input', () => {
    element.innerHTML = input.value;
  });
};
// Header, italic on top of output
const header = document.getElementById('preview-header');
const headerInput = document.getElementById('input-header');
editTextListener(headerInput, header);
// Title, in colored jumbotron
const title = document.getElementById('preview-title');
const titleInput = document.getElementById('input-title');
editTextListener(titleInput, title);
// Subtitle, right aligned under the jumbotron
const subtitle = document.getElementById('preview-subtitle');
const subtitleInput = document.getElementById('input-subtitle');
editTextListener(subtitleInput, subtitle);

/*  -----  Color manipulation  -----  */

// Output colored elements
const topBorder = document.getElementById('preview-top-border');
const titleContainer = document.getElementById('preview-title-container');
const questionMark = document.getElementById('orly-sup-text');
// Add listener on color input to update output colors
const colorPicker = document.getElementById('input-color');
colorPicker.addEventListener('input', () => {
  topBorder.style.backgroundColor = colorPicker.value;
  titleContainer.style.backgroundColor = colorPicker.value;
  questionMark.style.color = colorPicker.value;
});

/*  -----  Image manipulation  -----  */

//Image related elements
const image = document.getElementById('main-image');
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
  // Set anonymous on image to allow downloading on local web server
  image.crossOrigin = 'Anonymous';
  // Execute html2canvas with output div
  html2canvas(document.getElementById('output'), {
    logging: false, // Make html2canvas silent on execution
    scale: 4, // Ensure a good output resolution
    useCORS: true, // Allow CORS for animal image
    allowTaint: true // Allow tainted canvas because of loading an image into it
  }).then(canvas => {
    // Create virtual downloading link
    const link = document.createElement('A');
    link.download = 'orly-generated.png';
    link.href = canvas.toDataURL('image/png').replace("image/jpeg", "image/octet-stream");
    link.click();
    // Reset CORS policy to allow image swapping in UI
    setTimeout(() => { image.crossOrigin = null }, 100);
  });
});
