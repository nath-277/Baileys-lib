 // Initialize Lucide icons
        lucide.createIcons();

        // Book data
        const books = [
            {
                title: "NCERT",
                author: "P.JAGADEESH",
                category: "BASIC",
                date: "2022-01-31",
                image: "img/NCER.jpg",
                description: "Comprehensive guide for students"
            },
            {
                title: "CRYPTOGRAPHY",
                author: "P.J.BOSE",
                category: "IT",
                date: "2022-11-11",
                image: "img/crypto.jpg",
                description: "Advanced encryption techniques"
            },
            {
                title: "DBMS",
                author: "KAVERI S",
                category: "IT",
                date: "2022-12-22",
                image: "img/Database.jpg",
                description: "Database management systems"
            },
            {
                title: "COMPUTER NETWORKS AND SECURITY",
                author: "PRIYANKA",
                category: "CSE",
                date: "2022-03-20",
                image: "img/cns.jpg",
                description: "Network protocols and security"
            },
            {
                title: "MENTAL PEACE",
                author: "PUTIN",
                category: "NOVEL",
                date: "2022-11-10",
                image: "img/Network.jpg",
                description: "Guide to inner peace and mindfulness"
            },
            {
                title: "ARTIFICIAL INTELLIGENCE",
                author: "HARISH P",
                category: "ISE",
                date: "2022-12-20",
                image: "img/Os.jpg",
                description: "Modern AI concepts and applications"
            },
            {
                title: "SYSTEM DESIGN",
                author: "AMARNADH.W",
                category: "CSE",
                date: "2022-12-20",
                image: "img/Sdesign.jpg",
                description: "Principles of system architecture"
            },
            {
                title: "MATHEMATICS",
                author: "HARIKRISHNA",
                category: "BASIC",
                date: "2022-01-21",
                image: "img/Maths.jpg",
                description: "Advanced mathematical concepts"
            },
            {
                title: "HARRY POTTER",
                author: "J.K. ROWLING",
                category: "FANTASY",
                date: "1999-12-20",
                image: "img/hp.jpg",
                description: "Magical adventure series"
            },
            {
                title: "OPERATING SYSTEM",
                author: "RAMA KRISHNA K",
                category: "CSE",
                date: "2022-04-20",
                image: "img/Nt.jpg",
                description: "OS concepts and implementation"
            },
            {
                title: "ATOMIC HABITS",
                author: "JEEVAN E",
                category: "NOVEL",
                date: "1995-12-22",
                image: "img/ah.jpg",
                description: "Building better habits"
            },
            {
                title: "HOW TO WIN FRIENDS AND INFLUENCE PEOPLE",
                author: "LEHAN FAYAZ",
                category: "NOVEL",
                date: "2002-02-02",
                image: "img/htw.jpeg",
                description: "Classic guide to relationships"
            }
        ];

        // Current filter state
        let currentCategory = 'all';
        let searchQuery = '';

        // Function to create a book card
        function createBookCard(book) {
            return `
                <div class="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
                    <div class="relative">
                        <img src="${book.image}" alt="${book.title}" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                            <p class="text-sm text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">${book.description}</p>
                        </div>
                    </div>
                    <div class="p-4">
                        <h3 class="font-semibold text-lg text-blue-600 mb-1 line-clamp-1">${book.title}</h3>
                        <p class="text-gray-600 text-sm mb-2 line-clamp-1">By ${book.author}</p>
                        <div class="flex items-center justify-between">
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                ${book.category}
                            </span>
                            <span class="text-xs text-gray-500">
                                ${new Date(book.date).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>
            `;
        }

        // Function to filter and display books
        function filterAndDisplayBooks() {
            const filteredBooks = books.filter(book => {
                const matchesCategory = currentCategory === 'all' || book.category.toLowerCase() === currentCategory;
                const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                   book.author.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesCategory && matchesSearch;
            });

            const bookGrid = document.getElementById('bookGrid');
            const resultsInfo = document.getElementById('resultsInfo');
            
            bookGrid.innerHTML = filteredBooks.map(createBookCard).join('');
            resultsInfo.textContent = `Showing ${filteredBooks.length} of ${books.length} books`;
        }

        // Function to handle search with debounce
        let searchTimeout;
        function handleSearch() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                searchQuery = document.getElementById('searchInput').value;
                filterAndDisplayBooks();
            }, 300);
        }

        // Add event listeners to category filters
        document.getElementById('categoryFilters').addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                // Update active state of buttons
                document.querySelectorAll('#categoryFilters button').forEach(btn => {
                    if (btn === e.target) {
                        btn.classList.remove('bg-blue-50', 'text-blue-600');
                        btn.classList.add('bg-blue-600', 'text-white');
                    } else {
                        btn.classList.remove('bg-blue-600', 'text-white');
                        btn.classList.add('bg-blue-50', 'text-blue-600');
                    }
                });

                // Update current category and filter books
                currentCategory = e.target.dataset.category;
                filterAndDisplayBooks();
            }
        });

        // Add event listener for search input
        document.getElementById('searchInput').addEventListener('input', handleSearch);
        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });

        // Initial display of books
        filterAndDisplayBooks();

        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.setAttribute('data-lucide', 'menu');
            } else {
                icon.setAttribute('data-lucide', 'x');
            }
            lucide.createIcons();
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });