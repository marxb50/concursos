# Pesquisa para o visual global e a aba Atividades

Data: 29/10/2026. Etapa: pesquisa concluída; implementação aguardando o próximo comando do usuário.

Recomendação: transformar o Memória Viva em uma **central de missões de estudo**, com a linguagem de quadrinhos e painel tecnológico da imagem enviada. Cada concurso terá sua campanha; cada matéria terá missões ordenadas por evidência de cobrança e importância na prova. Resolver, montar, investigar e explicar serão as ações centrais dos jogos.

Este documento contém análise, referências e decisões propostas. Nenhuma tela, áudio, regra de pontuação ou publicação do aplicativo foi alterada nesta etapa.

## 1. Escopo encontrado no projeto

O inventário dos arquivos de conteúdo, carregados na ordem do manifesto, encontrou:

| Objeto | Quantidade | O que significa |
|---|---:|---|
| Concursos cadastrados | 15 | Inclui provas históricas, editais e preparações provisórias |
| Entradas de matérias por concurso | 85 | Uma mesma disciplina aparece em vários concursos com programas diferentes |
| Posições de tópicos | 509 | Há repetição de conceitos entre concursos; não são 509 conceitos únicos |
| Cadernos classificados no cadastro | 7 | Inclui um caderno da tarde da CGU, sem representar todas as etapas daquele concurso |
| Questões com classificação temática | 390 | Classificação não equivale a banco de questões com enunciado, alternativas e gabarito validado |

Já existem 41 histórias, 56 infográficos, laboratórios e a professora com áudio. Esses recursos podem sustentar a explicação, as dicas e a revisão das missões. As explicações atuais são introdutórias e alguns programas estão resumidos: vincular uma aula a um tópico não prova cobertura completa desse tópico.

A lista integral das 85 entradas, seus 509 tópicos e a ordenação descritiva das frequências já cadastradas está em [MAPA_DE_COBERTURA.md](MAPA_DE_COBERTURA.md). O [INVENTARIO_CONCURSOS.json](INVENTARIO_CONCURSOS.json) preserva identificadores, fontes, questões classificadas e hashes dos arquivos do aplicativo para a continuidade.

## 2. Leitura da imagem e direção visual

A referência enviada apresenta azul-petróleo, linhas de circuito em ciano, molduras com cantos recortados, contornos escuros, coral, verde-menta, amarelo e títulos fortes. Os botões parecem peças de um painel. Essa é a referência principal para a aplicação inteira.

