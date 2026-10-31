# Aprender do zero com histórias e mapas ilustrados

Versão 2 · 28/10/2026. Esta revisão atende ao pedido de começar sem conhecimento prévio, usar figuras mais expressivas, acrescentar movimento e retirar perguntas desta fase.

## O que mudou

A entrada agora é uma história ilustrada. A Lia tem uma loja fictícia: registra clientes, prepara bolos, recebe encomendas e conversa com a equipe. Esse contexto liga oito introduções de tecnologia. São **43 cenas e oito mapas ilustrados**. Cada cena apresenta um exemplo, uma explicação, uma observação sobre o desenho e a definição de um termo. O avanço é manual.

As questões, notas, autoavaliações e calendários de revisão da primeira versão foram retirados da experiência atual. A posição salva indica apenas onde a pessoa parou, sem representar domínio. A versão anterior está preservada em `v1/`, incluindo seu HTML e sua pesquisa de provas.

| História | Cenas | Começo concreto | Conceitos apresentados |
|---|---:|---|---|
| SQL e bancos | 7 | Caderno da loja | Dado, tabela, identificador, referências, JOIN, LEFT JOIN e uma primeira consulta SQL |
| Java e objetos | 5 | Receita e bolos | Instruções, classe, objeto, método e uma primeira chamada em Java |
| Criar software | 5 | Registrar uma encomenda | Necessidade, requisito, protótipo, teste de software e evolução |
| Internet e APIs | 5 | Pedir o cardápio pelo celular | Cliente, servidor, API, resposta HTTP e JSON |
| Segurança e dados | 6 | Receita guardada e lista de clientes | Proteção, confidencialidade, integridade, disponibilidade, autorização e dado pessoal |
| Redes e nuvem | 5 | Caminhos e endereços | Rede, endereço IP, DNS, nuvem e sistema operacional |
| Trabalho em equipe | 5 | Cozinha com encomendas | Objetivo, fluxo, trabalho em andamento, inspeção/adaptação e melhoria |
| Dados e IA | 5 | Registros de vendas | Registro, gráfico de barras, análise, aprendizado de máquina e avaliação |

As trilhas são introdutórias. Não substituem o programa de um concurso, os detalhes formais de cada tecnologia ou uma etapa posterior de aplicação dos conhecimentos. O levantamento original de assuntos está em [pesquisa da primeira versão](v1/PESQUISA.md).

## O que a nova pesquisa orientou

