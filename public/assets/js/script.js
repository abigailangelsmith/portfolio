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

                if (data.data.portfolioWorkCollection.items.length === 0) {
                    document.querySelector('#work .project-hightlight').innerHTML = `<h1>Projects coming soon...</h1>`;
                }
                
                data.data.portfolioWorkCollection.items.forEach(item => {
                    if (item.preSelected) {
                        updatePreSelectedProjectDisplay(item);
                    } else {
                        buildProjectTileTemplate(item);
                    }
                });
            });
        
        // NAVIGATION

        function onScrollNavigationActiveToggle() {

            let trackedScrollPositions = {
                introduction: 0,
                work: document.querySelector('#introduction').getBoundingClientRect().height,
                contact: document.querySelector('#introduction').getBoundingClientRect().height + document.querySelector('#work').getBoundingClientRect().height
            };

            let navigationItems = {
                introduction: document.querySelector('header nav section:nth-of-type(1) a:nth-of-type(1) p'),
                work: document.querySelector('header nav section:nth-of-type(1) a:nth-of-type(2) p'),
                contact: document.querySelector('header nav section:nth-of-type(2) a:nth-of-type(1) p')
            };

            let currentActive = document.querySelector("nav .active");

            if (
                scrollY >= trackedScrollPositions.introduction &&
                scrollY < trackedScrollPositions.work &&
                !navigationItems.introduction.classList.contains('active')
            ) {
                currentActive.classList.remove('active');
                navigationItems.introduction.classList.add('active');
            }

            if (scrollY >= (trackedScrollPositions.work - 300)) {
                let children = document.querySelector('#work').children;
                
                for (let element of children) {
                    element.style.opacity = '1';
                };
            }

            if (
                scrollY >= trackedScrollPositions.work &&
                scrollY < trackedScrollPositions.contact &&
                !navigationItems.work.classList.contains('active')
            ) {
                currentActive.classList.remove('active');
                navigationItems.work.classList.add('active');
            }

            if (scrollY >= (trackedScrollPositions.contact - 200)) {
                let children = document.querySelector('#contact').children;
                
                for (let element of children) {
                    element.style.opacity = '1';
                };
            }

            if (
                scrollY >= trackedScrollPositions.contact &&
                !navigationItems.contact.classList.contains('active')
            ) {
                currentActive.classList.remove('active');
                navigationItems.contact.classList.add('active');
            }

        }

        window.addEventListener('scroll', onScrollNavigationActiveToggle);

        // COLOUR SCHEME

        let root = document.documentElement;
        let body = document.body;
        let picture = document.querySelector('#picture-of-me img');
        let colourSchemeIcons = document.querySelectorAll("#colour-changing-options > svg");

        let storedColourScheme = sessionStorage.getItem('colourScheme');
        if (storedColourScheme !== null) {
            updateForStoredColourScheme(storedColourScheme);
        }

        function updateForStoredColourScheme(scheme) {
            if (scheme == 'p-t') {
                return;
            }

            let colourSchemeIcon = document.querySelector('#colour-changing-options svg[data-scheme="' + scheme + '"]');
            colourSchemeIcon.dataset.scheme = 'p-t';

            root.style.setProperty('--main-colour', 'var(--' + scheme + '_main-colour)');
            root.style.setProperty('--accent-colour', 'var(--' + scheme + '_accent-colour)');
            root.style.setProperty('--opacity-colour', 'var(--' + scheme + '_opacity-colour)');
            root.style.setProperty('--main-nav-arrow', 'var(--' + scheme + '_main-nav-arrow)');
            root.style.setProperty('--accent-nav-arrow', 'var(--' + scheme + '_accent-nav-arrow)');
            
            picture.src = '/public/assets/images/pictures/picture_' + scheme + '.png';
            body.dataset.currentColourScheme = scheme;
        }

        function onClickColourSchemeChange(event) {
            const scheme = event.target.dataset.scheme;
            sessionStorage.setItem('colourScheme', scheme);

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

        headerIntroduction();

    }
)();

