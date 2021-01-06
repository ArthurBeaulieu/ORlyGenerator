'use strict';

/*  -----  Text manipulation  -----  */

// Method to init field in output and set listener on input
const registerTextElement = value => {
  const element = document.getElementById(`preview-${value}`);
  const input = document.getElementById(`input-${value}`);
  const label = input.previousElementSibling;
  const savedValue = localStorage.getItem(`input-${value}`);
  // Init element with its local storage value or its default value
  element.innerHTML = savedValue || input.value;
  // Init input with local storage value if any
  if (savedValue) {
    input.value = savedValue;
  }
  // Update letter counter for field
  label.setAttribute('data-before', parseInt(label.dataset.maxlength) - input.value.length);
  // Add listener to update output when typing
  input.addEventListener('input', event => {
    element.innerHTML = input.value;
    label.setAttribute('data-before', parseInt(label.dataset.maxlength) - input.value.length);
    localStorage.setItem(`${input.name}`, input.value);
    // Handle title container resize with letter count
    if (element.id === 'preview-title') {
      updateTitleSize(element.innerHTML);
    }
  });
};
// Method to copute title container height according to text length
const updateTitleSize = text => {
  if (text.length > 40) {
    document.body.style.setProperty('--title-container', '16rem');
  } else if (text.length > 20) {
    document.body.style.setProperty('--title-container', '12rem');
  } else {
    document.body.style.setProperty('--title-container', '8rem');
  }
};
// Make input fields interactive
registerTextElement('header'); // Header, italic on top of output
registerTextElement('title'); // Title, in colored jumbotron
registerTextElement('subtitle'); // Subtitle, right aligned under the jumbotron
registerTextElement('signature'); // Signature, right aligned under the subtitle
// Init title container size with stored text
updateTitleSize(document.getElementById('preview-title').innerHTML);
// Title align
const titleAlign = [document.getElementById('l-align'), document.getElementById('c-align'), document.getElementById('r-align')];
const initIndexTI = localStorage.getItem('title-align') ? localStorage.getItem('title-align') : 0;
let currentTitleAlign = titleAlign[initIndexTI];
// Util method to update local storage while changing title align
const setTitleAlign = (element, i) => {
  const title = document.getElementById('preview-title');
  title.style.textAlign = element.getAttribute('alt').substr(0, element.getAttribute('alt').indexOf('-'));
  currentTitleAlign.classList.remove('selected');
  currentTitleAlign = element;
  currentTitleAlign.classList.add('selected');
  localStorage.setItem('title-align', `${i}`);
};
// Init align
setTitleAlign(currentTitleAlign, initIndexTI);
// Iterate over choices to make them interactive
for (let i = 0; i < titleAlign.length; ++i) {
  titleAlign[i].addEventListener('click', () => {
    setTitleAlign(titleAlign[i], i);
  });
}
// Subtitle align
const subtitleAlign = [document.getElementById('bl-align'), document.getElementById('tl-align'), document.getElementById('tr-align'), document.getElementById('br-align')];
const initIndexSI = localStorage.getItem('subtitle-align') ? localStorage.getItem('subtitle-align') : 3;
let currentSubtitleAlign = subtitleAlign[initIndexSI];
// Util method to update local storage while changing subtitle position
const setSubtitleAlign = (element, i) => {
  // Align subtitle on the left or the right of the book cover
  const subtitle = document.getElementById('preview-subtitle');
  const align = element.getAttribute('alt').substr(0, element.getAttribute('alt').indexOf('-'));
  if (align[1] === 'l') {
    subtitle.style.left = 'var(--padding)';
    subtitle.style.right = 'inherit';
  } else if (align[1] === 'r') {
    subtitle.style.left = 'inherit';
    subtitle.style.right = 'var(--padding)';
  }
  // Align subtitle on top or on bottom of title container
  const titleContainer = document.getElementsByClassName('preview-title-container')[0];
  if (align[0] === 't') {
    titleContainer.style.bottom = 'calc(var(--text) + (var(--margin)) + var(--subtitle))';
    subtitle.style.bottom = 'calc(var(--text) + (2 * var(--margin)) + var(--title-container))';
  } else if (align[0] === 'b') {
    titleContainer.style.bottom = 'calc(var(--text) + (2 * var(--margin)) + var(--subtitle))';
    subtitle.style.bottom = 'calc(var(--text) + (2 * var(--margin)))';
  }
  currentSubtitleAlign.classList.remove('selected');
  currentSubtitleAlign = element;
  currentSubtitleAlign.classList.add('selected');
  localStorage.setItem('subtitle-align', `${i}`);
};
// Init align
setSubtitleAlign(currentSubtitleAlign, initIndexSI);
// Iterate over choices to make them interactive
for (let i = 0; i < subtitleAlign.length; ++i) {
  subtitleAlign[i].addEventListener('click', () => {
    setSubtitleAlign(subtitleAlign[i], i);
  });
}

