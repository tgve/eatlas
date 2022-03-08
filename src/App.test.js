import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { BaseProvider, DarkTheme, LightTheme } from 'baseui';

import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('App - dark/light themes set', async () => {
  const m = shallow(<App />);
  expect(m.find(BaseProvider).prop('theme')).toEqual(DarkTheme);
  process.env.REACT_APP_DEFAULT_URL = "https://raw.githubusercontent.com/tgve/example-data/main/casualties_100.geojson"
  const { asFragment } = render(
    <BrowserRouter><App /></BrowserRouter>
  );
  console.log(asFragment())
  await waitFor(() => {
    expect(screen.getByText('Nothing to show')).toBeInTheDocument();
  });
  expect(asFragment()).toMatchSnapshot();

  const n = shallow(<App dark={false}/>);
  expect(n.find(BaseProvider).prop('theme')).toEqual(LightTheme);
  const appLight = renderer.create(
    <BrowserRouter><App dark={false}/></BrowserRouter>
  );
  expect(appLight.toJSON()).toMatchSnapshot();
})

test('App - API params set', () => {
  const m = shallow(<App/>).find('Welcome');
  expect(m.props().hideCharts).toEqual(undefined);
  expect(m.props().hideChartGenerator).toEqual(undefined);

  const n = shallow(<App hideCharts={true}/>)
    .find('Welcome');
  expect(n.props().hideCharts).toEqual(true);

})

test('App - API params ENV',() => {
  process.env.REACT_APP_DEFAULT_URL = "https://react.com"
  process.env.REACT_APP_GEOGRAPHY_URL = "geographyURL"
  process.env.REACT_APP_GEOGRAPHY_COLUMN = "geographyColumn"
  process.env.REACT_APP_COLUMN = "column"
  process.env.REACT_APP_TOOLTIP_COLUMNS = "tooltipColumns"
  process.env.REACT_APP_LAYER_NAME = "layerName"
  process.env.REACT_APP_DARK = true
  process.env.REACT_APP_HIDE_CHART_GENERATOR = true
  process.env.REACT_APP_HIDE_CHARTS = true
  process.env.REACT_APP_HIDE_SIDEBAR = true
  const m = shallow(<App />).find('Welcome');
  expect(m.props().defaultURL).toEqual("https://react.com");
  expect(m.props().geographyURL).toEqual("geographyURL");
  expect(m.props().geographyColumn).toEqual("geographyColumn");
  expect(m.props().column).toEqual("column");
  expect(m.props().tooltipColumns).toEqual("tooltipColumns");
  expect(m.props().layerName).toEqual("layerName");
  expect(m.props().dark).toEqual(true);
  expect(m.props().hideChartGenerator).toEqual(true);
  expect(m.props().hideCharts).toEqual(true);
  expect(m.props().hideSidebar).toEqual(true);
})

