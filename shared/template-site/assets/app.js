async function loadBriefing() {
  const resolvedData = window.__BRIEFING_DATA__ || await loadJson();

  renderShell(resolvedData);
  renderMeetings(resolvedData.meetings || []);
  wireModal(resolvedData.about || {});
}

async function loadJson() {
  const res = await fetch('./data/briefing.json');
  return res.json();
}

function renderShell(data) {
  document.getElementById('title').textContent = data.title || 'daily brief';
  document.getElementById('issueNumber').textContent = data.issue || defaultIssue(data.generatedAt);
  document.getElementById('issueDate').textContent = data.date || defaultDateLabel(data.generatedAt);
  document.getElementById('generatedAt').textContent = data.generatedAt ? `Generated ${data.generatedAt}` : '';
  document.getElementById('intro').textContent = data.intro || 'A concise briefing for the meetings ahead.';

  const tocList = document.getElementById('tocList');
  tocList.innerHTML = '';

  if (!data.meetings || data.meetings.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = 'No meetings in today\'s brief.';
    tocList.appendChild(empty);
    return;
  }

  for (const meeting of data.meetings) {
    const link = document.createElement('a');
    link.className = 'toc-item';
    link.href = `#${meeting.id}`;
    link.appendChild(textBlock('h3', 'toc-title', joinTitle(meeting.headline, meeting.topic)));

    const meta = document.createElement('p');
    meta.className = 'toc-meta';
    meta.textContent = compactMeta([
      meeting.person?.name,
      meeting.person?.company,
      meeting.time,
    ]);
    link.appendChild(meta);
    tocList.appendChild(link);
  }
}

function renderMeetings(meetings) {
  const container = document.getElementById('articles');
  container.innerHTML = '';

  if (!meetings.length) {
    const empty = document.createElement('article');
    empty.className = 'article-card';
    empty.appendChild(textBlock('p', 'empty-state', 'No meetings in today\'s brief.'));
    container.appendChild(empty);
    return;
  }

  for (const meeting of meetings) {
    const article = document.createElement('article');
    article.className = 'article-card';
    article.id = meeting.id;

    const header = document.createElement('header');
    header.className = 'article-header';

    header.appendChild(metaRow(meeting));
    header.appendChild(textBlock('h2', 'article-title', joinTitle(meeting.headline, meeting.topic)));
    header.appendChild(textBlock('p', 'person-name', meeting.person?.name || 'Unknown attendee'));

    const roleLine = compactMeta([
      meeting.person?.role,
      meeting.person?.company,
    ], ' @ ');
    header.appendChild(textBlock('p', 'person-role', roleLine || '')); 
    article.appendChild(header);

    const body = document.createElement('div');
    body.className = 'article-body';
    body.appendChild(contextBlock(meeting.context));

    if (meeting.person?.bio) {
      body.appendChild(textBlock('p', 'person-bio', meeting.person.bio));
    }

    body.appendChild(notesBlock('Preparation & Research', meeting.prepNotes || []));

    if (meeting.links && meeting.links.length) {
      body.appendChild(linkSection(meeting.links));
    }

    article.appendChild(body);
    container.appendChild(article);
  }
}

function metaRow(meeting) {
  const row = document.createElement('div');
  row.className = 'article-meta';

  const values = [meeting.time || 'Time TBD', meeting.duration || 'Duration TBD'];
  values.forEach((value, index) => {
    const span = document.createElement('span');
    span.textContent = value;
    row.appendChild(span);

    if (index < values.length - 1) {
      const divider = document.createElement('span');
      divider.className = 'meta-divider';
      row.appendChild(divider);
    }
  });

  return row;
}

function contextBlock(text) {
  const paragraph = document.createElement('p');
  paragraph.className = 'context-copy';

  const content = text || 'No additional context was provided for this meeting.';
  const lead = document.createElement('span');
  lead.className = 'drop-cap';
  lead.textContent = content.charAt(0).toUpperCase();
  paragraph.appendChild(lead);
  paragraph.append(content.slice(1));
  return paragraph;
}

function notesBlock(title, notes) {
  const section = document.createElement('section');
  section.className = 'notes-panel';
  section.appendChild(textBlock('h3', 'notes-title', title));

  if (!notes.length) {
    section.appendChild(textBlock('p', 'empty-state', 'No preparation notes yet.'));
    return section;
  }

  const list = document.createElement('ul');
  list.className = 'notes-list';
  for (const note of notes) {
    const item = document.createElement('li');
    item.className = 'notes-item';
    item.appendChild(textBlock('span', 'notes-mark', '—'));
    item.appendChild(textBlock('span', 'notes-copy', note));
    list.appendChild(item);
  }

  section.appendChild(list);
  return section;
}

function linkSection(links) {
  const section = document.createElement('section');
  section.className = 'links-panel';
  section.appendChild(textBlock('h3', 'links-title', 'Source Links'));

  const list = document.createElement('ul');
  list.className = 'link-list';
  for (const link of links) {
    const item = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.href = link.url;
    anchor.target = '_blank';
    anchor.rel = 'noreferrer';
    anchor.textContent = link.label || link.url;
    item.appendChild(anchor);
    list.appendChild(item);
  }

  section.appendChild(list);
  return section;
}

function wireModal(about) {
  const modal = document.getElementById('aboutModal');
  const title = document.getElementById('aboutTitle');
  const body = document.getElementById('aboutBody');
  const credit = document.getElementById('aboutCredit');
  const openers = [document.getElementById('aboutButton'), document.getElementById('aboutBadge')];
  const closers = [document.getElementById('closeModal'), document.getElementById('modalBackdrop')];

  title.textContent = about.title || 'A daily briefing for the meetings ahead.';
  body.textContent = about.body || 'Synthesized from your calendar, your meeting memory, and the context you need before you walk into the room.';
  credit.innerHTML = '';

  if (about.credit) {
    if (about.credit.url) {
      const anchor = document.createElement('a');
      anchor.href = about.credit.url;
      anchor.target = '_blank';
      anchor.rel = 'noreferrer';
      anchor.textContent = about.credit.label || about.credit.url;
      credit.appendChild(anchor);
    } else {
      credit.textContent = about.credit.label || '';
    }
  }

  openers.forEach((element) => {
    if (element) {
      element.addEventListener('click', () => toggleModal(modal, true));
    }
  });
  closers.forEach((element) => {
    if (element) {
      element.addEventListener('click', () => toggleModal(modal, false));
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      toggleModal(modal, false);
    }
  });
}

function toggleModal(modal, isOpen) {
  modal.classList.toggle('hidden', !isOpen);
  document.body.classList.toggle('modal-open', isOpen);
}

function textBlock(tag, className, text) {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = text;
  return element;
}

function joinTitle(headline, topic) {
  if (headline && topic) {
    return `${headline} | ${topic}`;
  }
  return headline || topic || 'Untitled meeting';
}

function compactMeta(values, joiner = ' • ') {
  return values.filter(Boolean).join(joiner);
}

function defaultDateLabel(value) {
  const date = value ? new Date(value) : new Date();
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).toUpperCase();
}

function defaultIssue(value) {
  const date = value ? new Date(value) : new Date();
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const issue = Math.floor((date.getTime() - startOfYear.getTime()) / 86400000);
  return `Issue ${issue}`;
}

loadBriefing().catch((error) => {
  const container = document.getElementById('articles');
  container.innerHTML = '';
  container.appendChild(textBlock('p', 'empty-state', `Failed to load briefing data: ${error.message}`));
});
