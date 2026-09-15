const KEY='pronote-ai-tasks-v1';
let tasks=JSON.parse(localStorage.getItem(KEY)||'[]');
const $=s=>document.querySelector(s);
function save(){localStorage.setItem(KEY,JSON.stringify(tasks));render()}
function daysLeft(date){return Math.ceil((new Date(date+'T23:59:59')-new Date())/86400000)}
function label(t){return t==='controle'?'Contrôle':t==='cours'?'Cours':'Devoir'}
function escapeHtml(s=''){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function render(){
 const filter=$('#filter').value;
 const visible=tasks.filter(t=>filter==='all'||t.type===filter).sort((a,b)=>a.date.localeCompare(b.date));
 $('#testsCount').textContent=tasks.filter(t=>t.type==='controle'&&!t.done).length;
 $('#tasksCount').textContent=tasks.filter(t=>t.type!=='controle'&&!t.done).length;
 $('#doneCount').textContent=tasks.filter(t=>t.done).length;
 $('#taskList').innerHTML=visible.length?visible.map(t=>{const d=daysLeft(t.date);const urgency=!t.done&&d<=2?' urgent':'';return `<article class="task"><div><div class="task-title ${urgency}">${escapeHtml(t.title)}</div><div class="meta">${escapeHtml(t.subject)} · ${new Date(t.date+'T12:00:00').toLocaleDateString('fr-FR')} · <span class="badge">${label(t.type)}</span></div>${t.description?`<div class="meta">${escapeHtml(t.description)}</div>`:''}</div><div class="actions"><button onclick="analyze('${t.id}')">🤖 Analyser</button><button onclick="toggle('${t.id}')">${t.done?'↩️ Rouvrir':'✅ Terminé'}</button><button onclick="removeTask('${t.id}')">🗑️</button></div></article>`}).join(''):'<p class="meta">Aucune tâche. Ajoute ton premier devoir ou contrôle.</p>';
}

const historyPack={
 match:['grande découverte','grandes découvertes','christophe colomb','colomb','vasco','magellan','exploration'],
 title:'Les Grandes Découvertes — fiche complète',
 intro:'À partir de la fin du XVe siècle, des navigateurs européens cherchent de nouvelles routes maritimes vers l’Asie. Ils veulent notamment accéder directement aux épices, à l’or et à d’autres richesses, mais aussi étendre la puissance de leurs royaumes et diffuser le christianisme. Les progrès de la navigation rendent ces voyages possibles. citeturn0search0turn0search3',
 keypoints:[
  ['🧭 Boussole','Instrument qui permet de s’orienter grâce au nord magnétique. Elle facilite la navigation même lorsque les marins ne voient plus la côte.'],
  ['⭐ Astrolabe','Instrument utilisé pour déterminer la position du navire, notamment sa latitude, à partir de la hauteur des astres.'],
  ['⛵ Caravelle','Navire à voiles maniable et adapté à la navigation en haute mer.'],
  ['🗺️ Portulan','Carte marine qui représente avec précision les côtes et les ports.'],
  ['👤 Christophe Colomb','Navigateur génois au service de l’Espagne. En 1492, il traverse l’Atlantique vers l’ouest pour chercher une route vers l’Asie. Il atteint les Caraïbes sans comprendre qu’il est arrivé sur un continent inconnu des Européens.'],
  ['🇵🇹 Vasco de Gama','Navigateur portugais. En 1498, il atteint Calicut, en Inde, en contournant l’Afrique par le cap de Bonne-Espérance. Il ouvre une route maritime directe entre l’Europe et l’Inde.'],
  ['🌍 Magellan / Elcano','L’expédition partie en 1519 réalise le premier tour du monde. Magellan meurt en 1521 aux Philippines ; son lieutenant Elcano termine le voyage en 1522.'],
  ['📜 Traité de Tordesillas','En 1494, l’Espagne et le Portugal se mettent d’accord pour partager leurs zones d’expansion.'],
  ['🌎 Colonisation','Les voyages débouchent sur la conquête et la colonisation de territoires. Les populations amérindiennes subissent notamment des violences, l’exploitation et des épidémies.'],
  ['💰 Commerce','Les Européens cherchent des routes plus directes vers les richesses asiatiques. Les épices sont particulièrement importantes.']
 ],
 dates:[['1453','Prise de Constantinople : les Européens cherchent davantage de nouvelles routes vers l’Asie.'],['1488','Bartolomeu Dias franchit le cap de Bonne-Espérance.'],['1492','Christophe Colomb atteint les Caraïbes.'],['1494','Traité de Tordesillas entre Espagne et Portugal.'],['1498','Vasco de Gama atteint Calicut, en Inde.'],['1519–1522','Expédition de Magellan-Elcano : premier tour du monde.']],
 questions:[
  ['Pourquoi les Européens cherchent-ils de nouvelles routes maritimes ?','Pour atteindre plus directement les richesses de l’Asie, notamment les épices, et pour des raisons politiques et religieuses.'],
  ['Quels progrès permettent les grandes expéditions ?','La boussole, l’astrolabe, les portulans et la caravelle améliorent l’orientation, les cartes et la navigation en haute mer.'],
  ['Que fait Christophe Colomb en 1492 ?','Il traverse l’Atlantique vers l’ouest pour atteindre l’Asie mais arrive dans les Caraïbes, sur un territoire inconnu des Européens de l’époque.'],
  ['Que fait Vasco de Gama ?','Il atteint l’Inde en 1498 en contournant l’Afrique, ouvrant une route maritime vers les Indes.'],
  ['Qui réalise le premier tour du monde ?','L’expédition de Magellan, achevée par Juan Sebastián Elcano en 1522.'],
  ['Pourquoi 1494 est-elle une date importante ?','C’est la signature du traité de Tordesillas entre l’Espagne et le Portugal.'],
  ['Quelles sont les conséquences des grandes découvertes ?','Elles transforment les échanges et la connaissance du monde, mais entraînent aussi conquêtes, colonisation, exploitation et fortes violences contre les populations autochtones.']
 ],
 quiz:[['Quel navigateur atteint l’Inde en 1498 ?',['Christophe Colomb','Vasco de Gama','Magellan'],'Vasco de Gama'],['Quel instrument indique le nord ?',['Astrolabe','Boussole','Portulan'],'Boussole'],['En quelle année Colomb traverse-t-il l’Atlantique ?',['1453','1492','1519'],'1492'],['Quel accord partage les zones d’expansion espagnole et portugaise ?',['Traité de Verdun','Traité de Tordesillas','Traité de Paris'],'Traité de Tordesillas'],['Qui termine le premier tour du monde après la mort de Magellan ?',['Elcano','Colomb','Dias'],'Elcano']]
};
function isHistory(t){const s=(t.title+' '+t.subject+' '+t.description).toLowerCase();return historyPack.match.some(k=>s.includes(k))}
function genericAnalysis(t){return `<h3>Analyse de « ${escapeHtml(t.title)} »</h3><p><b>Matière :</b> ${escapeHtml(t.subject)} · <b>Type :</b> ${label(t.type)}</p><div class="ai-warning">Pour une vraie analyse de cours, colle dans la description le texte du cours, la consigne ou une photo retranscrite. L’assistant pourra alors travailler sur le contenu réel plutôt que d’inventer.</div><h3>🎯 Ce que je dois savoir</h3><p>${escapeHtml(t.description||t.title)}</p><h3>🧠 Questions</h3><ol><li>Quelle est l’idée principale du cours ?</li><li>Quelles définitions dois-je connaître ?</li><li>Quelles dates, personnes ou formules sont importantes ?</li><li>Quel exemple permet de comprendre la notion ?</li></ol>`}
function historyAnalysis(t){return `<div class="study-hero"><div class="study-icon">🧭</div><div><h2>${historyPack.title}</h2><p>${historyPack.intro}</p></div></div><h3>📌 Les notions à connaître</h3><div class="knowledge-grid">${historyPack.keypoints.map(x=>`<div class="knowledge"><h4>${x[0]}</h4><p>${x[1]}</p></div>`).join('')}</div><h3>📅 Chronologie à mémoriser</h3><div class="timeline">${historyPack.dates.map(x=>`<div><b>${x[0]}</b><span>${x[1]}</span></div>`).join('')}</div><h3>🧠 Questions probables au contrôle</h3><div class="questions">${historyPack.questions.map((x,i)=>`<details><summary>${i+1}. ${x[0]}</summary><p>${x[1]}</p></details>`).join('')}</div><h3>🎯 Mini-quiz</h3><div id="quiz">${historyPack.quiz.map((q,i)=>`<div class="quiz-q"><b>${i+1}. ${q[0]}</b>${q[1].map(a=>`<button onclick="answerQuiz(${i},'${escapeHtml(a)}',this)">${a}</button>`).join('')}<p id="quiz-${i}" class="quiz-result"></p></div>`).join('')}</div><div class="ai-note"><b>Important :</b> le commerce triangulaire est un phénomène lié à la traite atlantique et à la colonisation, surtout développé aux XVIIe–XVIIIe siècles. Il ne faut pas le confondre avec les premières expéditions de Colomb ou Vasco de Gama. Pour ton contrôle, on l’ajoutera seulement si ton cours le demande.</div>`}
window.answerQuiz=(i,answer,btn)=>{const correct=historyPack.quiz[i][2];const out=$('#quiz-'+i);out.textContent=answer===correct?'✅ Correct !':'❌ Pas tout à fait. La bonne réponse est : '+correct;document.querySelectorAll('#quiz-'+i+'~button').forEach(()=>{});btn.parentElement.querySelectorAll('button').forEach(b=>b.disabled=true)};
window.analyze=id=>{const t=tasks.find(x=>x.id===id);if(!t)return;$('#assistantContent').innerHTML=isHistory(t)?historyAnalysis(t):genericAnalysis(t);$('#assistant').classList.remove('hidden');$('#assistant').scrollIntoView({behavior:'smooth',block:'start'})}
window.toggle=id=>{const t=tasks.find(x=>x.id===id);if(t){t.done=!t.done;save()}}
window.removeTask=id=>{tasks=tasks.filter(x=>x.id!==id);save()}
$('#addBtn').onclick=()=>$('#modal').classList.remove('hidden');
$('#closeBtn').onclick=()=>$('#modal').classList.add('hidden');
$('#closeAssistant').onclick=()=>$('#assistant').classList.add('hidden');
$('#modal').onclick=e=>{if(e.target.id==='modal')$('#modal').classList.add('hidden')};
$('#filter').onchange=render;
$('#taskForm').onsubmit=e=>{e.preventDefault();tasks.push({id:crypto.randomUUID(),title:$('#title').value.trim(),subject:$('#subject').value.trim(),type:$('#type').value,date:$('#date').value,description:$('#description').value.trim(),done:false});save();e.target.reset();$('#modal').classList.add('hidden')};
render();