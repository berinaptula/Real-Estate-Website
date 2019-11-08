const slideRight = document.querySelector('.liked-right');
const slideLeft = document.querySelector('.liked-left');
if (likedAds[0]) {
    slideRight.addEventListener('click', () => {
        document.querySelector('.liked').scrollLeft += 200;
    })
    slideLeft.addEventListener('click', () => {
        document.querySelector('.liked').scrollLeft -= 200;
    })

}
const displayLiked = () => {
    const likedBar = document.querySelector('.liked-bar');
    let show = true;
    const showLikedBtn = document.querySelector('#show-liked');
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

const likeAd = (e) => {
    let adId = e.target.parentNode.parentNode.id
    let sorted = sortResults(filterAds())
    let liked = sorted.find((ad) => ad.id === adId)
    let adsJSON = adsArr.find((ad) => ad.id === adId)

    let check = likedAds.find((ad) => {
        return ad.id === liked.id
    })
    if (!check) {
        liked.liked = true;
        adsJSON.liked = true;
        e.target.textContent = "Dislike"
        e.target.style.backgroundColor = "#b03c3c"
        likedAds.push(liked);
    } else {
        e.target.textContent = "Like"
        e.target.style.backgroundColor = ""
        let indexRemove = likedAds.findIndex((ad) => {
            return ad.id === liked.id
        })
        liked.liked = false;
        adsJSON.liked = false;
        likedAds.splice(indexRemove, 1)
    }
    saveLikedAds();
    getSavedLikedAds();
    renderLikedAds()
}
const removeLikedAd = (e) => {
    let removeLikedId = e.target.parentNode.parentNode.id
    let indexToRemove = likedAds.findIndex(ad => ad.id === removeLikedId);
    likedAds.splice(indexToRemove, 1);
    saveAds();
    getSavedAds();
    saveLikedAds();
    getSavedLikedAds();
    renderLikedAds();
    reRenderDOM();
}
export {
    likeAd,
    removeLikedAd
}