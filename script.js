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
if (getSavedLikedAds().length > 0) {
    likedAds = getSavedLikedAds();
} else if (getSavedLikedAds().length === 0) {
    likedAds = []
    console.log('YESSSS ITS EMPTY')
}

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
    let adId = e.target.parentNode.id
    let sorted = sortResults(filterAds())
    let liked = sorted.find((ad) => ad.id === adId)

    let check = likedAds.find((ad) => {
        return ad.id === liked.id
    })
    if (!check) {
        likedAds.push(liked);
    } else {
        let indexRemove = likedAds.findIndex((ad) => {
            return ad.id === liked.id

        })
        likedAds.splice(indexRemove, 1)
    }

    saveLikedAds();
    getSavedLikedAds();
    renderLikedAds()
}

const renderLikedAds = () => {
    const likedContainer = document.querySelector('.liked')

    if (likedAds[0]) {
        likedContainer.innerHTML = '';
        likedAds.forEach((ad) => {
            const savedAdDOM = document.createElement('div')
            savedAdDOM.classList = 'saved-ad'
            savedAdDOM.innerHTML = `<img src="${ad.photo}"> 
                                    <h3>${ad.adress}</h3>
                                   `
            likedContainer.append(savedAdDOM)
        })
    } else {
        likedContainer.innerHTML = '';
    }
    console.log(likedAds);
}
renderLikedAds();

const emptyDom = () => {
    const container = document.querySelector('.container');
    container.innerHTML = '';
};
const reRenderDOM = (e) => {
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
    adsArray.forEach((element) => {
        const container = document.querySelector('.container');
        const ad = document.createElement('div');
        ad.className = 'obqva';
        ad.id = element.id

        let whenIsPublished = element.published.fromNow();
        let x = new moment()
        let inDays = moment.duration(x.diff(element.published)).asDays();
        let inDaysInt = parseInt(inDays);
        let published = '';

        const viewButton = document.createElement('button');
        viewButton.id = element.id;
        viewButton.textContent = 'View Ad'
        viewButton.addEventListener('click', (e) => {
            let id = e.target.parentNode.id
            location.assign(`/ad.html#${id}`)
        })

        const likeButton = document.createElement('button');
        likeButton.className = 'likeButton'
        likeButton.textContent = "Like"
        likeButton.addEventListener('click', (e) => {
            likeAd(e);
        })

        if (inDaysInt >= 1) {
            published = whenIsPublished;
        }
        if (inDaysInt < 1) {
            published = "Today"
        }
        if (element.plotArea === null) {
            element.plotArea = "Not specificed for this type of property"
        }
        let hasBalcony = '';
        let hasRoofTerrace = '';
        let hasGarden = '';
        if (element.balcony) {
            hasBalcony = 'Yes'
        } else {
            hasBalcony = 'No'
        }
        if (element.roofTerrace) {
            hasRoofTerrace = 'Yes'
        } else {
            hasRoofTerrace = 'No'
        }
        if (element.garden) {
            hasGarden = 'Yes'
        } else {
            hasGarden = "No"
        }
        ad.innerHTML =
            ` <h3>${element.adress}</h3>
                <p>Price : $${element.price}</p>
                <p>City : ${element.city}</p>
                <p>Postcode : ${element.postcode}</p>
                <p>Floor area : ${element.floorArea}</p>
                <p>Plot area : ${element.plotArea}</p>
                <p>Rooms : ${element.rooms}</p>
                <p>Construction type : ${element.constructionType}</p>
                <p>Balcony : ${hasBalcony}</p>
                <p>Roof terrace : ${hasRoofTerrace}</p>
                <p>Garden : ${hasGarden}</p>
                <p>Published : ${published}</p>
                <img src=${element.photo}>
            `
        ad.append(likeButton, viewButton)
        container.append(ad);
    });
};
let sorted = sortResults(filterAds())
renderAds(sorted);