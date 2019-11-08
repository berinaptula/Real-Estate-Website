import adsArr from './ads'

let likedAds = [];
let ads = [];

// Saves the liked properties to local storage
const saveLikedAds = () => {
    let likedAdsAray = JSON.stringify(likedAds);
    // Saves to local storage as a string. We can't save objects/arrays to local storage.
    localStorage.setItem('savedAds', likedAdsAray);
}
// Gets the saved likes from local storage
const getSavedLikedAds = () => {
    let getLikedAds = localStorage.getItem('savedAds')
    if (getLikedAds === null) {
        return [];
    } else {
        // If only the local storage is not empty, we parse the retrieved string to a JSON
        let likedAdsJSON = JSON.parse(getLikedAds)
        return likedAdsJSON
    }
}
// Save the ads to the Local Storage
const saveAds = () => {
    // Saves to local storage as a string. We can't save objects/arrays to local storage.
    let adsAray = JSON.stringify(adsArr);
    localStorage.setItem('ads', adsAray);
}
const getSavedAds = () => {
    let getAds = localStorage.getItem('ads');
    if (getAds === null) {
        return [];
    } else {
        // If only the local storage is not empty, we parse the retrieved string to a JSON
        let adsJSON = JSON.parse(getAds)
        return adsJSON
    }
}
export {
    saveLikedAds,
    getSavedLikedAds,
    saveAds,
    getSavedAds
}