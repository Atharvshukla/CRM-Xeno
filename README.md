# CRM-Xeno
Assessment Task of 21BCE2886 Campaign Management App

## Watch the demo video:
https://drive.google.com/file/d/1PVShe3H71lanJG4Q-lVJmJ4XU2kGvNgA/view?usp=sharing

### Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Models](#database-models)
- [API Endpoints](#api-endpoints)
- [Redis Pub/Sub Architecture](#redis-pubsub-architecture)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

### Features
- **Company Registration and Login**
- **Customer Login**
- **Customer Management**
- **Bonus Point System**
- **Secure JWT Authentication**
- **MongoDB Integration**

### Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, bcrypt
- **Real-Time Messaging**: Redis
- **API Testing**: Thunder Client / Postman

### Installation
1. Clone the Repository
   ```bash
   git clone https://github.com/yourusername/your-crm-repo.git
   cd your-crm-repo



### Environment Variables<BR>
PORT: The port on which the server will run.<BR>
MONGODB_URI: MongoDB connection URI.<BR>
JWT_SECRET: Secret key for JWT token generation.<BR>
REDIS_URL: Redis server URL.<BR>


### Database Models
Company Model (companyModel.js)<BR>

    companyName: Name of the company.<BR>
    email: Company email (unique).<BR>
    password: Encrypted password for login.<BR>

Customer Model (customerModel.js)<BR>

    name: Customer's name.
    email: Customer's email.
    companyId: ID of the associated company.
    phoneNumber: { type: String, required: true },
    visits: { type: Number, default: 0 },
    purchaseAmount: { type: Number, default: 0 },

Order Model
Message Model

### API ENDPOINTS

![image](https://github.com/user-attachments/assets/8eddc3b6-6cd9-406e-a776-8effdff6b304)

### Auth Routes for Customer
![image](https://github.com/user-attachments/assets/137c583a-1696-4827-ba04-8c77ae3ec996)

### Customer Management
![image](https://github.com/user-attachments/assets/a5fee9ba-3d28-4496-993d-4f0c51e0ff75)



## API TESTING POSTMAN & THUNDERCLIENT 

### Company-Register
![image](https://github.com/user-attachments/assets/4f17ad83-139b-4de0-a4b8-55238594bb3e)
### Company Login
![image](https://github.com/user-attachments/assets/9d386862-8356-46cf-94c2-8b02234969ef)




### FilterCustomer API
![image](https://github.com/user-attachments/assets/b84c2d0b-e093-4961-86a9-c31aa8ecdd71)

## Similarly Tested All API'S on ThunderClient and Postman 


## COMMIT LOG 

![image](https://github.com/user-attachments/assets/7ae9cf89-0166-4cc8-a8a2-9f802e190606)

