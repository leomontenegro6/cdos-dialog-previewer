# cdos-dialog-previewer

Essa é uma extensão do VSCode que permite pré-visualizar scripts do jogo "Castlevania Dawn of Sorrow", desde que eles estejam no formato CSV exportado pela ferramenta [DSVania Editor](https://www.romhacking.net/utilities/1271/), criada por LagoLunatic.

Ela adiciona uma sidebar à esquerda, que quando ativa, exibe uma área que escuta eventos chamados quando um arquivo é editado no VSCode. Através desses eventos, desde que o usuário esteja editando scripts CSV exportados pelo DSVania Editor, será exibida uma prévia de como o diálogo apareceria ingame.

Embora ela surta algum efeito em qualquer script CSV dumpado pelo DSVania Editor, a ferramenta foi feita focando apenas no arquivo "Events.csv", que é o que contém todos os textos do modo história e é o mais volumoso. Os demais scripts em sua maioria podem ser traduzidos manualmente sem necessidade de pré-visualização.

# Como utilizar

Tendo os scripts em CSV do Dawn of Sorrow dumpados pelo DSVania Editor em mãos, baixe o arquivo "cdos-dialog-previewer-0.0.1.vsix" e [instale-o manualmente no seu VSCode](https://code.visualstudio.com/docs/editor/extension-marketplace#_install-from-a-vsix).

Se feito corretamente, aparecerá um ícone de uma folha de papel com uma letra "P" ao centro, que quando clicado, mostrará as prévias dos diálogos em tempo real. A prévia considera a posição do cursor de texto, tenta determinar o diálogo que o cursor está, e por fim pega seus caracteres para exibir na prévia.

![alt text](image.png)

Utilizando dessa prévia, é possível determinar quando um diálogo está próximo do limite da tela ou não, para poder ajustá-lo de acordo, sem precisar testar ingame.

# Como essa extensão foi desenvolvida?

Eu basicamente segui documentações como essa daqui que [ensina a criar uma extensão de "hello world" no VSCode](https://code.visualstudio.com/api/get-started/your-first-extension#developing-the-extension). Por essas instruções, consigo executar a extensão e debugá-la por breakpoints no processo.

Já na parte de compilar ela para arquivos .vsix, eu segui [essas instruções referentes a como publicar extensões](https://code.visualstudio.com/api/working-with-extensions/publishing-extension). Elas ensinam não só como compilar arquivos .vsix, como também como publicá-las no Marketplace do VSCode. No meu caso, por essa ser uma extensão bem específica e útil apenas para um caso de uso em comum, optei por distribuir o .vsix manualmente por aqui mesmo. Ao meu ver, seria mais válido estar no Marketplace se fosse uma solução mais genérica, mas como torná-la genérica daria um trabalhinho considerável, optei por fazer desta maneira.

# Disclaimer

Criei esta ferramenta para me auxiliar na revisão de uma tradução antiga desse jogo para português brasileiro, feita em 2008. Estou disponibilizando o código para quem se interessar. No momento, não pretendo refatorá-la para adicionar suporte ao restante dos textos do jogo (que não me precisou), nem aprimorá-la para tornar genérica ou algo do gênero. Mas sintam-se livres para utilizar do seu código à vontade, seja para adaptar para outros jogos ou para torná-la algo ainda maior do que atualmente é.