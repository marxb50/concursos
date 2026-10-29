/* Classificação didática de cadernos completos, identificados por órgão, cargo e data. */
const NATAL_2023_EXAM='https://funcern.br/documents/968/CCMN_07__NS_ASSISTENTE_LEGISLATIVO_ALNS__ASSISTENTE_GERAL_GENERALISTA.pdf';
const SAO_2021_EXAM='https://arquivos.qconcursos.com/prova/arquivo_prova/84025/ibfc-2021-prefeitura-de-sao-goncalo-do-amarante-rn-agente-administrativo-prova.pdf';
const natalPortObserved=[
 {name:'Interpretação, ponto de vista e construção do texto',questions:[1,2,3,4,7]},
 {name:'Crase',questions:[5]},
 {name:'Sintaxe e referência dos pronomes',questions:[6]},
 {name:'Pontuação',questions:[8]},
 {name:'Concordância e sujeito',questions:[9]},
 {name:'Funções da palavra “se”',questions:[10]}
];
const natalLogicObserved=[
 {name:'Sequência numérica',questions:[11]},
 {name:'Argumentos e dedução',questions:[12,14]},
 {name:'Resolução de problemas com relações e condições',questions:[13,19]},
 {name:'Quantificadores e relações entre conjuntos',questions:[15]},
 {name:'Probabilidade sem reposição',questions:[16]},
 {name:'Proposições: negação e valores lógicos',questions:[17,18]},
 {name:'Raciocínio com figuras',questions:[20]}
];
const natalSpecificObserved=[
 {name:'Administração, comunicação, pessoas e processos',questions:[22,23,26,28,31,32,33,34]},
 {name:'Regimento Interno da Câmara de Natal',questions:[27,29,35,40]},
 {name:'Direito Constitucional',questions:[24,37,39]},
 {name:'Licitações e Direito Administrativo',questions:[21,25,36]},
 {name:'Arquivologia',questions:[30,38]}
];
const saoPortObserved=[
 {name:'Interpretação do texto',questions:[1,4]},
 {name:'Significado de palavras',questions:[2]},
 {name:'Classes de palavras e pronomes',questions:[3,8,14]},
 {name:'Conectivos e relações de sentido',questions:[7]},
 {name:'Pontuação',questions:[5,15]},
 {name:'Acentuação',questions:[6,12]},
 {name:'Ortografia',questions:[9]},
 {name:'Crase',questions:[10]},
 {name:'Concordância e formas verbais',questions:[11]},
 {name:'Sintaxe: aposto e vocativo',questions:[13]}
];
const saoLogicObserved=[
 {name:'Probabilidade e eventos',questions:[17,22,27,28]},
 {name:'Contagem e análise combinatória',questions:[18,19,29]},
 {name:'Conjuntos e interseção',questions:[21,25]},
 {name:'Proposições, argumentos e tabela-verdade',questions:[24,26,30]},
 {name:'Sequência e figuras',questions:[16,20]},
 {name:'Codificação em matriz',questions:[23]}
];
const saoInfoObserved=[
 {name:'Extensões de arquivo e imagens',questions:[31]},
 {name:'Topologia de redes',questions:[32]},
 {name:'Windows e atalhos do sistema',questions:[33,39,40]},
 {name:'Hardware e periféricos',questions:[34]},
 {name:'Planilhas: funções SE e MÉDIA',questions:[35,36]},
 {name:'Word: sumário e formatação',questions:[37,38]}
];
const byObservation=(observed,matching={},fallbackJourney=null)=>observed.map((o,i)=>TOPIC(`tema-${i+1}`,o.name,matching[o.name]||fallbackJourney));
const WORKED_NATAL_PORT=[{
 title:'Classificação da palavra “se” na frase',reference:'Exemplo inspirado na questão 10 · Câmara de Natal, caderno reaplicado em 30/07/2023',
 intro:'Em “Alugam-se salas comerciais”, queremos identificar a função do “se” e por que o verbo está no plural.',
 steps:['O verbo “alugar” é transitivo direto (quem aluga, aluga alguma coisa).','Na frase, “salas comerciais” sofre a ação de ser alugada e funciona como sujeito paciente ("Salas comerciais são alugadas").','Portanto, o “se” é partícula apassivadora e o verbo concorda no plural com “salas comerciais”.'],
 lesson:'port_concordancia',lessonLabel:'Revisar concordância e sujeito'
}];
const WORKED_NATAL_LOGIC=[{
 title:'Dois veículos do mesmo tipo',reference:'Exemplo recontado da questão 16 · Câmara de Natal, caderno reaplicado em 30/07/2023',
 intro:'Há seis carros e quatro motos. Dois veículos saem ao acaso, um depois do outro, sem voltar. Vamos encontrar a chance de saírem dois do mesmo tipo.',
 steps:['Primeiro conte o total: 6 carros + 4 motos = 10 veículos.','Dois carros: 6/10 × 5/9 = 30/90. Depois do primeiro carro, sobram 5 carros entre 9 veículos.','Duas motos: 4/10 × 3/9 = 12/90. Depois da primeira moto, sobram 3 motos entre 9 veículos.','Os casos “dois carros” e “duas motos” não acontecem juntos no mesmo par; somamos: 30/90 + 12/90 = 42/90 = 7/15.','O resultado é aproximadamente 46,7%, que se aproxima de 47%.'],
 lesson:'mat_probabilidade',lessonLabel:'Entender probabilidade desde o começo'
},{
 title:'Negar uma frase com “se... então”',reference:'Exemplo autoral inspirado no tema da questão 17 · Câmara de Natal, 2023',
 intro:'Considere a afirmação: “Se a loja abre, Lia trabalha”. Para negá-la, procuramos uma situação em que a loja abre, mas Lia não trabalha.',
 steps:['Chame de P a frase “a loja abre” e de Q a frase “Lia trabalha”.','A frase original tem a forma “se P, então Q”.','Ela é falsa quando P acontece e Q não acontece.','A negação é “P e não Q”: a loja abre e Lia não trabalha.'],
 lesson:'logic_proposicoes',lessonLabel:'Ver a história de lógica'
}];
const WORKED_NATAL_SPEC=[{
 title:'Fases do arquivo: corrente, intermediário e permanente',reference:'Exemplo inspirado nas questões 30 e 38 · Câmara de Natal, 2023',
 intro:'Na gestão documental, como saber se um documento está no arquivo corrente, intermediário ou permanente?',
 steps:['Se o documento é consultado com frequência nas rotinas atuais do setor, ele está no arquivo corrente (1ª idade).','Se já cumpriu seu uso imediato e apenas aguarda prazos legais ou prescricionais na tabela de temporalidade, está no arquivo intermediário (2ª idade).','Se tem valor histórico, probatório ou cultural definitivo, jamais é eliminado e vai para o arquivo permanente (3ª idade).'],
 lesson:'info_arquivos',lessonLabel:'Explorar organização de arquivos'
}];
const WORKED_SAO_PORT=[{
 title:'Vírgula no vocativo versus proibição entre sujeito e verbo',reference:'Exemplo inspirado nas questões 5, 13 e 15 · São Gonçalo do Amarante/RN, IBFC 2021',
 intro:'Compare “Maria, confira o relatório” com “Maria conferiu o relatório”. Por que a primeira tem vírgula e a segunda não?',
 steps:['Na primeira frase, “Maria” é um chamado direto ao interlocutor (vocativo); o vocativo é sempre isolado por vírgula.','Na segunda frase, “Maria” é o sujeito do verbo “conferiu”; na ordem direta, não se separa o sujeito do verbo por vírgula.'],
 lesson:'port_pontuacao',lessonLabel:'Entender pontuação passo a passo'
}];
const WORKED_SAO_LOGIC=[{
 title:'A próxima carta após retirar cartas comuns',reference:'Exemplo recontado da questão 17 · São Gonçalo do Amarante/RN, 2021',
 intro:'Um baralho tem 54 cartas, incluindo dois coringas. Depois de virar 14 cartas que não são coringas, queremos saber a chance de a próxima ser um coringa.',
 steps:['As 14 cartas viradas já saíram do conjunto possível: 54 − 14 = 40 cartas restantes.','Como nenhuma delas era coringa, os dois coringas continuam entre as 40 cartas.','Sob a hipótese de uma ordem aleatória, a chance é 2/40 = 1/20 = 5%.','Se a informação sobre as cartas retiradas fosse diferente, o número de coringas restantes poderia mudar.'],
 lesson:'mat_probabilidade',lessonLabel:'Aprender probabilidade desde o começo'
}];
const WORKED_SAO_INFO=[{
 title:'Funções SE e MÉDIA na planilha eletrônica',reference:'Exemplo inspirado nas questões 35 e 36 · São Gonçalo do Amarante/RN, IBFC 2021',
 intro:'Considere as células A1 = 6, A2 = 8 e A3 = 10. O que retorna a fórmula =SE(MÉDIA(A1:A3)>=7;"Aprovado";"Revisar")?',
 steps:['O intervalo A1:A3 inclui A1, A2 e A3 (dois-pontos significa “até”).','A função MÉDIA(A1:A3) soma 6 + 8 + 10 = 24 e divide por 3, resultando em 8.','A função SE testa a condição 8 >= 7: como é verdadeira, retorna o segundo argumento (“Aprovado”).'],
 lesson:'info_planilhas',lessonLabel:'Ver a história de planilhas'
}];
const saoInfoSubjects=[TOPIC('arquivos','Arquivos, extensões e formatos','info_arquivos'),TOPIC('redes','Redes e topologias','infra'),TOPIC('windows','Windows: recursos e atalhos','info_arquivos'),TOPIC('hardware','Hardware e periféricos','info_hardware'),TOPIC('excel','Planilhas: células e funções','info_planilhas'),TOPIC('word','Editor de texto: estrutura e formatação','info_documentos')];
const natalSubjects=[
 subj('portugues','Língua Portuguesa',10,byObservation(natalPortObserved,{'Interpretação, ponto de vista e construção do texto':'port_texto','Crase':'port_crase','Sintaxe e referência dos pronomes':'port_texto','Pontuação':'port_pontuacao','Concordância e sujeito':'port_concordancia','Funções da palavra “se”':'port_concordancia'},'port_texto'),'port_texto',natalPortObserved,WORKED_NATAL_PORT),
 subj('logica','Lógica',10,byObservation(natalLogicObserved,{'Sequência numérica':'mat_equacoes','Argumentos e dedução':'logic_proposicoes','Resolução de problemas com relações e condições':'logic_proposicoes','Quantificadores e relações entre conjuntos':'logic_conjuntos','Probabilidade sem reposição':'mat_probabilidade','Proposições: negação e valores lógicos':'logic_proposicoes','Raciocínio com figuras':'mat_equacoes'},'logic_proposicoes'),'logic_proposicoes',natalLogicObserved,WORKED_NATAL_LOGIC),
 subj('especificos','Conhecimentos específicos',20,byObservation(natalSpecificObserved,{'Administração, comunicação, pessoas e processos':'gestao','Regimento Interno da Câmara de Natal':'const_fundamentos','Direito Constitucional':'const_fundamentos','Licitações e Direito Administrativo':'etica_servico','Arquivologia':'info_arquivos'},'gestao'),'gestao',natalSpecificObserved,WORKED_NATAL_SPEC)
];
const saoSubjects=[
 subj('portugues','Língua Portuguesa',15,byObservation(saoPortObserved,{'Interpretação do texto':'port_texto','Significado de palavras':'port_texto','Classes de palavras e pronomes':'port_sujeito','Conectivos e relações de sentido':'port_texto','Pontuação':'port_pontuacao','Acentuação':'port_acentos','Ortografia':'port_acentos','Crase':'port_crase','Concordância e formas verbais':'port_concordancia','Sintaxe: aposto e vocativo':'port_pontuacao'},'port_texto'),'port_texto',saoPortObserved,WORKED_SAO_PORT),
 subj('logica','Raciocínio Lógico',15,byObservation(saoLogicObserved,{'Probabilidade e eventos':'mat_probabilidade','Contagem e análise combinatória':'mat_combinatoria','Conjuntos e interseção':'logic_conjuntos','Proposições, argumentos e tabela-verdade':'logic_proposicoes','Sequência e figuras':'mat_equacoes','Codificação em matriz':'mat_combinatoria'},'logic_proposicoes'),'logic_proposicoes',saoLogicObserved,WORKED_SAO_LOGIC),
 subj('informatica','Noções de Informática',10,saoInfoSubjects,'info_hardware',saoInfoObserved,WORKED_SAO_INFO)
];

