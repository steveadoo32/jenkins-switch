var prompt = require("./prompt");
var jenkinsapi = require("jenkins-api");

module.exports = function(identifier, store, args, existingSettings, jenkins) {
  return addJob(identifier, store, args, existingSettings, jenkins);
};

function addJob(identifier, store, args, existingSettings, jenkins) {
  console.log("");
  console.log(`Removing job ${args.name} from config ${args.config}...`);

  var jobs = (existingSettings.jobs = existingSettings.jobs || {});

  // Older version when we didn't support configurations
  if (Array.isArray(jobs)) {
    jobs = existingSettings.jobs = {
      default: jobs
    };
  }

  if (!(args.config in jobs)) 
    jobs[args.config] = [];

  var configurationJobs = jobs[args.config];

  var index = configurationJobs.findIndex(j => j == args.name);
  if (index == -1) {
    console.log(`Job ${args.name} does not exist in configuration ${args.config}.`);
    return;
  }

  configurationJobs.splice(index, 1);
  store.set(identifier, existingSettings);

  console.log(`Removed job ${args.name} successfully from configuration ${args.config}.`);
}
