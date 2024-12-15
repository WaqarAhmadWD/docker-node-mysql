exports.getFileUrl = async (file, req) => {
  try {
    console.log('inside file url', file);
    const devBaseUrl = 'http://192.168.18.26:8080';
    const filePath = `/uploads/images/${file}`;
    console.log('=>>>>>>>>>>>>>>>>>>>>>>>>>>>>', filePath);
    console.log('=>>>>>>>>>>>>>>>>>>>>>>>>>>>>', devBaseUrl + filePath);

    // return baseUrl + filePath;
    return devBaseUrl + filePath;
  } catch (error) {
    throw new Error(error);
  }
};