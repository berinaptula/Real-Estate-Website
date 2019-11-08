// Renders the ads to the DOM
const renderLikedAds = () => {
    // Slider Buttons
    const likedContainer = document.querySelector('.liked')
    const buttonLeft = document.querySelector('.liked-left')
    const buttonRight = document.querySelector('.liked-right')
    // If there is at least 1 liked property, we render it to the DOM
    if (likedAds[0]) {
        // Slider buttons
        buttonLeft.style.display = "block";
        buttonRight.style.display = "block"
        likedContainer.style.paddingBottom = "3.5rem"
        // Resets the container before populating it
        likedContainer.innerHTML = '';
        // Iterate through each object in the array and add them to the DOM
        likedAds.forEach((ad) => {
            const savedAdDOM = document.createElement('div')
            const buttonsContainer = document.createElement('div')
            const removeLikedButton = document.createElement('button')
            const viewLikedButton = document.createElement('button')

            // Initializing buttons
            buttonsContainer.className = "saved-ad__buttons"
            removeLikedButton.className = "saved-ad__buttons--button saved-ad__buttons--button--remove"
            removeLikedButton.textContent = "Remove"
            removeLikedButton.addEventListener('click', (e) => {
                removeLikedAd(e);
            })
            viewLikedButton.className = "saved-ad__buttons--button saved-ad__buttons--button--view"
            viewLikedButton.textContent = "View"
            viewLikedButton.addEventListener('click', (e) => {
                // If clicked, get the ID of the clicked ad, and change the url to that particular path with #id
                let id = e.target.parentNode.parentNode.id
                location.assign(`/ad.html#${id}`)
            })
            // The container of saved ad
            savedAdDOM.classList = 'saved-ad'
            savedAdDOM.id = ad.id
            savedAdDOM.innerHTML = `<img src="${ad.photo}"> 
                                    <div class="saved-ad__details">  
                                     <h3>${ad.adress}</h3>
                                     <p>$${ad.price}</p>
                                    </div>
                                   `
            // Append the buttons to their container
            buttonsContainer.append(viewLikedButton, removeLikedButton)
            // Append the buttons container to the "saved ad" container
            savedAdDOM.append(buttonsContainer)
            // Append the ad to the saved ads container
            likedContainer.append(savedAdDOM)
        })
    }
    // If no property is liked by the user, we hide buttons and replace the content with "You dont' have any liked properties"
    else {
        buttonLeft.style.display = "none";
        buttonRight.style.display = "none"
        likedContainer.innerHTML = '<h3>You don\'t have any liked properties</h3>';
        likedContainer.style.padding = "0"
    }
}