O [princípio de segmentação de Mayer](https://www.cambridge.org/core/books/abs/multimedia-learning/segmenting-principle/37240877DDA0362355ADB39936027982) descreve resultados favoráveis, nas condições examinadas, para explicações multimídia divididas em partes controladas pelo aprendiz. A adaptação feita aqui é apresentar uma cena de cada vez, com botões de avançar, voltar e repetir, sem passagem automática.

O [princípio de pré-treinamento](https://www.cambridge.org/core/books/abs/multimedia-learning/pretraining-principle/01791D57F5D4164251269E6DF56A8BF1) trata de conhecer nomes e características dos componentes principais antes de uma explicação mais complexa. Nesta versão, o exemplo aparece acompanhado de uma definição curta: informação antes de SQL, modelo antes de classe, conversa antes de API.

[Tversky, Morrison e Bétrancourt (2002)](https://www.sciencedirect.com/science/article/pii/S1071581902910177) discutem condições e limites do uso de animações para compreensão. A implicação de projeto adotada foi alinhar a imagem ao conceito. Os movimentos representam ações como levar uma ficha ao caderno, ligar um cliente a dois pedidos, enviar uma mensagem ou fazer uma barra crescer até o valor do exemplo. Os elementos param em um estado legível.

Essas decisões são uma adaptação de princípios e resultados de pesquisa. Este protótipo não foi submetido a um estudo de eficácia com usuários e não oferece garantia de memorização ou aprovação.

## Por que desenhar as figuras por código

As ilustrações são **SVGs autorais incorporados ao HTML**, com personagens, loja, caderno, fichas, bolos, telas e gráficos. Isso permite controlar quais objetos se movem, manter as relações do exemplo consistentes, ampliar os desenhos e exportar os mapas com nitidez. O traço, as cores e a organização seguem a ideia de um caderno ilustrado.

A imagem enviada pelo usuário serviu como referência de linguagem visual: centro expressivo, cores por bloco, setas, personagens e texto próximo das figuras. Ela não foi incorporada ao site nem modificada. As ilustrações desta versão foram desenhadas especificamente para os conceitos de TI.

Não foi necessário baixar imagens, carregar uma biblioteca de animação ou depender de imagens remotas. O HTML final contém os estilos, desenhos, textos e interações. As referências externas são abertas apenas quando a pessoa escolhe seus links.

## Interações disponíveis

- Escolher uma das oito histórias e avançar no próprio ritmo.
- Voltar a qualquer cena pelos indicadores de posição.
- Repetir o movimento ou mostrar a figura parada. A preferência de movimento reduzido do sistema também é respeitada.
- Na tabela de clientes, alternar entre destaque de linha e coluna.
- Na junção, destacar os dois pedidos da Ana ou a linha de Caio sem pedido.
- Ampliar a figura em uma janela com rolagem para explorar os detalhes.
- Abrir o mapa e tocar em um ramo para voltar à explicação correspondente.
- Baixar o mapa como SVG estático e ampliável, com legenda adequada ao arquivo exportado.
- Usar leitura em voz alta quando a síntese de voz e uma voz adequada estiverem disponíveis no navegador. A qualidade e a disponibilidade dependem do ambiente; o áudio não foi tratado como requisito para acompanhar as explicações. [Referência da API de voz](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis).

## Arquivos

- `dist/index.html`: experiência completa em um arquivo HTML.
- `mapas-ilustrados/`: oito mapas SVG exportados.
- `conteudo.js`: textos e sequência das histórias.
- `ilustracoes.js`: desenhos e mapas vetoriais.
- `app.js`: navegação, controles, posição e exportação.
- `estilo.css`: layout, aparência, animações e adaptação a telas pequenas.
- `index.template.html`: estrutura da página.
- `build.py`: gera o HTML autônomo com `python3 build.py`.
- `verificar.cjs`: verifica dados, retomada e geração das figuras; `node verificar.cjs --export` também exporta os oito mapas.

## Referências dos conceitos

As explicações usam como apoio documentação primária: [tabelas e junções no PostgreSQL](https://www.postgresql.org/docs/18/queries-table-expressions.html), [chaves e restrições](https://www.postgresql.org/docs/18/ddl-constraints.html), [classes e objetos em Java](https://docs.oracle.com/javase/tutorial/java/concepts/), [HTTP na RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html), [LGPD atualizada na Câmara](https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html), [definição de nuvem do NIST](https://csrc.nist.gov/pubs/sp/800/145/final), [Scrum Guide](https://scrumguides.org/scrum-guide.html) e [avaliação de modelos no scikit-learn](https://scikit-learn.org/stable/model_selection.html).

As tecnologias têm particularidades de versão e produto. As comparações com receitas, lojas e entregas são aproximações para introduzir as ideias; suas diferenças em relação à tecnologia são indicadas nas explicações.

## Verificação desta entrega

Foram verificados os textos obrigatórios, os limites de navegação, a recuperação de posições inválidas, a geração de todas as 43 cenas e os oito mapas. Todos os SVGs passaram por um analisador XML. O destaque da Ana contempla as duas linhas de pedidos; o de Caio preserva uma linha.

Na interface, foram percorridas as oito histórias e suas cenas, abertos ramos do mapa, alternado o destaque de linha/coluna, usado o controle de movimento e aberta/fechada a ilustração ampliada. A posição na segunda cena de SQL permaneceu após recarregar a página. Na tela de 390 pixels, a largura útil e a largura do documento coincidiram em 375 pixels, sem transbordamento horizontal da página. O mapa maior fica contido em uma área própria de rolagem. A experiência atual não contém campos de respostas ou questionários.

O clique de exportação preparou o SVG sem erros registrados no console. A ferramenta do navegador integrado não confirmou o evento de download dentro do prazo, portanto o salvamento por esse botão nesse ambiente ficou sem confirmação. Os oito arquivos em `mapas-ilustrados/` foram gerados diretamente e validados, podendo ser usados independentemente desse botão. A saída sonora da leitura em voz alta não foi verificada; ela depende do suporte e das vozes do navegador.

A prévia foi executada por HTTP local. O HTML foi inspecionado para confirmar a incorporação dos três scripts, dos estilos e das figuras, sem carregar bibliotecas ou imagens externas. A imagem `previa-historias.jpg` registra a apresentação final. A paginação de impressão não foi revisada nesta entrega.

## Ampliação: concursos e matérias (28/10/2026)

A seção acima registra a entrega anterior de oito histórias. A versão atual inclui o catálogo de Natal, São Gonçalo do Amarante/RN, Nísia Floresta, Parnamirim e concursos nacionais com aplicação em Natal. O catálogo informa a data da pesquisa, distingue previsão e edital, mostra a fonte em cada concurso e permite acrescentar uma lista própria localmente. Não consulta automaticamente novos editais.

- [São Gonçalo: portaria publicada no Jornal Oficial do Município](https://saogoncalo.rn.gov.br/wp-content/uploads/2025/06/JOM-119-26JUN2025.pdf) criou comissão em 2025. A existência de comissão não confirma edital, cargos, matérias ou data.
- [Nísia Floresta: edital de abertura 01/2026](https://www.diariomunicipal.com.br/femurn/materia/09EA5B55) e [página da banca](https://concurso.idib.org.br/Concurso.aspx?ID=366): para nível médio/técnico, a prova prevista inclui 18 questões de português, 6 de raciocínio lógico, 6 de informática e 30 de conhecimentos específicos. O catálogo resume o cargo técnico administrativo. A página da banca deve ser consultada para retificações e prazos; inscrições informadas até 26/10/2026. Não são dados sobre questões efetivamente aplicadas. O [edital 02/2026 da guarda](https://www.diariomunicipal.com.br/femurn/materia/F982933E) prevê os mesmos totais de questões por bloco, com pesos e matérias específicas próprios, além de outras etapas.
- [Câmara dos Deputados: edital para analista legislativo](https://www2.camara.leg.br/transparencia/recursos-humanos/concursos/arquivos-2025/edital-1-analista-legislativo-especialidades) e [página oficial de atualizações](https://www2.camara.leg.br/transparencia/recursos-humanos/concursos/concurso-para-analista-legislativo-especialidades): registro e redação exige graduação em qualquer área, prevê provas nas capitais e lotação em Brasília. O catálogo resume os grupos; não substitui o programa nem as retificações.
- [CGU: edital para auditor federal](https://cdn.cebraspe.org.br/concursos/CGU_26_AFFC/arquivos/90B861E07F72AFB1ECB1B3AE8974443779FFF17388907D1F7F5FDB621761295F.html) apresenta programa para desenvolvimento de sistemas, provas nas capitais e pontuação específica por bloco. Não é correto generalizar essa regra para qualquer prova da banca.
- [Guarda de Parnamirim: caderno de 2024](https://antigo.parnamirim.rn.gov.br/pdf/concurso/Caderno-Provas-Objetivas.pdf): classificamos pedagogicamente as dez questões de português e as cinco de matemática desta prova. Cada questão foi classificada por tema principal; outra classificação poderia enfatizar um assunto secundário. Trata-se de uma única prova e não de previsão estatística.

A nova área de estratégia apresenta um exemplo resolvido sem exigir resposta e uma simulação cuja probabilidade pressupõe chances iguais entre alternativas restantes e a manutenção da correta. Em questões com pontuação negativa, a esperança matemática também depende dos valores do edital; esperança igual não implica a mesma probabilidade de aprovação.

A experiência tem **22 histórias introdutórias, 113 cenas e 22 mapas de histórias**. Diversos tópicos listados não têm explicação própria e são identificados na interface. Há resumos e referências, não uma cobertura completa de todos os editais, assuntos ou provas. Além dos arquivos anteriores, `materias.js`, `concursos.js`, `catalogo.js` e `catalogo.css` reúnem as trilhas gerais e o catálogo. A verificação atual gera todas as cenas e mapas, confere referências a trilhas e testa cálculos e distribuição da prova histórica. A navegação por concurso, matéria e história e o simulador foram testados no navegador; a visualização para celular foi inspecionada sem transbordamento horizontal.

A rotina sugerida usa estudo em partes e retomadas distribuídas. A [revisão de Dunlosky e colaboradores](https://journals.sagepub.com/stoken/rbtfl/Z10jaVH/60XQM/full) avalia prática de recuperação e estudo distribuído como técnicas de alta utilidade em diversos contextos, com diferenças entre materiais e pessoas. O site não fixa um intervalo universal e não exige exercícios antes da explicação.


## Mapas por assunto e duas provas adicionais

A nova área **Mapas** apresenta cinco infográficos HTML autorais: TCP/IP, comandos SQL, SOLID, modelo iterativo e formas normais. Os arquivos de referência enviados pelo usuário orientaram a organização em um assunto central, cartões, exemplos e alertas; as imagens não foram incorporadas e seus textos não foram reproduzidos. Cada bloco pode ser expandido para aprofundamento, e a página inclui fontes técnicas diretamente nos mapas. Em telas pequenas, os cartões se reorganizam para facilitar a leitura; o botão de impressão usa um leiaute específico. Os resumos não substituem um livro, a documentação ou o conteúdo integral do edital.

Para a [Câmara de Natal em 2023](https://funcern.br/concursos/concurso-publico-camera-municipal-de-natal-rn/), a prova do cargo 7 foi reaplicada; analisamos o [caderno da reaplicação](https://funcern.br/documents/968/CCMN_07__NS_ASSISTENTE_LEGISLATIVO_ALNS__ASSISTENTE_GERAL_GENERALISTA.pdf), com 10 questões de português, 10 de lógica e 20 de conhecimentos específicos. A classificação é didática e exclusiva desse caderno. A solução guiada da questão de probabilidade identifica os dois caminhos possíveis e explicita a ausência de reposição.

Para [São Gonçalo do Amarante/RN, agente administrativo](https://concursos.ibfc.org.br/informacoes/355/), usamos a [cópia do caderno IBFC_02](https://arquivos.qconcursos.com/prova/arquivo_prova/84025/ibfc-2021-prefeitura-de-sao-goncalo-do-amarante-rn-agente-administrativo-prova.pdf), disponibilizada pelo Qconcursos, e a [convocação da prefeitura](https://saogoncalo.rn.gov.br/wp-content/uploads/2021/08/Convocacao-Prova-Objetiva-Sao-Goncalo-do-Amarante_2021-2.pdf). As 40 questões estão agrupadas por assunto principal para estudo: 15 de português, 15 de raciocínio lógico e 10 de informática. A classificação não faz previsão para a comissão anunciada em 2025 nem para outras provas.

As trilhas novas introduzem hardware, arquivos, planilhas e editores de texto. Para recursos específicos de programas, foram consultadas a documentação da Microsoft sobre [MÉDIA](https://support.microsoft.com/pt-br/excel/functions/average-function) e [sumário automático no Word](https://support.microsoft.com/pt-br/word/training/insert-a-table-of-contents); menus, atalhos e formatos podem variar entre versões e configurações. Os conteúdos de redes e de SQL são acompanhados de referências IETF e PostgreSQL; o mapa de normalização indica fontes IBM e distingue a regra formal da 3FN da FNBC.

## Mapas de matérias comuns

Foram acrescentados quinze mapas autorais para interpretação, vírgula, crase, concordância, classes de palavras, regência, lógica proposicional, probabilidade, porcentagem, frações, princípios administrativos, atos administrativos, gestão documental, planilhas e segurança digital. O seletor separa mapas por área; os concursos com assuntos relacionados exibem links para eles. Os mapas são resumos e não representam todos os itens cobrados por cada edital.

As referências incluem a [cartilha de redação do Inep](https://download.inep.gov.br/publicacoes/institucionais/avaliacoes_e_exames_da_educacao_basica/cartilha_encceja_2025_redacao_fundamental.pdf), o [material de frações](https://portaldaobmep.impa.br/index.php/modulo/ver?modulo=28), [porcentagem](https://portaldaobmep.impa.br/index.php/modulo/ver?modulo=26) e [probabilidade da OBMEP](https://portaldaobmep.impa.br/index.php/modulo/ver?a=1&modulo=46), a [Constituição compilada pelo Planalto](https://www4.planalto.gov.br/legislacao/legis-federal/constituicao) e orientações de segurança do [GSI](https://www.gov.br/gsi/pt-br/seguranca-da-informacao-e-cibernetica/osic/OSIC03.23.pdf) e da [Polícia Federal](https://www.gov.br/pf/pt-br/assuntos/combate-a-crimes-ciberneticos/cartilhas-de-seguranca-da-informacao). As menções a provas identificam caderno e questão; não são estimativas de frequência futura.

Para os assuntos administrativos foram consultados a [Lei federal 9.784/1999](https://www.planalto.gov.br/ccivil_03/leis/l9784.htm) e o [guia de gestão de documentos do Arquivo Nacional](https://www.gov.br/arquivonacional/pt-br/servicos/publicacoes/Guiadegestaodedocumentos.pdf). A lei federal não é automaticamente aplicável a todas as administrações municipais; a legislação pertinente deve ser consultada no edital.

Esta versão reúne 20 infográficos em HTML e 22 mapas SVG de histórias. O botão de imprimir usa uma folha de estilo própria e inclui detalhes e referências no documento preparado para impressão. A escolha da impressora ou do arquivo PDF depende do navegador do usuário.

## Ampliação dos mapas de desenvolvimento de software

Foram acrescentados cinco mapas introdutórios: classes e objetos em Java, APIs e HTTP, Scrum, Git e integração contínua, e testes de software. As páginas de assuntos dos perfis de desenvolvimento da ABDI e da CGU ligam diretamente os tópicos correspondentes aos mapas. O total atual é de **25 infográficos** e 22 mapas de histórias. São introduções, não a cobertura integral dos programas.

Para elaborar os mapas, foram consultados materiais de referência de origem primária: a [documentação Java da Oracle](https://docs.oracle.com/javase/tutorial/java/javaOO/summaryclasses.html), a [RFC 9110 sobre HTTP](https://www.rfc-editor.org/rfc/rfc9110.html), o [Guia Scrum de 2020 em português](https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-PortugueseBR-3.0.pdf), o [livro oficial do Git](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging), a [documentação do GitHub sobre integração contínua](https://docs.github.com/en/actions/get-started/continuous-integration) e o [programa de fundamentos de testes do ISTQB](https://www.istqb.org/certifications/certified-tester-foundation-level). Os exemplos são autorais e não estabelecem frequência de cobrança em prova.

## ABDI: seleção nacional com prova online

O [edital da FGV para a ABDI](https://conhecimento.fgv.br/sites/default/files/concursos/edital-01-2026-abertura-do-processo-seletivo-abdi-1.pdf), consultado em 28/10/2026, prevê prova telepresencial em casa em 20/12/2026 e lotação em Brasília. O perfil de desenvolvimento de TI aceita Sistemas de Informação e exige pelo menos seis meses de experiência pertinente. Há 2 vagas imediatas e 16 de cadastro de reserva. O edital prevê inscrição até 10/11/2026, às 18h, e taxa de R$ 100; consulte a [página oficial da FGV](https://conhecimento.fgv.br/concursos/psabdi) para alterações. As 60 questões previstas são distribuídas entre português (8), raciocínio lógico (6), informática (6), conhecimentos institucionais (20) e específicos (20). Questões específicas têm peso maior. As listas do site resumem o programa e não substituem a leitura integral do edital.

## Matemática e raciocínio: novas histórias e mapas

Foram criadas três histórias de cinco cenas sobre proporção, equação do primeiro grau e conjuntos, com explicações graduais e sem perguntas iniciais. Quatro mapas introduzem razão e regra de três, equação do primeiro grau, conjuntos e médias simples e ponderadas. O total atual é de **25 histórias, 128 cenas, 25 mapas SVG de histórias e 29 infográficos HTML**. Os tópicos relacionados em Nísia Floresta e nas provas históricas abrem os mapas correspondentes; eles não esgotam os conteúdos dos editais.

A pesquisa consultou o material da OBMEP sobre [razões e proporções](https://portaldaobmep.impa.br/index.php/modulo/ver?modulo=57), [equações](https://portaldaobmep.impa.br/index.php/modulo/ver?modulo=44), [estatística](https://portaldaobmep.impa.br/index.php/modulo/ver?modulo=64) e [conjuntos](https://portaldaobmep.impa.br/uploads/material_teorico/89z3f7wfr1gkg.pdf). Os cálculos são exemplos próprios; as referências a provas identificam o caderno e não estabelecem frequência futura nem garantem aprovação.

## Revisão escolhida pelo estudante

A aba de revisão permite guardar uma história ou um infográfico, definir ou apagar uma data de retomada, abrir o conteúdo, registrar uma revisão realizada e retirar o item da lista. Ao registrar uma revisão, a data anterior é removida; o estudante pode escolher outra. A lista é armazenada apenas no navegador e dispositivo, quando o armazenamento local está disponível. Não há sincronização, notificações ou avaliação de aprendizagem. Datas são interpretadas no calendário local do dispositivo.

A [revisão de pesquisas sobre distribuição do estudo](https://files.eric.ed.gov/fulltext/ED536925.pdf) descreve benefícios em diversos contextos e também limites para uma solução única. Esta ferramenta não calcula um intervalo supostamente ótimo e não exige respostas antes do ensino. O fluxo de guardar, agendar, recarregar e registrar foi testado no navegador; a largura da página foi conferida em tela de 390 pixels sem transbordamento horizontal. Os dados de teste foram removidos após a verificação.

## Português: estruturas e acentuação

Foram acrescentadas histórias sobre sílaba tônica e acentuação, sujeito e predicado e tempos verbais, além de mapas para esses temas e para coesão e pronomes. A versão atual contém **28 histórias, 143 cenas, 28 mapas SVG e 33 infográficos HTML**. Os novos mapas são introdutórios e não cobrem todas as regras e exceções do programa de português.

As fontes incluem o [acordo ortográfico publicado pelo Senado](https://legis.senado.gov.br/norma/410669/publicacao/15745373), a [Secretaria Municipal de Educação de Goiânia](https://sme.goiania.go.gov.br/conexaoescola/eaja/lingua-portuguesa-acentuacao-grafica/), o [Manual de Redação da Presidência da República](https://www.gov.br/cidades/pt-br/midia/documentos/pdf/copy_of_manualderedacao.pdf) e o [caderno IBFC de São Gonçalo do Amarante de 2021](https://arquivos.qconcursos.com/prova/arquivo_prova/84025/ibfc-2021-prefeitura-de-sao-goncalo-do-amarante-rn-agente-administrativo-prova.pdf). A classificação das questões é didática e diz respeito a esse caderno específico.

## Conhecimentos específicos de técnico administrativo de Nísia Floresta

O [edital 01/2026, anexo III](https://www.diariomunicipal.com.br/femurn/materia/09EA5B55), foi conferido para ampliar o resumo do cargo. A lista agora inclui noções de contabilidade básica, que constam no programa e não apareciam anteriormente, além de detalhar os grupos de atos administrativos, redação, documentação, reuniões, logística e atendimento. As 30 questões são previstas para todo o bloco de conhecimentos específicos; não há contagem por subassunto neste material.

Foram acrescentadas histórias e mapas introdutórios sobre comunicação oficial, atendimento e patrimônio contábil. As referências incluem o [Manual de Redação da Presidência da República](https://www.gov.br/cidades/pt-br/midia/documentos/pdf/manualderedacao.pdf), a [Lei 13.460/2017 sobre direitos do usuário de serviços públicos](https://presidencia.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13460.htm) e a [introdução à contabilidade da Escola de Contas do TCE-MG](https://escoladecontas.tce.mg.gov.br/wp-content/uploads/2024/09/analise_das_demonstracoes_contabeis_2024.pdf). O padrão de redação federal é apresentado como referência, sujeito às regras do órgão competente. O exemplo contábil é simplificado e não substitui o estudo das normas aplicáveis.

Naquela etapa, a versão reunia **31 histórias, 158 cenas, 31 mapas SVG e 36 infográficos**, e reuniões, logística e termos latinos ainda estavam em preparação. O resumo não substitui o edital e suas retificações.

## Reuniões, eventos e linguagem administrativa

As três lacunas identificadas acima receberam histórias e mapas introdutórios: organização de reuniões e atas, logística de eventos e expressões latinas. Os conteúdos foram ligados aos tópicos correspondentes do edital de técnico administrativo. Naquela etapa a versão reunia 34 histórias, 173 cenas, 34 mapas SVG e 39 infográficos.

As fontes incluem orientações do [Ministério dos Transportes para reuniões](https://www.gov.br/transportes/pt-br/assuntos/portal-da-estrategia/artigos-gestao-estrategica/passos-para-uma-reuniao-bem-sucedida), o [manual de acessibilidade em eventos](https://www.gov.br/mdh/pt-br/navegue-por-temas/pessoa-com-deficiencia/publicacoes/manual-de-acessibilidade-em-eventos-presenciais) e o [guia de eventos da Assembleia Legislativa de Santa Catarina](https://portalelegis.alesc.sc.gov.br/documentos/wQEJW/download), além do [manual de expressões latinas do Ministério da Defesa](https://www.gov.br/defesa/pt-br/arquivos/File/legislacao/emcfa/publicacoes/md20a_ia_01a_instra_paraa_puba_padronizadasa_final.pdf) e das [orientações da FUNAG sobre referências](https://funag.gov.br/manual/index.php?title=Refer%C3%AAncias). As orientações de outros órgãos ilustram conceitos e não são apresentadas como normas próprias de Nísia Floresta.

## Cobertura integral de matérias, 4 provas completas (200 questões), neurociência e eliminação lógica

Esta atualização conclui a ligação de todas as matérias e de todos os subtópicos dos concursos cadastrados no catálogo, eliminando integralmente avisos de `"Introdução em preparação"` ou `"Explicação em preparação"`. O sistema agora conta com **40 histórias introdutórias, 203 cenas ilustradas, 40 mapas SVG exportados e 52 infográficos HTML autorais**.

### 1. Novas histórias ilustradas (6 trilhas de 5 cenas cada)
- `mat_geometria`: perímetro, área, triângulo retângulo (Pitágoras), círculo/volumes e plano cartesiano.
- `mat_combinatoria`: princípio multiplicativo, divisibilidade/MMC/MDC, arranjo vs. combinação e matrizes.
- `penal_fundamentos`: reserva legal e anterioridade, teoria tripartite do crime, dolo/culpa, inquérito policial e flagrante.
- `legis_especial`: Estatuto Geral das Guardas Municipais (Lei 13.022/2014), Lei Maria da Penha (Lei 11.340/2006), Estatuto do Desarmamento (Lei 10.826/2003), Abuso de Autoridade (Lei 13.869/2019), ECA, Estatuto da Pessoa Idosa e CTB.
- `ingles_leitura`: *skimming* e *scanning*, palavras transparentes vs. falsos cognatos (*actually*, *pretend*), referência pronominal, conectivos (*however*, *although*, *therefore*) e vocabulário técnico de TI.
- `etica_servico`: ética e integridade pública, conflito de interesses (Lei 12.813/2013), controle interno/externo/social, licitações (Lei 14.133/2021) e políticas públicas.

### 2. Novos infográficos HTML autorais (13 mapas, totalizando 52)
- **Tecnologia**: `cascata` (Modelo cascata), `incremental` (Modelo incremental) — completando a tríade ao lado de `iterativo` a partir da referência visual enviada pelo usuário, sem reproduzir a imagem ou copiar texto — e `arquitetura-dados-ia` (microsserviços, mensageria, ETL/ELT e avaliação de IA).
- **Português e Inglês**: `generos-tipologias`, `semantica-figuras` (denotação, conotação, reescrita e funções do "se") e `ingles-tecnico-leitura`.
- **Matemática**: `geometria-medidas`, `sequencias-progressoes` (PA, PG, funções de 1º/2º grau, exponencial e logaritmo) e `contagem-matrizes` (MMC, MDC, combinatória e matrizes).
- **Direito e Administração**: `direitos-constitucionais` (art. 1º ao 5º, remédios constitucionais e art. 144), `direito-penal-processo`, `legislacao-especial-guarda` e `licitacoes-controle-etica`.

### 3. Análise estatística descritiva de 200 questões em 4 provas completas
- **Guarda Municipal de Parnamirim/RN 2024 (FUNCERN · 50 questões)**: classificação ampliada para todas as 5 disciplinas — Língua Portuguesa (Q1–10), Direito Constitucional (Q11–20), Matemática (Q21–25), Direito Penal e Processo Penal (Q26–35) e Legislação Extravagante (Q36–50), com exemplos resolvidos passo a passo em todas as matérias.
- **Câmara Municipal de Natal/RN 2023 (FUNCERN · 40 questões)**: Português (Q1–10), Lógica (Q11–20) e Conhecimentos Específicos (Q21–40), agora com exemplos resolvidos em todas as matérias.
- **São Gonçalo do Amarante/RN 2021 (IBFC · 40 questões)**: Português (Q1–15), Raciocínio Lógico (Q16–30) e Informática (Q31–40), com exemplos resolvidos nas 3 matérias.
- **Dataprev · Analista de TI — Desenvolvimento de Software 2024 ([caderno FGV](https://conhecimento.fgv.br/sites/default/files/concursos/536-analista-de-tecnologia-da-informacao-desenvolvimento-de-software-v1-4.pdf) · 70 questões)**: classificação completa de Português (Q1–12), Inglês (Q13–24), Raciocínio Lógico-Matemático (Q25–30), Atualidades (Q31–35), Legislação de Segurança e LGPD/LAI (Q36–40) e Conhecimentos Específicos de Desenvolvimento de Software (Q41–70).

### 4. Neurociência da aprendizagem e matemática da eliminação
Foram incorporadas referências internacionais verificadas na aba **Fontes** e na aba **Estratégia**:
- Limite da memória de trabalho ([Cowan, 2010](https://pubmed.ncbi.nlm.nih.gov/20445769/)) e arquitetura cognitiva / efeito do exemplo resolvido ([Sweller, van Merriënboer & Paas, 2019](https://link.springer.com/article/10.1007/s10648-019-09465-5)).
- Prática de recuperação ativa ([Karpicke & Blunt, 2011](https://pubmed.ncbi.nlm.nih.gov/21252317/)) e revisão de utilidade de técnicas de estudo ([Dunlosky et al., 2013](https://pubmed.ncbi.nlm.nih.gov/26173288/)).
- Papel do sono na consolidação sináptica e sistêmica da memória ([Rasch & Born, 2013](https://pubmed.ncbi.nlm.nih.gov/23589831/)).
- Quadro comparativo de eliminação de alternativas (25%, 50%, 75% em 4 opções; 20%, 40%, 60%, 80% em 5 opções; 50% em Certo/Errado; e explicação matemática de quando ocorre 90%), acompanhado de regras de eliminação lógica e do simulador interativo.

## Expansão para 6 provas completas (350 questões), AFO/Orçamento, 100% de exemplos resolvidos e 13 referências científicas

Esta revisão aprofunda a base empírica e didática da plataforma, chegando a **41 histórias ilustradas (208 cenas), 41 mapas SVG exportados, 53 infográficos HTML autorais, 6 provas oficiais completas (350 questões classificadas uma a uma) e 100% das matérias de todos os 14 concursos com exemplos resolvidos passo a passo**:

### 1. Duas novas provas completas analisadas questão por questão (+150 questões, totalizando 350)
- **Dataprev · Analista de TI — Desenvolvimento de Software 2026 ([caderno FGV Tipo 1](https://conhecimento.fgv.br/sites/default/files/concursos/analista-de-tecnologia-da-informacao-desenvolvimento-de-software-cns003-tipo-1.pdf) · 70 questões)**: classificação integral de Língua Portuguesa (Q1–12), Língua Inglesa (Q13–24), Raciocínio Lógico-Matemático (Q25–29), Atualidades e IA Generativa (Q30–35), Legislação de Segurança da Informação e LGPD/CIS Controls (Q36–40) e Conhecimentos Específicos de TI (Q41–70: arquitetura, DDD, microsserviços, SOLID, Padrões GoF, Java/Python, SQL/DW/RAG/IA, Git/Docker/K8s/Terraform/Prometheus e DevSecOps/SAST/DAST/Scrum).
- **CGU · Auditor Federal de Finanças e Controle — Tecnologia da Informação 2022 ([caderno FGV Tarde Tipo 1](https://conhecimento.fgv.br/sites/default/files/concursos/cgu_2021_auditor_federal_de_financas_e_controle_-_area_tecnologia_da_informacaoaffc-ti_tipo_1_tarde.pdf) · 80 questões)**: classificação integral das 9 disciplinas do bloco específico e jurídico — Direito Constitucional (Q1–10), Direito Administrativo e Lei 14.133/2021 (Q11–24), Administração Financeira e Orçamentária — AFO (Q25–29), Auditoria, LAI, CGU e Controladoria (Q30–40), Ciência de Dados, Aprendizado de Máquina e SQL (Q41–48), Desenvolvimento Ágil, Git e APIs (Q49–56), Bancos de Dados, Normalização e DW (Q57–64), Infraestrutura, Redes, Linux e Kubernetes (Q65–72) e Segurança da Informação, Criptografia e OWASP (Q73–80).

### 2. Nova história ilustrada e novo infográfico de Orçamento Público (AFO e LRF)
- História `afo_orcamento` (5 cenas: PPA/LDO/LOA, princípios orçamentários da anualidade/universalidade/exclusividade, estágios da receita e regra de ouro, estágios da despesa — empenho, liquidação e pagamento — e Restos a Pagar / LRF).
- Infográfico `orcamento-publico-afo`: resumo visual de PPA, LDO e LOA, princípios orçamentários, estágios da receita e da despesa (Lei 4.320/1964), créditos adicionais (suplementares, especiais e extraordinários), Restos a Pagar e limites da Lei de Responsabilidade Fiscal ([LC 101/2000](https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp101.htm)).

### 3. Exemplos resolvidos passo a passo em 100% das matérias de todos os concursos
- Todas as matérias dos 14 concursos do catálogo (tanto as 6 provas analisadas quanto os concursos previstos ou com edital aberto em Natal, São Gonçalo, Nísia Floresta, Parnamirim, Câmara dos Deputados, ABDI e CGU) possuem agora a seção **"Entendendo o raciocínio · veja resolvido, sem precisar responder"** (`s.worked`), permitindo compreender como aplicar a regra e eliminar alternativas enganosas antes de qualquer teste.

### 4. Novas evidências de neurociência cognitiva, prática intercalada e psicometria (13 fontes internacionais)
- Efeito do teste na retenção de longo prazo ([Roediger & Karpicke, 2006](https://pubmed.ncbi.nlm.nih.gov/16507066/)).
- Espaçamento ótimo proporcional ao intervalo até a prova ([Cepeda et al., 2008](https://pubmed.ncbi.nlm.nih.gov/19076480/)).
- Prática intercalada (*interleaved practice*) para discriminar qual regra aplicar em problemas misturados ([Rohrer, Dedrick & Burgess, 2014](https://pubmed.ncbi.nlm.nih.gov/24578089/)).
- Superação da ilusão metacognitiva de fluência do estudo em bloco ([Hartwig, Rohrer & Dedrick, 2022](https://pubmed.ncbi.nlm.nih.gov/34990156/)).
- Teoria da decisão, eliminação parcial de alternativas e pontuação com ou sem penalidade ([Budescu & Bar-Hillel, 1993](https://www.jstor.org/stable/1435093)).


## Atualização de 29/10/2026 — execução de ANALISE_E_MELHORIAS_IA.md

A versão entregue preserva as 41 histórias e 208 cenas. Passa a oferecer **56 infográficos**, **15 concursos** e **7 provas completas, com 390 questões classificadas**. Os 41 mapas SVG foram reexportados. As 33 histórias gerais têm desenhos contextualizados e sete delas receberam controles adicionais de exploração.

### Conteúdo e fontes conferidos

- **Informática básica:** três mapas novos — `hardware-dispositivos`, `sistemas-arquivos`, `word-documentos`. Referências: [HP — memória e armazenamento](https://www.hp.com/us-en/tech-takes/laptops/glossary/memory-storage.html), [Corsair — RAM e armazenamento](https://www.corsair.com/ca/en/explorer/diy-builder/memory/whats-the-difference-between-memory-ram-and-storage/), [Ubuntu — guia do desktop](https://help.ubuntu.com/stable/ubuntu-help/), [Ubuntu — backup](https://help.ubuntu.com/stable/ubuntu-help/backup-how.html.en), [Microsoft — sumário](https://support.microsoft.com/en-us/word/training/insert-a-table-of-contents), [LibreOffice — sumário](https://help.libreoffice.org/latest/pt-BR/text/swriter/guide/indices_toc.html).
- **Nova prova histórica:** caderno CCMN 04, técnico em manutenção e suporte em informática, Câmara de Natal, FUNCERN, publicado na página da banca em 18/06/2023. Classificação completa de 1 a 40, por tema principal: 10 Português, 10 Informática e 20 específicos. [Página dos cadernos](https://funcern.br/noticias/cadernos-de-provas-camara-municipal-de-natal/) e [caderno original](https://funcern.br/documents/874/CCMN_04__NM_TECNICO_LEGISLATIVO_TLNM__TECNICO_EM_MANUTENCAO_E_SUPORTE_EM_INFORMATICA.pdf). A classificação não atribui gabarito e não replica os enunciados. Os exemplos associados são fundamentos já existentes, com sua referência própria.
- **Correção ao diagnóstico P0.5:** quatro alternativas e nenhum desconto por erro não significam +1 em todas as disciplinas. Natal: 2 pontos em Português e Lógica/Informática; 3 nos específicos, total 100. [Edital, item 8.1, página 13 do PDF](https://www.cmnat.rn.gov.br/_ups/transparencia/2023/dom_20230404_f6c771703ed9acd0272d23ea54fc2191.pdf). São Gonçalo, agente administrativo: Português 1,8; Lógica 1,4; Informática 1,2, total 60. [Edital IBFC, item 8.1.1, página 17 do PDF](https://fs.ibfc.org.br/arquivos/65856721e966de44c1d6b57c03c8ed06.pdf). Os pesos estão modelados por disciplina e aparecem na tela do concurso.
- **Nísia Floresta, Guarda:** 20 tópicos de legislação extravagante substituem o item genérico; foram conferidos no [Anexo V do edital 02/2026](https://www.diariomunicipal.com.br/femurn/materia/F982933E). A lista inclui SUSP, cooperação, inclusão, igualdade racial, meio ambiente, esporte e identificação criminal. Não foi copiado o item de hediondos de outro edital.
- **Concursos provisórios:** Direito Constitucional e Administração/atendimento entram como trilhas opcionais expressamente não confirmadas. Há acesso a provas históricas do município, com ressalva de que podem ser de outro cargo ou órgão.
- **Busca por garantia constitucional:** o detalhamento de direitos individuais agora explica habeas corpus de forma introdutória, conforme [art. 5º, LXVIII, da Constituição](https://www4.planalto.gov.br/legislacao/legis-federal/constituicao) e [guia do Senado](https://www12.senado.leg.br/manualdecomunicacao/guia-juridico/habeas-corpus).

### Experiência e arquitetura

Busca ignora acentos e consulta também explicações internas dos mapas. A seleção de mapa e área é persistida, e rotas com IDs permitem reabrir histórias, mapas, concursos e matérias. O modo de recuperação oculta as pistas também da árvore de acessibilidade, com botões de revelação por teclado. A impressão revela as pistas no papel e limita a saída à tela escolhida; histórias imprimem seu mapa.

Laboratórios opcionais: INNER/LEFT/RIGHT/FULL JOIN com tratamento de NULL, conectivos com as quatro combinações de verdade e fórmulas SOMA/MÉDIA/SE. Revisões mantêm data manual e acrescentam atalhos calculados a partir do dia local. Dados pessoais continuam somente no navegador.

O build usa `build-manifest.json` em Node e Python; substituições literais preservam `$&` e `$$`. Ambos validam marcadores antes de escrever o arquivo de saída e normalizam quebras de linha. As cores e funções dos mapas foram reunidas em `InfographicKit`, importadas explicitamente em escopos locais.

### Verificação executada

- `node verificar.cjs --export --build`: conteúdo, 208 cenas, mapas interativos/estáticos, fontes, referências cruzadas, exemplos de todas as matérias e cobertura exata das 390 questões.
- Regressões adicionais em `verificar-novidades.cjs`: ícones, variantes interativas, busca em conteúdo, classificação de concursos personalizados, escaping, rotas inválidas, pesos oficiais, cálculo de revisões em viradas de mês/ano e ano bissexto, JOINs, lógica e planilhas.
- `python build.py`: saída comparada byte a byte por SHA-256 ao build Node; resultados idênticos.
- `tests/fluxos-browser.js`: fluxos de navegação e F5, buscas e estados vazios, teclado, recuperação ativa, os três laboratórios, cadastro/exclusão de concursos, revisões persistentes, impressão de sete telas, layout a 390 px e preferência de movimento reduzido. Nenhum erro JavaScript capturado.
- `tests/figuras-browser.js`: 165 cenas gerais renderizadas, sem texto ultrapassando o SVG. Capturas em `output/playwright/`.
- `tests/persistencia-browser.js`: filtros preservados, história ativa visível no celular, navegação pelo histórico, impressão com pistas ocultas, estudo sem rede após carregar e recuperação diante de armazenamento corrompido ou negado. Revisões permanecem disponíveis na sessão quando não podem ser salvas. Nenhum erro JavaScript capturado.

A interface foi verificada em Chrome por HTTP local. O controlador de testes bloqueia URLs `file:`, portanto não foi automatizado um teste direto desse protocolo. O HTML permanece autocontido, com CSS, JavaScript e SVG incorporados; não depende do servidor de desenvolvimento para distribuição.

## Professora virtual — 29/10/2026

O botão **Professor**, com ícone de som, foi incluído nas nove telas, nas cenas e mapas ilustrados, nos blocos dos infográficos, nos exemplos resolvidos, nos laboratórios, nas revisões e na ilustração ampliada. O painel pode ser recolhido para observar o conteúdo enquanto a voz continua.

`professor-core.js` prepara 525 roteiros contextuais, reunidos em 431 gravações distintas quando os textos são iguais. As aulas apresentam a ideia e o exemplo, pedem uma explicação com palavras próprias e aguardam o comando **Conferir** antes da resposta. O texto completo acompanha a fala; não há teste obrigatório, pontuação de aprendizagem ou promessa de memorização universal. A seleção do intervalo de revisão continua manual.

A voz usada é **pt-BR-ThalitaMultilingualNeural**, confirmada no catálogo do serviço e na [documentação da Microsoft](https://learn.microsoft.com/pt-br/azure/ai-services/speech-service/language-support). A geração utiliza [edge-tts 7.3.1](https://github.com/rany2/edge-tts), com MP3 e marcações de palavras. O gerador verifica alinhamento e integridade, reutiliza arquivos concluídos e registra apenas gravações completas. Não há chave no frontend. As listas pessoais utilizam explicações de fundamentos já existentes; seus dados não são enviados para geração de voz.

O princípio pedagógico é participar da explicação, tentar reconstruí-la, conferir e retomar em outro momento. Referências: [Karpicke e Blunt, 2011](https://pubmed.ncbi.nlm.nih.gov/21252317/) e [Cepeda e colaboradores, 2008](https://pubmed.ncbi.nlm.nih.gov/19076480/). As afirmações da tela Estratégia foram ajustadas para não tratar a capacidade da memória ou os intervalos como regras universais; a distribuição das provas agora é calculada a partir dos sete cadernos presentes no catálogo.

Verificações adicionais:

- `verificar-professor.cjs`: cobertura de aulas, parada antes da conferência, referências, textos completos, preservação de números/abreviações, marcações de áudio e reaproveitamento de fundamentos das listas pessoais. `--audio-completo` exige áudio para todos os roteiros atuais.
- `verificar-audios.py`: SHA-256, formato MP3, duração e marcações dentro de cada gravação, usando FFprobe. O relatório fica em `output/verificacao-audio.json`.
- `tests/professor-browser.js`: áudio real, busca de trecho, pausa, retomada, repetição, velocidade, recuperação ativa, revisão, foco, ilustração ampliada, painel recolhido, nove telas, mapas, laboratórios, celular e impressão.
- `tests/professor-falhas-browser.js`: cancelamento durante o carregamento, repetição sem rede, arquivo ausente, texto disponível e seleção explícita de uma voz alternativa identificada pelo nome real.

Os áudios são arquivos separados do HTML e devem acompanhá-lo na pasta `dist/audio/`. SVGs e PDFs exportados permanecem estáticos. A verificação de navegador usa HTTP local; o protocolo `file:` não foi automatizado. O pacote é preparado por `empacotar.py`, que exige cobertura completa e inclui somente os MP3 referenciados pelo manifesto atual.


## Publicação e adaptação de tela — 29/10/2026

Destino: https://marxb50.github.io/concursos/ no repositório público `marxb50/concursos`. O pacote estático contém o HTML e somente os 431 MP3 referenciados pelo aplicativo. A voz é carregada ao escolher ouvir.

`layout.js` acompanha a largura disponível e o tipo de apontador por APIs do navegador. `responsivo.css` ajusta navegação, alvos de toque, campos, biblioteca, mapa e painel da professora. As consultas se atualizam ao redimensionar a janela ou girar o aparelho.

`tests/responsivo-browser.js` conferiu as nove telas em seis larguras (320, 360, 390, 768, 1024 e 1440 px), reprodução de áudio e rotação de tela. Foram 54 combinações de tela/largura, sem transbordamento horizontal nem erro JavaScript.

`preparar-publicacao.py` verifica o conteúdo, reconstrói o HTML, confere os hashes dos áudios e prepara os arquivos públicos em `output/publicacao-concursos/`. Os fontes editáveis ficam em `src/` no repositório de publicação.

Publicação confirmada com HTTP 200, GitHub Pages em estado `built`, HTML idêntico ao build verificado e hash do áudio conferido no endereço público. O teste das 54 combinações de tela/largura também passou no site publicado, com rotação e voz, sem erro JavaScript. Commit: `d6bf23d947002afb52c49af7ff7a99044360ce4d`. Relatório: `output/publicacao-online.json`.


## Etapa 1 das atividades — tema global e prioridade por pontos (29/10/2026)

Aplicado o tema de quadrinhos/painel tecnológico nas nove telas, nos controles da professora, nos mapas e nos estados de interface. Fontes incorporadas com licenças OFL; visual de tela escuro com impressão clara. O conteúdo das histórias e dos infográficos foi preservado.

`pontuacao.js` corrige e reúne pesos e mínimos de ABDI, CGU, Câmara dos Deputados e Nísia Floresta, conferidos nos documentos oficiais citados na [pesquisa das atividades](pesquisa-atividades/PESQUISA_ATIVIDADES_GAME.md). ABDI distingue 0,65 e 0,3 por acerto; CGU distingue P3 (+2/−2) dos demais blocos (+1/−1). As matérias são ordenadas por pontos máximos quando há distribuição por disciplina; blocos sem distribuição interna não geram contagem inventada por matéria. A amostra histórica segue separada, com grupos em ordem de quantidade e empates mantidos.

A [entrega da etapa 1](pesquisa-atividades/ETAPA_1_IMPLEMENTACAO.md) descreve arquivos e verificações. A implementação da aba Atividades e seus jogos corresponde à etapa seguinte da sequência combinada.


## Etapa 2 das atividades — central de missões, escolha de visual e auditoria Dataprev (29/10/2026)

Implementada a aba **Atividades** (`atividades-dados.js`, `atividades-core.js`, `atividades-ui.js` e `atividades.css`) com **53 missões e 244 rodadas**, cobrindo todas as 85 entradas de matérias dos 15 concursos cadastrados:

- **12 missões autorais de aplicação** (`detetive-texto`, `balanca-equacoes`, `recursos-porcentagem`, `chance-probabilidade`, `circuito-logico`, `resgate-sql`, `decisoes-publicas`, `planilha-operacao`, `rede-investigacao`, `seguranca-incidente`, `oficina-sequencias` e `ingles-evidencias`) e **41 missões de conexão de fundamentos** (`base-*`, uma por história ilustrada).
- **Formatos acessíveis por mouse, toque e teclado:** investigação de evidências textuais, entrada numérica com botões `−`/`+`, tabela-verdade interativa, laboratório de junções SQL (`INNER`, `LEFT`, `RIGHT`, `FULL`), ordenação de etapas com botões `↑`/`↓` (sem exigir arrastar) e decisão em estudos de caso.
- **Prioridade transparente em dois níveis:** participação nos pontos máximos da prova objetiva (quando definida por disciplina no edital) e grupos temáticos mais frequentes no caderno analisado, com números das questões e link direto para a prova real. O progresso em XP é separado da pontuação de prova e não multiplica pontos ao repetir a mesma missão.
- **Escolha entre dois visuais (`tema.js`):** seletor no cabeçalho entre **Circuitos** (quadrinhos e painel tecnológico) e **Caderno** (papel creme original), mantendo a missão, a rodada e o progresso salvos ao alternar.
- **Auditoria da prova e do edital Dataprev (`provas.js` e `pontuacao.js`):** corrigido o link oficial do caderno de 2024 (`ati-desenvolvimento-de-software-cns003-tipo-01.pdf`), revisada a classificação das questões do caderno de 2024 (incluindo questões 26, 28, 36, 40, 55 e 56) e cadastrados os pesos oficiais das edições 2024 e 2026 da Dataprev (Conhecimentos Específicos com peso 2,5 por questão = 75 de 115 pontos, ou 65,2% da objetiva, e mínimo de 57,5 pontos).
- **Professora virtual integrada às atividades:** 526 roteiros contextuais cobertos por 432 gravações Thalita Neural, incluindo a orientação da aba Atividades e o botão **Professor** em cada rodada ligado ao fundamento correspondente (cena, mapa ou laboratório).
- **Verificações (`verificar-atividades.cjs`, `tests/atividades-browser.js` e `tests/atividades-visuais-browser.js`):** 216 combinações inspecionadas nos dois visuais (`circuitos` e `caderno`) e em seis larguras (320, 360, 390, 768, 1024 e 1440 px), sem transbordamento horizontal, erro JavaScript ou falha de contraste nos textos inspecionados. A documentação completa está em [ETAPA_2_ATIVIDADES.md](pesquisa-atividades/ETAPA_2_ATIVIDADES.md).

## Expansão Massiva de Atividades (40 Questões por Missão) e Concursos de TI no RN (30/10/2026)

Atendendo à diretriz de ampliar substancialmente o banco de atividades com base em provas reais e cobrir os concursos de TI do Rio Grande do Norte (realizados e previstos com dotação orçamentária no PPA/LOA):

1. **Expansão de Atividades para 40 Questões por Missão (688 questões no total):**
   - As 12 missões autorais de competências foram ampliadas de 3 para **40 questões cada** (480 questões ricas autorais):
     - `detetive-texto` (40 questões de Língua Portuguesa e interpretação)
     - `balanca-equacoes` (40 equações de 1º grau aplicadas)
     - `recursos-porcentagem` (40 problemas de cálculo financeiro e porcentagem)
     - `chance-probabilidade` (40 desafios de probabilidade e estatística)
     - `circuito-logico` (40 expressões lógicas proposicionais)
     - `resgate-sql` (40 desafios relacionais com INNER, LEFT, RIGHT e FULL JOIN)
     - `decisoes-publicas` (40 dilemas de direito administrativo e ética no serviço público)
     - `planilha-operacao` (40 operações de fórmulas Excel/Calc)
     - `rede-investigacao` (40 análises práticas de redes, portas, CIDR e comandos Linux)
     - `seguranca-incidente` (40 cenários de segurança da informação, criptografia, ataques e LGPD)
     - `oficina-sequencias` (40 fluxos ordenáveis: TDD, Git, CI/CD, Scrum, DevOps, etc.)
     - `ingles-evidencias` (40 passagens com evidências contextuais em inglês instrumental)
   - Somadas às 41 missões de fundamentos (`base-*`, com 208 questões), o `ActivityBank` totaliza agora **688 questões**, todas integradas a áudio de apoio e validação rigorosa.

2. **Novos Concursos do Rio Grande do Norte Integrados ao Aplicativo (28 concursos no total):**
   - **5 Cadernos Reais com Evidências Completas (+240 questões de prova):**
     - UFRN 2025 — Analista de TI · Desenvolvimento (Comperve, 55 questões + prova prática)
     - UFRN 2025 — Analista de TI · Ciência de Dados (Comperve, 55 questões + prova prática)
     - UFRN 2023 — Técnico em TI (Comperve, 50 questões + redação)
     - IFRN 2024 — Analista de TI (FUNCERN, 40 questões)
     - IFRN 2024 — Técnico em TI (FUNCERN, 40 questões)
     - *Total de provas completas analisadas:* 12 cadernos com 630 questões reais catalogadas.
   - **Concursos Estaduais e Regionais de TI:**
     - TCE-RN (Analista e Auditor de TI — Cebraspe 2025/2026)
     - TJ-RN (Analista Judiciário de TI — FGV)
     - MP-RN (Analista do Ministério Público · TI — previsto na LOA/QDD 2026)
     - RN TI Estadual (DETRAN, CAERN, SEAD e TAEs)
   - **4 Concursos Previstos no PPA/LOA Potiguar:**
     - **Prefeitura de Natal — TI e Suporte (previsto):** provimento no PPA/LOA municipal para SEMAD, SMS e Finanças.
     - **ITEP/RN — Perito Criminal e TI Forense (previsto):** recomposição pericial e computação forense.
     - **FAPERN — Gestão de Projetos e TI (previsto):** gestão de dados científicos e plataformas em C&T.
     - **ARSEP/RN — Regulação de Serviços Públicos · TI (previsto):** fiscalização e dados regulatórios de concessões.
