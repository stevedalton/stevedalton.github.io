// Data structure containing all your links and descriptions
const siteData = {
    writings: [
        {
            title: "Sphere bundles",
            url: "pdfs/s2_bundles.pdf",
            description: "The classic example of two non-homotopic manifolds with the same homotopy/homology/cohomology groups comes from Lens spaces in dimension 3, but the actual math behind proving these work is somewhat complicated. I saw a much simpler example in one dimension higher on MathOverflow, so I wrote up the details in this very short note."
        },
        {
            title: "3-manifold cobordism",
            url: "pdfs/cobordism.pdf",
            description: "It's a classic result that every closed orientable 3-manifold bounds a 4-manifold; the proof I've always known used Dehn surgeries. A while ago on MathOverflow I saw the idea of using cohomology classes, so I wrote up the details."
        }
    ],
    solutions: [
        {
            title: "Algebra",
            url: "pdfs/isaacs_algebra.pdf",
            description: "Solutions to all problems in <it>Algebra: A Graduate Course</it> by Isaacs."
        },
        {
            title: "Finite Group Theory",
            url: "pdfs/isaacs_fgt.pdf",
            description: "Solutions to all problems in <it>Finite Group Theory</it> by Isaacs."
        }
    ],
    code: [
        // Left empty intentionally to demonstrate the "Coming soon!" message
    ],
    blog: [
        // Left empty intentionally to demonstrate the "Coming soon!" message
    ]
};

// Map keys to readable titles for the homepage sections
const sectionTitles = {
    writings: "Latest Math Writings",
    solutions: "Latest Solutions",
    code: "Latest Code",
    blog: "Latest Blog Posts"
};

const contentContainer = document.getElementById('content-container');
const navButtons = document.querySelectorAll('.nav-btn');

function renderList(items) {
    const list = document.createElement('ul');
    list.className = 'item-list';

    items.forEach(item => {
        const li = document.createElement('li');
        li.className = 'item';
        li.innerHTML = `
            <a href="${item.url}" class="item-title" target="_blank" rel="noopener noreferrer">${item.title}</a>
            <p class="item-desc">${item.description}</p>
        `;
        list.appendChild(li);
    });
    return list;
}

function renderContent(category) {
    contentContainer.innerHTML = '';

    if (category === 'home') {
        // Render a preview of each category
        Object.keys(siteData).forEach(cat => {
            const items = siteData[cat];
            
            const section = document.createElement('div');
            section.className = 'category-section';
            
            const title = document.createElement('h2');
            title.className = 'category-title';
            title.textContent = sectionTitles[cat];
            section.appendChild(title);
            
            if (!items || items.length === 0) {
                // Empty state for homepage preview
                const emptyMsg = document.createElement('p');
                emptyMsg.className = 'item-desc';
                emptyMsg.innerHTML = '<em>Coming soon! Content is currently being prepared for this section.</em>';
                section.appendChild(emptyMsg);
            } else {
                // Get only the first 2 items for the homepage preview
                const previewItems = items.slice(0, 2);
                const list = renderList(previewItems);
                
                const viewAllBtn = document.createElement('button');
                viewAllBtn.className = 'view-all-btn';
                viewAllBtn.textContent = `View all ${sectionTitles[cat].replace('Latest ', '')} →`;
                viewAllBtn.onclick = () => switchToCategory(cat);

                section.appendChild(list);
                section.appendChild(viewAllBtn);
            }
            
            contentContainer.appendChild(section);
        });
    } else {
        // Render a specific category page
        const items = siteData[category];
        
        if (!items || items.length === 0) {
            // Empty state for specific category page
            contentContainer.innerHTML = `
                <div style="text-align: center; padding: 3rem 1rem;">
                    <h2 style="margin-bottom: 1rem; color: var(--text-color);">Coming Soon!</h2>
                    <p style="color: var(--desc-color);">I'm currently working on adding content to this section. Check back later.</p>
                </div>
            `;
            return;
        }
        
        const list = renderList(items);
        contentContainer.appendChild(list);
    }
}

// Helper function to programmatically switch categories (used by "View all" buttons)
function switchToCategory(category) {
    navButtons.forEach(btn => {
        if (btn.getAttribute('data-target') === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    renderContent(category);
    window.scrollTo(0, 0); // Scroll back to top
}

// Event Listeners for Navigation
navButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        navButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        renderContent(e.target.getAttribute('data-target'));
    });
});

// Initialize default view (Home)
renderContent('home');