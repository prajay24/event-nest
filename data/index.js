const usersData = require('./users');

module.exports = {
    users: usersData,
};

// const restaurants = require("./restaurants");
// const reviews = require('./reviews')
// const connection  = require('../config/mongoConnection');
// const close = connection.close;

// const main = async () => {
//     // const create1 = await restaurants.create("The first", "New York City, New York", "123-456-1234", "http://www.saffronlounge.com", "$$$$", ["Cuban", "Italian"], {dineIn: true, takeOut: true, delivery: false});
//     // // console.log(create1);
    
//     // // try{
//     // //     // const getcreate1 = await restaurants.get('615bff2b8579bf88db8d27d2');
//     // //     const getcreate1 = await reviews.create(create1._id.toString(),'asdfasdfasdf','asdfasdfasdfas',4,'10/23/2021','asdfasdfasdf'); 
//     // //     console.log(getcreate1); 
//     // // }catch(e){
//     // //     console.log(e)
//     // // }
//     // try{
//     //     // const getcreate1 = await restaurants.get('615bff2b8579bf88db8d27d2');
//     //     const getcreate1 = await reviews.create('61738e7582ec7e8d68e2427c','asdfasdfasdf','asdfasdfasdfas',4,'10/24/2021','asdfasdfasdf'); 
//     //     console.log(getcreate1); 
//     // }catch(e){
//     //     console.log(e)
//     // }
//     // try{
//     //     const getcreate12 = await reviews.getAll('61738de80798ff5a2afcf153'); 
//     //     console.log(getcreate12); 
//     // }catch(e){
//     //     console.log(e)
//     // }
//     // try{
//     //     // const getcreate1 = await restaurants.get('615bff2b8579bf88db8d27d2');
//     //     const getcreate12 = await reviews.get('6175c84a0d02ccd1fce67b53'); 
//     //     console.log(getcreate12); 
//     // }catch(e){
//     //     console.log(e)
//     // }

//     // try{
//     //     // const getcreate1 = await restaurants.get('615bff2b8579bf88db8d27d2');
//     //     const getcreate12 = await reviews.remove('617621488ee2caecc1a07fb5'); 
//     //     console.log(getcreate12); 
//     // }catch(e){
//     //     console.log(e)
//     // }
  
    
//     console.log('Done!')
//     close()
// };

// main().catch((error) => {
//     console.log(error)
// });