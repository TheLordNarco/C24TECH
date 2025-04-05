// frontend/assets/js/pending-orders.js
const loadPendingOrders = async () => {
    try {
      const response = await fetch('/api/orders/pending', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const orders = await response.json();
      const ordersList = document.getElementById('pending-orders-list');
      ordersList.innerHTML = '';
  
      orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${order.id}</td>
          <td>${order.customer}</td>
          <td>${order.product}</td>
          <td>${order.status}</td>
          <td><button class="btn btn-primary btn-sm">Detalhes</button></td>
        `;
        ordersList.appendChild(row);
      });
    } catch (error) {
      console.error('Erro ao carregar pedidos pendentes:', error);
    }
  };
  
  loadPendingOrders();
  