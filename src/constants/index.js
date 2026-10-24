const dockApps = [
    { id: "finder", name: "Projects", icon: "finder.png", canOpen: true },
    { id: "safari", name: "Articles", icon: "safari.png", canOpen: true },
    { id: "photos", name: "Gallery", icon: "photos.png", canOpen: true },
    { id: "contact", name: "Contact", icon: "contact.png", canOpen: true },
    { id: "terminal", name: "Skills", icon: "terminal.png", canOpen: true },
    { id: "trash", name: "Trash", icon: "trash.png", canOpen: true },
];

// Written from the project READMEs and resume. Edit freely — these are yours.
const articles = [
    {
        id: "auslink",
        title: "Rendering live trains across seven Australian cities",
        project: "AusLink",
        readTime: "3 min read",
        body: [
            "AusLink started with a simple question: could I build something like Mini Tokyo 3D for Australia? It's now a 3D map of public transport in Melbourne, Sydney, Newcastle, Adelaide, Perth, Brisbane and the Gold Coast, with every vehicle drawn from that state's live GTFS-realtime feed.",
            "The hard part wasn't the map, it was the data. Every transport authority publishes realtime data in a slightly different shape, so each state gets a small adapter that turns its feed into one internal vehicle format. The renderer never knows which city it's drawing, and adding a city is a single entry in a config file. Perth has no public realtime feed, so it runs off the timetable instead.",
            "Realtime feeds go quiet at 3am, so there's also a playback mode that simulates any time of day from the timetable, with a speed control. Viewport culling and level-of-detail rendering keep thousands of vehicles smooth. And when it's actually raining in the city on screen, rain falls over the map.",
        ],
    },
    {
        id: "finova",
        title: "Making a rate-limited market data API feel fast",
        project: "Finova",
        readTime: "2 min read",
        body: [
            "Finova is an investment platform for building and analysing portfolios. Market data comes from the Alpha Vantage API, which returns over a thousand data points per request and is strict about how often you can call it.",
            "The fix was a caching layer in front of the API, so repeat requests for the same data never leave the server. That cut redundant calls and brought latency down by about 40%.",
            "Two features sit on top of the data layer. A portfolio optimiser uses linear programming to simulate multi-asset allocations under a risk limit you choose. An AI assistant, running a custom model through Ollama, is given your portfolio's financial context so its answers are about your data rather than generic advice.",
        ],
    },
    {
        id: "bevoguard",
        title: "A semester building BevoGuard in Austin",
        project: "BevoGuard",
        readTime: "2 min read",
        body: [
            "I spent August to December 2025 on exchange at the University of Texas at Austin. Arriving in a new city makes one question very real: which neighbourhoods are safe, and what's happening around me right now?",
            "BevoGuard was our team's answer. It's a React and Flask web app that brings official city incident data, campus police logs, weather alerts and local news onto one map, with location-based search so new residents can check an area before they go.",
            "The pipeline ingests more than 10,000 incident reports. Keeping that fast came down to the unglamorous parts: indexed MySQL queries, lean Flask routes, containerised services and a CI/CD pipeline deploying to AWS.",
        ],
    },
];

const techStack = [
    { category: "Languages", items: ["Python", "Java", "SQL", "JavaScript", "TypeScript", "HTML/CSS", "C++", "C#", "Haskell", "Go", "Swift", "R"] },
    { category: "Frameworks", items: ["React", "Next.js", "Node.js", "Flask", "Unity", "Selenium", "Pygame", "NumPy", "Pandas", "LangChain"] },
    { category: "Cloud & DevOps", items: ["AWS (Lambda, DynamoDB, S3, Cognito)", "GCP", "Docker", "Kubernetes", "CI/CD", "REST APIs", "Terraform"] },
    { category: "AI & Security", items: ["OpenAI API", "Ollama", "LLM integration", "Prompt engineering", "CodeQL", "Semgrep", "OWASP"] },
    { category: "Tools", items: ["Git", "GitHub", "GitLab", "VS Code", "Postman", "Agile", "Unit testing", "PostgreSQL", "MySQL"] },
];

