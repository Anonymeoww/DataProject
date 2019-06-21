# !/usr/bin/env python
# Name:             Dilisha C. Jethoe
# Student number:   12523186
"""
This script cleans and preprocesses the data from the inputfile.
The cleaned data is written to a JSON file.
https://data.world/kcmillersean/billboard-hot-100-1958-2017
"""

import pandas as pd
import json
import datetime
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

client_credentials_manager = SpotifyClientCredentials("dc831a2841b340a3a1a1abffa4eae766",
                                                      "9b6361b104eb4f0794a12713d786ec20")
spotify = spotipy.Spotify(client_credentials_manager=client_credentials_manager)
INPUT_DATA = 'HotStuff.csv'

year_list = ['1958', '1959', '1960', '1961', '1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969', '1970',
             '1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981', '1982', '1983',
             '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996',
             '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009',
             '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018']


def get_week(datafile, year_list):
    # Load data from csv, create subset
    df = pd.read_csv(datafile)
    df = df[['WeekID', 'Week Position', 'Song','Performer']]
    pd.set_option('display.max_rows', 10)
    pd.set_option('display.max_columns', 7)
    yearly_df = df["WeekID"].str.split("/", n=2, expand=True)
    df["Month"] = yearly_df[0]
    df["Day"] = yearly_df[1]
    df["Year"] = yearly_df[2]
    df.drop(columns=["WeekID"], inplace=True)
    df["Year"] = pd.to_numeric(df["Year"])
    df.sort_values(by=["Year"], inplace=True)
    df["Year"] = df["Year"].astype(str)

    total_dict = {}
    for year in year_list:
        total_dict[year] = {}
        year_df = df.loc[df['Year'] == year]
        for index, row in year_df.iterrows():
            artist = row["Performer"]
            if "Featuring" in artist:
                new_artist = artist.split(" Featuring", 1)[0]
            else:
                new_artist = artist

            if new_artist not in total_dict[row["Year"]]:
                total_dict[row["Year"]][new_artist] = []

            tracker = False
            count = 0
            for track_obj in total_dict[row["Year"]][new_artist]:
                if row["Song"] == track_obj["name"]:
                    weeknr = datetime.date(int(row["Year"]), int(row["Month"]), int(row["Day"])).isocalendar()[1]
                    if weeknr > 52:
                        weeknr = weeknr - 52
                    total_dict[row["Year"]][new_artist][count]["values"][weeknr - 1]["pos"] = row["Week Position"]
                    tracker = True
                else:
                    count = count + 1
            if tracker == False:
                song_dict = {"name": row["Song"], "values": []}
                for i in range(52):
                    song_dict["values"].append({"week": i+1, "pos": 0})
                weeknr = datetime.date(int(row["Year"]), int(row["Month"]), int(row["Day"])).isocalendar()[1]
                if weeknr > 52:
                    weeknr = weeknr - 52
                song_dict["values"][weeknr-1]["pos"] = row["Week Position"]
                total_dict[row["Year"]][new_artist].append(song_dict)
        print(year)

    with open('positions.json', 'w') as outfile:
        json.dump(total_dict, outfile)


def data_cleaning(datafile, year_list):
    """
    This function selects and cleans the relevant data from the csv file.
    """

    # Load data from csv, create subset
    df = pd.read_csv(datafile, sep=";")
    pd.set_option('display.max_rows', 10)
    pd.set_option('display.max_columns', 5)
    print(df)

    df = df[['WeekID', 'Song','Performer']]
    # Split WeekID, year is 3rd column
    yearly_df = df["WeekID"].str.split("/", n=2, expand=True)
    # Add column 'Year' to dataframe
    df["Year"] = yearly_df[2]
    # Drop old column and drop duplicate rows
    df.drop(columns=["WeekID"], inplace=True)
    df.drop_duplicates(inplace=True)

    # year_dict = {}
    # for index, row in df.iterrows():
    #     if row["Year"] == "2018":
    #         title = row["Song"]
    #         year_dict[title] = {}
    #         year_dict[title]["Title"] = row["Song"]
    #         year_dict[title]["Artist"] = row["Performer"]
    #         year_dict[title]["Year"] = row["Year"]
    #         audio_features = get_features(row["Performer"], row["Song"])
    #         year_dict[title]["AF"] = audio_features
    #
    # print(year_dict)

    year_dict = {}
    for year in year_list:
        year_dict[year] = {}
        for index, row in df[:10].iterrows():
            if year == row["Year"]:
                title = row["Song"]
                year_dict[year][title] = {}
                year_dict[year][title]["Title"] = row["Song"]
                year_dict[year][title]["Artist"] = row["Performer"]
                year_dict[year][title]["Year"] = row["Year"]
                audio_features = get_features(row["Performer"], row["Song"])
                year_dict[year][title]["AF"] = audio_features
            print(index)
        print(year)

    return year_dict


