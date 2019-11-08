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
export {
    sortResults as
    default
}