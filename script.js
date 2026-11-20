
/* =====================================================
   DIY CRAFT SUPPLIES E-COMMERCE WEBSITE
   STAGE 8: ORDER CONFIRMATION
   Includes Stages 1-7
   ===================================================== */


// =====================================================
// 1. MOBILE MENU
// =====================================================

const menuItems = document.getElementById("MenuItems");

if (menuItems) {
    menuItems.style.maxHeight = "0px";
}

function menutoggle() {
    if (!menuItems) return;

    if (menuItems.style.maxHeight === "0px") {
        menuItems.style.maxHeight = "200px";
    } else {
        menuItems.style.maxHeight = "0px";
    }
}


// =====================================================
// 2. PRODUCT DATA
// =====================================================

const products = [
    { id: 1, name: "Colour Pencil Set", price: 100, image: "pencil.png", category: "Drawing", type: "featured" },
    { id: 2, name: "Coloured Buttons", price: 50, image: "buttons.png", category: "Craft", type: "featured" },
    { id: 3, name: "Origami Paper Set", price: 259, image: "paper.png", category: "Paper Craft", type: "featured" },
    { id: 4, name: "Colour Acrylic Paints", price: 399, image: "acrylic.png", category: "Painting", type: "featured" },
    { id: 5, name: "Colour Palette", price: 120, image: "01.png", category: "Painting", type: "latest" },
    { id: 6, name: "Pack of Brushes", price: 350, image: "02.png", category: "Painting", type: "latest" },
    { id: 7, name: "DIY Cutting Stamps", price: 150, image: "03.png", category: "Craft", type: "latest" },
    { id: 8, name: "Coloured Beads Set", price: 100, image: "04.png", category: "Craft", type: "latest" },
    { id: 9, name: "Coloured Mystery Set", price: 199, image: "05.png", category: "Craft", type: "latest" },
    { id: 10, name: "Pack of DIY Craft", price: 299, image: "06.png", category: "DIY", type: "latest" },
    { id: 11, name: "Glitter Paper Set", price: 259, image: "07.png", category: "Paper Craft", type: "latest" },
    { id: 12, name: "Glitter Glue Pens", price: 89, image: "08.png", category: "Craft", type: "latest" }
];


// =====================================================
// 3. GET HTML ELEMENTS
// =====================================================

const featuredProductsContainer =
    document.getElementById("featuredProducts");

const latestProductsContainer =
    document.getElementById("latestProducts");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const clearFiltersButton =
    document.getElementById("clearFilters");

const featuredTitle =
    document.getElementById("featuredTitle");

const latestTitle =
    document.getElementById("latestTitle");

const noResultsMessage =
    document.getElementById("noResultsMessage");

const cartItemsContainer =
    document.getElementById("cartItems");

const emptyCartMessage =
    document.getElementById("emptyCartMessage");

const cartSummary =
    document.getElementById("cartSummary");

const cartCount =
    document.getElementById("cartCount");

const cartQuantityTotal =
    document.getElementById("cartQuantityTotal");

const cartTotal =
    document.getElementById("cartTotal");

const clearCartButton =
    document.getElementById("clearCartBtn");

const wishlistItemsContainer =
    document.getElementById("wishlistItems");

const emptyWishlistMessage =
    document.getElementById("emptyWishlistMessage");

const wishlistCount =
    document.getElementById("wishlistCount");

const checkoutSection =
    document.getElementById("checkout");

const proceedToCheckoutButton =
    document.getElementById("proceedToCheckoutBtn");

const backToCartButton =
    document.getElementById("backToCartBtn");

const checkoutForm =
    document.getElementById("checkoutForm");

const checkoutOrderItems =
    document.getElementById("checkoutOrderItems");

const checkoutOrderQuantity =
    document.getElementById("checkoutOrderQuantity");

const checkoutOrderTotal =
    document.getElementById("checkoutOrderTotal");

const checkoutMessage =
    document.getElementById("checkoutMessage");

