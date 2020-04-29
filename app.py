import json
import argparse
import pandas as pd
from bokeh.plotting import ColumnDataSource, figure, output_file, show
from bokeh.models import ColumnDataSource, CustomJS
from bokeh.models.tools import BoxEditTool
from bokeh.layouts import row

parser = argparse.ArgumentParser(prog="app", description="")

parser.add_argument('input_file_path', help="The input .json file")

args = parser.parse_args()

input_path = args.input_file_path 

selection_region_source = ColumnDataSource({
    'x': [0], 'y': [0], 'width': [0.5],
    'height': [0.5], 'alpha': [0.5]
})

df = pd.read_csv(input_path)

output_file("app.html")
s1 = ColumnDataSource(data=df)
f1 = figure(background_fill_color="lightgrey", title="Stellar points")
r1 = f1.rect('x', 'y', 'width', 'height', source=selection_region_source, alpha='alpha')
tool = BoxEditTool(renderers=[r1])
f1.add_tools(tool)
f1.circle(x='right_ascension', y='declination', size=5, alpha=0.7,  source=s1)
#f1.quad(top=[0.5], bottom=[1], left=[0.5], right=[1])


s2 = ColumnDataSource(data=dict(x=[], y=[]))
f2 = figure(tools="", title="Watch Here")
f2.circle('x', 'y', source=s2, alpha=0.6) 

#print(s1.data['right_ascension'][0])


s1.selected.js_on_change('indices', CustomJS(args=dict(s1=s1, s2=s2), code="""

        var inds = cb_obj.indices;
        var d1 = s1.data;
        var d2 = s2.data;
        d2['x'] = []
        d2['y'] = []
        for (var i = 0; i < inds.length; i++) {
            d2['x'].push(d1['right_ascension'][inds[i]])
            d2['y'].push(d1['declination'][inds[i]])
        }
        s2.change.emit();
    """)
)

layout = row(f1, f2)
show(layout)