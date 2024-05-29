# Africagram Project

## Contexte du projet

Nous cherchons un développeur talentueux pour créer une API pour notre nouvelle application, Africagram, une plateforme de partage de photos dédiée aux Africains et créée par des Africains. Comme n'importe quel autre réseau social, les utilisateurs peuvent aimer et commenter les publications d'autres personnes. L'objectif principal est de développer une application innovante en garantissant la sécurité et la confidentialité des données.

## Business Requirements

- **Image Upload**: Les utilisateurs peuvent charger des images. Le système doit supporter différents formats et tailles de fichier.
- **Aime et Commentaire**: Les utilisateurs peuvent aimer et commenter les images. Affichez les aimes et commentaires.
- **Followers**: Les utilisateurs peuvent suivre d'autres utilisateurs.
- **News Feed**: Le système génère le fil d'actualité des images. Le fil d'actualité doit être trié en fonction de la date de la publication.
    - Affichez le News Feed (5 posts/load - utilisez la pagination de Prisma).
- **Authentification**: Chaque utilisateur doit s'authentifier pour accéder à son compte.
- **Analytics**: Récupérer des statistiques telles que le nombre total d'utilisateurs, le nombre d'utilisateurs par pays, le nombre moyen de publications/utilisateur, et la distribution des sexes. (Dashboard Admin)

## Technical Requirements

- Le système doit prendre en charge des formats d'images tels que JPEG, PNG, et GIF.
- La taille maximale pour chaque image est de 5MB.
- Authentification et autorisation basées sur des jetons (tokens: JWT).
- En 2015, Instagram a rencontré un problème technique affectant les comptes de certaines célébrités, dont celui de Justin Bieber, entraîné par un trafic massif de "aimes" sur Instagram. Cet afflux a surchargé les serveurs, entraînant des ralentissements du site et des crashs de l'application. Essayez de comprendre le problème et d'implémenter la solution proposée par Instagram (le lien de l'article est dans la section des ressources).

## Database Schema

- `utilisateur(#id, id_profile, firstname, lastname, email, password, isAdmin, date_creation, date_modification)`
- `profile(#id, id_utilisateur, sexe, pays, ville, date_creation, date_modification)`
- `post(#id, utilisateur_id, caption, date_creation, date_modification)`
- `aime(#id, utilisateur_id, post_id, date_creation)`
- `commentaire(#id, utilisateur_id, post_id, message, date_creation)`
- `follower(#id, following_id, follower_id, date_creation)`

## Endpoints de l'API

- Inscription d'un nouvel utilisateur
- Modification des données d'un utilisateur existant
- Connexion d'un utilisateur existant
- Déconnexion d'un utilisateur authentifié
- Récupérer les publications de l'utilisateur authentifié
- Créer une nouvelle publication
- Récupérer les statistiques de l'application

## BONUS

- Ajoutez une couche de sécurité supplémentaire à votre application en vérifiant les utilisateurs par un code de vérification envoyé par SMS ou par email (OTP verification).
- L'utilisateur doit pouvoir charger un maximum de 10 images/jour.
- Il doit être possible de visualiser les logs des différentes modifications effectuées.
- Endpoint pour récupérer le fil d'actualité des publications les plus récentes.
- Endpoint pour liker une publication.
- Endpoint pour suivre un utilisateur.
- Endpoint pour écrire un commentaire sur une publication.

Si vous êtes intéressé par ce projet et pensez avoir les compétences nécessaires, veuillez nous faire part de votre expérience et de votre tarif.