// Caderno completo nacional de TI: Dataprev 2024 (FGV · 70 questões · Desenvolvimento de Software).
const DATAPREV_2024_EXAM='https://conhecimento.fgv.br/sites/default/files/concursos/ati-desenvolvimento-de-software-cns003-tipo-01.pdf';
// Conferência direta das 70 questões do Tipo 1 em 29/10/2026. Um tema principal por questão.
const dataprevPortObserved=[
 {name:'Leitura, interpretação, discurso e variação linguística',questions:[3,4,8,12]},
 {name:'Sintaxe: orações subordinadas e adjunto adnominal',questions:[1,2]},
 {name:'Vocabulário e sentido dos conectivos',questions:[6,9]},
 {name:'Verbos de ligação e concordância nominal',questions:[10,11]},
 {name:'Regência verbal',questions:[5]},
 {name:'Pontuação: emprego da vírgula',questions:[7]}
];
const dataprevEngObserved=[
 {name:'Compreensão de textos de divulgação e pesquisa',questions:[13,14,18,21]},
 {name:'Vocabulário, classes de palavras e verbo modal',questions:[20,22,23,24]},
 {name:'Referência pronominal e conectivos',questions:[15,16,17,19]}
];
const dataprevLogicObserved=[
 {name:'Proporcionalidade e porcentagem',questions:[25,30]},
 {name:'Média ponderada',questions:[26]},
 {name:'Equações e operações algébricas',questions:[27]},
 {name:'Proposições e equivalência condicional',questions:[28]},
 {name:'Contagem e análise combinatória',questions:[29]}
];
const dataprevAtualObserved=[
 {name:'Meio ambiente, sustentabilidade e impactos digitais',questions:[32,33,35]},
 {name:'Cooperação internacional e G20',questions:[31]},
 {name:'Dados pessoais e consumo',questions:[34]}
];
const dataprevLegisObserved=[
 {name:'LGPD: sanções, ANPD e conselho nacional',questions:[39,40]},
 {name:'Crimes informáticos e Marco Civil da Internet',questions:[37,38]},
 {name:'Lei de Acesso à Informação: restrições de acesso',questions:[36]}
];
const dataprevSpecObserved=[
 {name:'Programação, frameworks Java, formatos web e aplicações móveis',questions:[41,42,48,49,50,51]},
 {name:'Engenharia de software: arquitetura, requisitos, métricas e testes',questions:[43,45,47,52,54,57]},
 {name:'Ciência de dados: BI, Data Warehouse, ETL/ELT e inteligência artificial',questions:[58,59,60,61,65,67]},
 {name:'Segurança: TLS, blockchain, controle de acesso, OWASP e X.800',questions:[46,56,62,63,64]},
 {name:'Agilidade, Scrum, projetos híbridos e DevOps',questions:[53,55,68,69,70]},
 {name:'Redes corporativas: Internet, intranet e extranet',questions:[44]},
 {name:'Bancos de dados NoSQL',questions:[66]}
];
const WORKED_DATAPREV_PORT=[{
 title:'Reescrita mantendo o sentido e a correção gramatical',reference:'Exemplo autoral de leitura e reescrita · preparação para provas da FGV',
 intro:'Nas provas da FGV, questões de reescrita costumam trocar um conectivo por outro ou alterar a ordem dos termos. Como avaliar sem cair em armadilhas?',
 steps:['Identifique primeiro a relação lógica original: oposição (“embora”, “contudo”), causa (“já que”, “visto que”), condição (“caso”) ou finalidade (“para que”).','Elimine alternativas que trocam uma relação por outra (por exemplo, trocar concessão por causa).','Verifique se a mudança de posição de vírgulas não separou o sujeito do verbo nem alterou o termo a que um adjetivo ou advérbio se refere.'],
 lesson:'port_texto',lessonLabel:'Aprender leitura e sentido desde o começo'
}];
const WORKED_DATAPREV_ENG=[{
 title:'Pronome de referência e falso cognato em texto técnico',reference:'Exemplo autoral de referência pronominal e vocabulário em inglês',
 intro:'No trecho “The system processes sensitive records; it encrypts them before storage, actually reducing exposure”, a quem se referem “it” e “them”, e o que significa “actually”?',
 steps:['O pronome singular “it” retoma o substantivo singular anterior (“The system”).','O pronome plural “them” retoma o termo plural “sensitive records”.','O advérbio “actually” significa “na verdade / de fato” (e não “atualmente”, que em inglês é “currently” ou “nowadays”).'],
 lesson:'ingles_leitura',lessonLabel:'Ver a história de leitura em inglês'
}];
const WORKED_DATAPREV_TI=[{
 title:'Idempotência em métodos HTTP de uma API REST',reference:'Exemplo inspirado nas questões de arquitetura e web · Dataprev, FGV 2024',
 intro:'Ao integrar microsserviços, uma falha de rede pode fazer o cliente reenviar a mesma requisição. Quais verbos HTTP são idempotentes por definição?',
 steps:['Uma operação é idempotente quando executá-la uma ou várias vezes com os mesmos parâmetros produz o mesmo estado no servidor.','GET (consultar), PUT (substituir um recurso inteiro no mesmo endereço) e DELETE (remover um recurso) são idempotentes.','POST normalmente cria um novo recurso ou dispara um processamento a cada chamada, portanto não é idempotente por padrão.'],
 lesson:'web',lessonLabel:'Revisar HTTP, REST e web do zero'
},{
 title:'Consulta SQL com agregação e filtro após agrupamento (HAVING)',reference:'Exemplo autoral complementar de SQL · não reproduz questão do caderno de 2024',
 intro:'Queremos listar apenas os departamentos que possuem mais de 10 servidores ativos na tabela funcionario.',
 steps:['O filtro por linha individual (“ativo = true”) vai na cláusula WHERE, antes de agrupar.','O agrupamento por departamento é feito com GROUP BY id_departamento.','Para filtrar pelo resultado da função de agregação COUNT(*), usamos HAVING COUNT(*) > 10 (pois o WHERE não aceita funções agregadas diretamente).'],
 lesson:'sql',lessonLabel:'Praticar SQL passo a passo'
}];
const WORKED_DATAPREV_LOGIC=[{
 title:'Contrapositiva de uma regra de monitoramento (“Se P, então Q”)',reference:'Exemplo autoral relacionado à questão 28 de 2024 e às questões 25 e 28 de 2026 · Dataprev/FGV',
 intro:'A regra de um centro de processamento diz: “Se a ocupação dos servidores passa de 80%, então o alerta noturno é acionado”. O alerta noturno não foi acionado. O que podemos concluir?',
 steps:['A afirmação tem a forma condicional P → Q (ocupação > 80% → alerta acionado).','A contrapositiva equivalente é ~Q → ~P: se o alerta não foi acionado (~Q), então a ocupação não passou de 80% (~P).','Cuidado com a inversão falaciosa: saber que o alerta foi acionado (Q) não garante sozinho que a causa foi a ocupação > 80% (poderia haver outro motivo).'],
 lesson:'logic_proposicoes',lessonLabel:'Revisar proposições e implicações'
}];
const WORKED_DATAPREV_ATUAL=[{
 title:'Modelos de linguagem (LLMs), alucinação e consumo de infraestrutura',reference:'Exemplo autoral relacionado aos temas de IA das questões 30 a 35 · Dataprev/FGV 2026',
 intro:'Grandes modelos de linguagem (LLMs) geram texto prevendo tokens a partir de padrões estatísticos. Por que exigem revisão humana e grandes data centers?',
 steps:['Por operarem por probabilidade sobre padrões de treino, modelos generativos podem produzir respostas fluentes mas factualmente incorretas (alucinações).','O treinamento e a inferência em larga escala demandam alto processamento paralelo (GPUs/TPUs), energia elétrica e sistemas de refrigeração em data centers.','Na avaliação de aprendizado de máquina, métricas como precisão e revocação (recall) devem ser aferidas em dados de teste separados do treino.'],
 lesson:'dados',lessonLabel:'Ver a história de dados e IA'
}];
const WORKED_DATAPREV_LEGIS=[{
 title:'LGPD (Lei 13.709/2018) e Marco Civil da Internet (Lei 12.965/2014)',reference:'Exemplo inspirado nas questões 36 a 40 · Dataprev, FGV 2024 e 2026',
 intro:'Como diferenciar os papéis de controlador, operador e encarregado na LGPD e o dever de guarda de registros no Marco Civil?',
 steps:['Na LGPD, o controlador toma as decisões referentes ao tratamento de dados pessoais; o operador realiza o tratamento em nome do controlador; o encarregado (DPO) atua como canal de comunicação com os titulares e a ANPD.','Dados pessoais sensíveis (origem racial/étnica, convicção religiosa, saúde, biometria etc.) possuem rol e hipóteses legais mais estritas (art. 11 da LGPD).','No Marco Civil da Internet, provedores de conexão e de aplicações têm prazos distintos e dever legal de manter os registros de conexão e de acesso a aplicações sob sigilo e segurança.'],
 lesson:'seguranca',lessonLabel:'Estudar segurança e proteção de dados'
}];
const dataprevSubjects=[
 subj('portugues','Língua Portuguesa',12,byObservation(dataprevPortObserved,{'Sintaxe: orações subordinadas e adjunto adnominal':'port_sujeito','Verbos de ligação e concordância nominal':'port_concordancia','Regência verbal':'port_crase','Pontuação: emprego da vírgula':'port_pontuacao'},'port_texto'),'port_texto',dataprevPortObserved,WORKED_DATAPREV_PORT),
 subj('ingles','Língua Inglesa',12,byObservation(dataprevEngObserved,{},'ingles_leitura'),'ingles_leitura',dataprevEngObserved,WORKED_DATAPREV_ENG),
 subj('raciocinio','Raciocínio Lógico-Matemático',6,byObservation(dataprevLogicObserved,{'Proposições e equivalência condicional':'logic_proposicoes','Contagem e análise combinatória':'mat_combinatoria','Média ponderada':'mat_media','Equações e operações algébricas':'mat_equacoes'},'mat_porcento'),'logic_proposicoes',dataprevLogicObserved,WORKED_DATAPREV_LOGIC),
 subj('atualidades','Atualidades e Sociedade',5,byObservation(dataprevAtualObserved,{},'etica_servico'),'etica_servico',dataprevAtualObserved,WORKED_DATAPREV_ATUAL),
 subj('legislacao-ti','Legislação Acerca de Segurança de Informações',5,byObservation(dataprevLegisObserved,{},'seguranca'),'seguranca',dataprevLegisObserved,WORKED_DATAPREV_LEGIS),
 subj('especificos','Conhecimentos Específicos · Desenvolvimento de Software',30,byObservation(dataprevSpecObserved,{'Programação, frameworks Java, formatos web e aplicações móveis':'java','Ciência de dados: BI, Data Warehouse, ETL/ELT e inteligência artificial':'dados','Segurança: TLS, blockchain, controle de acesso, OWASP e X.800':'seguranca','Agilidade, Scrum, projetos híbridos e DevOps':'gestao','Redes corporativas: Internet, intranet e extranet':'infra','Bancos de dados NoSQL':'sql'},'engenharia'),'engenharia',dataprevSpecObserved,WORKED_DATAPREV_TI)
];

