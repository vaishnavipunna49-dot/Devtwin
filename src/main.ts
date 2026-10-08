import "./style.css";

interface Component {
  name: string;
  type: string;
  description: string;
  load: number;
}

interface Result {
  components: Component[];
  tier: string;
  score: number;
  bottlenecks: string[];
  recommendations: string[];
  cost: number;
  users: number;
  rps: number;
}

const app = document.querySelector<HTMLDivElement>("#app")!;

const icons: Record<string, string> = {
  Client: "🖥️",
  "API Gateway": "🚪",
  "Load Balancer": "⚖️",
  Authentication: "🔐",
  "Product Service": "📦",
  "Order Service": "🛒",
  "Restaurant Service": "🍽️",
  "Delivery Service": "🚚",
  "Payment Service": "💳",
  "Notification Service": "🔔",
  "Search Service": "🔎",
  "Tracking Service": "📍",
  "AI Service": "🤖",
  Cache: "⚡",
  Queue: "📨",
  Database: "🗄️",
  "Read Replica": "🗂️"
};

function escapeHTML(text: string): string {
  return text.replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[c]!));
}

function getTier(rps: number): string {
  if (rps < 100) return "Low";
  if (rps < 1000) return "Medium";
  if (rps < 5000) return "High";
  if (rps < 10000) return "Very High";
  return "Extreme";
}

function analyze(
  requirement: string,
  users: number,
  rps: number
): Result {
  const text = requirement.toLowerCase();

  const components: Component[] = [
    {
      name: "Client",
      type: "Frontend",
      description: "Web or mobile client",
      load: 30
    },
    {
      name: "API Gateway",
      type: "Edge",
      description: "API routing and protection",
      load: 65
    },
    {
      name: "Cache",
      type: "Performance",
      description: "Fast access to frequently used data",
      load: 45
    },
    {
      name: "Database",
      type: "Storage",
      description: "Persistent application data",
      load: 80
    }
  ];

  const add = (
    name: string,
    type: string,
    description: string,
    load: number
  ) => {
    if (!components.some(c => c.name === name)) {
      components.splice(2, 0, {
        name,
        type,
        description,
        load
      });
    }
  };

  if (rps >= 1000) {
    add(
      "Load Balancer",
      "Traffic",
      "Distributes requests across servers",
      40
    );
  }

  if (/login|auth|user|account|secure/.test(text)) {
    add(
      "Authentication",
      "Security",
      "Identity and access management",
      45
    );
  }

  if (/product|catalog|inventory|shop/.test(text)) {
    add(
      "Product Service",
      "Domain",
      "Product and inventory management",
      55
    );
  }

  if (/order|cart|checkout|purchase/.test(text)) {
    add(
      "Order Service",
      "Domain",
      "Orders and checkout",
      70
    );
  }

  if (/restaurant|food|menu/.test(text)) {
    add(
      "Restaurant Service",
      "Domain",
      "Restaurant and menu management",
      55
    );
  }

  if (/delivery|driver|deliver/.test(text)) {
    add(
      "Delivery Service",
      "Domain",
      "Delivery management",
      65
    );
  }

  if (/payment|pay|transaction/.test(text)) {
    add(
      "Payment Service",
      "Domain",
      "Payment processing",
      70
    );
  }

  if (/notification|email|sms|alert/.test(text)) {
    add(
      "Notification Service",
      "Async",
      "Notifications and alerts",
      40
    );
  }

  if (/search|find|discover/.test(text)) {
    add(
      "Search Service",
      "Query",
      "Search and filtering",
      60
    );
  }

  if (/tracking|location|gps|map/.test(text)) {
    add(
      "Tracking Service",
      "Realtime",
      "Location and tracking",
      75
    );
  }

  if (/ai|recommend|machine learning|ml/.test(text)) {
    add(
      "AI Service",
      "AI",
      "AI inference and recommendations",
      70
    );
  }

  if (rps >= 5000) {
    add(
      "Queue",
      "Async",
      "Handles traffic spikes and background work",
      35
    );
  }

  if (users >= 1000000 || rps >= 10000) {
    add(
      "Read Replica",
      "Database",
      "Scales database reads",
      45
    );
  }

  const bottlenecks: string[] = [];

  if (rps >= 1000) {
    bottlenecks.push(
      "Database reads may become a bottleneck."
    );
  }

  if (rps >= 5000) {
    bottlenecks.push(
      "Synchronous operations may increase latency."
    );
  }

  if (/ai|machine learning|ml/.test(text)) {
    bottlenecks.push(
      "AI inference can require significant compute."
    );
  }

  if (/tracking|location|gps/.test(text)) {
    bottlenecks.push(
      "Realtime location writes can increase database load."
    );
  }

  const recommendations = [
    "Add monitoring, logs and distributed tracing.",
    "Keep application servers stateless.",
    "Perform load testing before production."
  ];

  if (rps >= 5000) {
    recommendations.push(
      "Use queues for expensive background operations."
    );
  }

  if (users >= 1000000) {
    recommendations.push(
      "Plan database replicas and partitioning."
    );
  }

  if (/ai|recommend|machine learning|ml/.test(text)) {
    recommendations.push(
      "Cache repeated AI results and isolate AI workloads."
    );
  }

  let score = 70;

  if (rps >= 1000) score += 7;
  if (rps >= 5000) score += 7;

  if (
    components.some(
      c => c.name === "Load Balancer"
    )
  ) {
    score += 5;
  }

  if (
    components.some(
      c => c.name === "Queue"
    )
  ) {
    score += 4;
  }

  if (
    components.some(
      c => c.name === "Read Replica"
    )
  ) {
    score += 3;
  }

  score -= bottlenecks.length * 3;

  score = Math.max(
    0,
    Math.min(100, score)
  );

  const cost = Math.round(
    35 +
    rps * 0.018 +
    users / 25000 +
    (rps > 1000 ? 35 : 10) +
    (rps > 5000 ? 28 : 0) +
    (users >= 1000000 ? 70 : 0)
  );

  return {
    components,
    tier: getTier(rps),
    score,
    bottlenecks,
    recommendations,
    cost,
    users,
    rps
  };
}

