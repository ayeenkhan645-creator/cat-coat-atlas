/* The Cat Coat Atlas. No analytics, storage, APIs or build tools are used. */
'use strict';

(() => {
  // Mobile menu
  const menuToggle = document.getElementById('menuToggle');
  const primaryNav = document.getElementById('primaryNav');
  menuToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
  primaryNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    primaryNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && primaryNav.classList.contains('open')) {
      primaryNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.focus();
    }
  });

  // Pattern library filter / search
  const cards = [...document.querySelectorAll('.pattern-card')];
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const search = document.getElementById('patternSearch');
  const count = document.getElementById('patternCount');
  const empty = document.getElementById('emptyState');
  let selectedFilter = 'all';

  function applyFilters() {
    const query = search.value.trim().toLocaleLowerCase();
    let shown = 0;
    cards.forEach(card => {
      const categoryMatches = selectedFilter === 'all' || card.dataset.category === selectedFilter;
      const searchMatches = !query || card.dataset.name.toLocaleLowerCase().includes(query) || card.textContent.toLocaleLowerCase().includes(query);
      const show = categoryMatches && searchMatches;
      card.hidden = !show;
      if (show) shown += 1;
    });
    count.textContent = shown === 10 ? 'Showing all 10 patterns' : `Showing ${shown} of 10 patterns`;
    empty.hidden = shown !== 0;
  }

  filterButtons.forEach(button => button.addEventListener('click', () => {
    selectedFilter = button.dataset.filter;
    filterButtons.forEach(btn => {
      const active = btn === button;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    applyFilters();
  }));
  search.addEventListener('input', applyFilters);
  document.getElementById('clearFilters').addEventListener('click', () => {
    search.value = '';
    filterButtons[0].click();
    search.focus();
  });

  // Interactive pattern finder: three descriptive questions, not image or genetic analysis.
  const PATTERNS = {
    mackerel: { name: 'Mackerel tabby', text: 'Thin stripes running roughly down the sides are a classic mackerel-tabby clue. Compare the stripe spacing and the markings around the face.' },
    classic: { name: 'Classic tabby', text: 'Broad curves and swirling marks suggest a classic, or blotched, tabby coat. Look for round, marbled shapes along the body.' },
    spotted: { name: 'Spotted tabby', text: 'Distinct dots or ovals suggest a spotted-tabby look. Some spotted coats also show broken stripes.' },
    ticked: { name: 'Ticked tabby', text: 'A softly speckled finish with few obvious body stripes can point toward a ticked-tabby look. Individual hairs may have multiple color bands.' },
    tortoiseshell: { name: 'Tortoiseshell', text: 'Mottled orange-based and dark patches with little white are typical of a tortoiseshell, or tortie, coat. Dilute versions can look blue-gray and cream.' },
    calico: { name: 'Calico', text: 'Orange-based and dark patches together with visible white suggest calico (also called tortoiseshell-and-white). Size and shape of patches vary.' },
    tuxedo: { name: 'Tuxedo', text: 'A dark coat with a white chest, tummy, face or paws is often called a tuxedo. This is one recognizable form of bicolor markings.' },
    bicolor: { name: 'Bicolor', text: 'White alongside another coat color or pattern is generally described as bicolor. The white areas can be small or extensive.' },
    colorpoint: { name: 'Colorpoint', text: 'A paler body with darker ears, face, paws and tail fits a colorpoint look. Point colors can be solid or patterned.' },
    solid: { name: 'Solid / self', text: 'A mainly even coat with no obvious contrasting design may be called solid or self. Some cats still show faint underlying patterning.' }
  };
  const QUESTIONS = [
    {
      title: 'What catches your eye first?',
      help: 'Think about the most noticeable pattern on your cat, rather than the exact fur color.',
      options: [
        ['stripes', 'Stripes or swirls', '〰'],
        ['spots', 'Distinct spots or dots', '◌'],
        ['patches', 'Mixed color patches', '▦'],
        ['points', 'Darker face, ears & paws', '◕'],
        ['plain', 'Mostly one color', '●'],
        ['white', 'White with another color', '◐'],
        ['unsure', 'A little of everything / unsure', '?']
      ]
    },
    {
      title: 'How much white fur do you see?',
      help: 'White spotting can help distinguish calico from tortie, and describe bicolor coats.',
      options: [
        ['none', 'None or almost none', '●'],
        ['some', 'A few noticeable white areas', '◔'],
        ['lots', 'Large white patches', '◑'],
        ['unsure', 'Hard to tell', '?']
      ]
    }
  ];
  const DETAILS = {
    stripes: [
      ['mackerel', 'Narrow, straight-ish stripes', '〽'],
      ['classic', 'Broad swirls or bullseyes', '◎'],
      ['spotted', 'Broken stripes or little spots', '◌'],
      ['ticked', 'Subtle, finely speckled fur', '✳'],
      ['unsure', 'Not sure which kind', '?']
    ],
    spots: [
      ['spotted', 'Clear spots scattered on the coat', '◌'],
      ['mackerel', 'More like thin broken lines', '〽'],
      ['classic', 'More like large curved swirls', '◎'],
      ['unsure', 'Not quite sure', '?']
    ],
    patches: [
      ['tortoiseshell', 'Orange and dark colors mix together', '▦'],
      ['calico', 'Orange, dark AND white areas', '◪'],
      ['bicolor', 'White plus one other main color', '◐'],
      ['tuxedo', 'Dark coat with a white bib or socks', '♧'],
      ['unsure', 'Difficult to say', '?']
    ],
    points: [
      ['colorpoint', 'Darkest on face, ears, feet & tail', '◕'],
      ['tuxedo', 'Mostly dark with white chest/paws', '♧'],
      ['bicolor', 'Irregular white-and-color patches', '◐'],
      ['unsure', 'Not sure what I see', '?']
    ],
    plain: [
      ['solid', 'Even color with few markings', '●'],
      ['ticked', 'Tiny bands or flecks across fur', '✳'],
      ['mackerel', 'Faint narrow stripes show in light', '〽'],
      ['colorpoint', 'Darker ears and face than body', '◕'],
      ['unsure', 'Not sure', '?']
    ],
    white: [
      ['bicolor', 'White with irregular color areas', '◐'],
      ['tuxedo', 'Dark coat, white chest or socks', '♧'],
      ['calico', 'White, orange AND dark patches', '◪'],
      ['solid', 'Mostly an even light color', '●'],
      ['unsure', 'I am not sure', '?']
    ],
    unsure: [
      ['mackerel', 'Narrow stripes', '〽'],
      ['classic', 'Broad swirls', '◎'],
      ['spotted', 'Spots', '◌'],
      ['ticked', 'Subtle ticking', '✳'],
      ['tortoiseshell', 'Mottled orange + dark', '▦'],
      ['calico', 'Orange + dark + white', '◪'],
      ['tuxedo', 'Dark with white bib/socks', '♧'],
      ['bicolor', 'White + another color', '◐'],
      ['colorpoint', 'Darker ears, face and paws', '◕'],
      ['solid', 'Mostly one even color', '●'],
      ['unsure', 'Still not sure', '?']
    ]
  };
  const content = document.getElementById('quizContent');
  const progress = document.getElementById('quizProgress');
  const stepLabel = document.getElementById('quizStepLabel');
  const back = document.getElementById('quizBack');
  const next = document.getElementById('quizNext');
  let currentStep = 0;
  let answers = [null, null, null];
  let resultMode = false;

  function getQuestion() {
    if (currentStep !== 2) return QUESTIONS[currentStep];
    return {
      title: 'Which detail feels closest?',
      help: 'Choose the description that best fits. Real cats can have overlapping coat traits.',
      options: DETAILS[answers[0] || 'unsure']
    };
  }

  function renderQuiz(moveFocus = false) {
    if (resultMode) return renderResult(moveFocus);
    const q = getQuestion();
    stepLabel.textContent = `QUESTION ${currentStep + 1} OF 3`;
    progress.style.width = `${((currentStep + 1) / 3) * 100}%`;
    content.replaceChildren();
    const heading = document.createElement('h3');
    heading.className = 'quiz-prompt';
    heading.id = 'quizQuestionHeading';
    heading.tabIndex = -1;
    heading.textContent = q.title;
    const help = document.createElement('p');
    help.className = 'quiz-help';
    help.textContent = q.help;
    const options = document.createElement('div');
    options.className = 'quiz-options';
    options.setAttribute('role', 'group');
    options.setAttribute('aria-label', q.title);
    q.options.forEach(([id, label, symbol]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'quiz-option';
      button.dataset.answer = id;
      button.setAttribute('aria-pressed', String(answers[currentStep] === id));
      const icon = document.createElement('span');
      icon.className = 'option-circle';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = symbol;
      const text = document.createElement('span');
      text.textContent = label;
      button.append(icon, text);
      button.addEventListener('click', () => {
        answers[currentStep] = id;
        [...options.children].forEach(el => el.setAttribute('aria-pressed', String(el === button)));
        next.disabled = false;
      });
      options.appendChild(button);
    });
    content.append(heading, help, options);
    back.hidden = currentStep === 0;
    next.hidden = false;
    next.textContent = currentStep === 2 ? 'Show my coat clue →' : 'Continue →';
    next.disabled = !answers[currentStep];
    if (moveFocus) heading.focus({ preventScroll: true });
  }

  function recommend() {
    // Weights produce an illustrative label, never a statistical certainty or ancestry prediction.
    const scores = Object.fromEntries(Object.keys(PATTERNS).map(key => [key, 0]));
    const [main, white, detail] = answers;
    const families = {
      stripes: ['mackerel', 'classic', 'spotted', 'ticked'],
      spots: ['spotted'],
      patches: ['tortoiseshell', 'calico', 'bicolor'],
      points: ['colorpoint'],
      plain: ['solid', 'ticked'],
      white: ['bicolor', 'tuxedo', 'calico'],
      unsure: []
    };
    (families[main] || []).forEach(key => { scores[key] += 4; });
    if (white === 'none') { scores.tortoiseshell += 2; scores.solid += 1; }
    if (white === 'some') { scores.tuxedo += 2; scores.bicolor += 2; }
    if (white === 'lots') { scores.calico += 3; scores.bicolor += 3; }
    if (detail !== 'unsure' && Object.hasOwn(PATTERNS, detail)) scores[detail] += 12;
    if (detail === 'tortoiseshell' && white === 'lots') scores.calico += 15;
    if (detail === 'calico' && white === 'none') scores.tortoiseshell += 15;
    const ranked = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
    if (main === 'unsure' && detail === 'unsure') return { first: null, alternates: [] };
    return { first: ranked[0], alternates: ranked.slice(1, 3) };
  }

  function renderResult(moveFocus = false) {
    stepLabel.textContent = 'YOUR COAT CLUE';
    progress.style.width = '100%';
    back.hidden = false;
    next.hidden = false;
    next.disabled = false;
    next.textContent = 'Start again ↻';
    content.replaceChildren();
    const heading = document.createElement('h3');
    heading.className = 'quiz-prompt';
    heading.id = 'quizQuestionHeading';
    heading.tabIndex = -1;
    const { first, alternates } = recommend();
    if (!first) {
      heading.textContent = 'Your cat is a little mystery.';
      const note = document.createElement('p');
      note.className = 'quiz-help';
      note.textContent = 'No single coat label stands out from these answers. Try looking at the coat library above, ideally in natural daylight, or take the finder again.';
      const link = document.createElement('a');
      link.href = '#patterns';
      link.className = 'result-link';
      link.textContent = 'Compare all illustrated patterns →';
      content.append(heading, note, link);
    } else {
      heading.textContent = 'Your closest coat clue...';
      const item = PATTERNS[first];
      const result = document.createElement('div');
      result.className = 'quiz-result';
      const pic = document.createElement('div');
      pic.className = 'result-illustration';
      const img = document.createElement('img');
      img.src = `assets/cats/${first}.svg`;
      img.alt = `Illustration of ${item.name} markings`;
      img.width = 320;
      img.height = 260;
      pic.appendChild(img);
      const words = document.createElement('div');
      const eyebrow = document.createElement('span');
      eyebrow.className = 'result-eyebrow';
      eyebrow.textContent = 'POSSIBLE VISUAL MATCH';
      const title = document.createElement('h3');
      title.textContent = item.name;
      const explanation = document.createElement('p');
      explanation.textContent = item.text;
      const link = document.createElement('a');
      link.href = `#${first}`;
      link.className = 'result-link';
      link.textContent = 'See it in the coat library →';
      link.addEventListener('click', () => {
        search.value = '';
        filterButtons[0].click();
      });
      words.append(eyebrow, title, explanation, link);
      result.append(pic, words);
      content.append(heading, result);
      const lower = document.createElement('div');
      lower.className = 'alternatives';
      const caution = document.createElement('p');
      caution.textContent = 'This is a rule-based visual suggestion, not a breed or genetic result. Other combinations may fit.';
      const copy = document.createElement('button');
      copy.type = 'button';
      copy.className = 'copy-result';
      copy.textContent = 'Copy this coat clue ↗';
      copy.addEventListener('click', async () => {
        const text = `My cat's possible coat pattern: ${item.name}. ${item.text} — The Cat Coat Atlas`;
        let success = false;
        try {
          if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(text); success = true; }
        } catch (_) { /* use fallback */ }
        if (!success) {
          const area = document.createElement('textarea');
          area.value = text;
          area.style.position = 'fixed';
          area.style.opacity = '0';
          document.body.appendChild(area);
          area.select();
          try { success = document.execCommand('copy'); } catch (_) { success = false; }
          area.remove();
        }
        copy.textContent = success ? 'Copied ✓' : 'Select the result above to copy';
      });
      lower.append(caution, copy);
      content.append(lower);
    }
    if (moveFocus) heading.focus({ preventScroll: true });
  }

  next.addEventListener('click', () => {
    if (resultMode) {
      resultMode = false;
      answers = [null, null, null];
      currentStep = 0;
      renderQuiz(true);
      return;
    }
    if (!answers[currentStep]) return;
    if (currentStep < 2) {
      currentStep += 1;
      renderQuiz(true);
    } else {
      resultMode = true;
      renderResult(true);
    }
  });
  back.addEventListener('click', () => {
    if (resultMode) {
      resultMode = false;
      currentStep = 2;
    } else {
      currentStep = Math.max(0, currentStep - 1);
    }
    renderQuiz(true);
  });
  renderQuiz();
})();