// Caderno completo nacional de TI: Dataprev 2026 (FGV · 70 questões · Desenvolvimento de Software).
const DATAPREV_2026_EXAM='https://conhecimento.fgv.br/sites/default/files/concursos/analista-de-tecnologia-da-informacao-desenvolvimento-de-software-cns003-tipo-1.pdf';
const dataprev26PortObserved=[
 {name:'Compreensão, estrutura textual e tipologia (expositivo/argumentativo)',questions:[1,2,4,9,11]},
 {name:'Coesão referencial, pronomes demonstrativos (este/aquele) e antecedente',questions:[3,6,7]},
 {name:'Semântica, polissemia, valor do conectivo “de” e adjetivação opinativa',questions:[5,8,10,12]}
];
const dataprev26EngObserved=[
 {name:'Compreensão de textos sobre IA na escrita e computação em nuvem',questions:[13,15,20,22]},
 {name:'Vocabulário contextual, sinônimos e phrasal verbs (bout, punchier, skip, looking for)',questions:[14,18,19,23]},
 {name:'Figuras de linguagem (antítese), uso de “like” e termos técnicos (vendor lock-in, non-hackable)',questions:[16,17,21,24]}
];
const dataprev26LogicObserved=[
 {name:'Lógica proposicional, condicionais e sensores de monitoramento',questions:[25,28]},
 {name:'Quantificadores, conjuntos e dedução sobre alterações e inventário',questions:[26,29]},
 {name:'Sequência numérica e operações iterativas em contador',questions:[27]}
];
const dataprev26AtualObserved=[
 {name:'Infraestrutura de data centers para IA, geopolítica e comércio internacional (OMC)',questions:[30,31,32]},
 {name:'Redes neurais, LLMs generativos e métodos de aprendizado de máquina',questions:[33,34,35]}
];
const dataprev26LegisObserved=[
 {name:'LGPD (Lei 13.709/2018): bases legais, dados em concursos e boas práticas de segurança',questions:[36,39,40]},
 {name:'Ilícitos cibernéticos (uso indevido de credenciais) e Marco Civil da Internet (Lei 12.965/2014)',questions:[37,38]}
];
const dataprev26SpecObserved=[
 {name:'Segurança da informação: incidentes, ISO 27001/27002, controle de acesso, OWASP Top 10:2025 e SAST/DAST',questions:[41,42,43,44,45,57]},
 {name:'Bancos de dados, normalização (2FN/3FN), SQL, modelagem e Data Warehouse (estrela/ETL/regras de associação)',questions:[46,47,48,49,50,51,52,62,63,64]},
 {name:'Engenharia de requisitos, elicitação, TDD, Kanban e Arquitetura Orientada a Serviços (SOA)',questions:[53,54,55,56,58]},
 {name:'Programação Java, exceções, controle de fluxo e arquitetura corporativa',questions:[59,60,61]},
 {name:'Processos (BPMN, AS-IS/TO-BE), projetos (PMBOK), serviços (ITIL v4), governança e redes',questions:[65,66,67,68,69,70]}
];
const WORKED_DATAPREV26_TI=[{
 title:'Dependência parcial e Segunda Forma Normal (2FN)',reference:'Exemplo inspirado na questão 46 · Dataprev, FGV 2026',
 intro:'Na tabela Projeto_Engenheiro(CodigoEngenheiro, CodigoProjeto, HorasAlocadas, NomeEngenheiro), a chave primária é composta por (CodigoEngenheiro, CodigoProjeto). Por que ela viola a 2FN?',
 steps:['A coluna NomeEngenheiro depende apenas de CodigoEngenheiro (parte da chave primária composta), e não do projeto.','Isso é uma dependência funcional parcial, que gera redundância e anomalias de atualização.','Para colocar na 2FN, separamos NomeEngenheiro em uma tabela Engenheiro(CodigoEngenheiro, NomeEngenheiro), deixando apenas HorasAlocadas na tabela associativa.'],
 lesson:'sql',lessonLabel:'Entender bancos de dados e normalização'
},{
 title:'SAST versus DAST no desenvolvimento seguro',reference:'Exemplo inspirado nas questões 45 e 57 · Dataprev, FGV 2026',
 intro:'Qual é a diferença entre ferramentas SAST (Static Application Security Testing) e DAST (Dynamic Application Security Testing)?',
 steps:['O SAST analisa o código-fonte, bytecodes ou binários de forma estática (caixa-branca), sem precisar executar a aplicação em produção, podendo rodar já na IDE ou no pipeline de CI.','O DAST testa a aplicação em execução (caixa-preta), enviando requisições externas para identificar falhas de configuração, autenticação ou injeção em tempo de execução.','As duas abordagens são complementares dentro do ciclo DevSecOps.'],
 lesson:'seguranca',lessonLabel:'Revisar segurança no desenvolvimento'
}];
const dataprev26Subjects=[
 subj('portugues','Língua Portuguesa',12,byObservation(dataprev26PortObserved,{},'port_texto'),'port_texto',dataprev26PortObserved,WORKED_DATAPREV_PORT),
 subj('ingles','Língua Inglesa',12,byObservation(dataprev26EngObserved,{},'ingles_leitura'),'ingles_leitura',dataprev26EngObserved,WORKED_DATAPREV_ENG),
 subj('raciocinio','Raciocínio Lógico-Matemático',5,byObservation(dataprev26LogicObserved,{'Lógica proposicional, condicionais e sensores de monitoramento':'logic_proposicoes','Quantificadores, conjuntos e dedução sobre alterações e inventário':'logic_conjuntos','Sequência numérica e operações iterativas em contador':'mat_equacoes'},'logic_proposicoes'),'logic_proposicoes',dataprev26LogicObserved,WORKED_DATAPREV_LOGIC),
 subj('atualidades','Atualidades e Inteligência Artificial',6,byObservation(dataprev26AtualObserved,{},'dados'),'dados',dataprev26AtualObserved,WORKED_DATAPREV_ATUAL),
 subj('legislacao-ti','Legislação Acerca de Segurança da Informação e Proteção de Dados',5,byObservation(dataprev26LegisObserved,{},'seguranca'),'seguranca',dataprev26LegisObserved,WORKED_DATAPREV_LEGIS),
 subj('especificos','Conhecimentos Específicos · Desenvolvimento de Software',30,byObservation(dataprev26SpecObserved,{'Segurança da informação: incidentes, ISO 27001/27002, controle de acesso, OWASP Top 10:2025 e SAST/DAST':'seguranca','Bancos de dados, normalização (2FN/3FN), SQL, modelagem e Data Warehouse (estrela/ETL/regras de associação)':'sql','Engenharia de requisitos, elicitação, TDD, Kanban e Arquitetura Orientada a Serviços (SOA)':'engenharia','Programação Java, exceções, controle de fluxo e arquitetura corporativa':'java','Processos (BPMN, AS-IS/TO-BE), projetos (PMBOK), serviços (ITIL v4), governança e redes':'gestao'},'engenharia'),'engenharia',dataprev26SpecObserved,WORKED_DATAPREV26_TI)
];

