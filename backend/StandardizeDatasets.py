# %%
# First file: data/airpollution/pollution.tif
# Second file: data/Temperature.TIFF

import rasterio
from rasterio.warp import reproject, Resampling
import numpy as np

# Paths to your files
properties_source_path = 'data/population.tif'
data_to_match_path = 'data/Temperature.TIFF'
output_path = 'data/std.tif'

# Open the source file to get its CRS, transform, dimensions, etc.
with rasterio.open(properties_source_path) as source_src:
    temp_crs = source_src.crs
    temp_transform = source_src.transform
    temp_width = source_src.width
    temp_height = source_src.height
    temp_meta = source_src.meta.copy()

# Open the file you want to standardize to the source
with rasterio.open(data_to_match_path) as match_src:
    pollution_crs = match_src.crs
    pollution_transform = match_src.transform
    pollution_data = match_src.read(1)
    pollution_dtype = match_src.dtypes[0]

# Create an empty array with the same shape as the source raster
destination = np.empty((temp_height, temp_width), dtype=pollution_dtype)

# Reproject and resample the pollution data to match the source raster
reproject(
    source=pollution_data,
    destination=destination,
    src_transform=pollution_transform,
    src_crs=pollution_crs,
    dst_transform=temp_transform,
    dst_crs=temp_crs,
    resampling=Resampling.nearest 
)

# Update the metadata to match the source raster
out_meta = temp_meta.copy()
out_meta.update({
    "driver": "GTiff",
    "dtype": pollution_dtype
})

# Save the standardized output raster
with rasterio.open(output_path, "w", **out_meta) as dest:
    dest.write(destination, 1)

print("Standardization complete. Saved to:", output_path)



# %%
# load pollution_standardized.tif and Temperature.TIFF

import rasterio
import numpy as np
import matplotlib.pyplot as plt

# Load the standardized pollution data

pollution_path = 'data/pollution_standardized.tif'
temperature_path = 'data/Temperature.TIFF'
popilation_path = 'data/population_standardized.tif'
vegeation_path = 'data/vegetation_standardized.tif'


# Plot the data

# Open the standardized pollution data

with rasterio.open(pollution_path) as src:
    pollution_data = src.read(1)
    pollution_transform = src.transform
    pollution_crs = src

# Open the temperature data

with rasterio.open(temperature_path) as src:
    temperature_data = src.read(1)
    temperature_transform = src.transform
    temperature_crs = src

# Open the population data

with rasterio.open(popilation_path) as src:
    population_data = src.read(1)
    population_transform = src.transform
    population_crs = src

# Open the vegetation data

with rasterio.open(vegeation_path) as src:
    vegetation_data = src.read(1)
    vegetation_transform = src.transform
    vegetation_crs = src

# Plot the data

fig, ax = plt.subplots(figsize=(10, 10))

# Plot the temperature data
im1 = ax.imshow(temperature_data, cmap='coolwarm', alpha=0.5)

# Plot the pollution data

im2 = ax.imshow(pollution_data, cmap='viridis', alpha=0.5)

# Plot the population data

im3 = ax.imshow(population_data, cmap='viridis', alpha=0.5)

# Plot the vegetation data

im4 = ax.imshow(vegetation_data, cmap='viridis', alpha=0.5)

# Add a colorbar for each layer

cbar1 = plt.colorbar(im1, ax=ax, orientation='horizontal', shrink=0.6)
cbar1.set_label('Temperature (K)')
cbar2 = plt.colorbar(im2, ax=ax, orientation='horizontal', shrink=0.6)
cbar2.set_label('Pollution')
cbar3 = plt.colorbar(im3, ax=ax, orientation='horizontal', shrink=0.6)
cbar3.set_label('Population')
cbar4 = plt.colorbar(im4, ax=ax, orientation='horizontal', shrink=0.6)
cbar4.set_label('Vegetation')

# Add titles and labels
ax.set_title('Overlay of Temperature and Pollution Data')

plt.axis('off')

plt.show()

# %%
import rasterio
import numpy as np
import pandas as pd
from rasterio.windows import Window
from pyproj import Transformer

# List your standardized raster files
raster_files = [
    #'data/pollution_standardized.tif',
    'data/Temperature_Float.TIFF'#,
    #'data/population_standardized.tif',
    #'data/vegetation_standardized.tif'
]

for raster_file in raster_files:
    with rasterio.open(raster_file) as src:
        if src.crs != 'EPSG:4326':
            transformer = Transformer.from_crs(src.crs, 'EPSG:4326', always_xy=True)
        else:
            transformer = None
        
        df_list = []
        
        for ji, window in src.block_windows(1):
            data = src.read(1, window=window)
            nodata = src.nodata
            if nodata is not None:
                mask = data != nodata
            else:
                mask = np.ones(data.shape, dtype=bool)
            
            rows, cols = np.where(mask)
            if len(rows) == 0:
                continue  
            
            rows += window.row_off
            cols += window.col_off
            
            xs, ys = rasterio.transform.xy(src.transform, rows, cols)
            xs = np.array(xs)
            ys = np.array(ys)
            
            if transformer:
                longs, lats = transformer.transform(xs, ys)
            else:
                longs, lats = xs, ys
            
            values = data[mask]
            
            temp_df = pd.DataFrame({
                'latitude': lats,
                'longitude': longs,
                'value': values
            })
            df_list.append(temp_df)
        
        df = pd.concat(df_list, ignore_index=True)
        
        # Save to CSV
        output_csv = raster_file.rsplit('.', 1)[0] + '.csv'
        df.to_csv(output_csv, index=False)
        print(f"Exported {output_csv}")


# %%



