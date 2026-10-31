/* Ampliação conferida em fontes primárias em 28–29/10/2026, incluindo pesquisa de TI no RN (UFRN/Comperve, IFRN/FUNCERN, TCE-RN/Cebraspe, MP-RN, TJ-RN/FGV e órgãos estaduais). Ver PESQUISA.md. */
(() => {
  const board='https://portal.funcern.org/concursos/concurso-publico-camera-municipal-de-natal-rn/';
  const edital='https://www.cmnat.rn.gov.br/_ups/transparencia/2023/dom_20230404_f6c771703ed9acd0272d23ea54fc2191.pdf';
  const exam='https://funcern.br/documents/874/CCMN_04__NM_TECNICO_LEGISLATIVO_TLNM__TECNICO_EM_MANUTENCAO_E_SUPORTE_EM_INFORMATICA.pdf';
  const observed=(name,questions,journey,infographic)=>({name,questions,journey,infographic});
  const port=[observed('Leitura e organização textual',[1,2,3,5],'port_texto','leitura-texto'),observed('Aspas e discurso citado',[4,10],'port_pontuacao','virgula'),observed('Conectivos e pronomes',[6,9],'port_texto','coesao-pronomes'),observed('Concordância',[7],'port_concordancia','concordancia'),observed('Sentido literal',[8],'port_texto','semantica-figuras')];
  const info=[observed('Editor de texto',[11],'info_documentos','word-documentos'),observed('Windows e arquivos',[12,15],'info_arquivos','sistemas-arquivos'),observed('Navegação, busca, correio e redes sociais',[13,14,18,19],'web','rest-http'),observed('Planilhas',[16,17],'info_planilhas','planilhas-mapa'),observed('Antivírus',[20],'seguranca','seguranca-mapa')];
  const specific=[observed('Windows e Linux',[21,23,24,25,26],'info_arquivos','sistemas-arquivos'),observed('Hardware e memória',[22,32,33],'info_hardware','hardware-dispositivos'),observed('Segurança e backup',[27,28,36],'seguranca','seguranca-mapa'),observed('Redes, endereçamento e cabeamento',[29,30,31,34,35,38],'infra','tcpip'),observed('Gestão de serviços',[37],'gestao','scrum-fundamentos'),observed('Programação',[39,40],'java','java-objetos')];
  const subject=(id,name,items,journey,worked)=>({id,name,count:items.reduce((n,o)=>n+o.questions.length,0),journey,worked,observed:items.map(({name,questions})=>({name,questions})),topics:items.map((o,i)=>({id:`tema-${i+1}`,name:o.name,journey:o.journey,infographic:o.infographic}))});
  CONTESTS.push({id:'natal-suporte-2023',name:'Câmara de Natal/RN · suporte em informática',role:'Técnico legislativo · manutenção e suporte em informática · nível médio',organizer:'FUNCERN',kind:'prova anterior · finalizado',location:'Natal/RN',source:edital,board,exam,
    coverage:'caderno CCMN 04 · prova histórica',topicIntro:'Classificação por tema principal das 40 questões. Não equivale ao programa completo nem a um gabarito comentado.',
    note:'Referência de 18/06/2023. Interfaces e regras técnicas citadas no caderno são históricas. Os exemplos abaixo são fundamentos didáticos; consulte o gabarito definitivo na banca para questões anuladas e respostas oficiais.',
    scoring:{type:'multiple',options:4,correct:null,correctBySubject:{portugues:2,informatica:2,especificos:3},wrong:0,blank:0,source:edital},
    subjects:[subject('portugues','Língua Portuguesa',port,'port_texto',WORKED_GCM_PORT),subject('informatica','Informática',info,'info_documentos',WORKED_BASE_INFO),subject('especificos','Manutenção e suporte em informática',specific,'info_hardware',WORKED_TI_GERAL)],
    evidence:{total:40,note:'Caderno completo CCMN 04: 10 questões de Português, 10 de Informática e 20 específicas. Contagem descritiva; não prevê exames futuros.'}});

  const ufrn25Board='https://comperve.ufrn.br/conteudo/concursos/ufrn_2025_22_23/provas_publicacao.php';
  const ufrn25Edital='https://comperve.ufrn.br/conteudo/concursos/ufrn_2025_22_23/edital.php';
  const ufrn25DevExam='https://comperve.ufrn.br/conteudo/concursos/ufrn_2025_22_23/provas/divulgacao/206.pdf';
  const ufrn25DadosExam='https://comperve.ufrn.br/conteudo/concursos/ufrn_2025_22_23/provas/divulgacao/205.pdf';
  const ufrn25Port=[
    observed('Leitura, progressão discursiva, gêneros e intertextualidade',[2,3,4,5,6],'port_texto','generos-tipologias'),
    observed('Tempos verbais e sequência descritiva',[1],'port_verbos','verbos-tempos'),
    observed('Referenciação pronominal e clareza',[7],'port_texto','coesao-pronomes'),
    observed('Regência verbal e crase',[8],'port_crase','uso-crase'),
    observed('Pontuação e aposto',[9],'port_pontuacao','virgula'),
    observed('Subordinação adjetiva e substantiva',[10],'port_concordancia','sujeito-predicado')
  ];
  const ufrn25Legis=[
    observed('Lei 8.112/1990 · provimento, exercício, indenizações, férias e regime disciplinar',[11,12,13,14,15,16],'const_fundamentos','principios-administracao'),
    observed('Estatuto da UFRN, Código de Conduta e PDI 2020–2029',[20,21,22,23,24,25],'etica_servico','licitacoes-controle-etica'),
    observed('Lei 9.784/1999 · processo administrativo federal, competência e delegação',[17,18,19],'const_fundamentos','ato-administrativo')
  ];
  const ufrn25DevSpec=[
    observed('Desenvolvimento Web, Java/Spring/JSF/JPA, PHP e JavaScript',[38,39,40,41,42,43,51,52],'web','rest-http'),
    observed('Orientação a objetos, UML 2.0 e padrões de projeto GoF',[30,31,34,46,47,48],'java','java-objetos'),
    observed('Engenharia de software, Scrum, TDD, Git e gerência de projetos',[32,33,35,36,37],'engenharia','git-ci'),
    observed('Banco de dados relacional, PostgreSQL, PL/pgSQL, triggers e ACID',[49,50,53,54,55],'sql','sql-linguagens'),
    observed('Estruturas de dados, árvores binárias, ordenação e complexidade',[26,27,28,29],'java','solid'),
    observed('LGPD (Lei 13.709/2018) e Marco Civil da Internet (Lei 12.965/2014)',[44,45],'seguranca','seguranca-mapa')
  ];
  const ufrn25DadosSpec=[
    observed('Processamento de Linguagem Natural, LLMs, Transformers e Prompting',[45,46,47,48,49,50,51],'dados','arquitetura-dados-ia'),
    observed('Metodologias (CRISP-DM, SEMMA, TDSP), pré-processamento e correlação',[33,34,36,37,38,40],'dados','probabilidade-mapa'),
    observed('Aprendizado de máquina, árvores de decisão, TensorFlow/Keras e PyTorch',[31,39,41,42,43,44],'dados','arquitetura-dados-ia'),
    observed('Python para Ciência de Dados: Pandas e NumPy',[26,32,35,55],'dados','arquitetura-dados-ia'),
    observed('Versionamento Git (bisect, blame, merge) e CI/CD com GitHub Actions',[27,28,29,30],'engenharia','git-ci'),
    observed('LGPD (dados públicos, controlador e encarregado) e Marco Civil da Internet',[52,53,54],'seguranca','seguranca-mapa')
  ];
  CONTESTS.push(
    {id:'ufrn-ati-dev-2025',name:'UFRN · Analista de TI · Desenvolvimento',role:'Analista de Tecnologia da Informação · Desenvolvimento · Edital 22/2025 (Cargo 206)',organizer:'Comperve/UFRN',kind:'prova anterior · referência no RN',location:'Natal e campi da UFRN/RN',source:ufrn25Edital,board:ufrn25Board,exam:ufrn25DevExam,
      coverage:'caderno Cargo 206 · 55 questões objetivas + prova prática',topicIntro:'Classificação por tema principal das 55 questões objetivas do Cargo 206 (Comperve/UFRN). Não substitui o edital nem o gabarito definitivo.',
      note:'Prova real da UFRN (Edital 022/2025-PROGESP, Cargo 206). Além das 55 questões objetivas, o caderno trouxe 4 questões teórico-práticas discursivas em Java (Generics, JPA @OneToMany, consulta HQL e padrão Singleton).',
      scoring:{type:'multiple',options:4,correct:1,wrong:0,blank:0,source:ufrn25Edital},
      subjects:[subject('portugues','Língua Portuguesa',ufrn25Port,'port_texto',WORKED_GCM_PORT),subject('legislacao','Legislação e Normas da UFRN',ufrn25Legis,'const_fundamentos',WORKED_ADM_SPEC),subject('especificos','Desenvolvimento de Sistemas',ufrn25DevSpec,'engenharia',WORKED_TI_GERAL)],
      evidence:{total:55,note:'Caderno completo Cargo 206 (Comperve/UFRN): 10 questões de Português, 15 de Legislação e 30 de Conhecimentos Específicos em Desenvolvimento.'}},
    {id:'ufrn-ati-dados-2025',name:'UFRN · Analista de TI · Ciência de Dados',role:'Analista de Tecnologia da Informação · Ciência de Dados · Edital 22/2025 (Cargo 205)',organizer:'Comperve/UFRN',kind:'prova anterior · referência no RN',location:'Natal e campi da UFRN/RN',source:ufrn25Edital,board:ufrn25Board,exam:ufrn25DadosExam,
      coverage:'caderno Cargo 205 · 55 questões objetivas + prova prática',topicIntro:'Classificação por tema principal das 55 questões objetivas do Cargo 205 (Comperve/UFRN). Não substitui o edital nem o gabarito definitivo.',
      note:'Prova real da UFRN (Edital 022/2025-PROGESP, Cargo 205). Além das 55 questões objetivas, o caderno contou com prova teórico-prática discursiva sobre limpeza de dados, reprodutibilidade e modelagem em Python/Pandas.',
      scoring:{type:'multiple',options:4,correct:1,wrong:0,blank:0,source:ufrn25Edital},
      subjects:[subject('portugues','Língua Portuguesa',ufrn25Port,'port_texto',WORKED_GCM_PORT),subject('legislacao','Legislação e Normas da UFRN',ufrn25Legis,'const_fundamentos',WORKED_ADM_SPEC),subject('especificos','Ciência de Dados, IA e Engenharia',ufrn25DadosSpec,'dados',WORKED_TI_GERAL)],
      evidence:{total:55,note:'Caderno completo Cargo 205 (Comperve/UFRN): 10 questões de Português, 15 de Legislação e 30 de Ciência de Dados, Aprendizado de Máquina, PLN e LLMs.'}}
  );

  const ufrn23Board='https://comperve.ufrn.br/conteudo/concursos/ufrn_202287/provas_publicacao.php';
  const ufrn23Edital='https://comperve.ufrn.br/conteudo/concursos/ufrn_202287/edital.php';
  const ufrn23Exam='https://comperve.ufrn.br/conteudo/concursos/ufrn_202287/provas/divulgacao/203.pdf';
  const ufrn23Port=[
    observed('Propósito comunicativo, humor e posicionamento enunciativo',[1,2,10],'port_texto','leitura-texto'),
    observed('Morfossintaxe, função do “que” e sentido contextual',[5,7,9],'port_sujeito','coesao-pronomes'),
    observed('Pontuação, uso de aspas e vírgulas',[4,8],'port_pontuacao','virgula'),
    observed('Tipos textuais e tempos verbais (descritivo e narrativo)',[3],'port_verbos','verbos-tempos'),
    observed('Concordância verbal: haver impessoal e existir',[6],'port_concordancia','concordancia')
  ];
  const ufrn23Legis=[
    observed('Lei 8.112/1990 · cotas PcD, licenças, provimento, PAD sumário e penalidades',[11,12,13,14,15,16,17],'const_fundamentos','principios-administracao'),
    observed('Lei 9.784/1999 · impedimento, suspeição, direitos e prazos no processo administrativo',[18,19,20],'const_fundamentos','ato-administrativo')
  ];
  const ufrn23Spec=[
    observed('Programação Python, Java, PHP, JSF, jQuery e JSON',[23,27,28,29,33,34,35,36,37,46,47,49,50],'java','java-objetos'),
    observed('Engenharia de software, Scrum, MVC, UML, GoF, JUnit e Git',[21,22,24,30,31,32,48],'engenharia','scrum-fundamentos'),
    observed('Arquitetura de Von Neumann, hierarquia de memória e administração Ubuntu Linux',[25,26,39,40,41,42],'infra','sistemas-arquivos'),
    observed('PostgreSQL (UPDATE/AVG, integridade referencial, transações) e LGPD',[38,43,44,45],'sql','sql-linguagens')
  ];
  CONTESTS.push({id:'ufrn-tti-2023',name:'UFRN · Técnico em Tecnologia da Informação',role:'Técnico em Tecnologia da Informação · nível médio/técnico · Edital 87/2022 (Cargo 203)',organizer:'Comperve/UFRN',kind:'prova anterior · finalizado',location:'Natal e campi da UFRN/RN',source:ufrn23Edital,board:ufrn23Board,exam:ufrn23Exam,
    coverage:'caderno Cargo 203 · 50 questões + redação',topicIntro:'Classificação por tema principal das 50 questões do Cargo 203 (Comperve/UFRN). Não equivale ao gabarito comentado.',
    note:'Prova histórica aplicada pela Comperve/UFRN para Técnico em TI (Cargo 203), combinando Língua Portuguesa (crônica potiguar de Sanderson Negreiros), Regime Jurídico (Lei 8.112/90 e Lei 9.784/99) e 30 questões técnicas de desenvolvimento, Linux e PostgreSQL.',
    scoring:{type:'multiple',options:4,correct:1,wrong:0,blank:0,source:ufrn23Edital},
    subjects:[subject('portugues','Língua Portuguesa',ufrn23Port,'port_texto',WORKED_GCM_PORT),subject('legislacao','Legislação Federal',ufrn23Legis,'const_fundamentos',WORKED_ADM_SPEC),subject('especificos','Conhecimentos Específicos · Técnico em TI',ufrn23Spec,'java',WORKED_TI_GERAL)],
    evidence:{total:50,note:'Caderno completo Cargo 203 (Comperve/UFRN): 10 questões de Português, 10 de Legislação e 30 de Conhecimentos Específicos.'}});

  const ifrnBoard='https://funcern.br/noticias/cadernos-de-provas-ifrn-tecnico-administrativos-em-educacao-edital-n-72023/';
  const ifrnAtiExam='https://funcern.br/documents/1249/TAE__CARGO_11_NS_ANALISTA_DE_TECNOLOGIA_DA_INFORMACAO.pdf';
  const ifrnTtiExam='https://funcern.br/documents/1261/TAE-03-Tecnico_de_Tecnologia_da_Informacao.pdf';
  const ifrnAtiPort=[
    observed('Compreensão global, tese, polifonia e escala argumentativa',[1,2,3,7],'port_texto','leitura-texto'),
    observed('Relações lógico-discursivas: concessão e contraposição',[4,5],'port_texto','coesao-pronomes'),
    observed('Subordinação substantiva e coesão por elipse e pronome oblíquo',[6,8],'port_concordancia','sujeito-predicado'),
    observed('Regência, crase e sinonímia contextual',[9,10],'port_crase','uso-crase')
  ];
  const ifrnTtiPort=[
    observed('Compreensão textual, progressão temática e operadores argumentativos',[1,2,4,8],'port_texto','leitura-texto'),
    observed('Coesão referencial (elipse, pronomes e possessivos) e discurso citado',[3,6,10],'port_texto','coesao-pronomes'),
    observed('Morfossintaxe do “que”, regência de “implicar” e uso de aspas',[5,7,9],'port_crase','regencia')
  ];
  const ifrnLegis=[
    observed('Educação federal: LDB (Lei 9.394/1996) e Institutos Federais (Lei 11.892/2008)',[13,15,16,19],'const_fundamentos','direitos-constitucionais'),
    observed('Regime Jurídico (Lei 8.112/1990) e conduta funcional (Lei 8.027/1990)',[11,12,17],'const_fundamentos','principios-administracao'),
    observed('Processo administrativo (Lei 9.784/1999), improbidade (Lei 8.429/1992) e LGPD',[14,18,20],'etica_servico','licitacoes-controle-etica')
  ];
  const ifrnAtiSpec=[
    observed('Desenvolvimento Web, HTTP/JWT, Angular, Django (WSGI/ASGI), HTML5/CSS e React Native',[23,25,32,33,36,37,38],'web','rest-http'),
    observed('Engenharia de software: XP, TDD, refatoração, Git e modelagem UML',[21,26,27,29,39,40],'engenharia','testes-software'),
    observed('Programação Java (sobrescrita), Python (generators/lambda) e SQL (LEFT JOIN)',[22,24,30,31],'java','java-objetos'),
    observed('Processos Linux (fork), Docker Compose e segurança web (HTTPS/TLS e JWT stateless)',[28,34,35],'infra','seguranca-mapa')
  ];
  const ifrnTtiSpec=[
    observed('Administração Linux (SSH, ls, redirecionamento, Ext3, nohup) e Redes (VLSM, Switch, DNS MX, BGP)',[24,28,29,30,31,32,33,34,35],'infra','tcpip'),
    observed('Linguagens e formatos: JSON Schema, JavaScript (===), Java (final), HTML5 (<audio>) e C++',[23,25,26,37,38],'java','java-objetos'),
    observed('PostgreSQL (postgresql.conf, psql ALTER USER) e consultas SQL (WHERE)',[21,22,40],'sql','sql-linguagens'),
    observed('Engenharia de software: Scrum (Product Backlog), requisitos não funcionais e UML',[27,36,39],'engenharia','scrum-fundamentos')
  ];
  CONTESTS.push(
    {id:'ifrn-ati-2024',name:'IFRN · Analista de Tecnologia da Informação',role:'Analista de Tecnologia da Informação · nível superior · Edital 07/2023-RE/IFRN (Cargo 11)',organizer:'FUNCERN',kind:'prova anterior · finalizado',location:'Natal e campi do IFRN/RN',source:ifrnBoard,board:ifrnBoard,exam:ifrnAtiExam,
      coverage:'caderno Cargo 11 · prova histórica (40 questões)',topicIntro:'Classificação por tema principal das 40 questões do Cargo 11 (FUNCERN/IFRN). Não equivale ao gabarito comentado.',
      note:'Prova aplicada pela FUNCERN para o IFRN (Edital 07/2023 TAE): 10 questões de Português (20 pts), 10 de Legislação (20 pts) e 20 de Conhecimentos Específicos de Analista de TI (60 pts), somando 100 pontos.',
      scoring:{type:'multiple',options:4,correct:null,correctBySubject:{portugues:2,legislacao:2,especificos:3},wrong:0,blank:0,source:ifrnBoard},
      subjects:[subject('portugues','Língua Portuguesa',ifrnAtiPort,'port_texto',WORKED_GCM_PORT),subject('legislacao','Legislação e Educação Federal',ifrnLegis,'const_fundamentos',WORKED_ADM_SPEC),subject('especificos','Conhecimentos Específicos · Analista de TI',ifrnAtiSpec,'engenharia',WORKED_TI_GERAL)],
      evidence:{total:40,note:'Caderno completo Cargo 11 (FUNCERN/IFRN): 10 questões de Português, 10 de Legislação e 20 de Conhecimentos Específicos de Analista de TI.'}},
    {id:'ifrn-tti-2024',name:'IFRN · Técnico de Tecnologia da Informação',role:'Técnico de Tecnologia da Informação · nível médio/técnico · Edital 07/2023-RE/IFRN (Cargo 03)',organizer:'FUNCERN',kind:'prova anterior · finalizado',location:'Natal e campi do IFRN/RN',source:ifrnBoard,board:ifrnBoard,exam:ifrnTtiExam,
      coverage:'caderno Cargo 03 · prova histórica (40 questões)',topicIntro:'Classificação por tema principal das 40 questões do Cargo 03 (FUNCERN/IFRN). Não equivale ao gabarito comentado.',
      note:'Prova aplicada pela FUNCERN para o IFRN (Edital 07/2023 TAE): 10 questões de Português (20 pts), 10 de Legislação (20 pts) e 20 de Conhecimentos Específicos de Técnico de TI (60 pts), com forte presença de Linux, redes (VLSM, DNS, BGP), PostgreSQL e programação.',
      scoring:{type:'multiple',options:4,correct:null,correctBySubject:{portugues:2,legislacao:2,especificos:3},wrong:0,blank:0,source:ifrnBoard},
      subjects:[subject('portugues','Língua Portuguesa',ifrnTtiPort,'port_texto',WORKED_GCM_PORT),subject('legislacao','Legislação e Educação Federal',ifrnLegis,'const_fundamentos',WORKED_ADM_SPEC),subject('especificos','Conhecimentos Específicos · Técnico de TI',ifrnTtiSpec,'infra',WORKED_TI_GERAL)],
      evidence:{total:40,note:'Caderno completo Cargo 03 (FUNCERN/IFRN): 10 questões de Português, 10 de Legislação e 20 de Conhecimentos Específicos de Técnico de TI.'}}
  );

  const rnSubj=(id,name,topics,journey,worked)=>({id,name,count:null,journey,worked,topics:topics.map(([tid,tname,tjourney,infographic])=>({id:tid,name:tname,journey:tjourney||journey,infographic}))});
  const rnTiSubjects=[
    rnSubj('portugues','Língua Portuguesa',[
      ['leitura','Compreensão, argumentação, gêneros e reescrita textual','port_texto','leitura-texto'],
      ['coesao','Coesão referencial, conectivos e pontuação','port_pontuacao','coesao-pronomes'],
      ['gramatica','Concordância, regência, crase e morfossintaxe','port_crase','uso-crase']
    ],'port_texto',WORKED_GCM_PORT),
    rnSubj('direito','Direito Constitucional, Administrativo, Controle e LGPD',[
      ['constitucional','Princípios, direitos fundamentais e organização dos Poderes e Tribunais/MP','const_fundamentos','direitos-constitucionais'],
      ['administrativo','Atos administrativos, processo administrativo (Lei 9.784/99) e agentes públicos','const_fundamentos','ato-administrativo'],
      ['licitacoes','Licitações e contratações de TI (Lei 14.133/2021 e IN SGD/ME 94/2022)','etica_servico','licitacoes-controle-etica'],
      ['lgpd','Proteção de dados pessoais (LGPD · Lei 13.709/2018) e segurança jurídica digital','seguranca','seguranca-mapa']
    ],'const_fundamentos',WORKED_ETICA_AUD),
    rnSubj('engenharia','Engenharia de Software, Desenvolvimento e Arquitetura',[
      ['requisitos','Engenharia de requisitos, Scrum, Kanban, XP, TDD e refatoração','engenharia','scrum-fundamentos'],
      ['poo','Programação orientada a objetos (Java, Python, PHP, TypeScript), UML e padrões GoF','java','java-objetos'],
      ['web','Arquitetura web, REST/HTTP, JWT, microsserviços, Spring, Django e front-end','web','rest-http'],
      ['git','Versionamento Git, integração e entrega contínuas (CI/CD) e testes automatizados','engenharia','git-ci']
    ],'engenharia',WORKED_TI_GERAL),
    rnSubj('dados','Banco de Dados, Ciência de Dados e Inteligência Artificial',[
      ['sql','Modelagem relacional, normalização (1FN–3FN), SQL avançado, PostgreSQL e transações ACID','sql','sql-linguagens'],
      ['bi','Data Warehouse, ETL/ELT, modelagem dimensional e governança de dados','dados','formas-normais'],
      ['ia','Aprendizado de máquina, CRISP-DM, Python (Pandas/NumPy), PLN e modelos de linguagem (LLMs)','dados','arquitetura-dados-ia']
    ],'sql',WORKED_TI_GERAL),
    rnSubj('infraestrutura','Redes, Sistemas Operacionais, Nuvem e Segurança da Informação',[
      ['redes','Arquitetura TCP/IP, sub-redes VLSM, roteamento (OSPF/BGP), DNS, DHCP, VLAN e switches','infra','tcpip'],
      ['sistemas','Administração Linux (Ubuntu/Red Hat) e Windows Server, virtualização, Docker e Kubernetes','infra','sistemas-arquivos'],
      ['seguranca','Segurança da informação (ISO 27001/27002), criptografia, TLS/HTTPS, OWASP, backup e resposta a incidentes','seguranca','seguranca-mapa'],
      ['governanca','Governança e gestão de serviços de TI: ITIL v4 e COBIT 2019','gestao','scrum-fundamentos']
    ],'infra',WORKED_TI_GERAL)
  ];

  CONTESTS.push(
    {id:'tce-rn-ti-2026',name:'TCE-RN · Analista e Auditor · TI',role:'Analista Administrativo de TI (Desenvolvimento / Infraestrutura) e Auditor de Controle Externo · TI',organizer:'Cebraspe',kind:'concurso 2025/2026 · acompanhe no Cebraspe',location:'Natal/RN',
      source:'https://www.cebraspe.org.br/concursos/tce_rn_25',board:'https://www.cebraspe.org.br/concursos/tce_rn_25',referenceContest:'ufrn-ati-dev-2025',
      coverage:'programa orientativo de TI · estilo Cebraspe',
      note:'Concurso do Tribunal de Contas do Estado do Rio Grande do Norte (Cebraspe) com especialidades de TI em Desenvolvimento de Sistemas e Inteligência da Informação e em Infraestrutura, Segurança e Suporte. Confira sempre os editais, retificações e cronograma oficial na página do Cebraspe.',
      scoring:{type:'binary',options:2,correct:1,wrong:-1,blank:0,source:'https://www.cebraspe.org.br/concursos/tce_rn_25'},
      subjects:rnTiSubjects},
    {id:'mp-rn-ti-previsto',name:'MP-RN · Analista do MP · TI (previsto)',role:'Analista do Ministério Público · Especialidade: Tecnologia da Informação · previsto na LOA/QDD 2026',organizer:'Banca a definir (histórico Comperve/UFRN)',kind:'previsto no orçamento 2026 · aguarde edital',location:'Natal e comarcas do RN',
      source:'https://www.mprn.mp.br/',board:'https://comperve.ufrn.br/',referenceContest:'ufrn-ati-dev-2025',
      coverage:'base provisória · histórico de TI no RN',
      note:'O Ministério Público do RN conta com previsão orçamentária (LOA/QDD 2026) para novo concurso de servidores, incluindo Analista do MP na área de Tecnologia da Informação. A trilha abaixo reúne os eixos cobrados nas provas recentes da Comperve/UFRN e de órgãos de controle no estado.',
      scoring:{type:'unknown'},
      subjects:rnTiSubjects},
    {id:'tj-rn-ti-fgv',name:'TJ-RN · Analista Judiciário · TI',role:'Analista Judiciário · Apoio Especializado: Tecnologia da Informação / Análise de Sistemas',organizer:'FGV (referência estadual)',kind:'referência estadual · TI no Judiciário do RN',location:'Natal e comarcas do RN',
      source:'https://conhecimento.fgv.br/concursos/tjrn2023',board:'https://conhecimento.fgv.br/concursos/tjrn2023',referenceContest:'dataprev-dev-2024',
      coverage:'programa de referência · padrão FGV TI',
      note:'Trilha estruturada a partir do concurso do Tribunal de Justiça do Rio Grande do Norte (FGV · Edital 02/2023 para Analista Judiciário de TI) combinada com as provas de TI da FGV aplicadas em Natal. Use para preparação contínua para o Judiciário e órgãos estaduais.',
      scoring:{type:'multiple',options:5,correct:1,wrong:0,blank:0,source:'https://conhecimento.fgv.br/concursos/tjrn2023'},
      subjects:rnTiSubjects},
    {id:'rn-ti-estadual-previsto',name:'RN · DETRAN, UFRN, IFRN e Órgãos do Estado · TI',role:'Analista e Técnico de Tecnologia da Informação · preparação estadual no RN (DETRAN-RN, CAERN, SEAD e TAEs)',organizer:'Comperve, FUNCERN e bancas nacionais',kind:'preparação contínua · TI no RN',location:'Natal e Região Metropolitana/RN',
      source:'https://comperve.ufrn.br/conteudo/concursos/ufrn_2025_22_23/provas_publicacao.php',board:'https://funcern.br/',referenceContest:'ifrn-ati-2024',
      coverage:'base integrada · provas reais do RN',
      note:'Roteiro unificado para concursos previstos e recorrentes de TI no Rio Grande do Norte (DETRAN-RN, autarquias estaduais e chamadas contínuas de Analista e Técnico de TI da UFRN e do IFRN). Compare sempre com as provas reais da Comperve e da FUNCERN analisadas no aplicativo.',
      scoring:{type:'unknown'},
      subjects:rnTiSubjects},
    {id:'natal-prefeitura-previsto',name:'Prefeitura de Natal — TI e Suporte (previsto)',role:'Analista de Tecnologia da Informação e Técnico de TI / Suporte — Previsto no PPA/LOA de Natal',organizer:'Banca a definir (histórico Comperve / FUNCERN)',kind:'previsto no orçamento / PPA-LOA — aguarde edital',location:'Natal/RN',
      source:'https://natal.rn.gov.br/',board:'https://comperve.ufrn.br/',referenceContest:'natal-suporte-2023',
      coverage:'base prevista no PPA/LOA de Natal',
      note:'Previsão orçamentária no Plano Plurianual (PPA) e Lei Orçamentária Anual (LOA) do Município de Natal para provimento de cargos de TI e reestruturação tecnológica da SEMAD, SMS e Finanças. Trilha orientada pelas provas de Natal e UFRN.',
      scoring:{type:'unknown'},
      subjects:rnTiSubjects},
    {id:'itep-rn-previsto',name:'ITEP/RN — Perito Criminal e TI Forense (previsto)',role:'Perito Criminal — Computação Forense / Tecnologia da Informação e Agente Técnico de TI',organizer:'Banca a definir (histórico AOCP / Comperve)',kind:'previsto no orçamento estadual / PPA-LOA',location:'Natal e Regionais do RN (Mossoró, Caicó, Pau dos Ferros)',
      source:'https://www.itep.rn.gov.br/',board:'https://comperve.ufrn.br/',referenceContest:'ufrn-ati-dev-2025',
      coverage:'base orientativa — Perícia e TI Forense no RN',
      note:'Previsão no Plano Plurianual e LOA do Estado do RN para recomposição do quadro técnico-pericial do Instituto Técnico-Científico de Perícia (ITEP/RN). Foco em computação forense, segurança cibernética, custódia de evidências digitais, redes e banco de dados.',
      scoring:{type:'unknown'},
      subjects:rnTiSubjects},
    {id:'fapern-rn-previsto',name:'FAPERN — Gestão de Projetos e TI (previsto)',role:'Analista em Ciência, Tecnologia e Inovação — Informática e Gestão de Dados Científicos',organizer:'Banca a definir (Comperve / FUNCERN / Estadual)',kind:'previsto no PPA/LOA estadual',location:'Natal/RN',
      source:'http://www.fapern.rn.gov.br/',board:'https://funcern.br/',referenceContest:'ifrn-ati-2024',
      coverage:'base orientativa — Gestão e TI em C&T no RN',
      note:'Previsão orçamentária no PPA/LOA estadual para a Fundação de Amparo à Pesquisa do Estado do Rio Grande do Norte (FAPERN), voltada à modernização de sistemas, governança de dados científicos e plataformas de fomento à pesquisa potiguar.',
      scoring:{type:'unknown'},
      subjects:rnTiSubjects},
    {id:'arsep-rn-previsto',name:'ARSEP/RN — Regulação de Serviços Públicos — TI (previsto)',role:'Analista de Regulação — Tecnologia da Informação e Governança de Dados Regulatórios',organizer:'Banca a definir (FUNCERN / Comperve / Estadual)',kind:'previsto no PPA/LOA estadual',location:'Natal/RN',
      source:'http://www.arsep.rn.gov.br/',board:'https://funcern.br/',referenceContest:'ifrn-tti-2024',
      coverage:'base orientativa — TI e Regulação de Serviços no RN',
      note:'Previsão orçamentária para a Agência Reguladora de Serviços Públicos do RN (ARSEP), com atribuição de regulação, fiscalização e auditoria de sistemas de saneamento e infraestrutura delegada, demandando competências em banco de dados, governança e segurança.',
      scoring:{type:'unknown'},
      subjects:rnTiSubjects}
  );

  // Auditoria de 30/10: páginas institucionais não comprovam previsão em PPA/LOA.
  for(const id of ['mp-rn-ti-previsto','natal-prefeitura-previsto','itep-rn-previsto','fapern-rn-previsto','arsep-rn-previsto','rn-ti-estadual-previsto']){
    const c=CONTESTS.find(c=>c.id===id);
    c.name=c.name.replace(/\s*\(previsto\)/g,'');
    c.role='Preparação geral de TI · cargo e programa a conferir em edital específico';
    c.kind='preparação contínua · sem edital específico vinculado';
    c.organizer='Banca não confirmada nesta trilha';c.coverage='base orientativa · sem previsão orçamentária comprovada';
    c.note='Trilha de preparação geral. As referências cadastradas não comprovam previsão em PPA/LOA, abertura de vagas ou contratação de banca. Consulte os atos oficiais do órgão. As provas históricas relacionadas servem para comparação, sem previsão de cobrança futura.';
  }
  const tce=CONTESTS.find(c=>c.id==='tce-rn-ti-2026');
  tce.name='TCE-RN · TI · fundamentos comuns';tce.coverage='base comum · cargos 4, 5 e 12 têm programas diferentes';
  tce.note+=' Esta seleção é uma base comum de TI, não o programa integral de três cargos. Compare com a especialidade escolhida: cargo 4, Desenvolvimento e Inteligência; cargo 5, Infraestrutura; cargo 12, Auditoria de TI.';
  const tj=CONTESTS.find(c=>c.id==='tj-rn-ti-fgv');
  tj.source=tj.board='https://conhecimento.fgv.br/concursos/tjrn2023/02';
  tj.coverage='preparação baseada em referência histórica · edital 02/2023';
  // Pesos por disciplina: +1 indistinto, sugerido no roteiro, não é a pontuação oficial.
  CONTESTS.find(c=>c.id==='natal-camara-2023').scoring={type:'multiple',options:4,correct:null,correctBySubject:{portugues:2,logica:2,especificos:3},wrong:0,blank:0,source:edital};
  CONTESTS.find(c=>c.id==='sao-agente-2021').scoring={type:'multiple',options:4,correct:null,correctBySubject:{portugues:1.8,logica:1.4,informatica:1.2},wrong:0,blank:0,source:'https://fs.ibfc.org.br/arquivos/65856721e966de44c1d6b57c03c8ed06.pdf'};

  const guarda=CONTESTS.find(c=>c.id==='nisia-guarda').subjects.find(s=>s.id==='direito-legislacao');
  const laws=[['guardas','13.022/2014 · Estatuto das Guardas'],['susp','13.675/2018 · SUSP'],['cooperacao','Decreto 11.841/2023 · cooperação'],['maria','11.340/2006 · Maria da Penha'],['drogas','11.343/2006 · drogas'],['armas','10.826/2003 · desarmamento'],['abuso','13.869/2019 · abuso de autoridade'],['tortura','9.455/1997 · tortura'],['ctb','9.503/1997 · trânsito'],['eca','8.069/1990 · ECA'],['idoso','10.741/2003 · pessoa idosa'],['inclusao','13.146/2015 · inclusão'],['igualdade','12.288/2010 · igualdade racial'],['racismo','7.716/1989 e 14.532/2023 · racismo'],['ambientais','9.605/1998 · crimes ambientais'],['esporte','14.597/2023 · segurança esportiva'],['forca','13.060/2014 · instrumentos de menor potencial ofensivo'],['vitimas','13.431/2017 · proteção de crianças e adolescentes'],['identificacao','12.037/2009 · identificação criminal'],['licitacoes','14.133/2021 · crimes em contratações públicas']];
  guarda.topics=[...guarda.topics.filter(t=>t.id!=='leis'),...laws.map(([id,name])=>({...TOPIC(id,name,'legis_especial'),infographic:'legislacao-especial-guarda'}))];
  for(const id of ['natal-sttu','sao-goncalo','parnamirim-futuro']){
    const c=CONTESTS.find(c=>c.id===id);
    const source=CONTESTS.find(x=>x.id===(id==='sao-goncalo'?'sao-agente-2021':id==='natal-sttu'?'natal-camara-2023':'parnamirim-guarda-2024'));
    c.subjects=[...c.subjects,{id:'constitucional',name:'Trilha opcional · Direito Constitucional',count:null,journey:'const_fundamentos',topics:CONSTITUTION_TOPICS.map(t=>({...t})),worked:WORKED_GCM_CONST,optional:true},{id:'administrativo',name:'Trilha opcional · Administração e atendimento',count:null,journey:'adm_redacao',topics:[TOPIC('redacao','Comunicação oficial','adm_redacao'),TOPIC('atendimento','Atendimento ao cidadão','adm_atendimento'),TOPIC('etica','Ética no serviço','etica_servico')],worked:WORKED_ADM_SPEC,optional:true}];
    c.note+=' As trilhas opcionais de Direito e Administração são fundamentos complementares; não há confirmação de cobrança para o futuro cargo. A prova histórica indicada serve para comparação e pode ser de outro cargo ou órgão do município.';
    c.referenceContest=source.id;
  }
})();
