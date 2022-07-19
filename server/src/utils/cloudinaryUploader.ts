// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dft2opinn',
  api_key: '498524886282183',
  api_secret: 'htvG9fGO8DA19ThFVtiCsq2AGXY',
  secure: true,
});
cloudinary.config();

export const uploadImage = async (
  imagePath: string,
  type: string,
): Promise<string | void> => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    resource_type: type,
  };
  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result.secure_url;
  } catch (error) {
    console.error('error:', error);
  }
};
