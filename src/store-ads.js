let likedAds = [];

const saveLikedAds = () => {
    let likedAdsAray = JSON.stringify(likedAds);
    localStorage.setItem('savedAds', likedAdsAray);
}

const getSavedLikedAds = () => {
    let getLikedAds = localStorage.getItem('savedAds');
    if (getLikedAds === null) {
        return [];
    } else {
        let likedAdsJSON = JSON.parse(getLikedAds)
        return likedAdsJSON
    }
}
likedAds = getSavedLikedAds();

let ads = [];
// Save the ads to the Local Storage
const saveAds = () => {
    let adsAray = JSON.stringify(adsArr);
    localStorage.setItem('ads', adsAray);
}
const getSavedAds = () => {
    let getAds = localStorage.getItem('ads');
    if (getAds === null) {
        return [];
    } else {
        let adsJSON = JSON.parse(getAds)
        return adsJSON
    }
}
ads = getSavedAds();