// Renders the Ads to the DOM
const renderAds = (adsArray) => {
    const container = document.querySelector('.properties-container');
    const resultsCount = document.createElement('h2')

    // Show the length of the results returned
    resultsCount.textContent = `Results found : ${filterAds().length}`
    resultsCount.classList = 'results-count'
    container.append(resultsCount)

    // Iterate over each element(property) in the array and append it to the DOM
    adsArray.forEach((element) => {
        // The container of each property
        const ad = document.createElement('div');
        ad.className = 'property';
        ad.id = element.id

        // When retrieved the "published at" data back from the local storage, the format we get is "2019-05-17 17:33:46",
        // therefore, we turn it back to a Moment.js object, so we can use the methods.
        let publishedStringToObject = moment(element.published);
        // Calculate the difference from now
        let whenIsPublished = publishedStringToObject.fromNow();
        // Get the current time
        let now = new moment()
        // Get the result in days (e.g. 10.4 days)
        let inDays = moment.duration(now.diff(element.published)).asDays();
        // We parse it to be an int, and not float
        let inDaysInt = parseInt(inDays);
        // An empty "published" var which is assigned down below
        let published = '';


        // Create the "View" button in the property
        const viewButton = document.createElement('button');
        viewButton.id = element.id;
        viewButton.className = "viewButton"
        viewButton.textContent = 'View Ad'
        // When clicked, we change(assign) the url to the property's id, to be able to view it as an individual property
        viewButton.addEventListener('click', (e) => {
            // Retrieve the id of the property container, therefore we go 2 levels of parents above (1.buttons-container, 2. property)
            let id = e.target.parentNode.parentNode.id
            // Simply assign the url to the id of the property, to view it individually
            location.assign(`/ad.html#${id}`)
        })


        // Create the "Like" button
        const likeButton = document.createElement('button');
        likeButton.className = 'likeButton'
        // If clicked, trigger the likeAd
        likeButton.addEventListener('click', (e) => {
            // Like the property
            // If it is already liked, we dislike it !!!!
            likeAd(e);
        })
        // Check if the property is already liked and whether it exist in the like ads array
        let isLiked = likedAds.filter((ad) => {
            return element.id === ad.id
        })
        // If it is liked already
        if (isLiked[0]) {
            // Assign the text value of the like button to "Dislike" and make it red
            likeButton.textContent = "Dislike"
            likeButton.style.backgroundColor = "#b03c3c"
            // Set the element to liked
            element.liked = true;
        }
        // If it is not liked already
        else {
            // Assign the text value of the like button to "Like" 
            likeButton.textContent = "Like"
            // Remove the red background if it was assigned before
            likeButton.style.backgroundColor = ""
            // Set the element to false
            element.liked = false;
        }
        // Create Buttons container in the property
        const buttonContainer = document.createElement('div')
        buttonContainer.className = "property-buttons"

        // If the property is published for more than a day, show when is published (including years and months - e.g. a month ago)
        // If the property is published an hour or five hours ago, we still display it as published "Today", not "published 4hrs ago"
        inDaysInt >= 1 ? published = whenIsPublished : published = "Today"
        // <!--If you want to display "4hrs ago" or "few hours ago", simply comment the above code and uncomment this one --!>
        // published = whenIsPublished 


        // Initial plot size is 0
        let plotSize = 0;
        // If the plotArea is null in the object, we set the plot size to "Not specified"
        // If the property has a specified plot area, we simply assign the plot size + the square meters html tag
        element.plotArea === null ? plotSize = "Not specificed" : plotSize = `${element.plotArea} <sup>m2</sup>`

        // Initialize the balcony , roof terrace and garden variables
        let hasBalcony;
        let hasRoofTerrace;
        let hasGarden;

        // If the element.(balcony,roofTerrace,garden) is true, we render a Tick icon, if it is false, we render a cross 
        element.balcony ? hasBalcony = '<i class="fas fa-check check"></i>' : hasBalcony = '<i class="fas fa-times cross"></i>'
        element.roofTerrace ? hasRoofTerrace = '<i class="fas fa-check check"></i>' : hasRoofTerrace = '<i class="fas fa-times cross"></i>'
        element.garden ? hasGarden = '<i class="fas fa-check check"></i>' : hasGarden = '<i class="fas fa-times cross"></i>'

        // The ad(property) container
        ad.innerHTML =
            // ${(element.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') formats the price from $100000 to $100.000.00
            `
            <div class="property-photo">
             <img src=${element.photo}>
            </div>
            <div class="property-details">
                <h3>${element.adress}</h3>
                <p><span class="bold"><i class="fas fa-euro-sign"></i> ${(element.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} </span></p>
                <p><span class="bold"><i class="fas fa-map-marker-alt"></i> ${element.city} , ${element.postcode}</span></p>
                <p><span class="bold">${element.rooms} rooms</span></p>
                <p>Floor: <span class="bold">${element.floorArea} <sup>m2</sup></span></p>
                <p>Plot: <span class="bold">${plotSize}</span></p>
                <p>Construction type : <span class="bold">${element.constructionType}</span></p>
                <div class="utilities">
                    <p>Balcony : <span class="bold">${hasBalcony}</span></p>
                    <p>Roof terrace : <span class="bold">${hasRoofTerrace}</p>
                    <p>Garden : <span class="bold">${hasGarden}</span></p>
                </div>
                <p><span class="bold"><i class="fas fa-calendar-alt"></i> ${published}</span></p>
            </div>
            `
        // Append the buttons to buttons container
        buttonContainer.append(likeButton, viewButton)
        // Append the buttons container
        ad.appendChild(buttonContainer)
        // Append the ad(property) to the properties container
        container.append(ad);
    });
};