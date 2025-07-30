let weekOffset=0, currentUser=null, events={};
let users = JSON.parse(localStorage.getItem('users')||'[{"name":"admin","password":"ggmecanique3434"}]');
localStorage.setItem('users', JSON.stringify(users));
events = JSON.parse(localStorage.getItem('events')||'{}');

function getWeekDates(){
  const now=new Date(), m=new Date(now.setDate(now.getDate()-now.getDay()+1+weekOffset*7));
  return Array.from({length:7},(_,i)=>new Date(m.getTime()+i*86400000));
}
function getKey(d,h){return d.toISOString().split('T')[0]+'-'+h;}
function renderCalendar(){
  if(!currentUser) return;
  const grid=document.getElementById('calendarGrid'); grid.innerHTML='';
  const dates=getWeekDates();
  document.getElementById('weekLabel').innerText='Semaine du '+dates[0].toLocaleDateString();
  grid.appendChild(document.createElement('div'));
  dates.forEach(d=>{
    const h=document.createElement('div');h.className='header-cell';
    h.innerText=d.toLocaleDateString('fr-FR',{weekday:'long',day:'2-digit',month:'2-digit'});
    grid.appendChild(h);
  });
  for(let hour=0;hour<24;hour++){
    const hc=document.createElement('div');hc.className='hour-cell';hc.innerText=hour+'h';grid.appendChild(hc);
    dates.forEach(d=>{
      const cell=document.createElement('div');
      cell.onclick=()=>{};
      (events[getKey(d,hour)]||[]).forEach(evt=>{
        const e=document.createElement('div');e.className='event';
        e.innerText='['+evt.type+'] '+evt.clientName;cell.appendChild(e);
      });
      grid.appendChild(cell);
    });
  }
}
function login(){
  const u=document.getElementById('username').value, p=document.getElementById('password').value;
  const user=users.find(x=>x.name===u&&x.password===p);
  if(!user){alert('Identifiants invalides');return;}
  currentUser=user;
  document.getElementById('login').style.display='none';
  document.getElementById('calendar').style.display='block';
  renderCalendar();
}
function logout(){
  document.getElementById('calendar').style.display='none';
  document.getElementById('login').style.display='block';
}
document.getElementById('loginBtn').onclick=login;
document.getElementById('logoutBtn').onclick=logout;
