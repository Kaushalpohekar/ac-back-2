const db = require('../db');

function fetchStatus(req, res){
 const deviceStatusQuery = 'select * from ahu_control order by date_time DESC LIMIT 1';
   try {
     db.query(deviceStatusQuery, (error, Status) => {
       if (error) {
         console.error('Error during Status check:', error);
         return res.status(500).json({ message: 'Internal server error' });
       }

       res.status(200).json(Status);
     });
   } catch (error) {
     console.error('Error in Status check:', error);
     res.status(500).json({ message: 'Internal server error' });
   }
 }

module.exports = {
  fetchStatus
};