const techSVGCodes = {
    'HTML': `<svg xmlns="http://www.w3.org/2000/svg" width="57.87" height="81.519" viewBox="0 0 57.87 81.519">
                <path d="M17.825,12.722h3.37v3.691H24.88V5.391H21.194V9.033h-3.37V5.391H14.141V16.413h3.684Z" transform="translate(-8.832 -5.391)"/>
                <path d="M24.8,16.413h3.684V9.048h3.242V5.391H21.561V9.048H24.8Z" transform="translate(-3.911 -5.391)"/>
                <path d="M32.248,10.953l2.538,3.917h.062l2.533-3.917v5.46h3.671V5.391H37.21L34.848,9.27,32.486,5.391h-3.84V16.413h3.6Z" transform="translate(0.787 -5.391)"/>
                <path d="M46.072,12.772H40.891V5.391H37.207V16.413h8.865Z" transform="translate(6.464 -5.391)"/>
                <path d="M10.949,14.926l5.269,59.1L39.87,80.586l23.67-6.561,5.279-59.1H10.949ZM57.388,34.252H29.651l.662,7.423H56.729L54.742,63.933,39.883,68.049l-.01,0-14.849-4.12L23.988,52.291h7.275L31.8,58.33l8.073,2.182.01,0h0l8.081-2.182.842-9.4H23.687L21.73,27.007H58.035Z" transform="translate(-10.949 0.932)"/>
            </svg>`,

    'CSS': `<svg xmlns="http://www.w3.org/2000/svg" width="57.87" height="81.471" viewBox="0 0 57.87 81.471">
                <g transform="translate(0 -9.418)">
                <g transform="translate(0 26.233)">
                    <path d="M65.53,6,60.277,64.19,36.595,70.655,12.912,64.19,7.66,6ZM20.7,42.946l1.008,11.222L36.595,58.3h0l14.843-4.041L54.72,17.892h-36.3l.657,7.135H46.771l-.657,7.32H19.736l.633,7.135H45.505l-.844,9.237-8.066,2.171h0l-8.09-2.147-.539-5.8Z" transform="translate(-7.66 -6)"/>
                </g>
                <path d="M23.591,18.657a10.653,10.653,0,0,1-3.612.563,7.351,7.351,0,0,1-3.472-.769,5.265,5.265,0,0,1-2.228-2.188,6.765,6.765,0,0,1-.769-3.274,7.207,7.207,0,0,1,.861-3.551,5.957,5.957,0,0,1,2.435-2.4,7.512,7.512,0,0,1,3.621-.848,12.586,12.586,0,0,1,3.164.4v3.507A4.465,4.465,0,0,0,22.334,9.6a6.282,6.282,0,0,0-1.477-.176,3.305,3.305,0,0,0-2.439.888,3.245,3.245,0,0,0-.892,2.408,3.189,3.189,0,0,0,.892,2.386,3.261,3.261,0,0,0,2.386.875,6.191,6.191,0,0,0,2.786-.7Zm10.714-3.472a3.64,3.64,0,0,1-.672,2.188,3.985,3.985,0,0,1-1.885,1.389,8.291,8.291,0,0,1-2.918.457,9.531,9.531,0,0,1-3.621-.668V15.1a7.153,7.153,0,0,0,1.749.936,5.145,5.145,0,0,0,1.784.356,1.761,1.761,0,0,0,.967-.224.733.733,0,0,0,.343-.655.888.888,0,0,0-.171-.541,1.683,1.683,0,0,0-.519-.435,9.659,9.659,0,0,0-1.288-.554q-3.041-1.169-3.041-3.779A3.531,3.531,0,0,1,26.421,7.28a5.858,5.858,0,0,1,3.727-1.094q.659,0,1.213.053t1.006.132q.453.079,1.27.3V9.877a6.49,6.49,0,0,0-3.129-.87,1.931,1.931,0,0,0-1.02.237.73.73,0,0,0-.387.65.816.816,0,0,0,.312.655,5.85,5.85,0,0,0,1.305.672,7.237,7.237,0,0,1,2.773,1.731A3.3,3.3,0,0,1,34.305,15.186Zm10.292,0a3.64,3.64,0,0,1-.672,2.188,3.985,3.985,0,0,1-1.885,1.389,8.291,8.291,0,0,1-2.918.457,9.531,9.531,0,0,1-3.621-.668V15.1a7.153,7.153,0,0,0,1.749.936,5.145,5.145,0,0,0,1.784.356A1.761,1.761,0,0,0,40,16.166a.733.733,0,0,0,.343-.655.888.888,0,0,0-.171-.541,1.683,1.683,0,0,0-.519-.435,9.659,9.659,0,0,0-1.288-.554q-3.041-1.169-3.041-3.779A3.531,3.531,0,0,1,36.713,7.28,5.858,5.858,0,0,1,40.44,6.186q.659,0,1.213.053t1.006.132q.453.079,1.27.3V9.877a6.49,6.49,0,0,0-3.129-.87,1.931,1.931,0,0,0-1.02.237.73.73,0,0,0-.387.65.816.816,0,0,0,.312.655,5.85,5.85,0,0,0,1.305.672,7.237,7.237,0,0,1,2.773,1.731A3.3,3.3,0,0,1,44.6,15.186Z" transform="translate(0 3.232)"/>
                </g>
            </svg>`,

    'JavaScript': `<svg xmlns="http://www.w3.org/2000/svg" width="57.87" height="57.87" viewBox="0 0 57.87 57.87">
                        <path d="M32,32V89.87H89.87V32ZM63,76.953c0,5.633-3.328,8.38-8.144,8.38A8.439,8.439,0,0,1,46.7,80.36h0l4.428-2.68c.854,1.515,1.5,2.8,3.366,2.8,1.55,0,2.824-.7,2.824-3.418V58.868H63ZM75.835,85.2c-5.049,0-8.312-2.279-9.905-5.425h0l4.435-2.567a5.808,5.808,0,0,0,5.361,3.173c2.253,0,3.561-1,3.561-2.551,0-1.864-1.347-2.524-3.834-3.617l-1.359-.584c-3.924-1.669-6.526-3.767-6.526-8.2,0-4.078,3.107-7.057,7.962-7.057,3.458,0,5.942,1.075,7.731,4.221l-4.242,2.727c-.933-1.67-1.938-2.325-3.5-2.325a2.365,2.365,0,0,0-2.6,2.325c0,1.631,1.01,2.292,3.34,3.3l1.359.583c4.623,1.982,7.226,4,7.226,8.546C84.848,82.653,81,85.2,75.835,85.2Z" transform="translate(-32 -32)"/>
                   </svg>`,
    
    'PHP': `<svg xmlns="http://www.w3.org/2000/svg" width="57.87" height="30.442" viewBox="0 0 57.87 30.442">
                <path d="M16.9,16.584H14.627l-1.242,6.385h2.021a4.889,4.889,0,0,0,2.995-.757,4.021,4.021,0,0,0,1.326-2.529,2.764,2.764,0,0,0-.3-2.4A3.4,3.4,0,0,0,16.9,16.584Zm12.032-10.9C12.956,5.688,0,12.5,0,20.908S12.956,36.13,28.935,36.13,57.87,29.313,57.87,20.908,44.914,5.688,28.935,5.688ZM21.074,23.654a5.852,5.852,0,0,1-2.211,1.329,10.3,10.3,0,0,1-3.1.4H12.917l-.788,4.053H8.806l2.966-15.254h6.39a5.3,5.3,0,0,1,4.205,1.514,4.742,4.742,0,0,1,.8,4.225,6.647,6.647,0,0,1-2.088,3.737Zm9.7,1.724,1.309-6.749a1.824,1.824,0,0,0-.164-1.57,2.314,2.314,0,0,0-1.657-.42H27.633l-1.7,8.741h-3.3L25.6,10.125h3.3L28.11,14.18h2.937q2.774,0,3.824.967t.634,3.132l-1.379,7.1ZM49.1,19.917a6.708,6.708,0,0,1-.735,2.042,6.886,6.886,0,0,1-1.353,1.7A5.884,5.884,0,0,1,44.8,24.983a10.309,10.309,0,0,1-3.1.4H38.85l-.788,4.056H34.739L37.7,14.18h6.387A5.3,5.3,0,0,1,48.3,15.695,4.735,4.735,0,0,1,49.1,19.917Zm-6.257-3.332H40.564L39.32,22.969h2.021a4.88,4.88,0,0,0,2.995-.757,4.034,4.034,0,0,0,1.329-2.529,2.763,2.763,0,0,0-.3-2.4A3.4,3.4,0,0,0,42.838,16.584Z" transform="translate(0 -5.688)"/>
            </svg>`,

    'Laravel': `<svg xmlns="http://www.w3.org/2000/svg" width="57.87" height="39.607" viewBox="0 0 57.87 39.607">
                    <g transform="translate(0)">
                    <g transform="translate(0 0)">
                        <path d="M83.645,117.084c-.38-.434-5.678-7.061-6.609-8.182s-1.392-.922-1.962-.841-7.278,1.211-8.055,1.338-1.266.443-.787,1.112c.425.6,4.828,6.844,5.8,8.218l-17.513,4.2L40.583,99.644c-.552-.823-.669-1.112-1.935-1.049s-10.931.859-11.618.922-1.446.362-.759,1.989,11.663,25.279,11.97,25.966a2.35,2.35,0,0,0,2.965,1.356c1.908-.461,8.526-2.188,12.142-3.137,1.908,3.463,5.8,10.479,6.528,11.482.959,1.347,1.628,1.121,3.1.669,1.157-.353,18.046-6.429,18.805-6.736s1.229-.534.714-1.3c-.38-.56-4.837-6.528-7.169-9.656,1.6-.425,7.287-1.935,7.893-2.107.714-.181.814-.524.425-.958ZM51.8,123.593c-.208.045-10.018,2.4-10.542,2.513s-.524.063-.588-.117S29.01,101.877,28.847,101.578s-.154-.534,0-.534,9.267-.814,9.584-.832.289.054.407.253c0,0,12.856,22.187,13.073,22.576C52.146,123.431,52.011,123.548,51.8,123.593Zm27.666,5.19c.154.244.316.406-.181.579s-16.609,5.615-16.916,5.75-.561.181-.958-.407-5.642-9.656-5.642-9.656l17.07-4.439c.425-.136.561-.226.832.2S79.315,128.539,79.469,128.783Zm1.094-12.124c-.38.081-6.654,1.636-6.654,1.636l-5.126-7.034c-.144-.208-.262-.407.1-.452s6.184-1.1,6.446-1.157.488-.136.814.307,4.756,6.057,4.927,6.275-.126.335-.506.425Z" transform="translate(-26 -98.587)"/>
                    </g>
                    </g>
                </svg>`,
    
    'Shopify': `<svg xmlns="http://www.w3.org/2000/svg" width="57.87" height="65.809" viewBox="0 0 57.87 65.809">
                    <path d="M39.532,65.751l19.786-4.28s-7.14-48.3-7.2-48.616a.606.606,0,0,0-.579-.526c-.266,0-5.289-.373-5.289-.373s-3.5-3.493-3.946-3.869a1.052,1.052,0,0,0-.332-.2L39.469,65.751h.063ZM29.587,31a11.707,11.707,0,0,0-4.864-1.163c-3.968,0-4.124,2.484-4.124,3.129,0,3.378,8.884,4.7,8.884,12.693,0,6.293-3.949,10.31-9.339,10.31a12.86,12.86,0,0,1-9.707-4.017l1.771-5.72s3.414,2.923,6.252,2.923A2.589,2.589,0,0,0,21.133,46.6c0-4.439-7.277-4.645-7.277-11.952-.093-6.134,4.308-12.109,13.236-12.109a10.923,10.923,0,0,1,5.141.99l-2.591,7.445L29.587,31ZM28.106,2.276a1.841,1.841,0,0,1,1.111.37c-2.7,1.275-5.66,4.494-6.877,10.946-1.8.584-3.545,1.111-5.18,1.585C18.583,10.283,22.021,2.3,28.106,2.3Zm3.386,8.086v.37c-2.067.636-4.341,1.327-6.564,2.018C26.206,7.878,28.583,5.5,30.645,4.6A16.132,16.132,0,0,1,31.492,10.362ZM32.97,4.236c1.9.2,3.129,2.377,3.918,4.812-.957.313-2.015.633-3.175,1V9.361a15.592,15.592,0,0,0-.743-5.13v.005Zm8.2,3.534c-.055,0-.165.058-.214.058S40.168,8.034,39,8.4c-1.16-3.381-3.225-6.5-6.877-6.5H31.81A4.512,4.512,0,0,0,28.366,0C19.85,0,15.781,10.631,14.506,16.03c-3.274,1-5.657,1.744-5.923,1.848-1.851.584-1.9.636-2.117,2.386C6.26,21.53,1.448,58.825,1.448,58.825l37.185,6.984L41.174,7.771Z" transform="translate(-1.448)"/>
                </svg>`,
    
    'GraphQL': `<svg xmlns="http://www.w3.org/2000/svg" width="57.87" height="65.023" viewBox="0 0 57.87 65.023">
                    <path d="M35.812,7.453l13.37,7.721A5.792,5.792,0,1,1,54.75,24.8v15.44a5.8,5.8,0,1,1-5.7,9.491L35.758,57.4a5.8,5.8,0,1,1-11.062.187L11.323,49.872A5.8,5.8,0,1,1,5.763,40.23l0-15.44A5.8,5.8,0,1,1,10.02,14.137a5.639,5.639,0,0,1,1.3,1.021L24.7,7.437a5.8,5.8,0,1,1,11.113.016Zm-1.4,2.376a2.15,2.15,0,0,1-.157.157L51.764,40.3c.07-.024.152-.043.222-.062V24.779a5.785,5.785,0,0,1-4.221-7.012c.016-.065.033-.133.051-.2l-13.4-7.743Zm-8.168.16-.163-.163-13.4,7.727A5.787,5.787,0,0,1,8.727,24.72c-.07.022-.138.038-.206.057V40.241l.228.062,17.5-30.317-.005,0Zm5.624,1.374a5.842,5.842,0,0,1-3.229,0l-17.5,30.314a5.878,5.878,0,0,1,1.626,2.82h34.98a5.828,5.828,0,0,1,1.634-2.828Zm2.671,43.964,13.311-7.689c-.041-.127-.073-.255-.1-.385H12.759l-.057.225L26.083,55.2a5.807,5.807,0,0,1,8.461.122Z" transform="translate(-1.32)"/>
                </svg>`
};

