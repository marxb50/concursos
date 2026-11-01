# Memória Viva — Análise Completa do Sistema e Plano de Execução para IA

> **Ampliação de 31/10/2026:** as 41 histórias passaram a 30 cenas cada, organizadas em seis partes, com exemplos, revisão, referências e seletor individual. As 208 cenas originais e seu áudio foram preservados. [Fontes e critérios](pesquisa-historias/FONTES_E_CRITERIOS.md). A contagem de áudio atualizado fica em `roteiros-thalita-pendentes.json`.

> **Auditoria e ampliação — 30/10/2026:** a versão atual reúne 28 concursos/trilhas, 140 matérias com 40–100 atividades cada e 1.224 questões autorais distintas. Foram revisados gabaritos, seleção por cargo, pesos, explicações, progresso e os dois visuais. [Relatório completo](pesquisa-atividades/ETAPA_3_AUDITORIA_E_EXPANSAO.md). A professora tem 1.770 explicações com áudio Thalita e 116 com roteiro pronto, aguardando essa voz por escolha do usuário. Os estados abaixo são históricos.

> **Atualização de execução — 29/10/2026:** o roteiro abaixo foi implementado. As seções originais permanecem como registro do diagnóstico anterior; seus números e descrições de limitações não representam mais a versão atual.
>
> **Estado entregue:** 41 histórias, 208 cenas, 41 mapas SVG, **56 infográficos**, **15 concursos** e **7 provas completas / 390 questões**.

| Etapa | Resultado implementado |
|---|---|
| P0.1–P0.4 | Ícones explícitos, história e mapa acessíveis por tópico, classificação/cópia de exemplos/exclusão de concursos pessoais, mapas de hardware, sistemas/arquivos e Word/Writer. |
| P0.5 | Quatro alternativas e erro sem desconto nas duas provas; **pesos reais por matéria**, conferidos nos editais, em vez do +1 uniforme sugerido no diagnóstico. |
| P1.1–P1.3 | Desenhos próprios para todas as 33 histórias gerais, miniaturas variadas nos ramos e interações em sete histórias adicionais. |
| P2.1–P2.4 | Busca em histórias, mapas e concursos, filtros por área, seleção persistida, rotas com identificadores e impressão da tela correspondente. |
| P3.1–P3.3 | Recuperação ativa acessível, SQL JOIN, tabela-verdade, simulador de planilhas e atalhos de revisão. |
| P4.1 | Nísia Floresta: legislação desdobrada conforme o Anexo V, sem transplantar a lista de Parnamirim; trilhas opcionais e referência histórica nos três concursos provisórios. |
| P4.2 | Prova CCMN 04 — suporte em informática, Câmara de Natal/FUNCERN 2023: 40 questões classificadas, com fonte primária. |
| P5.1 | Escopos explícitos dos infográficos, manifesto comum, build por Node ou Python, fallback no launcher e regressões automatizadas. |

**Verificação:** suíte de conteúdo e regressões aprovada; fluxos no Chrome em desktop e celular, impressão de sete telas, armazenamento, teclado e movimento reduzido; 165 cenas gerais sem texto fora do SVG; builds Python/Node idênticos. Fontes e detalhes estão no registro de 29/10/2026 em `PESQUISA.md`; instruções em `README.md`.

**Extensão Professor — 29/10/2026:** professora virtual com voz Microsoft Thalita Multilingual Neural, roteiros contextuais para as telas, cenas, mapas, exemplos e laboratórios. O painel inclui texto, escolha de trechos, pausa, repetição, velocidade, modo recolhido e recuperação ativa com parada antes da resposta. Os MP3 ficam em `dist/audio/professor/`; o HTML mantém os textos completos. Consulte `PROFESSOR.md` para uso, fontes e reconstrução.

---

> **Objetivo deste documento:** Servir como documentação técnica exaustiva do estado atual do projeto **Memória Viva** (`estudo-ti`) e como **especificação executável passo a passo** para que outra IA possa implementar melhorias de código, design visual (SVG/CSS), usabilidade, pedagogia e conteúdo sem quebrar nenhuma invariante existente.

---

## PARTE 1 — TUDO QUE EXISTE NO PROJETO ATUALMENTE

### 1.1. Visão Geral e Filosofia Pedagógica
O **Memória Viva** é uma plataforma web estática, 100% autônoma (zero dependências externas de runtime, sem frameworks JS/CSS, funcionando offline via arquivo único `dist/index.html`), desenhada para ensino introdutório ("do zero, no seu ritmo") e preparação para concursos públicos (locais do RN e nacionais de TI/Administração).

A plataforma aplica princípios da ciência cognitiva e neurociência da aprendizagem:
1. **Segmentação e Controle de Ritmo (Mayer, 2003; Cowan, 2010):** Histórias divididas em cenas curtas (5 a 7 cenas por trilha), avanço manual, sem testes antes da explicação.
2. **Pré-treinamento e Concretude:** Cada cena parte de uma situação concreta (a loja/confeitaria da personagem **Lia**, biblioteca, prefeitura, rondas etc.), explica o conceito, destaca o que observar na figura e apresenta apenas **um termo técnico novo** por vez.
3. **Animações Congruentes (Tversky, Morrison & Bétrancourt, 2002):** Ilustrações vetoriais (SVG) com movimentos CSS (`scene-enter`, `scene-move`, `scene-line`, `scene-bar`, `scene-highlight`) que respeitam `prefers-reduced-motion` e possuem botão de pausa/replay.
4. **Efeito do Exemplo Resolvido (Sweller et al., 2019):** 100% das matérias dos 14 concursos possuem exemplos resolvidos passo a passo (`worked`), sem exigir que o iniciante chute no escuro.
5. **Prática Distribuída, Recuperação Ativa e Prática Intercalada (Roediger & Karpicke, 2006; Cepeda et al., 2008; Karpicke & Blunt, 2011; Dunlosky et al., 2013; Rasch & Born, 2013; Rohrer et al., 2014; Hartwig et al., 2022):** Sistema de agendamento manual de revisões (`#view-revisao`) e guia científico na aba `#view-estrategia`.
6. **Teoria da Decisão e Eliminação Lógica em Provas (Budescu & Bar-Hillel, 1993):** Quadro comparativo de eliminação (25%, 50%, 75%, 80%, 90%) e calculadora interativa de probabilidade e valor esperado (múltipla escolha 4 ou 5 opções vs. Cebraspe Certo/Errado).

---

### 1.2. Inventário Completo de Arquivos e Diretórios

