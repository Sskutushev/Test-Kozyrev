const { CourseCatalog, coursesData } = require('../../../script.js');

describe('CourseCatalog - Real Implementation', () => {
    let catalog;

    describe('with full DOM', () => {
        beforeEach(() => {
            // Setup DOM
            document.body.innerHTML = `
                <div id="coursesGrid"></div>
                <input class="search__input" />
                <button id="loadMoreBtn"></button>
                <div class="tabs">
                    <button class="tabs__item tabs__item--active" data-category="all">
                        <span class="tabs__count">18</span>
                    </button>
                    <button class="tabs__item" data-category="marketing">
                        <span class="tabs__count">4</span>
                    </button>
                </div>
            `;

            // Initialize REAL class
            catalog = new CourseCatalog();
            catalog.init();
        });

        afterEach(() => {
            document.body.innerHTML = '';
        });

        test('should initialize with 18 courses', () => {
            expect(catalog.courses).toHaveLength(18);
            expect(catalog.filteredCourses).toHaveLength(18);
            expect(catalog.itemsToShow).toBe(9);
        });

        test('should filter courses by category', () => {
            catalog.handleFilter('marketing', document.querySelector('[data-category="marketing"]'));
            
            expect(catalog.filteredCourses.length).toBeGreaterThan(0);
            expect(catalog.filteredCourses.every(c => c.category === 'marketing')).toBe(true);
        });

        test('should search courses by title', () => {
            catalog.handleSearch('management');

            expect(catalog.filteredCourses.length).toBeGreaterThan(0);
            expect(
                catalog.filteredCourses.every(c =>
                    c.title.toLowerCase().includes('management')
                )
            ).toBe(true);
        });
        
        test('should show empty message for no search results', () => {
            catalog.handleSearch('nonexistent_query_12345');
            const emptyMessage = document.querySelector('.courses__empty');
            expect(emptyMessage).not.toBeNull();
            expect(emptyMessage.textContent).toContain('No courses found');
        });

        test('should apply both filter and search', () => {
            catalog.handleFilter('management', document.querySelector('[data-category="marketing"]'));
            catalog.handleSearch('product');

            expect(catalog.filteredCourses).toHaveLength(1);
            expect(catalog.filteredCourses[0].title).toBe('Product Management Fundamentals');
        });

        test('should render course cards', () => {
            catalog.renderCourses();
            const cards = document.querySelectorAll('.course-card');
            expect(cards.length).toBe(9);
        });

        test('should increase itemsToShow when handleLoadMore is called', () => {
            const initialItems = catalog.itemsToShow;
            catalog.handleLoadMore();

            expect(catalog.itemsToShow).toBe(Math.min(initialItems + 9, catalog.filteredCourses.length));
        });

        test('should sanitize malicious input', () => {
            const malicious = '<script>alert("xss")</script>';
            const sanitized = catalog.sanitizeInput(malicious);

            expect(sanitized).toBe('&lt;script&gt;alert("xss")&lt;/script&gt;');
        });

        test('should have correct category counts on init', () => {
            catalog.updateCategoryCounts();
            
            const marketingCount = coursesData.filter(c => c.category === 'marketing').length;
            const managementCount = coursesData.filter(c => c.category === 'management').length;
            const hrCount = coursesData.filter(c => c.category === 'hr').length;

            expect(marketingCount).toBe(4);
            expect(managementCount).toBe(3);
            expect(hrCount).toBe(5);
        });
    });

    describe('with partial or empty DOM', () => {
        test('should not throw errors if DOM elements are missing', () => {
            document.body.innerHTML = ``; // Empty DOM
            const catalog = new CourseCatalog();
            // init() should run without errors
            expect(() => catalog.init()).not.toThrow();
        });
    });
});