/* Ampliação autoral: conceito, explicação, situação e raciocínio. */
const STORY_SEEDS = {
 java:[
  ['Encapsulamento','Proteger o estado por meio de uma interface controlada.','Uma classe mantém o saldo privado e oferece um método para depositar.','A validação do método ajuda a preservar as regras do saldo.'],
  ['Construtor','Rotina usada na criação de um objeto para inicializar seu estado.','Um bolo nasce com o sabor informado no momento da criação.','O construtor recebe o valor inicial; ele não é uma segunda classe.'],
  ['Referência','Um valor que permite acessar um objeto.','Duas variáveis apontam para o mesmo bolo e uma altera seu sabor.','As duas referências observam o mesmo objeto, não duas cópias independentes.'],
  ['Herança','Uma classe pode especializar outra quando existe relação adequada entre os tipos.','Uma classe de encomenda especial reutiliza características de encomenda.','A especialização deve respeitar o comportamento esperado do tipo mais geral.'],
  ['Interface','Um contrato de operações que tipos podem implementar.','Dois serviços diferentes oferecem a operação de enviar uma mensagem.','O código cliente pode depender do contrato sem exigir a mesma implementação interna.'],
  ['Exceção','Uma forma de sinalizar uma condição excepcional durante a execução.','A leitura de um arquivo pode falhar porque ele não existe.','O programa pode tratar a falha adequadamente, sem fingir que a leitura ocorreu.']
 ],
 seguranca:[
  ['Autenticação','Verificação de uma identidade alegada, usando um ou mais fatores.','Uma pessoa informa sua senha para entrar no sistema.','Verificar quem ela é precede decidir o que ela pode fazer.'],
  ['Autorização','Decisão sobre quais operações uma identidade autenticada pode realizar.','Uma servidora entra no sistema, mas seu perfil permite apenas consultar.','Entrar no sistema não significa ter permissão para alterar qualquer registro.'],
  ['Menor privilégio','Conceder apenas os acessos necessários à atividade, pelo tempo adequado.','Uma estagiária recebe acesso de leitura ao arquivo de que precisa.','Permissões excessivas aumentam a exposição e devem ser revisadas.'],
  ['Backup','Cópia que permite recuperar dados, sujeita a teste e proteção adequados.','A equipe restaura uma amostra da cópia em ambiente de teste.','Uma cópia só é útil na recuperação se estiver íntegra e acessível quando necessária.'],
  ['Phishing','Tentativa de induzir alguém a revelar dados ou executar uma ação por mensagem enganosa.','Um e-mail urgente pede que a pessoa entre em um link estranho e informe a senha.','A urgência não prova autenticidade; confirme a solicitação por canal conhecido.'],
  ['Criptografia','Técnicas que podem proteger informação por meio de chaves e algoritmos.','Uma conexão HTTPS protege dados em trânsito contra leitura casual no caminho.','A proteção depende de configuração adequada e não garante que o site de destino seja confiável.']
 ],
 infra:[
  ['Endereço IP','Identificação usada para encaminhar pacotes em redes IP.','Dois equipamentos de uma rede precisam se comunicar por seus endereços.','O endereço ajuda no encaminhamento; ele não é o nome de domínio.'],
  ['DNS','Sistema que permite consultar registros associados a nomes de domínio.','O navegador procura o endereço associado ao nome de um site.','A consulta de DNS ajuda a localizar o destino; não transporta sozinha a página.'],
  ['TCP','Protocolo de transporte orientado à conexão, com mecanismos de entrega ordenada.','Uma aplicação estabelece uma conexão para trocar dados com outra.','O TCP tenta entregar os dados de forma confiável, mas falhas de conexão ainda podem ocorrer.'],
  ['UDP','Protocolo de transporte que não oferece as garantias de entrega e ordenação do TCP.','Uma aplicação envia datagramas e decide como lidar com perdas.','O uso de UDP não impede que a aplicação adicione seus próprios controles.'],
  ['Roteador','Equipamento ou função que encaminha pacotes entre redes.','Um pacote sai da rede local em direção a outra rede.','O roteador escolhe o próximo caminho conforme sua tabela e configuração.'],
  ['Nuvem','Modelo de acesso sob demanda a recursos computacionais pela rede.','Uma equipe cria um servidor virtual para testar um serviço.','O recurso continua existindo em infraestrutura real; a forma de provisão é que muda.']
 ],
 port_texto:[
  ['Tema','Assunto central sobre o qual o texto fala.','Um texto discute desperdício de água em prédios públicos.','O tema resume o assunto; não precisa reproduzir todas as informações.'],
  ['Tese','Ponto de vista que o autor defende em um texto argumentativo.','O autor sustenta que reduzir desperdício exige manutenção preventiva.','A tese é uma posição; os dados apresentados podem funcionar como argumentos.'],
  ['Inferência','Conclusão apoiada em pistas do texto e no conhecimento pertinente.','O aviso informa que a porta deve ficar fechada para manter o ar refrigerado.','Pode-se inferir a finalidade do aviso sem afirmar fatos que o texto não sustenta.'],
  ['Referente','Elemento a que uma palavra ou expressão se relaciona no contexto.','Em “Ana entregou o relatório. Ela saiu”, o pronome retoma Ana.','Identificar a referência evita trocar as pessoas mencionadas.'],
  ['Conectivo de oposição','Expressão que relaciona ideias por contraste ou ressalva.','O prazo era curto, mas a equipe concluiu o trabalho.','O conectivo “mas” introduz contraste; não indica causa.'],
  ['Fato e opinião','Fato verificável e avaliação de alguém desempenham papéis diferentes.','“O prazo terminou ontem” pode ser verificado; “o prazo foi injusto” expressa avaliação.','O contexto e as evidências permitem distinguir uma informação de um juízo.']
 ],
 port_pontuacao:[
  ['Vocativo','Termo usado para chamar ou interpelar o interlocutor.','Na frase “Lia, confira o documento”, o nome chama a pessoa.','A vírgula separa o vocativo do restante da oração.'],
  ['Enumeração','Sequência de elementos coordenados em uma mesma função.','A lista contém papel, caneta e pasta.','A vírgula separa itens da enumeração; a conjunção liga os dois últimos.'],
  ['Sujeito e verbo','Em ordem direta, não se separa o sujeito de seu verbo por uma vírgula isolada.','Em “Os candidatos chegaram”, o verbo acompanha o sujeito sem vírgula entre ambos.','Um termo intercalado pode ser isolado por duas vírgulas; isso não autoriza separar sujeito e verbo por uma só.'],
  ['Aposto explicativo','Trecho que explica ou identifica outro termo.','“Natal, capital do Rio Grande do Norte, fica no litoral.”','As vírgulas isolam a explicação intercalada.'],
  ['Ponto e vírgula','Sinal usado para separar unidades relacionadas, especialmente em séries complexas.','Uma lista contém itens longos que já têm vírgulas internas.','O ponto e vírgula ajuda a organizar os grupos sem encerrar o período como um ponto final.'],
  ['Dois-pontos','Sinal que pode introduzir uma explicação, enumeração ou fala.','“Separe três itens: lápis, borracha e papel.”','Os dois-pontos anunciam a lista; o sentido depende da relação entre os trechos.']
 ],
 port_concordancia:[
  ['Núcleo do sujeito','Palavra central do sujeito com a qual o verbo normalmente concorda.','Em “A lista de documentos chegou”, o núcleo é “lista”.','O verbo fica no singular porque acompanha o núcleo, não a palavra mais próxima.'],
  ['Sujeito composto','Sujeito com mais de um núcleo.','“Ana e Bia chegaram cedo.”','Com núcleos coordenados antes do verbo, a concordância regular é no plural.'],
  ['Adjetivo e substantivo','O adjetivo flexiona conforme o substantivo ao qual se refere.','“As pastas novas foram entregues.”','Artigo e adjetivo acompanham o feminino plural de “pastas”.'],
  ['Haver impessoal','No sentido de existir ou tempo decorrido, haver é impessoal.','“Há duas vagas” informa existência.','Nesse uso, o verbo fica no singular: “há”, e não “hão duas vagas”.'],
  ['Fazer impessoal','Ao indicar tempo decorrido, o verbo fazer é impessoal.','“Faz três anos que estudo.”','A expressão de tempo não é sujeito; mantém-se “faz”.'],
  ['Porcentagem e núcleo','A concordância em expressões percentuais depende da construção.','“20% dos candidatos faltaram” destaca candidatos no plural.','Observe o termo expresso e o contexto, sem aplicar uma regra única a todos os casos.']
 ],
 mat_frac:[
  ['Numerador','Número que indica quantas partes do tamanho escolhido foram consideradas.','Em 3/4 de uma pizza dividida em quatro partes iguais, consideram-se três partes.','O 3 conta partes; o 4 indica o tipo de divisão.'],
  ['Denominador','Número que indica em quantas partes iguais a unidade foi dividida.','Na fração 1/8, a unidade foi dividida em oito partes iguais.','Partes precisam ser iguais para a comparação representar corretamente a fração.'],
  ['Equivalência','Frações equivalentes representam o mesmo valor.','Metade de uma barra também corresponde a duas de quatro partes iguais.','1/2 = 2/4, pois numerador e denominador foram multiplicados por 2.'],
  ['Soma de denominadores iguais','Somam-se os numeradores e mantém-se o denominador comum.','Um recipiente recebeu 1/8 e depois 3/8 da mesma capacidade.','1/8 + 3/8 = 4/8 = 1/2.'],
  ['Multiplicação de frações','Multiplicam-se numeradores entre si e denominadores entre si.','Qual é metade de 3/4 de uma unidade?','1/2 × 3/4 = 3/8 da unidade.'],
  ['Divisão por fração','Dividir por uma fração não nula equivale a multiplicar pelo seu inverso.','Quantas porções de 1/4 cabem em 1/2?','1/2 ÷ 1/4 = 1/2 × 4 = 2 porções.']
 ],
 mat_media:[
  ['Média simples','Soma dos valores dividida pela quantidade de valores.','Notas 6, 8 e 10 pertencem à mesma lista.','A soma é 24; dividida por 3, resulta em média 8.'],
  ['Média ponderada','Soma de cada valor multiplicado por seu peso, dividida pela soma dos pesos.','Uma nota 8 tem peso 3 e a nota 6 tem peso 2.','(8×3 + 6×2) ÷ 5 = 7,2.'],
  ['Peso zero','Um valor com peso zero não altera o numerador nem a soma dos pesos.','Uma nota tem peso 0 em um cálculo ponderado.','Ela não contribui para a média, desde que a soma total dos pesos não seja zero.'],
  ['Efeito de um extremo','Valores muito altos ou baixos podem alterar a média.','A lista 4, 5 e 21 tem média 10.','A média não precisa coincidir com um valor típico da lista; confira a distribuição.'],
  ['Total a partir da média','Média multiplicada pela quantidade fornece a soma dos valores.','Cinco provas têm média 7.','A soma das cinco notas é 5 × 7 = 35.'],
  ['Valor faltante','Uma soma conhecida permite encontrar o valor que falta.','Três notas têm média 6; duas delas são 5 e 7.','A soma deve ser 18; a nota faltante é 18 − 5 − 7 = 6.']
 ],
 mat_porcento:[
  ['Percentual','Uma taxa percentual indica partes por cem.','Uma taxa de 12% é aplicada a uma base de 200.','12/100 × 200 = 24.'],
  ['Desconto','Uma redução percentual é calculada sobre a base indicada.','Um produto de R$ 100 recebe desconto de 20%.','O desconto é R$ 20 e o preço final é R$ 80.'],
  ['Aumento','Um acréscimo percentual soma à base original o valor calculado.','Uma tarifa de R$ 50 aumenta 10%.','O acréscimo é R$ 5 e a nova tarifa é R$ 55.'],
  ['Taxas sucessivas','Cada taxa sucessiva incide sobre a base existente naquele momento.','Um valor de R$ 100 aumenta 10% e depois cai 10%.','O resultado é 110 × 0,9 = R$ 99, não R$ 100.'],
  ['Pontos percentuais','Diferença entre taxas percentuais, expressa em pontos percentuais.','Uma taxa passa de 20% para 25%.','A variação é de 5 pontos percentuais; o aumento relativo é 25%.'],
  ['Encontrar a base','A base pode ser calculada dividindo a parte pela taxa em forma decimal.','Se 15% de um valor é 30, qual é o valor?','30 ÷ 0,15 = 200.']
 ],
 port_crase:[
  ['Encontro de vogais','A crase marcada por acento grave pode resultar de preposição a mais artigo a.','“Fui à escola” combina a preposição exigida por ir e o artigo de escola.','A presença das duas partes precisa ser examinada no contexto.'],
  ['Verbo sem preposição a','Se a regência não exige a preposição a, a fusão não ocorre nessa construção.','“Visitei a escola” usa objeto direto para o verbo visitar.','Há artigo, mas não a preposição exigida para formar “à”.'],
  ['Termo masculino','Em regra, o artigo masculino o não se funde com a preposição a como “à”.','“Voltei ao escritório” combina a + o.','A contração é “ao”; a comparação pode ajudar a analisar um termo feminino paralelo.'],
  ['Locução feminina','Algumas locuções femininas usam acento grave conforme a norma.','“A reunião começa às duas horas.”','A indicação precisa de hora usa “às” nessa construção.'],
  ['Palavra repetida','Entre palavras repetidas, como em expressões usuais, não se usa acento grave.','O atendimento ocorreu “cara a cara”.','Não aparece artigo definido feminino entre os termos repetidos.'],
  ['Antes de verbo','Antes de verbo não há artigo feminino a para formar a crase.','“Começou a estudar” emprega a preposição antes do infinitivo.','Escreve-se “a estudar”, sem acento grave.']
 ],
 logic_proposicoes:[
  ['Proposição','Enunciado declarativo que, na lógica clássica, possui valor verdadeiro ou falso.','“A porta está aberta” afirma algo verificável no contexto.','Uma pergunta como “A porta está aberta?” não é proposição declarativa.'],
  ['Negação','Operação que inverte o valor de verdade de uma proposição.','Se P é “a porta está aberta”, não P afirma que ela não está aberta.','Quando P é verdadeira, sua negação é falsa, e vice-versa.'],
  ['Conjunção','A expressão P e Q é verdadeira quando ambas as proposições são verdadeiras.','A condição pede documento e assinatura.','Se faltar uma das duas condições, a conjunção é falsa.'],
  ['Disjunção inclusiva','A expressão P ou Q é falsa somente quando ambas são falsas.','O acesso é permitido por senha ou certificado, sem exclusão expressa.','Na lógica inclusiva, as duas alternativas podem ser verdadeiras ao mesmo tempo.'],
  ['Condicional','P implica Q é falsa quando P é verdadeira e Q é falsa.','“Se chove, a rua molha”: choveu e a rua permaneceu seca.','Essa combinação contradiz a condição; as outras não a falsificam na lógica clássica.'],
  ['Contrapositiva','A condicional P → Q equivale a não Q → não P.','Se aprovado, então inscrito; alguém não está inscrito.','Pela contrapositiva, essa pessoa não foi aprovada nessa condição.']
 ],
 mat_probabilidade:[
  ['Espaço amostral','Conjunto dos resultados possíveis definidos para o experimento.','Um dado comum é lançado uma vez e observamos a face superior.','Os resultados possíveis são 1, 2, 3, 4, 5 e 6.'],
  ['Evento','Um conjunto de resultados de interesse.','No dado, o evento par contém 2, 4 e 6.','O evento é parte do espaço amostral definido.'],
  ['Casos equiprováveis','Quando os resultados têm a mesma chance, divide-se a quantidade favorável pela possível.','Em um dado justo, queremos obter número par.','São três resultados favoráveis em seis: 3/6 = 1/2.'],
  ['Complemento','Probabilidade de não ocorrer um evento é 1 menos sua probabilidade.','A chance de atraso é 0,2.','A chance de não haver atraso é 1 − 0,2 = 0,8.'],
  ['Probabilidade condicional','Probabilidade de um evento considerando que outro ocorreu.','Entre 10 inscritos, 4 estudam inglês; desses, 3 também estudam informática.','Entre os que estudam inglês, a fração que também estuda informática é 3/4.'],
  ['Independência','Dois eventos são independentes quando conhecer um não altera a probabilidade do outro.','Duas moedas justas são lançadas independentemente.','A chance de duas caras é 1/2 × 1/2 = 1/4.']
 ],
 info_hardware:[
  ['Processador','Componente que executa instruções e participa do processamento.','Uma planilha realiza um cálculo após receber uma fórmula.','A CPU executa instruções; a tarefa envolve também memória e outros componentes.'],
  ['Memória RAM','Memória de trabalho usada durante a execução de programas.','Um aplicativo aberto precisa manter dados acessíveis enquanto funciona.','A RAM comum é volátil: não substitui uma cópia persistente dos arquivos.'],
  ['SSD','Dispositivo de armazenamento baseado em memória de estado sólido.','O computador guarda documentos em um SSD.','Os arquivos podem permanecer após desligar, mas ainda precisam de backup.'],
  ['Dispositivo de entrada','Equipamento usado para fornecer dados ou comandos ao sistema.','Uma pessoa digita uma senha no teclado.','O teclado envia a entrada; ele não é apenas dispositivo de saída.'],
  ['Dispositivo de saída','Equipamento que apresenta resultados produzidos pelo sistema.','O monitor mostra o relatório aberto.','A tela apresenta informação visual; uma tela sensível ao toque também pode receber entrada.'],
  ['Porta USB','Interface usada para conectar e comunicar dispositivos compatíveis.','Uma impressora é conectada por USB ao computador.','O uso e o desempenho dependem das versões, cabos e dispositivos envolvidos.']
 ],
 info_arquivos:[
  ['Caminho','Sequência que identifica a localização de um arquivo ou pasta.','Um relatório está dentro da pasta “provas”, que está em “estudos”.','O caminho ajuda a distinguir arquivos com o mesmo nome em pastas diferentes.'],
  ['Extensão','Parte do nome normalmente usada para indicar formato ou associação do arquivo.','O nome “relatorio.pdf” termina em .pdf.','A extensão sugere um formato; renomeá-la sozinha não converte o conteúdo.'],
  ['Copiar','Criar outra entrada ou arquivo com o conteúdo copiado.','Uma planilha é copiada da pasta A para a pasta B.','A cópia não remove automaticamente o original da pasta A.'],
  ['Mover','Transferir um item para outra localização.','Um arquivo é movido da pasta temporária para a pasta de estudos.','A operação pretende mudar a localização; o comportamento pode depender do sistema e dos destinos.'],
  ['Backup independente','Cópia separada da versão de trabalho, guardada com proteção adequada.','Uma pessoa mantém cópia externa de seus documentos importantes.','Uma pasta sincronizada pode refletir exclusões; versões e cópias independentes ajudam na recuperação.'],
  ['Permissão','Regra que define operações permitidas em um arquivo ou pasta.','Uma pasta compartilhada permite leitura, mas não edição, a um usuário.','Poder abrir um arquivo não implica poder alterá-lo.']
 ],
 info_planilhas:[
  ['Referência relativa','Referência que se ajusta conforme a posição quando uma fórmula é copiada.','A fórmula =A1 é copiada uma linha para baixo.','Na cópia, a referência relativa passa a ser =A2.'],
  ['Referência absoluta','Referência marcada para manter coluna e linha fixas na cópia da fórmula.','Uma taxa está em $B$1 e será usada em várias linhas.','Os cifrões fixam a coluna B e a linha 1 nessa referência.'],
  ['Intervalo','Conjunto de células indicado por seus limites.','A1:A3 inclui A1, A2 e A3.','Os dois-pontos indicam todo o intervalo, inclusive a célula intermediária.'],
  ['SOMA','Função que soma os valores considerados em seus argumentos.','A1, A2 e A3 contêm 10, 20 e 30.','SOMA(A1:A3) resulta em 60.'],
  ['MÉDIA','Função que calcula a média dos valores considerados.','As células contêm 4, 8 e 12.','MÉDIA do intervalo é (4+8+12)/3 = 8.'],
  ['SE','Função que escolhe um resultado conforme uma condição.','Em =SE(A1>=7;"Aprovado";"Revisar"), A1 vale 8.','Como 8 é maior ou igual a 7, o resultado é “Aprovado”.']
 ],
 info_documentos:[
  ['Estilo de título','Conjunto de formatação e estrutura aplicado a títulos.','O título “Introdução” recebe o estilo Título 1.','O estilo torna a hierarquia reconhecível para recursos como navegação e sumário.'],
  ['Sumário automático','Lista gerada a partir da estrutura reconhecida do documento.','Um documento usa estilos de título em seus capítulos.','O editor pode montar um sumário a partir dessa estrutura.'],
  ['Atualização do sumário','Regeração do campo para refletir mudanças no documento.','Um capítulo foi movido para outra página.','Atualize o sumário antes de entregar o documento.'],
  ['Quebra de página','Comando que inicia o conteúdo seguinte em uma nova página.','Um novo capítulo deve começar na página seguinte.','Uma quebra é mais estável que inserir várias linhas vazias.'],
  ['Cabeçalho e rodapé','Áreas usadas para informações repetidas nas páginas ou seções.','Uma página mostra a numeração no rodapé.','Configurações de seção e primeira página podem mudar a repetição.'],
  ['Controle de alterações','Recurso que registra propostas de edição para revisão.','Uma revisora corrige um parágrafo com alterações ativadas.','Outra pessoa pode examinar e aceitar ou rejeitar as mudanças.']
 ],
 mat_razao:[
  ['Razão','Comparação entre duas grandezas por uma divisão, com denominador não nulo.','Há 6 servidores para 3 salas.','A razão 6/3 é 2 servidores por sala nessa distribuição.'],
  ['Proporção','Igualdade entre duas razões.','2/3 e 4/6 representam a mesma razão.','O produto cruzado confirma 2×6 = 3×4.'],
  ['Diretamente proporcional','Quando uma grandeza é multiplicada por um fator, a outra é multiplicada pelo mesmo fator, no modelo aplicável.','Cada caderno custa R$ 5; a quantidade comprada dobra.','Com preço unitário constante, o custo total também dobra.'],
  ['Inversamente proporcional','No modelo inverso, multiplicar uma grandeza por um fator divide a outra pelo mesmo fator.','Trabalhadores idênticos executam a mesma tarefa nas mesmas condições.','Se a equipe dobra e a produtividade individual se mantém, o tempo do modelo cai à metade.'],
  ['Unidades','Antes de comparar grandezas, é necessário observar suas unidades.','Um percurso de 2 km precisa ser comparado a outro de 500 m.','2 km correspondem a 2.000 m; a razão é 2.000/500 = 4.'],
  ['Regra de três direta','Método para calcular um valor em proporção direta.','Três cadernos custam R$ 15, com preço unitário constante.','Um custa R$ 5; cinco custam R$ 25.']
 ],
 mat_equacoes:[
  ['Igualdade','Relação que afirma que duas expressões têm o mesmo valor.','Na igualdade 3 + 2 = 5, os dois lados valem cinco.','Uma transformação equivalente preserva as soluções quando aplicada corretamente aos dois lados.'],
  ['Incógnita','Valor desconhecido representado por um símbolo.','Em x + 3 = 8, x representa o valor procurado.','O valor que torna a igualdade verdadeira é 5.'],
  ['Princípio aditivo','Somar ou subtrair o mesmo valor dos dois lados preserva a igualdade.','Em x + 3 = 8, subtraímos 3 de ambos os lados.','Resulta x = 5; “trocar de lado” é um atalho para essa operação.'],
  ['Princípio multiplicativo','Multiplicar ou dividir ambos os lados por um mesmo número não nulo preserva equivalência.','Em 2x = 10, dividimos os dois lados por 2.','Obtemos x = 5. Dividir por zero não é permitido.'],
  ['Distribuição','Multiplicar uma soma por um número é multiplicar cada parcela por ele.','Em 2(x + 3) = 14, desenvolvemos o lado esquerdo.','2x + 6 = 14; logo 2x = 8 e x = 4.'],
  ['Conferência','Substituir a solução no enunciado testa a igualdade original.','A solução proposta para 3x − 2 = 10 é x = 4.','3×4 − 2 = 10; os dois lados são iguais.']
 ],
 logic_conjuntos:[
  ['Pertinência','Relação entre um elemento e um conjunto.','Se A = {1, 2, 3}, o número 2 está em A.','Escrevemos 2 ∈ A; o elemento não é o mesmo que o conjunto {2}.'],
  ['União','Elementos que pertencem a pelo menos um dos conjuntos.','A = {1, 2} e B = {2, 3}.','A união é {1, 2, 3}; o elemento repetido aparece uma vez no conjunto.'],
  ['Interseção','Elementos comuns aos conjuntos.','A = {1, 2} e B = {2, 3}.','A interseção é {2}.'],
  ['Diferença','Elementos do primeiro conjunto que não pertencem ao segundo.','A = {1, 2} e B = {2, 3}.','A − B é {1}; B − A é {3}.'],
  ['Inclusão','Um conjunto está contido em outro quando todos os seus elementos estão no outro.','A = {1, 2} e B = {1, 2, 3}.','A está contido em B; isso é diferente de afirmar que 2 é um conjunto.'],
  ['Contagem da união','Ao somar quantidades de dois conjuntos, subtrai-se a interseção contada duas vezes.','Há 12 pessoas em A, 9 em B e 4 em ambos.','Na união há 12 + 9 − 4 = 17 pessoas.']
 ],
 port_acentos:[
  ['Sílaba tônica','Sílaba pronunciada com maior intensidade em uma palavra.','Em “café”, a sílaba mais forte é “fé”.','A posição da tônica ajuda a identificar a classificação da palavra.'],
  ['Oxítona','Palavra cuja sílaba tônica é a última.','Em “café”, a tonicidade recai sobre a última sílaba.','Café é oxítona; a aplicação do acento depende também da terminação e da regra.'],
  ['Paroxítona','Palavra cuja sílaba tônica é a penúltima.','Em “livro”, a sílaba forte é “li”.','Livro é paroxítona e não recebe acento gráfico.'],
  ['Proparoxítona','Palavra cuja sílaba tônica é a antepenúltima.','Em “música”, a tonicidade está em “mú”.','As proparoxítonas são acentuadas graficamente.'],
  ['Hiato','Encontro de vogais pronunciadas em sílabas diferentes.','Em “saída”, a vogal i forma sílaba separada da vogal anterior.','O acento obedece às regras e exceções do hiato; não se acentua todo encontro de vogais.'],
  ['Acento e significado','O acento pode distinguir palavras em construções específicas.','“Ele tem” e “eles têm” são formas do verbo ter.','O acento na forma plural ajuda a distinguir a concordância verbal.']
 ],
 port_sujeito:[
  ['Verbo','Palavra que constitui o núcleo do predicado verbal.','Na frase “Os candidatos chegaram”, a ação indicada é “chegaram”.','Localizar o verbo ajuda a investigar o sujeito.'],
  ['Sujeito simples','Sujeito com um núcleo.','Em “Os candidatos chegaram”, o núcleo é “candidatos”.','O artigo acompanha o núcleo, mas não é outro núcleo do sujeito.'],
  ['Sujeito composto','Sujeito com dois ou mais núcleos coordenados.','“Ana e Bia chegaram.”','Ana e Bia são os dois núcleos ligados por “e”.'],
  ['Sujeito oculto','Sujeito não expresso que pode ser identificado pela flexão ou pelo contexto.','“Estudamos ontem” indica a pessoa nós.','A forma verbal permite recuperar o sujeito, embora ele não apareça escrito.'],
  ['Oração sem sujeito','Construção com verbo impessoal.','“Há vagas” usa haver no sentido de existir.','Nessa construção, “vagas” não é sujeito do verbo haver.'],
  ['Predicado','Parte da oração que contém o que se declara sobre o sujeito ou a construção verbal.','Em “A equipe concluiu o relatório”, “concluiu o relatório” é o predicado.','O verbo está no predicado; “a equipe” é o sujeito.']
 ],
 port_verbos:[
  ['Tempo verbal','Forma que situa o fato em relação ao momento da fala ou a outro marco.','“Estudo agora” apresenta o verbo no presente.','O contexto orienta o valor do tempo usado.'],
  ['Pretérito perfeito','Forma que, em uso frequente, apresenta ação passada concluída.','“A equipe entregou o documento ontem.”','O verbo “entregou” relata o fato como concluído.'],
  ['Pretérito imperfeito','Forma que pode apresentar ação habitual ou em desenvolvimento no passado.','“A equipe revisava os arquivos toda semana.”','A forma destaca hábito ou continuidade no passado.'],
  ['Futuro do presente','Forma que pode indicar fato posterior ao momento de referência.','“A equipe revisará o texto amanhã.”','“Revisará” indica uma ação futura no contexto.'],
  ['Subjuntivo','Modo verbal associado, conforme o contexto, a hipótese, possibilidade ou desejo.','“Se a equipe revisar o texto, encontrará o erro.”','“Revisar” integra uma condição; não afirma que a revisão já ocorreu.'],
  ['Imperativo','Modo usado em ordens, pedidos, instruções ou convites.','“Confira os dados antes de enviar.”','A forma orienta uma ação ao interlocutor.']
 ],
 adm_redacao:[
  ['Clareza','Qualidade de apresentar a informação de forma compreensível.','Um ofício indica quem deve agir, qual ação é necessária e o prazo.','A clareza reduz interpretações equivocadas sem eliminar informação relevante.'],
  ['Concisão','Uso das palavras necessárias para comunicar a ideia sem excesso.','Um aviso substitui uma frase longa por uma instrução direta de mesmo sentido.','Ser conciso não significa omitir dados necessários à decisão.'],
  ['Impessoalidade','Foco no interesse institucional e tratamento sem favorecimento pessoal.','Um comunicado apresenta critérios iguais aos interessados.','A redação representa o órgão e evita preferências pessoais indevidas.'],
  ['Assunto','Indicação breve do tema da comunicação.','Um ofício sobre reparo identifica no assunto o pedido de manutenção.','O destinatário entende rapidamente a finalidade do documento.'],
  ['Destinatário','Pessoa, órgão ou unidade a quem a mensagem é dirigida.','A solicitação de manutenção é encaminhada ao setor responsável.','Identificar o destinatário evita encaminhamento impreciso.'],
  ['Revisão','Conferência do texto e dos dados antes do envio.','Antes de enviar, a equipe confirma datas, anexos e identificação.','A conferência permite corrigir inconsistências e evitar retrabalho.']
 ],
 adm_atendimento:[
  ['Escuta ativa','Atenção à demanda, com espaço para esclarecer o que a pessoa precisa.','Uma usuária explica que não conseguiu localizar um formulário.','Ouvir e confirmar a demanda orienta uma resposta útil.'],
  ['Linguagem clara','Comunicação compreensível, com explicação de termos quando necessário.','A atendente explica uma etapa sem usar siglas desconhecidas.','Uma resposta clara permite que a pessoa saiba qual será o próximo passo.'],
  ['Acessibilidade','Condições para que pessoas com diferentes necessidades possam usar o serviço.','Um serviço oferece orientação compatível com as necessidades de uma pessoa com deficiência.','A adaptação busca remover barreiras de acesso e comunicação.'],
  ['Encaminhamento','Direcionamento da demanda à unidade competente, com informação ao usuário.','A dúvida depende de análise de outro setor.','O atendente explica para onde a demanda será enviada e como acompanhar.'],
  ['Sigilo de dados','Proteção de informações pessoais conforme as regras aplicáveis.','Uma pessoa solicita dados de outra sem comprovar legitimidade.','A resposta deve respeitar as regras de acesso e proteção de dados.'],
  ['Registro da demanda','Anotação adequada para acompanhar uma solicitação.','Uma reclamação recebe protocolo e descrição objetiva.','O registro facilita o acompanhamento e a identificação do responsável.']
 ],
 adm_patrimonio:[
  ['Bens','Recursos com utilidade para a entidade; sua classificação e reconhecimento dependem das normas aplicáveis.','Uma unidade usa mesas, computadores e um veículo em suas atividades.','Esses itens podem integrar o patrimônio e exigem registro e controle adequados.'],
  ['Direitos','Valores ou benefícios que a entidade tem a receber, sujeitos à análise contábil.','Uma entidade possui um crédito reconhecido a receber de terceiro.','O crédito é um direito; não é dinheiro já recebido no caixa.'],
  ['Obrigações','Compromissos presentes cuja classificação depende das normas e das circunstâncias.','Uma compra de equipamento gerou uma dívida com fornecedor.','A dívida é uma obrigação e integra o passivo quando atende aos critérios aplicáveis.'],
  ['Inventário físico','Conferência dos bens encontrados e de suas informações de controle.','Uma equipe conta computadores e compara o resultado aos registros.','A comparação pode revelar divergências que precisam ser investigadas e corrigidas.',['Apostila de Gestão de Materiais · Enap','https://repositorio.enap.gov.br/bitstream/1/2259/1/Apostila_Gest%C3%A3o%20de%20Materiais.pdf#page=106'],['Prova FGV · FBN · questão 44 sobre estoques','https://conhecimento.fgv.br/sites/default/files/concursos/fbn_-_assistenteadministrativo_01_tarde_tipo01.pdf#page=9']],
  ['Tombamento','Procedimento de identificação e registro patrimonial de um bem, conforme regras do órgão.','Um equipamento recebido ganha identificação no sistema patrimonial.','O número ajuda a localizar e acompanhar o bem; não substitui a conferência de suas características.'],
  ['Depreciação','Distribuição sistemática do valor depreciável de um ativo ao longo de sua vida útil, quando aplicável.','Um equipamento sujeito a desgaste é usado durante vários exercícios.','A depreciação não é, por si só, pagamento em dinheiro nem significa necessariamente o preço de mercado.']
 ],
 adm_reunioes:[
  ['Objetivo','Resultado que a reunião pretende alcançar.','A equipe se reúne para decidir o cronograma de atendimento.','Um objetivo claro ajuda a selecionar participantes e assuntos relevantes.'],
  ['Pauta','Relação dos assuntos a tratar, preferencialmente com ordem e objetivo.','A convocação informa que serão tratados prazos e responsáveis.','A pauta permite preparação e ajuda a manter o foco.'],
  ['Convocação','Comunicação aos participantes com informações para a reunião.','O convite informa data, horário, local e pauta.','Dados completos ajudam as pessoas a se organizar.'],
  ['Ata','Registro do que ocorreu e das decisões pertinentes, conforme as regras da organização.','A ata anota uma decisão, seus responsáveis e o prazo combinado.','Ela registra o resultado; não deve atribuir decisões que não ocorreram.'],
  ['Encaminhamento','Ação definida após a discussão, com responsável e prazo quando cabível.','A equipe decide que Ana verificará a documentação até sexta-feira.','Uma decisão acompanhável identifica o que será feito e por quem.'],
  ['Acompanhamento','Verificação posterior do andamento dos compromissos assumidos.','Na semana seguinte, a equipe confere o status da documentação.','A reunião produz resultado quando os encaminhamentos são acompanhados.']
 ],
 adm_eventos:[
  ['Objetivo do evento','Resultado pretendido que orienta as decisões de planejamento.','Uma oficina quer orientar 30 servidores sobre um novo procedimento.','O objetivo ajuda a definir público, formato e recursos.'],
  ['Público','Grupo de pessoas para quem a atividade é organizada.','O convite informa que a oficina é destinada às equipes de atendimento.','Conhecer o público orienta linguagem, capacidade e acessibilidade.'],
  ['Cronograma','Distribuição de tarefas e marcos no tempo.','A equipe reserva o local antes de abrir inscrições.','Ordenar dependências reduz a chance de divulgar algo ainda não confirmado.'],
  ['Orçamento','Estimativa e acompanhamento dos recursos necessários.','A equipe prevê custos de material e estrutura antes de contratar.','A estimativa orienta o planejamento e deve seguir as regras aplicáveis.'],
  ['Plano de contingência','Providência prevista para lidar com ocorrência que prejudique o evento.','Uma apresentação tem arquivo de reserva caso a conexão falhe.','A alternativa deve ser viável e conhecida por quem vai executá-la.'],
  ['Avaliação','Coleta e análise de informações sobre o resultado da atividade.','Ao final, a equipe registra presença e pergunta se o objetivo foi compreendido.','Indicadores escolhidos de acordo com o objetivo ajudam a melhorar o próximo evento.']
 ],
 adm_latim:[
  ['Ad hoc','Expressão usada para indicar uma finalidade ou situação específica.','Uma comissão ad hoc é criada para examinar uma questão determinada.','A expressão indica o propósito específico; o alcance depende do contexto.'],
  ['In loco','Expressão que significa no próprio local.','Uma equipe realiza vistoria in loco em um prédio.','A verificação ocorre no lugar inspecionado.'],
  ['Caput','Parte inicial de um artigo, antes de seus parágrafos e incisos.','Uma questão pede o caput de um artigo de lei.','A referência é ao enunciado principal do artigo, não a qualquer parágrafo.'],
  ['Apud','Expressão que indica uma fonte citada por intermédio de outra.','Um texto reproduz uma autora encontrada em outra obra consultada.','A referência distingue a obra original da fonte efetivamente consultada.'],
  ['Ex officio','Expressão usada para indicar atuação ou condição decorrente do próprio cargo ou função, conforme o contexto.','Uma autoridade pratica um ato de ofício quando a norma permite ou determina.','O alcance não dispensa verificar a competência e a regra aplicável.'],
  ['Sine qua non','Expressão que indica condição indispensável em determinado contexto.','Uma inscrição válida é condição necessária para participar de uma etapa.','Condição necessária não significa, por si só, que seja suficiente para aprovação.']
 ],
 mat_geometria:[
  ['Perímetro','Soma das medidas dos lados de uma figura plana.','Um retângulo tem lados de 4 m e 3 m.','O perímetro é 4 + 3 + 4 + 3 = 14 m.'],
  ['Área do retângulo','Produto da base pela altura, usando unidades compatíveis.','Um retângulo mede 4 m por 3 m.','Sua área é 4 × 3 = 12 m².'],
  ['Área do triângulo','Metade do produto da base pela altura correspondente.','Um triângulo tem base 6 cm e altura 4 cm.','A área é 6 × 4 ÷ 2 = 12 cm².'],
  ['Coordenadas','Par ordenado que indica uma posição em um plano cartesiano.','O ponto (2, 3) tem primeira coordenada 2 e segunda 3.','A ordem importa: (2, 3) e (3, 2) são pontos distintos.'],
  ['Progressão aritmética','Sequência em que a diferença entre termos consecutivos é constante.','A sequência 2, 5, 8, 11 cresce de três em três.','A razão da progressão é 3.'],
  ['Progressão geométrica','Sequência em que cada termo após o primeiro resulta do anterior por um fator fixo.','A sequência 2, 4, 8, 16 dobra a cada passo.','A razão da progressão é 2.']
 ],
 mat_combinatoria:[
  ['Princípio multiplicativo','Em etapas independentes de escolha, multiplica-se a quantidade de opções de cada etapa.','Uma pessoa escolhe uma de 3 camisas e uma de 2 calças.','Há 3 × 2 = 6 combinações possíveis de uma camisa com uma calça.'],
  ['Ordem importa','Uma escolha ordenada distingue resultados com os mesmos elementos em posições diferentes.','Escolher presidente e vice entre Ana e Bia.','Ana presidente e Bia vice é diferente da distribuição inversa.'],
  ['Combinação','Escolha em que a ordem dos elementos escolhidos não cria novo grupo.','Selecionar duas pessoas de um grupo de três para uma comissão, sem cargos.','Há três pares possíveis; escolher Ana e Bia é o mesmo par que Bia e Ana.'],
  ['Matriz','Organização de elementos em linhas e colunas.','Uma tabela tem 2 linhas e 3 colunas.','A matriz tem ordem 2 × 3 e seis posições.'],
  ['Mínimo múltiplo comum','Menor múltiplo positivo comum a números inteiros positivos.','Dois sinais repetem a cada 4 e 6 minutos, começando juntos.','Voltam a coincidir após MMC(4, 6) = 12 minutos.'],
  ['Máximo divisor comum','Maior inteiro positivo que divide exatamente os números considerados.','Queremos formar grupos iguais usando 12 lápis e 18 borrachas, sem sobras.','O maior número de grupos possível é MDC(12, 18) = 6.']
 ],
 ingles_leitura:[
  ['Skimming','Leitura rápida para identificar ideia geral e organização do texto.','Antes de resolver as questões, observe título, início dos parágrafos e conclusão.','O objetivo inicial é compreender o tema; detalhes serão conferidos depois.'],
  ['Scanning','Busca direcionada por informação específica.','A questão pede uma data mencionada em um aviso.','Procure a data e leia o contexto para confirmar a resposta.'],
  ['Cognato','Palavra que apresenta semelhança de forma e sentido com outra língua, em determinado uso.','“Information” costuma corresponder a “informação”.','A semelhança ajuda, mas o significado deve ser confirmado pelo contexto.'],
  ['Falso cognato','Palavra semelhante a outra língua que pode ter sentido diferente.','“Actually” frequentemente significa “na verdade”.','Não traduza automaticamente por “atualmente”; examine o contexto.'],
  ['Referência pronominal','Relação entre pronome e o termo retomado no texto.','“The server stores data. It is secure.”','“It” pode retomar “the server”; a frase e o contexto confirmam a referência.'],
  ['Conectivo de contraste','Palavra ou expressão que introduz contraste entre ideias.','“The test passed; however, a review is still needed.”','“However” indica ressalva: ainda é necessária uma revisão.']
 ]
};