#### Raiz do Projeto (`v2` — Versão Atual em Produção)
| Arquivo | Tamanho Aprox. | Papel na Arquitetura |
|---|---:|---|
| `index.template.html` | 11 KB | Template HTML principal com 9 `<section class="view">`, `<dialog id="art-dialog">`, cabeçalho de navegação e marcadores `/*__...__*/` para injeção de CSS e JS. |
| `build.py` | 1,2 KB | Script Python que lê `index.template.html`, substitui 4 marcadores de CSS e 15 marcadores de JS pelo conteúdo dos arquivos correspondentes e gera `dist/index.html`. |
| `iniciar-app.bat` | 1,0 KB | Launcher Windows (UTF-8) que executa `build.py` (se Python disponível) e abre `dist/index.html` no navegador padrão. |
| `verificar.cjs` | 11 KB | Suíte de testes automatizados em Node.js (`node:vm`, `node:assert/strict`) que valida integridade de todas as 41 histórias, 208 cenas, 41 mapas SVG, 53 infográficos, 14 concursos, 350 questões de 6 provas, calculadora de chute e sistema de revisão. Com `--export`, gera os 41 SVGs em `mapas-ilustrados/`. |
| `PESQUISA.md` | 35 KB | Histórico evolutivo da pesquisa pedagógica, fontes técnicas, editais e relatórios de verificação. |
| `conteudo.js` | 33 KB | Define `STEP`, as **8 histórias originais de TI** (`JOURNEYS` 1 a 8, 43 cenas), `LEARNING_SOURCES` (13 artigos científicos) e `CONCEPT_SOURCES` (16 fontes técnicas/legais). |
| `materias.js` | 110 KB | Define `GENERAL_STEP` e adiciona **33 histórias de matérias gerais e específicas** (`JOURNEYS` 9 a 41, 165 cenas), totalizando **41 histórias e 208 cenas**. |
| `concursos.js` | 42 KB | Define `CONTEST_SOURCES`, listas de tópicos padrão (`PORT_TOPICS`, `MATH_TOPICS`, `CONSTITUTION_TOPICS`, `PENAL_TOPICS`, `LEGIS_TOPICS`, `INFO_TOPICS`), exemplos resolvidos (`WORKED_*`), os **9 primeiros concursos** de `CONTESTS`, `mapLinks` e o módulo `ContestCore` (`guess`, `validSource`). |
| `provas.js` | 39 KB | Adiciona **5 concursos históricos com provas completas analisadas** (`natal-camara-2023`, `sao-agente-2021`, `dataprev-dev-2024`, `dataprev-dev-2026`, `cgu-ti-2022`) e seus respectivos exemplos resolvidos (`WORKED_*`), além de conectar tópicos de TI da CGU 2026 aos infográficos. Totaliza **14 concursos** e **6 provas completas (350 questões)**. |
| `infograficos.js` | 15 KB | Inicializa `INFOGRAPHICS` com os **5 primeiros mapas de TI** (`tcpip`, `sql-linguagens`, `solid`, `iterativo`, `formas-normais`). |
| `infograficos-gerais.js` | 37 KB | Define `MAPA_GRUPO`, `MAPA_AVISO` e adiciona **15 infográficos** gerais (Português, Matemática/Lógica, Direito, Informática, Administração) + atribui `area: 'Tecnologia'` aos 5 primeiros. |
| `infograficos-ti-extra.js` | 24 KB | Adiciona **8 infográficos de TI** (`java-objetos`, `rest-http`, `scrum-fundamentos`, `git-ci`, `testes-software`, `cascata`, `incremental`, `arquitetura-dados-ia`). |
| `infograficos-matematica-extra.js` | 20 KB | Adiciona **7 infográficos de Matemática e Lógica** (`regra-tres`, `equacao-primeiro-grau`, `conjuntos-mapa`, `media-mapa`, `geometria-medidas`, `sequencias-progressoes`, `contagem-matrizes`). |
| `infograficos-portugues-extra.js` | 21 KB | Adiciona **7 infográficos de Português e Inglês** (`acentuacao-mapa`, `sujeito-predicado`, `verbos-tempos`, `coesao-pronomes`, `generos-tipologias`, `semantica-figuras`, `ingles-tecnico-leitura`). |
| `infograficos-administracao.js` | 38 KB | Adiciona **11 infográficos de Administração e Direito** (`redacao-oficial`, `atendimento-publico`, `contabilidade-patrimonio`, `reunioes-ata`, `eventos-logistica`, `expressoes-latinas`, `direitos-constitucionais`, `direito-penal-processo`, `legislacao-especial-guarda`, `licitacoes-controle-etica`, `orcamento-publico-afo`). Totaliza **53 infográficos**. |
| `ilustracoes.js` | 31 KB | Módulo `Art` (`scene`, `mindMap`, `symbol`, `lia`, `e`). Gera os SVGs animados das 208 cenas e os 41 mapas mentais vetoriais (interativos e estáticos). |
| `revisao.js` | 4,7 KB | Módulos `ReviewCore` (`dateOk`, `ref`, `normalize`, `add`, `schedule`, `done`, `remove`, `ordered`) e `ReviewUI` (`render`). |
| `infografico-ui.js` | 6,1 KB | Módulo `InfographicUI` (`render`, `icon`). Renderiza a aba `#view-infograficos` com filtro por área, seletor de mapas, barra de ferramentas e folha de estudo imprimível. |
| `catalogo.js` | 33 KB | Módulo `Catalog` (`catalog`, `contest`, `subject`, `strategy`). Renderiza o catálogo de concursos, páginas de concurso/matéria, links recomendados e a aba de Estratégia. |
| `app.js` | 23 KB | Módulo `LessonCore` (`normalize`, `move`) + controlador principal de DOM, rotas (`#concursos`, `#historia`, `#mapa`, `#infograficos`, `#revisao`, `#estrategia`, `#fontes`, `#concurso`, `#materia`), síntese de voz (`speechSynthesis`), download de SVG, impressão e `localStorage`/`sessionStorage`. |
| `estilo.css` | 23 KB | Estilos base, cabeçalho, layout das histórias, animações SVG, modal de ampliação, aba de fontes, responsividade e `@media print` para mapas SVG. |
| `catalogo.css` | 9,2 KB | Estilos do catálogo de concursos, página de matéria, exemplos guiados, estatísticas de provas, tabela de eliminação e calculadora. |
| `infograficos.css` | 9,1 KB | Estilos dos infográficos HTML, filtros de área, mini-tabelas e `@media print` (`body.print-infographic`). |
| `revisao.css` | 1,8 KB | Estilos da aba de Revisão (`#view-revisao`) e cartões de agendamento. |

#### Diretórios e Artefatos Gerados
- `dist/index.html` (~533 KB): Pacote autônomo gerado por `python build.py`.
- `mapas-ilustrados/*.svg` (41 arquivos SVG): Mapas mentais estáticos exportados por `node verificar.cjs --export`.
- `v1/` (Versão 1 preservada): Protótipo anterior focado em TI com **8 mapas, 63 ramos, laboratório interativo de SQL JOIN (`INNER`, `LEFT`, `RIGHT`, `FULL`), modo de recuperação ativa com ocultação de pistas e autoavaliação espaçada (`StudyCore.schedule`), e 34 questões inéditas de múltipla escolha (`QUESTIONS`) com fila de erros**.
- `previa-*.jpg` (8 imagens) e `memoria-viva-*.zip` (2 pacotes ZIP): Capturas de verificação visual e pacotes distribuíveis.

---

### 1.3. Catálogo Completo de Dados Atuais

#### A. As 41 Histórias Ilustradas (`JOURNEYS` — 208 Cenas)
Cada objeto em `JOURNEYS` possui:
`{ id, name, label, color, light, symbol, hero, description, root: [titulo, subtitulo], steps: [{ id, title, map, speech, explain, observe, term, meaning, remember, code?, visual? }] }`.

