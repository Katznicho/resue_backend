# SMART BABY MONITORING SYSTEM

### Descriptin
The Baby Monitoring System is a web-based application that allows parents to monitor their babies using sensors and receive notifications on their mobile devices.


## Getting Started
To get started with the Baby Monitoring System, follow these steps:

Clone the repository to your local machine.
Install the necessary dependencies by running composer install  and npm install in the project directory.
Create a new database and configure the database settings in the .env file.
Run the database migrations by running php artisan migrate.
Seed the database with default data by running php artisan db:seed.
Start the development server by running php artisan serve.

## Features
The Baby Monitoring System includes the following features:

Real-time monitoring of baby's vital signs and other data
Notifications for important events such as crying or a change in vital signs
Storage of important information such as medical conditions and doctor's contact information
Support for multiple users and multiple babies
Integration with various sensors and devices for collecting data

## Technologies Used
The Baby Monitoring System is built using the following technologies:

Laravel 8
MySQL
Bootstrap 5
Reactjs
Intertiajs
Chart.js
Conclusion
Thank you for your interest in the Baby Monitoring System. We hope this application will help you keep your baby safe and healthy. If you have any questions or feedback, please contact us at contact@babymonitoringsystem.com.


## Contributing
Contributions are welcome! Please follow these steps:

Fork the project.
Create a new branch with your feature or bug fix: git checkout -b my-feature
Commit your changes: git commit -m "Add my feature"
Push to the branch: git push origin my-feature
Open a pull request.


# API DOCUMENTATION

### BASE_URL: http://162.243.162.143/api/v1/

<span style="color:#67e8f9; font-size: 20px; font-weight:bold">Authentication</span>

> Note: All endpoints require authentication except the ones under the Authentication section.

### Login

POST client/auth/login

> Sample Success Response

```json
{
    "response": "success",
    "message": "Successfully logged in!",
    "user": {
        "id": 4,
        "name": "Code Artisan",
        "email": "codeartisan256@gmail.com",
        "phone_number": "+256759983853",
        "address": "Kawempe",
        "role_id": 2,
        "email_verified_at": null,
        "is_phone_number_verified": 0,
        "title": null,
        "is_suspended": 0,
        "login_attempts": 0,
        "email_token": null,
        "phone_number_token": null,
        "password_reset_token": null,
        "baby_id": 1,
        "created_at": "2023-05-07T10:30:10.000000Z",
        "updated_at": "2023-05-07T10:30:10.000000Z",
        "deleted_at": null,
        "baby": {
            "id": 1,
            "name": "Kibalam Timothy",
            "dob": "2023-05-08",
            "gender": "male",
            "weight": 12,
            "length": 12,
            "medical_conditions": "[{\"value\":\"asthma\",\"label\":\"Asthma\"},{\"value\":\"high-blood-pressure\",\"label\":\"High Blood Pressure\"}]",
            "user_id": 4,
            "created_at": "2023-05-07T08:26:09.000000Z",
            "updated_at": "2023-05-07T08:26:09.000000Z",
            "deleted_at": null
        }
    },
    "authToken": "8|oCrQA48aSy0j1MH4z7lF2OuMiq2XSUO8g0b1HBuF"
}
```

> Sample Error Response

```json
{
    "message": "The email field is required. (and 1 more error)",
    "errors": {
        "email": ["The email field is required."],
        "password": ["The password field is required."]
    }
}
```

<span style="color:#facc15; font-size: 16px; font-weight:bold">Incase of invalid credentials</span>

```json
{
    "response": "failure",
    "message": "Invalid credentials"
}
```

### Logout

POST client/auth/logout

> Sample Success Response

```json
{
    "response": "success",
    "message": "Successfully logged out!"
}
```


### STORE DATA
 POST client/auth/data

 Parameters:

file (required): The video file to upload.
type (required): This can be a video or an audio.
title (required): The title of the video.
description (required): The description of the video.

 >Sample Sucess Response
 ```
 {
    "message": "Data stored successfully",
    "size": 2515347,
    "original_name": "Mpookya - Mc Jerry, Martha Mukisa (Nowviba Music).mp3"
}
  
 ```


 ### GET LAST VIDEO
 GET  client/auth/getLastVideo
 >Sample success
 ```
  {
    "message": "success",
    "data": {
        "id": 1,
        "title": "baby crying",
        "description": "This a sample description",
        "filename": "XZ2mqKRSBh_funny.mp4",
        "filepath": "public/data/XZ2mqKRSBh_funny.mp4",
        "url": "http://localhost:8000/storage/data/XZ2mqKRSBh_funny.mp4",
        "type": "video",
        "size": 2626821,
        "baby_id": 4,
        "created_at": "2023-05-16T17:59:11.000000Z",
        "updated_at": "2023-05-16T17:59:11.000000Z"
    }
}
 ```

 ### GET LAST AUDIO
 GET  client/auth/getLastVideo
 >Sample success
 ```
  {
    "message": "success",
    "data": {
        "id": 3,
        "title": "baby crying",
        "description": "This a sample description",
        "filename": "iGrI320uOz_Mpookya - Mc Jerry, Martha Mukisa (Nowviba Music).mp3",
        "filepath": "public/data/iGrI320uOz_Mpookya - Mc Jerry, Martha Mukisa (Nowviba Music).mp3",
        "url": "http://localhost:8000/storage/data/iGrI320uOz_Mpookya - Mc Jerry, Martha Mukisa (Nowviba Music).mp3",
        "type": "audio",
        "size": 2515347,
        "baby_id": 4,
        "created_at": "2023-05-16T18:10:17.000000Z",
        "updated_at": "2023-05-16T18:10:17.000000Z"
    }
}
 ```

 ### GET USER DEVICE DETAILS
  > Sample success
  ```
   {
    "message": "failure",
    "data": []
}
  ```

  ```
  {
    "message": "success",
    "data": [
        {
            "id": 3,
            "name": "Camera",
            "user_id": 1,
            "type": "Camera",
            "location": "Naalya",
            "status": "NOT CONNECTED",
            "version": "Version 4",
            "model": "Model 4",
            "created_at": "2023-05-17T12:47:45.000000Z",
            "updated_at": "2023-05-17T12:47:45.000000Z",
            "deleted_at": null,
            "sensors": [
                {
                    "id": 2,
                    "name": "Camera",
                    "user_id": 1,
                    "device_id": "3",
                    "type": "Camera",
                    "location": "Naalya",
                    "status": "NOT CONNECTED",
                    "version": "Version 4",
                    "model": "Model 4",
                    "created_at": "2023-05-17T12:48:10.000000Z",
                    "updated_at": "2023-05-17T12:48:10.000000Z",
                    "deleted_at": null
                }
            ]
        }
    ]
}
  

  ```





