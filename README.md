# Memory-Card-Game
Its a mini memory game in which user can pick two cards at a time and if both are same then they will be removed from the display.



-	The landing page will display a grid (4x4) of cards initially laid face down. 
-	Each card hides an image that can be revealed by clicking on the card.
-	The grid has unique pairs of distinct images (8 pairs for a 4x4 grid).
-	Images should display avatars provided by [dicebear http API](https://avatars.dicebear.com/docs/http-api). 

    Example:
    ``` html
    <img src="https://avatars.dicebear.com/api/bottts/seed-9.svg" height="auto" width={96} alt="Avatar" />
    ```
-	A countdown timer (30 seconds) is displayed on top of the grid and starts when the first card is revealed.
-	When a user reveals two cards, two outcomes are possible: 
    -   If both card images match, they remain revealed for the rest of the game.
    -   Otherwise, these two cards are turned face down again 0.5 second after the second card was revealed.
-	The game ends when the last pair is revealed or when the time runs out.
-	The remaining seconds is considered to be the user score and will be displayed at the end with a “Play again” button.




#Screens:  



