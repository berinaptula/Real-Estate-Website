import adsArr from "./ads"
import moment from 'moment'

// Default filters for ads. (Currently testing purposes)
var filters = {
    type: 'all',
    price: 0,
    priceMax: 99999999,
    adress: '',
    published: null,
    city: '',
    postcode: '',
    floorArea: 999999999,
    plotArea: 999999999,
    rooms: 99999999,
    constructionType: 'all',
};
var checkFilters = {
    balcony: false,
    garden: false,
    roofTerrace: false
}

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

// Function which filters the ads (yet to be improved)
const filterAds = () => {
    const priceFilter = adsArr.filter(function (item) {
        if (filters.price <= item.price && filters.priceMax >= item.price) {
            return true;
        }
    });
    const queryFilter = priceFilter.filter((item) => {
        if (item.city.toLowerCase().includes(filters.city.toLowerCase()) ||
            item.adress.toLowerCase().includes(filters.adress.toLowerCase()) ||
            item.postcode.toLowerCase().includes(filters.postcode.toLowerCase())) {
            return true
        }
    })
    const typeFilter = queryFilter.filter((item) => {
        if (filters.type === 'all') {
            return true;
        } else if (filters.type === item.type) {
            return true
        }
    })

    const roomsFilter = typeFilter.filter((item) => {
        if (filters.rooms > 6) {
            return true
        } else if (filters.rooms === item.rooms) {
            return true
        }
    })


    const daysSincePublishedFilter = roomsFilter.filter((item) => {
        var x = new moment()
        var inDays = moment.duration(x.diff(item.published)).asDays();
        var inDaysInt = parseInt(inDays);
        if (filters.published === null) {
            return true
        } else if (filters.published >= inDaysInt) {
            return true
        }
    })

    const floorAreaFilter = daysSincePublishedFilter.filter((item) => {
        if (filters.floorArea > 999999) {
            return true
        } else if (filters.floorArea <= item.floorArea) {
            return true
        }
    })

    const plotAreaFilter = floorAreaFilter.filter((item) => {
        if (filters.plotArea > 999999) {
            return true
        } else if (filters.plotArea <= item.plotArea) {
            return true
        }
    })


    // This was a StackOverflow answer which I have to do little bit of research to refactor my old code
    // Seems like an easier way to filter things based on the multiple checkboxes checked!
    const wanted = Object.keys(checkFilters).filter(k => checkFilters[k]); // ['garden', 'roofTerrace']
    const checkboxFilter = plotAreaFilter.filter(item => wanted.every(k => item[k]));

    const constructionFilter = checkboxFilter.filter((item) => {
        if (filters.constructionType === 'all') {
            return true;
        }
        if (filters.constructionType === item.constructionType) {
            return true;
        }
    })
    const finalResult = constructionFilter;

    if (finalResult.length === 0) {
        const propertiesContainer = document.querySelector('.properties-container')
        propertiesContainer.innerHTML = "<h2 class='no-result'>No matching properties</h2>"
    }
    return finalResult;
};

//
const setFilters = (e) => {
    // Filter the minimum and maximum price
    let minPrice = document.querySelector('.min-price').value;
    let maxPrice = document.querySelector('.max-price').value;
    filters.price = parseInt(minPrice);
    filters.priceMax = parseInt(maxPrice);

    if (filters.price >= filters.priceMax) {
        filters.priceMax = document.querySelector('.max-price').value = parseInt(minPrice) * 2;
    }

    // Filter for House or Apartment
    filters.type = document.querySelector('input[name="type"]:checked').value;

    // Filter for rooms
    filters.rooms = parseInt(document.querySelector('input[name="rooms"]:checked').value);

    // // Filter for days since it was published
    filters.published = parseInt(document.querySelector('input[name="days"]:checked').value);

    // Filter for floor area
    filters.floorArea = parseInt(document.querySelector('input[name="floorArea"]:checked').value);

    // Filter for the Plot area
    filters.plotArea = parseInt(document.querySelector('input[name="plot-area"]:checked').value);


    // Balcony, Garden and Roof terrace filters
    if (document.getElementById('balcony').checked) {
        checkFilters.balcony = true;
    } else {
        checkFilters.balcony = false;
    }
    if (document.getElementById('roof-terrace').checked) {
        checkFilters.roofTerrace = true;
    } else {
        checkFilters.roofTerrace = false;
    }
    if (document.getElementById('garden').checked) {
        checkFilters.garden = true;
    } else {
        checkFilters.garden = false;
    }
    filters.constructionType = document.querySelector('input[name="construction"]:checked').value;


};


