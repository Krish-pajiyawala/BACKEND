const { currntdate } = require('../middalwear/currntDate')
const blogmodle = require('../model/blog.model')
const path = require('path')
const fs = require('fs')

exports.addblogpage = async(req,res)=>{
    try {
        res.render('blog/addblog')
    } catch (error) {
        req.flash('error',`${error.message}`)
        res.redirect('/')
    }
}


exports.addblog = async (req, res) => {
  try {
    let authorImage = ""
    let blogImage = ""

    console.log(req.files)

    if (req.files.authorImage) {
      authorImage = `/uploads/${req.files.authorImage[0].filename}`
    }

    if (req.files.blogImage) {
      blogImage = `/uploads/${req.files.blogImage[0].filename}`
    }

    await blogmodle.create({
      ...req.body,
      authorImage,
      blogImage,
      date: currntdate()
    })
       req.flash('success','Blog Added Success')

    res.redirect('/blog/view-blog')
  } catch (error) {
    req.flash('error',`${error.message}`)
    res.redirect('/')
  }
}




exports.viewblogpage = async (req, res) => {
    try {
        let search = (req.query.search || "").trim();
        let category = req.query.category || "";
        let status = req.query.status || "";
        let page = parseInt(req.query.page) || 1;

        const limit = 4 ;
        const skip = (page - 1) * limit;

        console.log('view-blog query:', { search, category, status, page });

        const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        let filter = {};

        if (search) {
            const safe = escapeRegex(search);
            const regex = new RegExp(safe, 'i');
            // Search by author name only
            filter.name = { $regex: regex };
        }

        if (category) {
            filter.category = normalize(category);
        }

        if (status) {
            filter.status = normalize(status);
        }

        console.log('computed filter:', filter);

        const totalBlogs = await blogmodle.countDocuments(filter);

        const blogs = await blogmodle.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ _id: -1 });

        const totalPages = Math.ceil(totalBlogs / limit);

        const categories = ['Technology','Programming','Travel','Food','Education','Business'];

        res.render('blog/viewblog', {
            blogs,
            currentPage: page,
            totalPages,
            search,
            category,
            status,
            categories
        });

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
};

exports.singleviewblogpage = async(req,res)=>{
    try {
        const id = req.params.id;
        let blog = await blogmodle.findById(id)
        res.render('blog/singleviewblog',{blog})
        
      
    } catch (error) {
        req.flash('error',`${error.message}`)
        res.redirect('/')
    }
}


exports.deleteblog = async(req,res)=>{
    try {
        const id = req.params.id;
        let blog =  await blogmodle.findById(id) 
        if(blog){
            if(blog.blogImage){
                let deletepath = path.join(__dirname,'..',blog.blogImage)
                try {
                    await fs.promises.unlink(deletepath)
                } catch (unlinkError) {
                    console.log('Blog image deletion error:', unlinkError.message)
                }
            }

            if(blog.authorImage){
                let deletepath2 = path.join(__dirname,'..',blog.authorImage)
                try {
                    await fs.promises.unlink(deletepath2)
                } catch (unlinkError) {
                    console.log('Author image deletion error:', unlinkError.message)
                }
            }
        }

        await blogmodle.findByIdAndDelete(id)
        res.redirect('/blog/view-blog')
        
    } catch (error) {  
       req.flash('error',`${error.message}`)
        res.redirect('/')
    }
}


exports.editblog = async(req,res)=>{
    try {
        const id = req.params.id;
       
        let blog =  await blogmodle.findById(id)
        res.render('blog/editblog',{blog})
        
    } catch (error) {
        console.log(error)
       req.flash('error',`${error.message}`)
        res.redirect('/')
    }
}


exports.updateblog = async(req,res)=>{
    try {
        let id  = req.params.id
        let blog  = await blogmodle.findById(id)
        let authorImage = blog.authorImage       
        let blogImage = blog.blogImage 

      if(req.files.authorImage){
        if(authorImage){
            let imagepath = path.join(__dirname,"..",authorImage)
            try {
                await fs.promises.unlink(imagepath)
            } catch (unlinkError) {
                console.log('Author image deletion error:', unlinkError.message)
            }
        }
        authorImage = `/uploads/${req.files.authorImage[0].filename}`
      }

        if(req.files.blogImage){
        if(blogImage){
            let imagepath = path.join(__dirname,"..",blogImage)
            try {
                await fs.promises.unlink(imagepath)
            } catch (unlinkError) {
                console.log('Blog image deletion error:', unlinkError.message)
            }
        }
        blogImage = `/uploads/${req.files.blogImage[0].filename}`
      }

        await blogmodle.findByIdAndUpdate(id,{...req.body,authorImage,blogImage},{new:true})
       req.flash('success','Blog Updated Success')

    res.redirect(`/blog/view-blog/${id}`)

    } catch (error) {
        console.log(error)
        req.flash('error',`${error.message}`)
        res.redirect('/blog/view-blog')
    }
}