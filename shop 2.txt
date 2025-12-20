let cart = [];

// Ajouter au panier
function addToCart(name, price, image, size) {

    const exists = cart.find(item => item.image === image);

    if (exists) {
        alert("Ce produit est déjà dans le panier !");
        return; 
    }
    cart.push({
        name: name,
        price: price,
        image: image,
        size: size
    });

    updateCartCount();
    renderCart();
}

// Mettre à jour le compteur
function updateCartCount() {
    document.getElementById("cart-count").textContent = cart.length;
}

// Afficher le panier
function renderCart() {
    const container = document.getElementById("cart-items");
    const totalElement = document.getElementById("cart-total");

    container.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        const productDiv = document.createElement("div");
        productDiv.classList.add("cart-product");
        productDiv.style.display = "flex";
        productDiv.style.alignItems = "center";
        productDiv.style.marginBottom = "10px";

        productDiv.innerHTML = `
            <img src="${item.image}" 
                 style="width:50px; height:50px; object-fit:cover; margin-right:10px;">

            <div style="flex-grow:1;">
                <strong>${item.name}</strong><br>
                Taille / Pointure : <b>${item.size}</b><br>
                Prix : ${item.price} FCFA
            </div>

            <button onclick="removeFromCart(${index})"
                    style="padding:4px 8px; cursor:pointer;">
                X
            </button>
        `;

        container.appendChild(productDiv);
    });

    totalElement.textContent = total;
}

// Retirer un produit
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCart();
}

// Ouvrir / fermer le panier
document.getElementById("cart-icon").addEventListener("click", function () {
    document.getElementById("cart-window").style.display = "block";
});

document.getElementById("close-cart").addEventListener("click", function () {
    document.getElementById("cart-window").style.display = "none"; 
});

document.getElementById("confirm-cart").addEventListener("click", function () {
    
    document.getElementById("cart-window").style.display = "none";
    document.getElementById("commande").style.display = "block";

    // 🔥 VERSION CORRECTE 🔥
    document.getElementById("cart-data").value = cart
        .map(item => 
           ` Produit : ${item.name}\nTaille/Pointure : ${item.size}\nPrix : ${item.price} FCFA\n`
        )
        .join("\n");

    // Total
    document.getElementById("cart-total-input").value =
        document.getElementById("cart-total").textContent + " FCFA";
});