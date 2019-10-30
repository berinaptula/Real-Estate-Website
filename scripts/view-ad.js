const adId = location.hash.substring(1)
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

const renderLikedAds = () => {
    const likedContainer = document.querySelector('.liked')
    if (likedAds[0]) {
        likedContainer.innerHTML = '';
        likedAds.forEach((ad) => {
            const savedAdDOM = document.createElement('div')
            const removeLikedButton = document.createElement('button')

            removeLikedButton.textContent = "Remove"
            removeLikedButton.addEventListener('click', (e) => {
                removeLikedAd(e);
            })
            savedAdDOM.classList = 'saved-ad'
            savedAdDOM.id = ad.id
            savedAdDOM.innerHTML = `<img src="${ad.photo}"> 
                                    <h3>${ad.adress}</h3>
                                   `
            savedAdDOM.append(removeLikedButton)
            likedContainer.append(savedAdDOM)
        })
    } else {
        likedContainer.innerHTML = '';
    }
    console.log(likedAds);
}
renderLikedAds();
const removeLikedAd = (e) => {
    let removeLikedId = e.target.parentNode.id
    let indexToRemove = likedAds.findIndex(ad => ad.id === removeLikedId);
    console.log(indexToRemove)
    likedAds.splice(indexToRemove, 1);
    saveLikedAds();
    getSavedLikedAds();
    renderLikedAds();
}

let adFound = adsArr.find((ad) => ad.id === adId)

const renderAd = () => {
    const adress = document.querySelector('.adress');
    const city = document.querySelector('.city');
    const postcode = document.querySelector('.postcode');
    const floorArea = document.querySelector('.floorArea');
    const plotArea = document.querySelector('.plotArea')
    const rooms = document.querySelector('.rooms');
    const constructionType = document.querySelector('.constructionType');
    const balcony = document.querySelector('.balcony');
    const roofTerrace = document.querySelector('.roofTerrace');
    const garden = document.querySelector('.garden');
    const publishedTime = document.querySelector('.published')
    const img = document.querySelector('.photo')

    let whenIsPublished = adFound.published.fromNow();
    var x = new moment()
    var inDays = moment.duration(x.diff(adFound.published)).asDays();
    var inDaysInt = parseInt(inDays);
    var published = '';

    console.log(inDaysInt)
    if (inDaysInt >= 1) {
        published = whenIsPublished;
    }
    if (inDaysInt < 1) {
        published = "Today"
    }
    if (adFound.plotArea === null) {
        adFound.plotArea = "Not specificed for this type of property"
    }
    let hasBalcony = '';
    let hasRoofTerrace = '';
    let hasGarden = '';
    if (adFound.balcony) {
        hasBalcony = 'Yes'
    } else {
        hasBalcony = 'No'
    }
    if (adFound.roofTerrace) {
        hasRoofTerrace = 'Yes'
    } else {
        hasRoofTerrace = 'No'
    }
    if (adFound.garden) {
        hasGarden = 'Yes'
    } else {
        hasGarden = "No"
    }

    adress.textContent = adFound.adress
    city.textContent = adFound.city
    postcode.textContent = adFound.postcode
    floorArea.textContent = adFound.floorArea
    plotArea.textContent = adFound.plotArea
    rooms.textContent = adFound.rooms
    constructionType.textContent = adFound.constructionType
    balcony.textContent = hasBalcony
    roofTerrace.textContent = hasRoofTerrace
    garden.textContent = hasGarden
    publishedTime.textContent = published
    img.src = adFound.photo
}
renderAd()


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