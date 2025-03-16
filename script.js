
// Add to cart functionality
function addToCart() {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const customToast = document.getElementById("customToast");
    const cartCountElement = document.getElementById("cartCount");
    let cartItems = [];
    let cartCount = 0;

    addToCartButtons.forEach((button) => {
        button.addEventListener("click", function () {
            // Get product info
            const productName = this.getAttribute("data-product");

            // Add to cart array
            cartItems.push(productName);
            cartCount++;

            // Update cart count display
            cartCountElement.textContent = cartCount;

            // Show toast notification (existing functionality)
            customToast.style.backgroundColor = "rgba(0, 150, 0, 0.9)";
            customToast.textContent = `${productName} ditambahkan ke keranjang!`;
            customToast.classList.add("show");

            setTimeout(() => {
                customToast.classList.remove("show");
            }, 3000);
        });
    });

    // Add cart button click handler
    const cartBtn = document.getElementById("cartBtn");
    if (cartBtn) {
        cartBtn.addEventListener("click", function () {
            if (cartItems.length > 0) {
                alert('Isi Keranjang:\n' + cartItems.join('\n'));
            } else {
                alert('Keranjang belanja kosong');
            }
        });
    }
}

// Register button functionality
function registerButton() {
    const registerBtn = document.getElementById("registerBtn");
    if (registerBtn) {
        registerBtn.addEventListener("mouseover", function () {
            this.classList.add("animate__animated", "animate__pulse");
        });

        registerBtn.addEventListener("mouseout", function () {
            this.classList.remove("animate__animated", "animate__pulse");
        });

        registerBtn.addEventListener("click", function () {
            window.location.href = "#home";
        });
    }
}

// Contact form functionality
function contactForm() {
    // Contact form submission
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const subject = document.getElementById("subject").value;
            const message = document.getElementById("message").value;

            if (name && email && subject && message) {
                // Here you'd normally send the data to a server
                customToast.textContent = "Pesan berhasil dikirim! Kami akan segera menghubungi Anda.";
                customToast.style.backgroundColor = "rgba(0, 150, 0, 0.9)";
                customToast.classList.add("show");

                setTimeout(() => {
                    customToast.classList.remove("show");
                }, 3000);

                contactForm.reset();
            } else {
                customToast.textContent = "Harap isi semua kolom yang diperlukan!";
                customToast.style.backgroundColor = "rgba(220, 53, 69, 0.9)";
                customToast.classList.add("show");

                setTimeout(() => {
                    customToast.classList.remove("show");
                }, 3000);
            }
        });
    }
}

// Search bar functionality
function searchBar() {
    const searchInput = document.querySelector(".search-input");
    if (searchInput) {
        searchInput.addEventListener("keyup", function (e) {
            if (e.key === "Enter") {
                const searchTerm = searchInput.value.toLowerCase();
                customToast.textContent = `Mencari: ${searchTerm}`;
                customToast.style.backgroundColor = "rgba(0, 123, 255, 0.9)";
                customToast.classList.add("show");

                setTimeout(() => {
                    customToast.classList.remove("show");
                }, 3000);
            }
        });
    }
}

// Animate elements on scroll
function animateScroll() {
    const animateOnScroll = () => {
        const elements = document.querySelectorAll(".product-card, .feature-box, .product-item");

        elements.forEach((element) => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }
        });
    };

    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll();
}

// Toggle theme and change logo functionality
function toogleTheme() {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');
    const themeLogo = document.getElementById('themeLogo');
    const body = document.body;

    // Check saved theme
    const savedTheme = localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    // Function to update logo
    function updateLogo(isDark) {
        themeLogo.src = isDark ? 'assets/logo/black-logo.png' : 'assets/logo/light-logo.png';
    }

    // Apply saved theme
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        updateLogo(true);
    }

    // Handle theme toggle
    themeToggleBtn.addEventListener('click', function () {
        body.classList.toggle('dark-theme');
        const isDark = body.classList.contains('dark-theme');

        // Update logo
        updateLogo(isDark);

        // Update icon with animation
        themeIcon.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeIcon.classList.replace(
                isDark ? 'fa-sun' : 'fa-moon',
                isDark ? 'fa-moon' : 'fa-sun'
            );
            themeIcon.style.transform = 'rotate(0)';
        }, 200);

        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// Auto-scrolling product tabs functionality
function productTabsAutoScroll() {
    const tabs = ['hp-tab', 'tablet-tab', 'laptop-tab'];
    const tabPanes = ['hp', 'tablet', 'laptop'];
    let currentTabIndex = 0;
    let interval;

    function animateProducts(oldPane, newPane) {
        // Animate old products out
        const oldProducts = document.querySelectorAll(`#${oldPane} .product-item`);
        oldProducts.forEach(product => {
            product.classList.add('sliding-out');
        });

        // Animate new products in
        setTimeout(() => {
            const newProducts = document.querySelectorAll(`#${newPane} .product-item`);
            newProducts.forEach(product => {
                product.classList.remove('sliding-out');
                product.classList.add('sliding-in');
            });
        }, 300);
    }

    function switchTab() {
        const currentTab = document.getElementById(tabs[currentTabIndex]);
        const currentPane = document.getElementById(tabPanes[currentTabIndex]);

        // Get next tab index
        const nextTabIndex = (currentTabIndex + 1) % tabs.length;

        // Switch tabs
        currentTab.classList.remove('active');
        document.getElementById(tabs[nextTabIndex]).classList.add('active');

        // Animate products
        animateProducts(tabPanes[currentTabIndex], tabPanes[nextTabIndex]);

        // Update content
        currentPane.classList.remove('show', 'active');
        document.getElementById(tabPanes[nextTabIndex]).classList.add('show', 'active');

        // Update index
        currentTabIndex = nextTabIndex;
    }

    // Start auto-scrolling
    interval = setInterval(switchTab, 3000);

    // Pause on user interaction
    const tabContainer = document.getElementById('productTabs');
    const productSection = document.getElementById('products');

    tabContainer.addEventListener('mouseenter', () => clearInterval(interval));
    productSection.addEventListener('touchstart', () => clearInterval(interval));

    // Resume on mouse leave
    tabContainer.addEventListener('mouseleave', () => {
        clearInterval(interval);
        interval = setInterval(switchTab, 3000);
    });

    productSection.addEventListener('touchend', () => {
        clearInterval(interval);
        interval = setInterval(switchTab, 3000);
    });

    // Handle manual tab clicks
    tabs.forEach((tabId, index) => {
        document.getElementById(tabId).addEventListener('click', () => {
            clearInterval(interval);
            currentTabIndex = index;
            interval = setInterval(switchTab, 5000);
        });
    });
}

// Initialize DOM
document.addEventListener('DOMContentLoaded', function () {
    addToCart();
    registerButton();
    contactForm();
    searchBar();
    animateScroll();
    toogleTheme();
    productTabsAutoScroll();
});