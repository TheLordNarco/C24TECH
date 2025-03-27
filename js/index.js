document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/api/products")
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById("product-list");
            productList.innerHTML = ""; // Limpa a lista antes de adicionar

            data.forEach(product => {
                const productCard = `
                    <div class="col-md-4">
                        <div class="card mb-4">
                            <img src="${product.imagem || 'https://via.placeholder.com/150'}" class="card-img-top" alt="${product.nome}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${product.nome}</h5>
                                <p class="card-text">R$ ${product.preco.toFixed(2)}</p>
                                <button class="btn btn-primary">Comprar</button>
                            </div>
                        </div>
                    </div>
                `;
                productList.innerHTML += productCard;
            });
        })
        .catch(error => console.error("Erro ao buscar produtos:", error));
});
