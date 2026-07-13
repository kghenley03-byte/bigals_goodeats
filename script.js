// Sample Menu Data
const menuData = [
    {
        id: 1,
        name: 'Fried Chicken',
        category: 'entrees',
        price: '$12.99',
        description: 'Crispy golden fried chicken, served with your choice of sides',
        emoji: '🍗'
    },
    {
        id: 2,
        name: 'Mac & Cheese',
        category: 'sides',
        price: '$6.99',
        description: 'Creamy, homemade mac and cheese with a crispy top',
        emoji: '🧀'
    },
    {
        id: 3,
        name: 'Meatloaf Special',
        category: 'entrees',
        price: '$13.99',
        description: 'Tender meatloaf with gravy, served with mashed potatoes',
        emoji: '🥩'
    },
    {
        id: 4,
        name: 'Collard Greens',
        category: 'sides',
        price: '$5.99',
        description: 'Southern-style collard greens with bacon',
        emoji: '🥬'
    },
    {
        id: 5,
        name: 'Cornbread',
        category: 'sides',
        price: '$3.99',
        description: 'Golden, buttery cornbread fresh from the oven',
        emoji: '🌽'
    },
    {
        id: 6,
        name: 'Peach Cobbler',
        category: 'desserts',
        price: '$7.99',
        description: 'Warm peach cobbler with vanilla ice cream',
        emoji: '🍑'
    },
    {
        id: 7,
        name: 'Baked Fish',
        category: 'entrees',
        price: '$14.99',
        description: 'Fresh baked fish fillet with lemon butter sauce',
        emoji: '🐟'
    },
    {
        id: 8,
        name: 'Sweet Potato Pie',
        category: 'desserts',
        price: '$8.99',
        description: 'Classic sweet potato pie with cinnamon spice',
        emoji: '🥧'
    }
];

// Sample Gallery Data
const galleryData = [
    { id: 1, title: 'Fried Chicken Plate', emoji: '🍗' },
    { id: 2, title: 'Mac & Cheese', emoji: '🧀' },
    { id: 3, title: 'Meatloaf Special', emoji: '🥩' },
    { id: 4, title: 'Peach Cobbler', emoji: '🍑' },
    { id: 5, title: 'Baked Fish', emoji: '🐟' },
    { id: 6, title: 'Cornbread', emoji: '🌽' }
];

// Sample Reviews Data
const reviewsData = [
    {
        id: 1,
        author: 'Maria Santos',
        rating: 5,
        text: 'The best home-cooked food in Miami! Everything is so fresh and delicious. Highly recommended!'
    },
    {
        id: 2,
        author: 'John Martinez',
        rating: 5,
        text: 'Quick delivery, hot food, and amazing flavors. This is now my go-to place!'
    },
    {
        id: 3,
        author: 'Patricia Johnson',
        rating: 5,
        text: 'So authentic and tasty! Big Al really knows how to cook. Five stars!'
    },
    {
        id: 4,
        author: 'Robert Lee',
        rating: 5,
        text: 'Pickup was ready when I arrived, and the food is consistently great every time.'
    },
    {
        id: 5,
        author: 'Angela Davis',
        rating: 5,
        text: 'Family loves it! We order at least twice a week. Keep up the great work!'
    },
    {
        id: 6,
        author: 'Carlos Hernandez',
        rating: 5,
        text: 'Best home-cooked meals around. Definitely my favorite spot in Broward!'
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderMenuItems('all');
    renderGallery();
    renderReviews();
    setupNavigation();
    setupMenuFilters();
    setupContactForm();
    setupMobileMenu();
});

// Render Menu Items
function renderMenuItems(category) {
    const menuGrid = document.getElementById('menuGrid');
    const items = category === 'all' 
        ? menuData 
        : menuData.filter(item => item.category === category);

    menuGrid.innerHTML = items.map(item => `
        <div class="menu-item" data-category="${item.category}">
            <div class="menu-item-image">
                ${item.emoji}
            </div>
            <div class="menu-item-content">
                <div class="menu-item-name">${item.name}</div>
                <div class="menu-item-description">${item.description}</div>
                <div class="menu-item-price">${item.price}</div>
            </div>
        </div>
    `).join('');
}

// Render Gallery
function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = galleryData.map(item => `
        <div class="gallery-item">
            <div class="gallery-item-image" style="display: flex; align-items: center; justify-content: center; font-size: 4rem;">
                ${item.emoji}
            </div>
            <div class="gallery-item-overlay">
                <i class="fas fa-search-plus"></i>
            </div>
        </div>
    `).join('');
}

// Render Reviews
function renderReviews() {
    const reviewsGrid = document.getElementById('reviewsGrid');
    reviewsGrid.innerHTML = reviewsData.map(review => `
        <div class="review-card">
            <div class="review-stars">
                ${'⭐'.repeat(review.rating)}
            </div>
            <div class="review-text">
                "${review.text}"
            </div>
            <div class="review-author">
                - ${review.author}
            </div>
        </div>
    `).join('');
}

// Menu Filter Buttons
function setupMenuFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderMenuItems(btn.dataset.filter);
        });
    });
}

// Navigation Active State
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll on link click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                closeMobileMenu();
            }
        });
    });
}

// Contact Form
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! We received your message. We will get back to you soon!');
            form.reset();
        });
    }
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.remove('active');
}
