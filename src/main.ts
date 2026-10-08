import "./style.css";

interface Component {
  name: string;
  type: string;
  description: string;
}

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App container not found");
}

app.innerHTML = `
  <header class="topbar">
    <div class="logo">DevTwin</div>
    <div class="subtitle">AI SOFTWARE ARCHITECTURE SIMULATOR</div>
  </header>

  <main class="container">

    <section class="hero">
      <h1>AI System Architecture Simulator</h1>
      <p>
        Describe your software system and DevTwin will generate
        a scalable architecture with analysis, risks and recommendations.
      </p>
    </section>

    <section class="input-card">

      <label for="requirement">
        Application Requirement
      </label>

      <textarea
        id="requirement"
        placeholder="Example: Build a food delivery application where users can register, browse restaurants, search food, place orders, make payments and track delivery."
      ></textarea>

      <div class="input-row">

        <div class="input-group">
          <label for="users">Expected Users</label>
          <input
            id="users"
            type="number"
            value="100000"
            min="1"
          />
        </div>

        <div class="input-group">
          <label for="rps">Requests / Second</label>
          <input
            id="rps"
            type="number"
            value="1000"
            min="1"
          />
        </div>

      </div>

      <button id="analyzeBtn">
        ⚡ Analyze & Generate Architecture
      </button>

    </section>

    <section id="architectureSection" class="result-section hidden">

      <div class="section-title">
        <span>🏗️</span>
        <h2>Generated Architecture</h2>
      </div>

      <div id="architecture"></div>

    </section>

    <section id="analysisSection" class="result-section hidden">

      <div class="section-title">
        <span>📊</span>
        <h2>System Analysis</h2>
      </div>

      <div id="analysis"></div>

    </section>

  </main>
`;

const requirementInput =
  document.querySelector<HTMLTextAreaElement>("#requirement");

const usersInput =
  document.querySelector<HTMLInputElement>("#users");

const rpsInput =
  document.querySelector<HTMLInputElement>("#rps");

const analyzeButton =
  document.querySelector<HTMLButtonElement>("#analyzeBtn");

const architectureContainer =
  document.querySelector<HTMLDivElement>("#architecture");

const analysisContainer =
  document.querySelector<HTMLDivElement>("#analysis");

const architectureSection =
  document.querySelector<HTMLElement>("#architectureSection");

const analysisSection =
  document.querySelector<HTMLElement>("#analysisSection");


/* ================================
   MAIN ANALYSIS
================================ */

function analyzeRequirement(
  requirement: string,
  users: number,
  rps: number
): Component[] {

  const text = requirement.toLowerCase();

  const components: Component[] = [];

  function add(
    name: string,
    type: string,
    description: string
  ) {
    components.push({
      name,
      type,
      description
    });
  }

  // Always include API Gateway
  add(
    "API Gateway",
    "gateway",
    "Central entry point for client requests."
  );

  // Authentication
  if (
    text.includes("login") ||
    text.includes("register") ||
    text.includes("user") ||
    text.includes("account") ||
    text.includes("authentication") ||
    text.includes("auth")
  ) {
    add(
      "Authentication Service",
      "auth",
      "Handles user authentication, registration and authorization."
    );
  }

  // E-commerce
  if (
    text.includes("shop") ||
    text.includes("e-commerce") ||
    text.includes("ecommerce") ||
    text.includes("product") ||
    text.includes("cart") ||
    text.includes("order")
  ) {
    add(
      "Product Service",
      "product",
      "Manages products and product information."
    );

    add(
      "Order Service",
      "order",
      "Processes and manages customer orders."
    );
  }

  // Food delivery
  if (
    text.includes("food") ||
    text.includes("restaurant") ||
    text.includes("delivery")
  ) {
    add(
      "Restaurant Service",
      "restaurant",
      "Manages restaurants, menus and food information."
    );

    add(
      "Delivery Service",
      "delivery",
      "Handles delivery assignment and delivery operations."
    );
  }

  // Payment
  if (
    text.includes("payment") ||
    text.includes("pay") ||
    text.includes("transaction")
  ) {
    add(
      "Payment Service",
      "payment",
      "Processes secure payment transactions."
    );
  }

  // Messaging
  if (
    text.includes("chat") ||
    text.includes("message") ||
    text.includes("messaging")
  ) {
    add(
      "Messaging Service",
      "message",
      "Handles real-time communication between users."
    );
  }

  // Notifications
  if (
    text.includes("notification") ||
    text.includes("alert") ||
    text.includes("email") ||
    text.includes("sms")
  ) {
    add(
      "Notification Service",
      "notification",
      "Sends system notifications and alerts."
    );
  }

  // Search
  if (
    text.includes("search") ||
    text.includes("filter")
  ) {
    add(
      "Search Service",
      "search",
      "Provides fast search and filtering functionality."
    );
  }

  // Tracking
  if (
    text.includes("track") ||
    text.includes("tracking") ||
    text.includes("location") ||
    text.includes("map")
  ) {
    add(
      "Tracking Service",
      "tracking",
      "Handles location and real-time tracking."
    );
  }

  // AI
  if (
    text.includes("ai") ||
    text.includes("artificial intelligence") ||
    text.includes("machine learning") ||
    text.includes("prediction") ||
    text.includes("recommendation")
  ) {
    add(
      "AI Engine",
      "ai",
      "Provides intelligent predictions and recommendations."
    );
  }

  // Cache
  add(
    "Cache",
    "cache",
    "Stores frequently accessed data for faster responses."
  );

  // Database
  add(
    "Database",
    "database",
    "Stores application data securely."
  );

  return removeDuplicates(components);
}


