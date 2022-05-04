(
    () => {

        // CONTENTFUL
    
        const query = `{
            portfolioWorkCollection {
                total
                items {
                    title
                    description
                    type
                    url
                    secondUrl
                    repositoryLink
                    technologyUsed
                    display {
                        url
                    }
                    preSelected
                    sys {
                        id
                    }
                }
            }
        }`;
        
        const fetchOptions = {
            spaceID: "i98swu3sb2vt",
            accessToken: "G1qBTgDxffR6T0zuUayma0Z1kT-cIeWQ_CNPKMXDfZk",
            method: "POST",
            headers: {
                Authorization: "Bearer G1qBTgDxffR6T0zuUayma0Z1kT-cIeWQ_CNPKMXDfZk",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query })
        }
        
        fetch("https://graphql.contentful.com/content/v1/spaces/i98swu3sb2vt/environments/master", fetchOptions) // Read-only API for Published Data
            .then(response => response.json())
            .then(data => {
                // TODO: Call project section update functions
                console.log(data.data.portfolioWorkCollection.items);
            });
        
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

let projects = [];

function updatePreSelectedProjectDisplay(project) {
    
    const projectId = project['sys']['id'];
    projects[projectId] = project;


}

function buildProjectTileTemplate(project) {

    const projectId = project['sys']['id'];
    projects[projectId] = project;

    let html = `<div class="project-tile" data-project-id="${projects[projectId]}">
                [DISPLAY]
                <div class="overlay"></div>
                <div class="tech-used">
                   [TECH_USED_SVGS]
                </div>
            </div>`;


    // TODO: Check how to display autoplay screen record videos and determine if display file is video or an image

    // TODO: Build tech used svgs and insert into template         

}
