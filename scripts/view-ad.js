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
            const buttonsContainer = document.createElement('div')
            const removeLikedButton = document.createElement('button')
            const viewLikedButton = document.createElement('button')
            buttonsContainer.className = "saved-ad__buttons"
            removeLikedButton.className = "saved-ad__buttons--button saved-ad__buttons--button--remove"
            removeLikedButton.textContent = "Remove"
            removeLikedButton.addEventListener('click', (e) => {
                removeLikedAd(e);
            })
            viewLikedButton.className = "saved-ad__buttons--button saved-ad__buttons--button--view"
            viewLikedButton.textContent = "View"
            viewLikedButton.addEventListener('click', (e) => {
                let id = e.target.parentNode.parentNode.id
                location.assign(`/ad.html#${id}`)
            })

            savedAdDOM.classList = 'saved-ad'
            savedAdDOM.id = ad.id
            savedAdDOM.innerHTML = `<img src="${ad.photo}"> 
                                    <div class="saved-ad__details">  
                                     <h3>${ad.adress}</h3>
                                     <p>$${ad.price}</p>
                                    </div>
                                   `
            buttonsContainer.append(viewLikedButton, removeLikedButton)
            savedAdDOM.append(buttonsContainer)
            likedContainer.append(savedAdDOM)
        })
    } else {
        likedContainer.innerHTML = '';
    }
    console.log(likedAds);
}
renderLikedAds();
const removeLikedAd = (e) => {
    let removeLikedId = e.target.parentNode.parentNode.id
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

    adress.innerHTML = `<span class="bold">${adFound.adress}</span>`
    city.innerHTML = `City <span class="bold">${adFound.city}</span>`
    postcode.innerHTML = `Postcode : <span class="bold">${adFound.postcode}</span>`
    floorArea.innerHTML = `Floor area: <span class="bold">${adFound.floorArea}</span>`
    plotArea.innerHTML = `Plot area : <span class="bold">${adFound.plotArea}</span>`
    rooms.innerHTML = `Rooms : <span class="bold">${adFound.rooms}</span>`
    constructionType.innerHTML = `Construction type : <span class="bold">${adFound.constructionType}</span>`
    balcony.innerHTML = `Balcony : <span class="bold">${hasBalcony}</span>`
    roofTerrace.innerHTML = `Roof terrace : <span class="bold">${hasRoofTerrace}</span>`
    garden.innerHTML = `Garden : <span class="bold">${hasGarden}</span>`
    publishedTime.innerHTML = `Published : <span class="bold">${published}</span>`
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
const displayLiked = () => {
    const likedBar = document.querySelector('.liked-bar');
    let show = true;
    const showLikedBtn = document.querySelector('#show-liked');
    console.log(showLikedBtn)
    showLikedBtn.addEventListener('click', () => {
        if (show) {
            showLikedBtn.style.backgroundColor = "#f4a546"
            likedBar.style.display = "block"
            show = false;
        } else {
            showLikedBtn.style.backgroundColor = ""
            likedBar.style.display = "none"
            show = true;
        }
    })
}
displayLiked();