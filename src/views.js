const renderLikedAds = () => {
    const likedContainer = document.querySelector('.liked')
    let buttonLeft = document.querySelector('.liked-left')
    let buttonRight = document.querySelector('.liked-right')
    if (likedAds[0]) {
        buttonLeft.style.display = "block";
        buttonRight.style.display = "block"
        likedContainer.style.paddingBottom = "3.5rem"
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
        buttonLeft.style.display = "none";
        buttonRight.style.display = "none"
        likedContainer.innerHTML = '<h3>You don\'t have any liked properties</h3>';
        likedContainer.style.padding = "0"

    }
}
const renderAds = (adsArray) => {
    const container = document.querySelector('.properties-container');
    const resultsCount = document.createElement('h2')
    resultsCount.textContent = `Results found : ${filterAds().length}`
    resultsCount.classList = 'results-count'
    container.append(resultsCount)
    adsArray.forEach((element) => {

        const ad = document.createElement('div');
        ad.className = 'property';
        ad.id = element.id


        let publishedStringToObject = moment(element.published);
        let whenIsPublished = publishedStringToObject.fromNow();
        let now = new moment()
        let inDays = moment.duration(now.diff(element.published)).asDays();
        let inDaysInt = parseInt(inDays);
        let published = '';

        const viewButton = document.createElement('button');
        viewButton.id = element.id;
        viewButton.className = "viewButton"
        viewButton.textContent = 'View Ad'
        viewButton.addEventListener('click', (e) => {
            let id = e.target.parentNode.parentNode.id
            location.assign(`/ad.html#${id}`)
        })

        const likeButton = document.createElement('button');

        likeButton.className = 'likeButton'
        likeButton.textContent = "Like"
        likeButton.addEventListener('click', (e) => {
            likeAd(e);
        })
        let test = likedAds.filter((ad) => {
            return element.id === ad.id
        })
        if (test[0]) {
            likeButton.textContent = "Dislike"
            likeButton.style.backgroundColor = "#b03c3c"
            element.liked = true;
        } else {
            likeButton.textContent = "Like"
            likeButton.style.backgroundColor = ""
            element.liked = false;
        }
        const buttonContainer = document.createElement('div')
        buttonContainer.className = "property-buttons"

        if (inDaysInt >= 1) {
            published = whenIsPublished;
        } else {
            published = "Today"
        }
        let plotSize = 0;
        if (element.plotArea === null) {
            plotSize = "Not specificed"
        } else {
            plotSize = `${element.plotArea} <sup>m2</sup>`
        }
        let hasBalcony = '';
        let hasRoofTerrace = '';
        let hasGarden = '';
        if (element.balcony) {
            hasBalcony = '<i class="fas fa-check check"></i>'
        } else {
            hasBalcony = '<i class="fas fa-times cross"></i>'
        }
        if (element.roofTerrace) {
            hasRoofTerrace = '<i class="fas fa-check check"></i>'
        } else {
            hasRoofTerrace = '<i class="fas fa-times cross"></i>'
        }
        if (element.garden) {
            hasGarden = '<i class="fas fa-check check"></i>'
        } else {
            hasGarden = '<i class="fas fa-times cross"></i>'
        }
        ad.innerHTML =
            `
            <div class="property-photo">
             <img src=${element.photo}>
            </div>
            <div class="property-details">
                <h3>${element.adress}</h3>
                <p><span class="bold"><i class="fas fa-euro-sign"></i> ${(element.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} </span></p>
                <p><span class="bold"><i class="fas fa-map-marker-alt"></i> ${element.city} , ${element.postcode}</span></p>
                <p><span class="bold">${element.rooms} rooms</span></p>
                <p>Floor: <span class="bold">${element.floorArea} <sup>m2</sup></span></p>
                <p>Plot: <span class="bold">${plotSize}</span></p>
                <p>Construction type : <span class="bold">${element.constructionType}</span></p>
                <div class="utilities">
                    <p>Balcony : <span class="bold">${hasBalcony}</span></p>
                    <p>Roof terrace : <span class="bold">${hasRoofTerrace}</p>
                    <p>Garden : <span class="bold">${hasGarden}</span></p>
                </div>
                <p><span class="bold"><i class="fas fa-calendar-alt"></i> ${published}</span></p>
            </div>
            `
        buttonContainer.append(likeButton, viewButton)
        ad.appendChild(buttonContainer)
        container.append(ad);
    });
};