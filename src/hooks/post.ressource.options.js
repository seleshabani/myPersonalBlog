const uploadFeature = require('@admin-bro/upload')
const { postModel } = require('../model/posts');
const path = require('path');
const MyLocalProvider = require('./customProvider');

const postOptions = {
    resource: postModel,
    features: [uploadFeature({
        provider: new MyLocalProvider(path.join(__dirname,'../../public')),
        properties: {
            mimeType: ['image/jpeg', 'image/png'],
            key: 'image',
            bucket: 'imageBucket',
            // file: 'screenFile',
            // filePath: 'screenPath'
        },
        uploadPath: (record, filename) => (
            `uploads/${filename}`
        )
    })],
    options:{
        properties:{
            createdAt:{
                isVisible:false
            },
            image:{
                isVisible:false
            },
            imageBucket:{
                isVisible:false
            },
            markdown:{
                isVisible:{
                    list:false,edit:true
                },
                type:'richtext'
            },
            resume:{
                isVisible:{
                    list:false,edit:true
                },
                type:'textarea'
            },
        },
    }

}
module.exports = postOptions