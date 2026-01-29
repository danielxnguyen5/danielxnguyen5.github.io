const navLinks = [
    {
        id: 1,
        name: "Projects",
        type: "finder",
    },
    {
        id: 3,
        name: "Contact",
        type: "contact",
    },
    {
        id: 4,
        name: "Resume",
        type: "resume",
    },
];

const navIcons = [
    {
        id: 1,
        img: "/icons/wifi.svg",
    },
    {
        id: 2,
        img: "/icons/search.svg",
    },
    {
        id: 3,
        img: "/icons/user.svg",
    },
    {
        id: 4,
        img: "/icons/mode.svg",
    },
];

const dockApps = [
    {
        id: "finder",
        name: "Portfolio", // was "Finder"
        icon: "finder.png",
        canOpen: true,
    },
    {
        id: "safari",
        name: "Articles", // was "Safari"
        icon: "safari.png",
        canOpen: true,
    },
    {
        id: "photos",
        name: "Gallery", // was "Photos"
        icon: "photos.png",
        canOpen: true,
    },
    {
        id: "contact",
        name: "Contact", // or "Get in touch"
        icon: "contact.png",
        canOpen: true,
    },
    {
        id: "terminal",
        name: "Skills", // was "Terminal"
        icon: "terminal.png",
        canOpen: true,
    },
    {
        id: "trash",
        name: "Archive", // was "Trash"
        icon: "trash.png",
        canOpen: false,
    },
];

const blogPosts = [
    {
        id: 1,
        date: "Sep 2, 2025",
        title:
            "TypeScript Explained: What It Is, Why It Matters, and How to Master It",
        image: "/images/blog1.png",
        link: "https://jsmastery.com/blog/typescript-explained-what-it-is-why-it-matters-and-how-to-master-it",
    },
    {
        id: 2,
        date: "Aug 28, 2025",
        title: "The Ultimate Guide to Mastering Three.js for 3D Development",
        image: "/images/blog2.png",
        link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-three-js-for-3d-development",
    },
    {
        id: 3,
        date: "Aug 15, 2025",
        title: "The Ultimate Guide to Mastering GSAP Animations",
        image: "/images/blog3.png",
        link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-gsap-animations",
    },
];

const techStack = [
    {
        category: "Languages",
        items: ["JavaScript", "Haskell", "Python", "Java", "Dafny"],
    },
    {
        category: "Backend",
        items: ["Node.js", "Express.js", "REST", "Testing", "APIs"]
    },
    {
        category: "Frontend",
        items: ["React.js", "Next.js", "HTML/CSS"],
    },
    {
        category: "Databases",
        items: ["PostgreSQL", "MongoDB", "MySQL"],
    },
    {
        category: "Dev Tools",
        items: ["Docker", "Git", "GitHub", "Postman", "Linux", "Jira"],
    }
];

const socials = [
    {
        id: 1,
        text: "Github",
        icon: "/icons/github.svg",
        bg: "#f4656b",
        link: "https://github.com/danielnguyen05",
    },
    {
        id: 2,
        text: "Email",
        icon: "/icons/mail.svg",
        bg: "#4bcb63",
        link: "mailto:daniel.ngu05@gmail.com",
    },
    {
        id: 3,
        text: "Phone",
        icon: "/icons/phone.svg",
        bg: "#ff866b",
        link: "tel:0478629887",
    },
    {
        id: 4,
        text: "LinkedIn",
        icon: "/icons/linkedin.svg",
        bg: "#05b6f6",
        link: "https://www.linkedin.com/in/daniel-nguyen-30b307306/",
    },
];

const photosLinks = [
    {
        id: 1,
        icon: "/icons/gicon1.svg",
        title: "Library",
    },
    {
        id: 2,
        icon: "/icons/gicon2.svg",
        title: "Memories",
    },
    {
        id: 3,
        icon: "/icons/file.svg",
        title: "Places",
    },
    {
        id: 4,
        icon: "/icons/gicon4.svg",
        title: "People",
    },
    {
        id: 5,
        icon: "/icons/gicon5.svg",
        title: "Favorites",
    },
];

const gallery = [
    {
        id: 1,
        img: "/images/gal1.png",
    },
    {
        id: 2,
        img: "/images/gal2.png",
    },
    {
        id: 3,
        img: "/images/gal3.png",
    },
    {
        id: 4,
        img: "/images/gal4.png",
    },
];

export {
    navLinks,
    navIcons,
    dockApps,
    blogPosts,
    techStack,
    socials,
    photosLinks,
    gallery,
};

