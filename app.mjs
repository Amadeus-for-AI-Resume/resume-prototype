import {resumeText,buildPrompt,escapeHTML} from './core.mjs';
const form=document.querySelector('#resume-form');
const preview=document.querySelector('#preview');
const brief=document.querySelector('#brief');
const status=document.querySelector('#status');
const data=()=>Object.fromEntries(new FormData(form));
function render(){
 const d=data();
 const sections=[['PROFILE',d.summary],['EXPERIENCE',d.experience],['EDUCATION',d.education],['SKILLS',d.skills]].filter(([,text])=>text.trim());
 preview.innerHTML=`<h2>${escapeHTML(d.name || 'Your name')}</h2><p class="role">${escapeHTML(d.role)}</p><p class="contact">${escapeHTML([d.email,d.location,d.link].filter(Boolean).join(' · '))}</p>`+sections.map(([title,text])=>`<h3>${title}</h3><p>${escapeHTML(text)}</p>`).join('');
 if(!sections.length) preview.innerHTML+='<p class="fine">Add your details to see your resume here. This hint is not included in the text export.</p>';
 if(!document.querySelector('#brief-section').hidden) brief.value=buildPrompt(d,d.job);
}
form.addEventListener('input',render);
form.addEventListener('submit',event=>event.preventDefault());
document.querySelector('#sample').addEventListener('click',()=>{
 if(Object.values(data()).some(value=>value.trim()) && !confirm('Replace the current entries with fictional sample data?'))return;
 const sample={name:'Alex Rivera',role:'Junior Data Analyst',email:'alex@example.com',location:'Portland, OR',link:'',summary:'Recent graduate with project experience in data cleaning, SQL, and communicating findings clearly.',experience:'University dashboard project | 2025\nCleaned a public dataset and built a dashboard.\nPresented the findings to classmates.',education:'Example University | BSc in Information Systems | 2025',skills:'SQL · Excel · Python · Data visualization',job:'Junior data analyst role requiring SQL, spreadsheets, data cleaning, and clear communication.'};
 for(const [key,value] of Object.entries(sample))form.elements.namedItem(key).value=value;
 render();status.textContent='Fictional sample loaded. Replace it with your own verified details.';
});
document.querySelector('#clear').addEventListener('click',()=>{if(!Object.values(data()).some(value=>value.trim()) || confirm('Clear all entries? Export first if you want to keep them.')){form.reset();render();document.querySelector('#brief-section').hidden=true;brief.value='';status.textContent='Entries cleared.';}});
document.querySelector('#print').addEventListener('click',()=>{if(!data().name.trim()){status.textContent='Add your name before printing.';return;}window.print();});
document.querySelector('#download').addEventListener('click',()=>{
 const text=resumeText(data());if(!text){status.textContent='Add resume details before downloading.';return;}
 const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='amadeus-resume.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='Resume text exported.';
});
document.querySelector('#prepare').addEventListener('click',()=>{if(!resumeText(data())){status.textContent='Add resume details before preparing a brief.';return;}const section=document.querySelector('#brief-section');section.hidden=false;brief.value=buildPrompt(data(),data().job);section.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});status.textContent='Prompt prepared locally. No AI request was made.';});
document.querySelector('#copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(brief.value);document.querySelector('#copy-status').textContent='Copied. Nothing has been sent to another service.';}catch{brief.focus();brief.select();document.querySelector('#copy-status').textContent='Clipboard access unavailable. The prompt is selected; copy it manually.';}});
render();
