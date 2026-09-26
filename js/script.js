// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// One-time terminal reveal in the hero.
// Respects prefers-reduced-motion: reduce by rendering the final state instantly.
(function typeTerminal() {
  const target = document.getElementById('terminal-output');
  if (!target) return;

  const lines = [
    { text: '$ python evaluate.py --model hybrid --k 10', cls: 'prompt' },
    { text: 'Loading cold-start evaluation set...' },
    { text: 'precision@10   0.41', cls: 'metric' },
    { text: 'recall@10      0.37', cls: 'metric' },
    { text: 'ndcg@10        0.52', cls: 'metric' },
    { text: 'coverage       0.68', cls: 'metric' },
    { text: 'novelty        0.59', cls: 'metric' },
    { text: '' },
    { text: 'done.' },
  ];

  const prefersReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  function renderStatic() {
    target.innerHTML = lines
      .map((l) => `<span${l.cls ? ` class="${l.cls}"` : ''}>${l.text}</span>`)
      .join('\n');
  }

  if (prefersReduced) {
    renderStatic();
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  const renderedLines = [];

  function step() {
    if (lineIndex >= lines.length) {
      target.innerHTML = renderedLines.join('\n') + '<span class="cursor"></span>';
      return;
    }

    const current = lines[lineIndex];
    charIndex++;
    const partial = current.text.slice(0, charIndex);
    const priorLines = renderedLines
      .map((l) => l)
      .join('\n');
    const openTag = current.cls ? `<span class="${current.cls}">` : '<span>';
    target.innerHTML =
      (priorLines ? priorLines + '\n' : '') + openTag + partial + '</span>';

    if (charIndex >= current.text.length) {
      renderedLines.push(`${openTag}${current.text}</span>`);
      lineIndex++;
      charIndex = 0;
      setTimeout(step, current.text === '' ? 120 : 220);
    } else {
      setTimeout(step, 14);
    }
  }

  step();
})();