// Caderno completo nacional de TI: CGU 2022 (FGV · 80 questões · Conhecimentos Específicos e Especializados de TI).
const CGU_2022_EXAM='https://conhecimento.fgv.br/sites/default/files/concursos/cgu_2021_auditor_federal_de_financas_e_controle_-_area_tecnologia_da_informacaoaffc-ti_tipo_1_tarde.pdf';
const cgu22ConstObserved=[
 {name:'Ordem econômica, livre iniciativa, tributação e federalismo',questions:[1,3,6]},
 {name:'Poder Judiciário, Poder Legislativo (CPI) e controle de constitucionalidade',questions:[2,4,8,10]},
 {name:'Administração pública na CF/88, aposentadoria, revisão anual e direitos individuais',questions:[5,7,9]}
];
const cgu22AdmObserved=[
 {name:'Improbidade administrativa, responsabilidade civil do Estado e servidores públicos',questions:[11,12,13,16,17]},
 {name:'Processo administrativo, poder de polícia, atos complexos/compostos e agências reguladoras',questions:[14,15,22,23]},
 {name:'LGPD no poder público, Dados Abertos (Decreto 8.777/2016), licitações, conflito de interesses (quarentena) e controle',questions:[18,19,20,21,24]}
];
const cgu22AfoObserved=[
 {name:'Orçamento público, LDO, LOA, emendas impositivas e reserva de contingência',questions:[25,26,27]},
 {name:'Limites de despesa com pessoal (LRF), resultado primário e estágios da receita',questions:[28,29]}
];
const cgu22AudObserved=[
 {name:'Auditoria interna governamental, riscos, controles, modelo das três linhas e evidências',questions:[30,31,32,33,34,35]},
 {name:'Organização e competências da CGU, acordo de leniência (Lei 12.846/2013), integridade e correição',questions:[36,37,38,39,40]}
];
const cgu22DadosObserved=[
 {name:'Aprendizado de máquina, matriz de confusão, regressão e avaliação estatística',questions:[41,42,44,47]},
 {name:'Pipelines de dados, código Python e processamento de linguagem natural (TF-IDF/vetores)',questions:[43,45,46,48]}
];
const cgu22DevObserved=[
 {name:'Controle de versão (Git/Mercurial/SVN), Scrum (Meta da Sprint) e testes baseados em experiência',questions:[49,55,56]},
 {name:'Desenvolvimento seguro, proteção de dados sensíveis, HTML/JS, concorrência e Java OO (interfaces/herança)',questions:[50,51,52,53,54]}
];
const cgu22DbObserved=[
 {name:'PostgreSQL (sequences), SQL Server (identity, metadados) e consultas SQL (JOIN, subconsultas e DELETE)',questions:[57,58,60,61,62]},
 {name:'NoSQL (MongoDB), governança de dados (DAMA-DMBOK / Data Stewards) e transações/log (ACID)',questions:[59,63,64]}
];
const cgu22InfraObserved=[
 {name:'Nuvem AWS (security groups, escalabilidade), contêineres Docker e cultura DevOps',questions:[65,66,67,72]},
 {name:'Contratação de TIC (ETP), níveis de serviço (SLA/SLI/SLO), redes QoS (voz/vídeo) e ITIL v4',questions:[68,69,70,71]}
];
const cgu22SecObserved=[
 {name:'Gestão de continuidade de negócios (PGCN), gestão de riscos (ISO 27005), SGSI (ISO 27001) e normas do GSI',questions:[73,76,78,80]},
 {name:'Tratamento de incidentes (ETIR/CTIR Gov), privacidade, certificação digital X.509/PKIX e acesso remoto seguro',questions:[74,75,77,79]}
];
const WORKED_CGU22_AFO=[{
 title:'Reserva de contingência e limites de despesa com pessoal na LRF',reference:'Exemplo inspirado nas questões 27 e 28 · CGU TI, FGV 2022',
 intro:'Para que serve a Reserva de Contingência na Lei Orçamentária Anual (LOA) segundo a Lei de Responsabilidade Fiscal (LC 101/2000)?',
 steps:['Pelo art. 5º, III, da LRF, a LOA conterá reserva de contingência, cuja forma de utilização e montante, definido com base na receita corrente líquida (RCL), serão estabelecidos na LDO.','Sua finalidade principal é o atendimento de passivos contingentes e outros riscos e eventos fiscais imprevistos.','Já na apuração da despesa total com pessoal (art. 19, § 1º, da LRF), não se computam indenizações por demissão e incentivos à demissão voluntária.'],
 lesson:'afo_orcamento',lessonLabel:'Aprender orçamento público e LRF do zero'
}];
const WORKED_CGU22_DB=[{
 title:'Remover clientes sem visitas usando subconsulta em SQL',reference:'Exemplo inspirado na questão 62 · CGU TI, FGV 2022',
 intro:'Temos as tabelas cliente(codigo, nome) e visita(codigo, data). Como escrever um DELETE que apague apenas os clientes que nunca realizaram visita?',
 steps:['Queremos excluir da tabela cliente aqueles cujo codigo não aparece na tabela visita.','Podemos usar uma subconsulta correlacionada: WHERE (SELECT COUNT(*) FROM visita v WHERE v.codigo = cliente.codigo) = 0 (ou NOT EXISTS / NOT IN sem valores nulos).','Cuidado com operadores diferentes (<>): comparar v.codigo <> cliente.codigo contaria visitas de outros clientes, e não a ausência de visitas do próprio cliente.'],
 lesson:'sql',lessonLabel:'Praticar SQL e junções desde o começo'
}];
const cgu22Subjects=[
 subj('constitucional','Direito Constitucional',10,byObservation(cgu22ConstObserved,{},'const_fundamentos'),'const_fundamentos',cgu22ConstObserved,WORKED_GCM_CONST),
 subj('administrativo','Direito Administrativo',14,byObservation(cgu22AdmObserved,{},'const_fundamentos'),'const_fundamentos',cgu22AdmObserved,WORKED_ADM_SPEC),
 subj('afo','Administração Financeira e Orçamentária',5,byObservation(cgu22AfoObserved,{},'afo_orcamento'),'afo_orcamento',cgu22AfoObserved,WORKED_CGU22_AFO),
 subj('auditoria','Auditoria Governamental e Controladoria (CGU)',11,byObservation(cgu22AudObserved,{},'etica_servico'),'etica_servico',cgu22AudObserved,WORKED_ETICA_AUD),
 subj('evidencias','Ciência de Dados',8,byObservation(cgu22DadosObserved,{},'dados'),'dados',cgu22DadosObserved,WORKED_DATAPREV_ATUAL),
 subj('engenharia','Desenvolvimento de Sistemas',8,byObservation(cgu22DevObserved,{},'java'),'java',cgu22DevObserved,WORKED_TI_GERAL),
 subj('persistencia','Bancos de Dados',8,byObservation(cgu22DbObserved,{},'sql'),'sql',cgu22DbObserved,WORKED_CGU22_DB),
 subj('arquitetura','Infraestrutura Tecnológica',8,byObservation(cgu22InfraObserved,{},'infra'),'infra',cgu22InfraObserved,WORKED_TI_GERAL),
 subj('entrega','Segurança da Informação',8,byObservation(cgu22SecObserved,{},'seguranca'),'seguranca',cgu22SecObserved,WORKED_DATAPREV_LEGIS)
];

