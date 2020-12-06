"# ProductApp : MEAN Architecture" 

---------------------------------------------------
frontend : angular 10

backend : nodejs - express

database : mongodb Atlas : cloud
---------------------------------------------------

---------------------------------------------------
APIs ***:

signup - http://localhost:3000/auth/signupUser       (for saving valid user data to the db)

login  - http://localhost:3000/auth/loginCheck      (for checking validity of login credentials)

products - http://localhost:3000/product/products   (for getting all products)

addNewProduct -  http://localhost:3000/product/addNew   (for adding new product)

deleteProduct -  http://localhost:3000/product/deleteProduct    (for deleting a product)


***imp server default PORT : 3000
-----------------------------------------------------

-----------------------------------------------------
backend main         : app.js

image uploads folder : server/public/uploads

frontend form validations using : REACTIVE FORMS METHOD
-----------------------------------------------------

-----------------------------------------------------
base packages            :

                            express
                            
                            body-parser
                            
                            mongoose
                            
                            cors
                            
additional packages      :

                            jsonwebtoken : for creating token
                            
                            bcrypt       : for hashing passwords
                            
                            multer       : for file processing at server
                            

additional middlewares   :

                            helpers.js   :  for validating the file received at backend
                            
                            verifyToken  :  for verifying the token in the request
                            
-----------------------------------------------------

-----------------------------------------------------
*****************************************************
!! email is accepted as 'username'

!! 'password' must contain atleast 8 characters including atleast 1 uppercase letter,
    1 lowercase letter, 1 number and any special character among !@#$% and no blank spaces are allowed
-----------------------------------------------------


-----------------------------------------------------
*********************🙂THANK YOU🙂******************
-----------------------------------------------------