let projects = [];

function buildProjectTileTemplate(project) {

    const projectId = project['sys']['id'];

    if (!(projectId in projects)) {
        projects[projectId] = project;
    }

    let techUsedSVGs = '';

    project.technologyUsed.forEach(tech => {
        if (tech in techSVGCodes) {
            techUsedSVGs += techSVGCodes[tech];
        }
    });

    let html = `<div class="project-tile" data-project-id="${projectId}">
                    <img src="${project.display.url}" alt="${project.title}">
                    <div class="overlay"></div>
                    <div class="tech-used">
                        ${techUsedSVGs}
                    </div>
                </div>`;

    document.querySelector('#work .project-tiles').insertAdjacentHTML("beforeend", html);

    document.querySelector('#work .project-tiles .project-tile[data-project-id="' + projectId + '"]').addEventListener('click', switchHighlightedProject);
}

function updatePreSelectedProjectDisplay(project) {
    
    const projectId = project['sys']['id'];

    if (!(projectId in projects)) {
        projects[projectId] = project;
    }

    document.querySelector('#work .project-hightlight').dataset.projectId = projectId;

    document.querySelector('#work .project-hightlight .project-highlight-display > img').src = project.display.url;
    document.querySelector('#work .project-hightlight .project-highlight-display > img').alt = project.title;

    document.querySelector('#work .project-hightlight .project-highlight-information > h2').innerText = project.title;
    document.querySelector('#work .project-hightlight .project-highlight-information > p').innerText = project.description;

    if (project.url !== null) {
        document.querySelector('#work .project-hightlight .project-highlight-information .project-links .website').href = project.url;
        document.querySelector('#work .project-hightlight .project-highlight-information .project-links .website p').innerText = project.url;
        document.querySelector('#work .project-hightlight .project-highlight-information .project-links .website').style.display = "flex";
    } else {
        document.querySelector('#work .project-hightlight .project-highlight-information .project-links .website').style.display = "none";
    }

    if (project.repositoryLink !== null) {
        document.querySelector('#work .project-hightlight .project-highlight-information .project-links .repository').href = project.repositoryLink;
        document.querySelector('#work .project-hightlight .project-highlight-information .project-links .repository p').innerText = project.repositoryLink;
        document.querySelector('#work .project-hightlight .project-highlight-information .project-links .repository').style.display = "flex";
    } else {
        document.querySelector('#work .project-hightlight .project-highlight-information .project-links .repository').style.display = "none";
    }

    document.querySelector('#work .project-hightlight .project-highlight-information .tech-used').innerHTML = "";

    project.technologyUsed.forEach(tech => {
        if (tech in techSVGCodes) {
            document.querySelector('#work .project-hightlight .project-highlight-information .tech-used').insertAdjacentHTML("beforeend", techSVGCodes[tech]);
        }
    });

    return 'done';
}

