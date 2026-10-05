import './styles.css';
import {
  navItems,
  deckFacts,
  deckRows,
  sideboardRows,
  heuristics,
  goldfishSteps,
  matrixRows,
  sources
} from './data';

const app = document.querySelector('#app');

if (!app) {
  throw new Error('App root not found');
}

const tabs = navItems;

const renderDeckRows = (rows: Array<{ qty: string; name: string; tag: string }>) => rows
  .map(
    (card) => `
      <div class="deckrow">
        <span class="q">${card.qty}</span>
        <span class="name">${card.name}</span>
        <span class="tag ${card.tag}">${card.tag}</span>
      </div>
    `
  )
  .join('');

const renderMatrix = () => `
  <div class="matrixwrap">
    <table class="matrix">
      <thead>
        <tr>
          <th class="rowname">Category</th>
          <th>Pox</th>
          <th>Lands</th>
          <th>Tempo</th>
          <th>Control</th>
          <th>Prison</th>
          <th>Reanimator</th>
        </tr>
      </thead>
      <tbody>
        ${matrixRows
          .map(
            (row) => `
              <tr>
                <td class="rowname">${row.category}</td>
                <td class="cell ${row.pox.startsWith('+') ? 'incell' : row.pox.startsWith('-') ? 'outcell' : 'normal'}">${row.pox}</td>
                <td class="cell ${row.lands.startsWith('+') ? 'incell' : row.lands.startsWith('-') ? 'outcell' : 'normal'}">${row.lands}</td>
                <td class="cell ${row.tempo.startsWith('+') ? 'incell' : row.tempo.startsWith('-') ? 'outcell' : 'normal'}">${row.tempo}</td>
                <td class="cell ${row.control.startsWith('+') ? 'incell' : row.control.startsWith('-') ? 'outcell' : 'normal'}">${row.control}</td>
                <td class="cell ${row.prison.startsWith('+') ? 'incell' : row.prison.startsWith('-') ? 'outcell' : 'normal'}">${row.prison}</td>
                <td class="cell ${row.reanimator.startsWith('+') ? 'incell' : row.reanimator.startsWith('-') ? 'outcell' : 'normal'}">${row.reanimator}</td>
              </tr>
            `
          )
          .join('')}
      </tbody>
    </table>
  </div>
`;

const renderLanding = () => `
  <div class="landing-screen">
    <div class="landing-card">
      <div class="landing-badge">Legacy • Speaker Elves</div>
      <h1>RC51</h1>
      <p class="landing-subtitle">A guide for the greener side of Legacy.</p>
      <div class="landing-meta">
        <span>Current 75</span>
        <span>Sideboard map</span>
        <span>Goldfish logic</span>
      </div>
      <button class="enter-btn" type="button">Enter guide</button>
    </div>
  </div>
`;

