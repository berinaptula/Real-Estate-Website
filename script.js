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

let likedAds = [{
    type: 'apartment',
    price: 225000,
    adress: "Adrianstraat 96",
    published: moment().subtract(4, 'days'),
    city: 'Rotterdam',
    postcode: '3014 XR',
    floorArea: 83,
    plotArea: null,
    rooms: 4,
    photo: 'media/img/ad6.jpg',
    constructionType: 'new',
    balcony: false,
    roofTerrace: false,
    garden: false,
    id: 'ad6',
    gallery: ['media/img/ad6.jpg', 'media/img/2.jpg', 'media/img/3.jpg', 'media/img/4.jpg', 'media/img/5.jpg']
}];

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
    filters.price = minPrice;
    filters.priceMax = maxPrice;

    if (minPrice > maxPrice) {
        document.querySelector('.max-price').value = minPrice
    }

    // Filter for House or Apartment
    if (document.getElementById('type-all').checked) {
        filters.type = 'all';
    } else if (document.getElementById('type-apartment').checked) {
        filters.type = 'apartment';
    } else if (document.getElementById('type-house').checked) {
        filters.type = 'house';
    }

    // Filter for rooms
    for (let roomNumber = 1; roomNumber <= 5; roomNumber++) {
        if (document.getElementById('rooms-all').checked) {
            filters.rooms = 0;
        } else if (document.getElementById(`room-${roomNumber}`).checked) {
            filters.rooms = roomNumber;
        }
    }
    // Filter for rooms
    if (document.getElementById('rooms-all').checked) {
        filters.rooms = 999999999;
    } else if (document.getElementById('room-1').checked) {
        filters.rooms = 1;
    } else if (document.getElementById('room-2').checked) {
        filters.rooms = 2;
    } else if (document.getElementById('room-3').checked) {
        filters.rooms = 3;
    } else if (document.getElementById('room-4').checked) {
        filters.rooms = 4;
    } else if (document.getElementById('room-5').checked) {
        filters.rooms = 5;
    }

    // filters.rooms =  document.querySelector('input[name="rooms"]:checked').value;
    // console.log("is " + x)

    // Filter for days since it was published
    if (document.getElementById('days-all').checked) {
        filters.published = null;
    } else if (document.getElementById('day-today').checked) {
        filters.published = 1;
    } else if (document.getElementById('day-3').checked) {
        filters.published = 3;
    } else if (document.getElementById('day-10').checked) {
        filters.published = 10;
    } else if (document.getElementById('day-30').checked) {
        filters.published = 30;
    }

    // Filter for floor area
    if (document.getElementById('floor-all').checked) {
        filters.floorArea = 999999999;
    } else if (document.getElementById('floor-50m2').checked) {
        filters.floorArea = 50;
    } else if (document.getElementById('floor-75m2').checked) {
        filters.floorArea = 75;
    } else if (document.getElementById('floor-100m2').checked) {
        filters.floorArea = 100;
    } else if (document.getElementById('floor-150m2').checked) {
        filters.floorArea = 150;
    } else if (document.getElementById('floor-250m2').checked) {
        filters.floorArea = 250;
    }

    // Filter for the Plot area
    if (document.getElementById('plot-all').checked) {
        filters.plotArea = 99999999;
    } else if (document.getElementById('plot-250m2').checked) {
        filters.plotArea = 250;
    } else if (document.getElementById('plot-500m2').checked) {
        filters.plotArea = 500;
    } else if (document.getElementById('plot-1000m2').checked) {
        filters.plotArea = 1000;
    } else if (document.getElementById('plot-2500m2').checked) {
        filters.plotArea = 2500;
    } else if (document.getElementById('plot-5000m2').checked) {
        filters.plotArea = 5000;
    }

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

    // Type of construction filters
    if (document.getElementById('all-construction').checked) {
        filters.constructionType = 'all';
    } else if (document.getElementById('new-construction').checked) {
        filters.constructionType = 'new';
    } else if (document.getElementById('resale-construction').checked) {
        filters.constructionType = 'resale';
    }
};
console.log(filters);

const sortResults = (filtered) => {
    let sortBy = document.querySelector('.sortBy').value;
    console.log(sortBy)
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
        console.log(sortBy)
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
        console.log(sortBy)
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
        console.log(sortBy)
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
        console.log(sortBy)
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
        console.log(sortBy)
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
        console.log(sortBy)
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
        console.log(sortBy)
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
        renderLikedAds();
    } else {
        let indexRemove = likedAds.findIndex((ad) => {
            return ad.id === liked.id

        })
        likedAds.splice(indexRemove, 1)
        renderLikedAds()
        console.log(indexRemove)
    }
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
        console.log('its zero')
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
    console.log(filters);
    filterAds();
    let sorted = sortResults(filterAds())
    renderAds(sorted);
}

const form = document.querySelector('.filters');
form.addEventListener('click', (e) => {
    reRenderDOM();
});

const propertyPrice = document.querySelector('.propertyPrice');
propertyPrice.addEventListener('change', (e) => {
    reRenderDOM();
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