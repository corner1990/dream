// 那数据
process.on('message', msg => {
  console.log('process', msg)
  process.send(msg.name + 'hahahah')
})