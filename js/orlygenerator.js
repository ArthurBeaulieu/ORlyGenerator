/*  -----  Text manipulation  -----  */

// Method to init field in output and set listener on input
const editTextListener = (value) => {
  const element = document.getElementById(`preview-${value}`);
  const input = document.getElementById(`input-${value}`);
  const savedValue = localStorage.getItem(`input-${value}`);
  // Init element with its local storage value or its default value
  element.innerHTML = savedValue || input.value;
  // Init input with local storage value if any
  if (savedValue) {
    input.value = savedValue;
  }
  // Add listener to update output when typing
  input.addEventListener('input', () => {
    element.innerHTML = input.value;
    localStorage.setItem(`${input.name}`, input.value);
  });
};
// Make input fields interactive
editTextListener('header'); // Header, italic on top of output
editTextListener('title'); // Title, in colored jumbotron
editTextListener('subtitle'); // Subtitle, right aligned under the jumbotron
editTextListener('signature'); // Signature, right aligned under the subtitle

/*  -----  Color manipulation  -----  */

// Method to update css classes on color element when toggled
const setColor = (element) => {
  selectedColor.classList.remove('selected');
  selectedColor = element;
  element.classList.add('selected');
  document.body.style.setProperty('--color', element.dataset.value);
  colorPicker.value = element.dataset.value;
  localStorage.setItem('accent-color', element.dataset.value);
};
// Predefined color and color picker elements, selected color and util flag
const colors = document.getElementById('predefined-colors');
const colorPicker = document.getElementById('input-color');
let selectedColor = colors.children[0];
let hasSavedColor = false; // Flag to know if saved color is a custom one
// Set color picker to CSS --color var value. Remove first char as it is a space
colorPicker.value = window.getComputedStyle(document.documentElement).getPropertyValue('--color').substring(1);
// Parse colors and make them interactive
for (let i = 0; i < colors.children.length; ++i) {
  // Listen to click event
  colors.children[i].addEventListener('click', function() {
    setColor(this);
  });
  // In case any saved color in local storage
  if (colors.children[i].dataset.value === localStorage.getItem('accent-color')) {
    hasSavedColor = true;
    setColor(colors.children[i]);
  }
}
// In case saved color is a custom one, init color picker and select it
if (localStorage.getItem('accent-color') !== null && !hasSavedColor) {
  colorPicker.dataset.value = localStorage.getItem('accent-color');
  setColor(colorPicker);
}
// Add listener on color input to update output colors
colorPicker.addEventListener('input', () => {
  document.body.style.setProperty('--color', colorPicker.value);
  colorPicker.dataset.value = colorPicker.value;
  setColor(colorPicker);
});

/*  -----  Image manipulation  -----  */

//Image related elements
const image = document.getElementById('image-animal');
const imageSelect = document.getElementById('select-image');
const imageFlip = document.getElementById('flip-image');
const imageVerticalFlip = document.getElementById('v-flip-image');
// Init cover image if any in local storage
if (localStorage.getItem('cover-image')) {
  imageSelect.value = localStorage.getItem('cover-image');
  image.src = `img/animals/${imageSelect.value}.jpg`;
}
// Change animal on output
imageSelect.addEventListener('input', () => {
  image.src = `img/animals/${imageSelect.value}.jpg`;
  localStorage.setItem('cover-image', imageSelect.value);
});
let flipped = false;
let vFlipped = false
// Horizontal and vertical flip listener
imageFlip.addEventListener('click', () => {
  flipped = !flipped
  image.style.transform = `scaleX(${flipped ? -1 : 1}) scaleY(${vFlipped ? -1 : 1})`;
  localStorage.setItem('cover-flip', `${flipped}`);
});
imageVerticalFlip.addEventListener('click', () => {
  vFlipped = !vFlipped;
  image.style.transform = `scaleX(${flipped ? -1 : 1}) scaleY(${vFlipped ? -1 : 1})`;
  localStorage.setItem('cover-vflip', `${vFlipped}`);
});
// Init both with local storage value if any
if (localStorage.getItem('cover-flip') === 'true') {
  flipped = true;
  image.style.transform = `scaleX(${flipped ? -1 : 1}) scaleY(${vFlipped ? -1 : 1})`;
}
if (localStorage.getItem('cover-vflip') === 'true') {
  vFlipped = true;
  image.style.transform = `scaleX(${flipped ? -1 : 1}) scaleY(${vFlipped ? -1 : 1})`;
}

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