const socials = [
    { id: 1, text: "Email", value: "daniel.ngu05@gmail.com", icon: "/icons/mail.svg", link: "mailto:daniel.ngu05@gmail.com" },
    { id: 2, text: "LinkedIn", value: "daniel-nguyen-30b307306", icon: "/icons/linkedin.svg", link: "https://www.linkedin.com/in/daniel-nguyen-30b307306/" },
    { id: 3, text: "GitHub", value: "danielnguyen05", icon: "/icons/github.svg", link: "https://github.com/danielnguyen05" },
    { id: 4, text: "Phone", value: "0478 629 887", icon: "/icons/phone.svg", link: "tel:0478629887" },
];

const photosLinks = [
    { id: 1, icon: "/icons/gicon1.svg", title: "Library" },
    { id: 2, icon: "/icons/gicon2.svg", title: "Memories" },
    { id: 3, icon: "/icons/file.svg", title: "Places" },
    { id: 4, icon: "/icons/gicon4.svg", title: "People" },
    { id: 5, icon: "/icons/gicon5.svg", title: "Favorites" },
];

const gallery = [
    { id: 1, img: "/images/gal1.png" },
    { id: 2, img: "/images/gal2.png" },
    { id: 3, img: "/images/gal3.png" },
    { id: 4, img: "/images/gal4.png" },
];

export { dockApps, articles, techStack, socials, photosLinks, gallery };

const WORK_LOCATION = {
    id: 1,
    type: "work",
    name: "Projects",
    icon: "/icons/work.svg",
    kind: "folder",
    children: [
        {
            id: 5,
            name: "Finova Investment Platform",
            icon: "/images/folder.png",
            kind: "folder",
            children: [
                {
                    id: 1,
                    name: "About Finova.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    subtitle: "Finova Investment Platform",
                    description: [
                        "A full-stack platform for creating and managing personalised investment portfolios, with dashboards for real-time and historical market data.",
                        "Market data comes from the Alpha Vantage API (1,000+ data points per request). A caching layer cut redundant API calls and reduced latency by 40%.",
                        "An AI financial assistant runs a custom model through Ollama, embedding the user's financial context to answer complex questions about their portfolio.",
                        "A portfolio optimiser uses linear programming to simulate multi-asset allocations and optimise expected returns under configurable risk constraints.",
                    ],
                },
                {
                    id: 2,
                    name: "Source on GitHub",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://github.com/danielnguyen05/Finova-Investment-Platform/tree/main",
                },
                {
                    id: 3,
                    name: "finova.png",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    imageUrl: "/images/project-1.png",
                },
            ],
        },
        {
            id: 7,
            name: "BevoGuard",
            icon: "/images/folder.png",
            kind: "folder",
            children: [
                {
                    id: 1,
                    name: "About BevoGuard.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    subtitle: "BevoGuard",
                    description: [
                        "A civic safety platform built during my exchange semester at UT Austin. It brings city incident data, campus police logs, weather alerts and local news onto one interactive map so new residents can understand real-time safety conditions.",
                        "React frontend and Flask backend, with automated ingestion pipelines processing 10,000+ incident reports and RESTful APIs for retrieval, pagination and filtering.",
                        "Indexed MySQL queries and lean Flask routing keep it fast; containerised services and a CI/CD pipeline deploy it to AWS.",
                    ],
                },
                {
                    id: 2,
                    name: "Source on GitLab",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://gitlab.com/gautham.saravanan-cs373/cs373-bevoguard",
                },
                {
                    id: 3,
                    name: "Demo video",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://drive.google.com/file/d/12WSPhk16BPZISZRNQyqMQD4C6BXbPxjn/view",
                },
            ],
        },
        {
            id: 8,
            name: "AusLink",
            icon: "/images/folder.png",
            kind: "folder",
            children: [
                {
                    id: 1,
                    name: "About AusLink.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    subtitle: "AusLink",
                    description: [
                        "A real-time 3D map of Australian public transport, in the spirit of Mini Tokyo 3D. Switch between Melbourne, Sydney, Newcastle, Adelaide, Perth, Brisbane and the Gold Coast with an animated camera transition.",
                        "Live vehicle positions come from each state's GTFS-realtime feed (PTV, Transport for NSW, TransLink and Adelaide Metro). Per-state adapters normalise every feed into one vehicle format, so adding a city is a single config entry. Perth runs on its timetable.",
                        "Click a station for approaching services and ETAs, follow a vehicle with eight camera modes, or simulate any time of day. When it's raining in the city on screen, rain falls over the map.",
                        "Built with Mapbox GL JS, with viewport culling, level-of-detail rendering and edge caching to keep it smooth.",
                    ],
                },
                {
                    id: 2,
                    name: "Live site",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://auslink.netlify.app/",
                },
                {
                    id: 3,
                    name: "Source on GitHub",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://github.com/danielnguyen05/mini-aus",
                },
            ],
        },
        {
            id: 9,
            name: "LLM Security Research",
            icon: "/images/folder.png",
            kind: "folder",
            children: [
                {
                    id: 1,
                    name: "Security Regressions in LLM-Refactored Code.pdf",
                    icon: "/images/pdf.png",
                    kind: "file",
                    fileType: "pdf",
                    comingSoon: true,
                    subtitle: "Security Regressions in LLM-Refactored Code",
                },
            ],
        },
    ],
};

