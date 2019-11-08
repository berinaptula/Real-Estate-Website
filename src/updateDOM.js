import {
    saveAds,
    getSavedAds
} from './store-ads'
import {
    setFilters,
    filterAds
} from './filtering'
import sortResults from './sorting'
import {
    renderAds
} from './views'

const emptyDom = () => {
    const container = document.querySelector('.properties-container');
    // Empty the DOM only if we are in the "search.html" window/page
    if (location.href.includes("search.html")) {
        container.innerHTML = '';
    }
};
const reRenderDOM = (e) => {
    saveAds();
    getSavedAds();
    emptyDom();
    // Set filters and re-render ads only if we are in the "search.html" window/page
    if (location.href.includes("search.html")) {
        setFilters(e);
        let sorted = sortResults(filterAds())
        renderAds(sorted);
    }
    filterAds();
}
export {
    reRenderDOM
}