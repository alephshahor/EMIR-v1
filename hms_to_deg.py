import csv 
import argparse


import numpy as np  
from astropy import units as u
from astropy.coordinates import Angle

parser = argparse.ArgumentParser(prog="dat_to_csv", description="Transform a .dat file into a .csv file")

parser.add_argument('input_file_path', help="The input .csv file full path ( hours / mins / seconds)")

parser.add_argument('out_file_path', help="The output .csv file full path ( deg )")

args = parser.parse_args()


input_path = args.input_file_path 
export_path = args.out_file_path

deg_coordinates = []

with open(input_path, 'r') as input_file:

    csv_reader = csv.reader(input_file)
    # We pass the header as we do not convert that.
    next(csv_reader)

    for line in csv_reader:
        line[0] = Angle(line[0]).degree
        line[1] = Angle(line[1]).degree
        deg_coordinates.append(line)


with open(export_path, "w", newline='') as output_file:
    writer = csv.writer(output_file)
    writer.writerows(deg_coordinates)