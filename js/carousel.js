document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    // Function to check if viewport is mobile size
    const isMobile = () => window.innerWidth <= 768;
    
    // Function to apply the correct layout based on screen size
    function setCarouselLayout() {
        if (isMobile()) {
            // Mobile layout
            document.body.classList.add('mobile-view');
            document.body.classList.remove('desktop-view');
            
            if (track) {
                // Set mobile styles inline for better GitHub Pages compatibility
                track.style.animation = 'none';
                track.style.flexDirection = 'column';
                track.style.width = '100%';
                track.style.transform = 'none';
                
                // Set mobile styles for clone containers
                const cloneContainers = document.querySelectorAll('.clone-container');
                cloneContainers.forEach((container, index) => {
                    container.style.flexDirection = 'column';
                    container.style.width = '100%';
                    
                    // Hide the second clone container
                    if (index === 1) {
                        container.style.display = 'none';
                    }
                });
                
                // Set mobile styles for work links
                const workLinks = document.querySelectorAll('.work-link');
                workLinks.forEach(link => {
                    link.style.width = '100%';
                    link.style.height = 'auto';
                    link.style.aspectRatio = '16/9';
                    link.style.marginRight = '0';
                });
            }
            
            // Hide navigation on mobile
            if (document.querySelector('.carousel-nav')) {
                document.querySelector('.carousel-nav').style.display = 'none';
            }
            
        } else {
            // Desktop layout
            document.body.classList.add('desktop-view');
            document.body.classList.remove('mobile-view');
            
            if (track) {
                // Reset desktop styles
                track.style.animation = 'infiniteScroll 20s linear infinite';
                track.style.flexDirection = 'row';
                track.style.width = '200%';
                track.style.transform = '';
                
                // Reset desktop styles for clone containers
                const cloneContainers = document.querySelectorAll('.clone-container');
                cloneContainers.forEach(container => {
                    container.style.flexDirection = 'row';
                    container.style.display = 'flex';
                });
                
                // Reset desktop styles for work links
                const workLinks = document.querySelectorAll('.work-link');
                workLinks.forEach(link => {
                    link.style.width = '160px';
                    link.style.height = '200px';
                    link.style.aspectRatio = 'auto';
                });
            }
            
            // Show navigation on desktop
            if (document.querySelector('.carousel-nav')) {
                document.querySelector('.carousel-nav').style.display = 'flex';
            }
        }
    }
    
    // Apply layout on page load
    setCarouselLayout();
    
    // Update layout on window resize
    window.addEventListener('resize', setCarouselLayout);
    
    // Only set up navigation on desktop
    if (prevButton && nextButton && track && !isMobile()) {
        let position = 0;
        const itemWidth = document.querySelector('.work-link')?.offsetWidth || 160;
        const gap = 16; // Roughly equivalent to 1rem gap
        const moveAmount = itemWidth + gap;
        
        prevButton.addEventListener('click', function() {
            if (isMobile()) return;
            
            // Pause animation
            track.style.animation = 'none';
            track.style.transition = 'transform 0.5s ease-in-out';
            
            // Move to previous
            position += moveAmount;
            track.style.transform = `translateX(${position}px)`;
            
            // Handle infinite loop effect
            if (position > 0) {
                setTimeout(() => {
                    track.style.transition = 'none';
                    const cloneWidth = track.clientWidth / 2;
                    position = -cloneWidth;
                    track.style.transform = `translateX(${position}px)`;
                    
                    setTimeout(() => {
                        track.style.transition = 'transform 0.5s ease-in-out';
                    }, 50);
                }, 500);
            }
        });
        
        nextButton.addEventListener('click', function() {
            if (isMobile()) return;
            
            // Pause animation
            track.style.animation = 'none';
            track.style.transition = 'transform 0.5s ease-in-out';
            
            // Move to next
            position -= moveAmount;
            track.style.transform = `translateX(${position}px)`;
            
            // Handle infinite loop effect
            const cloneWidth = track.clientWidth / 2;
            if (Math.abs(position) > cloneWidth) {
                setTimeout(() => {
                    track.style.transition = 'none';
                    position = 0;
                    track.style.transform = `translateX(${position}px)`;
                    
                    setTimeout(() => {
                        track.style.transition = 'transform 0.5s ease-in-out';
                    }, 50);
                }, 500);
            }
        });
        
        // Resume auto-animation when not interacting
        track.addEventListener('mouseleave', function() {
            if (isMobile()) return;
            
            if (!track.style.transform.includes('translateX')) {
                track.style.animation = 'infiniteScroll 20s linear infinite';
            }
        });
    }
    
    // Force a reflow to ensure styles are applied (helps with GitHub Pages)
    setTimeout(setCarouselLayout, 100);
});
