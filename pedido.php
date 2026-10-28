<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
function reply(int $status, array $data): never {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    reply(405, ['error' => 'Use o formulário para preparar sua mensagem.']);
}
function field(string $key, int $limit): string {
    $value = $_POST[$key] ?? '';
    if (!is_string($value) || strlen($value) > $limit) {
        reply(422, ['error' => 'Revise os campos do formulário.']);
    }
    return trim(strip_tags($value));
}
$name = field('name', 320);
$product = field('product', 150);
$date = field('date', 10);
$details = field('details', 4000);
$products = ['Bolo para celebrar', 'Docinhos para compartilhar', 'Presente doce', 'Quero outras sugestões'];
if ($name === '' || !in_array($product, $products, true)) {
    reply(422, ['error' => 'Informe seu nome e escolha uma inspiração.']);
}
$dateText = '';
if ($date !== '') {
    $parsed = DateTimeImmutable::createFromFormat('!Y-m-d', $date, new DateTimeZone('America/Sao_Paulo'));
    $today = new DateTimeImmutable('today', new DateTimeZone('America/Sao_Paulo'));
    if (!$parsed || $parsed->format('Y-m-d') !== $date || $parsed < $today) {
        reply(422, ['error' => 'Escolha uma data válida a partir de hoje.']);
    }
    $dateText = "\nData desejada: " . $parsed->format('d/m/Y');
}
$message = "Olá, La Chocolate! Meu nome é {$name}.\nGostaria de saber mais sobre: {$product}." . $dateText;
if ($details !== '') $message .= "\nSobre a ocasião: {$details}";
$message .= "\nPodem me informar as opções, os valores e a disponibilidade?";
reply(200, ['message' => $message]);
