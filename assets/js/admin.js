const drawSalesChart = (data) => {
    const ctx = document.getElementById('salesChart').getContext('2d');
    
    const salesData = data.orders.map(order => order.totalAmount);
    const labels = data.orders.map(order => `Pedido ${order.id}`);
  
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total de Vendas',
          data: salesData,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };
  
  // Função para adicionar um novo produto
const addProduct = async (event) => {
    event.preventDefault();
  
    const name = document.getElementById('product-name').value;
    const description = document.getElementById('product-description').value;
    const price = document.getElementById('product-price').value;
    const quantity = document.getElementById('product-quantity').value;
  
    try {
      const response = await fetch('/api/admin/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name, description, price, quantity })
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Produto adicionado com sucesso!');
        // Redefinir o formulário
        document.getElementById('add-product-form').reset();
      } else {
        alert(data.message || 'Erro ao adicionar produto');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao adicionar produto');
    }
  };
  
  // Adicionar o evento ao formulário
  document.getElementById('add-product-form').addEventListener('submit', addProduct);
  // Função para carregar a lista de produtos
const loadProducts = async () => {
    try {
      const response = await fetch('/api/admin/products', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      const data = await response.json();
      if (response.ok) {
        const productList = document.getElementById('product-list').getElementsByTagName('tbody')[0];
        productList.innerHTML = ''; // Limpar a lista atual
        data.products.forEach(product => {
          const row = productList.insertRow();
          row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>Kz ${product.price}</td>
            <td>
              <button class="btn btn-danger btn-sm" onclick="removeProduct(${product.id})">Remover</button>
            </td>
          `;
        });
      } else {
        alert(data.message || 'Erro ao carregar produtos');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao carregar produtos');
    }
  };
  
  // Função para remover um produto
  const removeProduct = async (productId) => {
    try {
      const response = await fetch(`/api/admin/remove-product/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Produto removido com sucesso!');
        loadProducts(); // Recarregar a lista de produtos
      } else {
        alert(data.message || 'Erro ao remover produto');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao remover produto');
    }
  };
  
  // Carregar os produtos ao carregar a página
  window.onload = loadProducts;
  