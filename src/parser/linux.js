/**
 * Parses each row in the arp table into { name, ip, mac } on linux.
 *
 * partially inspired by https://github.com/goliatone/arpscan/blob/master/lib/arpscanner.js
 */
module.exports = function parseLinux (row, servers, parseOne) {
  var result = {}

  // Ignore unresolved hosts.
  if (row === '' || row.indexOf('INCOMPLETE') >= 0) {
    return
  }

  var chunks = row.split(' ').filter(Boolean)
  if (parseOne) {
    result = prepareOne(chunks)
    console.log(chunks)
  } else {
    console.log(chunks)
    result = prepareAll(chunks)
  }

  // Only resolve external ips.
  if (!~servers.indexOf(result.ip)) {
    return
  }

  return result
}

function prepareOne (chunks) {
  return {
    name: '?', // a hostname is not provided on the raspberry pi (linux)
    ip: chunks[0],
    mac: chunks[2]
  }
}

function prepareAll (chunks) {
  return {
    ip: chunks[0],
    mac: chunks[4]
  }
}
