const InfographicKit = (() => {
/* Mapas autorais de matérias comuns, com exemplos resolvidos e fontes identificadas. */
const MAPA_GRUPO=(key,title,icon,color,summary,facts,detail,visual=null)=>({key,title,icon,color,summary,facts,detail,visual});
const MAPA_AVISO=(kind,title,text)=>({kind,title,text});
const PORT_SOURCES=[['Cartilha de redação · Inep','https://download.inep.gov.br/publicacoes/institucionais/avaliacoes_e_exames_da_educacao_basica/cartilha_encceja_2025_redacao_fundamental.pdf'],['Comunicação oficial · Governo Federal','https://www.gov.br/pt-br/servicos/consultar-o-manual-de-redacao-da-presidencia-da-republica']];
const MATH_SOURCES=[['Material de probabilidade · OBMEP','https://portaldaobmep.impa.br/index.php/modulo/ver?a=1&modulo=46'],['Prova de Natal 2023 · FUNCERN','https://funcern.br/documents/968/CCMN_07__NS_ASSISTENTE_LEGISLATIVO_ALNS__ASSISTENTE_GERAL_GENERALISTA.pdf']];
const LOGIC_SOURCES=[['Lógica matemática · UTFPR','https://paginapessoal.utfpr.edu.br/lcpereira/esta-e-uma-pasta/ma71e/Semana5_LogicaMatematica.pdf'],['Prova de Natal 2023 · FUNCERN','https://funcern.br/documents/968/CCMN_07__NS_ASSISTENTE_LEGISLATIVO_ALNS__ASSISTENTE_GERAL_GENERALISTA.pdf']];
const purple='#8060a5',blue='#4e6eb5',green='#4c956e',orange='#c4833c',rose='#ad6685';

return {MAPA_GRUPO,MAPA_AVISO,PORT_SOURCES,MATH_SOURCES,LOGIC_SOURCES,purple,blue,green,orange,rose};
})();
