import {
    filterAds
} from "./filtering"
// let filtered = filter
const sortResults = (filtered) => {
    let sortBy = document.querySelector('.sortBy').value;
    if (sortBy === 'newest') {
        return filtered.sort((a, b) => {
            // If the item's unix timestamp in milliseconds is higher than the other item, position that element before the next element
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
            // If the item's unix timestamp in milliseconds is lower than the other item, position that element before the next element
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
            // The same concept. If item a's price is lower than item b's price, place it before item b.
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
            // The same concept. If item a's price is higher than item b's price, place it before item b.
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
            // The same concept. If item a's room count is higher than item b's price, place it before item b.
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
            // The same concept. If item a's room count is lower than item b's price, place it before item b.
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
            // The same concept. If item a's floor area is higher than item b's price, place it before item b.
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
            // The same concept. If item a's floor area is lower than item b's price, place it before item b.
            if (a.floorArea > b.floorArea) {
                return -1
            } else if (a.floorArea < b.floorArea) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        // If nothing else, just return the original filtered array
        return filtered
    }

}
// // We are sorting the results by the (imported) filters
// sortResults(filterAds())
export {
    sortResults as
    default
}