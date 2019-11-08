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