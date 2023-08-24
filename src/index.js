// import SlimSelect from 'slim-select';

// new SlimSelect({
//   select: '#breedSelector',
// });

import { fetchBreeds } from './cat-api.js';
import { fetchCatByBreed } from './cat-api.js';

const refs = {
  select: document.querySelector('#breedSelector'),
  catCard: document.querySelector('.cat-info'),
  loader: document.querySelector('.loading'),
  error: document.querySelector('.error'),
  imgCatUrl: document.querySelector('#breed_image'),
  divInfoCat: document.querySelector('#breed_json'),
};

let storedBreeds = [];

showLoader();
hideError();
hideSelect();

fetchBreeds()
  .then(({ data }) => {
    //filter to only include those with an `image` object
    data = data.filter(img => img.image?.url != null);

    storedBreeds = data;
    console.log(storedBreeds);

    for (let i = 0; i < storedBreeds.length; i++) {
      const breed = storedBreeds[i];
      let option = document.createElement('option');

      //skip any breeds that don't have an image
      if (!breed.image) continue;

      //use the current array index
      option.value = `${breed.id}`;
      option.innerHTML = `${breed.name}`;
      refs.select.appendChild(option);
    }
    // show select
    hideLoader();
    showSelect();
    //show the first breed by default
    //showBreedImage(0);
  })
  .catch(err => {
    hideLoader();
    showError();
    console.log(err.message);
  });

function showBreedImage(index) {
  fetchCatByBreed(index)
    .then(({ data }) => {
      // console.log('71 string:', index);
      console.log('data[0].breeds[0]:', data[0]);

      refs.imgCatUrl.src = data[0].url;
      //   console.log(refs.imgCatUrl);
      //   console.log(refs.divInfoCat);
      refs.divInfoCat.innerHTML =
        '<h1>' +
        data[0].breeds[0].name +
        '</h1>' +
        '<p>' +
        data[0].breeds[0].description +
        '</p>' +
        '<p><b>Temperament: </b>' +
        data[0].breeds[0].temperament +
        '</p>';
      refs.divInfoCat.classList.add('breed_info');
    })
    .catch(err => {
      hideLoader();
      showError();
      console.log(err.message);
    })
    .finally(() => {
      hideLoader();
      refs.select.disabled = false;
    });
}

refs.select.addEventListener('change', event => {
  refs.select.disabled = true;
  showLoader();

  const index = event.target.value;
  showBreedImage(index);
  //console.log('element', index);
});

function showLoader() {
  refs.catCard.classList.add('hidden');
  refs.loader.classList.remove('hidden');
  //refs.loader.style.display = 'block';
}

function hideLoader() {
  refs.loader.classList.add('hidden');
  refs.catCard.classList.remove('hidden');
  //refs.loader.style.display = 'none';
}

function showError() {
  refs.error.classList.remove('hidden');
}

function hideError() {
  refs.error.classList.add('hidden');
}

function showSelect() {
  refs.select.classList.remove('hidden');
}

function hideSelect() {
  refs.select.classList.add('hidden');
}
