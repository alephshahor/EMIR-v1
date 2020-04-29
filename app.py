import json
import argparse
import pandas as pd
from bokeh.plotting import ColumnDataSource, figure, output_file, show

parser = argparse.ArgumentParser(prog="app", description="")

parser.add_argument('input_file_path', help="The input .json file")

args = parser.parse_args()

input_path = args.input_file_path 


df = pd.read_csv(input_path)


output_file("app.html")
p = figure(background_fill_color="lightgrey")
p.circle(x='right_ascension', y='declination', size=5, alpha=0.7, source=df)

show(p)