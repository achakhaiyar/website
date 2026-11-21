
/* =========================================
   CRAVE & CO. - JAVASCRIPT
========================================= */

// -----------------------------------------
// DOM ELEMENTS
// -----------------------------------------

const cartCount = document.getElementById("cartCount");
const cartButton = document.getElementById("cartButton");
const foodGrid = document.getElementById("foodGrid");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".category-card");
const noResults = document.getElementById("noResults");
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const newsletterForm = document.getElementById("newsletterForm");
const emailInput = document.getElementById("emailInput");


// -----------------------------------------
// APPLICATION STATE
// -----------------------------------------

let cart = [];
let cartTotal = 0;
let selectedCategory = "all";
let searchText = "";


// -----------------------------------------
// TOAST NOTIFICATION
// -----------------------------------------

let toastTimer;

function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


// -----------------------------------------
// ADD TO CART
// -----------------------------------------

function addToCart(name, price) {

    price = Number(price);

    cart.push({
        name: name,
        price: price
    });

    cartTotal += price;

    updateCartCount();

    showToast(`${name} added to your cart!`);
}


// -----------------------------------------
// UPDATE CART COUNT
// -----------------------------------------

function updateCartCount() {

    cartCount.textContent = cart.length;

    // Small animation when the cart changes
    cartCount.style.transform = "scale(1.3)";

    setTimeout(() => {
        cartCount.style.transform = "scale(1)";
    }, 150);
}


// -----------------------------------------
// ADD BUTTON EVENT LISTENERS
// -----------------------------------------

document.querySelectorAll(".add-button").forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = button.dataset.price;

        addToCart(name, price);

    });

});


// -----------------------------------------
// CART SUMMARY
// -----------------------------------------

cartButton.addEventListener("click", () => {

    if (cart.length === 0) {

        showToast("Your cart is currently empty!");

        return;
    }

    const cartItems = cart.map(item => {
        return `${item.name} - ₹${item.price}`;
    });

    const cartSummary = cartItems.join("\n");

    alert(
        `YOUR CART\n\n` +
        `${cartSummary}\n\n` +
        `Total Items: ${cart.length}\n` +
        `Total Amount: ₹${cartTotal}`
    );

});


// -----------------------------------------
// CATEGORY FILTER
// -----------------------------------------

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active class from all categories
        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Activate selected category
        button.classList.add("active");

        selectedCategory = button.dataset.category;

        filterFood();

    });

});


// -----------------------------------------
// SEARCH FOOD
// -----------------------------------------

searchInput.addEventListener("input", () => {

    searchText = searchInput.value.trim().toLowerCase();

    filterFood();

});


// -----------------------------------------
// FILTER FUNCTION
// -----------------------------------------

function filterFood() {

    const foodCards = document.querySelectorAll(".food-card");

    let visibleItems = 0;

    foodCards.forEach(card => {

        const category = card.dataset.category;
        const name = card.dataset.name.toLowerCase();

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        const matchesSearch =
            name.includes(searchText);

        const shouldDisplay =
            matchesCategory && matchesSearch;

        if (shouldDisplay) {

            card.classList.remove("hidden");

            visibleItems++;

        } else {

            card.classList.add("hidden");

        }

    });

    // Display a message if no food items match
    if (visibleItems === 0) {

        noResults.classList.add("show");

    } else {

        noResults.classList.remove("show");

    }

}


// -----------------------------------------
// FAVORITE BUTTONS
// -----------------------------------------

document.querySelectorAll(".favorite-button").forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("favorited");

        const icon = button.querySelector("i");

        if (button.classList.contains("favorited")) {

            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");

            showToast("Added to your favorites ❤️");

        } else {

            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");

            showToast("Removed from favorites");

        }

    });

});


// -----------------------------------------
// MOBILE NAVIGATION
// -----------------------------------------

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("show");

    const icon = menuToggle.querySelector("i");

    if (navLinks.classList.contains("show")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


// -----------------------------------------
// NEWSLETTER
// -----------------------------------------

newsletterForm.addEventListener("submit", event => {

    event.preventDefault();

    const email = emailInput.value.trim();

    if (email) {

        showToast("Thank you for subscribing! 🎉");

        newsletterForm.reset();

    }

});


// -----------------------------------------
// NAVIGATION ACTIVE STATE
// -----------------------------------------

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

});


// -----------------------------------------
// INITIALIZATION
// -----------------------------------------

console.log("🍔 Crave & Co. website loaded successfully!");
