import "./style.css";

type Component = {
  name: string;
  type: string;
  description: string;
};

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App container not found");
}

app.innerHTML = `
  <div class="app">

    <header class="navbar">
      <div class="logo">
        <span class="logo-icon">D</span>
        <span>DevTwin</span>
      </div>

      <div class="nav-right">
        <span class="status-dot"></span>
        AI System Architecture Simulator
      </div>
    </header>

    <main class="container">

      <section class="hero">
        <p class="eyebrow">AI SOFTWARE ARCHITECTURE SIMULATOR</p>

        <h1>
          Design your system.
          <br />
          <span>Understand its architecture.</span>
        </h1>

        <p class="hero-text">
          Describe your application requirements and DevTwin
          will intelligently suggest a scalable system architecture.
        </p>
      </section>

      <section class="workspace">

        <div class="card requirements-card">

          <div class="card-title">
            <div>
              <h2>System Requirements</h2>
              <p>Tell DevTwin what you want to build.</p>
            </div>

            <span class="step">01</span>
          </div>

          <label for="requirement">
            Application Requirement
          </label>

          <textarea
            id="requirement"
            placeholder="Example: Build a food delivery application where users can browse restaurants, order food, make payments and track delivery."
          ></textarea>

          <div class="input-grid">

            <div>
              <label for="users">
                Expected Users
              </label>

              <input
                id="users"
                type="number"
                value="100000"
                placeholder="100000"
              />
            </div>

            <div>
              <label for="rps">
                Requests / Second
              </label>

              <input
                id="rps"
                type="number"
                value="1000"
                placeholder="1000"
              />
            </div>

          </div>

          <button
            id="generateBtn"
            class="generate-btn"
          >
            <span>⚡</span>
            Analyze & Generate Architecture
          </button>

        </div>

        <div class="card architecture-card">

          <div class="card-title">
            <div>
              <h2>Architecture</h2>
              <p>Intelligently generated system components</p>
            </div>

            <span class="step">02</span>
          </div>

          <div
            id="architecture"
            class="architecture"
          >
            <div class="empty-state">

              <div class="empty-icon">
                ◇
              </div>

              <h3>
                Your architecture will appear here
              </h3>

              <p>
                Enter your requirements and click
                <strong>Analyze & Generate Architecture</strong>.
              </p>

            </div>
          </div>

        </div>

      </section>

      <section
        id="analysisSection"
        class="card analysis-card hidden"
      >

        <div class="card-title">

          <div>
            <h2>AI Architecture Analysis</h2>

            <p>
              DevTwin's intelligent system design recommendations
            </p>
          </div>

          <span class="step">03</span>

        </div>

        <div
          id="analysis"
          class="analysis-grid"
        ></div>

      </section>

    </main>

    <footer>
      <p>
        DevTwin • AI Software Architecture Simulator
      </p>
    </footer>

  </div>
`;

const generateBtn =
  document.querySelector<HTMLButtonElement>(
    "#generateBtn"
  );

const requirementInput =
  document.querySelector<HTMLTextAreaElement>(
    "#requirement"
  );

const usersInput =
  document.querySelector<HTMLInputElement>(
    "#users"
  );

const rpsInput =
  document.querySelector<HTMLInputElement>(
    "#rps"
  );

const architecture =
  document.querySelector<HTMLDivElement>(
    "#architecture"
  );

const analysisSection =
  document.querySelector<HTMLElement>(
    "#analysisSection"
  );

const analysis =
  document.querySelector<HTMLDivElement>(
    "#analysis"
  );

if (
  !generateBtn ||
  !requirementInput ||
  !usersInput ||
  !rpsInput ||
  !architecture ||
  !analysisSection ||
  !analysis
) {
  throw new Error("Required elements not found");
}

generateBtn.addEventListener(
  "click",
  generateArchitecture
);


/* ------------------------------------------
   MAIN ARCHITECTURE GENERATOR
------------------------------------------ */

