let cart = [];

// Ajouter au panier
function addToCart(name, price, image) {

    // Vérifier si le produit existe déjà (par image)
    const exists = cart.find(item => item.image === image);

    if (exists) {
        alert("Ce produit est déjà dans le panier !");
        return; 
    }

    // Ajouter normalement
    cart.push({
        name: name,
        price: price,
        image: image
    });

    updateCartCount();
    renderCart();
}

// Mettre à jour le compteur
function updateCartCount() {
    const count = document.getElementById("cart-count");
    count.textContent = cart.length;
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

        // 🔥 LA VERSION CORRECTE 🔥
        productDiv.innerHTML = `
    <img src="${item.image}" 
         style="width:50px; height:50px; object-fit:cover; margin-right:10px;">

    <span style="flex-grow:1;">
        ${item.name} – ${item.price} FCFA
    </span>

    <button onclick="removeFromCart(${index})">X</button>
;`
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
document.getElementById("confirm-cart").addEventListener("click", function() {
   document.getElementById("cart-window").style.display = "none";
});

document.getElementById("confirm-cart").addEventListener("click", function () {
    // Affiche le formulaire
    document.getElementById("commande").style.display = "block";

    // Remplit les données du panier
    document.getElementById("cart-data").value = cart
        .map(item => `${item.name} - ${item.price} FCFA`)
        .join("\n");

    // Total
    document.getElementById("cart-total-input").value =
        document.getElementById("cart-total").textContent + " FCFA";
});