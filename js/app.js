const editTextListener = (input, element) => {
  // Init element with its input default value
  element.innerHTML = input.value;
  // Add listener to update on typing
  input.addEventListener('input', () => {
    element.innerHTML = input.value;
  });
};

/*  -----  Text manipulation  -----  */

const header = document.getElementById('preview-header');
const headerInput = document.getElementById('input-header');

const title = document.getElementById('preview-title');
const titleInput = document.getElementById('input-title');

const subtitle = document.getElementById('preview-subtitle');
const subtitleInput = document.getElementById('input-subtitle');

editTextListener(headerInput, header);
editTextListener(titleInput, title);
editTextListener(subtitleInput, subtitle);

/*  -----  Color manipulation  -----  */

const topBorder = document.getElementById('preview-top-border');
const titleContainer = document.getElementById('preview-title-container');
const questionMark = document.getElementById('orly-sup-text');

const colorPicker = document.getElementById('input-color');
colorPicker.addEventListener('input', () => {
  topBorder.style.backgroundColor = colorPicker.value;
  titleContainer.style.backgroundColor = colorPicker.value;
  questionMark.style.color = colorPicker.value;
});

/*  -----  Image manipulation  -----  */

const image = document.getElementById('main-image');
const imageSelect = document.getElementById('select-image');
const imageFlip = document.getElementById('flip-image');

imageSelect.addEventListener('input', () => {
  image.src = `img/animals/${imageSelect.value}.jpg`;
});

imageFlip.addEventListener('click', () => {
  image.style.transform = `scaleX(${imageFlip.checked ? -1 : 1})`;
});

/*  -----  Image downloading  -----  */

const download = document.getElementById('download');
download.addEventListener('click', () => {
  image.crossOrigin = 'Anonymous'; /* Set anonymous on image to allow downloading on local web server */
  html2canvas(document.getElementById('output'), {
    logging: true,
    allowTaint: true,
    useCORS: true,
    scale: 4
  }).then(canvas => {
    const link = document.createElement('A');
    link.download = 'orly-generated.png';
    link.href = canvas.toDataURL('image/png').replace("image/jpeg", "image/octet-stream");
    link.click();
    setTimeout(() => { image.crossOrigin = null }, 100); /* Reset CORS policy to allow image swapping in UI */
  });
});
