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
export {
    reRenderDOM
}