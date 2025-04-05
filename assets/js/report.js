// assets/js/report.js
const getSalesReport = async () => {
    try {
      const response = await fetch('/api/sales-report', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      const data = await response.json();
      
      if (response.ok) {
        // Exibir o total de vendas
        const totalSales = data.reduce((acc, item) => acc + item.totalSales, 0);
        document.getElementById('total-sales').innerText = `Total de Vendas: Kz ${totalSales}`;
  
        // Criar gráfico
        const months = data.map(item => `${item.month}/${item.year}`);
        const sales = data.map(item => item.totalSales);
  
        const ctx = document.getElementById('salesChart').getContext('2d');
        const salesChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: months,
            datasets: [{
              label: 'Vendas Mensais (Kz)',
              data: sales,
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              fill: false,
            }],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      } else {
        alert(data.message || 'Erro ao carregar relatório de vendas');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao carregar relatório de vendas');
    }
  };
  
  getSalesReport();
  