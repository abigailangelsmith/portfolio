(
    () => {
        function pageProgressBar() {
            const scrollableDistance = (document.body.clientHeight - window.innerHeight);
            let currentPosition = scrollY;
            
            let percentageComplete = ((currentPosition / scrollableDistance) * 100);

            // Apply percentage width to progress bar to element.
            const element = document.querySelector('#progress-bar');
            element.style.width = percentageComplete + '%';
        }

        // Initialising functions.
        document.addEventListener('scroll', function () {
            pageProgressBar();
        });
    }
)();