const offerBuyButton =
    document.getElementById("offerBuyBtn");


// =====================================================
// 4. LOCAL STORAGE KEYS
// =====================================================

const CART_STORAGE_KEY = "diyCraftSuppliesCart";

const WISHLIST_STORAGE_KEY = "diyCraftSuppliesWishlist";

const ORDERS_STORAGE_KEY = "diyCraftSuppliesOrders";

const LAST_ORDER_KEY = "diyCraftSuppliesLastOrder";


// =====================================================
// 5. LOAD SAVED CART
// =====================================================

function loadCartFromStorage() {

    try {
        const savedData =
            localStorage.getItem(CART_STORAGE_KEY);

        if (!savedData) return [];

        const savedCart = JSON.parse(savedData);

        if (!Array.isArray(savedCart)) return [];

        const validCart = [];

        savedCart.forEach(function (item) {

            if (!item) return;

            const productId = Number(item.id);

            const quantity = Number(item.quantity);

            const exists = products.some(function (product) {
                return product.id === productId;
            });

            if (
                !exists ||
                !Number.isSafeInteger(quantity) ||
                quantity < 1
            ) {
                return;
            }

            const existingItem = validCart.find(function (cartItem) {
                return cartItem.id === productId;
            });

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                validCart.push({
                    id: productId,
                    quantity: quantity
                });
            }

        });

        return validCart;

    } catch (error) {
        console.error("Cart loading error:", error);
        return [];
    }
}


// =====================================================
// 6. LOAD SAVED WISHLIST
// =====================================================

function loadWishlistFromStorage() {

    try {
        const savedData =
            localStorage.getItem(WISHLIST_STORAGE_KEY);

        if (!savedData) return [];

        const savedWishlist = JSON.parse(savedData);

        if (!Array.isArray(savedWishlist)) return [];

        return [...new Set(
            savedWishlist.map(Number).filter(function (id) {
                return products.some(function (product) {
                    return product.id === id;
                });
            })
        )];

    } catch (error) {
        console.error("Wishlist loading error:", error);
        return [];
    }
}


// Restore previously saved data.

let cart = loadCartFromStorage();

let wishlist = loadWishlistFromStorage();


// =====================================================
// 7. SAVE CART AND WISHLIST
// =====================================================

function saveCartToStorage() {

    try {
        localStorage.setItem(
            CART_STORAGE_KEY,
            JSON.stringify(cart)
        );
    } catch (error) {
        console.error("Cart saving error:", error);
    }
}


function saveWishlistToStorage() {

    try {
        localStorage.setItem(
            WISHLIST_STORAGE_KEY,
            JSON.stringify(wishlist)
        );
    } catch (error) {
        console.error("Wishlist saving error:", error);
    }
}


// =====================================================
// 8. PRICE FORMAT
// =====================================================

function formatPrice(amount) {
    return "$" + amount.toFixed(2);
}


// =====================================================
// 9. ESCAPE CUSTOMER INPUT
// =====================================================

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, function (character) {

        const characters = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return characters[character];
    });
}


// =====================================================
// 10. CREATE PRODUCT CARD
// =====================================================

function createProductCard(product) {

    const isWishlisted = wishlist.includes(product.id);

    return `
        <div class="col-4 product-card"
             data-product-id="${product.id}">

            <img
                src="${product.image}"
                alt="${product.name}"
                class="product-image"
            >

            <h4 class="product-name">
                ${product.name}
            </h4>

            <div class="rating">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-regular fa-star"></i>
            </div>

            <p class="product-price">
                ${formatPrice(product.price)}
            </p>

            <button
                type="button"
                class="btn add-to-cart"
                data-product-id="${product.id}">
                Add to Cart
            </button>

            <button
                type="button"
                class="wishlist-btn"
                data-wishlist-action="toggle"
                data-product-id="${product.id}">
                ${isWishlisted ? "♥ Saved" : "♡ Add to Wishlist"}
            </button>

        </div>
    `;
}


