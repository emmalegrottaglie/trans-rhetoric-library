// Progressive enhancement for the rendered Markdown. Every page reads fine
// without this script; it adds the cards, the on-page list and the toggle.
(function () {
  var prose = document.querySelector('.prose');

  // Theme toggle ------------------------------------------------------------
  var toggle = document.getElementById('themeToggle');
  function syncToggleLabel() {
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  }
  syncToggleLabel();
  toggle.addEventListener('click', function () {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    syncToggleLabel();
  });

  if (!prose) return;

  // Entry cards: each h3 and the elements after it, up to the next heading,
  // become one card. Runs of cards are grouped so the timeline style can draw
  // its spine down a group.
  var headings = prose.querySelectorAll('h3');
  headings.forEach(function (h3) {
    var entry = document.createElement('section');
    entry.className = 'entry';
    h3.parentNode.insertBefore(entry, h3);
    var node = h3;
    while (node && !(node !== h3 && /^(H1|H2|H3|HR)$/.test(node.tagName))) {
      var next = node.nextElementSibling;
      entry.appendChild(node);
      node = next;
    }
    if (h3.id) {
      var anchor = document.createElement('a');
      anchor.className = 'anchor';
      anchor.href = '#' + h3.id;
      anchor.textContent = '#';
      anchor.setAttribute('aria-label', 'Link to this entry');
      h3.appendChild(anchor);
    }
  });
  Array.prototype.forEach.call(prose.querySelectorAll('.entry'), function (entry) {
    var prev = entry.previousElementSibling;
    if (prev && prev.classList.contains('entries')) {
      prev.appendChild(entry);
    } else {
      var group = document.createElement('div');
      group.className = 'entries';
      entry.parentNode.insertBefore(group, entry);
      group.appendChild(entry);
    }
  });

  // Count the entries under each h2, labelled so the number means something.
  prose.querySelectorAll('h2').forEach(function (h2) {
    var group = h2.nextElementSibling;
    while (group && !group.classList.contains('entries') && group.tagName !== 'H2') {
      group = group.nextElementSibling;
    }
    if (!group || !group.classList.contains('entries')) return;
    var n = group.children.length;
    if (n < 2) return;
    var count = document.createElement('span');
    count.className = 'count';
    count.textContent = n + ' entries';
    h2.appendChild(count);
  });

  // Tables sit in cards; status cells on the sources page become chips.
  prose.querySelectorAll('table').forEach(function (table) {
    var card = document.createElement('div');
    card.className = 'table-card';
    table.parentNode.insertBefore(card, table);
    card.appendChild(table);
  });
  var headers = prose.querySelectorAll('th');
  headers.forEach(function (th) {
    if (th.textContent.trim() !== 'Status') return;
    var col = th.cellIndex;
    th.closest('table').querySelectorAll('tbody tr').forEach(function (row) {
      var cell = row.cells[col];
      if (!cell) return;
      var text = cell.textContent.trim();
      var match = /^(checked|unverified|recheck)\b[:\s(]*(.*)$/i.exec(text);
      if (!match) return;
      var kind = match[1].toLowerCase();
      var note = match[2].replace(/\)$/, '').trim();
      cell.textContent = '';
      var chip = document.createElement('span');
      chip.className = 'status status-' + kind;
      chip.textContent = kind === 'recheck' ? 'Recheck' : (kind === 'checked' ? 'Checked' : 'Unverified');
      cell.appendChild(chip);
      if (note) {
        var small = document.createElement('span');
        small.className = 'status-note';
        small.textContent = note.charAt(0).toUpperCase() + note.slice(1);
        cell.appendChild(small);
      }
    });
  });

  // On-this-page list in the sidebar: h2s as groups, h3s as links.
  var toc = document.getElementById('toc');
  if (toc) {
    // Pages without entries list their h2s as plain links instead of groups.
    var hasEntries = !!prose.querySelector('h3[id]');
    prose.querySelectorAll('h2, h3').forEach(function (h) {
      if (!h.id) return;
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = Array.prototype.filter.call(h.childNodes, function (n) {
        return !(n.nodeType === 1 && (n.classList.contains('count') || n.classList.contains('anchor')));
      }).map(function (n) { return n.textContent; }).join('').trim();
      if (h.tagName === 'H2' && hasEntries) li.className = 'toc-group';
      li.appendChild(a);
      toc.appendChild(li);
    });

    // Highlight the heading currently in view.
    var links = toc.querySelectorAll('a');
    if ('IntersectionObserver' in window && links.length) {
      var byId = {};
      links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
      var observer = new IntersectionObserver(function (items) {
        items.forEach(function (item) {
          if (!item.isIntersecting) return;
          links.forEach(function (a) { a.classList.remove('is-active'); });
          var link = byId[item.target.id];
          if (link) link.classList.add('is-active');
        });
      }, { rootMargin: '0px 0px -70% 0px' });
      prose.querySelectorAll('h2[id], h3[id]').forEach(function (h) { observer.observe(h); });
    }
  }

  // Cards were built after load, so re-apply a #fragment from the address bar.
  if (location.hash) {
    var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) target.scrollIntoView();
  }
})();