function render(result: Result) {
  const results =
    document.querySelector("#results")!;

  results.innerHTML = `
    <section class="card">

      <div class="heading">
        <div>
          <span class="kicker">
            02 / ARCHITECTURE
          </span>

          <h2>
            Recommended System Design
          </h2>
        </div>

        <button
          id="printBtn"
          class="small-btn"
        >
          Print / PDF
        </button>
      </div>

      <div class="metrics">

        <div>
          <span>Architecture Score</span>
          <strong>
            ${result.score}/100
          </strong>
        </div>

        <div>
          <span>Traffic</span>
          <strong>
            ${result.tier}
          </strong>
        </div>

        <div>
          <span>Peak RPS</span>
          <strong>
            ${result.rps.toLocaleString()}
          </strong>
        </div>

        <div>
          <span>Users</span>
          <strong>
            ${result.users.toLocaleString()}
          </strong>
        </div>

        <div>
          <span>Estimated Cost</span>
          <strong>
            $${result.cost}/mo
          </strong>
        </div>

      </div>

      <div class="architecture">

        ${result.components
          .map(
            (c, i) => `
              <div class="node-wrap">

                <div class="node">

                  <div class="node-icon">
                    ${icons[c.name] || "◈"}
                  </div>

                  <strong>
                    ${escapeHTML(c.name)}
                  </strong>

                  <small>
                    ${escapeHTML(c.type)}
                  </small>

                  <div class="bar">
                    <span
                      style="width:${c.load}%"
                    ></span>
                  </div>

                  <em>
                    ${c.load}% load
                  </em>

                </div>

                ${
                  i <
                  result.components.length - 1
                    ? `<div class="arrow">→</div>`
                    : ""
                }

              </div>
            `
          )
          .join("")}

      </div>

    </section>

    <section class="analysis-grid">

      <div class="analysis">
        <h3>📈 Scalability</h3>

        <p>
          ${
            result.rps >= 5000
              ? "Use horizontal scaling, caching and asynchronous queues."
              : result.rps >= 1000
              ? "Use horizontal application scaling behind a load balancer."
              : "Vertical scaling is sufficient initially."
          }
        </p>
      </div>

      <div class="analysis">
        <h3>🗃️ Storage</h3>

        <p>
          Managed relational database with caching is recommended.
        </p>
      </div>

      <div class="analysis">
        <h3>🏗️ Architecture</h3>

        <p>
          ${
            result.components.length >= 8
              ? "Service-oriented architecture"
              : "Modular scalable architecture"
          }
        </p>
      </div>

      <div class="analysis">

        <h3>⚠️ Bottlenecks</h3>

        ${
          result.bottlenecks.length
            ? `
              <ul>
                ${result.bottlenecks
                  .map(
                    b =>
                      `<li>${escapeHTML(b)}</li>`
                  )
                  .join("")}
              </ul>
            `
            : `
              <p>
                No major bottlenecks detected.
              </p>
            `
        }

      </div>

      <div class="analysis">

        <h3>🧪 Testing</h3>

        <ul>
          <li>Unit testing</li>
          <li>API integration testing</li>
          <li>Load testing</li>
          <li>Failure testing</li>
        </ul>

      </div>

      <div class="analysis">

        <h3>🛡️ Risks</h3>

        <ul>
          <li>Database growth</li>
          <li>Third-party failures</li>
          <li>Security vulnerabilities</li>
        </ul>

      </div>

    </section>

    <section class="card">

      <div class="heading">

        <div>
          <span class="kicker">
            03 / LIVE SIMULATION
          </span>

          <h2>
            Traffic Simulator
          </h2>
        </div>

        <button
          id="simulateBtn"
          class="small-btn"
        >
          Start Simulation
        </button>

      </div>

      <div class="live-grid">

        <div>
          <span>Current RPS</span>
          <strong id="liveRps">
            ${result.rps}
          </strong>
        </div>

        <div>
          <span>Latency</span>
          <strong id="latency">
            -- ms
          </strong>
        </div>

        <div>
          <span>Health</span>
          <strong id="health">
            Ready
          </strong>
        </div>

      </div>

      <div
        id="chart"
        class="chart"
      ></div>

    </section>

    <section class="card">

      <span class="kicker">
        04 / COMPARISON
      </span>

      <h2>
        Architecture Comparison
      </h2>

      <div class="compare">

        <div>

          <h3>
            Simple Baseline
          </h3>

          <strong class="big-score">
            58/100
          </strong>

          <ul>
            <li>Lower initial cost</li>
            <li>Easy deployment</li>
            <li>Limited scalability</li>
            <li>More single points of failure</li>
          </ul>

        </div>

        <div class="recommended">

          <b>
            RECOMMENDED
          </b>

          <h3>
            DevTwin Architecture
          </h3>

          <strong class="big-score">
            ${result.score}/100
          </strong>

          <ul>
            <li>Traffic-aware scaling</li>
            <li>Better failure isolation</li>
            <li>Async processing</li>
            <li>Production-ready growth path</li>
          </ul>

        </div>

      </div>

    </section>

    <section class="card">

      <span class="kicker">
        05 / RECOMMENDATIONS
      </span>

      <h2>
        Engineering Recommendations
      </h2>

      <div class="recommendations">

        ${result.recommendations
          .map(
            (r, i) => `
              <div>
                <b>
                  ${String(i + 1).padStart(2, "0")}
                </b>

                <span>
                  ${escapeHTML(r)}
                </span>
              </div>
            `
          )
          .join("")}

      </div>

    </section>
  `;

  document
    .querySelector("#printBtn")
    ?.addEventListener(
      "click",
      () => window.print()
    );

  document
    .querySelector("#simulateBtn")
    ?.addEventListener(
      "click",
      () => simulate(result)
    );
}

