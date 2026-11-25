# WhiteLabel · site do catálogo

Site estático (HTML/CSS/JS puro, sem build) com o catálogo de produtos da WhiteLabel: busca por nome, medida ou código, filtro por categoria e subcategoria, ficha do produto com a tabela de códigos e lista de cotação por código. A lista fica salva só no navegador de quem usa; o botão "Baixar cotação em PDF" gera um PDF com cabeçalho WhiteLabel, solicitante, foto, código, produto/variação e quantidade (biblioteca jsPDF em `js/vendor`, licença MIT).

Publicado pelo GitHub Pages: todo push na `main` atualiza o site.

## Arquivos

- `index.html`, `css/site.css`, `js/app.js`: o site.
- `js/destaques.js`: anúncios do carrossel do topo (produto, selo, título, texto e cor; `titulo_zh`/`texto_zh` em chinês). Editar à mão.
- `js/idioma.js`: seletor PT | 中文. A escolha fica salva no navegador; `?lang=zh` ou `?lang=pt` no link já abre no idioma. Textos fixos da página têm a versão chinesa no atributo `data-zh` do `index.html`; os da interface ficam em `L("pt", "zh")` no `app.js`.
- `js/dados.js`, `js/dados-zh.js` (dicionário português → chinês do catálogo), `img/produtos/`, `img/marca/`, `WhiteLabel_Catalogo_de_Produtos.pdf`: **gerados**, não editar à mão.

## Atualizar produtos

Os dados vêm da base de trabalho (pasta `whitelabel-catalogo`, fora deste repositório):

```bash
node ../whitelabel-catalogo/scripts/exportar-site.mjs
```

O link "Catálogo PDF" baixa `WhiteLabel_Catalogo_de_Produtos.pdf`, gerado pela base com `node ../whitelabel-catalogo/scripts/gerar-catalogo.mjs` antes do exportador.

O exportador só leva campos de vitrine (nome, categoria, descrição, atributos, tabela de códigos e foto). MOQ, NCM e anotações internas **não** vão para o site, porque este repositório é público.

## Pendências

- Em chinês, o PDF da cotação e o catálogo PDF continuam em português (a biblioteca do PDF não tem fonte chinesa).

- Contato comercial (e-mail, WhatsApp, telefone) para a lista de cotação ser enviada direto.
- 15 produtos com "Foto em atualização" (14 com marca de outra empresa na foto e 1 sem foto).
- Domínio próprio, se houver.