1. **Tecnologia da Informação (`conteudo.js` — 8 histórias, 43 cenas, com arte SVG customizada por cena):**
   - `sql` ("SQL e bancos", 7 cenas, `symbol: 'database'`, tem código na última cena e botões de destaque `row`/`column`/`ana`/`caio`)
   - `java` ("Java e objetos", 5 cenas, `symbol: 'cake'`, tem código na última cena)
   - `engenharia` ("Criar software", 5 cenas, `symbol: 'plan'`)
   - `web` ("Internet e APIs", 5 cenas, `symbol: 'message'`, tem código JSON na última cena)
   - `seguranca` ("Segurança e dados", 6 cenas, `symbol: 'shield'`)
   - `infra` ("Redes e nuvem", 5 cenas, `symbol: 'cloud'`)
   - `gestao` ("Trabalho em equipe", 5 cenas, `symbol: 'board'`)
   - `dados` ("Dados e IA", 5 cenas, `symbol: 'chart'`)

2. **Língua Portuguesa e Inglês (`materias.js` — 8 histórias, 40 cenas):**
   - `port_texto` ("Entender textos", 5 cenas, `symbol: 'plan'`)
   - `port_pontuacao` ("Pontuação", 5 cenas, `symbol: 'plan'`)
   - `port_concordancia` ("Concordância", 5 cenas, `symbol: 'plan'`)
   - `port_crase` ("Crase", 5 cenas, `symbol: 'plan'`)
   - `port_acentos` ("Acentuação", 5 cenas, `symbol: 'plan'`)
   - `port_sujeito` ("Sujeito e predicado", 5 cenas, `symbol: 'plan'`)
   - `port_verbos` ("Verbos e tempos", 5 cenas, `symbol: 'cycle'`)
   - `ingles_leitura` ("Inglês: leitura de textos", 5 cenas, `symbol: 'message'`)

3. **Matemática e Raciocínio Lógico (`materias.js` — 9 histórias, 45 cenas):**
   - `mat_frac` ("Frações", 5 cenas, `symbol: 'chart'` — possui quadradinhos visuais customizados em `Art.scene`)
   - `mat_media` ("Média", 5 cenas, `symbol: 'chart'`)
   - `mat_porcento` ("Porcentagem", 5 cenas, `symbol: 'chart'` — possui malha de 100 quadradinhos nas cenas 0 e 1)
   - `logic_proposicoes` ("Lógica e proposições", 5 cenas, `symbol: 'chart'`)
   - `mat_probabilidade` ("Probabilidade", 5 cenas, `symbol: 'chart'`)
   - `mat_razao` ("Razão e proporção", 5 cenas, `symbol: 'chart'`)
   - `mat_equacoes` ("Equação do primeiro grau", 5 cenas, `symbol: 'plan'`)
   - `logic_conjuntos` ("Conjuntos", 5 cenas, `symbol: 'blocks'`)
   - `mat_geometria` ("Geometria e sequências", 5 cenas, `symbol: 'chart'`)
   - `mat_combinatoria` ("Contagem e matrizes", 5 cenas, `symbol: 'blocks'`)

4. **Informática Básica (`materias.js` — 4 histórias, 20 cenas):**
   - `info_hardware` ("Partes do computador", 5 cenas, `symbol: 'cloud'`)
   - `info_arquivos` ("Arquivos e pastas", 5 cenas, `symbol: 'plan'`)
   - `info_planilhas` ("Planilhas e fórmulas", 5 cenas, `symbol: 'chart'`)
   - `info_documentos` ("Documentos e Word", 5 cenas, `symbol: 'plan'`)

5. **Direito, Legislação, Administração, Contabilidade e AFO (`materias.js` — 11 histórias, 55 cenas):**
   - `const_fundamentos` ("Constituição", 5 cenas, `symbol: 'plan'`)
   - `penal_fundamentos` ("Direito Penal e Processo", 5 cenas, `symbol: 'shield'`)
   - `legis_especial` ("Legislação especial e guardas", 5 cenas, `symbol: 'shield'`)
   - `etica_servico` ("Ética, controle e cidadania", 5 cenas, `symbol: 'plan'`)
   - `afo_orcamento` ("Orçamento público e finanças", 5 cenas, `symbol: 'chart'`)
   - `adm_redacao` ("Comunicação oficial", 5 cenas, `symbol: 'plan'`)
   - `adm_atendimento` ("Atendimento ao público", 5 cenas, `symbol: 'heart'`)
   - `adm_patrimonio` ("Patrimônio e contabilidade", 5 cenas, `symbol: 'chart'`)
   - `adm_reunioes` ("Organizar reuniões", 5 cenas, `symbol: 'plan'`)
   - `adm_eventos` ("Planejar eventos", 5 cenas, `symbol: 'board'`)
   - `adm_latim` ("Expressões latinas", 5 cenas, `symbol: 'plan'`)

#### B. Os 53 Infográficos HTML (`INFOGRAPHICS`)
Cada objeto em `INFOGRAPHICS` possui:
`{ id, area, label, title, subtitle, discipline, symbol, color, beginner (ID em JOURNEYS), definition, purpose, groups: [{ key, title, icon, color, summary, facts: string[], detail, visual?: { caption, head, rows } }], notes: [{ kind: 'compare'|'warning'|'exam', title, text }], example, sources: [[titulo, url], ...] }`.

Distribuídos em 6 áreas:
- **Tecnologia (13):** `tcpip`, `sql-linguagens`, `solid`, `iterativo`, `formas-normais`, `java-objetos`, `rest-http`, `scrum-fundamentos`, `git-ci`, `testes-software`, `cascata`, `incremental`, `arquitetura-dados-ia`.
- **Português (13, inclui Inglês):** `leitura-texto`, `virgula`, `uso-crase`, `concordancia`, `classes-palavras`, `regencia`, `acentuacao-mapa`, `sujeito-predicado`, `verbos-tempos`, `coesao-pronomes`, `generos-tipologias`, `semantica-figuras`, `ingles-tecnico-leitura`.
- **Matemática e lógica (11):** `proposicoes-mapa`, `probabilidade-mapa`, `porcentagem-mapa`, `fracoes-mapa`, `regra-tres`, `equacao-primeiro-grau`, `conjuntos-mapa`, `media-mapa`, `geometria-medidas`, `sequencias-progressoes`, `contagem-matrizes`.
- **Direito (5):** `principios-administracao`, `ato-administrativo`, `direitos-constitucionais`, `direito-penal-processo`, `legislacao-especial-guarda`.
- **Informática (2):** `planilhas-mapa`, `seguranca-mapa`.
- **Administração (9):** `gestao-documental`, `redacao-oficial`, `atendimento-publico`, `contabilidade-patrimonio`, `reunioes-ata`, `eventos-logistica`, `expressoes-latinas`, `licitacoes-controle-etica`, `orcamento-publico-afo`.

