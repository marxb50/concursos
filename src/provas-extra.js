/* Ampliação conferida em fontes primárias em 28–29/10/2026. Ver PESQUISA.md. */
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
