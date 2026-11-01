# Professor — uma professora virtual em cada tela

Use o botão com ícone de som e o texto **Professor**. Ele abre a explicação do assunto atual e começa a narrar após seu clique. A voz é **pt-BR-ThalitaMultilingualNeural**, voz feminina da Microsoft, gerada por IA. Não é uma gravação de uma professora humana.

## Onde encontrar

- Nas dez telas: Concursos, detalhe do concurso, matéria, história, mapa ilustrado, infográficos, Atividades, Revisão, Estratégia e Fontes.
- Em todas as 1.224 questões distintas da aba Atividades: o botão explica o conceito ou cálculo daquela questão. Definição e aplicação do mesmo conceito compartilham uma explicação completa, com exemplo, raciocínio e pergunta para tentar lembrar.
- Em cada um dos 56 infográficos e em seus blocos: o botão do bloco começa naquele trecho.
- Nas 1.230 cenas, nos 41 mapas ilustrados, nos exemplos resolvidos e nos três laboratórios. As cenas que usam o mesmo conteúdo podem compartilhar gravação e abrir no trecho correspondente.
- Nos cartões de concursos e nos conteúdos guardados para revisão.
- Em listas pessoais: orientação de uso e fundamentos relacionados já disponíveis. O roteiro não inventa uma aula específica para qualquer título digitado e não envia o cadastro ao serviço de voz.

## Como estudar com ela

A professora apresenta uma ideia, explica o desenho ou exemplo e apresenta o significado dos termos. Depois, pede uma explicação com suas palavras. O áudio **para antes da resposta**; toque em **Conferir** quando quiser. A opção de continuar a explicação respeita essas pausas.

Você pode escolher qualquer trecho, repetir, pausar, retomar e ajustar a velocidade. O texto acompanha a parte narrada. A voz para quando você fecha o painel ou muda de assunto. Sair da aba e abrir a impressão pausam o áudio. A impressão não inclui os controles da professora.

Use **−** no cabeçalho para recolher o painel e observar o desenho enquanto a voz continua. **＋** traz o texto e as opções de volta.

**Guardar este assunto para revisar** usa a mesma lista de revisão do aplicativo. As datas e os atalhos permanecem sob seu controle.

## O que a pesquisa sustenta

Tentar reconstruir o conteúdo, conferir a resposta e retomar o estudo em outros momentos são práticas apoiadas por estudos de recuperação ativa e espaçamento. Os resultados variam com tarefa, conhecimento prévio e condições de estudo. A voz, por si só, não garante memorização; o aplicativo não foi submetido a um ensaio de eficácia.

Fontes: [Karpicke e Blunt, 2011](https://pubmed.ncbi.nlm.nih.gov/21252317/), [Cepeda e colaboradores, 2008](https://pubmed.ncbi.nlm.nih.gov/19076480/) e as referências já apresentadas na aba Fontes.

## Áudio incluído e funcionamento offline

O pacote contém o HTML e a pasta **dist/audio/professor/**. Mantenha essa pasta junto de **dist/index.html**. Os MP3 são reproduzidos localmente; não há chave de API no aplicativo e nenhuma solicitação ao serviço da Microsoft durante a reprodução desses arquivos.

As explicações sem gravação Thalita estão disponíveis em texto. O usuário escolheu manter essa voz; nenhuma voz substituta é gerada automaticamente. Consulte **roteiros-thalita-pendentes.txt** para ler e **roteiros-thalita-pendentes.json** para a contagem atualizada, os identificadores e os trechos que ligam cada aula ao áudio.

Copiar somente o HTML não copia os áudios. Se um arquivo estiver ausente, a explicação escrita continua disponível. O painel permite escolher uma voz em português disponível no navegador e mostra o nome real dessa voz. A disponibilidade de vozes do navegador varia por dispositivo; uma voz alternativa não é apresentada como Thalita.

O botão funciona dentro do aplicativo. SVGs e PDFs exportados continuam sendo documentos estáticos, sem reprodução embutida.

## Reconstruir os roteiros e os áudios

O uso normal não precisa de Python, Node ou internet. Para editar o conteúdo e gerar novas gravações, use Python 3.11 ou posterior e Node:

```powershell
python -m pip install -r requirements-voz.txt
node exportar-professor.cjs
python gerar-audios-professor.py --jobs 2
node verificar.cjs --audio-completo --export --build
```

Alternativa de instalação: `uv pip install --target output/tts-runtime -r requirements-voz.txt`.

O gerador envia somente os roteiros didáticos exportados ao serviço de síntese de voz. Reutiliza arquivos já verificados, tenta novamente falhas transitórias e só registra áudios completos no manifesto. `--limit 2` gera uma amostra; `--jobs` controla a concorrência. A geração pode demorar, porque são centenas de explicações. Os metadados de palavras delimitam cada trecho, permitindo saltar e parar antes da resposta.

Referências técnicas: [catálogo de vozes da Microsoft](https://learn.microsoft.com/pt-br/azure/ai-services/speech-service/language-support), [edge-tts](https://github.com/rany2/edge-tts) e [vozes disponíveis no navegador](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices).


Para atualizar uma gravação isolada, use `--only concurso/cgu-dev-2026` (ou outro ID de aula). `--cache-only` prepara a gravação sem alterar o manifesto de reprodução. `--manifest-only` reúne as gravações já em cache **sem fazer requisições de voz**. Depois de alterar roteiros ou o manifesto, execute `node preparar-pendencias-professor.cjs`. Enquanto houver a lista de pendências autorizada, verifique com `node verificar.cjs --audio-pendente-autorizado --build`. Roteiros que tratam de pontuação usam as regras documentadas de `pontuacao.js`.