#### C. Os 14 Concursos (`CONTESTS`) e as 6 Provas Analisadas (350 Questões)
| ID | Nome | Local / Filtro | Tipo (`kind`) | Matérias | Questões Analisadas (`evidence.total`) |
|---|---|---|---|---:|---:|
| `natal-sttu` | Natal/RN · mobilidade urbana | Natal | previsão · aguarde edital | 3 | — |
| `sao-goncalo` | São Gonçalo do Amarante/RN | São Gonçalo | comissão formada · aguarde edital | 3 | — |
| `nisia-prefeitura` | Nísia Floresta/RN · técnico administrativo | Nísia Floresta | edital 2026 · IDIB (60q previstas) | 4 | — |
| `nisia-guarda` | Nísia Floresta/RN · guarda municipal | Nísia Floresta | edital 2026 · IDIB (60q previstas) | 4 | — |
| `camara-2026` | Câmara dos Deputados · registro e redação | Nacional | edital 2026 · Cebraspe | 9 | — |
| `parnamirim-futuro` | Parnamirim/RN · preparação geral | Parnamirim | preparação sem edital | 3 | — |
| `parnamirim-guarda-2024` | Guarda Municipal · Parnamirim/RN | Parnamirim | prova anterior · FUNCERN | 5 | **50** (Q1–50) |
| `cgu-dev-2026` | CGU · desenvolvimento de sistemas | Nacional | edital 2026 · Cebraspe | 13 | — |
| `abdi-dev-2026` | ABDI · desenvolvimento de TI | Nacional | edital 2026 · FGV (60q previstas) | 5 | — |
| `natal-camara-2023` | Câmara de Natal/RN · assistente geral | Natal | prova anterior · FUNCERN | 3 | **40** (Q1–40) |
| `sao-agente-2021` | São Gonçalo/RN · agente administrativo | São Gonçalo | prova anterior · IBFC | 3 | **40** (Q1–40) |
| `dataprev-dev-2024` | Dataprev · desenv. de software (2024) | Nacional | prova anterior · FGV | 6 | **70** (Q1–70) |
| `dataprev-dev-2026` | Dataprev · desenv. de software (2026) | Nacional | prova aplicada · FGV | 6 | **70** (Q1–70) |
| `cgu-ti-2022` | CGU · Auditor Federal de TI (2022) | Nacional | prova anterior · FGV | 9 | **80** (Q1–80) |

#### D. Chaves de Armazenamento no Navegador
- `localStorage['memoria-viva-historias-v2']`: `{ topic: string, positions: Record<string, number>, motion: boolean }`
- `localStorage['memoria-viva-concursos-proprios-v1']`: Array de concursos personalizados criados pelo usuário (`id: 'manual-...'`)
- `localStorage['memoria-viva-revisoes-v1']`: Array de itens salvos para revisão (`{ type: 'historia'|'mapa', id: string, added: 'YYYY-MM-DD', due: 'YYYY-MM-DD'|null, reviewed: 'YYYY-MM-DD'|null }`)
- `sessionStorage['memoria-viva-selecao']`: `{ contest: string|null, subject: string|null }`

---

## PARTE 2 — O QUE PODE SER MELHORADO (ROTEIRO EXECUTÁVEL PARA OUTRA IA)

Abaixo estão listados todos os bugs, limitações visuais, gargalos de UX/navegação, oportunidades pedagógicas (incluindo recursos valiosos que existiam na `v1/` e podem ser integrados como fase opcional) e melhorias de arquitetura. **Cada item contém o diagnóstico exato (arquivo e linha) e a instrução de implementação.**

---

### PRIORIDADE 0 (P0) — Correção de Bugs Lógicos e Inconsistências Silenciosas

#### Tarefa P0.1: Corrigir ícones ausentes em `Art.symbol()` (`ilustracoes.js`)
- **Diagnóstico:** Em `ilustracoes.js` (linhas 42–54), `Art.symbol(name, size)` define apenas 8 ícones (`database`, `cake`, `plan`, `message`, `shield`, `cloud`, `board`, `chart`). Porém, 4 histórias em `materias.js` usam símbolos que só existem em `InfographicUI.icon`:
  - `logic_conjuntos` → `symbol: 'blocks'`
  - `mat_combinatoria` → `symbol: 'blocks'`
  - `port_verbos` → `symbol: 'cycle'`
  - `adm_atendimento` → `symbol: 'heart'`
  Como resultado, `Art.symbol` cai silenciosamente no fallback `shapes.plan` na barra `#topic-rail` e nos mapas SVG!
- **Como executar:**
  1. Em `ilustracoes.js`, dentro de `symbol(name, size=58)`, adicione os shapes `blocks`, `cycle`, `heart`, `globe`, `link`, `lock`, `search`, `arrows` (adaptados para `viewBox="0 0 64 64"` com o mesmo estilo colorido de `Art.symbol`, usando `purple`, `teal`, `yellow`, `peach`, `cream`).
  2. Adicione uma asserção em `verificar.cjs`: verificar que todo `topic.symbol` de `JOURNEYS` possui chave explícita em `Art.symbol` (ou exportar a lista de símbolos suportados).

#### Tarefa P0.2: Corrigir código morto em `Catalog.subject()` que esconde os links diretos para 12 Histórias (`catalogo.js` e `concursos.js`)
- **Diagnóstico:**
  1. Em `catalogo.js` (linhas 62–77), `journeyMaps` mapeia todas as 41 histórias para um infográfico, e `topicMap(t)` retorna `t.infographic || observedMap[t.id] || topicSpecific[t.id] || journeyMaps[t.journey] || null`.
  2. Na linha 77 de `catalogo.js`:
     ```js
     ${topicMap(t)?`<button type="button" data-infographic="${e(topicMap(t))}">Ver mapa relacionado →</button>`:t.journey?`<button type="button" data-journey="${e(t.journey)}">Ver fundamentos relacionados →</button>`:'<small>Explicação em preparação</small>'}
     ```
     Como `topicMap(t)` é **sempre verdadeiro** quando `t.journey` existe, o segundo ramo (`data-journey`) é **100% código morto**!
  3. Por causa disso, na tela de uma matéria (`#view-materia`), o estudante nunca vê o botão para abrir a história específica de um subtópico (`t.journey`) — e **12 histórias** (`info_documentos`, `mat_razao`, `logic_conjuntos`, `port_acentos`, `port_sujeito`, `port_verbos`, `adm_atendimento`, `adm_reunioes`, `adm_eventos`, `adm_latim`, `mat_geometria`, `mat_combinatoria`) jamais aparecem como `data-journey` em nenhuma página de matéria do catálogo!
  4. Além disso, em `concursos.js` (linhas 19 e 118), o tópico `TOPIC('proporcao', 'Razões, proporções, regra de três, porcentagem e juros', 'mat_porcento')` aponta para `'mat_porcento'` em vez de `'mat_razao'`, deixando `mat_razao` sem nenhum tópico associado no catálogo.
