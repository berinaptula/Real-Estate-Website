import adsArr from "./ads"
import moment from 'moment'

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


// Function which filters the ads 
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

export {
    filterAds,
    setFilters
}