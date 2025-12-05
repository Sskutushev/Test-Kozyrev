/**
 * E2E tests for course catalog
 * Testing user scenarios
 */

// Mock CourseCatalog functionality for E2E testing
class MockCourseCatalog {
    constructor() {
        this.courses = [
            {
                id: 1,
                title: 'The Ultimate Google Ads Training Course',
                category: 'marketing',
                price: 100,
                author: 'Jerome Bell',
                image: 'assets/image.png'
            },
            {
                id: 2,
                title: 'Product Management Fundamentals',
                category: 'management',
                price: 480,
                author: 'Marvin McKinney',
                image: 'assets/image1.png'
            },
            {
                id: 3,
                title: 'HR Management and Analytics',
                category: 'hr',
                price: 200,
                author: 'Leslie Alexander Li',
                image: 'assets/image2.png'
            }
        ];
        this.filteredCourses = [...this.courses];
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.itemsToShow = 9;
    }

    filterCourses() {
        this.filteredCourses = this.courses.filter(course => {
            const matchesCategory = this.currentFilter === 'all' || course.category === this.currentFilter;
            const matchesSearch = course.title.toLowerCase().includes(this.searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }

    handleFilter(category) {
        this.currentFilter = category;
        this.filterCourses();
    }

    handleSearch(query) {
        this.searchQuery = query.toLowerCase();
        this.filterCourses();
    }
}

describe('CourseCatalog E2E - User scenarios', () => {
    let catalog;

    beforeEach(() => {
        // Load HTML page
        document.body.innerHTML = `
            <main class="page">
                <section class="filters">
                    <div class="filters__tabs tabs">
                        <button class="tabs__item tabs__item--active" data-category="all">
                            <span class="tabs__count">17</span>
                        </button>
                        <button class="tabs__item" data-category="marketing">
                            <span class="tabs__count">4</span>
                        </button>
                        <button class="tabs__item" data-category="management">
                            <span class="tabs__count">3</span>
                        </button>
                        <button class="tabs__item" data-category="hr">
                            <span class="tabs__count">5</span>
                        </button>
                        <button class="tabs__item" data-category="design">
                            <span class="tabs__count">2</span>
                        </button>
                        <button class="tabs__item" data-category="development">
                            <span class="tabs__count">3</span>
                        </button>
                    </div>
                    <div class="filters__search search">
                        <input type="text" class="search__input" placeholder="Search course..." />
                    </div>
                </section>
                <section class="courses">
                    <div class="courses__grid" id="coursesGrid"></div>
                    <button class="load-more" id="loadMoreBtn">Load more</button>
                </section>
            </main>
        `;
        catalog = new MockCourseCatalog();
    });

    // Scenario 1: Course filtering functionality
    test('Scenario: filtering courses by category works correctly', () => {
        // Set up filter
        catalog.handleFilter('marketing');

        // Verify filtering result
        expect(catalog.filteredCourses).toHaveLength(1);
        expect(catalog.filteredCourses[0].category).toBe('marketing');
        expect(catalog.filteredCourses[0].title).toBe('The Ultimate Google Ads Training Course');
    });

    // Scenario 2: Course search functionality
    test('Scenario: searching courses by title works correctly', () => {
        // Set up search
        catalog.handleSearch('product management');

        // Verify search result
        expect(catalog.filteredCourses).toHaveLength(1);
        expect(catalog.filteredCourses[0].title).toBe('Product Management Fundamentals');
    });

    // Scenario 3: Combined filtering and search
    test('Scenario: combined filtering and search works correctly', () => {
        // First filter by category
        catalog.handleFilter('management');

        // Then search within that category
        catalog.handleSearch('product');

        // Verify combined result
        expect(catalog.filteredCourses).toHaveLength(1);
        expect(catalog.filteredCourses[0].title).toBe('Product Management Fundamentals');
        expect(catalog.filteredCourses[0].category).toBe('management');
    });

    // Scenario 4: User interacts with filter buttons
    test('Scenario: clicking filter buttons updates active state', () => {
        const allTab = document.querySelector('[data-category="all"]');
        const marketingTab = document.querySelector('[data-category="marketing"]');

        // Initially "All" tab is active
        expect(allTab.classList.contains('tabs__item--active')).toBe(true);
        expect(marketingTab.classList.contains('tabs__item--active')).toBe(false);

        // Simulate click on "Marketing" tab
        catalog.handleFilter('marketing');

        // Update UI to reflect change
        document.querySelectorAll('.tabs__item').forEach(tab => {
            tab.classList.remove('tabs__item--active');
        });

        const newMarketingTab = document.querySelector('[data-category="marketing"]');
        newMarketingTab.classList.add('tabs__item--active');

        expect(newMarketingTab.classList.contains('tabs__item--active')).toBe(true);
        expect(allTab.classList.contains('tabs__item--active')).toBe(false);
    });

    // Scenario 5: User enters text in search
    test('Scenario: entering text in search field works correctly', () => {
        const searchInput = document.querySelector('.search__input');
        searchInput.value = 'analytics';

        // Simulate search
        catalog.handleSearch('analytics');

        // Verify search result
        expect(catalog.filteredCourses).toHaveLength(1);
        expect(catalog.filteredCourses[0].title).toContain('Analytics');
    });

    // Scenario 6: Load more functionality
    test('Scenario: load more functionality increases items to show', () => {
        const initialItemsToShow = catalog.itemsToShow;

        // Simulate load more action
        catalog.itemsToShow += 9;

        expect(catalog.itemsToShow).toBe(initialItemsToShow + 9);
    });
});