const renderGuide = () => `
  <div class="guide-shell">
    <header class="main-header">
      <div class="shell-wrap">
        <div class="titleline">
          <div class="mini-logo">E</div>
          <div class="header-copy">
            <div class="eyebrow">Legacy • Elves guide</div>
            <h2>Speaker Elves</h2>
            <div class="header-meta">BG shell • 19 lands • 6 dorks • combo / grind</div>
          </div>
        </div>

        <nav class="guide-tabs" aria-label="Guide sections">
          ${tabs
            .map(
              (tab) => `
                <button class="tab-button" data-target="${tab.id}" type="button">${tab.label}</button>
              `
            )
            .join('')}
        </nav>
      </div>
    </header>

    <main class="shell-wrap content-area">
      <section class="guide-section active" id="map">
        <div class="section-banner">
          <div>
            <span class="tiny-label">Core idea</span>
            <h3>Win by setting up the first credible line, then protecting it.</h3>
          </div>
          <p>
            Speaker Elves is strongest when it turns early mana into a real plan: pressure, value, or a combo line
            that survives interaction instead of folding to the first removal spell or counterspell.
          </p>
        </div>

        <div class="facts-grid">
          ${deckFacts
            .map(
              (fact) => `
                <article class="fact-card">
                  <span>${fact.label}</span>
                  <strong>${fact.value}</strong>
                </article>
              `
            )
            .join('')}
        </div>

        <div class="two-col">
          <div class="panel-box">
            <h4>Plan legend</h4>
            <div class="legend-grid">
              <div class="legend-item">
                <span class="pill turbo">Turbo</span>
                <p>Force the combo or lethal line early. Interaction is a window, not a reason to stall.</p>
              </div>
              <div class="legend-item">
                <span class="pill slow">Slow</span>
                <p>Preserve engine density and maximize value in long games where removal matters.</p>
              </div>
              <div class="legend-item">
                <span class="pill control">Control</span>
                <p>Find the lock or disruption piece first, then execute the normal plan with less risk.</p>
              </div>
            </div>
          </div>

          <div class="panel-box">
            <h4>Over-sideboarding</h4>
            <ul class="mini-list">
              <li><span class="ok">0–4 changes</span> — normal</li>
              <li><span class="warn">5 changes</span> — review density</li>
              <li><span class="danger">6+</span> — deliberate transformation</li>
            </ul>
          </div>
        </div>

        ${renderMatrix()}
      </section>

      <section class="guide-section" id="deck">
        <div class="two-col deck-layout">
          <div class="panel-box">
            <h4>Main deck</h4>
            ${renderDeckRows(deckRows.slice(0, 8))}
          </div>
          <div class="panel-box">
            <h4>Sideboard</h4>
            ${renderDeckRows(sideboardRows)}
          </div>
        </div>
      </section>

      <section class="guide-section" id="heur">
        <div class="heur-grid">
          ${heuristics
            .map(
              (item) => `
                <article class="heur-card">
                  <h4>${item.title}</h4>
                  <p>${item.body}</p>
                </article>
              `
            )
            .join('')}
        </div>
      </section>

      <section class="guide-section" id="goldfish">
        <div class="two-col">
          <div class="panel-box">
            <h4>Goldfish sequence</h4>
            <div class="step-list">
              ${goldfishSteps
                .map(
                  (step, index) => `
                    <div class="step-item">
                      <span class="step-num">${index + 1}</span>
                      <span>${step}</span>
                    </div>
                  `
                )
                .join('')}
            </div>
          </div>

          <div class="panel-box">
            <h4>What the guide expects</h4>
            <div class="takeaway-box">
              The deck wants a turn-one play that sets up a real line, not just a mana source with no follow-up.
              The strongest keeps combine early acceleration with a credible engine or finish.
            </div>
          </div>
        </div>
      </section>

      <section class="guide-section" id="mana">
        <div class="two-col">
          <div class="panel-box">
            <h4>Mana math</h4>
            <table class="meta-table">
              <thead>
                <tr>
                  <th>Check</th>
                  <th>Takeaway</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Initial green source</td><td>Cradle and Forest are not interchangeable in a keep decision.</td></tr>
                <tr><td>Turn-one accelerator</td><td>One-mana dork or equivalent shapes whether the deck can execute before interaction.</td></tr>
                <tr><td>Natural Order line</td><td>Protect the board and ensure the sacrifice still wins before the combo becomes fragile.</td></tr>
                <tr><td>Loop execution</td><td>Count the mana reset and know when you are under a hard clock.</td></tr>
              </tbody>
            </table>
          </div>

          <div class="panel-box">
            <h4>Core planning notes</h4>
            <ul class="bullet-list">
              <li>Play the first source as if it turns the deck into a genuine clock.</li>
              <li>Prioritize the hand’s plan before forcing a generic value line.</li>
              <li>Use the combo line only when the mana and board state make the follow-up safe.</li>
              <li>Read the first removal or counterspell as a new game state, not as the death of the plan.</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="guide-section" id="sources">
        <div class="panel-box full-panel">
          <h4>Sources and notes</h4>
          <ul class="bullet-list">
            ${sources.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="shell-wrap footer-inner">
        <div>
          <div class="footer-label">Speaker Elves</div>
          <div class="footer-copy">Legacy guide project</div>
        </div>
        <div class="footer-links">
          <a href="#">Instagram</a>
          <a href="#">X</a>
          <a href="#">Discord</a>
          <a href="#">YouTube</a>
        </div>
      </div>
    </footer>
  </div>
`;

let entered = false;

const render = () => {
  app.innerHTML = entered ? renderGuide() : renderLanding();

  if (!entered) {
    const button = app.querySelector<HTMLButtonElement>('.enter-btn');
    button?.addEventListener('click', () => {
      entered = true;
      render();
    });
    return;
  }

  const buttons = app.querySelectorAll<HTMLButtonElement>('.tab-button');
  const sections = app.querySelectorAll<HTMLElement>('.guide-section');

  buttons.forEach((button) => {
    const target = button.dataset.target;
    button.addEventListener('click', () => {
      buttons.forEach((btn) => btn.classList.toggle('active', btn === button));
      sections.forEach((section) => {
        section.classList.toggle('active', section.id === target);
      });
    });
  });
};

render();
