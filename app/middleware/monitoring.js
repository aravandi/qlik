const client = require('prom-client');

const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;
const register = new Registry();
register.setDefaultLabels({
    app: 'qlik'
  })
collectDefaultMetrics({ register });

const requestsCounter = new client.Counter({
  name: 'requests',
  help: 'Total number of requests.',
  registers: [register]
});

const errorsCounter = new client.Counter({
  name: 'errors',
  help: 'Total number of errors.',
  registers: [register]
});

module.exports = requestCounter = (req, res, next) => {

  if(req.path == "/health"){
    var respons={
      cpu: register.getSingleMetric("process_cpu_seconds_total").hashMap[""].value,
      memory: register.getSingleMetric("process_resident_memory_bytes").hashMap[""].value,
      totalRequstes: register.getSingleMetric("requests").hashMap[""].value,
      totalErrors: register.getSingleMetric("errors").hashMap[""].value
    }
    res.json(respons)
  }else if(res.statusMessage){
    if(res.statusCode < 200 || res.statusCode >= 300) {
      errorsCounter.inc(1)
    }
  }else{
    requestsCounter.inc(1);    
    next()
  }
}