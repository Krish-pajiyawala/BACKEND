let adminModel = require('../model/admin.model')
let bcrypt = require('bcrypt')
let path = require('path')
let fs = require('fs')
exports.addAdminPage = (req,res)=>{
    res.render('admin/addAdmin')
}

exports.addAdmin= async(req,res)=>{
   try {
    let profileImage = ''
    if(req.file){
        profileImage = `/uploads/${req.file.filename}`
    } 
    let haspassword = await bcrypt.hash(req.body.password,10)

    let admin = await adminModel.create({
        ...req.body,
         password:haspassword,
        profileImage
    })

        req.flash('success','Admin Added Success')
    
    res.redirect('/admin/view-admin')
   } catch (error) {
    req.flash('error',`${error.message}`)
    res.redirect('/')
   }
}


exports.viewAdminPage = async(req,res)=>{
    try {
        let search = (req.query.search || "").trim()
        let filter = {}
        if(search){
            const safe = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
            const regex = new RegExp(safe,'i')
            filter.$or = [ { firstname: { $regex: regex } }, { lastname: { $regex: regex } }, { email: { $regex: regex } } ]
        }

        let admins = await adminModel.find(filter)
        res.render('admin/viewAdmin',{admins, search})
    } catch (error) {
        req.flash('error',`${error.message}`)
        res.redirect('/')
    }
}

exports.deleteAdmin = async(req,res)=>{
    try {
        let id = req.params.id
        let admin = await adminModel.findById(id)
        if(admin && admin.profileImage){
            let imagepath = path.join(__dirname,'..',admin.profileImage)
            try{
                await fs.promises.unlink(imagepath)
            }catch(err){
                console.log('Admin image delete error:', err.message)
            }
        }

        await adminModel.findByIdAndDelete(id)
        req.flash('warning','Admin Deleted')
        res.redirect('/admin/view-admin')
    } catch (error) {
        req.flash('error',`${error.message}`)
        res.redirect('/')
    }
}


exports.editAdminPage =  async(req,res)=>{
    let id = req.params.id
    let admin = await adminModel.findById(id)
    res.render('admin/editAdmin',{admin})
}

exports.updateAdmin = async(req,res)=>{
    try {
        let id = req.params.id
        let admin = await adminModel.findById(id)
        let profileImage = admin && admin.profileImage ? admin.profileImage : ''
        if(req.file){
            if(profileImage){
                let imagepath = path.join(__dirname,'..',profileImage)
                try{
                    await fs.promises.unlink(imagepath)
                }catch(err){
                    console.log('Admin image delete error:', err.message)
                }
            }
            profileImage = `/uploads/${req.file.filename}`
        }

       await adminModel.findByIdAndUpdate(id,{...req.body,profileImage},{new:true})
       req.flash('success','Admin Updated')
       res.redirect('/admin/view-admin')
    } catch (error) {
        req.flash('error',`${error.message}`)
        res.redirect('/')
    }
}