# La Chocolate

Site responsivo de confeitaria em HTML, CSS, JavaScript e PHP 8.1 ou superior, sem dependências de pacotes.

## Executar

Na raiz do repositório:

```sh
bash dev.sh
```

O script usa o PHP do sistema ou o runtime local preparado neste ambiente em `/workspace/php-runtime`. A porta padrão é 8000; para alterá-la, use `PORT=8001 bash dev.sh`.

Abra o servidor em um navegador. O servidor PHP é necessário para preparar as mensagens do formulário; abrir o HTML diretamente não executa esse recurso. O servidor embutido é destinado a desenvolvimento. Em produção, use hospedagem com PHP e HTTPS.

## Recursos

- Vitrine com filtros de categoria e seleção de inspiração.
- Menu adaptado ao celular.
- Formulário com validação no navegador e no PHP.
- Mensagem copiável para envio manual ao Instagram oficial: https://www.instagram.com/_la_chocolat/.
- Não armazena dados pessoais nem envia pedidos automaticamente.

As ilustrações são arquivos SVG locais. As fontes Google são opcionais: há fontes alternativas locais. A vitrine apresenta inspirações, não um catálogo confirmado. Sabores, preços, endereço, entrega e disponibilidade devem ser confirmados com a empresa antes de serem publicados. Nenhum conteúdo do Instagram foi importado.

## Verificação

```sh
php -l pedido.php
node --check assets/app.js
```

Com o servidor ativo, envie um POST para `pedido.php` com `name` e `product` (por exemplo, `Presente doce`). A resposta deve ser JSON com `message`. Campos inválidos retornam 422 e outros métodos retornam 405.

## Hospedagem no Render

O repositório inclui `Dockerfile` com PHP e Apache e `render.yaml` com o plano gratuito. O contêiner publica apenas os arquivos do site, sem expor o Git, a documentação ou scripts locais.

1. Entre em https://render.com com sua conta do GitHub.
2. Use **New → Blueprint** e conecte `niloou001/site-confeitaria`.
3. Confira o serviço `la-chocolate` no plano **Free** e conclua a criação.
4. Aguarde o deploy ficar **Live** e use o endereço HTTPS mostrado no painel.

Também é possível iniciar pelo link https://render.com/deploy?repo=https://github.com/niloou001/site-confeitaria.

A ativação depende da sua conta e das condições atuais do Render. O plano gratuito pode suspender o serviço durante inatividade; a primeira visita após essa pausa pode demorar. Nenhum domínio próprio é necessário. Não selecione um plano pago para seguir estas instruções.

Para testar o contêiner localmente:

```sh
docker build -t la-chocolate .
docker run --rm -p 8000:80 la-chocolate
```
