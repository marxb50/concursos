# Memória Viva · Concursos

Aplicativo de estudo com histórias, mapas e professora virtual.

**Site:** https://marxb50.github.io/concursos/

A interface se adapta automaticamente à largura disponível: celular, tablet e computador. Os controles também consideram interação por toque. O tema de quadrinhos usa circuitos, molduras recortadas e ações em verde/coral em todas as telas. Não há cadastro; posição e revisão ficam no navegador.

Inclui 41 histórias, 56 infográficos, 15 concursos e 525 explicações com voz sintética Thalita Neural. As provas e editais mantêm suas referências e datas no aplicativo. O áudio só é carregado quando você escolhe ouvir.

As matérias seguem a participação nos pontos máximos da objetiva quando há distribuição oficial por disciplina. Quando o edital só informa blocos, a interface preserva essa distinção. Pontuação, mínimos e frequência histórica aparecem com seu contexto. As fontes de interface são incorporadas; suas licenças OFL estão em `src/fontes-central.css`.

## Atualizar o HTML

Os fontes editáveis estão em `src/`. Após editar, execute `node src/build.cjs` e copie `src/dist/index.html` para `index.html` na raiz. Mantenha a pasta `audio/` na raiz para as gravações atuais.

GitHub Pages publica a raiz da branch `main`. `.nojekyll` preserva os arquivos estáticos. As rotas internas usam hash e funcionam ao recarregar.
