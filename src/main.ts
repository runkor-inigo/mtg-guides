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
const activeTab = tabs[0].id;

const renderDeckRows = (rows: Array<{ qty: string; name: string; tag: string }>, compact = false) => rows
  .map(
    (card) => `
      <div class="deckrow ${compact ? 'compact' : ''}">
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
          <th>Prison / Big Mana</th>
          <th>Reanimator</th>
        </tr>
      </thead>
      <tbody>
        ${matrixRows
          .map(
            (row) => `
              <tr>
                <td class="rowname md">${row.category}</td>
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

const appHTML = `
  <div class="guide-shell">
    <header class="main-header">
      <div class="wrap">
        <div class="titleline">
          <div class="miniLogo">E</div>
          <div>
            <h1>Legacy Elves — BG Sideboard Guide <span class="badge">RC51 TEST LIST</span></h1>
            <p class="sub">19 lands · 7 fetchlands · 6 dorks · Speaker / Cub engine</p>
          </div>
        </div>
        <nav class="tabs" aria-label="Guide sections">
          ${tabs
            .map(
              (tab) => `
                <button class="tab ${tab.id === activeTab ? 'active' : ''}" data-tab="${tab.id}" type="button">
                  ${tab.label}
                </button>
              `
            )
            .join('')}
        </nav>
      </div>
    </header>

    <main class="wrap">
      <section class="pane active" id="map">
        <div class="note">
          Speaker Elves is built to turn early mana and selection into a resilient plan. The guide prioritizes line selection,
          protective sequencing, and the moment when a combo or value line becomes vulnerable to interaction.
        </div>

        <details class="legend" open>
          <summary>Plan legend and over-sideboarding rules</summary>
          <div class="legendgrid">
            <div class="legenditem"><span class="rolepill turbo">Turbo</span><br/>Force the combo or lethal line as early as possible. Interaction is there to create a window, not to grind.</div>
            <div class="legenditem"><span class="rolepill slow">Slow</span><br/>Removal and resource exchange matter. Preserve engine density and plan for long games.</div>
            <div class="legenditem"><span class="rolepill control">Control</span><br/>Find a lock piece or interaction first, then execute the normal plan. This is the section where Teeg or Ouphe logic belongs.</div>
            <div class="legenditem"><b>Over-sideboarding</b><br/><span class="ok">0–4 changes: normal</span><br/><span class="warn">5: review density</span><br/><span class="danger">6+: deliberate transformation only</span></div>
          </div>
        </details>

        ${renderMatrix()}
      </section>

      <section class="pane" id="deck">
        <div class="deckgrid">
          <div class="box">
            <h3>Main deck</h3>
            ${renderDeckRows(deckRows.slice(0, 8))}
          </div>
          <div class="box">
            <h3>Sideboard</h3>
            ${renderDeckRows(sideboardRows, true)}
          </div>
        </div>

        <div class="fact-grid compact-grid">
          ${deckFacts
            .map(
              (fact) => `
                <article class="fact-card compact">
                  <span>${fact.label}</span>
                  <strong>${fact.value}</strong>
                </article>
              `
            )
            .join('')}
        </div>
      </section>

      <section class="pane" id="heur">
        <div class="heurgrid">
          ${heuristics
            .map(
              (item) => `
                <article class="heur">
                  <h3>${item.title}</h3>
                  <p>${item.body}</p>
                </article>
              `
            )
            .join('')}
        </div>
      </section>

      <section class="pane" id="goldfish">
        <div class="combo-grid">
          <div class="box small-box">
            <h3>Goldfish sequence</h3>
            <div class="step-list">
              ${goldfishSteps
                .map(
                  (step, index) => `
                    <div class="step">
                      <div class="num">${index + 1}</div>
                      <div>${step}</div>
                    </div>
                  `
                )
                .join('')}
            </div>
          </div>
          <div class="box small-box">
            <h3>What the guide expects</h3>
            <div class="result">
              The deck should want a turn-one play that sets up a real line, not just a mana source with no follow-up. The strongest keep patterns are those that combine early acceleration with a plausible engine or finish.
            </div>
          </div>
        </div>
      </section>

      <section class="pane" id="mana">
        <div class="card-grid">
          <div class="box">
            <h3>Mana math</h3>
            <table class="data">
              <thead>
                <tr>
                  <th>Check</th>
                  <th>Takeaway</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Initial green source</td><td>Cradle and Forest are not interchangeable in a keep decision.</td></tr>
                <tr><td>Turn one accelerator</td><td>One-mana dork or equivalent shapes whether the deck can execute before interaction.</td></tr>
                <tr><td>Natural Order line</td><td>Protect the board and ensure the sacrifice still wins before the combo becomes fragile.</td></tr>
                <tr><td>Loop execution</td><td>Count the mana reset and know when you are under a hard clock.</td></tr>
              </tbody>
            </table>
          </div>
          <div class="box">
            <h3>Core planning notes</h3>
            <ul class="window-list">
              <li>Play the first source as if it turns the deck into a genuine clock.</li>
              <li>Prioritize the hand’s plan before forcing a generic value line.</li>
              <li>Use the combo line only when the mana and board state make the follow-up safe.</li>
              <li>Read the first removal or counterspell as a new game state, not as a sign the plan is already dead.</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="pane" id="sources">
        <div class="box">
          <h3>Sources and notes</h3>
          <ul class="window-list">
            ${sources.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      </section>
    </main>
  </div>
`;

app.innerHTML = appHTML;

const tabButtons = app.querySelectorAll<HTMLButtonElement>('.tab');
const panes = app.querySelectorAll<HTMLElement>('.pane');

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.tab;
    if (!target) return;

    tabButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    panes.forEach((pane) => pane.classList.toggle('active', pane.id === target));
  });
});
