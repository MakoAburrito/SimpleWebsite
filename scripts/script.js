// Get the audio element
const audio = document.getElementById('audio');
let isGif1Visible = true;
let isAudioPlaying = false;

/*Script for navigation bar popup*/
const toggleButton = document.getElementsByClassName('togglebtn')[0]
const navbarLinks = document.getElementsByClassName('MenuItem')

toggleButton.addEventListener('click', () => {
    /*For Loop used to toggle each to .active using the get elements by using a string that stores each menu item */
    for (let i = 0; i < navbarLinks.length; i++) {
        navbarLinks[i].classList.toggle('active');
    }
})
/*Script for random sound bite */
// Get all grid items
const gridItems = document.querySelectorAll('.GridItem');
const LinkItems = document.querySelectorAll('.LinkItems');

// Function to play a random sound
    function playRandomSound() {
// Generate a random number between 1 and 3 (inclusive)
    const randomNum = Math.floor(Math.random() * 3) + 1;
// Get the corresponding audio element
    const audio = document.getElementById(`sound${randomNum}`);
    // Play the audio
    audio.play();
    }

// Attach event listeners to each grid item
gridItems.forEach(gridItem => {
        gridItem.addEventListener('mouseenter', playRandomSound);
});
LinkItems.forEach(LinkItems => {
    LinkItems.addEventListener('mouseenter', playRandomSound);
});

// Get the element to animate
window.addEventListener('scroll', reveal);

function reveal(){

    var reveals = document.querySelectorAll('.timelineContainer');
    for(var i = 0; i < reveals.length; i++){

        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 650;

        if (revealtop < windowheight - revealpoint){
            reveals[i].classList.add('activeScroll');
        }else{
            reveals[i].classList.remove('activeScroll');
        }
    }
}


/*script for infinite scrolling bar*/
/* Used this as a video to reference the code from most of it is following this tutorial
https://www.youtube.com/watch?v=6QE8dXq9SOE&t=605s&ab_channel=CodingNepal

The concept of the script though is adding the new class dragging to the ul .carousel class
which them manipulates it to reactively pull the card deck side to side based on mouse position from the left.

I changed the layout of how the card were and the classes to suit the css styles I made
and did very minimal tweaks to the js as this unfortunately was out of my skill range.

I did however learn alot of concepts from this :>!
*/
const WrapperCarousel = document.querySelector(".WrapperCarousel");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".WrapperCarousel i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children]

let isDragging = false, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens.slice(-cardPerView).reverse().forEach(card =>{
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carouselChildrens.slice (0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

arrowBtns.forEach(btn => {
    btn.addEventListener ("click", () => {
        console.log(btn.id); /*<- This is just to check the log if the arrow icons are working in the log */
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging"); /*Stops code from dragging text when sliding card using css*/
    //Record the initial cursor and scroll position of the carousel
    startX = e.pageX
    startScrollLeft = carousel.scrollLeft;

}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    //Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft =  startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const autoPlay = () => {
    if (window.innerWidth < 800) return;
    //Autoplay the card
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 3500);
}
autoPlay();

const infiniteScroll = () => {
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    } else if ( Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
    //Clear existing time if mouse not hover carousel.
    clearTimeout(timeoutId);
    if(!WrapperCarousel.matches(":hover")) autoPlay();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);

//changing gifs and pausing/stopping music when swapped back to original none hidden gif.

function toggleGifs() {
    const gif1 = document.getElementById('gif1');
    const gif2 = document.getElementById('gif2');
    const audio = document.getElementById('audio');

    if (isGif1Visible) {
        gif1.style.display = 'none';
        gif2.style.display = 'inline-block';
        if (!isAudioPlaying) {
            audio.play();
            isAudioPlaying = true;
        }
    } else {
        gif1.style.display = 'inline-block';
        gif2.style.display = 'none';
        if (isAudioPlaying) {
            audio.pause();
            audio.currentTime = 0;
            isAudioPlaying = false;
        }
    }

    isGif1Visible = !isGif1Visible;
}