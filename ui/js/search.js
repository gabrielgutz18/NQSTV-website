const SEARCH_INDEX = [
    {
        title: "Mission and Vision",
        url: "mv.html",
        category: "Company",
        tags: ["Mission", "Vision", "Core Values"],
        summary: "Read NQSTV's vision, mission, and core values including advocacy, continuity, integrity, and value for money.",
        content: "Mission Vision industry advocacy accessible learning practical quality stronger quantity surveying future in the Philippines leadership through advocacy professional discipline nationwide relevance deliver strong service quality expand professional understanding keep knowledge accessible education accessible Metro Manila provincial areas honesty transparency integrity client value."
    },
    {
        title: "Our Team",
        url: "team.html",
        category: "People",
        tags: ["Leadership", "Quantity Surveyors", "Office Team"],
        summary: "Meet the leadership, quantity surveyors, team leads, and office support professionals behind NQSTV.",
        content: "Cecilia Torres Jhun Rhold Tan Sherlynne De Leon Monique Arocena Paul Justine Marzo Dominique Collantes Lourd Jericho Ibanez Carl Chester Buenviaje Jasmine Cosio Joshua David Genesis Mae Pisuena Marissa Villanueva quantity surveyor civil engineer electrical engineer architect office administrator office canvasser team supervisor junior team lead MEPFS construction management cost planning quantity take off contract support project coordination."
    },
    {
        title: "Project Portfolio",
        url: "projectinfo.html#major-projects",
        category: "Projects",
        tags: ["Major Projects", "Cost Planning", "Tendering"],
        summary: "Browse major projects and portfolio highlights covering commercial, residential, hospitality, industrial, and civic work.",
        content: "Gateway Mall 2 CyberPark Tower Wyndham Hotel La Salle Chapel Event Space Crimson Tower Tuguegarao Temple Araneta Coliseum Greenhills Mall FPIP Alpha FPIP Diagon Deguia Aquapod Grafik Mactan Hotel Resort UPNIH Office Fitout Sydney Oasis Bacoor Cavite EFCO Office Warehouse Hamana Homes Mabalacat cost planning tendering procurement contract documentation financial reporting change management contract management pre tender estimate post contract works bill of quantities."
    },
    {
        title: "Other Projects",
        url: "projectinfo.html#other-projects",
        category: "Projects",
        tags: ["Minor Projects", "Extended Portfolio", "Supporting Work"],
        summary: "See the extended portfolio of supporting works, interiors, utilities, fit-outs, renovations, and specialist commissions.",
        content: "Ford Service Center Araneta Center Underground Utilities ACI Link Bridge SSS Alimall Office Tuguegarao Public Market Franklin Baker Davao First Philec Admin and Utility Building One Serra Residence PNB Divisoria Leclands Showroom Mandala Residence Canadian Embassy Aboitiz meeting room Uniqlo Fitout Tacloban Temple Soundcheck Warehouse Expansion FEU Renovation P and G Manila Seven Neo additional commissions estimating documentation advisory work."
    },
    {
        title: "Office Location and Map",
        url: "map.html",
        category: "Location",
        tags: ["Map", "Office", "Google Maps"],
        summary: "Find the NQSTV office in Liliw, Laguna and open the live Google Maps route.",
        content: "Liliw Laguna Philippines office visit live map Google Maps route office preview brand marker navigation map embed contact before visiting on site quick guide preview office visual reference travel planning interactive map location details."
    },
    {
        title: "Developers",
        url: "dev.html",
        category: "Developers",
        tags: ["Development Team", "Frontend", "Responsive Build"],
        summary: "Meet the developers who built the website experience and review their roles, GitHub profiles, and email contacts.",
        content: "Gabriel Luigi Gutierrez John Anthony Lontoc frontend UI web development responsive design interaction support content creator development team builders website experience clean usable layouts polished experience GitHub email contacts."
    }
];

function normalizeText(value) {
    return String(value || "")
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();
}

