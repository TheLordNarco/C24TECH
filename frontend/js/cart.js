document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-container");

    function updateCartUI() {
        cartContainer.innerHTML = "";
        cart.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.innerHTML = `<p>${item.nome} - R$${item.preco}</p>
                <button onclick="removeFromCart(${index})">Remover</button>`;
            cartContainer.appendChild(itemElement);
        });
    }

    window.addToCart = function (product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();
    };

    window.removeFromCart = function (index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();
    };

    updateCartUI();
});
