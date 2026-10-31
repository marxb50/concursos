# Etapa 1 — visual global e base de prioridades

Concluída e publicada em 29/10/2026: [abrir o site](https://marxb50.github.io/concursos/?versao=central-874c9fd#concursos).

Escopo autorizado por “próximo passo”, após a pesquisa: implementar o primeiro item da sequência proposta.

## Implementação

- Tema de quadrinhos e painel tecnológico nas nove telas: azul-petróleo, circuitos, molduras recortadas, contornos, títulos fortes e controles em verde/coral.
- Identidade aplicada a menus, cartões, formulários, revisão, laboratórios, infográficos, mapas, janela de figuras e painel da professora.
- Mapas SVG com molduras recortadas; exportação e impressão mantêm fundo claro e legibilidade.
- Fontes Atkinson Hyperlegible e Barlow Condensed incorporadas, com licenças OFL no próprio arquivo de fontes. A interface não consulta um serviço de fontes para abrir.
- Layout de celular com navegação organizada, filtros de concursos deslizáveis e entrada mais compacta.
- Pesos, descontos e mínimos corrigidos para ABDI 2026, CGU 2026, Câmara dos Deputados 2026 e os dois cargos de Nísia Floresta.
- Matérias ordenadas pela participação nos pontos da objetiva quando a distribuição por disciplina está disponível. Empates recebem a mesma posição.
- Distribuições por bloco apresentadas como blocos, sem atribuir quantidade desconhecida a uma matéria.
- Frequências históricas apresentadas em ordem decrescente dentro de cada matéria, com empates e contexto da amostra.
- Roteiros da professora atualizados para acompanhar as regras corrigidas e a orientação de estratégia.

Os documentos oficiais e a comparação que motivou as correções estão na seção 6 de [PESQUISA_ATIVIDADES_GAME.md](PESQUISA_ATIVIDADES_GAME.md). `pontuacao.js` registra fonte e data das regras, `central.css` concentra o tema e `fontes-central.css` incorpora as fontes.

## Verificações

- Conteúdo: 41 histórias, 208 cenas, 41 mapas, 56 infográficos, 15 concursos e 390 questões classificadas.
- Pesos: totais de 25, 90, 120, 180 e 260 pontos nas respectivas provas; descontos distintos por bloco; pesos decimais; empates; ausência de dados preservada.
- Navegador: nove telas em seis larguras, 54 combinações, com rotação, áudio e ausência de transbordamento horizontal.
- Conteúdo no celular: 15 concursos + 85 matérias + 56 infográficos, 156 páginas, sem erros JavaScript, transbordamento ou baixo contraste detectado no texto HTML pelo verificador do projeto.
- Revisão visual e funcional: 18 cenários em celular/computador, pontuação, ordenação histórica e papel claro na impressão.
- Regressões de busca, rotas, filtros, retomada, três laboratórios, revisão, concursos personalizados e impressão.
- Áudio real: pausa, retomada, repetição, velocidade, recuperação ativa, troca de contexto, falha de arquivo e funcionamento dos controles no celular.

A verificação de contraste automatizada considera as superfícies de fundo e os textos HTML; não é uma auditoria integral de acessibilidade. As figuras foram inspecionadas visualmente e 165 cenas gerais passaram pela verificação de limites dos rótulos.

## Continuidade

O passo seguinte é a aba **Atividades**, o mecanismo de missão e os jogos representativos de texto, cálculo, lógica, SQL e casos. Depois virá a expansão com revisão de conteúdo para todas as matérias e tópicos. Esta etapa entrega o visual e a base de prioridades; ainda não adiciona os jogos.

O backup anterior ao tema está em `output/backup/antes-central-missoes.zip`. O site continua usando armazenamento local do navegador para posições e revisões.


## Publicação verificada

Commit `874c9fd4ba18692cf1cfc09497c9bf0061850e69`; [execução do GitHub Pages concluída](https://github.com/marxb50/concursos/actions/runs/40967447705). HTML público idêntico ao build local, resposta HTTP 200 e integridade dos seis áudios atualizados confirmada. As 54 combinações responsivas também passaram no endereço público, assim como reprodução e busca de trechos dos áudios corrigidos.

525 explicações cobertas por 431 gravações Thalita. A faixa de Estratégia reaproveita os 42 trechos inalterados e substitui o único parágrafo corrigido, com nova marcação temporal e integridade verificadas.

Evidências locais: `output/etapa-1-verificacao.json`, `output/etapa-1-online.json`, `output/central-online-responsivo.json` e `output/central-online-audios.json`.
