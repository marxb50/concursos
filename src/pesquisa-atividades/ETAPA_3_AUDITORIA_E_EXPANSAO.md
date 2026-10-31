# Auditoria e expansão por concurso — entrega de 30/10/2026

Pedido de 30/10/2026: auditar as alterações, personalizar as atividades por concurso/banca, oferecer 40 a 100 questões por matéria em ordem de relevância e explicar cada questão com a professora.

## Estado recebido

- 28 concursos, 140 entradas de matérias, 53 missões, 688 rodadas.
- 24 matérias tinham menos de 40 atividades, muitas com apenas cinco definições. A contagem de 40 por missão não garantia 40 por matéria.
- Seleção por histórias genéricas levava questões de servidores/LGPD a disciplinas como Ciência Política.
- O botão Professor alternava cenas por índice, sem explicar o enunciado atual.
- Os 40 desafios SQL reutilizavam a mesma tabela de clientes e pedidos, mesmo quando o enunciado tratava de pacientes, turmas ou patrimônio. Vários comandos pediam filtros que um JOIN sozinho não realiza.
- A missão de decisões públicas apontava para uma história inexistente (`adm_principios`).
- O teste `--audio-completo` excluía novos concursos e a estratégia: 69 das 662 aulas estavam sem MP3 correspondente.
- Previsões de concursos em PPA/LOA estavam acompanhadas apenas de páginas institucionais genéricas; essas referências não comprovam a previsão alegada.
- O estado das questões era salvo por posição, permitindo confundir respostas antigas após troca dos enunciados.

Backup integral dos fontes recebidos: `output/backup/antes-auditoria-20261030.zip`. Inventário: `output/auditoria-inicial-20261030.json`. Banco recebido: `output/banco-antes-auditoria.json`.

## Critérios de entrega

1. Seleção explícita por matéria/concurso, com 40–100 questões distintas por trilha e pequenos conjuntos de rodadas. Reutilização de uma questão entre concursos compatíveis é informada, sem inflar o total de questões únicas.
2. Conteúdo e distratores revisados; contextos, tabelas, fórmulas e correção devem concordar. Nenhum preenchimento de quantidade por mera repetição do enunciado.
3. Formato de resposta considera a banca conhecida. Referências provisórias permanecem sugestões, sem atribuir banca ou incidência desconhecida.
4. Frequência histórica acompanha caderno, tema agrupado e números de questões. Importância por pontos acompanha edital; sequência pedagógica é identificada quando faltam dados.
5. Professora explica a questão atual, com raciocínio e cuidado específico; ouvir fundamento geral é uma ação complementar.
6. Progresso persistido por identificador e versão do conteúdo, revisão de erros e XP sem multiplicação por repetição.
7. Dois visuais, celular/desktop, teclado, recarga, áudio e ausência de erros JavaScript verificados antes de publicar.
8. Restaurar a verificação de áudio completo sem lista de exceções.

## Fontes novas conferidas

Os cinco cadernos de UFRN/IFRN adicionados pela outra implementação foram baixados diretamente dos endereços oficiais e tiveram tipo PDF, páginas e SHA-256 registrados em `output/auditoria-fontes/resultado.json`. Isso verifica os documentos de referência, não certifica individualmente os 630 gabaritos oficiais ou todas as classificações herdadas.

