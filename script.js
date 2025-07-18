document.addEventListener('DOMContentLoaded', () => {

  const projectData = {
    'Layanan Kemanusiaan': { submitted: 450, accepted: 90, description: 'Proyek-proyek di bawah kategori ini berupaya meningkatkan kualitas hidup umum, kesehatan masyarakat, keselamatan, dan kesejahteraan komunitas.' },
    'Lingkungan': { submitted: 620, accepted: 105, description: 'Proyek-proyek dalam kategori ini berfokus pada keberlanjutan lingkungan, konservasi, dan penanganan tantangan ekologis.' },
    'Pendidikan & Penjangkauan': { submitted: 380, accepted: 85, description: 'Proyek-proyek dalam kategori ini bertujuan untuk memajukan pendidikan STEM, meningkatkan literasi digital, dan menyediakan sumber daya pendidikan.' },
    'Aksesibilitas & Kemampuan': { submitted: 250, accepted: 75, description: 'Kategori ini mencakup proyek-proyek yang mengatasi masalah aksesibilitas, memungkinkan layanan adaptif, dan mengembangkan teknologi bantu bagi individu dengan disabilitas.' }
  };

  let acceptanceChartInstance;
  const acceptanceChartCanvas = document.getElementById('acceptanceChart').getContext('2d');

  function updateAcceptanceChart(category) {
    const data = projectData[category];
    const acceptanceRate = (data.accepted / data.submitted) * 100;
    const rejected = data.submitted - data.accepted;

    document.getElementById('category-title').textContent = category;
    document.getElementById('category-description').textContent = data.description;
    document.getElementById('submitted-count').textContent = data.submitted;
    document.getElementById('accepted-count').textContent = data.accepted;
    document.getElementById('acceptance-rate').textContent = `${acceptanceRate.toFixed(1)}%`;

    if (acceptanceChartInstance) {
      acceptanceChartInstance.destroy();
    }

    acceptanceChartInstance = new Chart(acceptanceChartCanvas, {
      type: 'doughnut',
      data: {
        labels: ['Diterima', 'Ditolak'],
        datasets: [{
          data: [data.accepted, rejected],
          backgroundColor: ['#0d9488', '#f1f5f9'],
          borderColor: ['#ffffff', '#ffffff'],
          borderWidth: 2,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              font: { size: 14 }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed !== null) {
                  label += context.parsed + ' proyek';
                }
                return label;
              }
            }
          }
        }
      }
    });
  }

  const categoryButtons = document.querySelectorAll('.category-btn');
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      categoryButtons.forEach(btn => {
        btn.classList.remove('bg-teal-500', 'text-white');
        btn.classList.add('bg-white', 'text-gray-700', 'border', 'border-gray-300');
      });
      button.classList.add('bg-teal-500', 'text-white');
      button.classList.remove('bg-white', 'text-gray-700', 'border', 'border-gray-300');
      updateAcceptanceChart(button.dataset.category);
    });
  });

  updateAcceptanceChart('Layanan Kemanusiaan'); // Set default category

  // Updated keyword data based on research report's Table 4.1 (using rating as proxy for frequency)
  const keywordData = {
    labels: ['IoT', 'AI', 'Sistem', 'Sensor', 'Air', 'Energi', 'Pendidikan', 'Kesehatan', 'Komunitas', 'Lingkungan', 'Pengelolaan', 'Smart', 'Inovasi', 'Pertanian'],
    data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4] // Using the 1-5 rating from the report
  };
  const keywordChartCanvas = document.getElementById('keywordChart').getContext('2d');
  new Chart(keywordChartCanvas, {
    type: 'bar',
    data: {
      labels: keywordData.labels,
      datasets: [{
        label: 'Peringkat Frekuensi',
        data: keywordData.data,
        backgroundColor: '#0d9488',
        borderColor: '#0d9488',
        borderWidth: 1
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => `${context.parsed.x}/5 Peringkat Frekuensi`
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 5.5, // Max rating is 5
          ticks: {
            stepSize: 1
          },
          title: {
            display: true,
            text: 'Peringkat Frekuensi'
          },
          grid: {
            display: false
          }
        },
        y: {
          grid: {
            display: false
          }
        }
      }
    }
  });

  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.classList.add('text-gray-500', 'border-transparent');
      });
      button.classList.add('active');
      button.classList.remove('text-gray-500', 'border-transparent');

      const targetTab = button.dataset.tab;
      tabPanes.forEach(pane => {
        if (pane.id === `${targetTab}-content`) {
          pane.classList.remove('hidden');
          pane.classList.add('active');
        } else {
          pane.classList.add('hidden');
          pane.classList.remove('active');
        }
      });
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

});
