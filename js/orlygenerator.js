'use strict';

const mobileCheck = () => {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

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
console.log(mobileCheck())
  if (mobileCheck()) {
    if (text.length > 40) {
      document.body.style.setProperty('--title-container', '10rem');
    } else if (text.length > 20) {
      document.body.style.setProperty('--title-container', '8rem');
    } else {
      document.body.style.setProperty('--title-container', '6rem');
    }
  } else {
    if (text.length > 40) {
      document.body.style.setProperty('--title-container', '16rem');
    } else if (text.length > 20) {
      document.body.style.setProperty('--title-container', '12rem');
    } else {
      document.body.style.setProperty('--title-container', '8rem');
    }
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
