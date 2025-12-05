/**
 * Online Courses Catalog
 * BEM methodology implementation
 */

// === COURSE DATA (18 cards) ===
const coursesData = [
    // First batch (9 cards - initially visible)
    {
        id: 1,
        title: 'The Ultimate Google Ads Training Course',
        category: 'marketing',
        price: 100,
        author: 'Jerome Bell',
        image: 'Upgrade/assets/image.png'
    },
    {
        id: 2,
        title: 'Product Management Fundamentals',
        category: 'management',
        price: 480,
        author: 'Marvin McKinney',
        image: 'Upgrade/assets/image1.png'
    },
    {
        id: 3,
        title: 'HR Management and Analytics',
        category: 'hr',
        price: 200,
        author: 'Leslie Alexander Li',
        image: 'Upgrade/assets/image2.png'
    },
    {
        id: 4,
        title: 'Brand Management & PR Communications',
        category: 'marketing',
        price: 530,
        author: 'Kristin Watson',
        image: 'Upgrade/assets/image3.png'
    },
    {
        id: 5,
        title: 'Graphic Design Basic',
        category: 'design',
        price: 500,
        author: 'Guy Hawkins',
        image: 'Upgrade/assets/image4.png'
    },
    {
        id: 6,
        title: 'Business Development Management',
        category: 'management',
        price: 400,
        author: 'Dianne Russell',
        image: 'Upgrade/assets/image5.png'
    },
    {
        id: 7,
        title: 'Highload Software Architecture',
        category: 'development',
        price: 600,
        author: 'Brooklyn Simmons',
        image: 'Upgrade/assets/image6.png'
    },
    {
        id: 8,
        title: 'Human Resources – Selection and Recruitment',
        category: 'hr',
        price: 150,
        author: 'Kathryn Murphy',
        image: 'Upgrade/assets/image7.png'
    },
    {
        id: 9,
        title: 'User Experience. Human-centered Design',
        category: 'design',
        price: 240,
        author: 'Cody Fisher',
        image: 'Upgrade/assets/image8.png'
    },

    // Second batch (9 cards - hidden until 'Load More' is clicked)
    {
        id: 10,
        title: 'Digital Marketing Strategy',
        category: 'marketing',
        price: 350,
        author: 'Sarah Johnson',
        image: 'Upgrade/assets/image.png'  // Same image as card 1
    },
    {
        id: 11,
        title: 'Strategic Management & Leadership',
        category: 'management',
        price: 550,
        author: 'Michael Brown',
        image: 'Upgrade/assets/image1.png'  // Same image as card 2
    },
    {
        id: 12,
        title: 'HR Analytics and Metrics',
        category: 'hr',
        price: 280,
        author: 'Emily Davis',
        image: 'Upgrade/assets/image2.png'  // Same image as card 3
    },
    {
        id: 13,
        title: 'Social Media Marketing Mastery',
        category: 'marketing',
        price: 220,
        author: 'David Wilson',
        image: 'Upgrade/assets/image3.png'  // Same image as card 4
    },
    {
        id: 14,
        title: 'UI/UX Design Principles',
        category: 'design',
        price: 420,
        author: 'Jessica Taylor',
        image: 'Upgrade/assets/image4.png'  // Same image as card 5
    },
    {
        id: 15,
        title: 'Full Stack Web Development',
        category: 'development',
        price: 650,
        author: 'James Anderson',
        image: 'Upgrade/assets/image5.png'  // Same image as card 6
    },
    {
        id: 16,
        title: 'Talent Acquisition Strategies',
        category: 'hr',
        price: 300,
        author: 'Lisa Martinez',
        image: 'Upgrade/assets/image6.png'  // Same image as card 7
    },
    {
        id: 17,
        title: 'Mobile App Development',
        category: 'development',
        price: 580,
        author: 'Robert Garcia',
        image: 'Upgrade/assets/image7.png'  // Same image as card 8
    },
    {
        id: 18,
        title: 'Performance Management Systems',
        category: 'hr',
        price: 320,
        author: 'Amanda White',
        image: 'Upgrade/assets/image8.png'  // Same image as card 9
    }
];

// === APPLICATION CLASS ===
class CourseCatalog {
    constructor() {
        // Data
        this.courses = coursesData;
        this.filteredCourses = [...this.courses];

        // State
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.itemsToShow = 9; // Initially show 9 cards
    }

    /**
     * Initialize application
     */
    init() {
        this.cacheDOM();
        this.bindEvents();
        this.updateCategoryCounts();
        this.renderCourses();
        this.updateLoadMoreButton();
    }

    /**
     * Cache DOM elements
     */
    cacheDOM() {
        this.coursesGrid = document.getElementById('coursesGrid');
        this.searchInput = document.querySelector('.search__input');
        this.tabButtons = document.querySelectorAll('.tabs__item');
        this.loadMoreButton = document.getElementById('loadMoreBtn');
    }

