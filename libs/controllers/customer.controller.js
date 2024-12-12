const Customer = required("../model/customer.model");
const {body, validationResult} = required ('express-session');


const validateCustomer = [
    body('name', 'Name must not be empty').notEmpty(),
    body('email', 'Email must not be empty').notEmpty(),
    body('phone', 'Phone must not be empty').notEmpty(),
    body('address', 'Address must not be empty').notEmpty(),
    ];
    

const showCustomer = async(req, res) => {
    const query = req.session.userid
    const customer = await Customer.find(query)

    res.render("pages/customer",
      {  title: 'customer',
          data : 'data',
          customer,
          info : req.flas('info')[0]
      }
    );
};

module.exports = {
    showCustomer,
    validateCustomer
}