/*  -----  Color manipulation  -----  */

// Method to update css classes on color element when toggled
const setColor = element => {
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
  image.src = `assets/animals/${imageSelect.value}.webp`;
}
// Change animal on output
imageSelect.addEventListener('input', () => {
  image.src = `assets/animals/${imageSelect.value}.webp`;
  localStorage.setItem('cover-image', imageSelect.value);
});
let flipped = false;
let vFlipped = false
// Horizontal and vertical flip listener
imageFlip.addEventListener('click', () => {
  flipped = !flipped
  image.style.transform = `scaleX(${flipped ? -1 : 1}) scaleY(${vFlipped ? -1 : 1})`;
  localStorage.setItem('cover-flip', `${flipped}`);
  if (flipped) {
    imageFlip.classList.add('selected');
  } else {
    imageFlip.classList.remove('selected');
  }
});
imageVerticalFlip.addEventListener('click', () => {
  vFlipped = !vFlipped;
  image.style.transform = `scaleX(${flipped ? -1 : 1}) scaleY(${vFlipped ? -1 : 1})`;
  localStorage.setItem('cover-vflip', `${vFlipped}`);
  if (vFlipped) {
    imageVerticalFlip.classList.add('selected');
  } else {
    imageVerticalFlip.classList.remove('selected');
  }
});
// Init both with local storage value if any
if (localStorage.getItem('cover-flip') === 'true') {
  flipped = true;
  image.style.transform = `scaleX(${flipped ? -1 : 1}) scaleY(${vFlipped ? -1 : 1})`;
  imageFlip.classList.add('selected');
}
if (localStorage.getItem('cover-vflip') === 'true') {
  vFlipped = true;
  image.style.transform = `scaleX(${flipped ? -1 : 1}) scaleY(${vFlipped ? -1 : 1})`;
  imageVerticalFlip.classList.add('selected');
}

/*  -----  Image downloading  -----  */

// Convert output DOM element into an image that is downloaded from current browser
const download = document.getElementById('download');
download.addEventListener('click', () => {
  document.body.style.setProperty('--transition', '0');
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
    document.body.style.setProperty('--transition', '.6s');
  });
});

/* Random cover generator */

// Store button and index to navigate trhough template array
const browse = document.getElementById('browse');
let index = 0;
// Click event listener that iterates and update preview with template values
browse.addEventListener('click', () => {
  // Text update
  document.getElementById('preview-header').innerHTML = TemplateCover[index].header;
  document.getElementById('preview-title').innerHTML = TemplateCover[index].title;
  document.getElementById('preview-subtitle').innerHTML = TemplateCover[index].subtitle;
  // text input update
  document.getElementById('input-header').value = TemplateCover[index].header;
  document.getElementById('input-title').value = TemplateCover[index].title;
  document.getElementById('input-subtitle').value = TemplateCover[index].subtitle;
  // Update max length counter for each field
  document.getElementById('input-header').previousElementSibling.setAttribute('data-before',
    parseInt(document.getElementById('input-header').previousElementSibling.dataset.maxlength) - TemplateCover[index].header.length);
  document.getElementById('input-title').previousElementSibling.setAttribute('data-before',
    parseInt(document.getElementById('input-title').previousElementSibling.dataset.maxlength) - TemplateCover[index].title.length);
  document.getElementById('input-subtitle').previousElementSibling.setAttribute('data-before',
    parseInt(document.getElementById('input-subtitle').previousElementSibling.dataset.maxlength) - TemplateCover[index].subtitle.length);
  // Title scaling according to text length
  updateTitleSize(TemplateCover[index].title);
  // Color manipulation
  document.body.style.setProperty('--color', TemplateCover[index].color);
  for (let i = 0; i < colors.children.length; ++i) {
    // In case any saved color in local storage
    if (colors.children[i].dataset.value === TemplateCover[index].color) {
      setColor(colors.children[i]);
    }
  }
  // Image manipulation
  image.src = `assets/animals/${TemplateCover[index].animal}.webp`;
  imageSelect.value = TemplateCover[index].animal;
  // Save in local storage
  localStorage.setItem('input-header', TemplateCover[index].header);
  localStorage.setItem('input-title', TemplateCover[index].title);
  localStorage.setItem('input-subtitle', TemplateCover[index].subtitle);
  localStorage.setItem('cover-image', TemplateCover[index].animal);
  // Increment index depending on template covers length
  index = (index + 1) % TemplateCover.length;
});
