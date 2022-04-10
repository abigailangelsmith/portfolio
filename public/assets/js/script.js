(
    () => {
        function pageProgressBar() {
            const scrollableDistance = (document.body.clientHeight - window.innerHeight);
            let currentPosition = scrollY;
            
        function mobileNav() {
            document.querySelector('nav > ul').classList.toggle('show');
        }
            let percentageComplete = ((currentPosition / scrollableDistance) * 100);

            // Apply percentage width to progress bar to element.
            const element = document.querySelector('#progress-bar');
            element.style.width = percentageComplete + '%';
        }

        // Initialising functions.
        document.addEventListener('scroll', function () {
            pageProgressBar();
        });

        document.querySelector('#mobile-nav-menu').addEventListener('click', function () {
            mobileNav();
        });
    }
)();
