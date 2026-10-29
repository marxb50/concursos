# Memória Viva · Concursos

Aplicativo de estudo com histórias, mapas e professora virtual.

**Site:** https://marxb50.github.io/concursos/

A interface se adapta automaticamente à largura disponível: celular, tablet e computador. Os controles também consideram interação por toque. Não há cadastro; posição e revisão ficam no navegador.

Inclui 41 histórias, 56 infográficos, 15 concursos e 525 explicações com voz sintética Thalita Neural. As provas e editais mantêm suas referências e datas no aplicativo. O áudio só é carregado quando você escolhe ouvir.

## Atualizar o HTML

Os fontes editáveis estão em `src/`. Após editar, execute `node src/build.cjs` e copie `src/dist/index.html` para `index.html` na raiz. Mantenha a pasta `audio/` na raiz para as gravações atuais.

GitHub Pages publica a raiz da branch `main`. `.nojekyll` preserva os arquivos estáticos. As rotas internas usam hash e funcionam ao recarregar.
