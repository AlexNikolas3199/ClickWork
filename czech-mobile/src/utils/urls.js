import personDefault from '..//assets/personDefault.png'

export const UPLOAD_URL='https://czech.itsea.space/static/'

export const getUploadURL = (image) => {
    return image ? { uri: UPLOAD_URL + image } : personDefault
}