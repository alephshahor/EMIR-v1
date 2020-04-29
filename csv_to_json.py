import csv
import json
import argparse

parser = argparse.ArgumentParser(prog="csv_to_json", description="Transform a .csv file into a .json file")

parser.add_argument('input_file_path', help="The input .csv file full path")

parser.add_argument('out_file_path', help="The output .json file full path")

args = parser.parse_args()


input_path = args.input_file_path 
export_path = args.out_file_path

json_file = {}
json_data = []

with open(input_path, 'r') as input_file:

    csv_reader = csv.reader(input_file)

    for line in csv_reader:
        data = {}
        data['right_ascension'] = line[0]
        data['declination'] = line[1]
        data['priority'] = line[2]
        json_data.append(data)

json_file["data"] = json_data

#print(json.dumps(json_file, indent=4, sort_keys=True))

with open(export_path, 'w', encoding='utf-8') as export_file:
    json.dump(json_file, export_file, ensure_ascii=False, indent=4)




