const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

const jsonReport = path.join(__dirname, '..', 'reports', 'cucumber.json');
const htmlReport = path.join(__dirname, '..', 'reports', 'cucumber_report.html');

if (!fs.existsSync(jsonReport)) {
  console.error('JSON report not found:', jsonReport);
  process.exit(1);
}

const options = {
  theme: 'bootstrap',
  jsonFile: jsonReport,
  output: htmlReport,
  reportSuiteAsScenarios: true,
  launchReport: false,
};

reporter.generate(options);
console.log('HTML report generated at', htmlReport);