// =====================================================
// 11. SEARCH AND CATEGORY FILTER
// =====================================================

function renderProducts() {

    if (!featuredProductsContainer ||
        !latestProductsContainer) {
        return;
    }

    const searchText = searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";

    const selectedCategory = categoryFilter
        ? categoryFilter.value
        : "all";

    const filteredProducts = products.filter(function (product) {

        const matchesSearch =
            product.name.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const featured = filteredProducts.filter(function (product) {
        return product.type === "featured";
    });

    const latest = filteredProducts.filter(function (product) {
        return product.type === "latest";
    });

    featuredProductsContainer.innerHTML =
        featured.map(createProductCard).join("");

    latestProductsContainer.innerHTML =
        latest.map(createProductCard).join("");

    if (featuredTitle) {
        featuredTitle.style.display =
            featured.length > 0 ? "" : "none";
    }

    if (latestTitle) {
        latestTitle.style.display =
            latest.length > 0 ? "" : "none";
    }

    if (noResultsMessage) {
        noResultsMessage.style.display =
            filteredProducts.length === 0 ? "block" : "none";
    }

    console.log("Matching products:", filteredProducts.length);
}


if (searchInput) {
    searchInput.addEventListener("input", renderProducts);
}

if (categoryFilter) {
    categoryFilter.addEventListener("change", renderProducts);
}

if (clearFiltersButton) {

    clearFiltersButton.addEventListener("click", function () {

        if (searchInput) searchInput.value = "";

        if (categoryFilter) categoryFilter.value = "all";

        renderProducts();

    });
}


// =====================================================
// 12. ADD PRODUCT TO CART
// =====================================================

function addToCart(productId) {

    const product = products.find(function (item) {
        return item.id === productId;
    });

    if (!product) return;

    const existingItem = cart.find(function (item) {
        return item.id === productId;
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: productId,
            quantity: 1
        });
    }

    saveCartToStorage();

    renderCart();

    console.log(product.name + " added to cart.");
}


// =====================================================
// 13. DISPLAY SHOPPING CART
// =====================================================

function renderCart() {

    const totalQuantity = cart.reduce(function (total, item) {
        return total + item.quantity;
    }, 0);

    if (cartCount) {
        cartCount.textContent = totalQuantity;
    }

    if (!cartItemsContainer) return;

    if (cart.length === 0) {

        cartItemsContainer.innerHTML = "";

        if (emptyCartMessage) {
            emptyCartMessage.style.display = "block";
        }

        if (cartSummary) {
            cartSummary.style.display = "none";
        }

        if (cartQuantityTotal) {
            cartQuantityTotal.textContent = "0";
        }

        if (cartTotal) {
            cartTotal.textContent = formatPrice(0);
        }

        if (checkoutOrderItems) {
            renderCheckoutSummary();
        }

        return;
    }

    cartItemsContainer.innerHTML = cart.map(function (item) {

        const product = products.find(function (product) {
            return product.id === item.id;
        });

        if (!product) return "";

        const itemTotal = product.price * item.quantity;

        return `
            <div class="cart-item">

                <img src="${product.image}" alt="${product.name}">

                <div class="cart-item-info">

                    <h4>${product.name}</h4>

                    <p class="cart-item-price">
                        Price: ${formatPrice(product.price)}
                    </p>

                    <div class="quantity-controls">

                        <button
                            type="button"
                            class="quantity-btn"
                            data-cart-action="decrease"
                            data-product-id="${product.id}"
                            ${item.quantity <= 1 ? "disabled" : ""}>
                            −
                        </button>

                        <span class="quantity-value">
                            ${item.quantity}
                        </span>

                        <button
                            type="button"
                            class="quantity-btn"
                            data-cart-action="increase"
                            data-product-id="${product.id}">
                            +
                        </button>

                    </div>
                </div>

                <div class="cart-item-total">

                    <strong>${formatPrice(itemTotal)}</strong>

                    <button
                        type="button"
                        class="remove-btn"
                        data-cart-action="remove"
                        data-product-id="${product.id}">
                        Remove
                    </button>

                </div>

            </div>
        `;

    }).join("");


    const totalPrice = cart.reduce(function (total, item) {

        const product = products.find(function (product) {
            return product.id === item.id;
        });

        return total + (product ? product.price * item.quantity : 0);

    }, 0);


    if (emptyCartMessage) {
        emptyCartMessage.style.display = "none";
    }

    if (cartSummary) {
        cartSummary.style.display = "block";
    }

    if (cartQuantityTotal) {
        cartQuantityTotal.textContent = totalQuantity;
    }

    if (cartTotal) {
        cartTotal.textContent = formatPrice(totalPrice);
    }

    renderCheckoutSummary();
}


// =====================================================
// 14. WISHLIST FUNCTIONS
// =====================================================

function toggleWishlist(productId) {

    const product = products.find(function (item) {
        return item.id === productId;
    });

    if (!product) return;

    if (wishlist.includes(productId)) {

        wishlist = wishlist.filter(function (id) {
            return id !== productId;
        });

    } else {

        wishlist.push(productId);

    }

    saveWishlistToStorage();

    renderProducts();

    renderWishlist();
}


function renderWishlist() {

    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
    }

    if (!wishlistItemsContainer) return;

    if (wishlist.length === 0) {

        wishlistItemsContainer.innerHTML = "";

        if (emptyWishlistMessage) {
            emptyWishlistMessage.style.display = "block";
        }

        return;
    }

    if (emptyWishlistMessage) {
        emptyWishlistMessage.style.display = "none";
    }

    const wishlistProducts = wishlist.map(function (id) {

        return products.find(function (product) {
            return product.id === id;
        });

    }).filter(Boolean);


    wishlistItemsContainer.innerHTML =
        wishlistProducts.map(function (product) {

            return `
                <div class="col-4 wishlist-card">

                    <img src="${product.image}" alt="${product.name}">

                    <h4>${product.name}</h4>

                    <p class="product-price">
                        ${formatPrice(product.price)}
                    </p>

                    <button
                        type="button"
                        class="btn add-to-cart"
                        data-product-id="${product.id}">
                        Add to Cart
                    </button>

                    <button
                        type="button"
                        class="wishlist-btn"
                        data-wishlist-action="remove"
                        data-product-id="${product.id}">
                        Remove from Wishlist
                    </button>

                </div>
            `;

        }).join("");
}


