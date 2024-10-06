# Space Invading Unicorns
![Space Invading Unicorns -logo](/client/spaceinvadingunicorns.png)

## Project Description
This project is made for the local Space Apps Challenge 2024 hackathon in Gothenburg, Sweden. Our chosen challenge is called **Community Mapping**, where we decided to visualise data from NASA for the user to find out their most suitable place of living. The data we use includes air pollution, temperature, vegetation and population density levels all over the world. The user can set their preferences in these categories and choose the priority for each theme. Based on the user's choices and the data provided by NASA the app will find the most suitable place for this user and display it for them.

To do this we built a web app using FastAPI and a machine learning algorithm in Python for the backend, and React with Vite and Tailwind for the frontend. Our data was provided by NASA's Environmental Justice Data Search Interface (see [Data Sources](#data-sources)). The data was then standardised to have all the values in the same place for each dataset.

## How to Install and Run the Project
### Clone the repository
Clone the repository by running the following command in the terminal inside the desired folder:
```
git clone
```

### Install npm
You can install npm by running the following commands inside your repository folder:
```
cd client
npm i
```

Make sure you have Python installed before the next step!

### Running the Backend
To run the backend, run the following commands and leave the terminal running:
```
cd backend
python
```

### Running the Frontend
To run the frontend, run the following commands and leave the terminal running:
```
cd client
npm run dev
```

## How to Use the Project
After running both the backend and the frontend you can use the project as a web app on your browser. You can choose your preferences by sliding the slider to your preferred spot and choosing the priority of the specific filter. Once you have entered your preferences you can press the button Find a place, and the web app will show you what place in the world would be most suitable for you to live in depending on your preferences.

## Data Sources
- [Air Pollution data](https://sciencediscoveryengine.nasa.gov/app/nasa-sba-ej/#/ej/results/preview?id=%2FEJ%2FEJ-data%2F%7Cda2124334d06f3fb5bdf7c6ef6f3eb9f&focus=Health%20%26%20Air%20Quality&query=%7B%22name%22:%22query_ej_primary%22,%22text%22:%22pm2.5%22%7D) (Retrieved 5/10/2024)
- [Temperature data](https://sciencediscoveryengine.nasa.gov/app/nasa-sba-ej/#/ej/results/preview?id=%2FEJ%2FEJ-data%2F%7Cb509bb614612287d9f66850a00c27990&focus=Extreme%20Heat&query=%7B%22name%22:%22query_ej_primary%22,%22text%22:%22plant%22,%22filters%22:%5B%22or%22,%22%22,%5B%22%22,%22Path%20B%22,%22sourcestr52%22,%22path%20b%22%5D,%5B%22%22,%22Path%20C%22,%22sourcestr52%22,%22path%20c%22%5D,%5B%22%22,%22Path%20A%22,%22sourcestr52%22,%22path%20a%22%5D%5D%7D) (Retrieved 5/10/2024)
- [Vegetation data](https://lpdaac.usgs.gov/products/vcf5kyrv001/) _ie. Tree Coverage_ (Retrieved 5/10/2024)
- [Population Density data](https://sedac.ciesin.columbia.edu/data/set/gpw-v4-population-density-rev11) (Retrieved 5/10/2024)

## Diagrams

![Sequence Diagram](https://i.imgur.com/zaDF2Ef.png)

![Component Diagram](https://i.imgur.com/8qGEYkk.jpeg)

## Authors and Contributions
### Backend Team
- Alexander Helsing
- Stefan Ingimarsson
### Data Team
- Jan Lange
- Julius Lilie
### Frontend Team
- Anna Mäkinen
- Johan Sandgren