- **Como executar:**
  1. Em `concursos.js` (linha 19 e linha 118), altere o `journey` do tópico `proporcao` para `'mat_razao'` (já que porcentagem já é coberta na trilha e `mat_razao` foi criada especificamente para razão e proporção).
  2. Em `catalogo.js` (linha 77), exiba **ambos os botões** em cada `.topic-entry` quando disponíveis (ex.: um botão `data-journey="${e(t.journey)}"` com texto `"História do zero"` e o botão `data-infographic="${e(topicMap(t))}"` com texto `"Ver mapa relacionado →"`), mantendo a compatibilidade com as asserções de `verificar.cjs` (atenção às linhas 56–57 e 61–62 de `verificar.cjs`, que verificam `includes(\`${topic}</span><button type="button" data-infographic="${map}"\`)` — portanto, coloque o botão `data-infographic` imediatamente após `<span>${e(t.name)}</span>` e o botão `data-journey` logo depois dele!).
  3. Estilize `.topic-entry` em `catalogo.css` para acomodar os dois botões com elegância em desktop e mobile.

#### Tarefa P0.3: Corrigir Concursos Personalizados (`makeCustom` em `app.js` e `catalogo.js`)
- **Diagnóstico:**
  1. Em `app.js` (linhas 22–30), a função `makeCustom(data)` cria matérias com `{id: \`manual-${i}\`, name, count: null, topics: base.topics, journey: base.journey}`, **esquecendo de copiar `worked: base.worked`**. Assim, matérias de concursos adicionados pelo usuário ficam sem a seção `"Entendendo o raciocínio"`.
  2. O mapeamento por palavras-chave em `makeCustom` (linha 27) não reconhece termos comuns como `administracao`, `arquivologia`, `contabilidade`, `orcamento`, `afo`, `ingles`, `etica`, `auditoria`, caindo sempre no fallback de Português (`provisionalSubjects[0]`).
  3. Não existe botão na interface para **excluir** um concurso personalizado salvo em `localStorage['memoria-viva-concursos-proprios-v1']`.
- **Como executar:**
  1. Em `app.js` (`makeCustom`), inclua `worked: base.worked` no retorno de `subjectOf`, e amplie o classificador de palavras-chave para reconhecer Administração/Arquivologia (`adm_redacao`), Contabilidade (`adm_patrimonio`), AFO/Orçamento (`afo_orcamento`), Inglês (`ingles_leitura`) e Ética/Auditoria/Licitações (`etica_servico`).
  2. Em `catalogo.js` (`Catalog.contest` e/ou `Catalog.catalog`), quando `c.manual === true`, exiba um botão `<button type="button" class="button button-quiet" data-delete-contest="${e(c.id)}">Remover este concurso personalizado</button>` e trate o clique em `app.js` removendo de `customRaw`, `CONTESTS` e `localStorage`.

#### Tarefa P0.4: Criar Infográfico de Hardware e Sistemas Operacionais e corrigir `journeyMaps.info_hardware`
- **Diagnóstico:** Em `catalogo.js` (linha 68), `info_hardware` está mapeado para `'planilhas-mapa'`, e `topicSpecific` de `informatica` (linha 71) mapeia `hardware: 'planilhas-mapa'` porque a área `'Informática'` em `INFOGRAPHICS` só possui 2 mapas (`planilhas-mapa` e `seguranca-mapa`), faltando mapas para **Hardware e Periféricos**, **Sistemas Operacionais (Windows/Linux) e Arquivos** e **Editores de Texto (Word/Writer)**.
- **Como executar:**
  1. Adicione 2 ou 3 novos infográficos na área `'Informática'` (ex.: `hardware-dispositivos` ligado a `beginner: 'info_hardware'`, e `word-documentos` ligado a `beginner: 'info_documentos'`).
  2. Atualize `journeyMaps` e `topicSpecific` em `catalogo.js` para apontar `info_hardware` → `'hardware-dispositivos'` e `info_documentos` / `word` → `'word-documentos'`.
  3. Atualize a contagem de `INFOGRAPHICS.length` em `verificar.cjs` (linha 44) e em `PESQUISA.md`.

#### Tarefa P0.5: Preencher `scoring` real nas provas históricas `natal-camara-2023` e `sao-agente-2021` (`provas.js`)
- **Diagnóstico:** Em `provas.js` (linhas 309–310), `natal-camara-2023` (FUNCERN, múltipla escolha de 4 alternativas A–D, sem desconto por erro) e `sao-agente-2021` (IBFC, múltipla escolha de 4 alternativas A–D, sem desconto por erro) estão com `scoring: {type: 'unknown'}`.
- **Como executar:** Atualize ambos em `provas.js` para `scoring: {type: 'multiple', options: 4, correct: 1, wrong: 0, blank: 0}`.

---

### PRIORIDADE 1 (P1) — Expansão Visual e Ilustrações SVG Específicas (`ilustracoes.js`)

#### Tarefa P1.1: Desenhar Cenas SVG Específicas para as 31 Histórias Gerais (`Art.scene` em `ilustracoes.js`)
- **Diagnóstico:**
  Em `ilustracoes.js` (linhas 111–120), o objeto `dispatch` só possui funções de desenho específicas para as **8 histórias originais de TI** (`sql`, `java`, `engenharia`, `web`, `seguranca`, `infra`, `gestao`, `dados`), além de grades simples para `mat_frac` e `mat_porcento`.
  As outras **31 histórias (155 das 208 cenas)** caem todas no mesmo desenho genérico: Lia parada à esquerda apontando para uma folha retangular com o título fixo `"Vamos enxergar juntos"` e 3 linhas de texto de `step.visual`.
