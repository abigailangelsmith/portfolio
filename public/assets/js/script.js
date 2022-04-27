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
        let colourSchemeIcons = document.querySelectorAll("#colour-changing-options > svg");

        function onClickColourSchemeChange(event) {
            // get target dataset info
            const scheme = event.target.dataset.scheme;

            // update css root properties with the chosen variable
            root.style.setProperty('--main-colour', 'var(--' + scheme + '_main-colour)');
            root.style.setProperty('--accent-colour', 'var(--' + scheme + '_accent-colour)');
            root.style.setProperty('--opacity-colour', 'var(--' + scheme + '_opacity-colour)');
            root.style.setProperty('--main-nav-arrow', 'var(--' + scheme + '_main-nav-arrow)');
            root.style.setProperty('--accent-nav-arrow', 'var(--' + scheme + '_accent-nav-arrow)');
        

            // change the icon and dataset property - use css to fill colours using the dataset property
            const oldScheme = body.dataset.currentColourScheme;

            event.target.dataset.scheme = oldScheme;
            body.dataset.currentColourScheme = scheme;

            // change css image path for nav active arrows

            // change picture to have the correct border colour - as not css controlled, can use css display property to change
        }

        colourSchemeIcons.forEach((icon) => {
            icon.addEventListener('click', onClickColourSchemeChange);
        });

    }
)();
