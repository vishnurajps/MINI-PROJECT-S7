/**
 * Agricultural Advisory Expert Panel Controller (advisory.js)
 */

let activeQueryIdToReply = null;

document.addEventListener('DOMContentLoaded', async () => {
  if (!Auth.requireRole('ADVISORY')) return;

  const advisor = Auth.getUser();
  document.getElementById('advisor-name-display').textContent = advisor.fullName;
  document.getElementById('advisor-specialization-display').textContent = advisor.specialization || "Agronomist";

  setupAdvisoryTabs();
  loadWeatherWidget('advisory-weather-widget', advisor.district);

  await loadAdvisoryQueries();

  // Reply form listener
  const replyForm = document.getElementById('advisory-reply-form');
  if (replyForm) {
    replyForm.addEventListener('submit', handleReplySubmission);
  }
});

function setupAdvisoryTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      const targetContent = document.getElementById(targetId);
      if (targetContent) targetContent.classList.add('active');
    });
  });
}

async function loadAdvisoryQueries() {
  try {
    const res = await fetch(`${API_BASE}/advisory/queries`);
    const queries = await res.json();

    const openQueries = queries.filter(q => q.status === 'OPEN');
    const answeredQueries = queries.filter(q => q.status === 'ANSWERED');

    document.getElementById('open-queries-count').textContent = openQueries.length;
    document.getElementById('answered-queries-count').textContent = answeredQueries.length;

    renderOpenQueries(openQueries);
    renderAnsweredQueries(answeredQueries);
  } catch (err) {
    console.error("Error loading queries:", err);
  }
}

function renderOpenQueries(queries) {
  const container = document.getElementById('open-queries-container');
  if (!container) return;

  if (!queries || queries.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:3rem; background:white; border-radius:12px; border:1px dashed #cbd5e1;">
        <p style="color:#64748b;">No pending questions from farmers or buyers. Great job!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = queries.map(q => `
    <div style="background:white; border:1px solid #e2e8f0; border-radius:12px; padding:1.5rem; margin-bottom:1.25rem; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
        <div>
          <h4 style="font-size:1.15rem; color:#1e293b; margin-bottom:0.25rem;">${q.subject}</h4>
          <span style="font-size:0.825rem; color:#64748b;">
            Asked by <strong>${q.userName}</strong> (${q.userRole}) • 📍 ${q.district} • Crop: <strong>${q.cropType || 'General'}</strong>
          </span>
        </div>
        <span class="badge badge-placed">Awaiting Reply</span>
      </div>

      <p style="color:#334155; font-size:0.95rem; line-height:1.5; margin-bottom:1.25rem; background:#f8fafc; padding:1rem; border-radius:8px;">
        "${q.question}"
      </p>

      <div style="display:flex; justify-content:flex-end;">
        <button onclick="openReplyModal(${q.id}, '${q.subject.replace(/'/g, "\\'")}', '${q.userName.replace(/'/g, "\\'")}')" class="btn btn-primary btn-sm">
          ✍️ Write Agricultural Solution
        </button>
      </div>
    </div>
  `).join('');
}

function renderAnsweredQueries(queries) {
  const container = document.getElementById('answered-queries-container');
  if (!container) return;

  if (!queries || queries.length === 0) {
    container.innerHTML = `<p style="text-align:center; padding:2rem; color:#94a3b8;">No resolved queries yet.</p>`;
    return;
  }

  container.innerHTML = queries.map(q => `
    <div style="background:white; border:1px solid #e2e8f0; border-radius:12px; padding:1.5rem; margin-bottom:1.25rem;">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
        <div>
          <h4 style="font-size:1.1rem; color:#1e293b;">${q.subject}</h4>
          <span style="font-size:0.8rem; color:#64748b;">By ${q.userName} (${q.userRole}) • 📍 ${q.district}</span>
        </div>
        <span class="badge badge-delivered">Answered</span>
      </div>

      <p style="color:#475569; font-size:0.9rem; margin-bottom:1rem; font-style:italic;">
        Q: "${q.question}"
      </p>

      <div style="background:#f0fdf4; border-left:4px solid #16a34a; padding:1rem; border-radius:6px; font-size:0.9rem;">
        <strong style="color:#166534;">🌿 Guidance provided by ${q.repliedByName}:</strong>
        <p style="color:#1e293b; margin-top:0.4rem; white-space:pre-wrap;">${q.reply}</p>
        <span style="font-size:0.75rem; color:#65a30d; margin-top:0.5rem; display:block;">Answered on ${formatDate(q.repliedAt)}</span>
      </div>
    </div>
  `).join('');
}

window.openReplyModal = function(queryId, subject, askerName) {
  activeQueryIdToReply = queryId;
  document.getElementById('reply-query-subject').textContent = subject;
  document.getElementById('reply-query-asker').textContent = askerName;
  document.getElementById('reply-text-input').value = "";
  openModal('reply-modal');
};

async function handleReplySubmission(e) {
  e.preventDefault();
  const replyText = document.getElementById('reply-text-input').value.trim();
  const advisor = Auth.getUser();

  if (!replyText) {
    showToast("Please write a helpful recommendation", "error");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/advisory/${activeQueryIdToReply}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        advisorId: advisor.id,
        replyText: replyText
      })
    });

    if (res.ok) {
      closeModal('reply-modal');
      showToast("Expert solution sent to user!", "success");
      await loadAdvisoryQueries();
    } else {
      showToast("Failed to submit reply", "error");
    }
  } catch (err) {
    console.error(err);
    showToast("Server error posting reply", "error");
  }
}

function openModal(id) {
  document.getElementById(id).classList.add('active');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}