const sortResults = (filtered) => {
    let sortBy = document.querySelector('.sortBy').value;
    if (sortBy === 'newest') {
        return filtered.sort((a, b) => {
            if (a.published.valueOf() > b.published.valueOf()) {
                return -1
            } else if (a.published.valueOf() < b.published.valueOf()) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'oldest') {
        return filtered.sort((a, b) => {
            if (a.published.valueOf() < b.published.valueOf()) {
                return -1
            } else if (a.published.valueOf() > b.published.valueOf()) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'price-lowest') {
        return filtered.sort((a, b) => {
            if (a.price < b.price) {
                return -1
            } else if (a.price > b.price) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'price-highest') {
        return filtered.sort((a, b) => {
            if (a.price > b.price) {
                return -1
            } else if (a.price < b.price) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'rooms-lowest') {
        return filtered.sort((a, b) => {
            if (a.rooms < b.rooms) {
                return -1
            } else if (a.rooms > b.rooms) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'rooms-highest') {
        return filtered.sort((a, b) => {
            if (a.rooms > b.rooms) {
                return -1
            } else if (a.rooms < b.rooms) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'floor-lowest') {
        return filtered.sort((a, b) => {
            if (a.floorArea < b.floorArea) {
                return -1
            } else if (a.floorArea > b.floorArea) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'floor-highest') {
        return filtered.sort((a, b) => {
            if (a.floorArea > b.floorArea) {
                return -1
            } else if (a.floorArea < b.floorArea) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return filtered
    }

}
sortResults(filterAds())



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
renderLikedAds();
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

const emptyDom = () => {
    const container = document.querySelector('.properties-container');
    container.innerHTML = '';
};
const reRenderDOM = (e) => {
    saveAds();
    getSavedAds();
    emptyDom();
    setFilters(e);
    filterAds();
    let sorted = sortResults(filterAds())
    renderAds(sorted);
}

const form = document.querySelector('.filters');
form.addEventListener('click', (e) => {
    reRenderDOM(e);
});

const propertyPrice = document.querySelector('.propertyPrice');
propertyPrice.addEventListener('change', (e) => {
    reRenderDOM(e);
})
const searchQuery = document.querySelector('#search');
searchQuery.addEventListener('input', (e) => {
    filters.city = e.target.value;
    filters.adress = e.target.value;
    filters.postcode = e.target.value;
    reRenderDOM();
});

const sortChangeListener = document.querySelector('.sortBy')
sortChangeListener.addEventListener('change', () => {
    reRenderDOM();
})

// Render the DOM from the ads array (ads.js)
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
let sorted = sortResults(filterAds())
renderAds(sorted);

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
displayLiked();

const toggleSidebarBtn = document.querySelector('.sidebar__toggle')
const sidebarContent = document.querySelector('.sidebar__content')
const sidebar = document.querySelector('.sidebar')
toggleSidebarBtn.addEventListener('click', (e) => {
    sidebarContent.classList.toggle("hidden");
    sidebar.classList.toggle("width")
    if (sidebar.classList.contains("hidden")) {
        toggleSidebarBtn.innerHTML = `<i class="fas fa-angle-right"></i>`
    } else {
        toggleSidebarBtn.innerHTML = `<i class="fas fa-angle-left"></i>`
    }


})
window.addEventListener('resize', () => {
    innerWidth > 650 ? sidebarContent.classList.remove('hidden') : sidebarContent.classList.add('hidden')
    innerWidth > 650 ? sidebar.classList.remove('width') : sidebar.classList.add('width')
})