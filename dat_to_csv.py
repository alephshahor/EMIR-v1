import csv 
import argparse


parser = argparse.ArgumentParser(prog="dat_to_csv", description="Transform a .dat file into a .csv file")

parser.add_argument('input_file_path', help="The input file full path (.dat)")

parser.add_argument('out_file_path', help="The output file full path (.csv)")

args = parser.parse_args()

input_path = args.input_file_path 
export_path = args.out_file_path

stripped_lines = []

for line in open(input_path).readlines():
    line = line.strip().split()
    stripped_lines.append(line)

with open(export_path, "w", newline='') as output_path:
    writer = csv.writer(output_path)
    writer.writerows(stripped_lines)
