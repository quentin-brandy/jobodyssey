# Project Title

A brief description of what this project does and who it's for

# JobOdyssey

Bienvenue dans le dépôt de code de l'application **JobOdyssey**.

## Prérequis

Pour faire fonctionner l'application, vous devez installer **XAMPP**. Vous pouvez télécharger XAMPP à partir de ce lien : [Télécharger XAMPP](https://www.apachefriends.org/fr/index.html).

## Installation

### Étape 1 : Cloner le dépôt

Clonez ce dépôt sur votre machine locale.

```bash
git clone https://github.com/votre-utilisateur/jobodyssey.git
cd jobodyssey
```

### Étape 2 : Ouvrir le projet dans Visual Studio Code
Ouvrez le dossier du projet dans Visual Studio Code.

### Étape 3 : Configurer et démarrer le Frontend
Ouvrez une console et naviguez jusqu'au dossier frontend.

```bash
cd frontend
```

Installez les dépendances.
```bash
npm install
```
Démarrez le serveur de développement.

```bash
npm run dev
```

### Étape 4 : Configurer et démarrer le Backend
Ouvrez une autre console et naviguez jusqu'au dossier server.

```bash
cd server
```
Installez les dépendances.

```bash
npm install
```
Démarrez le serveur.
```bash
npm start
```

### Étape 5 : Exécuter les migrations de la base de données
Lors de la première utilisation, vous devez exécuter les migrations de la base de données. Assurez-vous que vous êtes dans le dossier server et utilisez la commande suivante :

```bash
npx sequelize db:migrate
```
### Configuration supplémentaire
Assurez-vous que votre serveur XAMPP est en cours d'exécution et que les services Apache et MySQL sont activés.

### Avertissement
Le projet a duré 2 semaines, donc il y a quelques points qui pourraient être optimisés ou quelques bugs qui pourraient subsister.

