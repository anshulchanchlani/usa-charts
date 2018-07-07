import React from 'react';
import ReactDOM from 'react-dom';
import LineChartForJobs from './LineChartForJobs';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LineChartForJobs />, div);
  ReactDOM.unmountComponentAtNode(div);
});
