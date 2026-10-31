# Etapa 2 — aba Atividades, dois visuais e auditoria Dataprev

Concluída e publicada em 29/10/2026: [abrir o site](https://marxb50.github.io/concursos/?versao=atividades-e3c126d#atividades) (commit `e3c126da8986b90f2f6e3f25387c3ca3d2c49dab`).

## Implementação

- **Aba Atividades (`#view-atividades`):** central de missões integrada à navegação principal, aos cartões de concursos e às páginas de matérias (`Jogar atividades →`), preservando o concurso e a matéria selecionados.
- **53 missões e 244 rodadas (`atividades-dados.js`, `atividades-core.js`, `atividades-ui.js`):**
  - 12 missões autorais de aplicação: *Detetive do texto* (`detetive-texto`), *Restaure o equilíbrio* (`balanca-equacoes`), *Central de recursos* (`recursos-porcentagem`), *Laboratório de chances* (`chance-probabilidade`), *Acenda o circuito lógico* (`circuito-logico`), *Resgate os registros* (`resgate-sql`), *Sala de decisões* (`decisoes-publicas`), *Painel de planilhas* (`planilha-operacao`), *Resgate da conexão* (`rede-investigacao`), *Sala de incidentes* (`seguranca-incidente`), *Oficina de sistemas* (`oficina-sequencias`) e *Decodificador de inglês* (`ingles-evidencias`).
  - 41 missões de fundamentos (`base-*`), conectando pistas e definições de todas as 41 histórias ilustradas.
  - Todas as 85 entradas de matérias dos 15 concursos possuem atividades associadas.
- **Acessibilidade e interação:** suporte a mouse, toque e teclado; botões `−`/`+` nos cálculos numéricos; tabela-verdade interativa; pré-visualização ao vivo de `INNER`, `LEFT`, `RIGHT` e `FULL JOIN`; e ordenação de etapas com botões `↑`/`↓` sem depender de arrastar.
- **Prioridade transparente e evidências reais:** exibe a participação da matéria nos pontos máximos da objetiva (quando definida por disciplina no edital) e a lista ordenada dos temas mais frequentes no caderno analisado, com os números das questões e link direto para o PDF oficial da prova.
- **Escolha entre dois visuais (`tema.js` e `atividades.css`):** seletor `Visual` no cabeçalho permite alternar entre **Circuitos** (painéis de quadrinhos e circuitos) e **Caderno** (papel creme original) em qualquer tela ou rodada sem perder o estado da partida.
- **Auditoria das provas e pesos da Dataprev (`provas.js`, `pontuacao.js` e `catalogo.js`):**
  - Atualizado o link do caderno oficial da Dataprev 2024 (`ati-desenvolvimento-de-software-cns003-tipo-01.pdf`) e corrigida a classificação temática das questões do caderno de 2024 (incluindo questões 26, 28, 36, 40, 55 e 56).
  - Modelados os pesos oficiais de Dataprev 2024 e Dataprev 2026 em `pontuacao.js`: Conhecimentos Específicos valem 2,5 pontos por questão (75 de 115 pontos = 65,22% da objetiva), gerais valem 1 ponto por questão, com mínimo de 57,5 pontos e proibição de zerar disciplina.
- **Professora virtual (`professor-core.js`, `professor-ui.js`, `professor-audios.js`):** 526 aulas cobertas por 432 gravações Thalita Neural, incluindo a aula da aba Atividades (`pagina/atividades`), os 8 roteiros atualizados da Dataprev e o botão **Professor** dentro de cada rodada das missões.

## Verificações

- `node verificar.cjs --audio-completo --export --build`: 41 histórias, 208 cenas, 41 mapas ilustrados, 56 infográficos, 15 concursos, 7 provas completas (390 questões), 53 missões (244 rodadas) e 526 aulas com áudio Thalita verificado.
- `python verificar-audios.py`: 432 faixas únicas MP3 verificadas por SHA-256, codec, duração e limites dos segmentos.
- `tests/atividades-browser.js`: fluxo completo de SQL JOIN com áudio Thalita real, revisão ligada ao fundamento, retomada após recarga, não duplicação de XP ao repetir, investigação de texto com erro comentado e dica, cálculos numéricos, circuitos lógicos, ordenação por botões, estudo de casos e alternância entre os visuais `Circuitos` e `Caderno`.
- `tests/atividades-visuais-browser.js`: 216 verificações nos dois visuais (`circuitos` e `caderno`) e em seis larguras (320, 360, 390, 768, 1024 e 1440 px) sem transbordamento horizontal, erro JavaScript ou falha de contraste.
- `tests/fluxos-browser.js`: regressão completa de busca, rotas, histórias, mapas, recuperação ativa, laboratórios, revisão, concursos personalizados e impressão.
