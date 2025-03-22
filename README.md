# Fitness Challenge Backend System with Harry Potter-Themed Gamification

## Table of Contents
- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Installation of Dependencies](#installation-of-dependencies)
- [Check Scripts](#check-scripts)
- [Creating the Tables](#creating-the-tables)
- [Running and Stopping the Application](#running-and-stopping-the-application)
- [About the Application](#about-the-application)
- [Using the Application](#using-the-application)
- [Folder Structure](#folder-structure)
- [Features](#features)
  - [Backend Endpoints](#backend-endpoints)
  - [Frontend Components and Pages](#frontend-components-and-pages)
- [Endpoint Details From CA1](#endpoint-details-from-ca1)
  - [Section A](#section-a)
  - [Section B (Self-Implemented Endpoints)](#section-b-self-implemented-endpoints)
- [Conclusion](#conclusion)
- [Author](#author)

## Project Overview
This project implements a backend system for a fitness challenge application with Harry Potter-themed gamification elements, designed using Node.js and MySQL.
It aims to encourage users to actively participate in a variety of engaging activities, such as completing fitness challenges, dueling magical creatures, and earning exciting rewards. 
By integrating features like magical items and house leaderboards, the system fosters consistent engagement and motivates users to stay committed to their fitness goals while immersing themselves in an RPG-inspired experience.

## Prerequisites
Software needed to run this application:
- Postman: For testing and interacting with API endpoints.
- MySQL Workbench: For visualizing database tables.

## Installation of Dependencies
To set up the required dependencies for this application, run the command:
```bash
`npm install`.
```
To verify the installed dependencies, open the `package.json` file and ensure the following packages are included:
- dotenv
- express
- mysql2
- nodemon
- bcrypt
- jsonwebtoken

If any dependencies are missing, you can add them manually by running the following command:
```bash
npm install <dependency_name>
```

## Check Scripts
Ensure the scripts section in the package.json file is correctly configured as shown below:
```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "init_tables": "node src/configs/initTables.js",
    "start": "node index.js",
    "dev": "nodemon ./src/index.js"
}
```

## Creating the Tables
To create the database tables, use the following command:
```bash
npm run init_tables
```

Once the command executes successfully, you should see the message:
"Tables created successfully" followed by the relevant results.

## Running and Stopping the Application
To start the application, use the following command:
- npm start

You should see the message: "App is running on port 3000".
Once the application is running, you can use Postman to start interacting and using the endpoints.
To stop the application, press `Ctrl + C` followed by `Y`.

## About the Application
"<--" indicates that the file on the left uses `require` to import the file on the right. For example, in `index.js`, you would write `const app = require('./src/app');` to import the `app.js` file.

Example flow for a route:
_index.js <-- app.js <-- mainRoutes.js <-- userRoutes.js <-- userController.js <-- userModels.js <-- Retrieves data from db.js (MySQL server)_

## Using the Application
1. **Backend**: After launching the application, you can use Postman to test and interact with the endpoints. Refer to the respective route files to review the requirements for each endpoint.

2. **Frontend**:

## Folder Structure

```
bed-ca2-jiexyinggggg
│
│── node_modules
│
│── public
│   ├── css
│   │   ├── color.css
│   │   └── style.css
│   │
│   ├── images
│   │
│   ├── js
│   │   ├── activityHistory.js
│   │   ├── challenges.js
│   │   ├── duel.js
│   │   ├── editUserInfo.js
│   │   ├── getCurrentURL.js
│   │   ├── houseSelection.js
│   │   ├── leaderboard.js
│   │   ├── loginUser.js
│   │   ├── manageReviews.js
│   │   ├── potionShop.js
│   │   ├── queryCmds.js
│   │   ├── registerUser.js
│   │   ├── sessionManager.js
│   │   ├── spellShop.js
│   │   ├── starRating.js
│   │   ├── submitReview.js
│   │   ├── userInfoDisplay.js
│   │   ├── userNavbarToggle.js
│   │   ├── vault.js
│   │   └── wandShop.js
│   │
│   ├── challenges.html
│   ├── duel.html
│   ├── index.html
│   ├── login.html
│   ├── owlPost.html
│   ├── potionShop.html
│   ├── profile.html
│   ├── quests.html
│   ├── register.html
│   ├── spellShop.html
│   ├── vault.html
│   └── wandShop.html
│
│── src
│   ├── configs
│   │   ├── createSchema.js
│   │   └── initTables.js
│   │
│   ├── controllers
│   │   ├── challengesController.js
│   │   ├── diagonAlleyController.js
│   │   ├── duelController.js
│   │   ├── houseController.js
│   │   ├── leaderboardController.js
│   │   ├── owlPostController.js
│   │   ├── questController.js
│   │   ├── userCompletionController.js
│   │   ├── userController.js
│   │   ├── vaultController.js
│   │   └── verifyController.js
│   │
│   ├── middlewares
│   │   ├── bcryptMiddleware.js
│   │   └── jwtMiddleware.js
│   │
│   ├── models
│   │   ├── challengesModel.js
│   │   ├── diagonAlleyModel.js
│   │   ├── duelModel.js
│   │   ├── houseModel.js
│   │   ├── leaderboardModel.js
│   │   ├── owlPostModel.js
│   │   ├── questModel.js
│   │   ├── userCompletionModel.js
│   │   ├── userModel.js
│   │   └── vaultModel.js
│   │
│   ├── routes
│   │   ├── challengesRoutes.js
│   │   ├── diagonAlleyRoutes.js
│   │   ├── duelRoutes.js
│   │   ├── houseRoutes.js
│   │   ├── leaderboardRoutes.js
│   │   ├── mainRoutes.js
│   │   ├── owlPostRoutes.js
│   │   ├── questRoutes.js
│   │   ├── userRoutes.js
│   │   └── vaultRoutes.js
│   │
│   ├── services
│   │   └── db.js
│   │
│   └── app.js
│── .env
│── .gitignore
│── index.js
│── package-lock.json
│── package.json
└── README.md
```

## Features

### Backend Endpoints

The **Gamified Fitness Challenge System** includes the following features:

1️. 🧙‍♂️ User Management (userRoutes.js)
- **Register a new user** → `POST /api/register`  
- **User login authentication** → `POST /api/login`  
- **Retrieve user details** _(username, email, skillpoints, etc.)_ → `GET /api/users`  
- **Update user profile** _(edit username or email)_ → `PUT /api/users/:user_id`  

2️. 🏋️ Fitness Challenges (challengesRoutes.js) 
- **View all available fitness challenges** → `GET /api/challenges`  
- **Complete a fitness challenge and earn skillpoints** → `POST /api/users/challenges/complete`  
- **Update an existing fitness challenge** → `PUT /api/challenges/:challenge_id`  
- **Delete a fitness challenge** → `DELETE /api/challenges/:challenge_id`

3️. 🏰 Shops (diagonAlleyRoutes.js)
- **Browse available wands** for purchase → `GET /api/diagonAlley/wandShop`  
- **View all available potions** → `GET /api/diagonAlley/potionShop`  
- **Check available spells** in the shop → `GET /api/diagonAlley/spellShop`  
- **Purchase a wand** → `POST /api/diagonAlley/wandShop/purchase`  
- **Purchase a a potion** → `POST /api/diagonAlley/potionShop/purchase`
- **Purchase a spell** → `POST /api/diagonAlley/spellShop/purchase`

4️. 🏦 Inventory (vaultRoutes.js)
- **View owned wands** in inventory → `GET /api/vault/wands`  
- **See collected potions** → `GET /api/vault/potions`  
- **Check acquired spells** → `GET /api/vault/spells`  

5️. 🪄 Duelling Club (duelRoutes.js)
- **Retrieve all creatures available for duels** → `GET /api/duel/creatures`  
- **Start a duel against another user** → `POST /api/duel/start`  
- **Attack during a duel** → `POST /api/duel/attack`  
- **Retrieve all past duels** → `GET /api/duel`  
- **Retrieve specific duel details using duel ID** → `GET /api/duel/:duelId`

6️. 🔮 Sorting into Hogwarts House (houseRoutes.js)
- **Retrieve all Hogwarts houses** → `GET /api/houses/allHouses`  
- **Assign user to a Hogwarts house** → `POST /api/houses/chooseHouse`  
- **Retrieve user’s assigned house** → `GET /api/houses/` 

7️. 🏆 Leaderboard (leaderboardRoutes.js)
- **Get user leaderboard rankings based on skillpoints** → `GET /api/leaderboard/users`  
- **Filter user rankings by house** → `GET /api/leaderboard/users?house_id={house_id}`  
- **View house leaderboard rankings _(total house points)_** → `GET /api/leaderboard/houses`  

8️. 📜 User Activity History (userRoutes.js)
- **Retrieve full user activity log** → `GET /api/users/userActivityHistory`

9️. 🦉 Review System (owlPostRoutes.js)
- **Submit a new review** → `POST /api/owlPost/`  
- **Retrieve all reviews** → `GET /api/owlPost` 
- **Update an existing review** → `PUT /api/owlPost`  
- **Delete a review** → `DELETE /api/owlPost/:reviewId`

### Frontend Components and Pages

The frontend of the **Gamified Fitness Challenge System** consists of multiple interactive pages designed using **HTML, CSS (Bootstrap 5.3.3), and JavaScript**.

📌 **Navigation Information**  
- **All pages** can be accessed via the **navigation bar**.  
- **Wand Shop, Potion Shop, and Spell Shop pages** are found in the **Diagon Alley dropdown** in the navbar.  
- **The Review Page (Owl Post)** is accessible via a **circular floating icon** at the bottom right of the website.  

1️⃣ 🏠 **Homepage**  
- File: `index.html`  
- Description: Serves as the **main entry point** to the platform, providing an overview of features.  
  - View the leaderboard, displaying user rankings based on skillpoints.  
  - Access the application usage guide, explaining how to navigate and use the platform.  
  - See general application details, providing an overview of the system and its features.

2️⃣ 🔑 **Login Page**
- File: `login.html`  
- Description: Allows users to log into their accounts securely using their registered credentials.  

3️⃣ 📝 **Register Page**
- File: `register.html`
- Description: Enables new users to create an account by providing necessary details.

4️⃣ 🏋️ **Fitness Challenges Page**
- File: `challenges.html`
- Description: Displays a list of available fitness challenges that users can complete.

5️⃣ ⚔️ **Duels Page**
- File: `duel.html`
- Description**: Users can start, attack, and check duel results against creatures.

6️⃣ 🪄 **Wand Shop Page (Diagon Alley)**
- File: `wandShop.html`
- Description: Users can browse and purchase wands using skillpoints.  
- Location: Found in the **Diagon Alley dropdown** in the navbar.  

7️⃣ ⚗️ **Potion Shop Page (Diagon Alley)**
- File: `potionShop.html`
- Description: Users can buy potions** for health restoration or battle enhancements.
- Location: Found in the **Diagon Alley dropdown** in the navbar.  

8️⃣ ✨ **Spell Shop Page (Diagon Alley)**
- File: `spellShop.html`
- Description: Players can acquire spells to use in duels.
- Location*: Found in the **Diagon Alley dropdown** in the navbar.

9️⃣ 🏦 **Vault Page**
- File: `vault.html`
- Description: Displays a user's inventory, including wands, potions, and spells.

1️⃣0️⃣ 🧙‍♂️ **Profile Page**  
- File: `profile.html`
- Description: Users can view and edit their profile information, such as username and email.
  - View their assigned Hogwarts house or choose a house if not yet assigned.
  - See their activity history, including completedchallenges, past duels, and house sorting history.

1️⃣1️⃣ 🦉 **Review Page (Owl Post)**  
- File: `owlPost.html`
- Description: Allows users to submit, view, edit, and delete reviews about the platform or their experiences.
- Location: Accessible via a **circular floating icon** at the bottom right of the website.

## Endpoint Details From CA1

## Section A
### Task 1: Create a New User (userRoutes.js, POST /users)

**Description**: Allows the creation of a new user by providing their username in the request body. Checks if the username is already in use before creating the user.

**Example Request Body**:
```json
{
  "username": "socuser321"
}
```

**Example Response Body**:
```json
{
  "user_id": 1,
  "username": "socuser321",
  "skillpoints": 0
}
```

**Middleware Functions**:
- `controller.checkUsername`: Validates if the provided username is unique.
- `controller.createNewUser`: Creates a new user with the specified username and initializes skillpoints to 0.

### Task 2: Retrieve a List of All Users (userRoutes.js, GET /users)

**Description**: Retrieves a list of all users, including their user ID, username, and skillpoints.

**Example Request Body**: _None required for this endpoint._

**Example Response Body**:
```json
[
  {
    "user_id": 1,
    "username": "socuser321",
    "skillpoints": 0,
    "user_health": 100
  },
  {
    "user_id": 2,
    "username": "HarryPotter",
    "skillpoints": 750,
    "user_health": 100
  }
]
```

**Middleware Function**:
- `controller.readAllUsers`: Fetches all users from the database, including their user_id, username, and skillpoints.

### Task 3: Update User Details (userRoutes.js, PUT /users/:user_id)

**Description**: Updates the details of an existing user by providing the `user_id` in the URL and the updated `username` in the request body. Checks if the user exists and if the new username is unique before updating.

**Example Request Body**:
```json
{
  "username": "superSOC",
  "skillpoints": 100
}
```

**URL Parameters**:
- `user_id` (integer): The unique identifier of the user to be updated.

**Example Response Body**:
```json
{
  "user_id": 1,
  "username": "superSOC",
  "skillpoints": 100
}
```

**Middleware Functions**:
- `controller.checkUserById`: Verifies that the user with the specified user_id exists.
- `controller.checkUsername`: Ensures the updated username is unique and not already taken.
- `controller.updateUserById`: Updates the user's details in the database.

### Task 4: Create a New Challenge (challengesRoutes.js, POST /challenges)

**Description**: Allows the creation of a new fitness challenge by providing the `user_id` of the creator, the challenge description, and the skillpoints associated with the challenge in the request body.

**Example Request Body**:
```json
{
  "challenge": "Complete 2.4km within 15 minutes",
  "user_id": 1,
  "skillpoints": 50
}
```

**Example Response Body**:
```json
{
  "challenge_id": 6,
  "challenge": "Complete 2.4km within 15 minutes",
  "creator_id": 1,
  "skillpoints": 50
}
```

**Middleware Functions**:
- `userController.checkUserById`: Ensures the user_id provided belongs to an existing user.
- `challengesController.createNewChallenge`: Creates a new challenge with the given details and inserts it into the database.

### Task 5: Retrieve a List of All Challenges (challengesRoutes.js, GET /challenges)

**Description**: Retrieves a list of all fitness challenges, including their `challenge_id`, `challenge`, `creator_id`, and `skillpoints`.

**Example Request Body**: _None required for this endpoint._

**Example Response Body**:
```json
[
  {
    "challenge_id": 1,
    "challenge": "Complete 2.4km within 15 minutes",
    "creator_id": 1,
    "skillpoints": 50
  },
  {
    "challenge_id": 2,
    "challenge": "Cycle around the island for at least 50km",
    "creator_id": 1,
    "skillpoints": 100
  },
  {
    "challenge_id": 3,
    "challenge": "Complete a full marathon (42.2km)",
    "creator_id": 2,
    "skillpoints": 200
  }
]
```

**Middleware Function**:
- `challengesController.readAllChallenges`: Fetches all challenges from the database, including their challenge_id, challenge, creator_id, and skillpoints.

### Task 6: Update Challenge Details (challengesRoutes.js, PUT /challenges/:challenge_id)

**Description**: Updates the details of an existing fitness challenge by providing the `challenge_id` in the URL and the updated challenge details in the request body. Ensures the user updating the challenge is the creator.

**Example Request Body**:
```json
{
  "user_id": 1,
  "challenge": "Complete 2.4km within 12 minutes",
  "skillpoints": 75
}
```

**URL Parameters**:
- `challenge_id` (integer): The unique identifier of the challenge to be updated.

**Example Response Body**:
```json
{
  "challenge_id": "1",
  "challenge": "Complete 2.4km within 12 minutes",
  "creator_id": 1,
  "skillpoints": 75
}
```

**Middleware Functions**:
- `userController.checkUserById`: Verifies that the user exists in the database.
- `challengesController.checkChallengeById`: Ensures the specified challenge_id exists.
- `challengesController.checkUserIdAgainstCreatorId`: Confirms that the user attempting the update is the creator of the challenge.
- `challengesController.updateChallenge`: Updates the challenge details in the database.

### Task 7: Delete a Challenge (challengesRoutes.js, DELETE /challenges/:challenge_id)

**Description**: Deletes an existing fitness challenge by providing the `challenge_id` in the URL. Ensures that any associated user completions are also removed from the database.

**Example Request Body**: _None required for this endpoint._

**URL Parameters**:
- `challenge_id` (integer): The unique identifier of the challenge to be deleted.

**Response**:
- **Status Code**: `204 No Content`  
  _Indicates the challenge and its associated user completions (if any) were successfully deleted._

**Middleware Functions**:
- `challengesController.deleteChallenge`: Deletes the challenge from the database using the provided `challenge_id`.
- `challengesController.deleteRemovedChallengeUserCompletions`: Deletes all user completion records associated with the removed challenge.

### Task 8: Create a Completion Record (challengesRoutes.js, POST /challenges/complete)

**Description**: Marks a challenge as completed by a user by providing `user_id`, `completed`, `creation_date`, and `notes` in the request body. Skillpoints are awarded based on the completion status.

**Example Request Body**:
```json
{
  "user_id": 1,
  "completed": true,
  "creation_date": "2024-11-30",
  "notes": "A fitter me!"
}
```

**Example Response Body**:
```json
{
  "complete_id": 1,
  "challenge_id": 2,
  "user_id": 1,
  "completed": true,
  "creation_date": "2024-11-30",
  "notes": "A fitter me!"
}
```

**Middleware Functions**:
- `challengesController.validateChallengeId`: Ensures the specified challenge_id exists in the database.
- `userController.checkUserById`: Verifies that the user exists in the database.
- `userCompletionController.addUserCompletion`: Creates a new record in the database marking the user's completion of the challenge.
- `userController.addUserSkillpoints`:
    Awards skillpoints to the user based on the completion status:
    - Full points if completed is true.
    - 5 points if completed is false.

### Task 9: Retrieve List of Users Who Attempted a Challenge (challengesRoutes.js, GET /challenges/:challenge_id)

**Description**: Retrieves a list of users who have attempted a specific challenge by providing the `challenge_id` in the URL parameter. The response includes details about their attempt, such as completion status, creation date, and notes.

**Example Request Body**: _None required for this endpoint._

**URL Parameters**:
- `challenge_id` (integer): The unique identifier of the challenge for which the participant list is being retrieved.

**Example Response Body**:
```json
[
  {
    "user_id": 2,
    "completed": true,
    "creation_date": "2024-11-30",
    "notes": "A fitter me!"
  },
  {
    "user_id": 3,
    "completed": false,
    "creation_date": "2024-10-30",
    "notes": "I don't like this challenge"
  }
]
```

**Middleware Function**:
- `userCompletionController.selectUserCompleted`: Retrieves a list of users who attempted the specified challenge and their attempt details from the database.

## Section B (Self-Implemented Endpoints)
### Task 1: Retrieve All Wands Available in the Wand Shop (diagonAlleyRoutes.js, GET /diagonAlley/wandShop)

**Description**: Retrieves a list of all wands available for purchase in the Wand Shop.

**Example Request Body**: _None required for this endpoint._

**Example Response Body**:
```json
[
  {
    "wand_id": 1,
    "wand_name": "Aspen wood with a unicorn core 12"" and surprisingly swishy flexibility",
    "wand_cost": 300
  },
  {
    "wand_id": 2,
    "wand_name": "Maple wood with a phoenix core 12½"" and rigid flexibility",
    "wand_cost": 300
  }
]
```

**Middleware Function**:
- `controller.getAllWandsInShop`: Fetches all wand data from the database.

### Task 2: Purchase a Wand (diagonAlleyRoutes.js, POST /diagonAlley/wandShop/purchase)

**Description**: Allows a user to purchase a wand by providing the `wand_id` and `user_id` in the request body. This endpoint validates the purchase and deducts the cost of the wand from the user's skillpoints.

**Example Request Body**:
```json
{
  "wand_id": 1,
  "user_id": 123
}
```

**Example Response Body**:
```json
{
  "message": "Wand purchased successfully. Skillpoints deducted and wand added to the Vault."
}
```

**Middleware Functions**:
- `controller.validateWandPurchase`: Validates the user's ability to purchase the wand.
- `controller.completeWandPurchase`: Completes the purchase by deducting skillpoints and adding the wand to the user's inventory.

### Task 3: Retrieve All Potions Available in the Potion Shop (diagonAlleyRoutes.js, GET /diagonAlley/potionShop)

**Description**: Retrieves a list of all potions available for purchase in the Potion Shop.

**Example Request Body**: _None required for this endpoint._

**Example Response Body**:
```json
[
  {
      "potion_id": 1,
      "potion_name": "Cure for Boils",
      "potion_description": "The Cure for Boils was a potion which removed boils, such as those produced by the Pimple Jinx.",
      "potion_cost": 64,
      "potion_damage": null,
      "potion_heal": 40
  },
  {
      "potion_id": 2,
      "potion_name": "Essence of Dittany",
      "potion_description": "Essence of Dittany was a magical solution made from dried and crushed dittany leaves and salt water (15 drops), that possessed powerful curative properties, which could be used on open shallow wounds for immediate healing and skin regeneration.",
      "potion_cost": 80,
      "potion_damage": null,
      "potion_heal": 50
  }
]
```

**Middleware Function**:
- `controller.getAllPotionsInShop`: Fetches all potion data from the database.

### Task 4: Purchase a Potion (diagonAlleyRoutes.js, POST /diagonAlley/potionShop/purchase)

**Description**: Allows a user to purchase a potion by providing the `potion_id` and `user_id` in the request body. This endpoint validates the purchase and deducts the cost of the potion from the user's skillpoints.

**Example Request Body**:
```json
{
  "potion_id": 1,
  "user_id": 123
}
```

**Example Response Body**:
```json
{
  "message": "Potion purchased successfully. Skillpoints deducted and potion added to the Vault."
}
```

**Middleware Functions**:
- `controller.validatePotionPurchase`: Validates the user's ability to purchase the potion.
- `controller.completePotionPurchase`: Completes the purchase by deducting skillpoints and adding the potion to the user's inventory.

### Task 5: Retrieve All Spells Available in the Spell Shop (diagonAlleyRoutes.js, GET /diagonAlley/spellShop)

**Description**: Retrieves a list of all spells available for purchase in the Spell Shop.

**Example Request Body**: _None required for this endpoint._

**Example Response Body**:
```json
[
  {
      "spell_id": 1,
      "spell_name": "Melofors Jinx",
      "spell_description": "The Pumpkin-Head Jinx (Melofors), was a jinx that encased the head of the victim in a pumpkin. To outsiders, it appeared that the head of the victim was transformed into a pumpkin.",
      "spell_cost": 38,
      "spell_damage": 15
  },
  {
      "spell_id": 2,
      "spell_name": "Incendio",
      "spell_description": "The Fire-Making Spell (Incendio) was a charm that conjured a jet of flames that could be used to set things alight.",
      "spell_cost": 50,
      "spell_damage": 20
  }
]
```

**Middleware Function**:
- `controller.getAllSpellsInShop`: Fetches all spell data from the database.

### Task 6: Purchase a Spell (diagonAlleyRoutes.js, POST /diagonAlley/spellShop/purchase)

**Description**: Allows a user to purchase a spell by providing the `spell_id` and `user_id` in the request body. This endpoint validates the purchase and deducts the cost of the spell from the user's skillpoints.

**Example Request Body**:
```json
{
  "spell_id": 1,
  "user_id": 123
}
```

**Example Response Body**:
```json
{
  "message": "Spell purchased successfully. Skillpoints deducted and spell added to the Vault."
}
```

**Middleware Functions**:
- `controller.validateSpellPurchase`: Validates the user's ability to purchase the spell.
- `controller.completeSpellPurchase`: Completes the purchase by deducting skillpoints and adding the spell to the user's inventory.

### Task 7: Retrieve All Items in the User's Vault (vaultRoutes.js, GET /vault)

**Description**: Retrieves a list of all items stored in a user's vault. This endpoint requires the user's ID to fetch their specific inventory of wands, potions, and spells.

**Example Request Body**:
```json
{
  "userId": 123
}
```

**Example Response Body**:
```json
[
  {
    "vault_id": 1,
    "user_id": 1,
    "wand_id": 1,
    "potion_id": null,
    "spell_id": null,
    "potion_quantity": 0
  }
  {
    "vault_id": 2,
    "user_id": 1,
    "wand_id": null,
    "potion_id": null,
    "spell_id": 1,
    "potion_quantity": 0
  }
]
```

**Middleware Function**:
`controller.getAllItemsInVaultById`: Fetches all items belonging to the user from the database.

### Task 8: Retrieve All Wands in the User's Vault (vaultRoutes.js, GET /vault/wands)

**Description**: Retrieves a list of all wands stored in a user's vault by providing the `user_id` in the request body.

**Example Request Body**:
```json
{
  "user_id": 123
}
```

**Example Response Body**:
```json
[
  {
    "wand_id": 1,
    "wand_name": "Aspen wood with a unicorn core 12"" and surprisingly swishy flexibility"
  },
  {
    "wand_id": 5,
    "wand_name": "Cherry wood with a dragon core 12½"" and slightly yielding flexibility"
  }
]
```

**Middleware Function**:
- `controller.getAllWandsInVault`: Fetches all wands belonging to the user from the database based on the provided user_id.

### Task 9: Retrieve All Potions in the User's Vault (vaultRoutes.js, GET /vault/potions)

**Description**: Retrieves a list of all potions stored in a user's vault by providing the `user_id` in the request body.

**Example Request Body**:
```json
{
  "user_id": 123
}
```

**Example Response Body**:
```json
[
  {
    "potion_id": 1,
    "potion_name": "Cure for Boils",
    "potion_quantity": 1
  },
  {
    "potion_id": 1,
    "potion_name": "Cure for Boils",
    "potion_quantity": 1
  },
  {
    "potion_id": 5,
    "potion_name": "Confusion Concoction",
    "potion_quantity": 1
  }
]
```

**Middleware Function**:
- `controller.getAllPotionsInVault`: Fetches all potions belonging to the user from the database based on the provided user_id.

### Task 10: Retrieve All Spells in the User's Vault (vaultRoutes.js, GET /vault/spells)

**Description**: Retrieves a list of all spells stored in a user's vault by providing the `user_id` in the request body.

**Example Request Body**:
```json
{
  "user_id": 123
}
```

**Example Response Body**:
```json
[
  {
    "spell_id": 1,
    "spell_name": "Melofors Jinx"
  },
  {
    "spell_id": 5,
    "spell_name": "Impedimenta"
  }
]
```

**Middleware Function**:
- `controller.getAllSpellsInVault`: Fetches all spells belonging to the user from the database based on the provided user_id.

### Task 11: Retrieve All Creatures (duelRoutes.js, GET /duel/creatures)

**Description**: Retrieves a list of all creatures available for dueling.

**Example Request Body**: _None required for this endpoint._

**Example Response Body**:
```json
[
  {
    "creature_id": 1,
    "creature_name": "Doxy",
    "creature_health": 100,
    "reward_points": 40,
    "description": "A small, venomous creature resembling a fairy with sharp teeth and a nasty bite."
  },
  {
    "creature_id": 2,
    "creature_name": "Chimaera",
    "creature_health": 130,
    "reward_points": 52,
    "description": "A vicious hybrid beast with the head of a lion, body of a goat, and tail of a dragon."
  }
]
```

**Middleware Function**:
- `duelController.readAllCreatures`: Fetches all creatures available for dueling from the database.

### Task 12: Start a Duel (duelRoutes.js, POST /duel/start)

**Description**: Initiates a duel by verifying prerequisites, deducting initial skillpoints, and creating a duel record. The user must meet the eligibility criteria and provide the `user_id` and `creature_id` in the request body.

**Example Request Body**:
```json
{
  "user_id": 123,
  "creature_id": 1
}
```

**Example Response Body**:
```json
{
  "duel_id": 1,
  "user_id": 1,
  "user_health": 100,
  "creature_id": 1,
  "creature_health": 100,
  "status": "Duel Started"
}
```

**Middleware Functions**:
- `duelController.checkDuplicateDuel`: Ensures there isn't an ongoing duel for the user.
- `duelController.checkUserEligibility`: Verifies the user has the required items and skillpoints to start a duel.
- `duelController.deductInitialSkillpoints`: Deducts the initial skillpoints required to initiate the duel.
- `duelController.readCreatureHealth`: Retrieves the health of the selected creature.
- `duelController.createDuelRecord`: Creates an initial record for the duel in the database.

### Task 13: Attack During a Duel (duelRoutes.js, POST /duel/attack)

**Description**: Simulates an attack during a duel by calculating damage dealt to the creature, updating the duel outcome, and applying rewards or penalties. The user must provide the `duel_id`, `user_id`, and optionally the `damage_item_id` (potion or spell) in the request body.

**Example Request Body**:
```json
{
  "duel_id": 1
}
```

**Example Response Body**:
```json
{
  "message": "Result: Win",
  "user_health": 46,
  "creature_health": 0,
  "skillpoints_gained": 40,
  "skillpoints_deducted": 0
}
```

**Middleware Functions**:
- `duelController.readDuelById`: Retrieves the details of the ongoing duel by duel_id.
- `duelController.readDamageItemId`: Fetches the item ID (potion or spell) used to deal damage.
- `duelController.readDamageValuePotion`: Retrieves damage and heal values for the potion if used.
- `duelController.readDamageValueSpell`: Retrieves the damage value for the spell if used.
- `duelController.fetchDuelRewardPoints`: Retrieves the reward points associated with the duel.
- `duelController.simulateDuelAndUpdateOutcome`: Simulates the attack, calculates damage, updates the duel's outcome, and determines the winner or if the duel continues.
- `duelController.addDuelRewardPoints`: Adds the reward points to the user's total skillpoints if they win the duel.
- `userController.updateUserHealth`: Updates the user's health in the database based on damage received.

### Task 14: Retrieve a List of All Duels (duelRoutes.js, GET /duel)

**Description**: Retrieves a list of all duels, including details about the user, creature, duel outcome, and rewards.

**Example Request Body**: _None required for this endpoint._

**Example Response Body**:
```json
[
  {
    "duel_id": 1,
    "user_id": 123,
    "creature_id": 1,
    "result": "Win",
    "user_health": 46,
    "creature_health": 0,
    "skillpoints_gained": 40,
    "skillpoints_deducted": 0,
    "created_at": "2024-12-30 13:35:10",
    "updated_at": "2024-12-30 13:35:54",
  },
  {
    "duel_id": 2,
    "user_id": 123,
    "creature_id": 3,
    "result": "Lose",
    "user_health": 0,
    "creature_health": 8,
    "skillpoints_gained": 0,
    "skillpoints_deducted": 10,
    "created_at": "2024-12-30 13:38:02",
    "updated_at": "2024-12-30 13:38:47",
  }
]
```

**Middleware Function**:
- `duelController.getAllDuels`: Fetches all duels from the database along with their details.

### Task 15: Retrieve Duel Details (duelRoutes.js, GET /duel/:duelId)

**Description**: Retrieves detailed information about a specific duel by providing the `duelId` in the URL parameter.

**Example Request Body**: _None required for this endpoint._

**URL Parameters**:
- `duelId` (integer): The unique identifier of the duel to retrieve.

**Example Response Body**:
```json
{
  "duel_id": 1,
  "user_id": 123,
  "creature_id": 1,
  "result": "Win",
  "user_health": 46,
  "creature_health": 0,
  "skillpoints_gained": 40,
  "skillpoints_deducted": 0,
  "created_at": "2024-12-30 13:35:10",
  "updated_at": "2024-12-30 13:35:54",
}
```

**Middleware Function**:
- `duelController.getDuelDetails`: Fetches the details of a specific duel from the database using the provided duelId.

### Task 16: Retrieve All Hogwarts Houses (houseRoutes.js, GET /houses)

**Description**: Retrieves a list of all Hogwarts houses along with their respective details.

**Example Request Body**: _None required for this endpoint._

**Example Response Body**:
```json
[
  {
      "house_id": 1,
      "house_name": "Gryffindor",
      "house_description": "Gryffindor was founded by Godric Gryffindor and favoured students who possessed characteristics such as courage, bravery and determination. The house colours were scarlet and gold, and the emblematic animal was a lion, which decorated the walls of the Gryffindor common room."
  },
  {
      "house_id": 2,
      "house_name": "Hufflepuff",
      "house_description": "Hufflepuff was founded by Helga Hufflepuff who valued hard work, patience, loyalty and fairness over any particular aptitude in any of her students. The house colours were black and yellow and its emblem a badger. These colours decorated the walls of the Hufflepuff underground common room."
  },
  {
      "house_id": 3,
      "house_name": "Ravenclaw",
      "house_description": "Ravenclaw was one of four Hogwarts houses and prized students whose focus was on learning, wit and wisdom. This reflected the nature of their founder, Rowena Ravenclaw who was known to be a woman of remarkable diligence and intelligence. The Ravenclaw common room was decorated with the house colours of blue and bronze along with their eagle emblem."
  },
  {
      "house_id": 4,
      "house_name": "Slytherin",
      "house_description": "Slytherin was one of the four Hogwarts houses and was characterised by its silver and green colours and serpent emblem. The Slytherin common room was located in the castle dungeons. Founded by Salazar Slytherin, the students sent to Slytherin were representative of his preference for characters defined by cunning, pride and ambition."
  }
]
```

**Middleware Function**:
- `houseController.getAllHouses`: Fetches all Hogwarts houses and their details from the database.

### Task 17: Allow User to Choose Their Hogwarts House (houseRoutes.js, POST /houses/chooseHouse)

**Description**: Allows a user to select their Hogwarts house by providing the `user_id` and `house_id` in the request body. Ensures the user exists and is not already sorted into a house.

**Example Request Body**:
```json
{
  "user_id": 123,
  "house_id": 1
}
```

**Example Response Body**:
```json
{
  "message": "User successfully sorted into Gryffindor.",
  "user_id": 123,
  "house_id": 1
}
```

**Middleware Functions**:
- `userController.checkUserById`: Verifies that the user exists in the database.
- `houseController.checkIfAlreadySorted`: Ensures the user has not already been sorted into a house.
- `houseController.assignUserToHouse`: Assigns the user to the specified house.
- `houseController.getUserAssignedHouse`: Retrieves and returns the name of the assigned house.

### Task 18: Retrieve User's House by User ID (houseRoutes.js, GET /houses/:userId)

**Description**: Retrieves the details of the Hogwarts house that a user has been assigned to by providing the `userId` in the URL parameter.

**Example Request Body**: _None required for this endpoint._

**URL Parameters**:
- `userId` (integer): The unique identifier of the user whose house details are to be retrieved.

**Example Response Body**:
```json
{
  "user_id": 123,
  "house": "Gryffindor",
  "sorted_at": "2024-12-30 14:32:19"
}
```

**Middleware Functions**:
- `userController.checkUserById`: Verifies that the user exists in the database.
- `houseController.getUserHouse`: Fetches and returns the details of the house assigned to the user.

### Task 19: Retrieve User Leaderboard (leaderboardRoutes.js, GET /leaderboard/users)

**Description**: Retrieves the user leaderboard ranked by skillpoints across all houses. Optionally filters the leaderboard by a specific house if the `house_id` query parameter is provided.

**Example Request Body**: _None required for this endpoint._

**Query Parameters**:
- `house_id` (optional, integer): The unique identifier of the house to filter the leaderboard (e.g., Gryffindor, Hufflepuff).

**Endpoint Examples**:
- Retrieve leaderboard for all users: `GET /users`
- Retrieve leaderboard for a specific house: `GET /users?house_id=1` (e.g., Gryffindor)

**Example Response Body**:
```json
[
  {
    "user_id": 1,
    "username": "HarryPotter",
    "skillpoints": 750,
    "house_name": "Gryffindor"
  },
  {
    "user_id": 2,
    "username": "HermioneGranger",
    "skillpoints": 430,
    "house_name": "Gryffindor"
  },
    {
    "user_id": 3,
    "username": "DracoMalfoy",
    "skillpoints": 150,
    "house_name": "Slytherin"
  }
]
```

**Middleware Functions**:
- `controller.getUserHouse`: Retrieves the house details for filtering, if a house_id is provided.
- `controller.getUserLeaderboard`: Fetches the leaderboard ranked by skillpoints and applies the house filter if requested.

### Task 20: Retrieve House Leaderboard (leaderboardRoutes.js, GET /leaderboard/houses)

**Description**: Retrieves the house leaderboard ranked by cumulative skillpoints of all members in each house.

**Example Request Body**: _None required for this endpoint._

**Endpoint Example**:
- Retrieve leaderboard for all houses: `GET /houses`

**Example Response Body**:
```json
{
  "leaderboard": [
    {
        "house_id": 1,
        "house_name": "Gryffindor",
        "total_skillpoints": "1180"
    },
    {
        "house_id": 4,
        "house_name": "Slytherin",
        "total_skillpoints": "150"
    },
    {
        "house_id": 2,
        "house_name": "Hufflepuff",
        "total_skillpoints": null
    },
    {
        "house_id": 3,
        "house_name": "Ravenclaw",
        "total_skillpoints": null
    }
  ]
}
```

**Middleware Function**:
- `controller.getHouseLeaderboard`: Fetches the leaderboard ranked by cumulative skillpoints for each house.

### Task 21: Submit New Review (owlPostRoutes.js, POST /owlPost)

**Description**: Allows a user to submit review by providing review details in the request body.

**Example Request Body**:
```json
{
  "name": "Harry Potter",
  "email": "harrypotter@example.com",
  "comment": "I love the gamified features, especially the duel!",
  "rating": 5
}
```

**Example Response Body**:
```json
{
  "message": "Review submitted successfully!",
  "review_id": 456
}
```

**Middleware Functions**:
- `userController.checkUserById`: Verifies that the user exists in the database.
- `owlPostController.submitReview`: Processes the review and stores it in the database.

### Task 22: Retrieve All Review (owlPostRoutes.js, GET /owlPost)

**Description**: Retrieves a list of all review submitted by users.

**Example Request Body**: _None required for this endpoint._

**Example Response Body**:
```json
[
  {
      "review_id": 3,
      "user_id": 3,
      "name": "Draco Malfoy",
      "email": "dracomalfoy@gmail.com",
      "comment": "The leaderboard is motivating, I always strive to stay at the top!",
      "rating": 5,
      "submitted_at": "2024-12-30 13:57:32"
  },
  {
      "review_id": 2,
      "user_id": 2,
      "name": "Hermione Granger",
      "email": "hermionegranger@gmail.com",
      "comment": "Great application! The integration of themes and features is creative.",
      "rating": 5,
      "submitted_at": "2024-12-30 13:57:08"
  }
]
```

**Middleware Function**:
- `owlPostController.getAllReview`: Fetches all review records from the database.

### Task 23: Retrieve Review for a Specific User (owlPostRoutes.js, GET /owlPost/:userId)

**Description**: Retrieves all review submitted by a specific user by providing the `userId` in the URL parameter.

**Example Request Body**: _None required for this endpoint._

**URL Parameters**:
- `userId` (integer): The unique identifier of the user whose review is to be retrieved.

**Example Response Body**:
```json
[
  {
      "review_id": 1,
      "user_id": 1,
      "name": "Harry Potter",
      "email": "harrypotter@gmail.com",
      "comment": "I love the gamified features, especially the duel!",
      "rating": 5,
      "submitted_at": "2024-12-30 13:56:55"
  },
  {
      "review_id": 4,
      "user_id": 1,
      "name": "Harry Potter",
      "email": "harrypotter@gmail.com",
      "comment": "The UI could use some improvements for better navigation.",
      "rating": 3,
      "submitted_at": "2024-12-30 13:59:04"
  }
]
```

**Middleware Functions**:
- `userController.checkUserById`: Verifies that the user exists in the database.
- `owlPostController.getUserReview`: Fetches all review records for the specified user from the database.

### Task 24: Update Existing Review (owlPostRoutes.js, PUT /owlPost)

**Description**: Allows a user to update their existing review by providing updated review details in the request body. Ensures that the review exists and belongs to the user.

**Example Request Body**:
```json
{
  "reviewId": 1,
  "name": "Harry Potter",
  "email": "harrypotter@gmail.com",
  "comment": "Updated review!",
  "rating": 5
}
```

**Example Response Body**:
```json
{
  "message": "Review updated successfully!"
}
```

**Middleware Functions**:
- `userController.checkUserById`: Verifies that the user exists in the database.
- `owlPostController.checkReviewExistence`: Ensures the review with the given review_id exists.
- `owlPostController.checkUserOwnership`: Verifies that the review belongs to the user making the request.
- `owlPostController.updateReview`: Updates the review details in the database.

### Task 25: Delete Review (owlPostRoutes.js, DELETE /owlPost/:reviewId)

**Description**: Allows a user to delete a specific review entry by providing the `reviewId` in the URL parameter.

**Example Request Body**: _None required for this endpoint._

**URL Parameters**:
- `reviewId` (integer): The unique identifier of the review to be deleted.

**Response**:
- **Status Code**: `204 No Content`  
  _Indicates the review was successfully deleted._

**Middleware Function**:
- `owlPostController.deleteReview`: Deletes the specified review entry from the database.

### Task 26: Retrieve All Quests (questRoutes.js, GET /quests)

**Description**: Retrieves a list of all available quests along with their details.

**Example Request Body**: _None required for this endpoint._

**Example Response Body**:
```json
[
  {
    "quest_id": 1,
    "quest_name": "Escape from the Forbidden Forest",
    "description": "Complete a 2.4km run within 15 minutes to dodge magical creatures and enchanted obstacles. Race against time to escape the dangers of the Forbidden Forest and prove your bravery!",
    "reward_points": 45,
    "completion_status": 0
  },
  {
    "quest_id": 2,
    "quest_name": "Golden Snitch Chase",
    "description": "Cycle 50km through challenging paths and tricky trails in pursuit of the elusive Golden Snitch. Navigate steep hills and sharp turns as you push your limits to capture the Snitch and achieve ultimate glory!",
    "reward_points": 90,
    "completion_status": 0
  }
]
```

**Middleware Function**:
- `questController.getAllQuests`: Fetches all available quests from the database.

### Task 27: Start a Quest (questRoutes.js, POST /quests/start/:questId/:userId)

**Description**: Allows a user to start a quest by providing the `questId` and `userId` in the URL parameters. Ensures the quest exists and the user has not already started the quest.

**Example Request Body**: _None required for this endpoint._

**URL Parameters**:
- `questId` (integer): The unique identifier of the quest to start.
- `userId` (integer): The unique identifier of the user starting the quest.

**Example Response Body**:
```json
{
  "quest_id": 1,
  "quest_name": "Escape from the Forbidden Forest",
  "description": "Complete a 2.4km run within 15 minutes to dodge magical creatures and enchanted obstacles. Race against time to escape the dangers of the Forbidden Forest and prove your bravery!",
  "status": "In Progress",
  "progress": "0 / 1 tasks completed"
}
```

**Middleware Functions**:
- `userController.checkUserById`: Verifies that the user exists in the database.
- `questController.checkQuestExistence`: Validates that the specified quest exists.
- `questController.checkQuestAvailability`: Ensures the user has not already started the quest.
- `questController.startQuest`: Marks the quest as started for the user in the database.
- `questController.displayQuestInfo`: Fetches and displays the details of the quest to the user.

### Task 28: Complete a Quest (questRoutes.js, POST /quests/:questId/:userId)

**Description**: Allows a user to complete a quest by providing the `questId` and `userId` in the URL parameters. Rewards the user with points upon successful completion.

**Example Request Body**: _None required for this endpoint._

**URL Parameters**:
- `questId` (integer): The unique identifier of the quest to complete.
- `userId` (integer): The unique identifier of the user completing the quest.

**Example Response Body**:
```json
{
  "user_id": "1",
  "status": "Completed",
  "progress": "1 / 1 tasks completed",
  "completion_date": "2024-12-30 06:18:44"
}
```

**Middleware Functions**:
- `userController.checkUserById`: Verifies that the user exists in the database.
- `questController.validateQuestId`: Ensures the provided questId is valid and exists.
- `questController.addUserCompletion`: Marks the quest as completed for the user in the database.
- `questController.fetchQuestRewardPoints`: Retrieves the reward points associated with the quest.
- `questController.addQuestRewardPoints`: Adds the quest's reward points to the user's total skillpoints.

### Task 29: Retrieve Quest Completion (questRoutes.js, GET /quests/questCompletion)

**Description**: Retrieves a list of all quest completions, including details about the user, quest, completion status, and timestamps.

**Example Request Body**: _None required for this endpoint._

**Example Response Body**:
```json
[
  {
    "user_quest_id": 1,
    "user_id": 1,
    "quest_id": 1,
    "status": "Completed",
    "progress": "1 / 1 tasks completed",
    "completion_date": "2025-01-02 09:17:55"
  },
  {
    "user_quest_id": 2,
    "user_id": 2,
    "quest_id": 2,
    "status": "Completed",
    "progress": "1 / 1 tasks completed",
    "completion_date": "2025-01-02 09:18:56"
  }
]
```

**Middleware Functions**:
- `questController.getAllQuestCompletion`: Fetches all quest completion records from the database, including user and quest details.

### Task 30: Retrieve Quest Completion by User ID (questRoutes.js, GET /quests/:user_id)

**Description**: Retrieves a list of quests completed by a specific user by providing the `user_id` in the URL parameter. Includes details about each quest and its completion status.

**Example Request Body**: _None required for this endpoint._

**URL Parameters**:
- `user_id` (integer): The unique identifier of the user whose quest completion details are being retrieved.

**Example Response Body**:
```json
[
  {
    "user_quest_id": 1,
    "user_id": 1,
    "quest_id": 1,
    "status": "Completed",
    "progress": "1 / 1 tasks completed",
    "completion_date": "2025-01-02 09:17:55"
  },
  {
    "user_quest_id": 4,
    "user_id": 1,
    "quest_id": 3,
    "status": "Completed",
    "progress": "1 / 1 tasks completed",
    "completion_date": "2025-01-02 09:20:46"
  }
]
```

**Middleware Functions**:
- `userController.checkUserById`: Verifies that the user exists in the database.
- `questController.getQuestCompletionById`: Fetches quest completion records for the specified user from the database.

### Task 31: Retrieve Activity History for a User (userRoutes.js, GET /users/userActivityHistory)

**Description**: Retrieves the activity history of a user, including completed challenges, duels, and other activities.

**Example Request Body**: _None required for this endpoint._

**URL Parameters**:
- `userId` (integer): The unique identifier of the user whose activity history is to be retrieved.

**Example Response Body**:
```json
[
  {
      "activity_type": "Quest",
      "activity_detail": "Completed quest: Escape from the Forbidden Forest",
      "activity_status": "Completed",
      "activity_date": "2024-12-29 15:14:30"
  },
  {
      "activity_type": "Duel",
      "activity_detail": "Duel with creature: Doxy",
      "activity_status": "Win",
      "activity_date": "2024-12-29 15:14:04"
  },
  {
      "activity_type": "House Selection",
      "activity_detail": "Chosen house: Gryffindor",
      "activity_status": null,
      "activity_date": "2024-12-29 15:12:31"
  }
]
```

**Middleware Functions**:
- `controller.checkUserById`: Verifies that the user exists in the database.
- `controller.getUserActivityHistory`: Fetches the user's activity history, including details of completed challenges, duels, and other actions.

### Task 32: Retrieve User Details (userRoutes.js, GET /users)

**Description**: Retrieves the details of a specific user.

**Example Request Body**: _None required for this endpoint._

**URL Parameters**:
- `userId` (integer): The unique identifier of the user whose details are to be retrieved.

**Example Response Body**:
```json
{
  "user_id": 1,
  "username": "HarryPotter",
  "skillpoints": 750,
  "user_health": 100
}
```

**Middleware Functions**:
- `controller.checkUserById`: Verifies that the user exists in the database and retrieves their details.

## Conclusion
This project combines the practicality of fitness tracking with the excitement of Harry Potter-inspired gamification. 
By engaging users through features like Hogwarts house sorting, magical duels, and skillpoint-based shops, it fosters a fun and interactive way to stay motivated. 
The modular structure of the application ensures maintainability, scalability, and ease of development.

## Author
- Yip Jay Ying (P2438276, DAAA/FT/1B/07)