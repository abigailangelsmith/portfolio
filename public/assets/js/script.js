(
    () => {
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
    }
)();
