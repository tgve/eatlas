
eAtlas · [![Build Status](https://travis-ci.org/layik/eAtlas.svg)](https://travis-ci.org/layik/eAtlas) [![Project Status: WIP](https://www.repostatus.org/badges/latest/wip.svg)](https://www.repostatus.org/#wip) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#)
================================================================================================================================================================================================================================================================================================

Currently this is just a "WIP" as we explore and gather requirements of the project. The idea of an eAtlas is one by Sir Alan Wilson (Turing Institute):

> A key message from the Foresight Future of Cities Project is the importance of interdependence: between urban subsystems and between associated planning and policy challenges. ~ Sir Alan Wilson.

There are some [notes](https://github.com/layik/eAtlas/blob/master/notes/project_planning.md) to read. These are thoughts and background reading material as we take steps towards understanding what an "interdependent" eAtlas might be. Would it be "Turing Geovisualization Engine"?

This source code is a [geopumber](https://github.com/ATFutures/geoplumber) app. That means it is an R powered backend API (think Flask in Python) and a ReactJS front end.

To build, from an R console:

``` r
library(geoplumber)
gp_build()
```

Before you run the app:

-   you will need some preprocessed data, an RDS called "ac\_joined\_wy\_2009-2017.Rds".

-   you will need a Mapbox API key (will see if we can remove this) in `.env.local` file using variable name: `REACT_APP_MAPBOX_ACCESS_TOKEN = 'API_KEY'`

-   in production its better to change the `PRD_URL` in the `Constants.js` file.

Then you can run

``` r
library(geoplumber)
gp_plumb()
```

visit `localhost:8000`

or just run the front using (without any data loaded from local server): `npm i & npm start`

deploy with docker
------------------

Repo contains Dockerfile for production. This is again WIP.

``` sh
# Dockerfile manages your npm/React build steps
# REACT_APP_MAPBOX_ACCESS_TOKEN is required but app should run
docker build -t eatlas .
# then bind plumber's default 8000 port to any of your choice
docker run -d -p 8000:8001 --name eatlas eatlas
```

Use your favourite document server (nginx for example) to proxy requets (more later hopefully).

Screenshots/gif's
-----------------

<img width="100%" alt="eAtlas screen shot" src="https://user-images.githubusercontent.com/408568/66118004-44646f80-e5cd-11e9-98fa-c319c9b42bf3.png">