// =====================================================
// 15. CHECKOUT ORDER SUMMARY
// =====================================================

function renderCheckoutSummary() {

    if (!checkoutOrderItems) return;

    const totalQuantity = cart.reduce(function (total, item) {
        return total + item.quantity;
    }, 0);

    const totalPrice = cart.reduce(function (total, item) {

        const product = products.find(function (product) {
            return product.id === item.id;
        });

        return total + (product ? product.price * item.quantity : 0);

    }, 0);


    checkoutOrderItems.innerHTML = cart.map(function (item) {

        const product = products.find(function (product) {
            return product.id === item.id;
        });

        if (!product) return "";

        return `
            <div class="checkout-order-item">

                <span>
                    ${product.name} x ${item.quantity}
                </span>

                <strong>
                    ${formatPrice(product.price * item.quantity)}
                </strong>

            </div>
        `;

    }).join("");


    if (checkoutOrderQuantity) {
        checkoutOrderQuantity.textContent = totalQuantity;
    }

    if (checkoutOrderTotal) {
        checkoutOrderTotal.textContent = formatPrice(totalPrice);
    }
}


// =====================================================
// 16. OPEN CHECKOUT
// =====================================================

if (proceedToCheckoutButton) {

    proceedToCheckoutButton.addEventListener("click", function () {

        if (cart.length === 0) {
            alert("Your cart is empty. Please add products first.");
            return;
        }

        if (checkoutMessage) {
            checkoutMessage.textContent = "";
        }

        if (checkoutForm) {
            checkoutForm.reset();

            const submitButton = checkoutForm.querySelector(
                'button[type="submit"]'
            );

            if (submitButton) {
                submitButton.textContent = "Place Demo Order";
            }
        }

        renderCheckoutSummary();

        if (checkoutSection) {

            checkoutSection.style.display = "block";

            checkoutSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

}


// =====================================================
// 17. BACK TO CART
// =====================================================

if (backToCartButton) {

    backToCartButton.addEventListener("click", function () {

        if (checkoutSection) {
            checkoutSection.style.display = "none";
        }

        const cartSection = document.getElementById("cart");

        if (cartSection) {
            cartSection.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

}


// =====================================================
// 18. GENERATE UNIQUE ORDER NUMBER
// =====================================================

function generateOrderNumber() {

    const now = new Date();

    const datePart =
        now.getFullYear().toString() +
        String(now.getMonth() + 1).padStart(2, "0") +
        String(now.getDate()).padStart(2, "0");

    const timePart =
        String(now.getHours()).padStart(2, "0") +
        String(now.getMinutes()).padStart(2, "0") +
        String(now.getSeconds()).padStart(2, "0");

    const randomNumber =
        Math.floor(1000 + Math.random() * 9000);

    return `DIY-${datePart}-${timePart}-${randomNumber}`;
}


// =====================================================
// 19. SAVE ORDER DETAILS
// =====================================================

function saveOrderToStorage(order) {

    try {

        const previousOrdersData =
            localStorage.getItem(ORDERS_STORAGE_KEY);

        let orders = previousOrdersData
            ? JSON.parse(previousOrdersData)
            : [];

        if (!Array.isArray(orders)) {
            orders = [];
        }

        orders.push(order);

        localStorage.setItem(
            ORDERS_STORAGE_KEY,
            JSON.stringify(orders)
        );

        localStorage.setItem(
            LAST_ORDER_KEY,
            JSON.stringify(order)
        );

        console.log("Order confirmation saved successfully.");

        return true;

    } catch (error) {

        console.error("Order saving error:", error);

        return false;
    }
}


// =====================================================
// 20. CREATE ORDER CONFIRMATION
// =====================================================

function createOrderConfirmation(order, savedSuccessfully) {

    const customerName = escapeHTML(order.customer.name);
    const customerEmail = escapeHTML(order.customer.email);
    const customerPhone = escapeHTML(order.customer.phone);
    const customerAddress = escapeHTML(order.customer.address);
    const customerCity = escapeHTML(order.customer.city);
    const customerPincode = escapeHTML(order.customer.pincode);
    const paymentMethod = escapeHTML(order.paymentMethod);
    const orderNumber = escapeHTML(order.orderId);
    const orderDate = escapeHTML(order.date);

    const orderProducts = order.items.map(function (item) {

        return `
            <div class="checkout-order-item"
                 style="padding:12px 0;border-bottom:1px solid #eee;">

                <div>
                    <strong>${escapeHTML(item.name)}</strong>
                    <p style="color:#777;font-size:13px;">
                        Quantity: ${item.quantity}
                        x ${formatPrice(item.price)}
                    </p>
                </div>

                <strong>
                    ${formatPrice(item.subtotal)}
                </strong>

            </div>
        `;

    }).join("");


    return `
        <div class="small-container">

            <div class="order-confirmation"
                 style="max-width:850px;margin:40px auto;padding:30px;background:#fff;border:1px solid #ddd;border-radius:12px;">

                <div style="text-align:center;margin-bottom:30px;">

                    <div style="font-size:55px;color:#198754;">
                        <i class="fa-solid fa-circle-check"></i>
                    </div>

                    <h2 style="color:#198754;margin:10px 0;">
                        Order Placed Successfully!
                    </h2>

                    <p style="color:#666;">
                        Thank you for shopping with DIY Craft Supplies.
                    </p>

                </div>


                <div style="background:#f5f5f5;padding:18px;border-radius:8px;margin-bottom:25px;">

                    <h3 style="color:#555;margin-bottom:10px;">
                        Order Information
                    </h3>

                    <p style="color:#444;margin:7px 0;">
                        Order ID:
                        <strong>${orderNumber}</strong>
                    </p>

                    <p style="color:#444;margin:7px 0;">
                        Order Date: ${orderDate}
                    </p>

                    <p style="color:#444;margin:7px 0;">
                        Payment Method: ${paymentMethod}
                    </p>

                    <p style="color:#444;margin:7px 0;">
                        Order Status:
                        <strong style="color:#198754;">Confirmed (Demo)</strong>
                    </p>

                </div>


                <div style="margin-bottom:25px;">

                    <h3 style="color:#555;margin-bottom:15px;">
                        Customer and Delivery Details
                    </h3>

                    <p style="margin:7px 0;">
                        <strong>Name:</strong> ${customerName}
                    </p>

                    <p style="margin:7px 0;">
                        <strong>Email:</strong> ${customerEmail}
                    </p>

                    <p style="margin:7px 0;">
                        <strong>Mobile:</strong> ${customerPhone}
                    </p>

                    <p style="margin:7px 0;">
                        <strong>Address:</strong> ${customerAddress}
                    </p>

                    <p style="margin:7px 0;">
                        <strong>City:</strong> ${customerCity}
                    </p>

                    <p style="margin:7px 0;">
                        <strong>PIN Code:</strong> ${customerPincode}
                    </p>

                </div>


                <div style="margin-bottom:25px;">

                    <h3 style="color:#555;margin-bottom:15px;">
                        Ordered Products
                    </h3>

                    ${orderProducts}

                </div>


                <div style="background:#fff5f5;padding:20px;border-radius:8px;text-align:right;">

                    <p style="margin:7px 0;color:#555;">
                        Total Quantity:
                        <strong>${order.totalQuantity}</strong>
                    </p>

                    <h2 style="color:#087f70;margin-top:12px;">
                        Grand Total: ${formatPrice(order.total)}
                    </h2>

                </div>


                <p style="color:#777;font-size:13px;text-align:center;margin-top:20px;">
                    ${savedSuccessfully
                        ? "Your demo order details have been saved in this browser."
                        : "Your confirmation is displayed, but browser storage was unavailable. Please save a copy of this page."}
                </p>

                <p style="color:#777;font-size:12px;text-align:center;margin-top:8px;">
                    This is a frontend demonstration. No real payment or delivery order has been processed.
                </p>


                <div style="text-align:center;margin-top:30px;">

                    <a href="#products"
                       class="btn"
                       id="continueShoppingBtn">
                        Continue Shopping &#8594;
                    </a>

                </div>

            </div>

        </div>
    `;
}


// =====================================================
// 21. PLACE ORDER AND VALIDATE FORM
// =====================================================

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Check required fields and input patterns.
        if (!checkoutForm.checkValidity()) {
            checkoutForm.reportValidity();
            return;
        }

        // Make sure cart has products.
        if (cart.length === 0) {

            alert("Your cart is empty. Please add products first.");

            return;
        }


        // Collect customer details.
        const customer = {

            name: document.getElementById("customerName").value.trim(),

            email: document.getElementById("customerEmail").value.trim(),

            phone: document.getElementById("customerPhone").value.trim(),

            address: document.getElementById("customerAddress").value.trim(),

            city: document.getElementById("customerCity").value.trim(),

            pincode: document.getElementById("customerPincode").value.trim()

        };


        const paymentMethod =
            document.getElementById("paymentMethod").value;


        // Create a safe snapshot of purchased products.
        const orderItems = cart.map(function (item) {

            const product = products.find(function (product) {
                return product.id === item.id;
            });

            return {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: item.quantity,
                subtotal: product.price * item.quantity
            };

        });


        // Calculate order total.
        const total = orderItems.reduce(function (sum, item) {
            return sum + item.subtotal;
        }, 0);


        // Calculate total number of products.
        const totalQuantity = orderItems.reduce(function (sum, item) {
            return sum + item.quantity;
        }, 0);


        // Create the final order object.
        const order = {

            orderId: generateOrderNumber(),

            date: new Date().toLocaleString("en-IN"),

            customer: customer,

            items: orderItems,

            totalQuantity: totalQuantity,

            total: total,

            paymentMethod: paymentMethod,

            status: "Confirmed - Demo"

        };


        console.log("New Order:", order);


        // Save order before clearing the cart.
        const savedSuccessfully =
            saveOrderToStorage(order);


        // Clear cart after successful demo submission.
        cart = [];

        saveCartToStorage();

        renderCart();


        // Replace checkout form with the order confirmation.
        if (checkoutSection) {

            checkoutSection.style.display = "block";

            checkoutSection.innerHTML =
                createOrderConfirmation(order, savedSuccessfully);

            checkoutSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

        console.log("Demo order placed successfully.");

    });

}


// =====================================================
// 22. HANDLE ADD TO CART, WISHLIST AND CART BUTTONS
// =====================================================

document.addEventListener("click", function (event) {

    const target = event.target;

    if (!(target instanceof Element)) {
        return;
    }


    // Add to Cart button.

    const addButton = target.closest(".add-to-cart");

    if (addButton) {

        const productId = Number(addButton.dataset.productId);

        addToCart(productId);

        return;
    }


    // Wishlist buttons.

    const wishlistButton =
        target.closest("[data-wishlist-action]");

    if (wishlistButton) {

        const productId =
            Number(wishlistButton.dataset.productId);

        const action =
            wishlistButton.dataset.wishlistAction;

        if (action === "toggle") {

            toggleWishlist(productId);

        }

        if (action === "remove") {

            wishlist = wishlist.filter(function (id) {
                return id !== productId;
            });

            saveWishlistToStorage();

            renderProducts();

            renderWishlist();

        }

        return;
    }


    // Cart quantity and remove buttons.

    const cartButton =
        target.closest("[data-cart-action]");

    if (!cartButton) {
        return;
    }

    const productId =
        Number(cartButton.dataset.productId);

    const action =
        cartButton.dataset.cartAction;

    const item = cart.find(function (cartItem) {
        return cartItem.id === productId;
    });

    if (!item) {
        return;
    }

    if (action === "increase") {
        item.quantity++;
    }

    if (action === "decrease" && item.quantity > 1) {
        item.quantity--;
    }

    if (action === "remove") {
        cart = cart.filter(function (cartItem) {
            return cartItem.id !== productId;
        });
    }

    saveCartToStorage();

    renderCart();

});


// =====================================================
// 23. CLEAR CART
// =====================================================

if (clearCartButton) {

    clearCartButton.addEventListener("click", function () {

        cart = [];

        saveCartToStorage();

        renderCart();

        console.log("Shopping cart cleared.");

    });

}


// =====================================================
// 24. OFFER BUTTON
// =====================================================

if (offerBuyButton) {

    offerBuyButton.addEventListener("click", function () {

        alert("Buy Now functionality will be added later.");

    });

}


// =====================================================
// 25. FOOTER LINKS
// =====================================================

[
    "couponsLink",
    "blogLink",
    "returnLink",
    "affiliateLink"

].forEach(function (linkId) {

    const link = document.getElementById(linkId);

    if (link) {

        link.addEventListener("click", function (event) {

            event.preventDefault();

            console.log(linkId + " clicked.");

        });

    }

});


// =====================================================
// 26. INITIALIZE WEBSITE
// =====================================================

renderProducts();

renderCart();

renderWishlist();

renderCheckoutSummary();

console.log("DIY Craft Supplies website loaded successfully.");

console.log("Total products:", products.length);

console.log("Saved cart items:", cart.length);

console.log("Saved wishlist products:", wishlist.length);
