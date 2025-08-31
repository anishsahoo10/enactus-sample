// Projects See More Functionality
function toggleProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    const seeMoreBtn = document.getElementById('seeMoreBtn');
    
    if (projectsGrid.classList.contains('show-all')) {
        // Hide extra projects
        projectsGrid.classList.remove('show-all');
        seeMoreBtn.textContent = 'See More Projects';
        
        // Scroll back to projects section
        document.getElementById('projects').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        // Show all projects
        projectsGrid.classList.add('show-all');
        seeMoreBtn.textContent = 'Show Less';
    }
}