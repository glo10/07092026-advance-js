# Correction atelier 8.1 : tests

## Pattern AAA (Arrange-Act-Assert) : Structure fondamentale d'un test unitaire

1. *Arrange* : préparer les données de test.
2. *Act* : exécuter la fonction à tester.
3. *Assert* : vérifier que le résultat obtenu correspond au résultat attendu.


## Test d'exception avec `toThrow`

Lors du test de levée d'erreur, il faut passer une fonction de rappel par exemple  `() => computeTotal(...)` à `expect()`. Si on exécutait la fonction directement à l'intérieur, l'erreur arrêterait l'exécution du fichier de test avant que l'assertion ne puisse la capturer.

## Pourquoi moquer ?

Dans un test d'intégration du service applicatif, on souhaite valider la logique métier (`fullName`, `isAdult`) sans dépendre d'un vrai serveur API (qui pourrait être indisponible ou lent).

### `mockResolvedValueOnce` vs `mockRejectedValueOnce`

Permet de simuler le comportement asynchrone d'une promesse, soit lorsqu'elle réussit, soit lorsqu'elle échoue, afin de tester tous les parcours possibles.

## Test End-to-End (E2E)

Contrairement aux tests unitaires, le test E2E s'exécute au sein d'une instance réelle d'un navigateur web. Il teste l'application complète (Front-end, Back-end, Base de données).