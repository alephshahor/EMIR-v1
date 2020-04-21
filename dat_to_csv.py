import csv 
import sys
import argparse


parser = argparse.ArgumentParser(prog="dat_to_csv", description="Transform a .dat file into a .csv file")

parser.add_argument('input_file_path', help="The input file location")

parser.add_argument('out_file_name', help="The output file name")

args = parser.parse_args()

file_path = args.input_file_path 
export_name = args.out_file_name

stripped_lines = []

for line in open(file_path).readlines():
    line = line.strip().split()
    stripped_lines.append(line)

with open("./" + export_name + ".csv", "w") as output_file:
    writer = csv.writer(output_file)
    writer.writerows(stripped_lines)
 