O [edital UFRN 022/2025 retificado em 10/09/2025](https://comperve.ufrn.br/conteudo/concursos/ufrn_2025_22_23/documentos/EDITAL-V-B-Edital_Retificado_N%23%23_022%232025_T%C3%A9cnicos_Administrativos_em_Educa%C3%A7%C3%A3o_%28Demais%20cargos%29_%23%24_%28Retificado_em_10_de_setembro_de_2025%29.pdf), itens 13.2 a 13.4, corrige a pontuação dos dois cargos de analista: nota objetiva de 0 a 10, com 15% Português, 15% Legislação e 70% Específicos. Há normalização pelos itens válidos, NPO mínima 5,0, ao menos um acerto válido em cada disciplina e limite de classificação. A nota final combina 60% objetiva e 40% teórico-prática. A interface evita apresentar 7/30 arredondado como valor exato por item.

O [edital UFRN 087/2022 retificado em 31/03/2023](https://comperve.ufrn.br/conteudo/concursos/ufrn_202287/documentos/edital_087_20230331.pdf), também nos itens 13.2 a 13.4, fundamenta a trilha de técnico de 2023: nota objetiva de 0 a 10, itens de igual valor, mínimo de 70% dos itens válidos, um acerto por disciplina e classificação dentro do limite para correção da redação.

O [edital TCE-RN](https://cdn.cebraspe.org.br/concursos/TCE_RN_25/arquivos/51D345AED7C21F67BB11D5DF0FB7701AF0438CEB91B6D6AA0917980AF9363636.pdf) confirma julgamento certo/errado, com +1/−1/0. A trilha foi renomeada como fundamentos comuns: os cargos 4, 5 e 12 não possuem um programa único. A referência de TJRN foi corrigida para a [página FGV do edital 02/2023](https://conhecimento.fgv.br/concursos/tjrn2023/02).

Nas seis trilhas institucionais sem edital vinculado, retirou-se a afirmação de previsão em PPA/LOA. As páginas disponíveis não comprovavam essa afirmação. A banca permanece não confirmada.

## Resultado

| Indicador | Recebido | Após auditoria |
|---|---:|---:|
| Concursos/trilhas | 28 | 28 |
| Matérias cadastradas | 140 | 140 |
| Matérias com menos de 40 questões | 24 | 0 |
| Banco distinto de questões | 688 rodadas | 1.224 questões autorais |
| Questões por matéria | 5 a mais de 100 | 40 a 100 |
| Explicações da professora | 662 | 1.886 |

São 7.786 posições de estudo, com compartilhamento de questões entre concursos compatíveis, e não 7.786 enunciados inéditos. [Tabela das 140 matérias](COBERTURA_ATIVIDADES_20261030.md). Os 880 novos exercícios são formados por 440 conceitos/casos, cada um com reconhecimento de definição e aplicação a uma situação. Outros 344 exercícios anteriores foram selecionados e corrigidos.

- Seleção explícita por cargo e matéria. Os pesos oficiais organizam disciplinas; a frequência de grupos temáticos observada em caderno organiza famílias relacionadas. Sem evidência específica, a ordem é pedagógica e identificada como tal. Não se inventam percentuais de incidência futura.
- Questões autorais adaptadas ao julgamento certo/errado de Cebraspe e ao número de alternativas quando aplicável. Laboratórios e alguns exercícios de fundamentos mantêm seu formato didático identificado; não são réplicas de provas oficiais.
- Fases de até 10 questões, dicas, correção comentada, fonte, revisão seletiva de erros e dúvidas e progresso salvo. XP é atribuído por questão canônica, sem multiplicação por repetir ou trocar de concurso.
- Progresso versão 2 identifica cada questão e a revisão de seu texto. Alterar enunciado/gabarito não reaproveita silenciosamente uma resposta antiga. XP anterior é preservado separadamente.
- Professor explica a questão aberta. Definição e caso do mesmo conceito compartilham uma explicação completa. Mapas relacionados de legislação federal e TI deixaram de recomendar, por mero nome genérico da matéria, legislação de guardas ou rotinas administrativas sem relação com o cargo.

## Correções de conteúdo e implementação

Os quatro laboratórios de JOIN agora pedem resultados que as tabelas exibidas efetivamente produzem: INNER 3 linhas, LEFT 4, RIGHT 4 e FULL 5. As perguntas de filtro, agregação, modelagem e transação foram reorganizadas em exercícios apropriados. A sequência de 40 tabelas-verdade repetidas foi substituída por questões variadas de lógica.

Corrigiram-se média ponderada (8 com peso 3 e 6 com peso 2 resultam em 7,2), problemas que omitiam arredondamento, condições de proporcionalidade e interpretações inválidas de deferimento/indeferimento. Também foram precisados KiB/MiB, limites de TCP, NAT/PAT, assinatura digital, consistência eventual, depreciação de APIs e segurança entre threads.

O compilador preserva identificadores, produz revisões de conteúdo e escapa caracteres que poderiam fechar um script dentro do HTML. Os builds Node e Python compartilham o manifesto. O gerador anterior passou a encaminhar ao compilador revisado.

## Thalita: decisão do usuário e pendências explícitas

O usuário escolheu manter Thalita e aguardar o serviço, sem gerar substituição com Francisca. Há 1.770 explicações cobertas por 1.166 gravações, com 116 explicações pendentes agrupadas em 80 roteiros distintos. Os textos e controles de navegação continuam disponíveis. A interface indica “Thalita Neural · gravação pendente”.

`roteiros-thalita-pendentes.json` preserva os IDs, versões e trechos exatos. A versão `.txt` organiza as gravações sem duplicação. `--audio-completo` voltou a exigir cobertura total; não passa enquanto houver pendências. `--audio-pendente-autorizado` aceita somente a lista exata, conferindo identificadores e versões.

## Validação

- `node verificar.cjs --audio-pendente-autorizado --build`: conteúdo, todas as 140 seleções, contagens, duplicações, gabaritos de regressão, progresso, revisão, XP, rotas, pesos e roteiros.
- `python verificar-audios.py`: 1.166 MP3 com hash, formato, duração e marcas válidas; 7.314 trechos e nenhuma falha. Reprodução Thalita existente também verificada no navegador.
- `tests/atividades-browser.js`: formatos da banca, tentativa errada, ajuda da professora, retomada, troca de visual durante a partida, revisão seletiva, quatro JOINs, repetição sem duplicar XP, atividades numéricas, ordenação, contexto institucional e texto de aula pendente.
- `tests/fluxos-browser.js`: busca, rotas diretas e inválidas, histórias, mapas, laboratórios, revisões, concursos pessoais, impressão, movimento reduzido e ausência de erros JavaScript.
- `tests/atividades-visuais-browser.js`: 216 combinações de rotas/jogos/professora nos temas Circuitos e Caderno, em larguras 320, 360, 390, 768, 1024 e 1440. Nenhum transbordamento, erro JavaScript ou falha de contraste detectada pelo verificador. Capturas desktop/celular inspecionadas visualmente.

## Limites da entrega

As atividades são treino autoral de fundamentos e aplicações, não transcrição de questões oficiais nem promessa de cobertura integral de todos os editais. As fontes e frequências históricas não preveem provas futuras. A trilha TCE-RN é comum a especialidades distintas; trilhas sem edital permanecem orientativas. A única pendência de reprodução é a geração dos roteiros explicitamente marcados para aguardar Thalita.