const ABOUT_LOCATION = {
    id: 2,
    type: "about",
    name: "About me",
    icon: "/icons/info.svg",
    kind: "folder",
    children: [
        {
            id: 5,
            name: "about-me.txt",
            icon: "/images/txt.png",
            kind: "file",
            fileType: "txt",
            subtitle: "Hi, I’m Daniel!",
            image: "/images/daniel.jpg",
            description: [
                "I study Computer Science at Monash University. I enjoy building unique, interactive, and engaging things that feel creative, a little outside the box, and fun to use.",
                "I like solving problems that make technology feel more intuitive for people, and I’m always learning something new (usually by breaking things first).",
                "I spend a lot of time working with modern technologies and I’m always trying to improve how I write code specifically focusing on clean architecture, efficiency, and building systems that are reliable, maintainable, and easy to extend.",
                "Outside of coding and uni life, you’ll usually find me at the gym, kicking butt (literally), or doing something active just to reset. I’m big on going outside too, whether it’s long walks in nature, going through the occasional photography phase, or just doing anything that gets me moving and away from a screen for a bit 😁",
            ],
        },
        { id: 1, name: "me.png", icon: "/images/image.png", kind: "file", fileType: "img", imageUrl: "/images/daniel.jpg" },
        { id: 2, name: "casual-me.png", icon: "/images/image.png", kind: "file", fileType: "img", imageUrl: "/images/daniel-2.jpg" },
        { id: 3, name: "seaworld-me.png", icon: "/images/image.png", kind: "file", fileType: "img", imageUrl: "/images/daniel-3.jpeg" },
        { id: 4, name: "kicking-me.png", icon: "/images/image.png", kind: "file", fileType: "img", imageUrl: "/images/daniel-4.jpg" },
    ],
};

const RESUME_LOCATION = {
    id: 3,
    type: "resume",
    name: "Resume",
    icon: "/icons/file.svg",
    kind: "folder",
    children: [
        { id: 1, name: "Resume.pdf", icon: "/images/pdf.png", kind: "file", fileType: "pdf" },
    ],
};

const TRASH_LOCATION = {
    id: 4,
    type: "trash",
    name: "Trash",
    icon: "/icons/trash.svg",
    kind: "folder",
    children: [
        {
            id: 1,
            name: "sleep_schedule.txt",
            icon: "/images/txt.png",
            kind: "file",
            fileType: "txt",
            description: [
                "Sleep Schedule v1.0",
                "Mon: 10:30 PM",
                "Tue: 10:30 PM",
                "Wed: 10:30 PM",
                "Thu: 10:30 PM",
                "Fri: 10:30 PM",
                "Error: Schedule integrity compromised.",
                "Detected irregularities:",
                "02:14 AM — “just one more video”",
                "03:07 AM — debugging something that worked",
                "03:42 AM — existential thoughts",
                "04:01 AM — why is my brain like this",
                "File corrupted beyond recovery.",
            ],
        },
        {
            id: 2,
            name: "final_final_final_REAL_v9_THIS_ONE (9).png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            imageUrl: "/images/trash-2.png",
        },
        {
            id: 3,
            name: "billion_dollar_app_idea_that_would_make_me_rich.txt",
            icon: "/images/txt.png",
            kind: "file",
            fileType: "txt",
            description: [],
        },
    ],
};

export const locations = {
    work: WORK_LOCATION,
    about: ABOUT_LOCATION,
    resume: RESUME_LOCATION,
    trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
    finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    pdfpreview: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };
