# Projet compilation :
**Auteurs :** POCHET Antoine, MICHOT Julien

### Structure du projet
```
.
├── compilateur/
│   ├── output
│   ├── declaration/
│   │   ├── functionDeclaration.js
│   │   ├── variableDeclaration.js
│   │   └── localVariableDeclaration.js
│   ├── expressions/
│   │   ├── assignmentExpression.js
│   │   ├── binaryExpression.js
│   │   ├── updateExpression.js
│   │   └── callExpression.js
│   ├── operations/
│   │   └── operator.js
│   ├── statements/
│   │   ├── basicStatement.js
│   │   ├── blockStatement.js
│   │   ├── expressionStatement.js
│   │   ├── ifStatement.js
│   │   ├── forStatement.js
│   │   ├── returnStatement.js
│   │   └── whileStatement.js
│   ├── compilateur.js
│   ├── helper.js
│   ├── literal.js
│   └── reader.js
├── interprete/
│   ├── output
│   └── interprete.js
├── pretty-printer/
│   ├── output
│   └── pretty-printer.js
└── res/
    ├── ast/
    │   ├── 01-expressions.json
    │   ├── .
    │   └── .
    └── source/
        ├── 01-expressions.js
        ├── .
        └── .
```

## Pretty-printer

* Nous avons décidé de développer notre outil en Javascript et de partir sur un switch case pour traiter toutes les possibilités proposées dans les exemples. Une fois dans le switch case nous faisons appele au même switch case grâce à la récursivité. Ceci nous permet de traiter toutes les données reçues linéairement. Nous avons également rajouté des tests pour le lancement du pretty printer, des tests basiques pour comprendre comment les AST fonctionnent. 

* Etat d'avancement : Terminé

## Interprète

* Nous avons décidé de développer notre outil en Javascript et de partir sur un switch case pour traiter toutes les possibilités proposées dans les exemples. Nous avons également utilisé les tests créer pour le lancement du pretty printer, des tests basiques.

* Etat d'avancement : En cours
Tests passés :  
01-expressions | 02-declarations | 03-while | 04-if-while | 05-fors | 06-while-break | 07-expressions-vicieuses (en partie)

## Compilateur

* Nous avons décidé de développer notre outil en Javascript et de partir sur une structure avec plusieurs fichiers. Un switch case global va décomposer le JSON reçu et rediriger vers les différents fichiers correspondants au type reçu, ce qui va permettre un traitement adéquat. La création de fichier, en plus d'améliorer la lisibilité, permet la récursivité et évite la réécriture inutile de code.

* Etat d'avancement : En cours
Tests passés :  
01-expressions | 02-declarations | 03-while | 04-if-while | 05-fors | 06-while-break | 07-expressions-vicieuses | 08-if.js
