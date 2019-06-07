## Process Book

### Week 1 - Day 4 (June 6)
I managed to delete all duplicates from my first dataset and I used Spotipy to get all audio features for the songs. I now have enough data for the bubble chart and the radar chart.
Unfortunately, the search function in Spotipy (that generates query's to send through the API) doesn't work perfectly with my method. I am aware that I am missing some data, I am not yet sure how much that is.

### Week 1 - Day 3 (June 5)
#### Standup
Today I shared my process so far with the team. *Leo* asked me how long it takes to get the audio features for the songs, because one request takes max 50 track id's. We calculated it would be a total of 17 hours, which is a lot. <br>
#### Progress
I asked Nigel why there were no duplicates in my JSON-file. It turns out that I had accidentally overwritten them, which was nice. It did make me realize that deleting the duplicates from the dataframe can save a lot of time, also for adding the audio features. <br>
Nigel also gave me a great idea for filtering the genre of the songs. He told me I can assign a class to each song with the genre and simply change the opacity when some checkboxes are clicked.

### Week 1 - Day 2 (June 4)
Today I finished my Design Document. I included my ideas for preprocessing and formatting the data and the functions I think I will need. <br> <br>
I also managed to clean half of the data and created the first of two JSON-files from the CSV. I will try to add the audio features to this file tomorrow. I realized that I did not delete any duplicates from the CSV. I loaded the JSON-file in my JS-file and logged it in the console. I couldn't find any duplicates there, wondering if I just made a big mistake or it accidentally turned out fine.

### Week 1 - Day 1 (June 3)
Today I changed my proposal for the last time. It turned out that one of the visuals in my design sketch was not linked with the other two. So I discussed this with Nigel, and decided to use the Radio Chart for displaying information about the selected song. I swapped the Bar Chart with a Line Graph that shows information about the position of the songs from the selected artist in the Hot 100. <br> <br>
I made great progress in testing the Spotipy library as well. I managed to find all the audio features of a song, when giving the song title and artist name. I think I can read these from the CSV file that I have, but I will see that tomorrow. <br> <br>
Also, I started working on my design document, just writing down some ideas to work on tomorrow.
