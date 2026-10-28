FROM php:8.4-apache

RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini" \
    && printf 'ServerTokens Prod\nServerSignature Off\nTraceEnable Off\n<Directory /var/www/html>\nOptions -Indexes\nAllowOverride None\n</Directory>\n' > /etc/apache2/conf-available/la-chocolate.conf \
    && a2enconf la-chocolate

WORKDIR /var/www/html
COPY index.html pedido.php ./
COPY assets/ ./assets/

EXPOSE 80
CMD ["apache2-foreground"]
