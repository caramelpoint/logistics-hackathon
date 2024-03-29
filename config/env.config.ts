interface GoogleCloudConfig {
  apiKey: string
}
interface SmartContractConfig {
  infuraKey: string
  adminContractAddress: string
  privateKeyAdminAddress: string
  logisticContractAddress: string
  transactionDetailUrl: string
}
interface AwsConfig {
  accessKey: string
  secretKey: string
  region: string
  clientId: string
  userPoolId: string
  identityPoolId: string
}

const googleCloudConfig: GoogleCloudConfig = {
  apiKey: process.env.LOGISTICS_GOOGLE_API_KEY || '',
}

const awsConfig: AwsConfig = {
  accessKey: process.env.LOGISTICS_ACCESS_KEY || '',
  secretKey: process.env.LOGISTICS_SECRET_KEY || '',
  region: process.env.LOGISTICS_REGION || '',
  clientId: process.env.LOGISTICS_AWSCOGNITO_APP || '',
  userPoolId: process.env.LOGISTICS_AWSCOGNITO_ID || '',
  identityPoolId: process.env.LOGISTICS_AWSCOGNITO_IDENTITY_POOL || '',
}

const smartContractConfig: SmartContractConfig = {
  adminContractAddress: process.env.LOGISTICS_ADMIN_ADDRESS || '',
  privateKeyAdminAddress: process.env.LOGISTICS_PK_ADMIN_ADDRESS || '',
  logisticContractAddress: process.env.LOGISTICS_LOGISTIC_CONTRACT_ADDRESS || '',
  infuraKey: process.env.LOGISTICS_INFURA_KEY || '',
  transactionDetailUrl: process.env.LOGISTICS_TRANSACTION_DETAIL_URL || '',
}

export const config: {
  googleCloudConfig: GoogleCloudConfig
  awsConfig: AwsConfig
  smartContractConfig: SmartContractConfig
} = {
  googleCloudConfig: googleCloudConfig,
  awsConfig: awsConfig,
  smartContractConfig: smartContractConfig,
}