const WORK_LOCATION = {
    id: 1,
    type: "work",
    name: "Work",
    icon: "/icons/work.svg",
    kind: "folder",
    children: [
        // ▶ Project 1
        {
            id: 5,
            name: "Finova Investment Platform",
            icon: "/images/folder.png",
            kind: "folder",
            position: "top-10 left-5", // icon position inside Finder
            windowPosition: "top-[5vh] left-5", // optional: Finder window position
            children: [
                {
                    id: 1,
                    name: "Finova Investment Platform.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 left-10",
                    description: [
                        "Finova is a full-stack investment platform designed to help users create and manage personalized investment portfolios.",
                        "The system provides tools to analyze both real-time and historical market data through interactive dashboards and data-driven visualizations.",
                        "It incorporates machine learning models to generate portfolio insights and optimization recommendations, supporting informed investment decision-making.",
                        "Developed using Python, JavaScript, and modern web technologies, the platform emphasizes performance, scalability, and a structured approach to financial data analysis.",
                    ]
                },
                {
                    id: 2,
                    name: "github.com/finova-investment-platform",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://github.com/danielnguyen05/Finova-Investment-Platform/tree/main",
                    position: "top-10 right-20",
                },
                {
                    id: 3,
                    name: "finova.png",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 right-80",
                    imageUrl: "/images/project-1.png",
                },
            ],
        },

        // ▶ Project 2
        {
            id: 6,
            name: "Face Recognition Authentication System",
            icon: "/images/folder.png",
            kind: "folder",
            position: "top-52 right-80",
            windowPosition: "top-[20vh] left-7",
            children: [
                {
                    id: 1,
                    name: "Face Recognition Authentication System.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 right-10",
                    description: [
                        "A facial recognition authentication system designed to securely verify user identities using computer vision techniques.",
                        "The platform captures live facial input and applies recognition algorithms to perform real-time identity validation.",
                        "Following authentication, the system enables secure digital signature capture through gesture-based interaction, combining biometric verification with user-driven input.",
                        "Developed in Python using OpenCV, the project focuses on real-time processing, accuracy optimization, and reliable identity verification workflows.",
                    ]
                },
                {
                    id: 2,
                    name: "github.com/face-recognition-authentication",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://github.com/danielnguyen05/FaceRecognitionProject",
                    position: "top-20 left-20",
                },
            ],
        },

        // ▶ Project 3
        {
            id: 7,
            name: "Bevoguard",
            icon: "/images/folder.png",
            kind: "folder",
            position: "top-10 left-80",
            windowPosition: "top-[33vh] left-7",
            children: [
                {
                    id: 1,
                    name: "Bevoguard.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 left-10",
                    description: [
                        "BevoGuard is a full-stack civic safety platform that aggregates official city incident data, campus police logs, weather alerts, and local news to help users understand real-time safety conditions in Austin, Texas.",
                        "The system integrates multiple external APIs and data sources, processes and links events, locations, and resources through a structured relational model, and presents safety scores and incident insights via interactive maps and visualizations.",
                        "The backend exposes RESTful APIs for event retrieval, pagination, and data filtering, while containerized services and CI/CD pipelines ensure reliable deployment and scalability.",
                        "Designed to improve public awareness and accessibility of city safety data, the platform focuses on data integration, backend architecture, API design, and end-to-end system deployment.",
                    ]
                },
                {
                    id: 2,
                    name: "gitlab.com/bevoguard",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://gitlab.com/gautham.saravanan-cs373/cs373-bevoguard",
                    position: "top-10 right-20",
                },
                {
                    id: 3,
                    name: "bevoguard_demo.mp4",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://drive.google.com/file/d/12WSPhk16BPZISZRNQyqMQD4C6BXbPxjn/view",
                    position: "top-60 right-10",
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
            id: 1,
            name: "me.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-10 left-5",
            imageUrl: "/images/adrian.jpg",
        },
        {
            id: 2,
            name: "casual-me.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-28 right-72",
            imageUrl: "/images/adrian-2.jpg",
        },
        {
            id: 3,
            name: "seaworld-me.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-52 left-80",
            imageUrl: "/images/adrian-3.jpeg",
        },
        {
            id: 4,
            name: "about-me.txt",
            icon: "/images/txt.png",
            kind: "file",
            fileType: "txt",
            position: "top-60 left-5",
            subtitle: "Hi, I’m Daniel!",
            image: "/images/adrian.jpg",
            description: [
                "I study Computer Science at Monash University. I enjoy building unique, interactive, and engaging things that feel creative, a little outside the box, and fun to use.",
                "I like solving problems that make technology feel more intuitive for people, and I’m always learning something new (usually by breaking things first).",
                "I spend a lot of time working with modern technologies and I’m always trying to improve how I write code specifically focusing on clean architecture, efficiency, and building systems that are reliable, maintainable, and easy to extend.",
                "Outside of coding and uni life, you’ll usually find me at the gym, kicking butt (literally), or doing something active just to reset. I’m big on going outside too, whether it’s long walks in nature, going through the occasional photography phase, or just doing anything that gets me moving and away from a screen for a bit 😁"
            ],
        },
    ],
};

const RESUME_LOCATION = {
    id: 3,
    type: "resume",
    name: "Resume",
    icon: "/icons/file.svg",
    kind: "folder",
    children: [
        {
            id: 1,
            name: "Resume.pdf",
            icon: "/images/pdf.png",
            kind: "file",
            fileType: "pdf",
        },
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
            position: "top-10 left-10",
            description: ["Sleep Schedule v1.0",
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
                "File corrupted beyond recovery."
            ]
        },
        {
            id: 2,
            name: "final_final_final_REAL_v9_THIS_ONE (9).png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-40 left-80",
            imageUrl: "/images/trash-2.png",
        },
        {
            id: 3,
            name: "billion_dollar_app_idea_that_would_make_me_rich.txt",
            icon: "/images/txt.png",
            kind: "file",
            fileType: "txt",
            position: "top-60 left-10",
            description: []
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
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };