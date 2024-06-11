JobOdyssey
Bienvenue dans le dépôt de code de l'application JobOdyssey.

Prérequis
Pour faire fonctionner l'application, vous devez installer XAMPP. Vous pouvez télécharger XAMPP à partir de ce lien : Télécharger XAMPP.

Installation
Étape 1 : Cloner le dépôt
Clonez ce dépôt sur votre machine locale.

bash
Copier le code
git clone https://github.com/votre-utilisateur/jobodyssey.git
cd jobodyssey
Étape 2 : Ouvrir le projet dans Visual Studio Code
Ouvrez le dossier du projet dans Visual Studio Code.

Étape 3 : Configurer et démarrer le Frontend
Ouvrez une console et naviguez jusqu'au dossier frontend.

bash
Copier le code
cd frontend
Installez les dépendances.

bash
Copier le code
npm install
Démarrez le serveur de développement.

bash
Copier le code
npm run dev
Étape 4 : Configurer et démarrer le Backend
Ouvrez une autre console et naviguez jusqu'au dossier server.

bash
Copier le code
cd server
Installez les dépendances.

bash
Copier le code
npm install
Démarrez le serveur.

bash
Copier le code
npm start
Étape 5 : Exécuter les migrations de la base de données
Lors de la première utilisation, vous devez exécuter les migrations de la base de données. Assurez-vous que vous êtes dans le dossier server et utilisez la commande suivante :

bash
Copier le code
npx sequelize db:migrate
Configuration supplémentaire
Assurez-vous que votre serveur XAMPP est en cours d'exécution et que les services Apache et MySQL sont activés.

Contribuer
Les contributions sont les bienvenues. Pour des changements majeurs, veuillez d'abord ouvrir une issue pour discuter de ce que vous aimeriez changer.

License
MIT
