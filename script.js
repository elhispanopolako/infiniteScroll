const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photosArr = []
let ready = false
let imagesLoaded = 0
let totalImages = 0
let initialLoad = true


const count = 5
const apiKey = 'secret'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}
function imageLoaded() {
    imagesLoaded++
    if (imagesLoaded === totalImages) {
        ready = true
        loader.hidden = true
        initialLoad = false
        count = 30
    }
}

function displayPhotos() {
    imagesLoaded = 0
    totalImages = photosArr.length
    console.log('totalImg:', + totalImages)
    photosArr.forEach((photo) => {
        const item = document.createElement('a')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        const img = document.createElement('img')
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            tittle: photo.alt_description
        })
        img.addEventListener('load', () => imageLoaded())
        item.appendChild(img)
        imageContainer.appendChild(item)
    })

}



async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        photosArr = await response.json()
        displayPhotos()
    } catch (error) {
        loader.hidden = true
        const errorPage = document.createElement('h2')
        let errorPageText = document.createTextNode('ERROR ' + error)
        errorPage.appendChild(errorPageText)
        imageContainer.appendChild(errorPage)
    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getPhotos()
    }

})

getPhotos()