## Iniciando o ambiente de desenvolvimento com Docker

Para iniciar o ambiente de desenvolvimento utilizando Docker, siga os passos abaixo:

1. Certifique-se de que o Docker e o Docker Compose estão instalados em sua máquina.
2. No diretório raiz do projeto, execute o comando:

   ```bash
   docker-compose up --build
   ```

3. O serviço frontend estará disponível em [http://localhost:3001](http://localhost:3001) e o backend em [http://localhost:3000](http://localhost:3000).

4. Para parar os containers, utilize o comando:

   ```bash
   docker-compose down
   ```

Certifique-se de que as variáveis de ambiente necessárias estão configuradas nos arquivos `.env` correspondentes.
