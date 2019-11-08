import adsArr from './ads'
import {
    renderAd
} from './views'

import {
    renderLikedAds,
    displayLiked
} from './views'

const adId = location.hash.substring(1)
let adFound = adsArr.find((ad) => ad.id === adId)
renderLikedAds();
displayLiked();
renderAd(adFound)

// Buttons for the previous and next image of the propperty
let currentPhotoIndex = 0
const img = document.querySelector('.photo')
const prev = document.querySelector('.prev');
prev.addEventListener('click', () => {
    currentPhotoIndex -= 1;
    if (currentPhotoIndex < 0) {
        currentPhotoIndex = adFound.gallery.length - 1
    }
    let currentPhoto = adFound.gallery[currentPhotoIndex]
    img.src = currentPhoto
})

const next = document.querySelector('.next');
next.addEventListener('click', () => {
    currentPhotoIndex += 1;
    if (currentPhotoIndex > adFound.gallery.length - 1) {
        currentPhotoIndex = 0
    }
    let currentPhoto = adFound.gallery[currentPhotoIndex]
    img.src = currentPhoto
})