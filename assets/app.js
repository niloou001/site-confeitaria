const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); nav.classList.toggle('open', open); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Abrir menu'); }));
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('[data-filter]').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); }); document.querySelectorAll('[data-category]').forEach(card => { card.hidden = button.dataset.filter !== 'todos' && card.dataset.category !== button.dataset.filter; }); }));
document.querySelectorAll('[data-product]').forEach(a => a.addEventListener('click', () => { document.querySelector('#product').value = a.dataset.product; }));
const date = document.querySelector('#date');
const today = new Date();
date.min = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
document.querySelector('#year').textContent = today.getFullYear();
const form = document.querySelector('#order-form');
const status = document.querySelector('#form-status');
form.addEventListener('submit', async event => {
 event.preventDefault();
 const button = form.querySelector('[type="submit"]');
 button.disabled = true;
 status.textContent = 'Preparando sua mensagem…';
 document.querySelector('#order-result').hidden = true;
 try {
  const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Não foi possível preparar sua mensagem.');
  document.querySelector('#message').value = data.message;
  document.querySelector('#order-result').hidden = false;
  status.textContent = 'Pronto! Copie a mensagem e envie no Instagram. Nada foi enviado automaticamente.';
 } catch (error) { status.textContent = error instanceof SyntaxError || error instanceof TypeError ? 'Não foi possível acessar o serviço. Tente novamente ou fale diretamente pelo Instagram @_la_chocolat.' : error.message; }
 finally { button.disabled = false; }
});
document.querySelector('#copy-message').addEventListener('click', async () => {
 const message = document.querySelector('#message');
 try { await navigator.clipboard.writeText(message.value); status.textContent = 'Mensagem copiada! Agora é só enviar pelo Instagram.'; }
 catch { message.focus(); message.select(); status.textContent = 'Selecione e copie o texto acima para enviar no Instagram.'; }
});
