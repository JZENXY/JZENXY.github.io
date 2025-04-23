// Firefox browser detection and fixes
document.addEventListener('DOMContentLoaded', function() {
    // Detect Firefox browser
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    
    if (isFirefox) {
        document.body.classList.add('firefox');
        
        // Additional Firefox-specific fixes
        const splineViewer = document.querySelector('spline-viewer');
        const heroContent = document.querySelector('.hero-content');
        
        if (splineViewer) {
            // Force re-render for Firefox
            splineViewer.style.opacity = '0.7';
            splineViewer.style.zIndex = '0';
            
            // Sometimes Firefox needs this to properly handle 3D elements
            splineViewer.style.transformStyle = 'preserve-3d';
            splineViewer.style.webkitTransformStyle = 'preserve-3d';
            splineViewer.style.mozTransformStyle = 'preserve-3d';
        }
        
        if (heroContent) {
            heroContent.style.zIndex = '10';
            heroContent.style.position = 'relative';
        }
    }
});
