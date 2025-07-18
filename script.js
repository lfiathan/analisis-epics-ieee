document.addEventListener('DOMContentLoaded', () => {

    // Data for the acceptance rate chart
    const projectData = {
        'Kesehatan': { submitted: 450, accepted: 90 },
        'Lingkungan': { submitted: 620, accepted: 105 },
        'Pendidikan': { submitted: 380, accepted: 85 },
        'Aksesibilitas': { submitted: 250, accepted: 75 }
    };

    let acceptanceChartInstance;
    const acceptanceChartCanvas = document.getElementById('acceptanceChart').getContext('2d');
    
    function updateAcceptanceChart(category) {
        const data = projectData[category];
        const acceptanceRate = (data.accepted / data.submitted) * 100;
        
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
                    data: [data.accepted, data.submitted - data.accepted],
                    backgroundColor: ['#0d9488', '#e2e8f0'], // Teal and light gray
                    borderColor: ['#f8fafc', '#f8fafc'], // White border to separate segments
                    borderWidth: 4,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%', // Make it a doughnut chart
                plugins: {
                    legend: { display: false }, // Hide default legend, show stats in HTML
                    tooltip: {
                        callbacks: {
                            title: function(tooltipItems) { return tooltipItems[0].label; },
                            label: (c) => `${c.parsed.toLocaleString()} Proyek`
                        }
                    }
                }
            }
        });
    }

    // Event listeners for category filter buttons
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => {
                btn.classList.remove('bg-teal-600', 'text-white');
                btn.classList.add('bg-white', 'text-gray-700', 'border', 'border-gray-300');
            });
            button.classList.add('bg-teal-600', 'text-white');
            button.classList.remove('bg-white', 'text-gray-700', 'border', 'border-gray-300');
            updateAcceptanceChart(button.dataset.category);
        });
    });

    // Initialize with default category
    updateAcceptanceChart('Kesehatan');
    
    // Historical Trends Line Chart
    const historicalCanvas = document.getElementById('historicalChart').getContext('2d');
    new Chart(historicalCanvas, {
        type: 'line',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024'],
            datasets: [
                {
                    label: 'Diajukan',
                    data: [1100, 1250, 1400, 1650, 1700], // Illustrative data
                    borderColor: '#3b82f6', // Blue
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Diterima',
                    data: [250, 280, 300, 340, 355], // Illustrative data
                    borderColor: '#10b981', // Green
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Jumlah Proyek (Ilustratif)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Tahun'
                    }
                }
            },
            plugins: {
                legend: { position: 'top' },
                tooltip: { mode: 'index', intersect: false }
            }
        }
    });

    // Keyword Frequency Bar Chart
    const keywordData = { 
        labels: ['Sistem', 'Aplikasi', 'IoT', 'Alat', 'Edukasi', 'Pintar', 'Monitoring', 'Energi', 'Kesehatan', 'Lingkungan'], 
        data: [5, 4.5, 4, 3.8, 3.5, 3.2, 3, 2.5, 2, 1.8] // Illustrative ratings/frequencies
    };
    new Chart(document.getElementById('keywordChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: keywordData.labels,
            datasets: [{
                label: 'Frekuensi Kata Kunci (Skala 1-5)',
                data: keywordData.data,
                backgroundColor: '#2dd4bf', // Light teal
                borderColor: '#0d9488', // Darker teal
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: 'y', // Horizontal bars
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.parsed.x.toFixed(1)}/5 Peringkat Relevansi`
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
                        text: 'Peringkat Relevansi'
                    },
                    grid: { display: false } 
                },
                y: { 
                    grid: { display: false } 
                }
            }
        }
    });

    // Tab functionality for Project Ideas
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => {
                btn.classList.remove('active', 'border-b-2', 'border-teal-600', 'text-teal-600');
                btn.classList.add('text-gray-500', 'border-transparent');
            });
            button.classList.add('active', 'border-b-2', 'border-teal-600', 'text-teal-600');
            button.classList.remove('text-gray-500', 'border-transparent');
            
            const targetTab = button.dataset.tab;
            tabPanes.forEach(pane => {
                pane.id === `${targetTab}-content` ? pane.classList.remove('hidden') : pane.classList.add('hidden');
            });
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

});