/* ================================
   GENERATE ARCHITECTURE
================================ */

function renderArchitecture(
  components: Component[],
  requirement: string
) {

  if (!architectureContainer) return;

  let html = "";

  html += `
    <div class="requirement-display">
      <strong>Analyzed Requirement:</strong>
      <p>${escapeHtml(requirement)}</p>
    </div>
  `;

  html += `
    <div class="architecture-flow">
  `;

  components.forEach((component, index) => {

    html += `
      <div class="architecture-node">

        <div class="node-icon">
          ${getIcon(component.type)}
        </div>

        <div class="node-name">
          ${escapeHtml(component.name)}
        </div>

        <div class="node-description">
          ${escapeHtml(component.description)}
        </div>

      </div>
    `;

    if (index < components.length - 1) {
      html += `
        <div class="architecture-arrow">
          →
        </div>
      `;
    }

  });

  html += `
    </div>
  `;

  architectureContainer.innerHTML = html;
}


/* ================================
   ANALYSIS
================================ */

function renderAnalysis(
  components: Component[],
  requirement: string,
  users: number,
  rps: number
) {

  if (!analysisContainer) return;

  const scalability = getScalability(rps);

  const storage = getStorageRecommendation(users);

  const risks = getRisks(
    components,
    users,
    rps,
    requirement
  );

  const testing = getTestingRecommendations(
    components
  );

  const architectureType =
    getArchitectureType(components);

  analysisContainer.innerHTML = `

    <div class="analysis-grid">

      <div class="analysis-card">
        <h3>🧠 System Understanding</h3>
        <p>
          DevTwin analyzed the application requirement and
          identified ${components.length} major architectural components.
        </p>
      </div>

      <div class="analysis-card">
        <h3>📈 Scalability</h3>
        <p>${scalability}</p>
      </div>

      <div class="analysis-card">
        <h3>🚦 Traffic Analysis</h3>
        <p>
          Expected traffic:
          <strong>${rps.toLocaleString()}</strong>
          requests/second.
        </p>
      </div>

      <div class="analysis-card">
        <h3>👥 User Scale</h3>
        <p>
          Expected users:
          <strong>${users.toLocaleString()}</strong>.
        </p>
      </div>

      <div class="analysis-card">
        <h3>⚠️ Potential Risks</h3>
        <ul>
          ${risks.map(risk => `<li>${risk}</li>`).join("")}
        </ul>
      </div>

      <div class="analysis-card">
        <h3>🧪 Testing Recommendations</h3>
        <ul>
          ${testing.map(test => `<li>${test}</li>`).join("")}
        </ul>
      </div>

      <div class="analysis-card">
        <h3>💾 Data Storage</h3>
        <p>${storage}</p>
      </div>

      <div class="analysis-card">
        <h3>🏗️ Architecture Type</h3>
        <p>
          <strong>${architectureType}</strong>
        </p>
      </div>

      <div class="analysis-card recommendation-card">
        <h3>💡 Architecture Recommendation</h3>
        <p>
          ${getArchitectureRecommendation(
            components,
            users,
            rps
          )}
        </p>
      </div>

    </div>

  `;
}


/* ================================
   SCALABILITY
================================ */

function getScalability(rps: number): string {

  if (rps >= 5000) {
    return `
      Very high traffic is expected.
      Use horizontal scaling, load balancing,
      distributed caching and multiple application servers.
    `;
  }

  if (rps >= 1000) {
    return `
      Moderate-to-high traffic is expected.
      Use caching, multiple application servers
      and load balancing.
    `;
  }

  if (rps >= 500) {
    return `
      Medium traffic is expected.
      A scalable application architecture with
      caching should be sufficient.
    `;
  }

  return `
    Basic scalable architecture should be sufficient
    for the expected traffic.
  `;
}


/* ================================
   STORAGE
================================ */

function getStorageRecommendation(
  users: number
): string {

  if (users >= 1000000) {
    return `
      Very large user scale.
      Consider database sharding, replication,
      indexing and distributed storage.
    `;
  }

  if (users >= 100000) {
    return `
      Large user scale.
      Use database indexing, backups,
      replication and optimized queries.
    `;
  }

  return `
    Standard relational or NoSQL database
    architecture should be sufficient.
  `;
}


