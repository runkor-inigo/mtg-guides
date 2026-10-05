import './styles.css';
import {
  navItems,
  deckFacts,
  constructionRows,
  mulliganExamples,
  sequenceCards,
  sideboardSlots,
  matchupRows,
  interactionWindows,
  credits
} from './data';

const app = document.querySelector('#app');

if (!app) {
  throw new Error('App root not found');
}

const sections = [
  {
    id: 'start',
    title: 'Start Here',
    content: `
      <section class="panel hero-panel">
        <div class="eyebrow">Legacy • Speaker Elves</div>
        <h1>Speaker Elves</h1>
        <p class="lede">
          A precise, mana-forward Legacy deck identity where card selection, acceleration and resilient
          creature loops create the game plan. The guide keeps the focus on what the deck is trying to do,
          how hands convert to actual plans, and where opponent pressure can break the line.
        </p>
        <div class="fact-grid">
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
      </section>
      <section class="panel">
        <h2>Core thesis</h2>
        <p>
          Speaker Elves is not a generic “all creatures, all value” primer. It is a deck that wins by finding the
          right line and executing it in the face of interaction. The real teaching material is the early hand,
          the sequence of turns, the loop, the fallback plan and the opponent’s relevant timing windows.
        </p>
      </section>
    `
  },
  {
    id: 'construction',
    title: 'Construction',
    content: `
      <section class="panel">
        <h2>Deck construction and package logic</h2>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Package</th>
                <th>Current understanding</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${constructionRows
                .map(
                  (row) => `
                    <tr>
                      <td>${row.packageName}</td>
                      <td>${row.understanding}</td>
                      <td><span class="status-badge">${row.status}</span></td>
                    </tr>
                  `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </section>
    `
  },
  {
    id: 'mulligans',
    title: 'Mulligans',
    content: `
      <section class="panel">
        <h2>Mulligan philosophy</h2>
        <div class="grid three">
          ${mulliganExamples
            .map(
              (example) => `
                <article class="mini-card">
                  <h3>${example.title}</h3>
                  <p>${example.body}</p>
                </article>
              `
            )
            .join('')}
        </div>
        <div class="callout">
          The opening hand is judged by function, not by a rigid “keep list.” Ask which plan the hand is trying to
          execute, whether it has a real mana source, and what the opponent can do to kill that plan before it starts.
        </div>
      </section>
    `
  },
  {
    id: 'sequencing',
    title: 'Sequencing',
    content: `
      <section class="panel">
        <h2>First turns and sequence discipline</h2>
        <div class="grid three">
          ${sequenceCards
            .map(
              (card, index) => `
                <article class="mini-card sequence">
                  <div class="sequence-index">${index + 1}</div>
                  <h3>${card.title}</h3>
                  <p>${card.body}</p>
                </article>
              `
            )
            .join('')}
        </div>
      </section>
    `
  },
  {
    id: 'sideboard',
    title: 'Sideboard',
    content: `
      <section class="panel">
        <h2>Current sideboard framing</h2>
        <div class="sideboard-list">
          ${sideboardSlots
            .map(
              (slot) => `
                <div class="sideboard-row">
                  <div class="count">${slot.count}</div>
                  <div class="name">${slot.card}</div>
                  <div class="role">${slot.role}</div>
                </div>
              `
            )
            .join('')}
        </div>
        <div class="callout warning">
          Sideboard choices should preserve mana density, engine count and the pilot’s post-board route. In other words,
          the guide should emphasize the matchup window and the remaining plan, not just a raw card count.
        </div>
      </section>
    `
  },
  {
    id: 'matchups',
    title: 'Matchups',
    content: `
      <section class="panel">
        <h2>Matchup map</h2>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Matchup</th>
                <th>What matters</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              ${matchupRows
                .map(
                  (row) => `
                    <tr>
                      <td>${row.matchup}</td>
                      <td>${row.note}</td>
                      <td><span class="priority ${row.priority.toLowerCase()}">${row.priority}</span></td>
                    </tr>
                  `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </section>
    `
  },
  {
    id: 'interaction',
    title: 'Interaction Windows',
    content: `
      <section class="panel">
        <h2>Interaction windows</h2>
        <ul class="window-list">
          ${interactionWindows.map((item) => `<li>${item}</li>`).join('')}
        </ul>
      </section>
    `
  },
  {
    id: 'credits',
    title: 'Credits',
    content: `
      <section class="panel">
        <h2>Project notes</h2>
        <ul class="window-list">
          ${credits.map((item) => `<li>${item}</li>`).join('')}
        </ul>
      </section>
    `
  }
];

const render = () => {
  const activeId = navItems[0].id;

  const nav = `
    <header class="topbar">
      <div class="nav-shell">
        <div class="brand-wrap">
          <div class="brand-mark">S</div>
          <div>
            <div class="brand-name">Speaker Elves</div>
            <div class="brand-subtitle">Legacy guide project</div>
          </div>
        </div>
        <nav class="nav" aria-label="Guide sections">
          ${navItems
            .map(
              (item) => `
                <button class="nav-item ${item.id === activeId ? 'active' : ''}" data-target="${item.id}">
                  ${item.label}
                </button>
              `
            )
            .join('')}
        </nav>
      </div>
    </header>
  `;

  const content = `
    <main class="page-shell">
      ${sections
        .map(
          (section) => `
            <section class="guide-section ${section.id === activeId ? 'visible' : ''}" data-section="${section.id}">
              ${section.content}
            </section>
          `
        )
        .join('')}
    </main>
  `;

  app.innerHTML = nav + content;

  const navButtons = app.querySelectorAll<HTMLButtonElement>('.nav-item');

  navButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.target;
      if (!target) return;

      navButtons.forEach((item) => item.classList.toggle('active', item === button));
      app.querySelectorAll<HTMLElement>('.guide-section').forEach((section) => {
        section.classList.toggle('visible', section.dataset.section === target);
      });
    });
  });
};

render();
