# Memória Viva · Concursos

Aplicativo de estudo com histórias, mapas e professora virtual.

**Site:** https://marxb50.github.io/concursos/

A interface se adapta automaticamente à largura disponível: celular, tablet e computador. Os controles também consideram interação por toque. Você pode alternar entre dois visuais — **Circuitos** (painéis de quadrinhos, circuitos e ações em verde/coral) e **Caderno** (papel creme) — sem perder a posição ou a rodada atual. Não há cadastro; posição, atividades e revisão ficam no navegador.

Inclui 41 histórias com 30 cenas cada (1.230 cenas), 56 infográficos e 28 concursos/trilhas. Há referências a 12 cadernos reais, com 630 questões classificadas por tema; essa classificação não constitui um banco de questões oficiais transcritas.

A aba **Atividades** tem 1.224 questões autorais distintas, selecionadas em 7.786 posições de estudo: todas as 140 matérias cadastradas têm de 40 a 100 questões, sem repetição dentro da mesma matéria. Questões de fundamentos podem ser compartilhadas entre concursos compatíveis. Fases de até 10 rodadas, professor sobre a questão atual, revisão de erros e XP sem duplicação. A adaptação ao formato da banca não é uma reprodução de sua prova.

Há 2908 explicações, das quais 2820 têm Thalita Neural, em 1376 roteiros gravados compartilhados quando o texto coincide. As 88 explicações restantes (56 roteiros distintos) permanecem disponíveis em texto, sem substituição automática de voz. O áudio só é carregado quando você escolhe ouvir. [Roteiros pendentes](src/roteiros-thalita-pendentes.txt).

[Relatório da auditoria](src/pesquisa-atividades/ETAPA_3_AUDITORIA_E_EXPANSAO.md) · [Cobertura por matéria](src/pesquisa-atividades/COBERTURA_ATIVIDADES_20261030.md) · [Fontes e cobertura das histórias](src/pesquisa-historias/FONTES_E_CRITERIOS.md).

As matérias seguem a participação nos pontos máximos da objetiva quando há distribuição oficial por disciplina. Quando o edital só informa blocos, a interface preserva essa distinção. Pontuação, mínimos e frequência histórica aparecem com seu contexto. As fontes de interface são incorporadas; suas licenças OFL estão em `src/fontes-central.css`.

## Atualizar o HTML

Os fontes editáveis estão em `src/`. Para recompilar as questões, execute `python src/gerar_curriculo.py`. Após editar, execute `node src/build.cjs` e copie `src/dist/index.html` para `index.html` na raiz. Mantenha a pasta `audio/` na raiz para as gravações atuais.

Para verificar em uma cópia local do repositório: copie a pasta `audio/` para `src/dist/audio/`, entre em `src/` e execute `node verificar.cjs --audio-pendente-autorizado --build`. O modo `--audio-completo` continua rigoroso e falha enquanto houver roteiros sem gravação. As pendências autorizadas são conferidas uma a uma, incluindo a versão do texto. As verificações de interface usam Playwright CLI; os scripts ficam em `src/tests/`.

GitHub Pages publica a raiz da branch `main`. `.nojekyll` preserva os arquivos estáticos. As rotas internas usam hash e funcionam ao recarregar.
