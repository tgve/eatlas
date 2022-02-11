// importing it other ways would cause minification issue.
import qs from 'qs';

// const TGVE_API = [
//   {column: 'string'},
//   {dark: 'boolean'},
//   {data: 'object'},
//   {defaultURL: 'string'},
//   {geographyColumn: 'string'},
//   {geographyURL: 'string'},
//   {hideChartGenerator: 'boolean'},
//   {hideCharts: 'boolean'},
//   {layerName: 'string'},
//   {leftSidebarContent: 'react'},
//   {tooltipColumns: 'object'},
//   {viewport: 'object'}
// ]

/**
 * Search parameters should take priority. Then comes 
 * component level parameters and finally ENV vars.
 * 
 * @param {*} props properties to extract APIs from
 * @param {*} search search query that can be parsed with qs
 * @returns {Object} of all valid or undefined TGVE API parameters.
 */
const params = function (props, search = "") {
  const qsr = typeof search === 'string' &&
    qs.parse(search.replace("?", ""))

  const { defaultURL, tooltipColumns, geographyURL,
    geographyColumn, column, data, layerName, dark,
    leftSidebarContent, viewport, hideChartGenerator,
    hideCharts, hideSidebar } = props;

  const staticData = document.getElementById('tgve-data')
    && document.getElementById('tgve-data').textContent
    && jsonStr(document.getElementById('tgve-data').textContent);

  const settings = document.getElementById('tgve-settings')
    && document.getElementById('tgve-settings').textContent
    && jsonStr(document.getElementById('tgve-settings').textContent);

  const apiValue = function (param, paramName, ENV_NAME, bool = false) {
    if (qsr.hasOwnProperty(paramName)) {
      return bool ? boolStr(qsr[paramName]) : qsr[paramName]
    } else if (bool && typeof param === 'boolean') {
      return param
    } else if (!bool && param) {
      return param
    } else if (settings.hasOwnProperty(paramName)) {
      return bool ? boolStr(settings[paramName]) : settings[paramName]
    } else if (process.env.hasOwnProperty(ENV_NAME)) {
      return bool ? boolStr(process.env[ENV_NAME]) : process.env[ENV_NAME]
    }
  }

  // if not correct type found return a default
  const expected = function (found, expected, def) {
    return typeof found === expected ? found : def
  }

  return ({
    defaultURL: apiValue(defaultURL, "defaultURL", "REACT_APP_DEFAULT_URL"),
    geographyURL: apiValue(geographyURL, "geographyURL", 
    "REACT_APP_GEOGRAPHY_URL"),
    geographyColumn: apiValue(geographyColumn, "geographyColumn", 
    "REACT_APP_GEOGRAPHY_COLUMN_NAME"),
    column: apiValue(column, "column", "REACT_APP_COLUMN_NAME"),
    tooltipColumns: apiValue(tooltipColumns, "tooltipColumns", 
    "REACT_APP_TOOLTIP_COLUMNS"),
    layerStyle: apiValue(layerName, "layerName", "REACT_APP_LAYER_NAME"),
    // if no boolean found set a default value
    dark: expected(apiValue(dark, "dark", "REACT_APP_DARK", true), 
      "boolean", true),
    hideChartGenerator: apiValue(hideChartGenerator, "hideChartGenerator",
      "REACT_APP_HIDE_CHART_GENERATOR", true),
    hideCharts: apiValue(hideCharts, "hideCharts", 
      "REACT_APP_HIDE_CHARTS", true),
    hideSidebar: apiValue(hideSidebar, "hideSidebar", 
      "REACT_APP_HIDE_SIDEBAR", true),
    viewport: jsonStr(qsr.viewport) || viewport || settings.viewport,
    data: jsonStr(qsr.data) || data || staticData,
    // react component
    leftSidebarContent,
  })
}

const boolStr = function (str) {
  if (str === 'true') return true
  if (str === 'false') return false
}

const jsonStr = function (str) {
  try {
    const json = JSON.parse(str);
    return json
  } catch (e) {
    return false;
  }
}

export {
  // TGVE_API,
  jsonStr,
  params
}