import "./style.css";

type Component = {
  name: string;
  type: string;
  description: string;
};

const components: Component[] = [
  {
    name: "API Gateway",
    type: "gateway",
    description: "Routes incoming requests"
  },
  {
    name: "Application Server",
    type: "server",
    description: "Processes business logic"
  },
  {
    name: "Cache",
    type: "cache",
    description: "Fast data access"
  },
  {
    name: "Database",
    type: "database",
    description: "Persistent storage"
  }
];

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="app">

    <header class="navbar">
      <div class="logo">
        <span class="logo-icon">D</span>
        <span>DevTwin</span>
      </div>

      <div class="nav-right">
        <span class="status-dot"></span>
        System Design Simulator
      </div>
    </header>

    <main class="container">

      <section class="hero">
        <p class="eyebrow">
          AI SOFTWARE ARCHITECTURE SIMULATOR
        </p>

        <h1>
          Design your system.
          <br />
          <span>Understand its architecture.</span>
        </h1>

        <p class="hero-text">
          Describe your application requirements and DevTwin will
          create a scalable system architecture for you.
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
            placeholder="Example: Build an e-commerce platform where users can browse products, add items to cart and place orders."
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
            Generate Architecture
          </button>

        </div>

        <div class="card architecture-card">

          <div class="card-title">
            <div>
              <h2>Architecture</h2>
              <p>Generated system components</p>
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
                <strong>Generate Architecture</strong>.
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
            <h2>Architecture Analysis</h2>
            <p>
              DevTwin's system design recommendations
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
  generateBtn &&
  requirementInput &&
  usersInput &&
  rpsInput &&
  architecture &&
  analysisSection &&
  analysis
) {
  generateBtn.addEventListener(
    "click",
    generateArchitecture
  );
}

function generateArchitecture(): void {
  const requirement =
    requirementInput?.value.trim() || "";

  const users =
    Number(usersInput?.value) || 0;

  const rps =
    Number(rpsInput?.value) || 0;

  if (!requirement) {
    alert(
      "Please enter your application requirement first."
    );
    requirementInput?.focus();
    return;
  }

  architecture!.innerHTML = `
    <div class="architecture-flow">

      ${createNode(
        "API Gateway",
        "gateway",
        "Routes incoming requests"
      )}

      <div class="arrow">
        →
      </div>

      ${createNode(
        "Application Server",
        "server",
        "Processes business logic"
      )}

      <div class="arrow">
        →
      </div>

      <div class="side-stack">

        ${createNode(
          "Cache",
          "cache",
          "Fast data access"
        )}

        ${createNode(
          "Database",
          "database",
          "Persistent storage"
        )}

      </div>

    </div>

    <div class="requirement-preview">
      <strong>Requirement:</strong>
      ${escapeHtml(requirement)}
    </div>
  `;

  const scalability = getScalabilityMessage(rps);

  const storage = getStorageMessage(users);

  analysis!.innerHTML = `
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
        <h3>Traffic</h3>

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
        <h3>Recommendation</h3>

        <p>
          Start with the generated architecture and
          introduce load balancing, replicas and
          distributed caching as traffic grows.
        </p>
      </div>

    </div>
  `;

  analysisSection!.classList.remove(
    "hidden"
  );

  analysisSection!.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function createNode(
  name: string,
  type: string,
  description: string
): string {
  return `
    <div class="architecture-node ${type}">

      <div class="node-icon">
        ${getIcon(type)}
      </div>

      <div>
        <h3>
          ${name}
        </h3>

        <p>
          ${description}
        </p>
      </div>

    </div>
  `;
}

function getIcon(type: string): string {
  switch (type) {
    case "gateway":
      return "⇄";

    case "server":
      return "◆";

    case "cache":
      return "◉";

    case "database":
      return "▤";

    default:
      return "◇";
  }
}

function getScalabilityMessage(
  rps: number
): string {
  if (rps >= 5000) {
    return `
      High traffic detected. Horizontal scaling,
      load balancing and multiple application
      servers are recommended.
    `;
  }

  if (rps >= 1000) {
    return `
      Moderate traffic detected. Caching and
      multiple application servers can improve
      scalability.
    `;
  }

  return `
    Current traffic is manageable with a basic
    scalable architecture.
  `;
}

function getStorageMessage(
  users: number
): string {
  if (users >= 100000) {
    return `
      A production database with indexing,
      backups and replication should be considered.
    `;
  }

  return `
    A standard relational or NoSQL database can
    handle the expected workload.
  `;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
// --------------------------------------------------
// Demo data shown automatically when the page opens
// --------------------------------------------------

requirementInput!.value =
  "Build a modern e-commerce platform where users can browse products, search products, add items to cart, place orders and make payments.";

usersInput!.value = "100000";

rpsInput!.value = "1000";

// Generate the architecture automatically
generateArchitecture();