function generateArchitecture(): void {

  const requirement =
    requirementInput.value.trim();

  const users =
    Number(usersInput.value) || 0;

  const rps =
    Number(rpsInput.value) || 0;

  if (!requirement) {

    alert(
      "Please enter your application requirement first."
    );

    requirementInput.focus();

    return;
  }

  const components =
    analyzeRequirement(requirement);

  renderArchitecture(
    components,
    requirement
  );

  renderAnalysis(
    requirement,
    components,
    users,
    rps
  );

  analysisSection.classList.remove(
    "hidden"
  );

  analysisSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


/* ------------------------------------------
   REQUIREMENT ANALYZER
------------------------------------------ */

function analyzeRequirement(
  requirement: string
): Component[] {

  const text =
    requirement.toLowerCase();

  const components: Component[] = [];


  // Always required
  components.push({
    name: "API Gateway",
    type: "gateway",
    description:
      "Receives and routes client requests"
  });


  // Authentication
  if (
    text.includes("login") ||
    text.includes("register") ||
    text.includes("user") ||
    text.includes("account") ||
    text.includes("authentication") ||
    text.includes("auth")
  ) {

    components.push({
      name: "Authentication Service",
      type: "auth",
      description:
        "Manages users, login and authentication"
    });

  }


  // E-commerce / shopping
  if (
    text.includes("shop") ||
    text.includes("e-commerce") ||
    text.includes("ecommerce") ||
    text.includes("product") ||
    text.includes("cart") ||
    text.includes("order")
  ) {

    components.push({
      name: "Product Service",
      type: "server",
      description:
        "Manages products and catalog operations"
    });

    components.push({
      name: "Order Service",
      type: "server",
      description:
        "Processes carts and customer orders"
    });

  }


  // Food delivery
  if (
    text.includes("food") ||
    text.includes("restaurant") ||
    text.includes("delivery")
  ) {

    components.push({
      name: "Restaurant Service",
      type: "server",
      description:
        "Manages restaurants, menus and availability"
    });

    components.push({
      name: "Delivery Service",
      type: "server",
      description:
        "Manages delivery and order tracking"
    });

  }


  // Payment
  if (
    text.includes("payment") ||
    text.includes("pay") ||
    text.includes("transaction")
  ) {

    components.push({
      name: "Payment Service",
      type: "payment",
      description:
        "Handles secure payment transactions"
    });

  }


  // Chat / messaging
  if (
    text.includes("chat") ||
    text.includes("message") ||
    text.includes("messaging")
  ) {

    components.push({
      name: "Messaging Service",
      type: "server",
      description:
        "Handles real-time communication"
    });

  }


  // Notification
  if (
    text.includes("notification") ||
    text.includes("alert") ||
    text.includes("email") ||
    text.includes("sms")
  ) {

    components.push({
      name: "Notification Service",
      type: "notification",
      description:
        "Sends notifications and system alerts"
    });

  }


  // Search
  if (
    text.includes("search") ||
    text.includes("filter")
  ) {

    components.push({
      name: "Search Service",
      type: "search",
      description:
        "Provides fast search and filtering"
    });

  }


  // Tracking / maps
  if (
    text.includes("track") ||
    text.includes("location") ||
    text.includes("map")
  ) {

    components.push({
      name: "Tracking Service",
      type: "server",
      description:
        "Processes location and tracking data"
    });

  }


  // AI
  if (
    text.includes("ai") ||
    text.includes("artificial intelligence") ||
    text.includes("machine learning") ||
    text.includes("prediction") ||
    text.includes("recommendation")
  ) {

    components.push({
      name: "AI Engine",
      type: "ai",
      description:
        "Processes intelligent predictions and recommendations"
    });

  }


  // Cache
  components.push({
    name: "Cache",
    type: "cache",
    description:
      "Provides fast access to frequently used data"
  });


  // Database
  components.push({
    name: "Database",
    type: "database",
    description:
      "Stores persistent application data"
  });


  return removeDuplicates(
    components
  );
}


/* ------------------------------------------
   ARCHITECTURE RENDERING
------------------------------------------ */

function renderArchitecture(
  components: Component[],
  requirement: string
): void {

  architecture.innerHTML = `

    <div class="architecture-flow">

      ${components
        .map(
          (component, index) => `

            ${createNode(component)}

            ${
              index <
              components.length - 1
                ? `<div class="arrow">→</div>`
                : ""
            }

          `
        )
        .join("")}

    </div>

    <div class="requirement-preview">

      <strong>Analyzed Requirement:</strong>

      ${escapeHtml(requirement)}

    </div>

  `;
}


/* ------------------------------------------
   NODE CREATOR
------------------------------------------ */

function createNode(
  component: Component
): string {

  return `

    <div class="architecture-node ${component.type}">

      <div class="node-icon">
        ${getIcon(component.type)}
      </div>

      <div>

        <h3>
          ${component.name}
        </h3>

        <p>
          ${component.description}
        </p>

      </div>

    </div>

  `;
}


/* ------------------------------------------
   ICONS
------------------------------------------ */

function getIcon(
  type: string
): string {

  switch (type) {

    case "gateway":
      return "⇄";

    case "auth":
      return "♙";

    case "server":
      return "◆";

    case "payment":
      return "₹";

    case "notification":
      return "🔔";

    case "search":
      return "⌕";

    case "tracking":
      return "⌖";

    case "ai":
      return "✦";

    case "cache":
      return "◉";

    case "database":
      return "▤";

    default:
      return "◇";
  }
}


/* ------------------------------------------
   AI-STYLE ANALYSIS
------------------------------------------ */

function renderAnalysis(
  requirement: string,
  components: Component[],
  users: number,
  rps: number
): void {

  const scalability =
    getScalabilityMessage(rps);

  const storage =
    getStorageMessage(users);

  const architectureType =
    getArchitectureType(
      components
    );

  const risks =
    detectRisks(
      requirement,
      users,
      rps
    );

  const testing =
    getTestingRecommendations(
      components
    );


  analysis.innerHTML = `

    <div class="analysis-box">

      <span class="analysis-icon">
        ✦
      </span>

      <div>

        <h3>System Understanding</h3>

        <p>
          DevTwin identified this as a
          <strong>${architectureType}</strong>
          based on the application requirements.
        </p>

      </div>

    </div>


    <div class="analysis-box">

      <span class="analysis-icon">
        ⚡
      </span>

      <div>

        <h3>Scalability</h3>

        <p>
          ${scalability}
        </p>

      </div>

    </div>


    <div class="analysis-box">

      <span class="analysis-icon">
        ◈
      </span>

      <div>

        <h3>Traffic Analysis</h3>

        <p>

          Expected users:
          <strong>
            ${users.toLocaleString()}
          </strong>

          <br />

          Requests/second:
          <strong>
            ${rps.toLocaleString()}
          </strong>

        </p>

      </div>

    </div>


    <div class="analysis-box">

      <span class="analysis-icon">
        ⚠
      </span>

      <div>

        <h3>Potential Risks</h3>

        <p>
          ${risks}
        </p>

      </div>

    </div>


    <div class="analysis-box">

      <span class="analysis-icon">
        🧪
      </span>

      <div>

        <h3>Testing Recommendations</h3>

        <p>
          ${testing}
        </p>

      </div>

    </div>


    <div class="analysis-box">

      <span class="analysis-icon">
        ▣
      </span>

      <div>

        <h3>Data Storage</h3>

        <p>
          ${storage}
        </p>

      </div>

    </div>


    <div class="analysis-box">

      <span class="analysis-icon">
        ✓
      </span>

      <div>

        <h3>Architecture Recommendation</h3>

        <p>
          ${getRecommendation(
            components,
            users,
            rps
          )}
        </p>

      </div>

    </div>

  `;
}


/* ------------------------------------------
   SCALABILITY
------------------------------------------ */

function getScalabilityMessage(
  rps: number
): string {

  if (rps >= 5000) {

    return `
      Very high traffic detected.
      Use horizontal scaling, load balancing,
      multiple application servers and
      distributed caching.
    `;

  }

  if (rps >= 1000) {

    return `
      Moderate-to-high traffic detected.
      Caching, multiple application servers
      and load balancing are recommended.
    `;

  }

  if (rps >= 500) {

    return `
      Medium traffic detected.
      The system should be designed with
      caching and scalable services.
    `;

  }

  return `
    Current traffic is manageable with a
    basic scalable architecture.
  `;
}


/* ------------------------------------------
   STORAGE
------------------------------------------ */

function getStorageMessage(
  users: number
): string {

  if (users >= 1000000) {

    return `
      Very large user base detected.
      Consider database sharding, replication,
      indexing and distributed storage.
    `;

  }

  if (users >= 100000) {

    return `
      Large user base detected.
      Use indexing, backups, replication
      and optimized database queries.
    `;

  }

  return `
    A standard relational or NoSQL database
    can handle the expected workload.
  `;
}


/* ------------------------------------------
   ARCHITECTURE TYPE
------------------------------------------ */

function getArchitectureType(
  components: Component[]
): string {

  if (
    components.some(
      c => c.type === "ai"
    )
  ) {
    return "AI-enabled distributed application";
  }

  if (
    components.length >= 7
  ) {
    return "modular distributed application";
  }

  return "scalable web application";
}


/* ------------------------------------------
   RISK DETECTION
------------------------------------------ */

function detectRisks(
  requirement: string,
  users: number,
  rps: number
): string {

  const risks: string[] = [];

  const text =
    requirement.toLowerCase();


  if (rps >= 5000) {

    risks.push(
      "high traffic bottlenecks"
    );

  }


  if (users >= 100000) {

    risks.push(
      "database scalability"
    );

  }


  if (
    text.includes("payment") ||
    text.includes("transaction")
  ) {

    risks.push(
      "payment security"
    );

  }


  if (
    text.includes("login") ||
    text.includes("account")
  ) {

    risks.push(
      "authentication security"
    );

  }


  if (
    text.includes("track") ||
    text.includes("location")
  ) {

    risks.push(
      "real-time data processing"
    );

  }


  if (
    risks.length === 0
  ) {

    return `
      No major architectural risks were
      detected from the provided requirements.
    `;

  }


  return `
    Pay attention to:
    ${risks.join(", ")}.
  `;
}


/* ------------------------------------------
   TESTING
------------------------------------------ */

function getTestingRecommendations(
  components: Component[]
): string {

  const tests: string[] = [
    "API testing",
    "integration testing"
  ];


  if (
    components.some(
      c => c.type === "payment"
    )
  ) {

    tests.push(
      "payment transaction testing"
    );

  }


  if (
    components.some(
      c => c.type === "ai"
    )
  ) {

    tests.push(
      "AI prediction validation"
    );

  }


  if (
    components.some(
      c => c.type === "notification"
    )
  ) {

    tests.push(
      "notification delivery testing"
    );

  }


  tests.push(
    "load and performance testing"
  );


  return `
    Recommended: ${tests.join(", ")}.
  `;
}


/* ------------------------------------------
   FINAL RECOMMENDATION
------------------------------------------ */

function getRecommendation(
  components: Component[],
  users: number,
  rps: number
): string {

  let recommendation =
    "Use modular services with an API Gateway, caching and a reliable database.";


  if (
    users >= 100000 ||
    rps >= 1000
  ) {

    recommendation =
      "Use load balancing, horizontal scaling, caching, database replication and independent services for major business functions.";

  }


  if (
    components.some(
      c => c.type === "payment"
    )
  ) {

    recommendation +=
      " Secure payment operations and never store sensitive payment credentials directly.";

  }


  if (
    components.some(
      c => c.type === "ai"
    )
  ) {

    recommendation +=
      " Monitor AI predictions and validate model outputs before using them in critical workflows.";

  }


  return recommendation;
}


/* ------------------------------------------
   REMOVE DUPLICATES
------------------------------------------ */

function removeDuplicates(
  components: Component[]
): Component[] {

  const seen =
    new Set<string>();

  return components.filter(
    component => {

      if (
        seen.has(
          component.name
        )
      ) {

        return false;
      }

      seen.add(
        component.name
      );

      return true;
    }
  );
}


/* ------------------------------------------
   HTML SECURITY
------------------------------------------ */

function escapeHtml(
  text: string
): string {

  return text
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );
}
