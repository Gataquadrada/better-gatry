# Ajustes na experiência Gatry.

-   [Instalação](#instalação);
    -   [Chrome Web Store](https://chrome.google.com/webstore/detail/nhhngompdakhdgelejdkkbianmnmbecl);
-   [Funcionalidades](#funcionalidades);

![Screenshot_5.png](/assets/screenshot_5.png)

<br>

# Instalação

## Visite a [Chrome Web Store](https://chrome.google.com/webstore/detail/nhhngompdakhdgelejdkkbianmnmbecl) e faça a instalação diretamente pelo seu navegador.

<br>
<br>

## Via script personalizado

**Com o plugin aprovado na [Chrome Web Store](https://chrome.google.com/webstore/detail/nhhngompdakhdgelejdkkbianmnmbecl), não mais irei prover atualizações via CDN.**

<br>

Utilize a URL abaixo em plugins de personalização. Como:

-   [Violentmonkey](https://violentmonkey.github.io) (indicação de [GigaChad](https://gatry.com/usuarios/detalhe/GigaChad));
-   Eu uso o [Custom Style Script](https://chrome.google.com/webstore/detail/custom-style-script/ecjfaoeopefafjpdgnfcjnhinpbldjij) (Windows) e [Userscripts ](https://apps.apple.com/us/app/userscripts/id1463298887) (Mac).

<br>

### CDN

`https://website-thumbnail-gataquadrada.vercel.app/public/main.min.js`

<br>

## Instalação (local)

Por [williamarcondes](https://github.com/williamarcondes/).

1. Baixe a pasta [bttg-manifest-v2](/bttg-manifest-v2) em sua máquina;
2. Acesse a url `chrome://extensions/`;
3. Clique em `Load unpacked`;
4. Selecione a pasta `bttg-manifest-v2`, em seu computador;
5. Pronto!

![Alt text](assets/how_install_chrome.png)

<br>
<br>

# Funcionalidades

## Dark mode

Basta clicar no Sol/Lua no topo da tela, para alternar.

![Screenshot_1.png](/assets/screenshot_1.png)

<br> 
<br>

## Botão de bloquear usuário

A lista de bloqueio é salva no seu navegador. Então, limpeza de cache (e outras ações de anonimato) irão reiniciar as configurações.

Ainda não decidi se vou oferecer uma forma de salvar permanente.

![Screenshot_2.png](/assets/screenshot_2.png)

<br> 
<br>

## Shadow block

Permite o bloqueio temporário de usuários. Para que você possa acessar o contexto, caso necessário.  
_Função desabilitada, por padrão._

![Screenshot_8.png](/assets/screenshot_8.png)

<br> 
<br>

## Lista de bloqueio

Visualize usuários bloqueados e desfaça bloqueios.

![Screenshot_3.png](/assets/screenshot_3.png)

<br>
<br>

## Pré-visualizar links

_Depende de um serviço de terceiros..._

![Screenshot_6.png](/assets/screenshot_6.png)

<br>
<br>

## Pré-visualizar avatar

Chega de aguardar o cache do site, para saber se a sua foto estará enquadrada!

![Screenshot_7.png](/assets/screenshot_7.png)

<br>
<br>

## Backup

Faça backup das suas configurações e transfira entre computadores.

![Screenshot_4.png](/assets/screenshot_4.png)

<br>
<br>

# A fazer

-   ⬜ Download de posts e conversas.
-   🟥 Modo `**texto rico**` => **texto rico**.
-   ✅ Filtrar usuários bloqueados antes de carregar comentários.
-   ✅ Filtrar descontos duplicados, ao rolar a página.
-   ✅ Filtrar posts duplicados, ao rolar a página.
-   ✅ Salvar preferências de forma (mais) permanente.
-   ⬜ Adicionar destaque para termos importantes.
-   ✅ Adicionar selo de verificação.
-   🟥 Perguntar ao Mr.G se posso adicionar "Deslikes" e lista de usuários que deram "Like".
-   ✅ Carregar imagens em comentários.
-   ✅ Pré-visualizar links em comentários.
-   ⬜ Botão de compartilhar no WhatsApp/Email/Twitter/Facebook em ofertas.
-   🟥 Botão de compartilhar no WhatsApp/Email/Twitter/Facebook em posts livres.
-   🟥 Seletor de GIFs em comentários.
-   🟥 Upload de imagens para IMGUR em comentários.
-   ⬜ Upload de screenshot para IMGUR em comentários.
-   🔄️ Achar a minha [LTT Screwdriver](https://www.lttstore.com/products/screwdriver).
-   ✅ Criar um CDN/API via [Vercel](https://website-thumbnail-gataquadrada.vercel.app/public/main.min.js).

<br>

# Changelog

0.0.5

-   Fixed (yet another) bug with comments lightbox.
-   Fixed search button.
-   Added option to just momentarily close comments from blocked users.
-   Fixed notifications counter.
-   [Chrome Web Store Plugin](https://chrome.google.com/webstore/detail/nhhngompdakhdgelejdkkbianmnmbecl).

0.0.4

-   Link preview.

0.0.3

-   Code cleaning (more like refactoring galore).
-   Verified badges.
-   Bugfixes.
-   Badges will come from the latest branch.
-   Fixed a bug with duplicated posts check.

0.0.2

-   ???

0.0.1

-   Introduction.
