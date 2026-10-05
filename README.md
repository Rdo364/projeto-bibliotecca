API de Gestão de Biblioteca 

Equipe: Gabriel Carriel e João Lucas
 Sobre o Projeto

Bibliotecas perdem muito tempo e materiais tentando controlar retiradas de forma manual. Esta API foi desenvolvida para ajudar bibliotecários a gerenciar o acervo automaticamente, controlando prazos, histórico de leitores e evitando extravios.

O sistema gerencia quatro entidades principais: Livros, Exemplares, Leitores e Empréstimos, mantendo os dados em memória.
 Regras de Negócio

    Limite de empréstimos: Cada leitor pode pegar no máximo 3 livros simultaneamente.

    Bloqueio por atraso: Se o leitor estiver com algum livro vencido, seu cadastro é bloqueado automaticamente no momento de um novo empréstimo. Ele fica impedido de retirar novos títulos até regularizar a situação.

    Renovação: Só é permitida a renovação (+7 dias) de empréstimos ativos e que ainda não estejam vencidos.

 Tecnologias Utilizadas

    Node.js

    Express.js

    Banco de dados em memória (Arrays locais)

 Como Executar

    Certifique-se de ter o Node.js instalado.

    Crie um arquivo index.js (ou app.js) e cole o código da API.

    Inicialize o projeto e instale o Express:
    Bash

npm init -y
npm install express

Inicie o servidor:
Bash

    node index.js

    A API estará disponível em: http://localhost:3000

 Documentação dos Endpoints
 Livros e Exemplares

    GET / - Rota de teste da API.

    GET /livros - Lista todos os livros cadastrados.

    POST /livros - Cadastra um novo livro.

        Body: { "titulo": "1984", "autor": "George Orwell", "isbn": "9780451524935" }

    PUT /livros/:id - Atualiza os dados de um livro existente.

    DELETE /livros/:id - Remove um livro do catálogo.

    POST /exemplares - Vincula um novo exemplar físico a um livro existente.

        Body: { "livroId": 1, "codigoPatrimonio": "LIB-001" }

 Leitores

    GET /leitores - Lista todos os leitores.

    POST /leitores - Cadastra um novo leitor.

        Body: { "nome": "João", "email": "joao@email.com" }

    PUT /leitores/:id - Atualiza os dados de um leitor.

    DELETE /leitores/:id - Remove um leitor do sistema.

    GET /leitores/:id/historico - Consulta o histórico completo de empréstimos e o status de bloqueio de um leitor específico.

 Empréstimos

    POST /emprestimos - Registra o empréstimo de um exemplar para um leitor (prazo padrão de 7 dias). Valida regras de bloqueio e limite máximo.

        Body: { "leitorId": 1, "exemplarId": 1 }

    POST /emprestimos/:id/renovacao - Renova o prazo de devolução de um empréstimo ativo por mais 7 dias (se não estiver atrasado).