function simulate(result: Result) {
  const rps =
    document.querySelector("#liveRps")!;

  const latency =
    document.querySelector("#latency")!;

  const health =
    document.querySelector("#health")!;

  const chart =
    document.querySelector("#chart")!;

  let count = 0;

  const points: number[] = [];

  const timer = setInterval(() => {

    count++;

    const current = Math.round(
      result.rps *
      (0.75 + Math.random() * 0.45)
    );

    const delay = Math.round(
      50 + Math.random() * 120
    );

    points.push(current);

    if (points.length > 30) {
      points.shift();
    }

    rps.textContent =
      current.toLocaleString();

    latency.textContent =
      `${delay} ms`;

    health.textContent =
      current > result.rps * 1.05
        ? "Degraded"
        : "Healthy";

    chart.innerHTML =
      points
        .map(
          p => `
            <span
              style="
                height:${Math.min(
                  100,
                  (p / result.rps) * 100
                )}%
              "
            ></span>
          `
        )
        .join("");

    if (count >= 20) {
      clearInterval(timer);
    }

  }, 400);
}

app.innerHTML = `

  <div class="app">

    <nav class="navbar">

      <div class="brand">

        <span class="logo">
          D
        </span>

        DevTwin

        <span class="version">
          2.0
        </span>

      </div>

      <span class="status">
        ● Architecture Simulator
      </span>

    </nav>

    <header class="hero">

      <span class="kicker">
        AI-INSPIRED SYSTEM DESIGN LAB
      </span>

      <h1>
        Turn requirements into a
        <span>
          production-ready architecture.
        </span>
      </h1>

      <p>
        Model traffic, detect bottlenecks,
        estimate cost and compare architecture
        decisions before you build.
      </p>

    </header>

    <main class="workspace">

      <section class="card">

        <div class="heading">

          <div>

            <span class="kicker">
              01 / REQUIREMENTS
            </span>

            <h2>
              Describe your system
            </h2>

          </div>

          <span class="hint">
            Natural language supported
          </span>

        </div>

        <label>
          What are you building?
        </label>

        <textarea
          id="requirements"
          placeholder="Example: A food delivery platform with login, restaurant search, orders, payments and delivery tracking."
        >A food delivery platform with restaurant search, user login, orders, payments, delivery tracking and notifications.</textarea>

        <div class="inputs">

          <div>

            <label>
              Expected users
            </label>

            <input
              id="users"
              type="number"
              value="100000"
            />

          </div>

          <div>

            <label>
              Peak requests / second
            </label>

            <input
              id="rps"
              type="number"
              value="1200"
            />

          </div>

          <button id="generate">
            Generate Architecture →
          </button>

        </div>

      </section>

      <div id="results"></div>

    </main>

  </div>
`;

document
  .querySelector("#generate")
  ?.addEventListener(
    "click",
    () => {

      const requirement =
        (
          document.querySelector(
            "#requirements"
          ) as HTMLTextAreaElement
        ).value;

      const users =
        Number(
          (
            document.querySelector(
              "#users"
            ) as HTMLInputElement
          ).value
        ) || 1;

      const rps =
        Number(
          (
            document.querySelector(
              "#rps"
            ) as HTMLInputElement
          ).value
        ) || 1;

      if (!requirement.trim()) {
        alert(
          "Please describe your system."
        );
        return;
      }

      render(
        analyze(
          requirement,
          users,
          rps
        )
      );
    }
  );