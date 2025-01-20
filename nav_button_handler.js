document.addEventListener("DOMContentLoaded", function() {
    const mainContent = document.querySelector('main');
    const headElement = document.getElementsByTagName('head')[0];

    document.querySelectorAll('nav button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default button click behavior
            const pageName = this.id.split('_')[1]; // assuming IDs like 'button_home'

            // Remove existing content-specific stylesheet
            const existingStyle = document.getElementById('content-style');
            if (existingStyle) {
                headElement.removeChild(existingStyle);
            }

            // Create new link element for the stylesheet
            const styleSheet = document.createElement('link');
            styleSheet.id = 'content-style';
            styleSheet.rel = 'stylesheet';
            styleSheet.type = 'text/css';
            styleSheet.href = `css/content/${pageName}.css`;
            headElement.appendChild(styleSheet);

            // Fetch and display the HTML content
            fetch(`content/${pageName}.html`)
                .then(response => response.text())
                .then(html => {
                    mainContent.innerHTML = html; // replace the main content
                })
                .catch(error => console.error('Error loading the page:', error));
        });
    });
});
