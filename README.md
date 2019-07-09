## Raddit

Raddit is a Reddit clone that leverages React and the Reddit API.

## Setup

The Reddit API requires Oauth2 to fetch data. The following steps need to be taken to setup Raddit with the right configuration.

### Create a Reddit authorized app

Go to [Reddit Authorized Apps](https://www.reddit.com/prefs/apps) and create a new script app. The `redirect_uri` field should be set to `https://not-an-aardvark.github.io/reddit-oauth-helper/` for the next step to work correctly. Other than the name, all the other fields can be left blank.

### Get an access token

Go to [Reddit OAuth Helper](https://not-an-aardvark.github.io/reddit-oauth-helper/) to generate the token. The page will require the client id and secret from the Reddit page. Check the `permanent?` box. 

Currently, the app requires the following permissions from Reddit:
- read
- save
- vote

Finally click the generate button to get the access and refresh tokens.

### Setup the project

Create a new file called `.env.local` or modify `.env` on the root directory. The following contents should be filled out and replaced with the appropriate values from the steps above:
```
REACT_APP_CLIENT_ID=reddit_client_id
REACT_APP_CLIENT_SECRET=reddit_client_secret
REACT_APP_REFRESH_TOKEN=reddit_refresh_token
```

### Start the project

Run the following commands to install the dependencies and start the server on `http://localhost:3000`
```
npm install
npm start
```