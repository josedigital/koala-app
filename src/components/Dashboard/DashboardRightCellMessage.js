import React, { Component } from 'react';

const DashboardRightCellMessage = ({ props}) => {
	return (
		<div>
			<p>'inside of DashboardRightCellMessage Component'</p>
            <h5>This cell can be removed as a default when we login to our dashboard, or we can mock up some "fake" notes to show what the page might look like when we login to our dashboard</h5>
		</div>
	)
}

export default DashboardRightCellMessage