const parseMessage = message => message
  .split(';')
  .reduce((result, currentValue) => {
    let info = currentValue.split(':');

    if(info[0]) {
      result[info[0]] = info[1]
    }

    return result
  }, {})

exports.parseMessage = parseMessage