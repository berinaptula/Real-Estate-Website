// Slider for the Liked section
// Do this only if likedAds is not empty
if (likedAds[0]) {
    const slideRight = document.querySelector('.liked-right');
    const slideLeft = document.querySelector('.liked-left');
    slideRight.addEventListener('click', () => {
        document.querySelector('.liked').scrollLeft += 200;
    })
    slideLeft.addEventListener('click', () => {
        document.querySelector('.liked').scrollLeft -= 200;
    })
}

// Toggles(shows and hides) the Liked Section
const displayLiked = () => {
    const likedBar = document.querySelector('.liked-bar');
    const showLikedBtn = document.querySelector('#show-liked');
    let show = true;
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
// This function is used with an onclick event listener
// Like & Dislike a listed property from the LISTED PROPERTIES
const likeAd = (e) => {
    let adId = e.target.parentNode.parentNode.id
    let sorted = sortResults(filterAds())
    let liked = sorted.find((ad) => ad.id === adId)
    let adsJSON = adsArr.find((ad) => ad.id === adId)

    // Check if the item is already liked
    let check = likedAds.find((ad) => {
        return ad.id === liked.id
    })
    if (!check) {
        // If it is not already liked by the time we click make it liked turn the text into "Dislike"
        liked.liked = true;
        adsJSON.liked = true;
        e.target.textContent = "Dislike"
        e.target.style.backgroundColor = "#b03c3c"
        // Add it to liked properties array
        likedAds.push(liked);
    } else {
        // If it is already liked by the time we click, make it disliked and turn the text into "Like"
        e.target.textContent = "Like"
        e.target.style.backgroundColor = ""
        let indexRemove = likedAds.findIndex((ad) => {
            return ad.id === liked.id
        })
        liked.liked = false;
        adsJSON.liked = false;
        // Remove it from properties array
        likedAds.splice(indexRemove, 1)
    }
    // Update the liked ads in the local storage
    saveLikedAds();
    // Get the newly updated liked ads array
    getSavedLikedAds();
    // Render them to the DOM
    renderLikedAds()
}
// "Remove" from "LIKED SECTION" 
const removeLikedAd = (e) => {
    // Get the id of the parent element of the button( the id of the ad)
    let removeLikedId = e.target.parentNode.parentNode.id
    // Find the index to remove by using the id of the ad
    let indexToRemove = likedAds.findIndex(ad => ad.id === removeLikedId);
    // Remove the element from the liked ads array by using its index
    likedAds.splice(indexToRemove, 1);

    // Save & update & retrieve the data from local storage
    saveAds();
    getSavedAds();
    saveLikedAds();
    getSavedLikedAds();
    renderLikedAds();
    // Clears the DOM and re-renders it.
    reRenderDOM();
}
export {
    likeAd,
    removeLikedAd
}