O vínculo com Homem-Aranha foi informado pelo usuário; a imagem, isoladamente, não permite identificar um aplicativo oficial ou uma cena específica. Como referência complementar de produção, a entrevista da Foundry com a equipe de Sony Pictures Imageworks documenta retículas, hachuras, contornos e deslocamento de cores usados em *Into the Spider-Verse*. Isso sustenta uma linguagem de quadrinhos, sem definir que o painel enviado veio daquele filme. [Fonte: Foundry / equipe de Imageworks](https://www.foundry.com/insights/film-tv/graphic-look-in-comp-spiderman).

Direção proposta:

| Elemento | Tratamento proposto |
|---|---|
| Fundo | Azul-petróleo com circuitos discretos nas margens; superfície de leitura limpa |
| Painéis | Molduras recortadas, borda escura e pequenos detalhes em ciano/coral |
| Tipografia | Títulos expressivos; corpo simples e legível; efeitos de contorno apenas em títulos curtos |
| Paleta inicial | Fundo #063D52, painel #07516A, ciano #35D9E8, coral #FF737B, menta #60E6B5, amarelo #FFE477; valores propostos, sujeitos a contraste |
| Ações | Menta para iniciar/continuar; coral claro para Professor; rótulo e ícone em todos os botões |
| Estado | Texto e símbolo junto à cor: “nova”, “em treino”, “revisar”, “concluída” |
| Movimento | Resposta curta ao toque, conexões acendendo e conclusão de missão; leitura permanece estável |
| Mapas mentais | Nós com a mesma moldura, ligações claras e zoom; elementos técnicos mantêm símbolos convencionais |
| Som | Controles separados para professora e efeitos; áudio inicia por ação do usuário |

Aplicar a linguagem às nove áreas existentes — concursos, detalhe do concurso, matéria, histórias, mapas, infográficos, revisão, estratégia e fontes — e à nova aba Atividades. Incluir também menus, busca, formulários, estados vazios, mensagens de erro, figuras ampliadas e painel da professora. A versão para impressão terá fundo claro para manter legibilidade e economia de tinta.

No celular, missão em uma coluna e ações principais próximas do polegar. No computador, espaço para mapa da campanha e atividade lado a lado. As atividades conservarão a mesma regra nos dois dispositivos. Arrastar peças terá alternativa por toque e teclado, conforme orientação do W3C; movimentos decorativos poderão ser desativados. [Arrastar: WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html), [movimento: W3C](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html).

## 3. Referências internacionais e o que aproveitar

Foram consultadas páginas dos próprios produtos e documentos de seus responsáveis. As observações são documentais; não foi realizada uma avaliação jogável de todas as plataformas. As adaptações da última coluna são propostas para este projeto, não funcionalidades atribuídas às referências.

| Referência | O que a fonte apresenta | Aplicação proposta |
|---|---|---|
| [DragonBox Algebra](https://www.dragonboxapp.com/products/algebra-5) | Cartas com desenhos dão lugar gradualmente a números e variáveis; feedback imediato sobre as operações | Manipular uma balança e liberar uma passagem ao resolver equações; terminar com a notação de prova |
| [Brilliant](https://brilliant.org/faq/) | Problemas interativos, modelos visuais, feedback e orientação por etapas | Investigar um gráfico, montar uma tabela-verdade e testar uma fórmula com consequência visível |
| [CodeCombat](https://codecombat.com/about) | Aprender programação escrevendo código dentro da experiência de jogo | Montar comandos, prever saídas e corrigir erros para cumprir uma missão técnica |
| [Duolingo](https://blog.duolingo.com/new-duolingo-home-screen-design/?region=central-and-eastern-europe) | Uma trilha organiza a progressão e o retorno aos conteúdos | Próxima missão clara, percurso por matéria e revisões incorporadas ao caminho |
| [Gimkit Creative](https://docs.creative.gimkit.com/building/devices/device-list/questioner) | Perguntas podem conceder itens, gerar mensagens e compor salas de escape com vários conjuntos | Desbloquear setores ao justificar respostas; desafios finais combinam conceitos de uma unidade |
| [Kahoot!](https://support.kahoot.com/hc/en-us/articles/115002303908-How-points-work) | Pontuação configurável, incluindo modos que consideram velocidade e modo de precisão | Rodadas curtas para revisão; priorizar precisão no treino e deixar tempo para o modo simulado |
| [Minecraft Education](https://education.minecraft.net/en-us/resources/explore-lessons) | Biblioteca de experiências e percursos alinhados a objetivos de várias disciplinas | Situações contextualizadas: atender cidadão, organizar serviço, investigar falha e explicar uma decisão |

Uma referência humana especialmente alinhada ao pedido é o professor **Jean-Baptiste Huynh**, que fundou a empresa responsável pelo DragonBox com **Patrick Marchal**, doutor em ciência cognitiva. A história oficial descreve criação com designers e especialistas em aprendizagem, seguida de testes com usuários. A adaptação importante aqui é testar se a ação do jogo ensina o conceito e se a pessoa consegue depois responder em formato de prova. [História do DragonBox](https://www.dragonbox.com/about/story-story).

A combinação recomendada é: interações conceituais de DragonBox/Brilliant, ação contextual de CodeCombat, organização de percurso do Duolingo e missões encadeadas do Gimkit. O público deste aplicativo é de preparação para concursos: a apresentação pode ser divertida sem adotar linguagem infantil.

## 4. O que a evidência de aprendizagem permite propor

**Tentar lembrar antes de revelar.** Karpicke e Roediger compararam formas de estudo de vocabulário e encontraram benefício de recuperação repetida na avaliação posterior. Para o aplicativo, a tradução é pedir uma resposta, uma previsão ou uma explicação antes de mostrar a solução. O experimento não mediu aprovação em concursos e não permite prometer memorização universal. [Artigo dos autores, Science, 2008](https://learninglab.psych.purdue.edu/downloads/2008/2008_Karpicke_Roediger_Science.pdf).

**Voltar ao conteúdo em outros momentos.** O Duolingo descreve revisões selecionadas considerando espaçamento e acurácia. Nossa proposta é uma fila de revisões que use desempenho e datas, com intervalos iniciais ajustáveis. Um calendário como 1, 3, 7 e 15 dias é uma heurística inicial, não uma regra cerebral válida para qualquer pessoa. [Explicação da equipe do Duolingo](https://blog.duolingo.com/spaced-repetition-for-learning/).

**Medir aprendizagem além da diversão.** A meta-análise de Sailer e Homner encontrou efeitos positivos médios de gamificação, com variação entre estudos e resultados motivacionais/comportamentais menos estáveis nas análises mais rigorosas. A decisão de projeto é testar retenção e resolução de problemas, além de observar participação. A publicação não prova a eficácia deste aplicativo. [Sailer e Homner, 2020](https://link.springer.com/article/10.1007/s10648-019-09498-w).

Consequências propostas: uma ideia principal por desafio; dica em etapas; explicação específica para o erro; nova tentativa com exemplo diferente; recuperação posterior sem dica; dificuldade crescente; escolha entre prática e simulado. A professora explica o raciocínio quando solicitada e após a resposta, evitando entregar automaticamente a solução enquanto o aluno tenta.

## 5. Como ordenar “o que mais cai” e “o que importa mais”

Haverá dois níveis: **ordem das matérias no concurso** e **ordem dos tópicos dentro da matéria**. Eles precisam de dados diferentes.

1. Conferir cargo, banca, edição, programa e retificações. Um concurso do mesmo município para outro cargo é uma referência separada.
2. Nas matérias, calcular a participação na pontuação máxima da prova objetiva: número de questões × valor do acerto. Guardar também desconto por erro, mínimos e outros blocos/etapas.
3. Nos tópicos, contar questões de provas comparáveis e mostrar a amostra: “6 de 20 questões deste caderno”, por exemplo. Preservar empates.
4. Identificar cada evidência como “edital”, “prova histórica do cargo”, “prova de cargo semelhante” ou “sequência sugerida”. Não converter ausência de dados em frequência zero.
5. Na fila pessoal de treino, considerar revisões vencidas, dificuldades e pré-requisitos, além da prioridade da prova. O aluno poderá consultar a ordem por cobrança independentemente dessa fila.

**Regra recomendada para a primeira versão:** ordenação transparente por pontos oficiais quando conhecidos; frequência observada dentro da matéria quando disponível; sequência pedagógica explicitamente sugerida quando não houver amostra. Evitar uma fórmula única com percentuais arbitrários apresentados como ciência ou previsão.

O rótulo “mais cobrado” deverá sempre informar cargo, período e quantidade de provas analisadas. No acervo atual, as classificações são de cadernos específicos; não sustentam uma previsão universal de cobrança. Matérias pouco frequentes continuarão acessíveis e receberão atividades. Mínimos eliminatórios impedem abandonar uma disciplina de menor peso.

Para ampliar o acervo depois: coletar cadernos e gabaritos definitivos oficiais; identificar anuladas e alterações; não duplicar versões de uma mesma prova; classificar por conceito com critério consistente; registrar amostra por banca/cargo/período. Questões autorais e adaptações pedagógicas receberão identificação própria.

## 6. Conferência documental que afeta a prioridade

Os exemplos abaixo usam os documentos identificados e consultados nesta pesquisa. Antes de implantar o ranking definitivo, será necessário verificar retificações posteriores nas páginas das bancas. As porcentagens são cálculos sobre os pontos máximos da prova objetiva, não chances de cobrança nem participação na nota final de todas as etapas.

| Concurso | Ordem sustentada pelo documento consultado | Fonte e consequência |
|---|---|---|
| Nísia — técnico administrativo | Específicos: 60/120 = 50%; Português: 36/120 = 30%; Lógica e Informática: 12/120 = 10% cada | [Edital 01/2026, itens 14.1–14.6](https://www.diariomunicipal.com.br/femurn/materia/09EA5B55). Todas as questões valem 2; exige mínimo de 50% em cada disciplina |
| Nísia — guarda | Direito/Legislação: 60/90 = 66,7%; Português: 18/90 = 20%; Matemática e Informática: 6/90 = 6,7% cada | [Edital 02/2026, itens 14.1–14.6](https://www.diariomunicipal.com.br/femurn/materia/F982933E). Específicos valem 2; básicos 1; mínimo por disciplina |
| Câmara de Natal — suporte, 2023 | Específicos: 60%; Português e Informática: 20% cada | [Edital, item 8.1, página 13 do PDF](https://www.cmnat.rn.gov.br/_ups/transparencia/2023/dom_20230404_f6c771703ed9acd0272d23ea54fc2191.pdf). Referência histórica |
| Câmara de Natal — assistente geral, 2023 | Específicos: 60%; Português e Lógica: 20% cada | Mesmo edital, quadro de nível superior; não confundir com o cargo de suporte |
| São Gonçalo — agente administrativo, prova de 2021 | Português: 27/60 = 45%; Lógica: 21/60 = 35%; Informática: 12/60 = 20% | [Edital 2019 retificado, item 8.1.1, página 17 do PDF](https://fs.ibfc.org.br/arquivos/65856721e966de44c1d6b57c03c8ed06.pdf). Exige 30 pontos e não zerar disciplina |
| ABDI — desenvolvimento de TI, 2026 | Específicos: 13/25 = 52%; Institucionais: 6/25 = 24%; Português: 2,4/25 = 9,6%; Lógica e Informática: 1,8/25 = 7,2% cada | [Edital, itens 9.1–9.2, página 16 do PDF](https://conhecimento.fgv.br/sites/default/files/concursos/edital-01-2026-abertura-do-processo-seletivo-abdi-1.pdf). Valores 0,65 e 0,3 por questão |
| CGU — desenvolvimento, 2026 | P3: 90 × 2 = 180/260 = 69,2%; P1 e P2: 40/260 = 15,4% cada | [Edital, itens 7.1 e 8.11](https://cdn.cebraspe.org.br/concursos/CGU_26_AFFC/arquivos/90B861E07F72AFB1ECB1B3AE8974443779FFF17388907D1F7F5FDB621761295F.html). P3 usa +2/−2; P1/P2 usam +1/−1. Há mínimos por prova e no conjunto |
| Câmara dos Deputados — registro e redação, 2026 | Básicos e específicos: 90 itens cada; +1/−1, portanto empate de pontos máximos por bloco | [Edital, itens 7.1 e 8.11](https://www2.camara.leg.br/transparencia/recursos-humanos/concursos/arquivos-2025/edital-1-analista-legislativo-especialidades). Não dividir arbitrariamente os 90 itens entre matérias |

**Pendências concretas no código atual, apenas registradas nesta etapa:**

- ABDI tem a ponderação descrita na nota do concurso, mas o objeto de pontuação ainda registra acerto uniforme de 1. Corrigir esse desencontro antes de pontuar atividades de prova.
- CGU 2026 também registra +1/−1 uniformemente. O documento consultado diferencia P3 (+2/−2), exigindo modelagem por bloco.
- Nísia e Câmara dos Deputados têm informações oficiais que ainda não estão modeladas integralmente como pontuação e mínimos.
- Os tópicos dos concursos com programa resumido precisam de conferência contra todos os subitens oficiais. O requisito de atividades em todas as matérias não se satisfaz apenas colocando um botão em cada cartão.

Exemplo de ordem de tópicos usando **somente a classificação existente**: no caderno de suporte da Câmara de Natal, os 20 específicos estão agrupados em redes/endereçamento/cabeamento (6), Windows/Linux (5), hardware/memória (3), segurança/backup (3), programação (2) e gestão de serviços (1). Isso permite uma trilha histórica com empate nos dois grupos de 3; não permite afirmar que a próxima prova repetirá essa distribuição. [Caderno oficial cadastrado](https://funcern.br/documents/874/CCMN_04__NM_TECNICO_LEGISLATIVO_TLNM__TECNICO_EM_MANUTENCAO_E_SUPORTE_EM_INFORMATICA.pdf).

Para Parnamirim histórico, Dataprev 2024/2026 e CGU 2022, o mapa anexo preserva o que já foi classificado, sem apresentar uma nova auditoria integral desses cadernos. Para STTU, São Gonçalo em preparação e Parnamirim futuro, os dados locais são provisórios: atividades de fundamentos poderão existir, com prioridade pedagógica e situação do edital explícitas.

## 7. Estrutura proposta para Atividades

Entrada global: **Atividades**. Dentro de cada matéria: botão **Jogar atividades**, já filtrado pelo concurso e matéria. O estado do concurso selecionado permanece ao navegar entre aprender, mapa, atividades e revisão.

```text
ATIVIDADES
  Concurso escolhido
    Próxima missão recomendada — motivo da prioridade
    Matérias — pontos previstos, amostra e progresso
      Tópicos — frequência observada ou sequência sugerida
        Aprender → Praticar → Aplicar → Desafio final → Revisar depois
```

Cartão de missão: título simples, conceito, motivo para estudar agora, duração aproximada, dificuldade, fonte da prioridade, botão Jogar e botão Professor. Duração e dificuldade serão estimativas de projeto até haver testes reais.

A campanha pode ser uma cidade tecnológica cujo funcionamento o estudante recupera. Cada missão tem um problema concreto: uma mensagem ambígua, uma rede interrompida, um cadastro duplicado, um processo fora de ordem. A conclusão melhora uma parte do cenário. A narrativa não deverá ocultar os nomes das disciplinas cobradas.

Uma sessão inicial proposta dura aproximadamente 5–8 minutos e contém 4–6 desafios curtos, ajustáveis depois do piloto. O desafio final reúne conceitos já treinados. Não exige velocidade no modo de aprendizagem; o modo simulado terá regras da prova selecionada.

## 8. Jogos por família de matérias

As propostas abaixo cobrem as famílias encontradas nas 85 entradas. Cada tópico exigirá objetivos, conteúdo e validação próprios; um mesmo formato pode ser reutilizado sem repetir exatamente a mesma pergunta.

| Família | Missão proposta | Ação que ensina |
|---|---|---|
| Português: leitura, semântica e coesão | Detetive do texto | Encontrar a evidência que sustenta uma conclusão, identificar referente e explicar um conectivo |
| Português: sintaxe, crase e pontuação | Oficina de mensagens | Reparar um texto e observar como a alteração muda o sentido; justificar a regra |
| Inglês | Decodificador de documentos | Inferir palavra pelo contexto, ligar trechos e localizar evidências de compreensão |
| Frações, porcentagem, razão e juros | Central de recursos | Distribuir quantidades e comparar cenários; apresentar o cálculo depois da manipulação |
| Equações, funções e sequências | Balança e painel de energia | Aplicar operações equivalentes, completar sequência e prever efeito no gráfico |
| Geometria, estatística e probabilidade | Planejador de rotas | Medir, comparar áreas, interpretar dados e escolher um cálculo adequado |
| Lógica e conjuntos | Circuito lógico | Ativar condições, encontrar contraexemplo e completar tabela-verdade |
| Informática, arquivos e aplicativos | Missão de suporte | Organizar arquivos e escolher ações de editor, navegador, e-mail e sistema operacional |
| Planilhas | Painel de controle | Construir fórmula, observar resultados e corrigir referência relativa/absoluta |
| Constitucional, administrativo, penal e legislação | Sala de casos | Identificar regra, hipótese, competência e exceção em caso fundamentado; conferir fonte e versão |
| Ética, atendimento e transparência | Atendimento ao cidadão | Escolher conduta e justificar consequência com base no conteúdo da matéria |
| Administração, processos, projetos e governança | Central de operações | Ordenar etapas, associar responsabilidades, diagnosticar gargalo e interpretar indicador |
| AFO, auditoria e controle | Investigador de processos | Reconstruir fluxo, ligar evidência a conclusão e localizar falha de controle |
| Banco de dados e SQL | Laboratório de dados | Montar consulta, prever resultado, ligar chaves e eliminar redundância |
| Programação, engenharia e testes | Oficina de sistemas | Prever saída, corrigir trecho, ordenar algoritmo, escrever caso de teste |
| Redes, infraestrutura, nuvem e segurança | Resgate de conexão | Investigar falha, configurar caminho e associar ameaça a controle adequado |
| Dados, IA, atualidades e contexto institucional | Investigador de evidências | Interpretar gráfico, distinguir alegação de evidência e comparar cenários datados |
| Linguística, comunicação, transcrição, política e processo legislativo | Redação e plenário | Organizar fala/transcrição, preservar sentido, reconhecer argumento e ordenar procedimentos |

Para temas jurídicos, institucionais, atuais e dependentes de software, cada atividade deverá registrar a versão/data da referência e passar por revisão de conteúdo. A interação de jogo não torna uma resposta correta por si mesma.

### Exemplo conceitual de uma missão completa

**Missão: recuperar a lista de pedidos.** Conteúdo: LEFT JOIN. Objetivo: preservar todos os clientes, incluindo quem não fez pedido.

1. Mostrar três clientes e dois pedidos, com IDs e relações visíveis.
2. Pedir que o estudante escolha quais linhas devem continuar no resultado.
3. Permitir montar a junção e mostrar as linhas produzidas.
4. Se remover o cliente sem pedido, explicar exatamente o que foi perdido e oferecer uma dica.
5. Apresentar outra pequena base de dados e pedir uma previsão sem ajuda.
6. Encerrar com uma questão textual equivalente e registrar o tópico para revisão futura.

O jogo pratica o raciocínio e verifica a passagem para a linguagem de prova. Este é um roteiro de pesquisa, ainda não uma atividade implementada.

## 9. Progressão, feedback e professora

Propor três registros distintos:

- **XP da campanha:** recompensa pela participação, revisão e avanço; uso visual/cosmético.
- **Desempenho de estudo:** acertos sem dica, erros por conceito e resultado em revisões posteriores. Só abrir uma aula ou repetir a mesma resposta não comprova domínio.
- **Pontuação de simulado:** calculada exatamente conforme a regra documentada do concurso; não misturar com XP.

Estados sugeridos: “não comecei”, “em treino”, “consigo resolver” e “revisão pendente”. O critério de progressão será testado com questões diferentes e revisão em outra sessão. Evitar um percentual de domínio artificial derivado apenas de cliques.

Erro gera explicação e nova oportunidade. Dicas não retiram acesso ao estudo; tentativa com ajuda fica identificada no histórico. Conquistas podem celebrar retorno, correção de um erro e revisão concluída. Metas semanais flexíveis são uma opção melhor para testar inicialmente do que perda de progresso por faltar um dia.

Professor estará disponível em cada missão. A narração deve acompanhar o estado certo da atividade e parar ao trocar de tela. Os 431 áudios atuais podem apoiar as aulas existentes; novas dicas e explicações exigirão roteiros/gravações correspondentes. Não reutilizar um áudio com outro conteúdo nem presumir que a voz já possui explicações para atividades ainda não escritas.

## 10. Viabilidade e condições de conclusão futuras

O aplicativo atual é estático, em HTML/CSS/JavaScript, publicado no GitHub Pages. Uma primeira versão dos jogos pode usar componentes DOM e SVG, estado local e módulos reutilizáveis. Não há necessidade demonstrada de adotar motor 3D ou servidor para os tipos de desafio descritos. Isso é uma recomendação de arquitetura a validar durante a implementação.

Estrutura de conteúdo proposta: identificador do concurso, matéria, tópico e habilidade; fonte; objetivo; enunciado; alternativas ou peças; resposta e critério de correção; explicação por erro; níveis de dica; dificuldade; pré-requisitos; versão; referências de áudio. Conteúdo compartilhado terá associações explícitas a cada programa. ID idêntico de matéria em concursos diferentes não basta para deduplicar.

Concursos personalizados também deverão ter cobertura. Ao inserir uma matéria conhecida, relacionar atividades por conceitos e informar a associação. Matéria desconhecida precisará de conteúdo validado; não simular cobertura com um quiz genérico sem relação com o programa.

Critérios para considerar a futura entrega completa:

1. Visual coerente em todas as telas, figuras, mapas, controles da professora e estados de interface.
2. Atividades acessíveis nas 85 entradas de matérias; matriz dos 509 tópicos conferida contra subitens oficiais, com pendências explícitas até serem resolvidas.
3. Ordenação com fonte, amostra, pesos e empates; nenhum percentual inventado para assunto sem dados.
4. Cada atividade ensina uma habilidade verificável, tem solução revisada e feedback útil.
5. Jogos funcionam por mouse, toque e teclado; arrastar tem alternativa; movimento reduzido respeitado.
6. Fluxos verificados nos tamanhos de tela já usados no projeto, com professora sem encobrir respostas ou navegação.
7. Testes de pontuação por concurso, retomada do progresso e isolamento dos dados de cada matéria.
8. Piloto verifica compreensão das instruções, dificuldade, retenção posterior e capacidade de resolver uma questão equivalente sem a apresentação de jogo.

## 11. Sequência recomendada após “próxima etapa”

1. Consolidar o sistema visual em todas as telas e corrigir os dados oficiais que sustentam a prioridade.
2. Criar a aba Atividades, navegação por concurso/matéria e o mecanismo comum de missão, feedback, progresso e professora.
3. Validar um conjunto representativo: texto, cálculo, lógica, SQL e caso jurídico/administrativo. O piloto serve para ajustar o mecanismo; não encerra a obrigação de cobrir todas as matérias.
4. Expandir e revisar o conteúdo de todos os concursos/tópicos, incluindo itens sem contagem empírica com rótulo adequado.
5. Testar a experiência completa e publicar a versão concluída.

**Ponto de parada:** pesquisa encerrada. Aguardar o usuário dizer “próxima etapa” antes de modificar o aplicativo ou publicar qualquer mudança.


## Andamento posterior à pesquisa

O usuário autorizou o próximo passo em 29/10/2026. O visual global e a base de prioridades foram implementados na [etapa 1](ETAPA_1_IMPLEMENTACAO.md). A aba Atividades, o seletor entre os dois visuais (`Circuitos` e `Caderno`), os jogos das 53 missões (244 rodadas) e a auditoria de pesos e questões da Dataprev foram implementados na [etapa 2](ETAPA_2_ATIVIDADES.md).
