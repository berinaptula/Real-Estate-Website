import {
    reRenderDOM
} from './updateDOM'
import {
    filters,
    filterAds
} from './filtering'
import {
    renderAds,
    renderLikedAds,
    displayLiked
} from './views'
import sortResults from './sorting'

const startApp = () => {
    let filtered = filterAds(filters);
    let sorted = sortResults(filtered)

    renderLikedAds();
    renderAds(sorted);
    displayLiked();
}
startApp();
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