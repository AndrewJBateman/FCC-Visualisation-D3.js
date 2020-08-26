# :zap: FCC Visualisation D3

* D3.js used to visualise json US GDP data in a HTML bar chart
* This was a [FreeCodeCamp Data Visualisation Project](https://www.freecodecamp.org/learn/data-visualization/data-visualization-projects/visualize-data-with-a-bar-chart) for Front End Certification that is still in the FCC curriculum with the same json data file

*** Note: to open web links in a new window use: _ctrl+click on link_**

## :page_facing_up: Table of contents

* [:zap: FCC Visualisation D3](#zap-fcc-visualisation-d3)
  * [:page_facing_up: Table of contents](#page_facing_up-table-of-contents)
  * [:books: General info](#books-general-info)
  * [:camera: Screenshots](#camera-screenshots)
  * [:signal_strength: Technologies](#signal_strength-technologies)
  * [:floppy_disk: Setup](#floppy_disk-setup)
  * [:computer: Code Examples](#computer-code-examples)
  * [:cool: Features](#cool-features)
  * [:clipboard: Status & To-Do List](#clipboard-status--to-do-list)
  * [:clap: Inspiration](#clap-inspiration)
  * [:envelope: Contact](#envelope-contact)

## :books: General info

* D3.js binds the [FCC json graph data](https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json) to the Document Object Model
* Minified D3 is loaded directly from d3js.org using: `<script src="https://d3js.org/d3.v5.min.js"></script>`

## :camera: Screenshots

![Example screenshot](./img/plot.png).
![Example screenshot](./img/postman.png).

## :signal_strength: Technologies

* [D3.js v5](https://d3js.org/) Data Driven Documents (D3) JavaScript library for manipulating documents based on data

## :floppy_disk: Setup

* Open  'index.html' in terminal to run program

## :computer: Code Examples

* extract from `script.js` to add a tooltip so a pink box appears over each graph bar with text during a mouseover event

```javascript
tooltip
	.style('opacity', 0.8)
	.style('left', d3.event.pageX - 60 + 'px')
	.style('top', d3.event.pageY - 100 + 'px')
	.attr('id', 'tooltip')
	.attr('data-date', d[0])
	.attr('data-gdp', d[1])

	.html(
		'Date: ' + displayDate + '<br>' + ' GDP: $' + d[1] + ' billion'
	);
```

## :cool: Features

* D3.js works with web standards so no plugins etc. required, just browser
* D3.js has a rich toolset for data-driven visuals

## :clipboard: Status & To-Do List

* Status: Working
* To-Do: nothing

## :clap: Inspiration

* [FreeCodeCamp Data Visualisation Project](https://www.freecodecamp.org/learn/data-visualization/data-visualization-projects/visualize-data-with-a-bar-chart)
* [Code within d3.json() callback is not executed](https://stackoverflow.com/questions/49768165/code-within-d3-json-callback-is-not-executed)

## :envelope: Contact

* Repo created by [ABateman](https://www.andrewbateman.org) - you are welcome to [send me a message](https://andrewbateman.org/contact)
