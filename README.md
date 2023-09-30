
# AWS Serverless Node.js CRUD API

This is a CRUD (Create, Read, Update, Delete) API built using AWS Lambda functions, Node.js, and the Serverless Framework. It provides a scalable and cost-effective solution for managing data operations in a serverless architecture.

## Technologies Used

- **AWS Lambda:** Serverless compute service used for executing the API's business logic.
- **Node.js:** JavaScript runtime for building serverless functions.
- **AWS SDK:** Library for interacting with AWS services.
- **Serverless Framework:** A framework for deploying serverless applications.
- **serverless-iam-roles-per-function:** A Serverless Framework plugin for defining IAM roles per function, improving security by minimizing permissions.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js and npm (Node Package Manager): [Download Node.js](https://nodejs.org/)
- Serverless Framework: Install it globally using `npm install -g serverless`

## Installation

1. Clone this repository:

   ```shell
   git clone <repository-url>
   cd aws-serverless-crud-api
   ```

2. Install project dependencies:

   ```shell
   npm install
   ```

3. Deploy the API using Serverless Framework:

   ```shell
   serverless deploy
   ```



### IAM Roles

This project uses the `serverless-iam-roles-per-function` plugin to define IAM roles per function. This approach enhances security by granting each Lambda function only the necessary permissions it needs to operate. The plugin is configured in the `serverless.yml` file.

```yaml
plugins:
  - serverless-iam-roles-per-function
```

## Deployment

To deploy the API to your AWS account, run the following command:

```shell
serverless deploy
```

This will package and deploy your service to AWS Lambda and API Gateway.
