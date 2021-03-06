d3.json(
	'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json'
)
	.then((res) => {
		console.log('data: ', res.data);
		const data = res.data;
		//define area of graph
		const totalHeight = 550,
			totalWidth = 925,
			margin = { top: 20, right: 30, bottom: 40, left: 60 },
			width = totalWidth - margin.left - margin.right, //925 - 60 - 30 = 835
			height = totalHeight - margin.top - margin.bottom; //550 - 20 - 40 = 490

		//define date limits for x axis
		const minDate = new Date(data[0][0]),
			maxDate = new Date(data[data.length - 1][0]);

		//define width of bar
		const barWidth = width / data.length; //835 / 275
		//console.log(data.length) //275
		//console.log(barWidth) //3.036363636

		//Define ranges for x and y axes
		const xScale = d3.scaleTime().domain([minDate, maxDate]).range([0, width]);

		const yScale = d3
			.scaleLinear()
			.domain([0, d3.max(data, (d) => d[1])])
			.range([height, 0]);

		//Define x and y axes
		const xAxis = d3
			.axisBottom(xScale)
			.tickFormat(d3.timeFormat('%Y'))
			.ticks(30);

		const yAxis = d3.axisLeft(yScale).ticks(18);

		const display = d3
			.select('.display')
			.attr('width', totalWidth)
			.attr('height', totalHeight)
			.append('g')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		const bar = display.selectAll('g').data(data).enter().append('g');

		bar
			.append('rect')
			.data(data)
			.style('fill', 'steelblue')
			.classed('bar', 'true')
			.attr('width', barWidth)
			.attr('height', (d) => height - yScale(d[1]))
			.attr('x', (d, i) => barWidth * i)
			.attr('y', (d, i) => yScale(d[1]))
			.attr('data-date', (d, i) => d[0])
			.attr('data-gdp', (d) => d[1])

			//mouseover and mouseout functions - dont allow ES6 fat arrow functions
			.on('mouseover', function (d, i) {
				const quarter = new Array(
					'Q1',
					'Q1',
					'Q1',
					'Q2',
					'Q2',
					'Q2',
					'Q3',
					'Q3',
					'Q3',
					'Q4',
					'Q4',
					'Q4'
				);
				const dataDate = new Date(d[0]);
				const dataMonth = dataDate.getMonth();
				const dataYear = dataDate.getFullYear();
				const displayDate = quarter[dataMonth] + ' ' + dataYear;

				d3.select(this).style('fill', 'pink').attr('width', 20);

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
			})

			.on('mouseout', function (d, i) {
				d3.select(this).style('fill', 'steelblue').attr('width', barWidth);
				tooltip.style('opacity', 0);
			});
		//Add tooltip
		const tooltip = d3
			.select('#graph')
			.append('div')
			.attr('id', 'tooltip')
			.style('z-index', 10)
			.style('opacity', 0)
			.text('tooltip');
		//display x axis
		display
			.append('g')
			.attr('id', 'x-axis')
			.attr('transform', 'translate(0,' + height + ')')
			.call(xAxis);
		//display y axis
		display.append('g').attr('id', 'y-axis').call(yAxis);

		//add x axis label group of elements
		display
			.append('g')
			.append('text')
			.attr('y', totalHeight - margin.bottom)
			.attr('dy', '1em')
			.style('font-size', '16px')
			.attr('fill', 'blue')
			.text('Year');
		//add y axis label group of elements
		display
			.append('g')
			.append('text')
			.attr('x', -140)
			.attr('dy', '-2.8em')
			.attr('transform', 'rotate(-90)')
			.style('font-size', '16px')
			.attr('fill', 'blue')
			.text('GDP in billions of $s');

		d3.selectAll('rect');
	})
	.catch((error) => {
		console.log('error', error);
	});

/* d3.json(
	'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json',
	(err, res) => {
		if (err) {
			console.log('error: ', err);
		}
		const data = res.data;
		console.log('data: ', data);

		//define area of graph
		const totalHeight = 550,
			totalWidth = 925,
			margin = { top: 20, right: 30, bottom: 40, left: 60 },
			width = totalWidth - margin.left - margin.right, //925 - 60 - 30 = 835
			height = totalHeight - margin.top - margin.bottom; //550 - 20 - 40 = 490

		//define date limits for x axis
		const minDate = new Date(data[0][0]),
			maxDate = new Date(data[data.length - 1][0]);

		//define width of bar
		const barWidth = width / data.length; //835 / 275
		//console.log(data.length) //275
		//console.log(barWidth) //3.036363636

		//Define ranges for x and y axes
		const xScale = d3.scaleTime().domain([minDate, maxDate]).range([0, width]);

		const yScale = d3
			.scaleLinear()
			.domain([0, d3.max(data, (d) => d[1])])
			.range([height, 0]);

		//Define x and y axes
		const xAxis = d3
			.axisBottom(xScale)
			.tickFormat(d3.timeFormat('%Y'))
			.ticks(30);

		const yAxis = d3.axisLeft(yScale).ticks(18);

		const display = d3
			.select('.display')
			.attr('width', totalWidth)
			.attr('height', totalHeight)
			.append('g')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		const bar = display.selectAll('g').data(data).enter().append('g');

		bar
			.append('rect')
			.data(data)
			.style('fill', 'steelblue')
			.classed('bar', 'true')
			.attr('width', barWidth)
			.attr('height', (d) => height - yScale(d[1]))
			.attr('x', (d, i) => barWidth * i)
			.attr('y', (d, i) => yScale(d[1]))
			.attr('data-date', (d, i) => d[0])
			.attr('data-gdp', (d) => d[1])

			//mouseover and mouseout functions - dont allow ES6 fat arrow functions
			.on('mouseover', function (d, i) {
				const quarter = new Array(
					'Q1',
					'Q1',
					'Q1',
					'Q2',
					'Q2',
					'Q2',
					'Q3',
					'Q3',
					'Q3',
					'Q4',
					'Q4',
					'Q4'
				);
				const dataDate = new Date(d[0]);
				const dataMonth = dataDate.getMonth();
				const dataYear = dataDate.getFullYear();
				const displayDate = quarter[dataMonth] + ' ' + dataYear;

				d3.select(this).style('fill', 'pink').attr('width', 20);

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
			})

			.on('mouseout', function (d, i) {
				d3.select(this).style('fill', 'steelblue').attr('width', barWidth);
				tooltip.style('opacity', 0);
			});
		//Add tooltip
		const tooltip = d3
			.select('#graph')
			.append('div')
			.attr('id', 'tooltip')
			.style('z-index', 10)
			.style('opacity', 0)
			.text('tooltip');
		//display x axis
		display
			.append('g')
			.attr('id', 'x-axis')
			.attr('transform', 'translate(0,' + height + ')')
			.call(xAxis);
		//display y axis
		display.append('g').attr('id', 'y-axis').call(yAxis);

		//add x axis label group of elements
		display
			.append('g')
			.append('text')
			.attr('y', totalHeight - margin.bottom)
			.attr('dy', '1em')
			.style('font-size', '16px')
			.attr('fill', 'blue')
			.text('Year');
		//add y axis label group of elements
		display
			.append('g')
			.append('text')
			.attr('x', -140)
			.attr('dy', '-2.8em')
			.attr('transform', 'rotate(-90)')
			.style('font-size', '16px')
			.attr('fill', 'blue')
			.text('GDP in billions of $s');

		d3.selectAll('rect');
	}
); */
