const eur = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });
export const money = (n: number) => eur.format(Number.isFinite(n) ? n : 0);

export function num(form: HTMLFormElement, name: string): number {
  const el = form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | null;
  if (!el) return 0;
  const v = parseFloat(String(el.value).replace(',', '.'));
  return Number.isFinite(v) ? v : 0;
}

export function checked(form: HTMLFormElement, name: string): boolean {
  const el = form.elements.namedItem(name) as HTMLInputElement | null;
  return !!el?.checked;
}

export function rows(target: HTMLElement, data: [string, string][]) {
  target.replaceChildren(
    ...data.map(([k, v]) => {
      const tr = document.createElement('tr');
      const a = document.createElement('td');
      const b = document.createElement('td');
      a.textContent = k;
      b.textContent = v;
      tr.append(a, b);
      return tr;
    }),
  );
}

/** Recalcula al escribir y al enviar, sin recargar la página. */
export function bind(form: HTMLFormElement, run: () => void) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    run();
  });
  form.addEventListener('input', run);
  run();
}
