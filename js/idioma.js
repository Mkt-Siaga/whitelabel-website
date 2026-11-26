// Escolhe o idioma da página antes de tudo carregar: ?lang=en|pt, escolha salva, ou idioma do navegador.
// Em "en" (inglês com chinês junto), carrega os dicionários do catálogo (js/dados-en.js e js/dados-zh.js)
// e troca os textos marcados com data-en/data-zh.
(() => {
  const CHAVE = "whitelabel-idioma";
  let lang = new URLSearchParams(location.search).get("lang");
  try {
    if (lang) localStorage.setItem(CHAVE, lang === "en" ? "en" : "pt"); // link com ?lang= também fixa a escolha
    else lang = localStorage.getItem(CHAVE);
  } catch { /* sem armazenamento */ }
  lang ||= /^pt/i.test(navigator.language || "pt") ? "pt" : "en";
  lang = lang === "en" ? "en" : "pt";
  document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
  if (lang === "en") document.write('<script src="js/dados-en.js"><\/script><script src="js/dados-zh.js"><\/script>');

  window.trocarIdioma = (novo) => {
    try { localStorage.setItem(CHAVE, novo); } catch { /* vale só nesta visita */ }
    const url = new URL(location.href);
    url.searchParams.delete("lang");
    location.replace(url.href);
  };

  // chamada no fim do <body>, antes do app.js (que depois preenche números e listas)
  window.aplicarIdioma = () => {
    for (const b of document.querySelectorAll("[data-idioma]")) {
      b.setAttribute("aria-pressed", b.dataset.idioma === lang);
      b.addEventListener("click", () => { if (b.dataset.idioma !== lang) window.trocarIdioma(b.dataset.idioma); });
    }
    if (lang !== "en") return;
    document.title = "WhiteLabel · Product Catalog / 产品目录";
    const dois = (en, zh) => (zh ? `${en} / ${zh}` : en);
    for (const el of document.querySelectorAll("[data-en]"))
      el.innerHTML = el.dataset.en + (el.dataset.zh ? `<span class="zh" lang="zh-CN">${el.dataset.zh}</span>` : "");
    for (const el of document.querySelectorAll("[data-en-placeholder]")) el.placeholder = dois(el.dataset.enPlaceholder, el.dataset.zhPlaceholder);
    for (const el of document.querySelectorAll("[data-en-aria]")) el.setAttribute("aria-label", dois(el.dataset.enAria, el.dataset.zhAria));
  };
})();
