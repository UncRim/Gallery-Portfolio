/* Contact form -> email. Posts to FormSubmit's AJAX endpoint, which forwards the
   message to the address in the form's data-to attribute. If the request fails
   (offline, blocked, not yet activated) the visitor gets a mailto link instead. */
const form = document.querySelector<HTMLFormElement>('#issue');

if (form) {
  const to = form.dataset.to ?? '';
  const note = document.querySelector<HTMLElement>('#formNote')!;
  const send = form.querySelector<HTMLButtonElement>('#send')!;
  type Field = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
  const field = (id: string) => form.querySelector<Field>('#' + id)!;
  const nameEl = field('name'), emailEl = field('email'), kindEl = field('kind'), msgEl = field('msg');
  const honey = form.querySelector<HTMLInputElement>('.hp')!;

  const say = (text: string, kind: 'ok' | 'err' | 'busy' | '' = '') => {
    note.replaceChildren(document.createTextNode(text));
    note.dataset.kind = kind;
  };
  const flag = (el: Field, bad: boolean) => {
    if (bad) { el.setAttribute('aria-invalid', 'true'); el.setAttribute('aria-describedby', 'formNote'); }
    else { el.removeAttribute('aria-invalid'); if (el.getAttribute('aria-describedby') === 'formNote') el.removeAttribute('aria-describedby'); }
  };

  [nameEl, emailEl, msgEl].forEach((el) => el.addEventListener('input', () => { flag(el, false); if (note.dataset.kind === 'err') say(''); }));

  const mailtoHref = () => {
    const subject = `${kindEl.value} enquiry from ${nameEl.value.trim() || 'your portfolio'}`;
    const body = `${msgEl.value.trim()}\n\n${nameEl.value.trim()}${emailEl.value.trim() ? ' <' + emailEl.value.trim() + '>' : ''}`;
    return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const name = nameEl.value.trim(), email = emailEl.value.trim(), message = msgEl.value.trim();
    const badName = name.length < 2;
    const badEmail = !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    const badMsg = message.length < 10;
    flag(nameEl, badName); flag(emailEl, badEmail); flag(msgEl, badMsg);
    if (badName || badEmail || badMsg) {
      say(badName ? 'Add your name.' : badEmail ? 'Check your email address.' : 'Tell me a little more (10+ characters).', 'err');
      (badName ? nameEl : badEmail ? emailEl : msgEl).focus();
      return;
    }
    if (honey.value) { form.reset(); say('Sent. Thank you.', 'ok'); return; } // bots fill the hidden field

    send.disabled = true;
    say('Sending…', 'busy');
    const ctrl = new AbortController();
    const kill = window.setTimeout(() => ctrl.abort(), 15000);
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${to}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name, email, type: kindEl.value, message,
          _subject: `Portfolio: ${kindEl.value} enquiry from ${name}`,
          _template: 'table',
          _captcha: 'false',
        }),
        signal: ctrl.signal,
      });
      const data = await res.json().catch(() => ({}) as Record<string, unknown>);
      if (!res.ok || data.success === 'false' || data.success === false) throw new Error(String(data.message ?? res.status));
      form.reset();
      say('Sent. Thank you, I reply to every message.', 'ok');
    } catch {
      note.dataset.kind = 'err';
      const a = document.createElement('a');
      a.href = mailtoHref();
      a.textContent = 'Open it in your email app';
      note.replaceChildren(document.createTextNode('Could not send from here. '), a, document.createTextNode('.'));
    } finally {
      window.clearTimeout(kill);
      send.disabled = false;
    }
  });
}
