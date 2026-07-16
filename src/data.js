export const SITE = {
    name: "Nidhi Kathayat",
    role: "Web Application Security & VAPT",
    url: "https://nidhikathayat.netlify.app",
    title: "Nidhi Kathayat | Web Application Security & VAPT",
    description:
        "Portfolio of Nidhi Kathayat — Computer Science undergrad and cybersecurity practitioner focused on Web Application Security, VAPT, CTFs, and vulnerability research.",
    keywords: [
        "Nidhi Kathayat",
        "Web Application Security",
        "VAPT",
        "penetration testing",
        "bug bounty",
        "CTF",
        "OWASP",
        "cybersecurity portfolio",
        "SQL Injection",
        "XSS",
    ],
    ogImage: "/images/profile.webp",
    email: "nidhikathayat03@gmail.com",
    linkedin: "https://www.linkedin.com/in/nidhikathayat/",
    github: "https://github.com/crypto-nidh",
    medium: "https://medium.com/@nidhikathayat03",
    twitter: "https://x.com/nidhikathayat",
    twitterHandle: "@nidhikathayat",
    discord: "_hazel69",
    resume_url: "/Nidhi_Kathayat_Resume.pdf",
    photo: "/images/profile.webp",
    locale: "en_US",
};

export const STATS = [
    { icon: "trophy", value: "TOP 3", label: "CTF Results" },
    { icon: "award", value: "4+", label: "Certifications" },
    { icon: "shield", value: "OWASP", label: "Vuln Classes" },
];

export const ABOUT = {
    paragraphs: [
        "I'm <b>Nidhi Kathayat</b>, a Computer Science undergrad at Poornima University and a cybersecurity practitioner focused on Web Application Security and VAPT.",
        "My experience comes from CTFs and applied labs — hunting <b>SQL Injection, XSS, IDOR and CSRF</b> through recon and manual testing in Burp Suite, then documenting every finding as a clear, structured PoC report.",
        "I approach every target with an attacker's mindset: understand how a system is meant to work, then find where that assumption breaks.",
    ],
    tools: ["BURP SUITE", "NMAP", "METASPLOIT", "PYTHON", "BLOODHOUND", "ZAP"],
    skill_columns: [
        { title: "WEB SECURITY", skills: ["OWASP TOP 10", "AUTH BYPASS", "RACE COND.", "PRIV. ESC."] },
        { title: "VAPT", skills: ["ENUMERATION", "EXPLOITATION", "PoC REPORTS", "ACTIVE DIR."] },
        { title: "SCRIPTING & PLATFORMS", skills: ["PYTHON", "BASH", "SQL", "KALI", "DOCKER", "GIT"] },
    ],
    cards: [
        { idx: "01", title: "RECON", text: "Mapping the attack surface before a single payload is sent." },
        { idx: "02", title: "EXPLOIT", text: "Turning logic flaws into working, repeatable proof." },
        { idx: "03", title: "REPORT", text: "Structured PoCs a developer can act on same-day." },
        { idx: "04", title: "HARDEN", text: "Mitigations that hold up under retest." },
    ],
};

export const EXPERIENCE = [{


    title: "CTF Developer Intern (Web Security)",
    company: "RAZZIFY",
    date: "SEP 2025 — DEC 2025",
    logo: "/images/razzify-logo.webp",
    bullets: [
        "Designed vulnerable web challenges modeled on real-world attack techniques, including SQL Injection, XSS, and IDOR.",
        "Performed manual testing and exploitation across challenge environments to validate difficulty and realism.",
        "Documented attack methodology and mitigation strategies in structured writeups for participants.",
        "Simulated real-world web vulnerabilities for hands-on exploitation, applying an attacker's mindset to how systems break.",
    ],
}];

