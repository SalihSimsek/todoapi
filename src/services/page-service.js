const BaseService = require('./base-service')
const PageModel = require('../models/page-model')

class PageService extends BaseService {
    model = PageModel
}

module.exports = new PageService()