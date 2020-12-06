// const express =  require('express')
const multer = require('multer');
const path = require('path');
//requiring model
const Product = require('../model/Product');
//requiring token verifying middleware
const verifyToken = require('./verifyToken');

//multer image filter
const helpers = require('./helpers');

const router=require('express').Router();

//Product delete route - requires product id in req. body as object "id"
router.post('/deleteProduct',verifyToken,(req,res)=>
{
    const id=req.body.id; 
     Product.deleteOne({_id:id},
        (err,data)=>
        {
            if(err)
            {
                res.json({"msg":"error"});
            }
            else{
                if(data.deletedCount > 0)
                {
                    res.json({"msg":"Product Removed","OK":data.ok})
                }
                else
                {
                    res.json({"msg":"error","OK":data.ok})
                }
            }
        })
})
//getting all products available
router.get('/products', (req,res)=>
{
    
    Product.find()
    .then((data)=>
    {
        if(data.length > 0)
        {
            return res.json({"msg":"success","products":data});
        }
        else
        {
            return res.json({"msg":"none"})
        }
    })
    .catch(err=>
        {
            return res.json({"msg":"error"})
        })
})

//adding new product
router.post('/addNew',verifyToken,(req,res)=>
{
    //multer upload method defining
    let upload = multer({ storage: storage , fileFilter: helpers.imageFilter }).single('p_image');
    //starting image uploading
    upload(req,res,(err,data)=>
    {
       
    if (req.fileValidationError) {
        return res.json({"msg":"error"});
    }
    else if (!req.file) {
        return res.json({"msg":"error"});
    }
    else if (err instanceof multer.MulterError) {
        return res.json({"msg":"error"});
    }
    else if (err) {
        return res.json({"msg":"error"});
    }
        //setting uploaded image path (for saving to the database)
    let imgPath= req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename;
        //capturing product data
    let product_data=new Product(
                    {
                name:req.body.p_name,
                description:req.body.p_description,
                image:imgPath
                    });
        //saving product data
                    try
                    {
                        product_data.save((err,data)=>
                        {
                            if(err)
                            {
                                return res.json({"msg":"error"})  
                            }
                            else
                            {
                                return res.json({"msg":"saved","product":data})
                            }
                        })
                        
                    }
                    catch(err)
                    {
                       return res.json({"msg":"error"});
                    }
                
    })
    //upload end
})

//multer setup
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,path.join('./','/public/uploads/'));
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

module.exports=router;