CONTESTS.push(
 {id:'natal-camara-2023',name:'Câmara de Natal/RN · assistente geral',role:'Assistente legislativo generalista · nível superior · edital 2023',organizer:'FUNCERN',kind:'prova anterior · finalizado',location:'Natal/RN',source:'https://funcern.br/concursos/concurso-publico-camera-municipal-de-natal-rn/',board:'https://funcern.br/concursos/concurso-publico-camera-municipal-de-natal-rn/',exam:NATAL_2023_EXAM,subjects:natalSubjects,scoring:{type:'unknown'},coverage:'caderno reaplicado · prova histórica',topicIntro:'Os grupos mostram assuntos identificados nesta prova, não todo o programa do edital. Consulte o edital e suas retificações para o conteúdo completo.',note:'Concurso finalizado: este é o caderno reaplicado para o cargo 7 em 30/07/2023, não um edital futuro. Assuntos identificados no caderno são exemplos de estudo e não preveem outra prova.',evidence:{total:40,note:'Distribuição do caderno reaplicado em 30/07/2023. Os temas são uma classificação didática, feita para esta prova; uma questão pode envolver mais de um assunto.'}},
 {id:'sao-agente-2021',name:'São Gonçalo do Amarante/RN · agente administrativo',role:'Agente administrativo · nível médio · edital 2019, prova de 2021',organizer:'IBFC',kind:'prova anterior · finalizado',location:'São Gonçalo do Amarante/RN',source:'https://fs.ibfc.org.br/arquivos/65856721e966de44c1d6b57c03c8ed06.pdf',board:'https://concursos.ibfc.org.br/informacoes/355/',exam:SAO_2021_EXAM,subjects:saoSubjects,scoring:{type:'unknown'},coverage:'caderno de 2021 · prova histórica',topicIntro:'Os grupos descrevem assuntos identificados em uma prova específica, não todo o programa do edital. Confira o edital e as retificações.',note:'O concurso de 2019 foi retomado e teve prova em 12/09/2021. Aqui está uma análise do caderno IBFC_02, cuja cópia foi publicada pelo Qconcursos. A banca informa que o concurso está finalizado; não é o edital da comissão criada em 2025.',evidence:{total:40,note:'Distribuição do caderno IBFC_02 de 12/09/2021. Os assuntos foram agrupados por tema principal para facilitar a leitura; temas podem se sobrepor.'}},
 {id:'dataprev-dev-2024',name:'Dataprev · desenvolvimento de software (2024)',role:'Analista de TI · Desenvolvimento de Software · prova 2024',organizer:'FGV',kind:'prova anterior · referência nacional TI',location:'Provas nas capitais (incluindo Natal/RN)',source:'https://conhecimento.fgv.br/concursos/dataprev24',board:'https://conhecimento.fgv.br/concursos/dataprev24',exam:DATAPREV_2024_EXAM,subjects:dataprevSubjects,scoring:{type:'multiple',options:5,correct:1,wrong:0,blank:0},coverage:'caderno 2024 · 70 questões analisadas',topicIntro:'Os grupos resumem os temas identificados nas 70 questões do caderno Tipo 1 (2024) para estudo dirigido.',note:'Referência nacional de prova da FGV para a área de Desenvolvimento de Software (70 questões de múltipla escolha com 5 alternativas). A Dataprev também aplicou novo certame em 2026 pela FGV; ambos estão analisados no catálogo.',evidence:{total:70,note:'Distribuição completa das 70 questões do caderno Tipo 1 de Analista de TI — Desenvolvimento de Software (FGV, 2024). Classificação didática por tema predominante.'}},
 {id:'dataprev-dev-2026',name:'Dataprev · desenvolvimento de software (2026)',role:'Analista de TI · Desenvolvimento de Software · prova 2026',organizer:'FGV',kind:'prova aplicada · referência nacional TI',location:'Provas nas capitais (incluindo Natal/RN)',source:'https://conhecimento.fgv.br/concursos/dataprev26',board:'https://conhecimento.fgv.br/concursos/dataprev26',exam:DATAPREV_2026_EXAM,subjects:dataprev26Subjects,scoring:{type:'multiple',options:5,correct:1,wrong:0,blank:0},coverage:'caderno 2026 · 70 questões analisadas',topicIntro:'Os grupos mostram os temas identificados nas 70 questões do caderno Tipo 1 (2026) da FGV.',note:'Análise completa das 70 questões do caderno Tipo 1 de 2026 da FGV para Desenvolvimento de Software. Compare com a prova de 2024 para observar a presença constante de SQL/modelagem, segurança/OWASP, engenharia de requisitos, Java, processos e interpretação textual.',evidence:{total:70,note:'Distribuição completa das 70 questões do caderno Tipo 1 de Analista de TI — Desenvolvimento de Software (FGV, 2026). Classificação didática por assunto principal.'}},
 {id:'cgu-ti-2022',name:'CGU · Auditor Federal de TI (prova 2022)',role:'Auditor Federal de Finanças e Controle · TI · caderno da tarde',organizer:'FGV',kind:'prova anterior · referência controle e TI',location:'Provas nas capitais e DF',source:'https://conhecimento.fgv.br/sites/default/files/concursos/0_-_edital_de_concurso_cgu_001-2021.pdf',board:'https://conhecimento.fgv.br/concursos/cgu21',exam:CGU_2022_EXAM,subjects:cgu22Subjects,scoring:{type:'multiple',options:5,correct:1,wrong:0,blank:0},coverage:'caderno 2022 · 80 questões analisadas',topicIntro:'Classificação das 80 questões do caderno da tarde (30 de Conhecimentos Específicos + 10 de Auditoria/CGU + 40 Especializadas de TI).',note:'Referência histórica do concurso anterior da CGU (edital 2021, prova aplicada pela FGV em 2022). Atenção: o concurso de 2026 mudou para a banca Cebraspe (Certo/Errado); use esta análise para conhecer os temas clássicos do cargo, sempre conferindo o edital de 2026.',evidence:{total:80,note:'Distribuição completa das 80 questões do caderno Tipo 1 Branca (Tarde) de Auditor Federal de Finanças e Controle — Área TI (FGV, 2022): 40 de Direito/AFO/Auditoria/CGU e 40 de Ciência de Dados, Desenvolvimento, Bancos de Dados, Infraestrutura e Segurança.'}}
);

// Ligação direta entre assuntos do edital de TI e mapas relacionados.
const cguDev=CONTESTS.find(c=>c.id==='cgu-dev-2026');
const connectMap=(subjectId,topicId,mapId)=>{const topic=cguDev.subjects.find(s=>s.id===subjectId)?.topics.find(t=>t.id===topicId);if(topic)topic.infographic=mapId;};
connectMap('persistencia','persistencia-1','formas-normais');
connectMap('persistencia','persistencia-2','java-objetos');
connectMap('persistencia','persistencia-3','sql-linguagens');
connectMap('persistencia','persistencia-4','arquitetura-dados-ia');
connectMap('persistencia','persistencia-5','seguranca-mapa');
connectMap('engenharia','engenharia-6','solid');
