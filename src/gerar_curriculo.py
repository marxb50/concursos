"""Compila as fontes de atividades. Não cria questões por permutação de números."""
import json
import hashlib
from pathlib import Path
from curriculo_atividades import GROUPS

ROOT = Path(__file__).resolve().parent

def safe_json(value):
    # Seguro dentro de script inline, inclusive </script>, <!-- e U+2028/U+2029.
    return json.dumps(value, ensure_ascii=False, separators=(',', ':')).replace('<', '\\u003c').replace('\u2028', '\\u2028').replace('\u2029', '\\u2029')

def compile_bank():
    bank = json.loads((ROOT / 'atividades-legado.json').read_text(encoding='utf-8'))
    # Educação própria de cada instituição: não encaminhar questões de IF à UFRN.
    education = GROUPS.pop('educacao')
    ufrn = education['cards'][:5] + [
        ['CONSUNI','Conselho Universitário da UFRN, órgão superior previsto em seu estatuto.','Uma questão pede reconhecer a sigla do Conselho Universitário da UFRN. Qual órgão deve ser identificado?','O CONSUNI integra a estrutura colegiada superior; suas competências devem ser conferidas no estatuto.'],
        ['CONSEPE','Conselho de Ensino, Pesquisa e Extensão da UFRN.','O enunciado se refere ao colegiado superior ligado às dimensões acadêmicas de ensino, pesquisa e extensão. Qual sigla o identifica?','A sigla explicita as três dimensões acadêmicas; não se confunde com conselho de administração.'],
        ['CONSAD','Conselho de Administração da UFRN.','Uma questão exige identificar o Conselho de Administração na estrutura da universidade. Qual órgão corresponde?','O nome do colegiado permite distingui-lo do CONSEPE; atribuições concretas dependem do estatuto.'],
        ['CONCURA','Conselho de Curadores da UFRN.','Na estrutura colegiada da UFRN, qual sigla corresponde ao Conselho de Curadores?','O Conselho de Curadores integra os órgãos previstos na estrutura institucional; não é a Reitoria.'],
        ['Reitoria','Órgão executivo central da UFRN previsto em sua estrutura.','A questão diferencia a condução executiva central dos colegiados superiores. Qual órgão se relaciona à primeira?','A Reitoria exerce funções executivas nos termos das normas institucionais; a universidade mantém órgãos colegiados com competências próprias.']
    ]
    ifrn = education['cards'][5:] + [
        ['Rede Federal','Rede de Educação Profissional, Científica e Tecnológica instituída pela Lei 11.892.','O IFRN é situado no conjunto de instituições federais de educação profissional e tecnológica. Qual rede é referida?','A Rede Federal inclui diferentes tipos de instituições previstos legalmente, não apenas um campus.'],
        ['Oferta técnica mínima','Reserva mínima de 50% das vagas dos Institutos Federais para a finalidade do art. 7º, I, conforme art. 8º da Lei 11.892.','A questão pede o percentual mínimo legal para educação profissional técnica de nível médio na distribuição indicada pela lei. Qual regra corresponde?','O mínimo é de 50% das vagas no desenvolvimento da ação acadêmica de cada exercício, segundo o art. 8º.'],
        ['Formação docente mínima','Reserva mínima de 20% das vagas para a finalidade do art. 7º, VI, b, conforme art. 8º da Lei 11.892.','O planejamento examina o mínimo legal para licenciaturas e programas especiais de formação pedagógica indicados na lei. Qual regra é aplicável?','O mínimo legal é de 20%, observadas as condições da Lei 11.892; não se confunde com os 50% da oferta técnica.'],
        ['Multicampi','Organização institucional distribuída em diferentes campi.','O IFRN possui unidades em diferentes localidades sob a mesma instituição. Qual característica organizacional aparece?','Vários campi não significam várias instituições juridicamente independentes.'],
        ['Autarquia federal','Natureza jurídica dos Institutos Federais prevista na Lei 11.892.','A questão diferencia o IFRN de empresa privada e de serviço social autônomo. Qual natureza jurídica é pertinente?','Os Institutos Federais têm natureza jurídica de autarquia e as autonomias previstas na lei.']
    ]
    for key,title,cards,url in [('educacao-ufrn','UFRN: autonomia e estrutura',ufrn,'https://www.ufrn.br/resources/documentos/estatuto/Estatuto-UFRN.pdf'),('educacao-ifrn','IFRN e Rede Federal',ifrn,'https://www2.camara.leg.br/legin/fed/lei/2008/lei-11892-29-dezembro-2008-585085-normaatualizada-pl.html')]:
        GROUPS[key]=dict(title=title,journey='const_fundamentos',cards=cards,source=url)
    for key, g in GROUPS.items():
        questions = []
        for i, (term, definition, case, why) in enumerate(g['cards']):
            # Distratores próximos dentro da mesma disciplina; nunca opção genérica de enchimento.
            wrong = [g['cards'][(i + d) % len(g['cards'])][0] for d in [1, -1, 2, -2]]
            for mode in ['conceito', 'caso']:
                qid = f'{key}-{i+1:02}-{mode}'
                position = int(hashlib.sha256(qid.encode()).hexdigest()[:8], 16) % 5
                choices = wrong[:]
                choices.insert(position, term)
                q = dict(id=qid, type='connect' if mode == 'conceito' else 'choice',
                         prompt='Qual conceito corresponde à definição?' if mode == 'conceito' else case,
                         options=choices, answer=position,
                         explain=f'{term}: {definition} {why}',
                         hint='Procure a característica decisiva e compare conceitos vizinhos antes de escolher.',
                         topic=term, family=key, source=g['source'], level=mode,
                         teaching=dict(term=term, definition=definition, case=case, why=why),
                         ref=dict(journey=g['journey'], index=0))
                if mode == 'conceito':
                    q['passage'] = definition
                if key=='especial' and i>=8:
                    q['source'] = ('https://www2.camara.leg.br/legin/fed/lei/1990/lei-8069-13-julho-1990-372211-normaatualizada-pl.html' if i<12 else 'https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11340.htm' if i<17 else 'https://www.planalto.gov.br/ccivil_03/leis/2003/l10.741.htm' if i==17 else 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm' if i==18 else 'https://www.gov.br/mulheres/pt-br/ligue180')
                if key=='transparencia' and i>=6:q['source']='https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm'
                if key=='penal' and i==19:q['source']='https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm'
                if key=='afo':q['source']='https://www.gov.br/tesouronacional/pt-br/contabilidade-e-custos/manuais/manual-de-contabilidade-aplicada-ao-setor-publico-mcasp-1'
                questions.append(q)
        bank.append(dict(id=key, title=g['title'], journey=g['journey'], journeys=[g['journey']],
                         type='casos', kind='author', story='Reconheça os fundamentos e aplique em situações comentadas.', questions=questions))
    for m in bank:
        for q in m['questions']:
            q['family'] = m['id']
            q['canonical'] = m['id'] + '/' + q['id']
            q.setdefault('topic', m['title'])
            q.setdefault('source', '')
            q['revision'] = hashlib.sha256(safe_json({k:v for k,v in q.items() if k != 'revision'}).encode()).hexdigest()[:12]
    assert len({q['canonical'] for m in bank for q in m['questions']}) == sum(len(m['questions']) for m in bank)
    (ROOT / 'atividades-dados.js').write_text('/* Gerado de curriculo_atividades.py e atividades-legado.json. */\nconst ActivityBank = ' + safe_json(bank) + ';\n', encoding='utf-8')
    print(f'{len(bank)} grupos; {sum(len(m["questions"]) for m in bank)} questões canônicas.')

if __name__ == '__main__':
    compile_bank()
