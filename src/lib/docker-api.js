const pify = require('pify-proto')
const docker = pify(require('docker-remote-api')())

const getImage = (nameOrId) => docker.get(`/images/${nameOrId}/json`, {json: true})
const getImages = () => docker.get('/images/json', {json: true})
const getContainers = () => docket.get('/containers', {json: true})
const getContainer = (nameOrId) => docker.get(`/containers/${nameOrId}/json`, {json: true})
const rmi = (id) => docker.delete(`/images/${id}`, {json: true})

module.exports = {
  getImage,
  getImages,
  getContainers,
  getContainer,
  rmi
}