- **Como executar:**
  Criar funções visuais parametrizadas em `ilustracoes.js` (mantendo o estilo traço `#293448` + cores pastéis + animações `.scene-enter`, `.scene-move`, `.scene-line`, `.scene-bar`) para os grupos de histórias:
  1. **Matemática e Lógica (`logic_proposicoes`, `logic_conjuntos`, `mat_probabilidade`, `mat_media`, `mat_razao`, `mat_equacoes`, `mat_geometria`, `mat_combinatoria`):**
     - `logic_conjuntos`: Diagrama de Venn animado com dois círculos (`Conjunto A` e `Conjunto B`) destacando interseção (`A ∩ B`), união (`A ∪ B`) e diferença (`A − B`) conforme `index`.
     - `logic_proposicoes`: Cartões de proposições `P` e `Q` com chaves/portas lógicas (`~P`, `P ∧ Q`, `P ∨ Q`, `P → Q`) e indicadores visuais de Verdadeiro/Falso.
     - `mat_equacoes`: Uma balança de dois pratos em equilíbrio (`x + 3` de um lado, `7` do outro) mostrando pesos sendo retirados igualmente dos dois lados.
     - `mat_geometria`: Canteiro retangular com contorno tracejado animado (perímetro), malha quadriculada interna 3×4 (área), plano cartesiano com eixos X/Y e reta ligando A(−3, 2) a B(5, −4), e barras dobrando em PG (10, 20, 40, 80).
     - `mat_probabilidade`: Saquinho/urna transparente com 1 bolinha azul e 3 amarelas, mostrando o sorteio e a retirada sem reposição.
     - `mat_media` e `mat_razao`: Barras nivelando alturas (média = 5) e colheres/porções multiplicando proporcionalmente.
     - `mat_combinatoria`: Árvore de possibilidades (3 camisas × 2 calças), relógios/ciclos sincronizando no MMC(4, 6) = 12 e grade matricial 2×3 com destaque de linha/coluna.
  2. **Português e Inglês (`port_texto`, `port_pontuacao`, `port_concordancia`, `port_crase`, `port_acentos`, `port_sujeito`, `port_verbos`, `ingles_leitura`):**
     - `port_crase`: Dois blocos/círculos (`preposição a` + `artigo a`) se movendo um em direção ao outro (`scene-move`) e fundindo-se em `à` com brilho (`sparkle`).
     - `port_acentos`: Blocos de sílabas (`ca` + `FÉ`, `LI` + `vro`, `MÚ` + `si` + `ca`) onde a sílaba tônica fica mais alta/destacada na posição última, penúltima ou antepenúltima.
     - `port_verbos`: Linha do tempo horizontal (`Ontem / Pretérito` → `Hoje / Presente` → `Amanhã / Futuro`) e bifurcação condicional (`Se Lia estudar...`).
     - `port_sujeito`, `port_concordancia`, `port_pontuacao`, `port_texto`, `ingles_leitura`: Placas, lupas sobre pistas do texto, setas curvas conectando pronomes (`Ela`, `It`) ao referente (`Lia`, `The system`) e balões de diálogo com vocativo/citação.
  3. **Informática (`info_hardware`, `info_arquivos`, `info_planilhas`, `info_documentos`):**
     - `info_hardware`: Teclado/mouse enviando sinais (`scene-move`) para o gabinete/CPU, tela/impressora recebendo saída, bancada rápida (RAM) vs. cofre persistente (SSD + Backup).
     - `info_arquivos`: Árvore visual de pastas (`Estudos/relatorio.docx`) e animação diferenciando Copiar (duplicar arquivo) de Mover (deslocar arquivo).
     - `info_planilhas`: Grade real de planilha com colunas `A, B` e linhas `1, 2, 3`, destacando `A2`, intervalo `A1:A3` e barra de fórmula `=SE(A1>=7;"Aprovado";"Revisar")`.
     - `info_documentos`: Página de documento mostrando `Título 1` gerando automaticamente as linhas do `Sumário` com pontilhados e número de página.
  4. **Direito, Administração e AFO (`const_fundamentos`, `penal_fundamentos`, `legis_especial`, `etica_servico`, `afo_orcamento`, `adm_*`):**
     - `const_fundamentos`: Pirâmide/estrutura constitucional, os 3 Poderes em equilíbrio harmônico e mapa federativo (União · RN · Município).
     - `afo_orcamento`: Fluxo encadeado `PPA (4 anos) → LDO → LOA` e os 3 estágios da despesa com carimbos sequenciais (`1. Empenho → 2. Liquidação → 3. Pagamento`).
     - `adm_patrimonio`: Balanço patrimonial visual em duas colunas (`Ativo: R$ 3.000` = `Passivo: R$ 800` + `Patrimônio Líquido: R$ 2.200`).
     - **Regra de ouro ao editar `Art.scene`:** Garantir que nenhum SVG contenha `NaN`, `Infinity`, `undefined`, `<script` ou `onclick=`, e que todos mantenham `<title>` e `<desc>` para passar em `node verificar.cjs`.

#### Tarefa P1.2: Enriquecer `Art.mindMap()` para as 33 Histórias Gerais e reexportar `mapas-ilustrados/*.svg`
- **Diagnóstico:** Em `ilustracoes.js` (linhas 130–168), `sketches` só define ícones variados por ramo para as 8 histórias de TI. Nas outras 33 histórias, todos os 5 ramos do mapa mental repetem exatamente o mesmo ícone!
- **Como executar:**
  1. Em `Art.mindMap`, defina uma rotação de mini-ilustrações contextualizadas por ramo para as demais histórias (ou selecione ícones variados conforme o índice `i` e a categoria da história: `notebook`, `ticket`, `device`, `lock`, `bars`, `check`, `cycle`, `symbol(...)`).
  2. Execute `node verificar.cjs --export` para atualizar todos os 41 arquivos SVG em `mapas-ilustrados/`.

#### Tarefa P1.3: Expandir Botões Interativos de Cena (`#scene-actions` em `app.js` e `ilustracoes.js`)
- **Diagnóstico:** Atualmente, apenas a história `sql` (cenas 1, 4 e 5) exibe botões interativos abaixo da ilustração (`Destacar uma linha` / `Destacar uma coluna`, `Destacar Ana` / `Destacar Caio`).
- **Como executar:**
  Adicionar ações interativas (`sceneActions()` em `app.js` passando `state.focus` para `Art.scene`) em pelo menos mais 5 histórias-chave:
  - `logic_conjuntos` (cena 2/3): alternar destaque entre `Interseção (A ∩ B)`, `União (A ∪ B)` e `Diferença (A − B)`.
  - `logic_proposicoes` (cena 4): alternar teste da condicional `P → Q` entre `Chove e rua molhada (V)` e `Chove e rua seca (F — único caso falso)`.
  - `info_planilhas` (cena 2/3): alternar entre `=SOMA(A1:A3) [intervalo = 60]` e `=SOMA(A1;A3) [isoladas = 40]`.
  - `afo_orcamento` (cena 3): destacar cada estágio da despesa (`1. Empenho`, `2. Liquidação`, `3. Pagamento`).

---

### PRIORIDADE 2 (P2) — Usabilidade (UX), Busca Global, Filtros e Persistência de Estado

#### Tarefa P2.1: Agrupamento por Área e Busca Rápida na Barra de 41 Histórias (`#topic-rail`)
- **Diagnóstico:** Na aba `Aprender` (`#view-historia` / `#view-mapa`), `#topic-rail` renderiza **41 botões em uma única faixa horizontal** (`overflow-x: auto`). Encontrar a história 35 ou 41 exige rolar horizontalmente por dezenas de itens, sem filtro por disciplina nem busca por texto.
- **Como executar:**
  1. Adicione uma propriedade `area` (ou deduza pela categoria/prefixo do `id`: `'Tecnologia'`, `'Português e Inglês'`, `'Matemática e lógica'`, `'Informática'`, `'Direito'`, `'Administração e AFO'`) em cada item de `JOURNEYS`.
  2. Em `index.template.html` (dentro de `.library`), adicione uma barra de filtros por área (com botão `'Todas'` ativo por padrão) e um campo `<input type="search" id="journey-search" placeholder="Buscar história ou conceito...">` para filtrar `#topic-rail` instantaneamente.
  3. Garanta que, quando `'Todas'` estiver selecionado e a busca vazia, todas as 41 histórias continuem presentes em `#topic-rail`.

#### Tarefa P2.2: Busca Instantânea na Aba de Infográficos (`#view-infograficos`) e Concursos (`#view-concursos`)
- **Diagnóstico:** Com 53 infográficos em `#view-infograficos`, mesmo filtrando por área (ex.: 13 em Português, 13 em Tecnologia), o usuário não consegue pesquisar por uma palavra contida dentro dos blocos (ex.: `"Liskov"`, `"3FN"`, `"habeas corpus"`, `"inexigibilidade"`, `"ARO"`, `"crase"`).
- **Como executar:**
  1. Em `InfographicUI.render(id, area, query='')`, adicione um campo de busca textual que filtre `INFOGRAPHICS` pelo título, subtítulo, definição, resumos dos grupos e notas.
  2. Mantenha a assinatura padrão `InfographicUI.render(id, area='Todas')` intacta para não quebrar `verificar.cjs` (linhas 51–52).

