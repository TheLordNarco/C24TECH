document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkout-form');
    const totalAmountElement = document.getElementById('total-amount');
    const cartItemsElement = document.getElementById('cart-items');
    const responseMessageElement = document.getElementById('response-message');
  
    // Função para obter os itens do carrinho
    const getCartItems = () => {
      // Simulação de itens no carrinho (isso deve ser substituído por dados reais do localStorage ou API)
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  
      // Exibir itens no carrinho
      cartItemsElement.innerHTML = cartItems.map(item => `
        <div class="cart-item">
          <p>${item.name} x ${item.quantity}</p>
          <p>${item.price} Kz</p>
        </div>
      `).join('');
  
      // Calcular o total
      const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      totalAmountElement.innerText = `${totalAmount} Kz`;
  
      return { cartItems, totalAmount };
    };
  
    // Enviar pedido para o backend
    const submitOrder = async (paymentMethod, totalAmount) => {
      const { cartItems } = getCartItems();
  
      const orderData = {
        items: cartItems,
        totalAmount,
        paymentMethod,
      };
  
      try {
        const response = await fetch('http://localhost:5000/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Usando JWT do usuário logado
          },
          body: JSON.stringify(orderData),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          responseMessageElement.innerText = `Compra realizada com sucesso! ID do pedido: ${data.order.id}`;
          responseMessageElement.style.color = 'green';
  
          // Limpar o carrinho após a compra
          localStorage.removeItem('cart');
        } else {
          responseMessageElement.innerText = `Erro: ${data.message}`;
          responseMessageElement.style.color = 'red';
        }
      } catch (error) {
        responseMessageElement.innerText = 'Erro ao processar a compra. Tente novamente.';
        responseMessageElement.style.color = 'red';
      }
    };
  
    // Evento de envio do formulário
    checkoutForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const paymentMethod = document.getElementById('payment-method').value;
      const { totalAmount } = getCartItems();
  
      if (totalAmount > 0) {
        submitOrder(paymentMethod, totalAmount);
      } else {
        responseMessageElement.innerText = 'O carrinho está vazio.';
        responseMessageElement.style.color = 'red';
      }
    });
  
    // Preencher dados do carrinho ao carregar a página
    getCartItems();
  });
  // frontend/assets/js/checkout.js
document.getElementById('checkout-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const products = JSON.parse(localStorage.getItem('cart'));
    const totalAmount = calculateTotal(products); // Função para calcular o total do pedido

    const orderData = {
        userId: getUserId(), // Função que pega o ID do usuário logado
        products: products,
        totalAmount: totalAmount,
    };

    try {
        const response = await fetch('http://localhost:5000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify(orderData),
        });

        const result = await response.json();

        if (response.ok) {
            alert('Pedido realizado com sucesso!');
            // Redirecionar ou limpar o carrinho
            localStorage.removeItem('cart');
            window.location.href = '/orders.html'; // Página de visualização de pedidos
        } else {
            alert('Erro ao criar pedido: ' + result.message);
        }
    } catch (error) {
        console.error('Erro de rede', error);
        alert('Erro ao realizar pedido');
    }
});
