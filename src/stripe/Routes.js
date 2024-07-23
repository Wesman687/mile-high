

Router.post("/create-checkout-session", async(req,res)=>{
    const {products} = req.body
    const lineitems = products.map((product)=>({
        price_data:{
        currency: "usd",
        product_data:{
            name:product.name,
            images:[product.image]
        },
        unit_amount:product.price*100,
    },
    quantity:product.quantity
}));
const session = await stripe.checkout.sessions.create({
    payment_method_types:["card"],
    line_items:lineitems,
    mode:"payment",
    success_url:"",
    cancel_url:""
})
res.json({id:session.id})

})
module.exports = router