#### Tarefa P2.3: Persistência do Infográfico Ativo e Deep-Linking por Hash
- **Diagnóstico:**
  1. Em `app.js` (linha 139), `activeInfographic` e `activeInfoArea` são variáveis locais em memória. Se o estudante estiver lendo o mapa `orcamento-publico-afo` em `#infograficos` e recarregar a página (F5), a tela volta sempre para `leitura-texto` (`Português`).
  2. O mesmo vale se o usuário quiser compartilhar ou salvar o link direto de um concurso, matéria, história ou mapa.
- **Como executar:**
  1. Salve `activeInfographic` e `activeInfoArea` em `sessionStorage['memoria-viva-selecao']` (junto com `contest` e `subject`).
  2. Suporte sub-rotas opcionais no `location.hash` (ex.: `#historia/sql`, `#infograficos/formas-normais`, `#concurso/cgu-dev-2026`, `#materia/cgu-dev-2026/persistencia`) em `setView` / `hashchange`, mantendo compatibilidade total com os hashes simples (`#concursos`, `#historia`, `#mapa`, `#infograficos`, `#revisao`, `#estrategia`, `#fontes`).

#### Tarefa P2.4: Corrigir Conflito de `@media print` ao usar `Ctrl+P` fora da aba de Mapas (`estilo.css`, `infograficos.css`, `app.js`)
- **Diagnóstico:**
  Em `estilo.css` (linha 7), a regra global `@media print` oculta `#view-historia` e força `#view-mapa { display: block !important }`, mas **não oculta** `#view-concursos`, `#view-concurso`, `#view-materia`, `#view-estrategia`, `#view-revisao` nem `#view-infograficos` quando `body.print-infographic` não está presente!
  Se o usuário apertar `Ctrl+P` pelo teclado enquanto estiver vendo um Infográfico, uma Matéria ou a aba Estratégia, a impressão sai quebrada (misturando a view atual com `#view-mapa`).
- **Como executar:**
  1. Em `app.js`, adicione um listener `window.addEventListener('beforeprint', ...)` que:
     - Se `state.view === 'infograficos'`, adicione automaticamente `document.body.classList.add('print-infographic')`.
     - Se `state.view === 'historia'`, renderize o mapa mental correspondente (`renderMap()`) para que a impressão do mapa SVG nunca saia vazia.
     - Para as demais views (`concurso`, `materia`, `estrategia`, `revisao`), adicione uma classe `document.body.classList.add('print-current-view')` que imprima de forma limpa apenas a `<section class="view">` visível no momento, ocultando cabeçalho, rodapé e `#view-mapa`.

---

### PRIORIDADE 3 (P3) — Evolução Pedagógica: Resgatando o Melhor da `v1/` como Fase 3 Opcional

Na transição da `v1/` para a `v2`, os exercícios e o laboratório interativo foram retirados para que o iniciante não sofresse ansiedade de avaliação antes da explicação. Porém, a própria aba `#view-estrategia` e `LEARNING_SOURCES` ensinam que **após** compreender a base e os exemplos resolvidos, a **Recuperação Ativa (Karpicke & Blunt, 2011; Roediger & Karpicke, 2006)** e a **Prática Intercalada (Rohrer et al., 2014)** são as técnicas mais eficazes para retenção de longo prazo!

#### Tarefa P3.1: Modo "Tentar Lembrar sem Consultar" (Active Recall Toggle) nos Infográficos (`#view-infograficos`)
- **Diagnóstico:** Na `v1/`, os mapas possuíam um botão `"Tente sem consultar"` que ocultava os detalhes dos ramos para o estudante testar se conseguia lembrar os pontos-chave antes de revelar. Na `v2/`, os 53 infográficos são 100% passivos (tudo visível o tempo todo).
- **Como executar:**
  1. Na `.inf-toolbar` de `infografico-ui.js`, adicione um botão opcional `<button type="button" data-toggle-recall aria-pressed="false">Ocultar pistas para testar memória</button>`.
  2. Quando ativado (`body.inf-recall-mode` ou classe na `.infographic-sheet`), aplique um efeito de desfoque/máscara elegante (`.inf-group ul, .inf-group details, .inf-mini-table { filter: blur(6px); user-select: none; }`) deixando visíveis apenas os títulos e o resumo de cada cartão (`.inf-group-title`), permitindo que o estudante clique em cada cartão (`.inf-group`) individualmente para revelar (`.revealed`) após tentar explicar mentalmente!

#### Tarefa P3.2: Incorporar Mini-Laboratórios Interativos (começando pelo Laboratório de SQL JOIN da `v1/`)
- **Diagnóstico:** A `v1/app.js` (linhas 4–20 e 240–250) já possui o código pronto, testado e validado do `StudyCore.joinRows(kind)` com visualização interativa de `INNER`, `LEFT`, `RIGHT` e `FULL JOIN` entre `Clientes (Ana, Bia, Caio)` e `Pedidos (101, 102, 103, 104)`.
- **Como executar:**
  1. Incorpore o laboratório interativo de `INNER / LEFT / RIGHT / FULL JOIN` ao final do infográfico `sql-linguagens` (ou na cena 5/6 da história `sql`), permitindo testar os 4 tipos de junção ao vivo.
  2. Opcionalmente, adicione mini-simuladores equivalentes para:
     - **Tabela-Verdade Interativa** no infográfico `proposicoes-mapa` (botões para alternar `P` entre V/F e `Q` entre V/F, mostrando em tempo real o valor de `~P`, `P ∧ Q`, `P ∨ Q`, `P → Q` e `P ↔ Q`).
     - **Simulador de Planilha (`SE` / `MÉDIA` / `SOMA` com `:` vs `;`)** no infográfico `planilhas-mapa`.

#### Tarefa P3.3: Sugestão Opcional de Intervalos Espaçados na Aba de Revisão (`revisao.js`)
- **Diagnóstico:** Em `revisao.js`, o estudante precisa clicar em `<input type="date">` e escolher manualmente uma data no calendário toda vez que agenda uma revisão. Embora a liberdade de escolha deva ser mantida, atalhos rápidos facilitam muito o uso em celulares.
- **Como executar:**
  1. Em `ReviewUI.render` (`revisao.js`), ao lado do `<input type="date">`, adicione botões rápidos de sugestão (`+1 dia`, `+3 dias`, `+7 dias`, `+15 dias`) que preenchem e salvam a data com um único toque, mantendo o `<input type="date">` livre para qualquer outra data.

---

### PRIORIDADE 4 (P4) — Expansão de Conteúdo e Provas Reais

