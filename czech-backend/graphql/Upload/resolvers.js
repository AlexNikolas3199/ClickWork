const { processUpload } = require('../../utils/upload')

const Upload = {
    Mutation: {
      singleUpload: (_parent, { upload }, { prisma }) => {
        return processUpload(upload)
      },
      multiUpload: (_parent, { upload }, { prisma }) => {
        return upload.map(upload => processUpload (upload))
      }
    },
  }
  
  module.exports = {
    Upload,
  }
  