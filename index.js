const mqtt = require("mqtt")
const client = mqtt.connect("mqtt://test.mosquitto.org")

const get2Digits = (num) => num > 9 ? '' + num : '0' + num

const getTimestamp = (dt) => {
  let str = dt.getFullYear() + '-'
  str += get2Digits(dt.getMonth() + 1) + '-'
  str += get2Digits(dt.getDate()) + 'T'
  str += get2Digits(dt.getHours()) + ':'
  str += get2Digits(dt.getMinutes()) + ':'
  str += get2Digits(dt.getSeconds()) + '.'
  str += get2Digits(dt.getMilliseconds())
  const timeStr = dt.toTimeString()
  const index = timeStr.indexOf('GMT')
  const timeOffset = timeStr.substr(index + 3, 3) + ':00'
  str += timeOffset
  return str
}

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const data = {
  Timestamp: null,
  Records: null
}

const varNames = ['Var1', 'Var2', 'Var3']

const getValues = () => {
  data.Timestamp = getTimestamp(new Date())
  data.Records = []
  varNames.forEach((varName, index) => {
    data.Records.push({
      TagName: varName,
      Value: randomNumber(0, 100)
    })
  })
}

const setPublishing = () => {
  let counter = 1
  const interval = setInterval(() => {
    if (counter > 10) {
      clearInterval(interval)
      client.end()
      process.exit()
    }
    getValues()
    client.publish("ControlTechMQTTTopic", JSON.stringify(data))
    console.log(counter)
    counter ++
  }, 2000)
}

client.on("connect", () => {
  setPublishing()
});


// "2024-07-11T10:05:41.48317+02:00" - required timestamp format by FT Optix