function updateProjectTile(project, tileId) {

    let techUsedSVGs = '';

    project.technologyUsed.forEach(tech => {
        if (tech in techSVGCodes) {
            techUsedSVGs += techSVGCodes[tech];
        }
    });

    document.querySelector('#work .project-tiles .project-tile[data-project-id="' + tileId + '"] img').src = project.display.url;
    document.querySelector('#work .project-tiles .project-tile[data-project-id="' + tileId + '"] img').alt = project.title;

    document.querySelector('#work .project-tiles .project-tile[data-project-id="' + tileId + '"] .tech-used').innerHTML = techUsedSVGs;

    document.querySelector('#work .project-tiles .project-tile[data-project-id="' + tileId + '"]').dataset.projectId = project.sys.id;

}

function switchHighlightedProject(event) {

    let newlySelectedId = event.target.dataset.projectId;
    let currentlyHighlightedId = document.querySelector('#work .project-hightlight').dataset.projectId;

    document.querySelector('#work .project-hightlight').style.opacity = 0;
    event.target.style.opacity = 0;

    document.querySelector('#work .project-tiles').style.pointerEvents = 'none';

    setTimeout(() => {
        updatePreSelectedProjectDisplay(projects[newlySelectedId]);
        updateProjectTile(projects[currentlyHighlightedId], newlySelectedId);
        document.querySelector('#work .project-hightlight').style.opacity = 1;
        event.target.style.opacity = 1;
        document.querySelector('#work .project-tiles').style.pointerEvents = 'all';
    }, 500);
}

function headerIntroduction() {
    setTimeout(() => {
        document.querySelector('header nav').style.opacity = 1;
        document.querySelector('header nav').style.pointerEvents = 'all';
        document.querySelector('header nav').style.transition = 'opacity 1s';
    }, 3000);
}
