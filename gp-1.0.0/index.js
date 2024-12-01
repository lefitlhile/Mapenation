let map;  // Variable for the map instance

function fetchGoogleReviews() {
    const apiKey = 'AIzaSyC0-E0tL24jnXMUMqOhpunrpGyM2DmHwm8';
    const placeId = 'ChIJl_DrxMUdlR4RWLTVTviBd9Y';  

    const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&fields=reviews,geometry,name,formatted_address&key=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.result && data.result.reviews) {
                const reviews = data.result.reviews;
                const place = data.result;

                displayReviews(reviews);
                initMap(place.geometry.location.lat, place.geometry.location.lng, place.name, place.formatted_address);
            } else {
                console.error('No reviews found in the response');
            }
        })
        .catch(error => {
            console.error('Error fetching Google reviews:', error);
        });
}

function displayReviews(reviews) {
    const testimonialsContainer = document.querySelector('.swiper-wrapper');
    testimonialsContainer.innerHTML = '';  // Clear existing testimonials

    if (Array.isArray(reviews) && reviews.length > 0) {
        reviews.forEach(review => {
            const testimonial = document.createElement('div');
            testimonial.classList.add('swiper-slide');
            testimonial.classList.add('testimonial-item');

            const reviewHTML = `
                <img src="${review.profile_photo_url}" class="testimonial-img" alt="">
                <h3>${review.author_name}</h3>
                <h4>${review.author_type}</h4>
                <div class="stars">
                    ${'★'.repeat(review.rating)}
                </div>
                <p>
                    <i class="bi bi-quote quote-icon-left"></i>
                    <span>${review.text}</span>
                    <i class="bi bi-quote quote-icon-right"></i>
                </p>
            `;

            testimonial.innerHTML = reviewHTML;
            testimonialsContainer.appendChild(testimonial);
        });

        // Reinitialize Swiper after adding new slides
        const swiper = new Swiper('.swiper', {
            loop: true,
            speed: 600,
            autoplay: { delay: 5000 },
            slidesPerView: 'auto',
            pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true }
        });
    } else {
        console.log('No reviews to display.');
    }
}

// Initialize Google Map
function initMap(lat, lng, name, address) {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: lat, lng: lng },
        zoom: 15
    });

    const marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        title: name
    });

    const infoWindow = new google.maps.InfoWindow({
        content: `<h3>${name}</h3><p>${address}</p>`
    });

    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });
}

// Call the function to fetch and display reviews
fetchGoogleReviews();
