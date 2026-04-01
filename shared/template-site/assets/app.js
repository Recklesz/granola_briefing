async function loadBriefing() {
  let data;
  if (window.__BRIEFING_DATA__) {
    data = window.__BRIEFING_DATA__;
  } else {
    const res = await fetch('./data/briefing.json');
    data = await res.json();
  }

  document.getElementById('title').textContent = data.title;
  document.getElementById('subtitle').textContent = data.subtitle || '';
  document.getElementById('generatedAt').textContent = data.generatedAt || '—';
  document.getElementById('meetingCount').textContent = String((data.meetings || []).length);
  document.getElementById('summaryText').textContent = data.summary || '';

  const container = document.getElementById('meetings');
  container.innerHTML = '';

  if (!data.meetings || data.meetings.length === 0) {
    const p = document.createElement('p');
    p.className = 'empty';
    p.textContent = 'No meetings in today’s briefing.';
    container.appendChild(p);
    return;
  }

  for (const meeting of data.meetings) {
    const card = document.createElement('article');
    card.className = 'meeting-card';

    const top = document.createElement('div');
    top.className = 'meeting-top';
    top.innerHTML = `
      <div>
        <h3>${escapeHtml(meeting.title || 'Untitled meeting')}</h3>
        <div class="meta">${escapeHtml(meeting.time || 'Time TBD')} · ${escapeHtml((meeting.attendees || []).join(', ') || 'Unknown attendees')}</div>
      </div>
      <div class="meta">Last spoke: ${escapeHtml(meeting.lastSpoke || 'Unknown')}</div>
    `;
    card.appendChild(top);

    const opener = document.createElement('p');
    opener.innerHTML = `<strong>Suggested opener:</strong> ${escapeHtml(meeting.suggestedOpener || '—')}`;
    card.appendChild(opener);

    const grid = document.createElement('div');
    grid.className = 'grid';
    grid.appendChild(makeBlock('Open loops', meeting.openLoops));
    grid.appendChild(makeBlock('Talking points', meeting.talkingPoints));
    grid.appendChild(makeBlock('Recent updates', meeting.recentUpdates));
    grid.appendChild(makeLinkBlock('Source links', meeting.links));
    card.appendChild(grid);

    container.appendChild(card);
  }
}

function makeBlock(title, items) {
  const block = document.createElement('section');
  block.className = 'block';
  const heading = document.createElement('h4');
  heading.textContent = title;
  block.appendChild(heading);

  if (!items || items.length === 0) {
    const p = document.createElement('p');
    p.className = 'empty';
    p.textContent = 'None';
    block.appendChild(p);
    return block;
  }

  const ul = document.createElement('ul');
  for (const item of items) {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  }
  block.appendChild(ul);
  return block;
}

function makeLinkBlock(title, links) {
  const block = document.createElement('section');
  block.className = 'block';
  const heading = document.createElement('h4');
  heading.textContent = title;
  block.appendChild(heading);

  if (!links || links.length === 0) {
    const p = document.createElement('p');
    p.className = 'empty';
    p.textContent = 'None';
    block.appendChild(p);
    return block;
  }

  const ul = document.createElement('ul');
  for (const item of links) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = item.url;
    a.textContent = item.label || item.url;
    a.target = '_blank';
    a.rel = 'noreferrer';
    li.appendChild(a);
    ul.appendChild(li);
  }
  block.appendChild(ul);
  return block;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

loadBriefing().catch((error) => {
  const container = document.getElementById('meetings');
  container.innerHTML = `<p class="empty">Failed to load briefing data: ${escapeHtml(error.message)}</p>`;
});
