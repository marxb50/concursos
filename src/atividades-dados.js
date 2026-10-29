/* Desafios autorais: praticam competências; não são reprodução de questões oficiais. */
const ActivityBank=(()=>{
  const choice=(id,prompt,options,answer,explain,hint,extra={})=>({id,type:'choice',prompt,options,answer,explain,hint,...extra});
  const number=(id,prompt,answer,explain,hint,visual,unit='')=>({id,type:'number',prompt,answer,explain,hint,visual,unit});
  const mission=(id,title,journeys,pattern,story,questions,type='casos')=>({id,title,journeys,pattern,story,questions,type,kind:'author',journey:journeys[0]});
  const rich=[
    mission('detetive-texto','Detetive do texto',['port_texto'],/leitura|interpreta|compreens|texto/,'Uma mensagem precisa chegar sem distorções. Encontre a pista que sustenta cada conclusão.',[
      choice('pista','Qual trecho comprova que o atendimento continuou apesar da falha?', ['A energia caiu às 14h.','Mesmo sem o sistema, a equipe registrou os pedidos em papel.','O prédio tem dois andares.'],1,'O segundo trecho apresenta a continuidade do atendimento durante a falha. Os outros informam circunstâncias, sem comprovar a conclusão.','Procure uma ação de atendimento praticada depois da falha.',{type:'evidence',passage:'A energia caiu às 14h. Mesmo sem o sistema, a equipe registrou os pedidos em papel. O prédio tem dois andares.'}),
      choice('referente','No trecho, a expressão “esses documentos” retoma o quê?',['Os relatórios','Os computadores','Os servidores'],0,'A expressão retoma os relatórios, que foram revisados e depois enviados. O referente deve fazer sentido no encadeamento do texto.','O termo retomado aparece na frase anterior.',{type:'evidence',passage:'Os relatórios foram revisados pela equipe. Esses documentos seguiram para a direção na manhã seguinte.'}),
      choice('limite','Qual conclusão é sustentada pelo aviso?',['Todos os setores fecharão.','O balcão voltará a funcionar às 10h.','O balcão permanecerá fechado até o dia seguinte.'],1,'O aviso informa somente o retorno do balcão às 10h. Não autoriza concluir sobre todos os setores nem ampliar o prazo.','Separe o que está escrito do que você está supondo.',{type:'evidence',passage:'O balcão ficará fechado das 9h às 10h para manutenção. Os demais serviços continuarão funcionando.'})
    ],'evidencias'),
    mission('balanca-equacoes','Restaure o equilíbrio',['mat_equacoes'],/equa|funco|sequenc/,'A central precisa descobrir valores desconhecidos. Faça a mesma operação nos dois lados.',[
      number('igualdade','Qual valor de x equilibra a balança?',5,'2x + 4 = 14. Retire 4 dos dois lados: 2x = 10. Divida os dois lados por 2: x = 5.','Comece retirando 4 dos dois lados.','2x + 4 = 14'),
      number('divisao','Qual valor de x completa o painel?',5,'3x − 6 = 9. Some 6 dos dois lados: 3x = 15. Divida por 3: x = 5.','A operação inversa de subtrair 6 é somar 6.','3x − 6 = 9'),
      number('conferencia','Descubra x e confira substituindo na igualdade.',8,'x ÷ 4 + 2 = 4. Subtraia 2: x ÷ 4 = 2. Multiplique por 4: x = 8. Conferência: 8 ÷ 4 + 2 = 4.','Primeiro isole a divisão.','x ÷ 4 + 2 = 4')
    ],'calculo'),
    mission('recursos-porcentagem','Central de recursos',['mat_porcento','mat_razao'],/porcent|propor|razao|juros/,'Planeje recursos de uma equipe sem perder de vista o total de referência.',[
      number('desconto','Um equipamento de R$ 200 tem desconto de 15%. Quanto será pago?',170,'15% de 200 = 30. O desconto é retirado do preço: 200 − 30 = 170.','Calcule o desconto antes de subtrair do preço.','R$ 200 − 15%','reais'),
      number('aumento','Uma equipe tinha 80 atendimentos e aumentou esse total em 25%. Qual é o novo total?',100,'25% de 80 = 20. Some o aumento ao valor inicial: 80 + 20 = 100.','Aumento se soma ao valor inicial.','80 + 25%','atendimentos'),
      number('proporcao','Três caixas guardam 18 pastas. Mantida a mesma capacidade, quantas pastas cabem em cinco caixas?',30,'Cada caixa guarda 18 ÷ 3 = 6 pastas. Cinco caixas guardam 5 × 6 = 30.','Descubra primeiro a quantidade por caixa.','3 caixas → 18 pastas; 5 caixas → ?','pastas')
    ],'calculo'),
    mission('chance-probabilidade','Laboratório de chances',['mat_probabilidade'],/probabil|eventos/,'Investigue eventos equiprováveis. O cenário sempre informa a regra do sorteio.',[
      number('urna','Há 4 fichas azuis e 6 amarelas. Sorteando uma ficha ao acaso, qual a chance percentual de sair azul?',40,'São 10 fichas ao todo. Quatro são azuis: 4 ÷ 10 = 0,4 = 40%.','Divida os casos favoráveis pelo total.','🔵 🔵 🔵 🔵 · 6 amarelas','%'),
      number('dado','Um dado honesto tem faces de 1 a 6. Qual a chance percentual de sair um número par?',50,'As faces pares são 2, 4 e 6: 3 casos em 6. Isso equivale a 50%.','Conte as faces pares e compare com as seis possíveis.','Dado: 1 · 2 · 3 · 4 · 5 · 6','%'),
      number('complemento','De 20 bilhetes equiprováveis, 5 são premiados. Qual a chance percentual de NÃO ganhar?',75,'15 bilhetes não são premiados. 15 ÷ 20 = 0,75 = 75%.','Use o evento complementar: todos menos os premiados.','20 bilhetes · 5 premiados','%')
    ],'calculo'),
    mission('circuito-logico','Acenda o circuito lógico',['logic_proposicoes'],/logica|proposi|condicion|dedu|argument/,'Cada linha é uma combinação de entradas. Ligue apenas as saídas verdadeiras.',[
      {id:'e',type:'logic',prompt:'Configure a saída de P E Q em cada linha.',op:'and',answer:[true,false,false,false],explain:'A conjunção só é verdadeira quando P e Q são verdadeiros ao mesmo tempo.',hint:'“E” exige as duas condições.'},
      {id:'ou',type:'logic',prompt:'Configure a saída de P OU Q (ou inclusivo).',op:'or',answer:[true,true,true,false],explain:'O ou inclusivo é verdadeiro quando pelo menos uma entrada é verdadeira. Só falha com as duas falsas.',hint:'Basta uma entrada verdadeira; as duas também podem ser verdadeiras.'},
      {id:'se',type:'logic',prompt:'Configure a saída de SE P, ENTÃO Q.',op:'implies',answer:[true,false,true,true],explain:'A condicional só é falsa em P verdadeiro e Q falso: a condição ocorreu, mas a consequência prometida não.',hint:'Procure a combinação que quebra a promessa.'}
    ],'circuitos'),
    mission('resgate-sql','Resgate os registros',['sql'],/banco|sql|normaliza|persist|nosql/,'Clientes e pedidos foram separados. Escolha a junção observando quais registros precisam permanecer.',[
      {id:'clientes',type:'sql',prompt:'Preserve TODOS os clientes, incluindo Caio sem pedido. Mostre seus pedidos associados; o pedido 104, sem cliente, deve ficar de fora.',answer:'LEFT',explain:'LEFT JOIN preserva cada cliente da tabela da esquerda. Caio aparece com pedido NULL. Os dois pedidos de Ana continuam no resultado.',hint:'Quem precisa ser preservado está na tabela da esquerda.'},
      {id:'pedidos',type:'sql',prompt:'Preserve TODOS os pedidos, incluindo o 104 sem cliente. Não acrescente uma linha para Caio, que não fez pedido.',answer:'RIGHT',explain:'RIGHT JOIN preserva os pedidos da tabela da direita, inclusive o 104. Não significa preservar um cliente sem pedido.',hint:'Agora o conjunto que deve permanecer inteiro está à direita.'},
      {id:'tudo',type:'sql',prompt:'Mantenha Caio E o pedido 104, além das correspondências. Qual junção atende?',answer:'FULL',explain:'FULL JOIN mantém as correspondências e os registros sem par de ambos os lados. Este exemplo produz cinco linhas.',hint:'Precisamos preservar os dois lados.'}
    ],'dados'),
    mission('decisoes-publicas','Sala de decisões',['const_fundamentos','etica_servico'],/princip|direito|etica|integridade|administra|responsab|controle/,'Ajude uma equipe pública a reconhecer princípios em situações simples.',[
      choice('impessoal','Um servidor atende primeiro os amigos, sem critério público de prioridade. Qual princípio é diretamente contrariado?',['Impessoalidade','Publicidade','Anualidade orçamentária'],0,'O favorecimento pessoal contraria a impessoalidade. Prioridades legais e objetivas são diferentes de privilégios por amizade.','Pense na diferença entre critério público e amizade.'),
      choice('eficiencia','Uma equipe elimina retrabalho e reduz erros mantendo a qualidade do atendimento. Qual princípio é ilustrado?',['Eficiência','Sigilo absoluto','Pessoalidade'],0,'A eficiência se relaciona ao bom uso dos recursos e à qualidade dos resultados. Reduzir tempo não autoriza abandonar a legalidade ou a qualidade.','Observe recursos, qualidade e resultado.'),
      choice('interesse','Um integrante percebe interesse particular numa decisão pública. Qual é a conduta adequada?',['Omitir a situação','Comunicar o possível conflito e seguir as regras aplicáveis de impedimento ou afastamento','Decidir rapidamente sem registrar'],1,'O possível conflito deve ser comunicado e tratado pelas regras aplicáveis. Ocultar a situação impede o controle e pode comprometer a decisão.','Transparência sobre o conflito permite aplicar a regra adequada.')
    ],'casos'),
    mission('planilha-operacao','Painel de planilhas',['info_planilhas'],/planilha|excel|func|media/,'Confira resultados antes que uma planilha incorreta seja usada pela equipe.',[
      number('soma','A1 = 10, A2 = 20 e A3 = 30. Qual o resultado de SOMA(A1:A3)?',60,'O intervalo A1:A3 inclui A1, A2 e A3: 10 + 20 + 30 = 60.','Dois-pontos incluem as células intermediárias.','A1 10 · A2 20 · A3 30'),
      number('media','As células B1, B2 e B3 contêm 4, 8 e 12. Qual o resultado de MÉDIA(B1:B3)?',8,'A média é (4 + 8 + 12) ÷ 3 = 24 ÷ 3 = 8.','Some os valores e divida pela quantidade de células numéricas.','B1 4 · B2 8 · B3 12'),
      choice('referencia','Ao copiar =A1+$B$1 uma linha para baixo, qual fórmula resulta?',['=A2+$B$1','=A2+$B$2','=A1+$B$1'],0,'A1 é relativa e passa a A2. $B$1 é absoluta e mantém coluna e linha.','O cifrão fixa a referência que o segue.')
    ],'calculo'),
    mission('rede-investigacao','Resgate da conexão',['infra'],/rede|enderec|cabeamento|internet|dns|nuvem|infraestrutura/,'Localize o serviço ou componente que corresponde à pista, sem confundir sintomas com causas.',[
      choice('dns','O acesso por endereço IP funciona, mas um nome conhecido não é resolvido. Qual serviço investigar primeiro?',['DNS','Editor de texto','Monitor'],0,'DNS participa da resolução de nomes para endereços. O sintoma orienta investigá-lo, mas não prova sozinho a causa definitiva.','Quem traduz o nome do serviço para um endereço?'),
      choice('dhcp','Qual serviço pode fornecer automaticamente endereço IP e outros parâmetros de rede aos clientes?',['DHCP','HTTP','SMTP'],0,'DHCP fornece parâmetros de configuração de rede aos clientes, incluindo endereço IP, conforme a configuração do servidor.','Não confunda configurar um endereço com resolver um nome.'),
      choice('switch','Em uma rede Ethernet local, qual equipamento encaminha quadros usando endereços MAC?',['Switch','Servidor de e-mail','Projetor'],0,'O switch usa endereços MAC para encaminhar quadros na rede local. O roteamento entre redes envolve outra função.','Observe que a pergunta trata de quadros e MAC.')
    ],'casos'),
    mission('seguranca-incidente','Sala de incidentes',['seguranca'],/seguranca|lgpd|privacidade|protecao|incidente|backup/,'Proteja a informação identificando a propriedade afetada em cada caso.',[
      choice('confidencial','Uma pessoa sem autorização lê um arquivo restrito. Qual propriedade foi comprometida?',['Confidencialidade','Disponibilidade','Velocidade'],0,'Houve exposição a alguém sem autorização: quebra de confidencialidade. O arquivo pode continuar disponível e intacto.','A pista central é quem pôde ler.'),
      choice('integridade','Um valor é alterado indevidamente num cadastro. Qual propriedade foi afetada?',['Integridade','Somente disponibilidade','Tamanho da tela'],0,'A alteração indevida compromete a integridade da informação. Ser possível abrir o cadastro não garante que seus dados estejam corretos.','Pense na correção e nas alterações do conteúdo.'),
      choice('disponivel','O serviço fica inacessível para quem está autorizado a utilizá-lo. Qual propriedade foi afetada?',['Disponibilidade','Confidencialidade necessariamente','Autoria literária'],0,'O impedimento de acesso ao serviço afeta a disponibilidade. O caso não afirma que houve exposição do conteúdo.','A pessoa tem autorização, mas não consegue usar o serviço.')
    ],'casos'),
    mission('oficina-sequencias','Oficina de sistemas',['engenharia'],/engenharia|teste|desenvolv|versao|git|programa/,'Organize ações numa sequência coerente. Use as setas; não é necessário arrastar.',[
      {id:'aceitacao',type:'order',prompt:'Organize este pequeno fluxo de validação de uma necessidade.',pieces:['Entender a necessidade','Definir critérios de aceitação','Executar a verificação dos critérios'],answer:[0,1,2],explain:'Primeiro entendemos a necessidade. Depois definimos como reconhecer o atendimento dela. A verificação compara o resultado com esses critérios.',hint:'Precisamos saber o que verificar antes de executar a verificação.'},
      {id:'git',type:'order',prompt:'Num repositório Git já existente, ordene estas ações para registrar uma alteração local.',pieces:['Editar um arquivo','Adicionar a alteração à área de preparação','Criar o commit'],answer:[0,1,2],explain:'A edição muda o arquivo; git add prepara o conteúdo; git commit registra o conteúdo preparado. Enviar ao remoto é outro passo.',hint:'O commit usa o que foi preparado.'},
      {id:'defeito',type:'order',prompt:'Organize a correção de um defeito que já foi relatado.',pieces:['Reproduzir o defeito','Aplicar uma correção','Executar os testes relevantes'],answer:[0,1,2],explain:'Reproduzir ajuda a entender o problema. A correção altera o comportamento. Os testes conferem o resultado e possíveis regressões.',hint:'A confirmação do resultado vem depois da correção.'}
    ],'sequencias'),
    mission('ingles-evidencias','Decodificador de inglês',['ingles_leitura'],/ingles|compreens|vocab|referenc|texto/,'Use o contexto para interpretar uma mensagem técnica curta.',[
      choice('however','O conectivo however introduz qual relação?',['Contraste','Adição obrigatória','Causa'],0,'However introduz contraste entre as ideias: o servidor está online, mas alguns usuários ainda não conseguem entrar.','Compare as duas situações.',{type:'evidence',passage:'The server is online. However, some users still cannot log in.'}),
      choice('it','Na mensagem, it retoma qual termo?',['The report','The morning','The users'],0,'It retoma the report, que foi revisado e está pronto.','Busque um referente singular compatível.',{type:'evidence',passage:'The report was reviewed this morning. It is ready for publication.'}),
      choice('actually','Neste contexto, actually significa aproximadamente o quê?',['Na verdade','Atualmente','Anualmente'],0,'Actually corrige a expectativa: na verdade, o arquivo é público. Para dizer atualmente, uma opção é currently.','A segunda frase corrige a informação anterior.',{type:'evidence',passage:'I thought the file was private. Actually, it is public.'})
    ],'evidencias')
  ];
  const escape=text=>text.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const foundations=JOURNEYS.map(t=>({id:'base-'+t.id,title:'Conecte as ideias · '+t.name,journeys:[t.id],journey:t.id,type:'conexoes',kind:'foundation',story:'Reconecte o painel ligando cada pista ao conceito correspondente. Depois confira a explicação.',questions:t.steps.map((s,i)=>{
    const distractors=[...new Set(t.steps.filter(x=>x.term!==s.term).map(x=>x.term))].slice(0,3);
    const options=[s.term,...distractors];const shift=(i+t.id.length)%options.length;const mixed=[...options.slice(shift),...options.slice(0,shift)];
    return choice('conceito-'+i,'Qual conceito corresponde à pista?',mixed,mixed.indexOf(s.term),s.meaning,'Relembre o exemplo da história: '+s.title,{type:'connect',passage:s.meaning.replace(new RegExp(escape(s.term),'gi'),'[conceito]'),ref:{journey:t.id,index:i}});
  })}));
  for(const m of rich)for(const [i,q] of m.questions.entries()){
    if(q.options){const offset=(i+[...m.id].reduce((n,c)=>n+c.charCodeAt(0),0))%q.options.length;q.options=[...q.options.slice(offset),...q.options.slice(0,offset)];q.answer=(q.answer-offset+q.options.length)%q.options.length;}
    q.ref={journey:m.journey,index:0};
    if(m.id==='detetive-texto')q.ref.index=[0,4,2][i];
    if(m.id==='balanca-equacoes')q.ref.index=[2,3,4][i];
    if(m.id==='seguranca-incidente')q.ref.index=i+1;
    if(m.id==='rede-investigacao')q.ref.index=[2,1,0][i];
    if(m.id==='circuito-logico')q.ref.index=i+2;
    if(m.id==='resgate-sql')q.ref={kind:'laboratorio',id:'sql-linguagens',part:i===0?1:2,journey:m.journey};
    if(m.id==='planilha-operacao'&&i<2)q.ref={kind:'laboratorio',id:'planilhas-mapa',part:i+1,journey:m.journey};
    if(m.id==='decisoes-publicas')q.ref=i<2?{kind:'infograficos',id:'principios-administracao',part:0,journey:m.journey}:{journey:'etica_servico',index:1};
  }
  return [...rich,...foundations];
})();
