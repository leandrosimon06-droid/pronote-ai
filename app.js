const KEY='pronote-ai-tasks-v1';
let tasks=JSON.parse(localStorage.getItem(KEY)||'[]');
const $=s=>document.querySelector(s);
function save(){localStorage.setItem(KEY,JSON.stringify(tasks));render()}
function daysLeft(date){return Math.ceil((new Date(date+'T23:59:59')-new Date())/86400000)}
function render(){
 const filter=$('#filter').value;
 const visible=tasks.filter(t=>filter==='all'||t.type===filter).sort((a,b)=>a.date.localeCompare(b.date));
 $('#testsCount').textContent=tasks.filter(t=>t.type==='controle'&&!t.done).length;
 $('#tasksCount').textContent=tasks.filter(t=>t.type!=='controle'&&!t.done).length;
 $('#doneCount').textContent=tasks.filter(t=>t.done).length;
 $('#taskList').innerHTML=visible.length?visible.map(t=>{const d=daysLeft(t.date);const urgency=!t.done&&d<=2?' urgent':'';return `<article class="task"><div><div class="task-title ${urgency}">${escapeHtml(t.title)}</div><div class="meta">${escapeHtml(t.subject)} · ${new Date(t.date+'T12:00:00').toLocaleDateString('fr-FR')} · <span class="badge">${label(t.type)}</span></div>${t.description?`<div class="meta">${escapeHtml(t.description)}</div>`:''}</div><div class="actions"><button onclick="toggle('${t.id}')">${t.done?'↩️ Rouvrir':'✅ Terminé'}</button><button onclick="removeTask('${t.id}')">🗑️</button></div></article>`}).join(''):'<p class="meta">Aucune tâche. Ajoute ton premier devoir ou contrôle.</p>';
}
function label(t){return t==='controle'?'Contrôle':t==='cours'?'Cours':'Devoir'}
function escapeHtml(s){return s.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
window.toggle=id=>{const t=tasks.find(x=>x.id===id);if(t){t.done=!t.done;save()}}
window.removeTask=id=>{tasks=tasks.filter(x=>x.id!==id);save()}
$('#addBtn').onclick=()=>$('#modal').classList.remove('hidden');
$('#closeBtn').onclick=()=>$('#modal').classList.add('hidden');
$('#modal').onclick=e=>{if(e.target.id==='modal')$('#modal').classList.add('hidden')};
$('#filter').onchange=render;
$('#taskForm').onsubmit=e=>{e.preventDefault();tasks.push({id:crypto.randomUUID(),title:$('#title').value.trim(),subject:$('#subject').value.trim(),type:$('#type').value,date:$('#date').value,description:$('#description').value.trim(),done:false});save();e.target.reset();$('#modal').classList.add('hidden')};
render();