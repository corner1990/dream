let immutable = require('immutable')
function invoke(obj) {
  obj.name = 'leo'
}

function handle () {
  let obj = immutable.fromJS({ name: 'hello' })
  invoke(obj)
  console.log(obj.get('name'))
}

handle()
