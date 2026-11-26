# WhiteLabel · site do catálogo

Site estático (HTML/CSS/JS puro, sem build) com o catálogo de produtos da WhiteLabel: busca por nome, medida ou código, filtro por categoria e subcategoria, ficha do produto com a tabela de códigos e lista de cotação por código. A lista fica salva só no navegador de quem usa; o botão "Baixar cotação em PDF" gera um PDF com cabeçalho WhiteLabel, solicitante, foto, código, produto/variação e quantidade (biblioteca jsPDF em `js/vendor`, licença MIT).

Publicado pelo GitHub Pages: todo push na `main` atualiza o site.

## Arquivos

- `index.html`, `css/site.css`, `js/app.js`: o site.
- `js/destaques.js`: anúncios do carrossel do topo (produto, selo, título, texto e cor; `titulo_en`/`texto_en` e `titulo_zh`/`texto_zh` para o modo EN · 中文). Editar à mão.
- `js/idioma.js`: seletor **PT | EN · 中文**. O segundo modo mostra inglês com o chinês junto (logo abaixo, menor). A escolha fica salva no navegador; `?lang=en` ou `?lang=pt` no link já abre no modo (sem escolha salva, navegador em português abre em PT e os demais em EN · 中文). Textos fixos da página têm `data-en` e `data-zh` no `index.html`; os da interface ficam em `L("pt", "en")` no `app.js`, com o chinês no mapa `UI_ZH`.
- `js/dados.js`, `js/dados-en.js` e `js/dados-zh.js` (dicionários português → inglês e → chinês do catálogo), `img/produtos/`, `img/marca/`, `WhiteLabel_Catalogo_de_Produtos.pdf`: **gerados**, não editar à mão.

## Atualizar produtos

Os dados vêm da base de trabalho (pasta `whitelabel-catalogo`, fora deste repositório):

```bash
node ../whitelabel-catalogo/scripts/exportar-site.mjs
```

O link "Catálogo PDF" baixa `WhiteLabel_Catalogo_de_Produtos.pdf`, gerado pela base com `node ../whitelabel-catalogo/scripts/gerar-catalogo.mjs` antes do exportador.

O exportador só leva campos de vitrine (nome, categoria, descrição, atributos, tabela de códigos e foto). MOQ, NCM e anotações internas **não** vão para o site, porque este repositório é público.

## Pendências

- O catálogo PDF para download só existe em português; a cotação em PDF sai em inglês no modo EN · 中文 (o PDF não tem fonte chinesa).

- Contato comercial (e-mail, WhatsApp, telefone) para a lista de cotação ser enviada direto.
- 15 produtos com "Foto em atualização" (14 com marca de outra empresa na foto e 1 sem foto).
- Domínio próprio, se houver.