#### Tarefa P4.1: Detalhar os Programas Completos dos Concursos com Base Provisória (`concursos.js`)
- **Diagnóstico:**
  Em `concursos.js` (linhas 100–106), os concursos:
  - `nisia-guarda` (já foi detalhado nas linhas 138–143, mas os tópicos de `direito-legislacao` usam apenas 1 tópico genérico `'leis'` para toda a legislação especial, enquanto `parnamirim-guarda-2024` detalha todas as 10 leis individualmente).
  - `sao-goncalo` (Comissão 2025), `natal-sttu` e `parnamirim-futuro` usam `provisionalSubjects` (apenas 3 matérias genéricas: Português, Matemática, Informática). Embora sejam concursos sem edital publicado, é possível enriquecer a nota e oferecer trilhas opcionais de Direito Constitucional/Administrativo e Conhecimentos Específicos baseadas nas últimas provas desses órgãos (como `sao-agente-2021`).

#### Tarefa P4.2: Adicionar Novas Provas Reais Analisadas (`provas.js`)
- **Diagnóstico:** Atualmente existem 6 provas completas analisadas (350 questões).
- **Como executar:**
  Para expandir a base empírica mantendo as invariantes de `verificar.cjs` (linhas 38–42):
  1. Ao adicionar qualquer prova em `provas.js` e incluí-la na lista de verificação de `verificar.cjs`:
     - A soma de `s.count` de todas as matérias do concurso **deve ser exatamente igual** a `c.evidence.total`.
     - Em cada matéria `s`, `s.observed.flatMap(o => o.questions)` deve ter tamanho igual a `s.count`, sem números duplicados.
     - A união de todas as questões de todas as matérias da prova deve conter todos os inteiros de `1` até `c.evidence.total` sem lacunas nem sobreposições.
     - Toda matéria deve ter `s.journey` válido e pelo menos 1 item em `s.worked` com `ex.lesson` válido.

---

### PRIORIDADE 5 (P5) — Arquitetura, Build e Higiene do Repositório

#### Tarefa P5.1: Isolar Escopo entre Módulos e Suportar Build via Node.js (`build.py` / `verificar.cjs`)
- **Diagnóstico:**
  1. `index.template.html` injeta 15 arquivos JS em tags `<script>` separadas no escopo global. Constantes auxiliares como `purple`, `blue`, `green`, `orange`, `rose` (em `infograficos-gerais.js` linha 7) ficam no escopo global e são reutilizadas implicitamente por `infograficos-ti-extra.js`, `infograficos-matematica-extra.js`, `infograficos-portugues-extra.js` e `infograficos-administracao.js`.
  2. O build depende de Python (`python build.py`), embora os testes rodem em Node.js (`node verificar.cjs`).
- **Como executar:**
  1. Adicione a flag `--build` em `verificar.cjs` (ou crie `build.cjs`) usando substituição literal (`template.replace(marker, () => fs.readFileSync(filename, 'utf8'))` — **atenção:** sempre use função `() => ...` no segundo argumento de `.replace()` em JavaScript para evitar que padrões como `$&` ou `$$` no código-fonte corrompam o HTML gerado!).
  2. Atualize `iniciar-app.bat` para usar `node verificar.cjs --build` como fallback caso `python` não esteja instalado na máquina.

---

## PARTE 3 — PROTOCOLO DE EXECUÇÃO E VERIFICAÇÃO PARA A OUTRA IA

Sempre que qualquer IA for modificar ou expandir este projeto, ela **DEVE** seguir este protocolo rigoroso:

### 1. Regras e Invariantes Obrigatórias (Testadas por `verificar.cjs`)
1. **41+ Histórias (`JOURNEYS`) e 208+ Cenas:**
   - Todo `topic.id` deve ser único.
   - Todo `step.id` dentro de uma história deve ser único.
   - Todo `step` deve possuir strings não vazias em: `title`, `map`, `speech`, `explain`, `observe`, `term`, `meaning`, `remember`.
   - `Art.scene(topic, index)` não pode conter `NaN`, `Infinity`, `undefined`, `<script` ou `onclick=`, e deve conter `<title>` e `<desc>`.
   - `Art.mindMap(topic, true)` deve ter exatamente `topic.steps.length` ocorrências de `data-map-step=`.
   - `Art.mindMap(topic, false)` não pode conter `data-map-step=` nem `"Toque em um ramo"`.
2. **53+ Infográficos (`INFOGRAPHICS`):**
   - Todo `m.id` deve ser único.
   - `m.beginner` deve ser um `id` válido existente em `JOURNEYS`.
   - `m.area` deve pertencer a `['Português', 'Matemática e lógica', 'Direito', 'Administração', 'Informática', 'Tecnologia']`.
   - `m.groups.length >= 3` e `m.sources.length >= 2`, com URLs `http:` ou `https:` válidas em `ContestCore.validSource(url)`.
3. **14+ Concursos (`CONTESTS`):**
   - Todo concurso deve ter `ContestCore.validSource(c.source)` válido.
   - Toda matéria `s` deve ter `s.journey` válido em `JOURNEYS` e `s.worked.length >= 1` com `ex.lesson` válido em `JOURNEYS`.
   - Todo tópico `t` dentro de `s.topics` deve ter `t.journey` válido em `JOURNEYS` e, se tiver `t.infographic`, deve existir em `INFOGRAPHICS`.
   - Nenhuma página renderizada por `Catalog.subject(c, s)` pode conter as strings `"Introdução em preparação"` ou `"Explicação em preparação"`, e todas devem conter `"Entendendo o raciocínio"`.
4. **Atualização dos Contadores em `verificar.cjs`:**
   - Linhas 6–7 de `verificar.cjs` têm `assert.equal(JOURNEYS.length, 41)` e `assert.equal(JOURNEYS.reduce((n,topic)=>n+topic.steps.length,0), 208)`.
   - Linha 44 de `verificar.cjs` tem `assert.equal(INFOGRAPHICS.length, 53)`.
   - Se novas histórias, cenas ou infográficos forem adicionados, atualize esses números em `verificar.cjs` e em `PESQUISA.md`.

### 2. Comandos de Verificação e Build (Executar após cada alteração)
```powershell
# 1. Executar suíte de testes e exportar mapas SVG atualizados:
node verificar.cjs --export

# 2. Regerar o pacote autônomo dist/index.html:
python build.py
```

### 3. Ordem Recomendada de Execução para a Próxima IA
1. **Passo 1:** Executar **P0.1, P0.2, P0.3, P0.4 e P0.5** (correção de ícones em `Art.symbol`, exibição de links diretos para histórias nos tópicos de `Catalog.subject`, melhoria de concursos personalizados, criação dos infográficos de Informática Básica e ajuste de `scoring`).
2. **Passo 2:** Executar **P1.1, P1.2 e P1.3** (criação das ilustrações SVG específicas por cena em `ilustracoes.js` para as 31 histórias gerais, mini-sketches nos mapas mentais e novas ações interativas `#scene-actions`).
3. **Passo 3:** Executar **P2.1, P2.2, P2.3 e P2.4** (filtros por área e busca em `#topic-rail` e `#view-infograficos`, persistência de estado/hash e correção de `@media print`).
4. **Passo 4:** Executar **P3.1, P3.2 e P3.3** (modo de ocultação de pistas para recuperação ativa nos infográficos, laboratório interativo de SQL JOIN / Tabela-Verdade e botões rápidos de agendamento na Revisão).
5. **Passo 5:** Executar **P5.1**, rodar `node verificar.cjs --export` e `python build.py`, e atualizar `PESQUISA.md`.
