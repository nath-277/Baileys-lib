        // Initialize Lucide icons
        lucide.createIcons();

        // Book data
        const books = [
            {
                title: "NCERT",
                author: "P.JAGADEESH",
                category: "BASIC",
                date: "2022-01-31",
                image: "img/NCER.jpg"
            },
            {
                title: "CRYPTOGRAPHY",
                author: "P.J.BOSE",
                category: "IT",
                date: "2022-11-11",
                image: "img/crypto.jpg"
            },
            {
                title: "DBMS",
                author: "KAVERI S",
                category: "IT",
                date: "2022-12-22",
                image: "img/Database.jpg"
            },
            {
                title: "COMPUTER NETWORKS AND SECURITY",
                author: "PRIYANKA",
                category: "CSE",
                date: "2022-03-20",
                image: "img/cns.jpg"
            },
            {
                title: "MENTAL PEACE",
                author: "PUTIN",
                category: "NOVEL",
                date: "2022-11-10",
                image: "img/Network.jpg"
            },
            {
                title: "ARTIFICIAL INTELLIGENCE",
                author: "HARISH P",
                category: "ISE",
                date: "2022-12-20",
                image: "img/Os.jpg"
            },
            {
                title: "SYSTEM DESIGN",
                author: "AMARNADH.W",
                category: "CSE",
                date: "2022-12-20",
                image: "img/Sdesign.jpg"
            },
            {
                title: "MATHEMATICS",
                author: "HARIKRISHNA",
                category: "BASIC",
                date: "2022-01-21",
                image: "img/Maths.jpg"
            },
            {
                title: "HARRY POTTER",
                author: "J.K. ROWLING",
                category: "FANTASY",
                date: "1999-12-20",
                image: "img/hp.jpg"
            },
            {
                title: "OPERATING SYSTEM",
                author: "RAMA KRISHNA K",
                category: "CSE",
                date: "2022-04-20",
                image: "img/Nt.jpg"
            },
            {
                title: "ATOMIC HABBITS",
                author: "JEEVAN E",
                category: "NOVEL",
                date: "1995-12-22",
                image: "img/ah.jpg"
            },
            {
                title: "HOW TO WIN FRIENDS AND INFLUENCE PEOPLE",
                author: "LEHAN FAYAZ",
                category: "NOVEL",
                date: "2002-02-02",
                image: "img/htw.jpeg"
            }
        ];

        // Current filter state
        let currentCategory = 'all';
        let searchQuery = '';

        // Function to create a book card
        function createBookCard(book) {
            return `
                <div class="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                    <img src="${book.image}" alt="${book.title}" class="w-full h-48 object-cover">
                    <div class="p-4">
                        <h3 class="font-semibold text-lg text-blue-600 mb-2">${book.title}</h3>
                        <p class="text-gray-600 mb-1">Author: ${book.author}</p>
                        <p class="text-gray-600 mb-1">Category: ${book.category}</p>
                        <p class="text-gray-600">${new Date(book.date).toLocaleDateString()}</p>
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
            bookGrid.innerHTML = filteredBooks.map(createBookCard).join('');
        }

        // Function to handle search
        function handleSearch() {
            searchQuery = document.getElementById('searchInput').value;
            filterAndDisplayBooks();
        }

        // Add event listeners to category filters
        document.getElementById('categoryFilters').addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                // Update active state of buttons
                document.querySelectorAll('#categoryFilters button').forEach(btn => {
                    btn.classList.remove('bg-blue-600', 'text-white');
                    btn.classList.add('bg-white', 'text-blue-600');
                });
                e.target.classList.remove('bg-white', 'text-blue-600');
                e.target.classList.add('bg-blue-600', 'text-white');

                // Update current category and filter books
                currentCategory = e.target.dataset.category;
                filterAndDisplayBooks();
            }
        });

        // Add event listener for search input
        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });

        // Initial display of books
        filterAndDisplayBooks();