def get_features(artist, track):
    if "Featuring" in artist:
        new_artist = artist.split(" Featuring", 1)[0]
    else:
        new_artist = artist
    if "\'" in track:
        new_track = track.replace("\'", "")
    else:
        new_track = track

    search_id = spotify.search(q='artist:' + new_artist + ' track:' + new_track, type='track',  limit=1)

    try:
        track_id = search_id["tracks"]["items"][0]["id"]
    except:
        try:
            track_title = extended_search(new_artist, track)
            search_id = spotify.search(q='artist:' + new_artist + ' track:' + track_title, type='track', limit=1)
            track_id = search_id["tracks"]["items"][0]["id"]
        except:
            track_id = 0

    if track_id == 0:
        audiof = [{'danceability': 0, 'energy': 0, 'key': 0, 'loudness': 0, 'mode': 0, 'speechiness': 0, 'acousticness': 0, 'instrumentalness': 0, 'liveness': 0, 'valence': 0, 'tempo': 0, 'type': 'audio_features', 'id': 0, 'uri': 0, 'track_href': 0, 'analysis_url': 0, 'duration_ms': 0, 'time_signature': 0}]
    else:
        audiof = spotify.audio_features([track_id])

    return audiof


def extended_search(new_artist, track):
    search_id = spotify.search(q='artist:' + new_artist, type='track',  limit=20)
    songtitles = []
    for id in range(20):
        songtitles.append(search_id["tracks"]["items"][id]["name"])

    split_track = track.split()
    split_len = len(split_track)
    accept_rate = 0.75*split_len

    for track in songtitles:
        count_accept = 0
        for word in split_track:
            if word in track:
                count_accept += 1

        if count_accept >= accept_rate:
            return track


def write_json(clean_data):
    """
    Writes the cleaned data to a JSON file with a structured orientation.
    """

    with open('hotstuff.json', 'w') as outfile:
        json.dump(clean_data, outfile)


def get_artist_genre(year_list):
    with open("hotstuff.json") as json_file:
        data = json.load(json_file)
        for year in year_list:
            for row in data[year]:
                artist = data[year][row]["Artist"]
                if "Featuring" in artist:
                    new_artist = artist.split(" Featuring", 1)[0]
                else:
                    new_artist = artist
                try:
                    artist_info = spotify.search(q='artist:' + new_artist, type='artist', limit=1)
                    genres = artist_info["artists"]["items"][0]["genres"]
                except:
                    genres = [0]

                data[year][row]["Genres"] = genres
            print(year)

    # with open("hotstuff2018.json") as json_file:
    #     data = json.load(json_file)
    #     for row in data:
    #         artist = data[row]["Artist"]
    #         if "Featuring" in artist:
    #             new_artist = artist.split(" Featuring", 1)[0]
    #         else:
    #             new_artist = artist
    #         try:
    #             artist_info = spotify.search(q='artist:' + new_artist, type='artist', limit=1)
    #             genres = artist_info["artists"]["items"][0]["genres"]
    #         except:
    #             genres = [0]
    #
    #         data[row]["Genres"] = genres

    with open('hotstuffwgenres.json', 'w') as outfile:
        json.dump(data, outfile)


if __name__ == "__main__":

    # clean_data = data_cleaning(INPUT_DATA)
    # write_json(clean_data)
    # get_artist_genre(year_list)
    get_week(INPUT_DATA, year_list)
