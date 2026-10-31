# Memória Viva

Histórias ilustradas e mapas para começar a estudar no seu ritmo. O aplicativo funciona sem conta ou instalação de bibliotecas. A professora virtual usa áudios locais incluídos no pacote.

## Abrir

Acesso online: **https://marxb50.github.io/concursos/**. A interface ajusta automaticamente o layout para celular, tablet e computador e acompanha mudanças de tamanho ou orientação. Você pode alternar a qualquer momento no cabeçalho entre dois visuais — **Circuitos** (painéis de quadrinhos, circuitos e controles em verde e coral) e **Caderno** (papel creme original) — sem perder a posição ou a rodada atual.

No Windows, dê dois cliques em **iniciar-app.bat**. Ou abra **dist/index.html** diretamente no navegador. O pacote gerado já está incluído; Python e Node só são necessários para reconstruí-lo após editar os fontes.

Para ouvir **Thalita Neural**, mantenha a pasta **dist/audio/** junto do HTML. Extraia o ZIP completo. Copiar apenas o HTML preserva as telas e os textos, mas não leva os MP3.

## O que está disponível

- 41 histórias, 208 cenas e 41 mapas ilustrados para baixar em SVG.
- 56 infográficos, com busca por conceitos e filtro por área.
- 28 concursos; 12 provas históricas completas com 630 questões classificadas por tema (incluindo UFRN e IFRN).
- Exemplos resolvidos, inclusive nos concursos personalizados.
- Laboratórios de SQL JOIN, lógica proposicional e planilhas.
- Modo opcional de tentar lembrar os mapas, com revelação por bloco.
- Revisões com data livre ou atalhos de 1, 3, 7 e 15 dias.
- Botão **Professor** nas dez telas, nas missões de atividades, nos mapas, blocos, cenas, exemplos e laboratórios: professora virtual com voz Thalita Neural, texto acompanhado, pausa, repetição, velocidade e perguntas antes da resposta. [Guia da professora](PROFESSOR.md).
- Aba **Atividades** com **1.224 questões autorais distintas**, organizadas em 37 famílias e selecionadas para cada concurso: **40 a 100 questões em todas as 140 matérias**. São 7.786 posições de estudo, com compartilhamento de fundamentos entre concursos compatíveis e sem repetição dentro de uma matéria. Fases de até 10 questões, explicação específica, revisão dos erros, retomada e XP sem duplicação.

Auditoria de 30/10/2026: [resultados e limites](pesquisa-atividades/ETAPA_3_AUDITORIA_E_EXPANSAO.md), [quantidades por matéria](pesquisa-atividades/COBERTURA_ATIVIDADES_20261030.md). Das 1.886 explicações, 1.770 têm Thalita gravada e 116 permanecem em texto, por escolha do usuário de aguardar essa voz. [Roteiros pendentes, agrupados em 80 gravações](roteiros-thalita-pendentes.txt).

As matérias aparecem por participação nos pontos máximos da objetiva quando o edital fornece a distribuição por disciplina. Quando só há totais por bloco, os painéis mostram os blocos sem inventar contagem por matéria. Pesos, descontos e mínimos de ABDI, CGU, Câmara dos Deputados, Dataprev (2024 e 2026) e Nísia Floresta foram conferidos em 29/10/2026.

As provas são referências históricas. A classificação de questões não é um gabarito nem uma previsão de cobrança. Trilhas opcionais de concursos sem edital estão identificadas como sugestões.

## Seus dados

Posição nas histórias, concursos personalizados e revisões ficam no armazenamento deste navegador. Mudar de navegador, dispositivo ou origem/endereço do aplicativo pode abrir uma lista diferente. A seleção atual de concurso, matéria, mapa e área também é lembrada durante a sessão. Se o armazenamento estiver indisponível, o estudo continua, com aviso quando não for possível salvar.

Exemplos de links internos:

```text
#historia/sql
#mapa/mat_equacoes
#infograficos/formas-normais
#concurso/natal-suporte-2023
#materia/cgu-dev-2026/persistencia
#atividades/natal-suporte-2023/especificos
```

Ao imprimir uma história, o aplicativo prepara o mapa correspondente. Em mapas de estudo, imprime o conteúdo completo, mesmo quando as pistas estão ocultas. Nas outras abas, imprime somente a tela selecionada.

## Reconstruir e verificar

```powershell
node verificar.cjs --export --build
```

Alternativa para gerar o mesmo HTML:

```powershell
python build.py
```

O manifesto **build-manifest.json** é compartilhado pelos dois builds e pela verificação. As saídas são gravadas somente após todos os arquivos e marcadores serem encontrados. **verificar-novidades.cjs**, **verificar-pontuacao.cjs** e **verificar-atividades.cjs** complementam as verificações originais com rotas, buscas, pontuações, atividades, revisões, laboratórios e variantes das figuras.

Para verificar a interface com Playwright CLI, em dois terminais:

```powershell
# Terminal 1 — servidor de verificação, acessível apenas neste computador
python -m http.server 8765 --bind 127.0.0.1 --directory dist

# Terminal 2 — exige Node/npm; as dependências são apenas de desenvolvimento
npx --package @playwright/cli playwright-cli -s=memoria-viva open http://127.0.0.1:8765/ --browser=chrome
npx --package @playwright/cli playwright-cli -s=memoria-viva run-code --filename=tests/fluxos-browser.js --raw
npx --package @playwright/cli playwright-cli -s=memoria-viva run-code --filename=tests/figuras-browser.js --raw
npx --package @playwright/cli playwright-cli -s=memoria-viva run-code --filename=tests/persistencia-browser.js --raw
npx --package @playwright/cli playwright-cli -s=memoria-viva run-code --filename=tests/professor-browser.js --raw
npx --package @playwright/cli playwright-cli -s=memoria-viva run-code --filename=tests/professor-falhas-browser.js --raw
npx --package @playwright/cli playwright-cli -s=memoria-viva run-code --filename=tests/atividades-browser.js --raw
npx --package @playwright/cli playwright-cli -s=memoria-viva run-code --filename=tests/atividades-visuais-browser.js --raw
```

Os testes usam uma sessão de navegador própria e dados fictícios. O aplicativo final continua sem dependências de execução. O teste de interface foi realizado por HTTP local; o controlador de testes não permite abrir URLs `file:`.

`node verificar.cjs --audio-completo --build` também exige cobertura de áudio para todos os roteiros. Para gerar novamente a voz após editar o conteúdo, siga **PROFESSOR.md**. O HTML incorpora CSS, JavaScript e SVG; os áudios são arquivos separados.

Enquanto as gravações Thalita estiverem pendentes, use `node verificar.cjs --audio-pendente-autorizado --build`: esse modo confere cada identificador e versão na lista de roteiros autorizada. Não ignora pendências novas. O modo `--audio-completo` permanece estrito.

As atividades são compiladas de **curriculo_atividades.py** (conceitos e casos novos) e **atividades-legado.json** (exercícios anteriores corrigidos). Execute `python gerar_curriculo.py` após editar esses arquivos. **build_full_atividades.py** chama o mesmo compilador, evitando que o gerador anterior substitua o banco revisado.

## Organização dos fontes

O template e os arquivos CSS/JS continuam editáveis separadamente. **estudo-core.js** contém busca, validação de concursos personalizados, rotas e cálculos dos laboratórios. **cenas-gerais.js** reúne os desenhos das 33 histórias gerais. **infografico-base.js** declara os auxiliares compartilhados dos mapas, e cada arquivo de conteúdo tem seu próprio escopo. **provas-extra.js** acrescenta a prova de suporte de Natal, as trilhas opcionais e o detalhamento de Nísia Floresta.

O histórico de fontes e verificação está em **PESQUISA.md**. A pesquisa das atividades e a sequência das próximas etapas estão em **pesquisa-atividades/PESQUISA_ATIVIDADES_GAME.md**. **tema.js**, **central.css** e **atividades.css** controlam a alternância entre os visuais **Circuitos** e **Caderno**; **fontes-central.css** incorpora fontes com licença OFL; **pontuacao.js** reúne pesos e distribuição por pontos; e **atividades-dados.js**, **atividades-core.js** e **atividades-ui.js** implementam a central de missões. O diagnóstico original e o quadro de execução estão em **ANALISE_E_MELHORIAS_IA.md**. A versão anterior continua em **v1/**. A cópia dos fontes feita antes desta atualização está em **output/backup/antes-melhorias.zip** no diretório de trabalho.
