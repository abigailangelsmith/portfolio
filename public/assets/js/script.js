(
    () => {

        // NAVIGATION

        // Get Elements
        let navigationElements = document.querySelectorAll("nav a p");

        function onClickNavigationActiveToggle(event) {
            let currentActive = document.querySelector("nav .active");

            if (event.target !== currentActive) {
                currentActive.classList.remove("active");
                event.target.classList.add("active");
            }
        }

        navigationElements.forEach((element) => {
            element.addEventListener('click', onClickNavigationActiveToggle);
        });

        // COLOUR SCHEME

        let root = document.documentElement;
        let body = document.body;
        let picture = document.querySelector('#picture-of-me img');
        let colourSchemeIcons = document.querySelectorAll("#colour-changing-options > svg");

        function onClickColourSchemeChange(event) {
            const scheme = event.target.dataset.scheme;

            root.style.setProperty('--main-colour', 'var(--' + scheme + '_main-colour)');
            root.style.setProperty('--accent-colour', 'var(--' + scheme + '_accent-colour)');
            root.style.setProperty('--opacity-colour', 'var(--' + scheme + '_opacity-colour)');
            root.style.setProperty('--main-nav-arrow', 'var(--' + scheme + '_main-nav-arrow)');
            root.style.setProperty('--accent-nav-arrow', 'var(--' + scheme + '_accent-nav-arrow)');
            
            picture.src = '/public/assets/images/pictures/picture_' + scheme + '.png';
        
            const oldScheme = body.dataset.currentColourScheme;

            event.target.dataset.scheme = oldScheme;
            body.dataset.currentColourScheme = scheme;
        }

        colourSchemeIcons.forEach((icon) => {
            icon.addEventListener('click', onClickColourSchemeChange);
        });

    }
)();