export const PROJECTS = [{
        title: "Hazel CLI",
        sev_label: "AI × PENTEST",
        sev_class: "sev-high",
        image: "/images/projects/hazel-cli.webp",
        paragraphs: [
            "AI-powered terminal assistant for pentesters — intercepts commands, flags dangerous patterns, and auto-suggests the next tool from scan output (Nmap → Gobuster).",
            "Multi-provider AI fallback (Groq, Gemini, OpenRouter, Ollama) with typo correction and a rule-based danger detection engine, plus auto-generated pentest writeups from session history.",
        ],
        tags: ["PYTHON", "CLI", "AUTOMATION"],
        link: "https://github.com/crypto-nidh/hazel-cli",
    },
    {
        title: "Phishing Email Detection",
        sev_label: "ML × SOC",
        sev_class: "sev-med",
        image: "/images/projects/phishing-detector.webp",
        paragraphs: [
            "ML-based phishing detection system built with Scikit-learn, analyzing URL patterns, sender metadata, and email content.",
            "Stress-tested accuracy against common bypass techniques, applying feature extraction and behavioral analysis aligned to SOC-level phishing investigation workflows.",
        ],
        tags: ["PYTHON", "SCIKIT-LEARN", "ML"],
        link: "https://github.com/crypto-nidh/Phishing-email-detect",
    },
    {
        title: "Bandwidth Bridge",
        sev_label: "NETWORK OPT.",
        sev_class: "sev-low",
        image: "/images/projects/bandwidth-bridge.webp",
        paragraphs: [
            "Network bandwidth optimization and monitoring tool designed to optimize data transfer efficiency.",
            "Real-time traffic analysis and adaptive routing for improved network performance across distributed systems.",
        ],
        tags: ["PYTHON", "NETWORKING", "OPTIMIZATION"],
        link: "https://github.com/crypto-nidh/BandwithBridge",
    },
    {
        title: "QR Shield",
        sev_label: "QR × SECURITY",
        sev_class: "sev-high",
        image: "/images/projects/qr-shield.webp",
        paragraphs: [
            "QR code security and validation framework protecting against malicious QR code exploitation.",
            "Implements pattern recognition, URL validation, and threat detection to prevent phishing and social engineering via QR codes.",
        ],
        tags: ["PYTHON", "SECURITY", "QR-CODE"],
        link: "https://github.com/crypto-nidh/QrShield",
    },
];

export const CERTIFICATIONS = [
    { status: "done", name: "CBTP", issuer: "Certified Blue Team Practitioner — SecOps Group", image: "/images/certs/cbtp.webp" },
    { status: "done", name: "CNSP", issuer: "SecOps Group", image: "/images/certs/cnsp.webp" },
    { status: "done", name: "C3SA", issuer: "CyberWarFare Labs", image: "/images/certs/c3sa.webp" },
    { status: "done", name: "CTI 101", issuer: "ARCX", image: "/images/certs/cti101.webp" },
    { status: "progress", name: "CEH", issuer: "Certified Ethical Hacker", image: null },
    { status: "progress", name: "CPENT", issuer: "Certified Penetration Testing Professional", image: null },
];

export const ACHIEVEMENTS = [
    { rank: "TOP 3 🌍", title: "HACKTHEBOX", detail: "Top 3 in India, Worldwide in 100" },
    { rank: "#5", title: "OWASP HACKER'S GAMBIT 2025", detail: "National ranking, Team GenZCTF" },
    { rank: "#2", title: "VECTORCTF", detail: "TryHackMe" },
    { rank: "#27", title: "CYBERNEONGEN CTF", detail: "Solo entry" },
    { rank: "#26", title: "TRYHACKME INDUSTRIAL CTF", detail: "Solo entry" },
    { rank: "TOP 30", title: "ACEHACK 5.0", detail: "Hackathon" },
    { rank: "#15", title: "SHAKTI CTF", detail: "Among women participants, #54 overall" },
];

export const EDUCATION = {
    degree: "B.Tech, Computer Science & Engineering",
    school: "POORNIMA UNIVERSITY, JAIPUR",
    years: "2024 — 2028",
    logo: "/images/poornima-logo.webp"
};