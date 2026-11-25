// Escolhe o idioma da página antes de tudo carregar: ?lang=zh|pt, escolha salva, ou idioma do navegador.
// Em chinês, carrega também o dicionário do catálogo (js/dados-zh.js) e troca os textos marcados com data-zh.
(() => {
  const CHAVE = "whitelabel-idioma";
  let lang = new URLSearchParams(location.search).get("lang");
  try {
    if (lang) localStorage.setItem(CHAVE, lang === "zh" ? "zh" : "pt"); // link com ?lang= também fixa a escolha
    else lang = localStorage.getItem(CHAVE);
  } catch { /* sem armazenamento */ }
  lang ||= /^zh/i.test(navigator.language || "") ? "zh" : "pt";
  lang = lang === "zh" ? "zh" : "pt";
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "pt-BR";
  if (lang === "zh") document.write('<script src="js/dados-zh.js"><\/script>');

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
    if (lang !== "zh") return;
    document.title = "WhiteLabel · 产品目录";
    for (const el of document.querySelectorAll("[data-zh]")) el.innerHTML = el.dataset.zh;
    for (const el of document.querySelectorAll("[data-zh-placeholder]")) el.placeholder = el.dataset.zhPlaceholder;
    for (const el of document.querySelectorAll("[data-zh-aria]")) el.setAttribute("aria-label", el.dataset.zhAria);
  };
})();