function escapeHtml(value) {
    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function escapeRegExp(value) {
    return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getSearchTerms(query) {
    return normalizeText(query)
        .split(" ")
        .filter((term) => term.length > 1);
}

function scoreEntry(entry, query, terms) {
    const title = normalizeText(entry.title);
    const summary = normalizeText(entry.summary);
    const tags = normalizeText(entry.tags.join(" "));
    const content = normalizeText(entry.content);

    let score = 0;

    if (!query) {
        return 1;
    }

    if (title.includes(query)) {
        score += 60;
    }

    if (tags.includes(query)) {
        score += 40;
    }

    if (summary.includes(query)) {
        score += 25;
    }

    if (content.includes(query)) {
        score += 15;
    }

    terms.forEach((term) => {
        if (title.includes(term)) {
            score += 18;
        }

        if (tags.includes(term)) {
            score += 12;
        }

        if (summary.includes(term)) {
            score += 8;
        }

        if (content.includes(term)) {
            score += 5;
        }
    });

    return score;
}

function findResults(query) {
    const normalizedQuery = normalizeText(query);
    const terms = getSearchTerms(normalizedQuery);

    return SEARCH_INDEX
        .map((entry) => ({
            ...entry,
            score: scoreEntry(entry, normalizedQuery, terms)
        }))
        .filter((entry) => entry.score > 0)
        .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
}

function highlightText(text, query) {
    const terms = getSearchTerms(query);

    if (!terms.length) {
        return escapeHtml(text);
    }

    const pattern = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "gi");
    return escapeHtml(text).replace(pattern, "<mark>$1</mark>");
}

function buildSnippet(entry, query) {
    const terms = getSearchTerms(query);
    const source = `${entry.summary} ${entry.content}`.replace(/\s+/g, " ").trim();

    if (!terms.length) {
        return entry.summary;
    }

    const lowerSource = source.toLowerCase();
    const matchIndex = terms.reduce((bestIndex, term) => {
        const index = lowerSource.indexOf(term.toLowerCase());
        if (index === -1) {
            return bestIndex;
        }

        if (bestIndex === -1 || index < bestIndex) {
            return index;
        }

        return bestIndex;
    }, -1);

    if (matchIndex === -1) {
        return entry.summary;
    }

    const start = Math.max(0, matchIndex - 60);
    const end = Math.min(source.length, matchIndex + 140);
    const prefix = start > 0 ? "..." : "";
    const suffix = end < source.length ? "..." : "";

    return `${prefix}${source.slice(start, end).trim()}${suffix}`;
}

function getSearchPageUrl() {
    const inUiFolder = /\/ui\//i.test(window.location.pathname);
    const target = inUiFolder ? "search.html" : "ui/search.html";
    return new URL(target, window.location.href);
}

function setQueryOnForms(query) {
    document.querySelectorAll('.search-form input[name="q"]').forEach((input) => {
        input.value = query;
    });
}

function bindSearchForms() {
    document.querySelectorAll(".search-form").forEach((form) => {
        if (form.dataset.searchBound === "true") {
            return;
        }

        form.dataset.searchBound = "true";
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const input = form.querySelector('input[name="q"]');
            const query = input ? input.value.trim() : "";
            const searchUrl = getSearchPageUrl();

            if (query) {
                searchUrl.searchParams.set("q", query);
            } else {
                searchUrl.searchParams.delete("q");
            }

            const isSearchPage = /(?:^|\/)search\.html$/i.test(window.location.pathname);

            if (isSearchPage) {
                window.history.replaceState({}, "", searchUrl.toString());
                renderSearchPage();
                return;
            }

            window.location.assign(searchUrl.toString());
        });
    });
}

function renderSearchPage() {
    const resultsContainer = document.getElementById("search-results");
    const summaryElement = document.getElementById("search-summary");
    const headingElement = document.getElementById("search-heading");
    const queryElement = document.getElementById("search-query");
    const emptyElement = document.getElementById("search-empty");

    if (!resultsContainer || !summaryElement || !headingElement || !queryElement || !emptyElement) {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const query = (params.get("q") || "").trim();
    const results = findResults(query);

    setQueryOnForms(query);

    if (query) {
        headingElement.textContent = `Results for "${query}"`;
        queryElement.textContent = `Showing matches from the HTML pages inside the ui folder.`;
        summaryElement.textContent = `${results.length} result${results.length === 1 ? "" : "s"} found`;
    } else {
        headingElement.textContent = "Browse UI Pages";
        queryElement.textContent = "Search across mission, team, projects, map, and developers from one page.";
        summaryElement.textContent = `${results.length} page${results.length === 1 ? "" : "s"} available`;
    }

    if (!results.length) {
        resultsContainer.innerHTML = "";
        emptyElement.hidden = false;
        emptyElement.innerHTML = `
            <h2>No matching results</h2>
            <p>Try a project name, service, location, or team member such as <strong>Gateway</strong>, <strong>Cecilia</strong>, <strong>Laguna</strong>, or <strong>mission</strong>.</p>
        `;
        return;
    }

    emptyElement.hidden = true;
    resultsContainer.innerHTML = results.map((entry) => {
        const snippet = buildSnippet(entry, query);
        const tags = entry.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("");

        return `
            <article class="search-result-card">
                <div class="search-result-meta">
                    <span class="search-result-category">${escapeHtml(entry.category)}</span>
                    <ul class="search-result-tags">${tags}</ul>
                </div>
                <h2><a href="${escapeHtml(entry.url)}">${highlightText(entry.title, query)}</a></h2>
                <p class="search-result-summary">${highlightText(entry.summary, query)}</p>
                <p class="search-result-snippet">${highlightText(snippet, query)}</p>
                <a class="search-result-link" href="${escapeHtml(entry.url)}">Open page</a>
            </article>
        `;
    }).join("");
}

document.addEventListener("DOMContentLoaded", () => {
    bindSearchForms();

    if (/(?:^|\/)search\.html$/i.test(window.location.pathname)) {
        renderSearchPage();
    } else {
        const params = new URLSearchParams(window.location.search);
        setQueryOnForms((params.get("q") || "").trim());
    }
});
