const { currntdate } = require('../middalwear/currntDate')
const blogmodle = require('../model/blog.model')
const path = require('path')
const fs = require('fs')

// Helper: normalize category/status values in a readable beginner-friendly way
// - trims whitespace
// - capitalizes each word's first letter, lowercases the rest
// This makes storing and comparing values simple and predictable.
const normalize = (s) => {
    if (!s) return '';
    s = s.toString().trim();
    return s.split(' ').map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join(' ');
}
exports.addblogpage = async(req,res)=>{
    try {
        res.render('blog/addblog')
    } catch (error) {
        console.log(error)
        res.redired('/')
    }
}


exports.addblog = async(req,res)=>{
    try {
        let imagepath="";
        if(req.file){
           imagepath = `/uploads/${req.file.filename}`;
        }

        // normalize category and status for consistent storage
        const category = normalize(req.body.category);
        const status = normalize(req.body.status);

        await blogmodle.create({
            ...req.body,
            category,
            status,
            authorImage:imagepath,
            date:currntdate()
        })
        res.redirect('/')
    } catch (error) {
        console.log(error)
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
            filter.$or = [
                { name: { $regex: regex } },
                { title: { $regex: regex } },
                { content: { $regex: regex } }
            ];
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
        console.log(id)
        let blog = await blogmodle.findById(id)
        res.render('blog/singleviewblog',{blog})
        
      
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}


exports.deleteblog = async(req,res)=>{
    try {
        const id = req.params.id;
       
         await blogmodle.findByIdAndDelete(id)
        res.redirect('/blog/view-blog')
        
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}


exports.editblog = async(req,res)=>{
    try {
        const id = req.params.id;
        const blog = await blogmodle.findById(id);
        if(!blog){
            return res.redirect('/blog/view-blog');
        }
        res.render('blog/editblog',{blog});

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
}


exports.updateblog = async(req,res)=>{
    try {
        let id  = req.params.id
        let blog  =await blogmodle.findById(id)
        let imagepath = blog.authorImage || "";

        console.log('update request file:', req.file);
        console.log('current authorImage:', imagepath);

        if(req.file){
            // build new image path
            const newImagePath = `/uploads/${req.file.filename}`;

            // if there is an existing image, attempt to remove it (safe checks)
            if(imagepath && imagepath !== ""){
                // remove leading slash to create a relative path for path.join
                const relPath = imagepath.startsWith('/') ? imagepath.slice(1) : imagepath;
                const imageurl = path.join(__dirname, "..", relPath);

                if(fs.existsSync(imageurl)){
                    try{
                        fs.unlinkSync(imageurl);
                        console.log('Deleted old image:', imageurl);
                    }catch(unlinkErr){
                        console.log('Failed to delete old image:', unlinkErr);
                    }
                }else{
                    console.log('Old image file not found, skipping delete:', imageurl);
                }
            }

            imagepath = newImagePath;
        }

        // normalize incoming fields for a consistent DB state
        const category = normalize(req.body.category);
        const status = normalize(req.body.status);

        const updatedData = {
            ...req.body,
            category,
            status,
            authorImage: imagepath
        };

        const updated = await blogmodle.findByIdAndUpdate(id, updatedData, { new: true });
        console.log('Updated blog authorImage:', updated.authorImage);
        res.redirect(`/blog/view-blog`)

    } catch (error) {
        console.log(error)
        res.redirect('/blog/view-blog')
    }
}