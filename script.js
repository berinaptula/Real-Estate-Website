// Default filters for ads. (Currently testing purposes)
var filters = {
    type: 'all',
    price: 0,
    priceMax: 900000,
    adress: '',
    published: '',
    city: '',
    postcode: '',
    floorArea: 0,
    plotArea: 0,
    rooms: 99999999,
    constructionType: 'new',
    // balcony: false,
    // garden: false,
    // roofTerrace: false
};
var checkFilters = {
    balcony: false,
    garden: false,
    roofTerrace: false
}

// Function which filters the ads (yet to be improved)
const filterAds = () => {
    const priceFilter = adsArr.filter(function (item) {
        if (filters.price <= item.price && filters.priceMax >= item.price) {
            console.log(item.garden)
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
        // console.log(filters.rooms, " >= ", item.rooms)
        if (filters.rooms > 6) {
            return true
        } else if (filters.rooms === item.rooms) {
            return true
        }
    })

    // const daysSincePublishedFilter = roomsFilter.filter((item) => {
    //     if (item) {
    //         return true
    //     }
    // })

    const floorAreaFilter = roomsFilter.filter((item) => {
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

// Render the DOM from the ads array (ads.js)
const renderAds = (adsArray) => {
    adsArray.forEach((element) => {
        const container = document.querySelector('.container');
        const ad = document.createElement('div');
        ad.className = 'obqva';

        let adress = document.createElement('h3');
        let price = document.createElement('p');
        let city = document.createElement('p');
        let postcode = document.createElement('p');
        let published = document.createElement('p');
        let img = document.createElement('img');

        adress.textContent = element.adress;
        price.textContent = element.price;
        city.textContent = element.city;
        postcode.textContent = element.postcode;
        published.textContent = element.published;
        img.src = element.photo;

        ad.append(adress, price, city, postcode, published, img);
        container.appendChild(ad);
    });
};
renderAds(filterAds());

//
const setFilters = (e) => {
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
    // Filter for days since it was published
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

const emptyDom = () => {
    const container = document.querySelector('.container');
    container.innerHTML = '';
};
const form = document.querySelector('.filters');
form.addEventListener('click', (e) => {
    emptyDom();
    setFilters(e);
    console.log(filters);
    filterAds();
    renderAds(filterAds());
});

const searchQuery = document.querySelector('#search');
searchQuery.addEventListener('input', (e) => {
    filters.city = e.target.value;
    filters.adress = e.target.value;
    filters.postcode = e.target.value;
    console.log(filters);
    emptyDom();
    setFilters(e);
    filterAds();
    renderAds(filterAds());
});