/* ================================
   ARCHITECTURE TYPE
================================ */

function getArchitectureType(
  components: Component[]
): string {

  if (
    components.some(
      component => component.type === "ai"
    )
  ) {
    return "AI-enabled distributed application";
  }

  if (components.length >= 7) {
    return "Modular distributed application";
  }

  return "Scalable web application";
}


/* ================================
   RISKS
================================ */

function getRisks(
  components: Component[],
  users: number,
  rps: number,
  requirement: string
): string[] {

  const risks: string[] = [];

  const text = requirement.toLowerCase();

  if (rps >= 5000) {
    risks.push(
      "High traffic may create performance bottlenecks."
    );
  }

  if (users >= 100000) {
    risks.push(
      "Database scalability should be carefully planned."
    );
  }

  if (
    text.includes("payment") ||
    text.includes("transaction")
  ) {
    risks.push(
      "Payment security and transaction reliability are critical."
    );
  }

  if (
    text.includes("login") ||
    text.includes("account") ||
    text.includes("authentication")
  ) {
    risks.push(
      "Authentication and authorization must be secured."
    );
  }

  if (
    text.includes("location") ||
    text.includes("tracking")
  ) {
    risks.push(
      "Real-time tracking may require efficient data processing."
    );
  }

  if (risks.length === 0) {
    risks.push(
      "No major architectural risks detected from the provided requirement."
    );
  }

  return risks;
}


/* ================================
   TESTING
================================ */

function getTestingRecommendations(
  components: Component[]
): string[] {

  const recommendations: string[] = [
    "API testing",
    "Integration testing",
    "Load and performance testing"
  ];

  if (
    components.some(
      component => component.type === "payment"
    )
  ) {
    recommendations.push(
      "Payment transaction testing"
    );
  }

  if (
    components.some(
      component => component.type === "ai"
    )
  ) {
    recommendations.push(
      "AI prediction validation"
    );
  }

  if (
    components.some(
      component => component.type === "notification"
    )
  ) {
    recommendations.push(
      "Notification delivery testing"
    );
  }

  return recommendations;
}


/* ================================
   RECOMMENDATION
================================ */

function getArchitectureRecommendation(
  components: Component[],
  users: number,
  rps: number
): string {

  const recommendations: string[] = [];

  if (
    users >= 100000 ||
    rps >= 1000
  ) {
    recommendations.push(
      "Use load balancing and horizontal scaling."
    );

    recommendations.push(
      "Use caching to reduce database load."
    );

    recommendations.push(
      "Consider database replication."
    );
  }

  if (
    components.some(
      component => component.type === "payment"
    )
  ) {
    recommendations.push(
      "Apply strong payment security and transaction validation."
    );
  }

  if (
    components.some(
      component => component.type === "ai"
    )
  ) {
    recommendations.push(
      "Monitor AI model performance and prediction accuracy."
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      "Use a modular architecture with scalable services and proper monitoring."
    );
  }

  return recommendations.join(" ");
}


/* ================================
   ICONS
================================ */

function getIcon(type: string): string {

  const icons: Record<string, string> = {

    gateway: "🌐",

    auth: "🔐",

    product: "📦",

    order: "🛒",

    restaurant: "🍴",

    delivery: "🚚",

    payment: "💳",

    message: "💬",

    notification: "🔔",

    search: "🔎",

    tracking: "📍",

    ai: "🤖",

    cache: "⚡",

    database: "🗄️"
  };

  return icons[type] || "⚙️";
}


/* ================================
   REMOVE DUPLICATES
================================ */

function removeDuplicates(
  components: Component[]
): Component[] {

  const seen = new Set<string>();

  return components.filter(component => {

    if (seen.has(component.name)) {
      return false;
    }

    seen.add(component.name);

    return true;
  });
}


/* ================================
   SECURITY
================================ */

function escapeHtml(value: string): string {

  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


/* ================================
   BUTTON
================================ */

analyzeButton?.addEventListener(
  "click",
  () => {

    const requirement =
      requirementInput?.value.trim() || "";

    const users =
      Number(usersInput?.value || 0);

    const rps =
      Number(rpsInput?.value || 0);

    if (!requirement) {

      alert(
        "Please enter an application requirement."
      );

      return;
    }

    if (users <= 0 || rps <= 0) {

      alert(
        "Please enter valid users and requests/second values."
      );

      return;
    }

    const components =
      analyzeRequirement(
        requirement,
        users,
        rps
      );

    renderArchitecture(
      components,
      requirement
    );

    renderAnalysis(
      components,
      requirement,
      users,
      rps
    );

    architectureSection?.classList.remove(
      "hidden"
    );

    analysisSection?.classList.remove(
      "hidden"
    );

    architectureSection?.scrollIntoView({
      behavior: "smooth"
    });
  }
);
