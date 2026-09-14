const menuButton=document.querySelector('.menu-button');
const nav=document.querySelector('.nav-links');
menuButton?.addEventListener('click',()=>{const open=nav?.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'✕':'☰';});
document.querySelectorAll('.nav-links a').forEach(link=>link.addEventListener('click',()=>{nav?.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');if(menuButton)menuButton.textContent='☰';}));
document.querySelectorAll('#year').forEach(el=>el.textContent=new Date().getFullYear());

const fieldValue=id=>document.getElementById(id)?.value.trim()||'Not provided';
document.getElementById('quoteForm')?.addEventListener('submit',event=>{
 event.preventDefault();
 const subject='Free Junk Removal Estimate Request';
 const body=`Hello Kingdom Lift,

I would like a free junk removal estimate.

Name: ${fieldValue('name')}
Phone: ${fieldValue('phone')}
City / neighborhood: ${fieldValue('location')}
Items to remove: ${fieldValue('items')}
Approximate amount: ${fieldValue('amount')}
Stairs: ${fieldValue('stairs')}

I can also text photos to 346-966-9267.

Thank you.`;
 window.location.href=`mailto:kingdomliftjunkremoval@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

/* Lead-capture assistant: runs entirely in the visitor's browser and stores nothing. */
(()=>{
 const shell=document.createElement('div');
 shell.className='leadbot';
 shell.innerHTML=`
  <button class="leadbot-launch" type="button" aria-label="Open free estimate chat" aria-expanded="false"><img src="assets/IMG_3627.PNG" alt=""></button>
  <section class="leadbot-panel" role="dialog" aria-label="Kingdom Lift estimate assistant" aria-hidden="true">
   <header><img src="assets/IMG_3627.PNG" alt=""><div><strong>Free Estimate Assistant</strong><small>Kingdom Lift • Takes about 1 minute</small></div><button class="leadbot-close" type="button" aria-label="Close assistant">×</button></header>
   <div class="leadbot-progress"><span></span></div>
   <div class="leadbot-messages" aria-live="polite"></div>
   <form class="leadbot-form"><label class="sr-only" for="leadbot-input">Your answer</label><textarea id="leadbot-input" rows="2" placeholder="Type your answer…" required></textarea><button type="submit">Send</button></form>
   <div class="leadbot-actions" hidden></div>
   <p class="leadbot-privacy">Your information is not stored on this website.</p>
  </section>`;
 document.body.appendChild(shell);

 const launch=shell.querySelector('.leadbot-launch');
 const panel=shell.querySelector('.leadbot-panel');
 const close=shell.querySelector('.leadbot-close');
 const form=shell.querySelector('.leadbot-form');
 const input=shell.querySelector('#leadbot-input');
 const messages=shell.querySelector('.leadbot-messages');
 const actions=shell.querySelector('.leadbot-actions');
 const progress=shell.querySelector('.leadbot-progress span');
 const answers={};
 const steps=[
  {key:'items',question:'Hi! I can help prepare your free estimate. What items or junk do you need removed?',placeholder:'Example: couch, mattress and garage boxes'},
  {key:'area',question:'What city or neighborhood is the pickup in?',placeholder:'Example: Kingwood, TX'},
  {key:'timing',question:'When would you like the job completed?',placeholder:'Example: this Saturday morning'},
  {key:'name',question:'What is your name?',placeholder:'Your name'},
  {key:'phone',question:'What phone number should Kingdom Lift use to contact you?',placeholder:'Example: 346-555-0123',type:'phone'}
 ];
 let step=0;
 const add=(text,who)=>{const bubble=document.createElement('div');bubble.className=`leadbot-message ${who}`;bubble.textContent=text;messages.appendChild(bubble);messages.scrollTop=messages.scrollHeight;};
 const ask=()=>{const item=steps[step];progress.style.width=`${(step/steps.length)*100}%`;input.placeholder=item.placeholder;input.value='';add(item.question,'bot');setTimeout(()=>input.focus(),50);};
 const summary=()=>`Free junk removal estimate request

Name: ${answers.name}
Phone: ${answers.phone}
Pickup area: ${answers.area}
Preferred timing: ${answers.timing}
Items to remove: ${answers.items}

I can send photos in a follow-up text.`;
 const finish=()=>{
  progress.style.width='100%';
  form.hidden=true;
  add(`Thanks, ${answers.name}! Your estimate request is ready. Choose how you want to send it to Kingdom Lift.`,'bot');
  const msg=summary();
  actions.hidden=false;
  actions.innerHTML=`<a href="sms:+13469669267?body=${encodeURIComponent(msg)}">Send by Text</a><a href="mailto:kingdomliftjunkremoval@gmail.com?subject=${encodeURIComponent('Free Junk Removal Estimate Request')}&body=${encodeURIComponent(msg)}">Send by Email</a><button type="button">Start Over</button>`;
  actions.querySelector('button').addEventListener('click',reset);
 };
 const reset=()=>{step=0;Object.keys(answers).forEach(k=>delete answers[k]);messages.innerHTML='';actions.hidden=true;actions.innerHTML='';form.hidden=false;ask();};
 const open=()=>{panel.classList.add('open');panel.setAttribute('aria-hidden','false');launch.setAttribute('aria-expanded','true');if(!messages.children.length)ask();else input.focus();};
 const shut=()=>{panel.classList.remove('open');panel.setAttribute('aria-hidden','true');launch.setAttribute('aria-expanded','false');launch.focus();};
 launch.addEventListener('click',()=>panel.classList.contains('open')?shut():open());
 close.addEventListener('click',shut);
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel.classList.contains('open'))shut();});
 form.addEventListener('submit',e=>{
  e.preventDefault();
  const value=input.value.trim();
  if(!value)return;
  if(steps[step].type==='phone'&&!/[0-9]{7,}/.test(value.replace(/\D/g,''))){add('Please enter a complete phone number so we can contact you.','bot');return;}
  answers[steps[step].key]=value;
  add(value,'user');
  step++;
  step<steps.length?ask():finish();
 });
})();