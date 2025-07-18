document.addEventListener('DOMContentLoaded', () => {

    // Data for the acceptance rate chart (illustrative, as exact acceptance rates per category are not in report)
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
        
        // Update description for acceptance chart section
        const categoryFilterSection = document.getElementById('analisis-data');
        const descriptionParagraph = categoryFilterSection.querySelector('.bg-white.p-6.sm\\:p-8.rounded-lg.shadow-lg.border.border-gray-200 > p.text-sm.text-gray-500');
        if (descriptionParagraph) {
            descriptionParagraph.textContent = `Pilih kategori untuk melihat perbandingan tingkat penerimaan. Data ini ilustratif karena tingkat penerimaan spesifik per kategori tidak dipublikasikan.`;
        }

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
                    backgroundColor: ['#0d9488', '#e2e8f0'],
                    borderColor: ['#f8fafc', '#f8fafc'],
                    borderWidth: 4,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: { display: false },
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
    const categoryButtons = document.querySelectorAll('#category-filter .category-btn');
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

    // Initialize with default category (Layanan Kemanusiaan)
    updateAcceptanceChart('Layanan Kemanusiaan');
    
    // Historical Trends Line Chart
    const historicalCanvas = document.getElementById('historicalChart').getContext('2d');
    new Chart(historicalCanvas, {
        type: 'line',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024'], // Years from report context
            datasets: [
                {
                    label: 'Proyek Disetujui',
                    data: [/* Data for 2020, 2021 (illustrative) */ 25, 27, 27, 39, 39], // 27 for 2022, 39 for 2023, keeping 2024 same
                    borderColor: '#10b981', // Green from report
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Total Pengajuan (Ilustratif)', // Clarify it's illustrative
                    data: [120, 150, 180, 220, 250], // Illustrative higher numbers, consistent growth
                    borderColor: '#3b82f6', // Blue
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
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
                        text: 'Jumlah Proyek'
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

    // Keyword Frequency Bar Chart - Using data from Table 4.1 in report
    const keywordData = { 
        labels: [
            'Smart', 'AI', 'IoT', 'System', 'Water', 'Disabled / Abilities / Impaired', 
            'Environment', 'Community', 'Sustainable', 'Solar', 'Detection', 'Monitoring', 
            'Education / Learning', 'Rural', 'Waste', 'Drones / Robotic', 'Health / Medical', 
            'Agriculture / Farming', 'Augmented Reality / VR'
        ], 
        // These are the "Peringkat (1-5)" scores from Table 4.1, in order of labels
        data: [
            5, 5, 5, 5, 5, 5, 5, 5, 5, 
            4, 4, 4, 4, 4, 4, 
            2, 2, 2, 2
        ] 
    };
    new Chart(document.getElementById('keywordChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: keywordData.labels,
            datasets: [{
                label: 'Peringkat Relevansi (Skala 1-5)',
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

    // Tab functionality for Project Ideas - Updated to reflect report's proposed themes
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
