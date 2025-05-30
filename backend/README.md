<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">
  A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
  <a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
  <a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
  <a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

0Auth2 fica apenas para uma lista de email convidados, tem que arrumar isso futuramente

---

## 📖 Descrição

Este projeto utiliza o framework **NestJS** para construir uma API eficiente e escalável para o sistema **SpeakRoom**.

---

## 🔒 Segurança da API

A API foi projetada com foco em segurança, implementando diversas medidas para proteger os dados e as operações realizadas. Abaixo estão os principais pontos:

| Recurso                          | Objetivo                                                                 |
|----------------------------------|--------------------------------------------------------------------------|
| **Middleware de Rate Limiting**  | Prevenir ataques de força bruta e limitar o número de requisições por IP.|
| **Middleware de Segurança com Helmet** | Proteger a API contra vulnerabilidades comuns, como ataques de clickjacking, XSS e injeção de conteúdo. |
| **Middleware de CORS**           | Controlar o acesso à API por origens específicas.                        |
| **Autenticação JWT**             | Garantir que apenas usuários autenticados possam acessar recursos protegidos. |
| **Hashing de Senhas**            | Proteger as senhas dos usuários armazenadas no banco de dados.           |
| **Proteção contra Ataques de Força Bruta** | Bloquear contas após múltiplas tentativas de login falhas.            |
| **Validação de Dados**           | Garantir que apenas dados válidos sejam processados pela API.            |

---

## 🔑 Login, Recuperação e Reset de Senha

O sistema implementa um fluxo seguro para autenticação e recuperação de contas, seguindo boas práticas de segurança. Abaixo estão os principais pontos do processo:

### 1. Login Seguro

- **Hashing de Senhas**: As senhas dos usuários são armazenadas de forma segura utilizando algoritmos de hashing robustos.
- **Bloqueio de Conta**: Após múltiplas tentativas de login falhas, a conta do usuário é temporariamente bloqueada para evitar ataques de força bruta.
- **Tokens JWT**: Após a autenticação bem-sucedida, um token JWT é gerado e enviado ao cliente nos cookies para autenticação em futuras requisições.

### 2. Recuperação de Senha

- **Validação de Identidade**: O usuário deve fornecer um e-mail válido associado à conta para iniciar o processo de recuperação.
- **Token Aleatório**: Um token de 6 dígitos de curta duração (1 minuto) é gerado e enviado ao e-mail do usuário. Após confirmação, gera o token de reset.
- **Token de Reset**: Um token JWT de curta duração é gerado, permitindo que o usuário redefina sua senha.

### 3. Reset de Senha

- **Token de Reset**: O token é validado antes de permitir que o usuário redefina sua senha.
- **Regras de Senha**: A nova senha deve atender a critérios de complexidade para garantir maior segurança.
- **Expiração do Token**: O token de reset expira após um período curto (ex.: 10 minutos) para evitar uso indevido.

---

## 📂 Envio de Arquivos e Segurança

O sistema implementa um fluxo seguro para o envio de arquivos, garantindo a integridade e a proteção contra arquivos maliciosos. Abaixo estão os principais pontos do processo:

### 1. Verificação de Segurança com VirusTotal

Antes de realizar o upload do arquivo para o Cloudinary, o sistema utiliza a API do **VirusTotal** para verificar se o arquivo está livre de vírus ou outras ameaças.

### 2. Limitação de Tamanho do Arquivo

Para evitar problemas de desempenho e abusos, o sistema impõe um limite de tamanho máximo para os arquivos enviados: **4MB**.

### 3. Upload Seguro no Cloudinary

Após a verificação de segurança, o arquivo é enviado para o **Cloudinary**, onde:

- Apenas formatos permitidos são aceitos (`jpg`, `png`, `pdf`, `ppt`, `pptx`).
- Transformações são aplicadas para limitar a resolução máxima do arquivo a **800x800 pixels**, garantindo consistência e economia de espaço.

---

## 🛠️ Tecnologias Utilizadas

- **NestJS**: Framework para construção de APIs escaláveis.
- **Cloudinary**: Serviço de armazenamento e manipulação de arquivos.
- **JWT**: Autenticação baseada em tokens.
- **TypeORM**: ORM para interação com o banco de dados.
- **Helmet**: Middleware para segurança HTTP.
- **Rate Limiting**: Controle de requisições para evitar abusos.

--- 

## 🚀 Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-repositorio.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente no arquivo `.env`.
4. Inicie o servidor:
   ```bash
   npm run start
   ```

--- 

## 📄 Licença

Este projeto está licenciado sob a licença **MIT**.
