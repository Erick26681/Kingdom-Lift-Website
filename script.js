const menuButton=document.querySelector('.menu-button');
const nav=document.querySelector('.nav-links');
menuButton?.addEventListener('click',()=>{const open=nav?.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'✕':'☰';});
document.querySelectorAll('.nav-links a').forEach(link=>link.addEventListener('click',()=>{nav?.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');if(menuButton)menuButton.textContent='☰';}));
document.querySelectorAll('#year').forEach(el=>el.textContent=new Date().getFullYear());
document.getElementById('quoteForm')?.addEventListener('submit',event=>{
 event.preventDefault();
 const value=id=>document.getElementById(id)?.value.trim()||'Not provided';
 const subject='Free Junk Removal Estimate Request';
 const body=`Hello Kingdom Lift,

I would like a free junk removal estimate.

Name: ${value('name')}
Phone: ${value('phone')}
City / neighborhood: ${value('location')}
Items to remove: ${value('items')}
Approximate amount: ${value('amount')}
Stairs: ${value('stairs')}

I can also text photos to 346-966-9267.

Thank you.`;
 window.location.href=`mailto:kingdomliftjunkremoval@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});