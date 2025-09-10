# Levelify API

## "Arise!" - Transforme suas Tarefas em Missões Épicas

**Levelify** é um projeto de back-end para uma lista de tarefas (To-Do list) com elementos de gamificação, fortemente inspirado no universo de *Solo Leveling*. A ideia central é permitir que os usuários transformem suas rotinas e hábitos em "missões" e "metas", ganhando recompensas e "subindo de nível" na vida real ao completá-las.

Mais do que um simples aplicativo, este projeto é um campo de estudo e experimentação para a construção de software robusto, escalável e de fácil manutenção, aplicando princípios de **Clean Architecture** e **Domain-Driven Design (DDD)**.

---

## 🏛️ Arquitetura e Conceitos Aplicados

A arquitetura deste projeto é a sua característica mais importante. Ela foi desenhada para ser um exemplo prático de como aplicar teorias de design de software em um contexto real.

### Clean Architecture

Seguimos a regra principal da Clean Architecture: **as dependências apontam para dentro**. As camadas externas conhecem as internas, mas o núcleo do negócio não sabe nada sobre o mundo exterior (frameworks, bancos de dados, etc.).

-   **Domain Layer (`src/domain/*/enterprise`)**: O coração da aplicação. Contém as entidades, os objetos de valor e as regras de negócio mais puras. Não depende de nada externo. Aqui residem as entidades como `Quest`, `Goal` e `Player`.

-   **Application Layer (`src/domain/*/application`)**: Orquestra o fluxo de dados e executa a lógica de negócio. Contém os **Use Cases** (casos de uso), que representam todas as funcionalidades que o sistema pode executar (ex: `CreateQuestUseCase`, `CheckGoalUseCase`). Esta camada depende apenas do Domínio.

-   **Infrastructure Layer (`src/infra` - *ainda não implementada*) e `test`**: A camada mais externa. Responsável por implementações concretas como controladores de API, repositórios de banco de dados e outras ferramentas. Nos testes, os repositórios em memória (`test/repositories`) servem como uma implementação dessa camada para fins de teste.

### Domain-Driven Design (DDD)

Utilizamos vários padrões táticos do DDD para modelar o domínio de forma rica e expressiva.

-   **Bounded Contexts (Contextos Delimitados)**: O código é dividido em domínios de negócio claros. Atualmente, temos dois contextos principais:
    -   `habbitTracker`: O domínio principal, que lida com toda a lógica de missões, metas, jogadores e recompensas.
    -   `notification`: Um domínio separado, responsável exclusivamente pelo envio e gerenciamento de notificações.

-   **Entidades, Value Objects e Aggregates**:
    -   **Entity (`core/entities/entity.ts`)**: Objetos com identidade única e ciclo de vida (ex: `Quest`, `Goal`).
    -   **Value Object (`domain/habbitTracker/enterprise/entities/value-objects/slug.ts`)**: Objetos cujo valor os define, sem uma identidade única (ex: `Slug`).
    -   **Aggregate Root (`core/entities/aggregate-root.ts`)**: Uma entidade especial que serve como ponto de entrada para um conjunto de entidades relacionadas (um agregado). O `Quest` é um Aggregate Root, garantindo a consistência de suas `Goals` e `Rewards`.

-   **Repositories (`domain/*/application/repositories`)**: Interfaces que definem como os agregados são persistidos e recuperados, abstraindo completamente a camada de domínio do banco de dados. As implementações concretas (ex: `InMemoryQuestsRepository`) ficam na camada de infraestrutura (ou nos testes).

-   **Domain Events (`core/events`)**: Um dos conceitos mais poderosos aplicados aqui. Permitem que diferentes partes do sistema (especialmente diferentes Bounded Contexts) reajam a eventos de negócio de forma desacoplada.
    -   **Exemplo Prático**: Quando uma `Quest` se torna prioritária (ex: falta menos de 24h para o vencimento), ela dispara um `PriorityQuestEvent`. O subscriber `OnPriorityQuest` (do domínio de notificação) ouve esse evento e aciona o `SendNotificationUseCase` para enviar uma notificação ao usuário. Isso tudo acontece sem que o domínio `habbitTracker` precise saber qualquer coisa sobre o domínio de `notification`.

-   **Either Monad (`core/either.ts`)**: Em vez de lançar exceções para erros de fluxo de controle (ex: "Recurso não encontrado"), nossos Use Cases retornam um objeto `Either`. Ele pode ser `Left` (representando um erro) ou `Right` (representando sucesso), permitindo um tratamento de erros explícito e funcional.

---

## 📂 Estrutura do Projeto

```
/src
├───core/             # Blocos de construção da arquitetura (Entity, AggregateRoot, DomainEvents).
│
├───domain/           # Contém os Bounded Contexts da aplicação.
│   │
│   ├───habbitTracker/  # Domínio de gamificação de hábitos.
│   │   ├───application/  # Camada de Aplicação (Use Cases, interfaces de repositórios).
│   │   └───enterprise/   # Camada de Domínio (Entidades, regras de negócio).
│   │
│   └───notification/   # Domínio de notificações.
│       ├───application/
│       │   ├───subscribers/ # "Ouvintes" de Domain Events.
│       │   └───use-cases/
│       └───enterprise/
│
└───test/             # Testes e implementações em memória para os testes.
    ├───factories/      # Funções para criar entidades de teste rapidamente.
    └───repositories/   # Implementações em memória dos repositórios para testes unitários e de integração.
```

---