    /**
     * Bind event handlers
     */
    bindEvents() {
        // Search with debounce
        let searchTimeout;
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.handleSearch(e.target.value);
                }, 300);
            });
        }

        // Category filtering
        if (this.tabButtons) {
            this.tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const category = button.dataset.category;
                    this.handleFilter(category, button);
                });
            });
        }

        // 'Load More' button
        if (this.loadMoreButton) {
            this.loadMoreButton.addEventListener('click', () => {
                this.handleLoadMore();
            });
        }
    }

    /**
     * Handle search
     */
    handleSearch(query) {
        const sanitized = this.sanitizeInput(query);
        this.searchQuery = sanitized.toLowerCase().trim();
        this.itemsToShow = 9; // Reset to show first 9 items when search changes
        this.filterCourses();
        this.renderCourses();
        this.updateLoadMoreButton();
    }

    /**
     * Handle filtering
     */
    handleFilter(category, button) {
        // Update active tab
        if (this.tabButtons) {
            this.tabButtons.forEach(btn => {
                btn.classList.remove('tabs__item--active');
                btn.setAttribute('aria-selected', 'false');
            });
        }
        if (button) {
            button.classList.add('tabs__item--active');
            button.setAttribute('aria-selected', 'true');
        }

        this.currentFilter = category;
        this.itemsToShow = 9; // Reset to show first 9 items when filter changes
        this.filterCourses();
        this.renderCourses();
        this.updateLoadMoreButton();
    }

    /**
     * Handle 'Load More' button
     */
    handleLoadMore() {
        const remaining = this.filteredCourses.length - this.itemsToShow;
        if (remaining > 0) {
            this.itemsToShow = Math.min(this.itemsToShow + 9, this.filteredCourses.length);
            this.renderCourses();
            this.updateLoadMoreButton();
        }
    }

    /**
     * Filter courses
     */
    filterCourses() {
        this.filteredCourses = this.courses.filter(course => {
            const matchesCategory = this.currentFilter === 'all' || course.category === this.currentFilter;
            const matchesSearch = course.title.toLowerCase().includes(this.searchQuery);
            return matchesCategory && matchesSearch;
        });
    }

    /**
     * Render course cards
     */
    renderCourses() {
        if (!this.coursesGrid) return;
        const coursesToShow = this.filteredCourses.slice(0, this.itemsToShow);
        this.coursesGrid.innerHTML = '';

        if (coursesToShow.length === 0) {
            this.coursesGrid.innerHTML = `
                <div class="courses__empty" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #787A80;">
                    <p style="font-size: clamp(16px, 2vw, 20px);">No courses found</p>
                    <p style="font-size: clamp(14px, 1.5vw, 16px); margin-top: 8px;">Try adjusting your search or filter</p>
                </div>
            `;
            return;
        }

        coursesToShow.forEach((course, index) => {
            const courseCard = this.createCourseCard(course, index);
            courseCard.style.animationDelay = `${index * 0.08}s`;
            this.coursesGrid.appendChild(courseCard);
        });
    }

    /**
     * Create course card
     */
    createCourseCard(course, index) {
        const article = document.createElement('article');
        article.className = 'course-card';
        article.dataset.category = course.category;
        article.dataset.title = course.title.toLowerCase();
        article.style.animationDelay = `${index * 0.08}s`;
        article.setAttribute('aria-label', `${course.title} course card`);
        article.setAttribute('role', 'article');

        article.innerHTML = `
            <img class="course-card__image" src="${course.image}" alt="${course.title}" loading="lazy">

            <div class="course-card__content">
                <span class="course-card__badge badge badge--${course.category}">
                    ${this.getCategoryName(course.category)}
                </span>

                <h3 class="course-card__title">${course.title}</h3>

                <div class="course-card__info">
                    <span class="course-card__price">$${course.price}</span>
                    <span class="course-card__divider"></span>
                    <span class="course-card__author">by ${course.author}</span>
                </div>
            </div>
        `;

        return article;
    }

    /**
     * Get category name
     */
    getCategoryName(category) {
        const names = {
            'marketing': 'Marketing',
            'management': 'Management',
            'hr': 'HR & Recruiting',
            'design': 'Design',
            'development': 'Development'
        };
        return names[category] || category;
    }

    /**
     * Update 'Load More' button
     */
    updateLoadMoreButton() {
        if (!this.loadMoreButton) return;
        const hasMore = this.filteredCourses.length > this.itemsToShow;
        if (hasMore) {
            this.loadMoreButton.style.display = 'flex';
        } else {
            this.loadMoreButton.style.display = 'none';
        }
    }

    /**
     * Count courses by category
     */
    updateCategoryCounts() {
        if (!this.tabButtons) return;
        
        const counts = {
            all: 17, // Hardcoded as requested
            marketing: this.courses.filter(c => c.category === 'marketing').length,
            management: this.courses.filter(c => c.category === 'management').length,
            hr: this.courses.filter(c => c.category === 'hr').length,
            design: 2, // Hardcoded as requested
            development: this.courses.filter(c => c.category === 'development').length,
        };

        this.tabButtons.forEach(button => {
            const category = button.dataset.category;
            const countElement = button.querySelector('.tabs__count');
            if (countElement && counts[category] !== undefined) {
                countElement.textContent = counts[category];
                countElement.setAttribute('aria-label', `${counts[category]} courses`);
            }
        });
    }

    /**
     * Sanitize user input
     */
    sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }
}

// === INITIALIZATION ===
// Conditional initialization (only if not in a test environment)
if (typeof document !== 'undefined' && typeof module === 'undefined') {
    if (document.readyState !== 'loading') {
        new CourseCatalog().init();
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            new CourseCatalog().init();
        });
    }
}

// Export for tests (CommonJS for Jest)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CourseCatalog, coursesData };
}